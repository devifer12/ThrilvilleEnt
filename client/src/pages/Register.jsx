import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const Register = () => {
  const [name, setName] = useState('')
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.trim()) return
    // For placeholder: register just logs the user in
    login({ name: name.trim() })
    navigate('/')
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="p-8 bg-white rounded shadow max-w-sm w-full">
        <h1 className="text-2xl font-bold mb-4">Register</h1>
        <label className="block mb-2 text-sm font-medium">Username</label>
        <input value={name} onChange={e => setName(e.target.value)} className="w-full p-2 border rounded mb-4" placeholder="Choose a username" />
        <button type="submit" className="w-full py-2 bg-black text-white rounded">Register</button>
      </form>
    </div>
  )
}

export default Register
