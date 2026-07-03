import React from 'react';
import {
  Sparkles,
  TrendingUp,
  Lock,
  Smartphone,
  ArrowRight,
  Menu,
} from 'lucide-react';

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <div className="bg-white text-slate-900">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/95 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-indigo-600" />
              <span className="text-xl font-bold text-slate-900">FinSight</span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden items-center space-x-8 md:flex">
              <a
                href="#features"
                className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
              >
                Features
              </a>
              <a
                href="#advisor"
                className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
              >
                AI Advisor
              </a>
              <a
                href="#analytics"
                className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
              >
                Analytics
              </a>
            </div>

            {/* CTA Button */}
            <div className="flex items-center space-x-4">
              <button className="hidden rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-indigo-700 active:scale-95 sm:inline-block">
                Get Started
              </button>
              <button
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <Menu className="h-6 w-6 text-slate-600" />
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="space-y-4 border-t border-slate-200/60 py-4 md:hidden">
              <a
                href="#features"
                className="block text-sm font-medium text-slate-600 hover:text-slate-900"
              >
                Features
              </a>
              <a
                href="#advisor"
                className="block text-sm font-medium text-slate-600 hover:text-slate-900"
              >
                AI Advisor
              </a>
              <a
                href="#analytics"
                className="block text-sm font-medium text-slate-600 hover:text-slate-900"
              >
                Analytics
              </a>
              <button className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-indigo-700">
                Get Started
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-50 px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          {/* Tech Badges */}
          <div className="mb-8 flex flex-wrap gap-3 justify-center sm:justify-start">
            <span className="inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-600 border border-slate-200/60">
              Deterministic Temp (0.2)
            </span>
            <span className="inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-600 border border-slate-200/60">
              SSE Stream Real-Time
            </span>
            <span className="inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-600 border border-slate-200/60">
              15-Req/15-Min Rate Limit
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 mb-6">
            Take Control of Your Financial Narrative Across Every Medium.
          </h1>

          {/* Description */}
          <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-2xl">
            Traditional banking apps lock you inside their walled gardens, failing to capture cash, credit card swipes, or split transactions. FinSight bridges the ecosystem blind-spot using deterministic AI-driven multi-format natural language parsing to instantly sync your 30-day ledgers into real-time, interactive, and actionable analytical streams.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <button className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white transition-all duration-200 hover:bg-indigo-700 active:scale-95">
              Start Free Trial
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
            <button className="inline-flex items-center justify-center rounded-lg border-2 border-slate-200 px-6 py-3 font-medium text-slate-900 transition-all duration-200 hover:border-slate-300 hover:bg-slate-50">
              See How it Works
            </button>
          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section id="features" className="bg-white px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Section Header */}
          <div className="mb-16 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Powerful Features, Built for Fintech
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Everything you need to take command of your financial ecosystem in one unified platform.
            </p>
          </div>

          {/* Feature Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Card 1: Multi-Format Parser */}
            <div className="group rounded-xl border border-slate-200/60 bg-slate-50 p-8 transition-all duration-200 hover:border-indigo-300 hover:shadow-lg hover:scale-105">
              <div className="mb-6 inline-flex rounded-lg bg-indigo-100 p-3">
                <Sparkles className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="mb-3 text-lg font-semibold text-slate-900">
                Unstructured Log Parsing
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Input raw text or fragmented logs. The system utilizes low-temperature deterministic system prompting (0.1/0.2) to instantly convert unstructured statements into valid, lowercased MERN-compatible schema payloads.
              </p>
            </div>

            {/* Card 2: Real-Time Streaming */}
            <div className="group rounded-xl border border-slate-200/60 bg-slate-50 p-8 transition-all duration-200 hover:border-emerald-300 hover:shadow-lg hover:scale-105">
              <div className="mb-6 inline-flex rounded-lg bg-emerald-100 p-3">
                <TrendingUp className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="mb-3 text-lg font-semibold text-slate-900">
                Real-Time AI Chat Streaming
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Say goodbye to waiting 3 to 5 seconds for background API requests. Powered by Server-Sent Events (SSE) and an optimized asynchronous loop, your automated financial advisor streams analytical advice point-by-point in real-time.
              </p>
            </div>

            {/* Card 3: Rate Limiting */}
            <div className="group rounded-xl border border-slate-200/60 bg-slate-50 p-8 transition-all duration-200 hover:border-blue-300 hover:shadow-lg hover:scale-105">
              <div className="mb-6 inline-flex rounded-lg bg-blue-100 p-3">
                <Lock className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="mb-3 text-lg font-semibold text-slate-900">
                Bank-Grade Rate Limiting
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Secure infrastructure engineered to mitigate API token abuse and accidental frontend loop recursion. Features an automated backend gate restricting requests to a strict 15-request window fallback per 15 minutes.
              </p>
            </div>

            {/* Card 4: Ecosystem Aggregation */}
            <div className="group rounded-xl border border-slate-200/60 bg-slate-50 p-8 transition-all duration-200 hover:border-purple-300 hover:shadow-lg hover:scale-105">
              <div className="mb-6 inline-flex rounded-lg bg-purple-100 p-3">
                <Smartphone className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="mb-3 text-lg font-semibold text-slate-900">
                Complete Ecosystem Aggregation
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Seamlessly query your historical 30-day ledger context arrays. Fully compatible with multi-identifier auth schemas (Email, Phone, or Username verification) to synchronize data across any physical or digital payment medium.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-slate-50 px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
            Ready to Break Free from Ecosystem Lock-In?
          </h2>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
            Join thousands of users taking control of their complete financial narrative. Start your free trial today—no credit card required.
          </p>
          <button className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-8 py-4 font-semibold text-white transition-all duration-200 hover:bg-indigo-700 active:scale-95">
            Get Started Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200/60 bg-white px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-4 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-6 w-6 rounded-lg bg-indigo-600" />
                <span className="font-bold text-slate-900">FinSight</span>
              </div>
              <p className="text-sm text-slate-600">
                AI-powered financial tracking across every ecosystem.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><a href="#" className="hover:text-slate-900">Features</a></li>
                <li><a href="#" className="hover:text-slate-900">Pricing</a></li>
                <li><a href="#" className="hover:text-slate-900">Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><a href="#" className="hover:text-slate-900">About</a></li>
                <li><a href="#" className="hover:text-slate-900">Blog</a></li>
                <li><a href="#" className="hover:text-slate-900">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><a href="#" className="hover:text-slate-900">Privacy</a></li>
                <li><a href="#" className="hover:text-slate-900">Terms</a></li>
                <li><a href="#" className="hover:text-slate-900">Compliance</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-200/60 pt-8">
            <p className="text-sm text-slate-600 text-center">
              © 2026 FinSight. All rights reserved. | Deterministic AI, Real-Time Analysis, Zero Ecosystem Lock-In.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
