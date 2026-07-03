import React, { useEffect } from 'react'
import Navbar from './Navbar'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import Login from '../../components/Login'
import Register from '../../components/Register'

const HomeLayout = () => {
  const { pathname, hash } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (!hash) return

    const section = document.querySelector(hash)
    section?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [hash])

  const isLogin = pathname === '/login'
  const isRegister = pathname === '/register'

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      navigate('/')
    }
  }

  return (
    <div className="bg-transparent min-h-screen text-slate-800 relative">
      <Navbar />
      <Outlet />

      {/* Login Modal Overlay */}
      {isLogin && (
        <div 
          onClick={handleBackdropClick}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto"
        >
          <Login isModal={true} />
        </div>
      )}

      {/* Register Modal Overlay */}
      {isRegister && (
        <div 
          onClick={handleBackdropClick}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto"
        >
          <Register isModal={true} />
        </div>
      )}
    </div>
  )
}

export default HomeLayout
