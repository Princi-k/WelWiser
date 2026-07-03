import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './pages/Home/Home'
import Navbar from './pages/Home/Navbar'
import Login from './components/Login'
import HomeLayout from './pages/Home/HomeLayout'
import Features from './pages/Home/Features'
import Aiadvisor from './pages/Home/Aiadvisor'
import Insights from './pages/Home/Insights'
import Register from './components/Register'
import Dashboard from './pages/Dashboard/Dashboard'
import DashBoardPage from './pages/Dashboard/DashBoardPage'
import MetricsCard from './pages/Dashboard/components/MetricsCard'
import DeepAnalytics from './pages/Dashboard/DeepAnalytics'
import TransactionPage from './pages/Dashboard/TransactionPage'
import AddTransactionPage from './pages/Dashboard/AddTransactions'
import  ProfilePage  from './pages/Dashboard/Profile'
import  ParserGuidePage  from './pages/Dashboard/AiGuide'
import AiAdvisorPage from './pages/Dashboard/AiAdvisorPage'
import { AnalyticsProvider } from './context/AnalyticsContext'


const App = () => {
  return (
    
      <Routes>
        <Route element={<HomeLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Home />} />
          <Route path="/register" element={<Home />} />
          <Route path="features" element={<Features />} />
          <Route path="ai-advisor" element={<Aiadvisor />} />
          <Route path="insights" element={<Insights />} />
        </Route>
        <Route path='/dashboard' element={
          <AnalyticsProvider>
             <Dashboard/>
          </AnalyticsProvider>
          
          } >
              <Route index  element={<DashBoardPage />} />
              <Route path='analytics'  element={<DeepAnalytics />} />
              <Route path='ai-advisor' element={<AiAdvisorPage />} />
               <Route path='transactions' element={<TransactionPage />} />
               <Route path='add-transaction' element={<AddTransactionPage />} />
               <Route path='parser-guide' element={<ParserGuidePage />} />
               <Route path='profile' element={<ProfilePage />} />
        </Route>
      </Routes>
    
  
    
  )
}

export default App
