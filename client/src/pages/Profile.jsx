import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const Profile = () => {
  const { user, logout } = useContext(AuthContext)

  if (!user) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-gray-600">You are not signed in.</p>
      </div>
    )
  }

  return (
    <div className="h-screen flex items-center justify-center bg-white">
      <div className="p-8 bg-gray-50 rounded shadow text-center">
        <h1 className="text-2xl font-bold mb-2">Welcome, {user.name}!</h1>
        <p className="text-gray-600 mb-4">This is your profile placeholder.</p>
        <button onClick={logout} className="py-2 px-4 bg-black text-white rounded">Sign out</button>
      </div>
    </div>
  )
}

export default Profile
