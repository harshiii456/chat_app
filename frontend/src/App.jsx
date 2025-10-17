import React from 'react'
import Navbar from './components/Navbar'

import HomePage from './pages/HomePage.jsx'
import SignupPage from './pages/SignupPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SettingsPage from './pages/SettingsPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'

import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from './store/useAuthStore.js'
import { Loader } from 'lucide-react'


export default function App() {
  const {authUser,checkAuth,isCheckingAuth}= useAuthStore();
  
  React.useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log({authUser});

  if(isCheckingAuth && !authUser) return (

    <div className="flex items-center justify-center min-h-screen">
      <Loader className="size-10 animate-spin" />
      </div>
  )

  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={authUser ? <HomePage/> : <Navigate to="/login" />} />
        <Route path="/signup" element={authUser ? <SignupPage/> : <Navigate to="/" />} />
        <Route path="/login" element={authUser ? <LoginPage/> : <Navigate to="/" />} />
        <Route path="/settings" element={<SettingsPage/>} />
        <Route path="/profile" element={authUser ? <ProfilePage/> : <Navigate to="/login" />} />
      </Routes>
    </div>
  )
}
