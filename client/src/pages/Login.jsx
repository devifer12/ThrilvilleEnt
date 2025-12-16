import React, { useState, useContext } from 'react'
import { useNavigate, useLocation, NavLink } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const Login = () => {
  const [name, setName] = useState('')
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()
  const location = useLocation()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.trim()) return
    login({ name: name.trim() })
    const dest = location.state?.from?.pathname || '/'
    navigate(dest)
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="p-8 bg-white rounded shadow max-w-sm w-full">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <label className="block mb-2 text-sm font-medium">Username</label>
        <input value={name} onChange={e => setName(e.target.value)} className="w-full p-2 border rounded mb-4" placeholder="Enter your name" />
        <button type="submit" className="w-full py-2 bg-black text-white rounded">Sign in</button>
        <div className="mt-4 text-center">
          <p className="text-sm">Don't have an account? <NavLink to="/register" className="text-blue-600">Register</NavLink></p>
        </div>
      </form>
    </div>
  )
}

export default Login
