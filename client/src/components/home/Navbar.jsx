import React, { useContext } from "react";
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'

import { FaUserAlt } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { IoClose } from "react-icons/io5";

const Navbar = () => {

  return (
    <>
      {/* Desktop Layout */}
      <div className="hidden lg:flex z-100 fixed top-0 left-0 right-0 justify-between p-8 text-[1.3vw]">
        <div className="flex gap-4">
          <NavLink to="/" end className={({isActive}) => `px-3 py-2 ${isActive ? 'bg-black text-white rounded-full' : ''}`}>
            Home
          </NavLink>
          <NavLink to="/activities" className={({isActive}) => `px-3 py-2 ${isActive ? 'bg-black text-white rounded-full' : ''}`}>
            Activities
          </NavLink>
          <NavLink to="/about" className={({isActive}) => `px-3 py-2 ${isActive ? 'bg-black text-white rounded-full' : ''}`}>
            About Us
          </NavLink>
        </div>
        <div className="flex gap-4 items-center">
          <NavLink to="/contact" className={({isActive}) => `px-3 py-2 ${isActive ? 'bg-black text-white rounded-full' : ''}`}>
            Contact Us
          </NavLink>
          {/* Auth state: show name and profile link if signed in, otherwise single Get started */}
          <AuthConsumer />
        </div>
      </div>
      {/* Mobile Layout */}
      <div className="lg:hidden z-200 fixed top-0 left-0 right-0 flex items-center justify-between px-4 py-3 bg-white shadow">
        <div className="flex items-center gap-3">
          {/* show profile or get started on mobile */}
          <MobileAuth />
        </div>
        <MobileToggle />
      </div>

      {/* Mobile menu overlay */}
      <MobileMenu />
    </>
  );
};

const AuthConsumer = () => {
  const { user } = useContext(AuthContext)
  if (user) {
    return (
      <NavLink to="/profile" className="flex items-center gap-2 px-3 py-2 bg-black text-white rounded-full">
        <div className="text-sm">{user.name}</div>
        <div className="text-2xl"><FaUserAlt /></div>
      </NavLink>
    )
  }

  return (
    <div>
      <NavLink to="/login" className={( { isActive } ) => `px-3 py-2 ${isActive ? 'bg-black text-white rounded-full' : 'bg-amber-500 text-black rounded-full'}`}>
        Get started
      </NavLink>
    </div>
  )
}

const MobileToggle = () => {
  const [open, setOpen] = React.useState(false)
  // expose to window so other components can close it (simple approach)
  React.useEffect(() => {
    window.__mobileMenuToggle = { open, setOpen }
    if (open) document.body.classList.add('mobile-menu-open')
    else document.body.classList.remove('mobile-menu-open')
    return () => { window.__mobileMenuToggle = null; document.body.classList.remove('mobile-menu-open') }
  }, [open])

  return (
    <button
      aria-label={open ? 'Close menu' : 'Open menu'}
      aria-expanded={open}
      onClick={() => setOpen(v => !v)}
      className="text-3xl p-1 rounded-lg"
    >
      {open ? <IoClose /> : <IoMenu />}
    </button>
  )
}

const MobileAuth = () => {
  const { user } = useContext(AuthContext)
  if (user) {
    return (
      <NavLink to="/profile" className="flex items-center gap-2">
        <div className="text-2xl p-2 bg-black text-white rounded-full"><FaUserAlt /></div>
        <div className="font-medium">{user.name}</div>
      </NavLink>
    )
  }

  return (
    <NavLink to="/login" className="mobile-header-auth px-3 py-2 bg-amber-500 text-black rounded-full">
      Get started
    </NavLink>
  )
}

const MobileMenu = () => {
  const [open, setOpen] = React.useState(false)
  React.useEffect(() => {
    const handle = () => setOpen(window.__mobileMenuToggle?.open ?? false)
    handle()
    window.addEventListener('resize', handle)
    const i = setInterval(handle, 100)
    return () => { window.removeEventListener('resize', handle); clearInterval(i) }
  }, [])

  const { user, logout } = useContext(AuthContext)
  if (!open) return null

  const close = () => window.__mobileMenuToggle?.setOpen(false)

  return (
    <div className="lg:hidden fixed top-14 left-0 right-0 bg-white z-300 shadow-md py-6 px-6">
      <nav className="flex flex-col gap-4">
        <NavLink to="/" end onClick={close} className={({isActive}) => `py-2 ${isActive ? 'bg-black text-white rounded-full px-4' : 'px-2'}`}>
          Home
        </NavLink>
        <NavLink to="/activities" onClick={close} className={({isActive}) => `py-2 ${isActive ? 'bg-black text-white rounded-full px-4' : 'px-2'}`}>
          Activities
        </NavLink>
        <NavLink to="/about" onClick={close} className={({isActive}) => `py-2 ${isActive ? 'bg-black text-white rounded-full px-4' : 'px-2'}`}>
          About Us
        </NavLink>
        <NavLink to="/contact" onClick={close} className={({isActive}) => `py-2 ${isActive ? 'bg-black text-white rounded-full px-4' : 'px-2'}`}>
          Contact Us
        </NavLink>
        <div className="border-t mt-2 pt-4 flex flex-col gap-3">
          {user ? (
            <>
              <NavLink to="/profile" onClick={close} className="py-2 px-3">Profile</NavLink>
              <button onClick={() => { logout(); close() }} className="py-2 px-3 text-left">Sign out</button>
            </>
          ) : (
            <NavLink to="/login" onClick={close} className="py-2 px-3 bg-amber-500 text-black rounded-full w-max">Get started</NavLink>
          )}
        </div>
      </nav>
    </div>
  )
}

export default Navbar;
