import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { useAuth } from '../../auth/hook/useAuth.js';

const UserProfile = () => {
  const navigate = useNavigate();
  const { handleLogout } = useAuth();
  const user = useSelector((state) => state.auth?.User);

  if (!user) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[10px] text-zinc-600 tracking-[0.3em] uppercase mb-4">Not signed in</p>
          <button
            onClick={() => navigate('/login')}
            className="bg-[#F5C518] text-black px-8 py-3 text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-white transition-colors rounded-none"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  const initials = user.fullname
    ? user.fullname.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
    : user.email?.[0]?.toUpperCase() ?? '?';

  // Get a displayable ID from database ID
  const displayId = user._id ? user._id.slice(-4).toUpperCase() : '8821';

  return (
    <div className="min-h-screen bg-[#141313] font-[Inter,sans-serif] text-[#e5e2e1] pb-24 selection:bg-[#F5C518] selection:text-black">
      
      {/* top grid styles for background */}
      <style>{`
        .editorial-grid {
          background-image: 
            linear-gradient(to right, rgba(229, 226, 225, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(229, 226, 225, 0.03) 1px, transparent 1px);
          background-size: 40px 40px;
        }
      `}</style>

      {/* ── Top App Bar ── */}
      <header className="sticky top-0 z-50 flex justify-between items-center w-full px-6 sm:px-[64px] h-16 bg-[#141313]/95 backdrop-blur-md border-b border-[#444748]/50">
        <div className="flex items-center">
          <button 
            onClick={() => navigate(-1)} 
            className="text-[#e5e2e1] hover:text-[#F5C518] transition-colors duration-200 flex items-center gap-2"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            <span className="hidden sm:inline text-[10px] tracking-[0.1em] uppercase font-semibold">Back</span>
          </button>
        </div>
        <div className="absolute left-1/2 -translate-x-1/2">
          <h1 className="font-[Inter] text-base font-black text-[#e5e2e1] tracking-[0.2em] uppercase">SNITCH</h1>
        </div>
        <div className="flex items-center gap-6">
          <button onClick={() => navigate('/cart')} className="text-[#e5e2e1] hover:text-[#F5C518] transition-colors duration-200 relative">
            <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
          </button>
          <button className="text-[#F5C518]">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </header>

      <main className="min-h-screen">
        {/* ── Editorial Hero Section ── */}
        <section className="editorial-grid w-full h-[320px] flex flex-col justify-end px-6 sm:px-[64px] pb-8 border-b border-[#444748]/50">
          <div className="flex flex-col gap-2">
            <span className="text-[11px] font-semibold text-[#F5C518] uppercase tracking-[0.2em] font-[Inter]">Editorial Account No. {displayId}</span>
            <h2 className="text-5xl sm:text-7xl font-extrabold text-[#e5e2e1] uppercase tracking-[-0.03em] font-[Inter]">PROFILE</h2>
          </div>
        </section>

        {/* ── Profile Identity & Information ── */}
        <section className="w-full px-6 sm:px-[64px] py-16 sm:py-[100px] grid grid-cols-12 gap-8 items-start max-w-[1440px] mx-auto">
          {/* Identity Square */}
          <div className="col-span-12 md:col-span-4 lg:col-span-3 flex justify-start">
            <div className="w-full aspect-square bg-[#F5C518] flex items-center justify-center border border-[#444748] group relative overflow-hidden rounded-none">
              <span className="text-black text-6xl font-black tracking-tight select-none">{initials}</span>
              <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          </div>

          {/* Detailed Info */}
          <div className="col-span-12 md:col-span-8 lg:col-span-9 flex flex-col gap-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-8 border-t border-[#444748] pt-8">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-semibold text-[#8e9192] uppercase tracking-[0.15em]">Full Name</label>
                <p className="text-xl sm:text-2xl font-bold text-[#e5e2e1] uppercase">{user.fullname || 'Anonymous'}</p>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-semibold text-[#8e9192] uppercase tracking-[0.15em]">Email Address</label>
                <p className="text-xl sm:text-2xl font-bold text-[#e5e2e1] tracking-tight break-all lowercase">{user.email || '—'}</p>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-semibold text-[#8e9192] uppercase tracking-[0.15em]">Contact Number</label>
                <p className="text-xl sm:text-2xl font-bold text-[#e5e2e1] uppercase">{user.contact || '—'}</p>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-semibold text-[#8e9192] uppercase tracking-[0.15em]">Account Role</label>
                <div className="flex items-center gap-4">
                  <span className="text-xl sm:text-2xl font-bold text-[#e5e2e1] uppercase">
                    {user.role === 'seller' ? 'Seller Member' : 'Member'}
                  </span>
                  <span className="px-2 py-0.5 border border-[#F5C518] text-[#F5C518] text-[9px] font-bold tracking-[0.15em] uppercase">Verified</span>
                </div>
              </div>
            </div>

            {/* Action Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              <button 
                onClick={() => navigate('/cart')}
                className="w-full bg-[#F5C518] text-black py-5 px-6 flex justify-between items-center group transition-all duration-300 hover:bg-white rounded-none active:scale-[0.98]"
              >
                <span className="text-xs font-black uppercase tracking-[0.15em]">View My Bag</span>
                <svg className="h-4 w-4 group-hover:translate-x-2 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>

              {user.role === 'seller' ? (
                <button 
                  onClick={() => navigate('/seller/Dashboard')}
                  className="w-full bg-white text-black py-5 px-6 flex justify-between items-center group transition-all duration-300 hover:bg-[#F5C518] rounded-none active:scale-[0.98]"
                >
                  <span className="text-xs font-black uppercase tracking-[0.15em]">Seller Dashboard</span>
                  <svg className="h-4 w-4 group-hover:translate-x-2 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </button>
              ) : (
                <button 
                  onClick={handleLogout}
                  className="w-full bg-transparent border border-[#444748] py-5 px-6 flex justify-between items-center group hover:border-red-500 hover:text-red-500 transition-all duration-300 rounded-none active:scale-[0.98]"
                >
                  <span className="text-xs font-black uppercase tracking-[0.15em] text-[#e5e2e1] group-hover:text-red-500 transition-colors">Sign Out</span>
                  <svg className="h-4 w-4 text-[#e5e2e1] group-hover:text-red-500 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>
              )}
            </div>

            {/* If seller, place the sign-out button underneath */}
            {user.role === 'seller' && (
              <button 
                onClick={handleLogout}
                className="w-full bg-transparent border border-[#444748] py-5 px-6 flex justify-between items-center group hover:border-red-500 hover:text-red-500 transition-all duration-300 rounded-none active:scale-[0.98]"
              >
                <span className="text-xs font-black uppercase tracking-[0.15em] text-[#e5e2e1] group-hover:text-red-500 transition-colors">Sign Out</span>
                <svg className="h-4 w-4 text-[#e5e2e1] group-hover:text-red-500 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            )}
          </div>
        </section>

        {/* ── Latest Curation Section ── */}
        <section className="w-full px-6 sm:px-[64px] py-16 sm:py-[100px] border-t border-[#444748]/50 max-w-[1440px] mx-auto">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
              <h3 className="text-3xl sm:text-5xl font-black text-[#e5e2e1] uppercase tracking-tighter leading-none">LATEST CURATION</h3>
              <p className="text-sm text-[#8e9192] leading-relaxed max-w-sm">Refined selections based on your recent editorial views and stylistic preferences. Updated every 24 hours by our London studio.</p>
            </div>
            <div className="col-span-12 lg:col-span-8 grid grid-cols-2 gap-6 sm:gap-8">
              <div className="aspect-[3/4] bg-[#201f1f] relative group cursor-pointer overflow-hidden border border-[#444748]/50">
                <img 
                  alt="Luxury fashion curation" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDeRGcnoMWQibQ4uUIcBe5fQU076NB9mklJhtU26vmbEXTzwik00AaSSlEYWe0OyMTF1LUT80VKvd1Jt0ct65EALR0Zpci2b14wPFnq14BAWx1_i1_fx2DYZHfSc_YeesWmLYt2KFRbCiUYugjJ9jR8ooNgbYfKqpMUsAAOZSNI78TNmIjkuxaFTRCRo_LfXsd8UIEhEze7Es8A6Vgd_Cjr__OzyXn8ROQjvZ7u-EmqUyc-s52V4TJ2_wkmcm9KMlka3B3HqR45oJw"
                />
                <div className="absolute bottom-0 left-0 p-4 bg-black/80 backdrop-blur-md w-full border-t border-[#444748]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-[10px] font-bold text-[#F5C518] uppercase tracking-widest">View Curation 01</p>
                </div>
              </div>
              <div className="aspect-[3/4] bg-[#201f1f] relative group cursor-pointer overflow-hidden border border-[#444748]/50 mt-8 sm:mt-16">
                <img 
                  alt="Editorial Look accessory curation" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAzh1oYf1ooxk8DTwXFG9L6ttX1m3dzkF9lG5tF-oveKgprual4pQ33NN1GVdHCo7mOoLKjPtpu9zIiRUmNeoVMnKywrhtOR89ySYLyTH7As-uFbtNPuToJB4pcq5WFGIPA1Jo23LG43mzraWsmzy2JiPIawMhkx77IcYVTlZd5m1pmMrlMkMagW1-ZjX6qCSY-z3-WvNduLdB4gN3WUG7EGyKYyc4yfoZxZ4rht9Uc_U2kL4tdjNORjmsM34Z4TRRozFef4GYAjJg"
                />
                <div className="absolute bottom-0 left-0 p-4 bg-black/80 backdrop-blur-md w-full border-t border-[#444748]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-[10px] font-bold text-[#F5C518] uppercase tracking-widest">View Curation 02</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="w-full py-16 px-6 sm:px-[64px] flex flex-col items-center gap-6 border-t border-[#444748]/50 bg-[#141313]">
        <h2 className="text-3xl font-black text-[#e5e2e1] tracking-[0.2em] uppercase">SNITCH</h2>
        <div className="flex flex-wrap justify-center gap-6 text-[10px] font-bold tracking-widest">
          <a className="text-[#8e9192] hover:text-[#F5C518] hover:underline decoration-[#F5C518] decoration-2 underline-offset-4 transition-all duration-300" href="#">PRIVACY</a>
          <a className="text-[#8e9192] hover:text-[#F5C518] hover:underline decoration-[#F5C518] decoration-2 underline-offset-4 transition-all duration-300" href="#">TERMS</a>
          <a className="text-[#8e9192] hover:text-[#F5C518] hover:underline decoration-[#F5C518] decoration-2 underline-offset-4 transition-all duration-300" href="#">ACCESSIBILITY</a>
          <a className="text-[#8e9192] hover:text-[#F5C518] hover:underline decoration-[#F5C518] decoration-2 underline-offset-4 transition-all duration-300" href="#">CONTACT</a>
        </div>
        <p className="text-[9px] text-[#8e9192] opacity-50 mt-4 tracking-widest uppercase">© 2026 SNITCH EDITORIAL. ALL RIGHTS RESERVED.</p>
      </footer>
    </div>
  );
};

export default UserProfile;

