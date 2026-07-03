import React from 'react'
import { Outlet } from 'react-router-dom'
import DashHeader from './components/DashHeader'
import DashNav from './components/DashNav'

const Dashboard = () => {
  return (
   <div className="min-h-screen bg-[#0c0e17] text-slate-100 relative">
      <DashNav />
      <div className="ml-64">
        <DashHeader/>
        <main className="p-6 md:p-8 print:block print:p-0">
          <div className="max-w-5xl space-y-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

export default Dashboard
