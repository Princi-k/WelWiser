import React from 'react'
import MetricsCard from './components/MetricsCard'
import { BarChart } from 'lucide-react'
import  TrendChart from './components/TrendChart'
import CustomCategoryChart from './components/CustomCategoryChart' 
import AIExpenseParser from './components/AIExpenseParser'
import RecentTransactions from './components/RecentTransactions'

const DashBoardPage = () => {
  return (
   <div className="space-y-6">
      <MetricsCard />
      <AIExpenseParser />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         <TrendChart />
         <CustomCategoryChart />
      </div>
      
      <RecentTransactions />
   </div>
  )
}

export default DashBoardPage
