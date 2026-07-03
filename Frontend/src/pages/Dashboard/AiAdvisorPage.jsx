import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, Sparkles, AlertCircle, RefreshCw } from 'lucide-react';

const AiAdvisorPage = () => {
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "Hello Aman! 👋 I am your FinSight AI Advisor. I can analyze your spending behavior from the past 30 days and provide personalized wealth recommendations. Click below or write a query to begin.",
      isIntro: true
    }
  ]);
  const [input, setInput] = useState('');
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState('');
  
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const triggerAdviceStream = (userQueryText) => {
    if (streaming) return;

    setError('');
    setStreaming(true);

    // Add user query message
    setMessages((prev) => [
      ...prev,
      { sender: 'user', text: userQueryText }
    ]);

    // Prepare bot streaming placeholder
    setMessages((prev) => [
      ...prev,
      { sender: 'bot', text: '', isStreaming: true }
    ]);

    let accumulatedText = '';
    
    // Connect to SSE AI Advisor endpoint
    const url = 'http://localhost:3000/user/ai-advisor';
    const eventSource = new EventSource(url, { withCredentials: true });

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        
        if (data.error) {
          setError(data.error);
          eventSource.close();
          setStreaming(false);
          // Remove the loading bot message or add error subtext
          return;
        }

        if (data.choices) {
          accumulatedText += data.choices;
          setMessages((prev) => {
            const updated = [...prev];
            const botMsgIndex = updated.findIndex((m) => m.sender === 'bot' && m.isStreaming);
            if (botMsgIndex !== -1) {
              updated[botMsgIndex] = {
                sender: 'bot',
                text: accumulatedText,
                isStreaming: true
              };
            }
            return updated;
          });
        }
      } catch (err) {
        console.error('Failed parsing stream chunk:', err);
      }
    };

    eventSource.onerror = (err) => {
      // Stream naturally ends when backend calls res.end() causing connection close
      eventSource.close();
      setStreaming(false);

      // Finalize the streaming message state
      setMessages((prev) => {
        return prev.map((m) => m.isStreaming ? { ...m, isStreaming: false } : m);
      });
    };
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim() || streaming) return;
    const query = input.trim();
    setInput('');
    triggerAdviceStream(query);
  };

  const handleQuickTrigger = (text) => {
    if (streaming) return;
    triggerAdviceStream(text);
  };

  return (
    <div className="space-y-6 max-w-3xl text-left">
      <div>
        <h2 className="text-xl font-extrabold text-white font-display">AI Wealth Advisor</h2>
        <p className="text-[0.62rem] uppercase tracking-wider text-slate-400 font-mono font-bold mt-1">
          Personalized capital guidance and budget insights
        </p>
      </div>

      {/* Main chat layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        
        {/* Left Side: Tips & Triggers */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-[#131523] border border-slate-800/80 rounded-2xl p-4.5 space-y-3">
            <p className="text-[0.58rem] uppercase tracking-wider text-slate-400 font-mono font-bold">Quick Insights</p>
            <div className="flex flex-col gap-2">
              <button
                type="button"
                disabled={streaming}
                onClick={() => handleQuickTrigger("📊 Generate 30-day budget analysis and alerts")}
                className="text-left text-[0.68rem] font-bold text-slate-200 bg-[#0c0e17] border border-slate-800 hover:bg-slate-800/40 hover:border-slate-700 rounded-xl p-2.5 transition"
              >
                📊 Analyze last 30d spends
              </button>
              <button
                type="button"
                disabled={streaming}
                onClick={() => handleQuickTrigger("💡 Give saving tips based on my highest expense category")}
                className="text-left text-[0.68rem] font-bold text-slate-200 bg-[#0c0e17] border border-slate-800 hover:bg-slate-800/40 hover:border-slate-700 rounded-xl p-2.5 transition"
              >
                💡 Category savings tip
              </button>
            </div>
          </div>

          <div className="bg-[#131523]/50 border border-slate-800/60 rounded-2xl p-4 space-y-2">
            <div className="flex items-center gap-1.5 text-amber-400">
              <AlertCircle className="size-3.5" />
              <span className="text-[0.58rem] font-bold uppercase tracking-wider font-mono">SSE Stream</span>
            </div>
            <p className="text-[0.62rem] text-slate-400 leading-relaxed font-semibold">
              Advice is generated in real-time by analyzing your transaction ledger using Gemini 2.5 flash.
            </p>
          </div>
        </div>

        {/* Right Side: Chat Console */}
        <div className="lg:col-span-3 bg-[#131523] border border-slate-800/80 rounded-2xl p-5 shadow-[0_4px_20px_rgba(0,0,0,0.15)] flex flex-col h-[500px]">
          
          {/* Header Info */}
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="grid size-9.5 place-items-center rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 shadow-sm">
                <Bot className="size-4.5" />
              </span>
              <div>
                <h3 className="text-xs font-bold text-white">FinSight AI Advisor</h3>
                <p className="text-[0.52rem] text-slate-500 font-mono mt-0.5">Real-time Stream Engine</p>
              </div>
            </div>
            <div className="inline-flex items-center gap-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-0.5 text-[0.52rem] text-indigo-400 font-mono font-bold">
              {streaming ? (
                <>
                  <RefreshCw className="size-2.5 animate-spin" />
                  Streaming...
                </>
              ) : (
                <>
                  <span className="size-1 rounded-full bg-emerald-400 animate-pulse" />
                  Active
                </>
              )}
            </div>
          </div>

          {/* Messages list */}
          <div className="flex-1 overflow-y-auto space-y-3.5 pr-2 mb-4 scrollbar-thin">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex gap-3 text-left ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'bot' && (
                  <div className="size-7.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="size-3.5" />
                  </div>
                )}
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-indigo-650 text-white rounded-tr-none'
                      : 'bg-[#0c0e17] border border-slate-800 text-slate-200 rounded-tl-none whitespace-pre-line'
                  }`}
                >
                  {m.text}
                  {m.isStreaming && m.text.length === 0 && (
                    <span className="flex gap-1 items-center mt-1">
                      <span className="size-1 bg-indigo-400 rounded-full animate-bounce delay-100" />
                      <span className="size-1 bg-indigo-400 rounded-full animate-bounce delay-200" />
                      <span className="size-1 bg-indigo-400 rounded-full animate-bounce delay-300" />
                    </span>
                  )}
                </div>
              </div>
            ))}
            
            {error && (
              <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-3 flex gap-2 text-rose-400 text-xs">
                <AlertCircle className="size-4 shrink-0 mt-0.5" />
                <span>Error generating advice: {error}</span>
              </div>
            )}
            
            <div ref={chatEndRef} />
          </div>

          {/* Form Input */}
          <form onSubmit={handleSend} className="flex h-11 items-center gap-3 rounded-xl border border-slate-800 bg-[#0c0e17] px-3.5 focus-within:border-indigo-500/40">
            <input
              type="text"
              placeholder={streaming ? "Generating advice..." : "Ask your financial advisor..."}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={streaming}
              className="h-full min-w-0 flex-1 bg-transparent text-xs text-white outline-none placeholder:text-slate-500 font-medium font-mono"
            />
            <button
              type="submit"
              disabled={streaming || !input.trim()}
              className="grid size-7.5 place-items-center rounded-lg bg-indigo-650 text-white border border-indigo-500/30 hover:bg-indigo-600 transition shrink-0 disabled:opacity-40 disabled:pointer-events-none shadow-sm shadow-indigo-600/10"
            >
              <Send className="size-3" />
            </button>
          </form>

        </div>

      </div>

    </div>
  );
};

export default AiAdvisorPage;
