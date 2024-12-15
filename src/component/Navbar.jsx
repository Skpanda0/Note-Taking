import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex flex-row gap-4 place-content-center w-[100vw] p-4 bg-zinc-700'>
      <NavLink to="/" className={({ isActive }) =>
          isActive
            ? 'text-blue-600 px-3 py-2'
            : 'text-white hover:text-gray-400 px-3 py-2'
        }
      >
        Home
      </NavLink>
      <NavLink to="/pastes" className={({ isActive }) =>
          isActive
            ? 'text-blue-600 px-3 py-2'
            : 'text-white hover:text-gray-400 px-3 py-2'
           
        }
      >
        Notes
      </NavLink>
    </div>
  )
}

export default Navbar
