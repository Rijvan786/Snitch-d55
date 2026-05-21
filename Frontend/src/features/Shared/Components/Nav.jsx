import React from 'react'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'

const Nav = () => {
    const navigate = useNavigate()
    const user = useSelector((state) => state.auth?.User)
    const cartCount = useSelector((state) => state.cart?.items?.length ?? 0)
    const displayName = user?.fullname || user?.username || user?.email?.split('@')[0] || null

  return (
      <nav className="fixed top-0 inset-x-0 z-40 flex items-center justify-between px-8 xl:px-16 h-24 bg-black border-b border-zinc-900">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-4 group w-32"
        >
          <div className="w-8 h-[1px] bg-zinc-600 group-hover:w-12 transition-all duration-300"></div>
          <span className="text-[10px] font-medium tracking-[0.3em] uppercase text-white group-hover:text-[#F5C518] transition-colors">
            Back
          </span>
        </button>
        
        <span className="text-[#F5C518] text-sm font-bold tracking-[0.3em] uppercase leading-none absolute left-1/2 -translate-x-1/2">SNITCH</span>

        {/* Right side — only when logged in */}
        {user && (
          <div className="flex items-center gap-5">
            {/* Cart icon with badge */}
            <button
              onClick={() => navigate('/cart')}
              className="relative group"
              aria-label="Cart"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-zinc-400 group-hover:text-[#F5C518] transition-colors duration-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 min-w-[16px] h-4 bg-[#F5C518] text-black text-[9px] font-extrabold leading-none rounded-full flex items-center justify-center px-[3px]">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </button>

            {/* Username → Profile */}
            <button
              onClick={() => navigate(user?.role === 'seller' ? '/seller/profile' : '/Profile')}
              className="flex items-center gap-3 group"
            >
              <span className="text-[10px] font-medium tracking-[0.3em] uppercase text-zinc-400 group-hover:text-[#F5C518] transition-colors truncate max-w-[90px]">
                {displayName}
              </span>
              <div className="w-5 h-5 bg-[#F5C518] flex items-center justify-center shrink-0">
                <span className="text-black text-[9px] font-extrabold leading-none">
                  {displayName?.[0]?.toUpperCase() ?? '?'}
                </span>
              </div>
            </button>
          </div>
        )}
      </nav>
  )
}

export default Nav