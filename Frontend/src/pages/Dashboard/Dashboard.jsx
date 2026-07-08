import React from 'react'
import { Outlet } from 'react-router-dom'
import DashHeader from './components/DashHeader'
import DashNav from './components/DashNav'

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-slate-50/40 text-slate-800 relative overflow-hidden">
      {/* Premium Fluid Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[15%] w-[50rem] h-[50rem] rounded-full bg-indigo-200/30 mix-blend-multiply filter blur-[110px] animate-blob" />
        <div className="absolute top-[30%] right-[-10%] w-[55rem] h-[55rem] rounded-full bg-purple-200/35 mix-blend-multiply filter blur-[130px] animate-blob animation-delay-2000" />
        <div className="absolute bottom-[-10%] left-[10%] w-[52rem] h-[52rem] rounded-full bg-pink-100/40 mix-blend-multiply filter blur-[120px] animate-blob animation-delay-4000" />
      </div>

      <div className="relative z-10">
        <DashNav />
        <div className="ml-64">
          <DashHeader />
          <main className="p-6 md:p-8 print:block print:p-0">
            <div className="max-w-5xl space-y-6">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
