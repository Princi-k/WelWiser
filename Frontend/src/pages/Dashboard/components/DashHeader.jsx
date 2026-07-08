import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Bell, LogOut } from 'lucide-react';

const DashHeader = () => {
  const navigate = useNavigate();
  const logOutBtn = async () => {
    try {
      const response = await fetch('http://localhost:3000/user/logoutuser', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include"
      });
      await response.json();
    } catch (error) {
      console.log(error);
    }
  }
  const username = localStorage.getItem('username') || 'User';

  return (
    <header className="sticky top-0 z-10 bg-white/65 backdrop-blur-xl border-b border-slate-200/80 px-6 md:px-8 py-4 print:hidden">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        
        <h1 className="text-slate-800 font-extrabold font-display text-sm">
          Welcome back, {username}! 👋
        </h1>

        <div className="flex items-center gap-3">
          <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-500 hover:text-slate-800">
            <Bell className="size-4" />
          </button>
          <button 
            onClick={logOutBtn}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-rose-600 transition duration-200"
          >
            <LogOut className="size-3.5" />
            <span>Logout</span>
          </button>
        </div>

      </div>
    </header>
  )
}

export default DashHeader
