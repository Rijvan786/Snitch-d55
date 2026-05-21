import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { useAuth } from '../../auth/hook/useAuth.js';

const SellerProfile = () => {
  const navigate = useNavigate();
  const { handleLogout } = useAuth();
  const user = useSelector((state) => state.auth?.User);

  if (!user || user.role !== 'seller') {
    return (
      <div className="min-h-screen bg-[#F7F7F7] flex items-center justify-center font-[Inter,sans-serif]">
        <div className="text-center">
          <p className="text-[11px] text-zinc-400 tracking-[0.3em] uppercase mb-4">Seller access required</p>
          <button
            onClick={() => navigate('/login')}
            className="bg-[#1A1A1A] text-white px-8 py-3 text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-black transition-colors"
          >
            Sign In as Seller
          </button>
        </div>
      </div>
    );
  }

  const initials = user.fullname
    ? user.fullname.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
    : 'S';

  const infoRows = [
    { label: 'Full Name', value: user.fullname  || '—' },
    { label: 'Email',     value: user.email     || '—' },
    { label: 'Contact',   value: user.contact   || '—' },
    { label: 'Account',   value: 'Seller'               },
  ];

  const quickLinks = [
    { label: 'Dashboard',   path: '/seller/Dashboard',      icon: 'M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zm9.75 0A2.25 2.25 0 0115.75 3.75H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zm9.75 0a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z', primary: true  },
    { label: 'Add Product', path: '/seller/create-product', icon: 'M12 4.5v15m7.5-7.5h-15',                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    primary: false },
    { label: 'View Store',  path: '/',                      icon: 'M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25',                                                                                                                                                                                                                                                                                                                            primary: false },
  ];

  return (
    <div className="min-h-screen bg-[#F7F7F7] font-[Inter,sans-serif] text-[#1A1A1A]">

      {/* ── Sticky top header ── */}
      <header className="sticky top-0 z-30 bg-white border-b border-[#EBEBEB] px-6 sm:px-10 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-zinc-400 hover:text-[#1A1A1A] transition-colors"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
          </button>
          <div className="h-4 w-px bg-[#EBEBEB]" />
          <span className="text-[11px] font-bold tracking-[0.22em] uppercase text-[#1A1A1A]">SNITCH</span>
          <span className="text-[10px] text-zinc-400 tracking-[0.15em] uppercase">/ Seller Profile</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/seller/Dashboard')}
            className="h-8 px-4 bg-[#1A1A1A] text-white text-[10px] font-bold tracking-[0.15em] uppercase hover:bg-black transition-colors"
          >
            Dashboard →
          </button>
          <button
            onClick={handleLogout}
            title="Logout"
            className="h-8 px-3 border border-red-200 text-red-400 hover:bg-red-50 hover:text-red-500 text-[10px] font-bold tracking-[0.15em] uppercase transition-colors flex items-center gap-1.5"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
            </svg>
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </header>

      {/* ── Main content ── */}
      <div className="max-w-2xl mx-auto px-6 sm:px-10 py-10 pb-24">

        {/* ── Avatar + name block ── */}
        <div className="bg-white border border-[#EBEBEB] p-8 mb-6 flex items-center gap-6 rounded-xl">
          <div className="w-16 h-16 bg-[#1A1A1A] flex items-center justify-center shrink-0 rounded-lg">
            <span className="text-white text-xl font-extrabold tracking-tight">{initials}</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <h1 className="text-lg font-extrabold tracking-tight uppercase text-[#1A1A1A] leading-none">
                {user.fullname || 'Seller'}
              </h1>
              <span className="text-[8px] font-bold tracking-[0.2em] uppercase border border-[#1A1A1A] px-1.5 py-0.5 text-[#1A1A1A] leading-none">
                Seller
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 tracking-[0.15em] uppercase truncate">{user.email}</p>
          </div>
          {/* Logout on avatar card (mobile friendly) */}
          <button
            onClick={handleLogout}
            className="shrink-0 flex items-center gap-1.5 text-red-400 hover:text-red-600 transition-colors"
            title="Sign Out"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
            </svg>
          </button>
        </div>

        {/* ── Profile details ── */}
        <div className="bg-white border border-[#EBEBEB] mb-6 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-[#EBEBEB]">
            <h2 className="text-[10px] font-bold tracking-[0.25em] uppercase text-zinc-400">Profile Details</h2>
          </div>
          <div className="divide-y divide-[#F3F3F3]">
            {infoRows.map(({ label, value }) => (
              <div key={label} className="flex items-center justify-between px-6 py-4">
                <span className="text-[10px] font-semibold tracking-[0.18em] uppercase text-zinc-400 shrink-0 w-32">{label}</span>
                <span className="text-sm text-[#1A1A1A] font-medium text-right truncate">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Quick Actions ── */}
        <div className="bg-white border border-[#EBEBEB] mb-6 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-[#EBEBEB]">
            <h2 className="text-[10px] font-bold tracking-[0.25em] uppercase text-zinc-400">Quick Actions</h2>
          </div>
          <div className="divide-y divide-[#F3F3F3]">
            {quickLinks.map(({ label, path, icon, primary }) => (
              <button
                key={label}
                onClick={() => navigate(path)}
                className={`w-full flex items-center justify-between px-6 py-4 transition-colors hover:bg-[#F7F7F7] ${primary ? 'font-bold text-[#1A1A1A]' : 'text-zinc-400 hover:text-[#1A1A1A]'}`}
              >
                <div className="flex items-center gap-3">
                  <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
                  </svg>
                  <span className="text-[10px] font-semibold tracking-[0.18em] uppercase">{label}</span>
                </div>
                <svg className="h-4 w-4 text-zinc-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            ))}
          </div>
        </div>

        {/* ── Sign out button ── */}
        <button
          onClick={handleLogout}
          className="w-full border border-red-200 bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600 py-4 text-[10px] font-bold tracking-[0.2em] uppercase transition-colors rounded-xl flex items-center justify-center gap-2"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
          </svg>
          Sign Out of Seller Account
        </button>

      </div>
    </div>
  );
};

export default SellerProfile;
