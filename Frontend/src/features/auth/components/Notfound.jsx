import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hook/useAuth.js";

/* ─────────────────────────────────────────────────────────────
   Snitch — 404 Not Found Page (Notfound.jsx)
   Theme: Matching Home.jsx Noir & Gold luxury streetwear aesthetic
   Palette: Background #0D0D0D, Card #111, Accent #F5C518, Text #F5F5F0
───────────────────────────────────────────────────────────── */

const Notfound = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  // Redux state & auth
  const user = useSelector((state) => state.auth?.User);
  const cartItems = useSelector((state) => state.cart?.items) ?? [];
  const cartCount = cartItems.length;
  const { handleLogout } = useAuth();

  const displayName =
    user?.fullname || user?.username || user?.email?.split("@")[0] || null;

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate("/");
    }
  };

  return (
    <div
      className="min-h-screen bg-[#0D0D0D] flex flex-col justify-between selection:bg-[#F5C518] selection:text-black"
      style={{ fontFamily: "'Inter', sans-serif", color: "#F5F5F0" }}
    >
      {/* ══ NAVBAR (Matches Home.jsx) ══════════════════════════════ */}
      <nav className="fixed top-0 inset-x-0 z-50 flex items-center gap-4 px-6 xl:px-14 h-16 bg-[#0D0D0D]/95 backdrop-blur-sm border-b border-zinc-900">
        {/* Brand Logo & Name */}
        <Link to="/" className="flex items-center gap-3 shrink-0 group">
          <div className="relative w-10 h-10 rounded-full overflow-hidden bg-black/90 border border-[#F5C518]/40 group-hover:border-[#F5C518] transition-all duration-300 shadow-md shadow-[#F5C518]/10 group-hover:scale-105 group-hover:shadow-[#F5C518]/25 flex items-center justify-center p-0.5">
            <img
              src="/Snitch.png"
              alt="Snitch Logo"
              className="w-full h-full object-cover rounded-full transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          <div className="shrink-0">
            <span className="text-[#F5C518] text-lg font-extrabold tracking-[0.3em] uppercase leading-none group-hover:text-white transition-colors duration-200">
              SNITCH
            </span>
            <p className="text-[8px] text-zinc-600 tracking-[0.25em] uppercase mt-0.5 group-hover:text-zinc-400 transition-colors">
              EST. 2020
            </p>
          </div>
        </Link>

        {/* Search Bar */}
        <form
          onSubmit={handleSearchSubmit}
          className="flex-1 hidden sm:block max-w-md ml-4"
        >
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-600 pointer-events-none"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products or collections…"
              className="w-full bg-[#111] border border-zinc-800 rounded-md pl-9 pr-4 py-2 text-sm text-[#F5F5F0] placeholder-zinc-600 outline-none focus:border-[#F5C518] transition-colors"
            />
          </div>
        </form>

        {/* Right actions */}
        <div className="flex items-center gap-5 ml-auto shrink-0">
          <ul className="hidden md:flex items-center gap-7">
            {["Home", "Shop", "Collections", "About"].map((link) => (
              <li key={link}>
                <Link
                  to="/"
                  className="text-[11px] font-medium tracking-[0.15em] uppercase text-zinc-500 hover:text-[#F5F5F0] transition-colors duration-200"
                >
                  {link}
                </Link>
              </li>
            ))}
          </ul>

          {/* Cart Icon */}
          <button
            onClick={() => navigate("/cart")}
            className="relative text-zinc-500 hover:text-[#F5F5F0] transition-colors cursor-pointer"
            aria-label="Cart"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z"
              />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 min-w-[16px] h-4 bg-[#F5C518] text-black text-[9px] font-extrabold leading-none rounded-full flex items-center justify-center px-[3px]">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </button>

          {/* User Profile or Login */}
          {user ? (
            <div className="hidden sm:flex items-center gap-3">
              <button
                onClick={() =>
                  navigate(user?.role === "seller" ? "/seller/profile" : "/Profile")
                }
                className="flex items-center gap-2 group cursor-pointer"
              >
                <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-zinc-400 group-hover:text-[#F5C518] transition-colors truncate max-w-[80px]">
                  {displayName}
                </span>
                <div className="w-5 h-5 bg-[#F5C518] flex items-center justify-center shrink-0">
                  <span className="text-black text-[9px] font-extrabold leading-none">
                    {displayName?.[0]?.toUpperCase() ?? "?"}
                  </span>
                </div>
              </button>

              <button
                onClick={handleLogout}
                title="Logout"
                className="text-zinc-600 hover:text-red-400 transition-colors duration-200 cursor-pointer"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.8}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                  />
                </svg>
              </button>
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="hidden sm:block text-[11px] font-bold tracking-[0.15em] uppercase px-4 py-2 border border-[#F5C518] text-[#F5C518] hover:bg-[#F5C518] hover:text-black transition-all duration-200 cursor-pointer"
            >
              Login
            </button>
          )}

          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-zinc-500 hover:text-white cursor-pointer"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle Menu"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={
                  menuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="fixed top-16 inset-x-0 z-40 bg-[#111] border-b border-zinc-900 py-5 px-6 flex flex-col gap-4 md:hidden">
          <form onSubmit={handleSearchSubmit} className="relative">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-600 pointer-events-none"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products…"
              className="w-full bg-[#0D0D0D] border border-zinc-800 rounded-md pl-9 pr-4 py-2.5 text-sm text-[#F5F5F0] placeholder-zinc-600 outline-none focus:border-[#F5C518]"
            />
          </form>
          {["Home", "Shop", "Collections", "About"].map((link) => (
            <Link
              key={link}
              to="/"
              onClick={() => setMenuOpen(false)}
              className="text-[11px] tracking-[0.2em] uppercase text-zinc-400 hover:text-[#F5C518] transition-colors"
            >
              {link}
            </Link>
          ))}
          {!user && (
            <button
              onClick={() => {
                setMenuOpen(false);
                navigate("/login");
              }}
              className="self-start text-[11px] font-bold tracking-[0.15em] uppercase px-4 py-2 border border-[#F5C518] text-[#F5C518]"
            >
              Login
            </button>
          )}
        </div>
      )}

      {/* ══ MAIN 404 CONTENT ══════════════════════════════════════ */}
      <main className="relative flex-1 flex items-center justify-center pt-28 pb-16 px-6 overflow-hidden">
        {/* Ambient Gold Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-[#F5C518]/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative z-10 max-w-2xl w-full text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111] border border-zinc-800 text-[10px] tracking-[0.28em] uppercase text-[#F5C518] font-semibold mb-6 shadow-lg shadow-black/40">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F5C518] animate-pulse" />
            <span>Error 404 · Page Not Found</span>
          </div>

          {/* Big Editorial 404 Number */}
          <div className="relative mb-2 select-none">
            <h1 className="text-8xl sm:text-[140px] md:text-[160px] font-black tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-400 to-zinc-800 drop-shadow-2xl">
              404
            </h1>
            {/* Subtle floating gold mark */}
            <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
              <span className="text-[160px] sm:text-[220px] font-extrabold text-[#F5C518] tracking-widest">
                SNITCH
              </span>
            </div>
          </div>

          {/* Headline */}
          <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-[#F5F5F0] mb-3">
            Lost In The <span className="text-[#F5C518]">Vault</span>
          </h2>

          {/* Description */}
          <p className="text-sm sm:text-base text-zinc-400 max-w-md mx-auto leading-relaxed mb-8">
            The collection or drop you are looking for has been archived, relocated,
            or doesn't exist in our current season.
          </p>

          {/* In-page Quick Search */}
          <form
            onSubmit={handleSearchSubmit}
            className="max-w-md mx-auto mb-9 relative group"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search other styles, jackets, shirts…"
              className="w-full bg-[#141414] border border-zinc-800 rounded-lg pl-4 pr-24 py-3.5 text-sm text-[#F5F5F0] placeholder-zinc-600 outline-none focus:border-[#F5C518] focus:ring-1 focus:ring-[#F5C518]/30 transition-all duration-200"
            />
            <button
              type="submit"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-[#F5C518] text-black px-4 py-2 rounded text-[10px] font-bold uppercase tracking-widest hover:bg-white transition-colors duration-200 cursor-pointer"
            >
              Search
            </button>
          </form>

          {/* Action CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <button
              onClick={() => navigate("/")}
              className="w-full sm:w-auto bg-[#F5C518] hover:bg-white text-black text-[11px] font-bold tracking-[0.18em] uppercase px-8 py-3.5 rounded-sm transition-all duration-200 shadow-lg shadow-[#F5C518]/10 hover:shadow-white/20 active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 group"
            >
              <span>Explore Collection</span>
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </button>

            <button
              onClick={() => navigate(-1)}
              className="w-full sm:w-auto border border-zinc-800 bg-[#111] hover:border-[#F5C518] hover:text-white text-zinc-400 text-[11px] font-bold tracking-[0.18em] uppercase px-8 py-3.5 rounded-sm transition-all duration-200 active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                />
              </svg>
              <span>Go Back</span>
            </button>
          </div>

          {/* Quick jump suggestions */}
          <div className="border-t border-zinc-900/80 pt-8">
            <p className="text-[10px] text-zinc-600 uppercase tracking-[0.25em] mb-4">
              Popular Destinations
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2.5">
              {[
                { label: "New Arrivals", path: "/" },
                { label: "Popular", path: "/" },
                { label: "Your Bag", path: "/cart" },
                { label: user ? "Your Profile" : "Sign In", path: user ? "/Profile" : "/login" },
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() => navigate(item.path)}
                  className="px-3.5 py-1.5 rounded-md border border-zinc-800 bg-[#121212] hover:border-[#F5C518]/50 hover:text-[#F5C518] text-xs text-zinc-400 transition-colors duration-200 cursor-pointer"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* ══ FOOTER (Matches Home.jsx) ══════════════════════════════ */}
      <footer className="border-t border-zinc-900 px-6 xl:px-14 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#0D0D0D]">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-full overflow-hidden border border-[#F5C518]/30 group-hover:border-[#F5C518] bg-black p-0.5 transition-all duration-300">
            <img
              src="/Snitch.png"
              alt="Snitch"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div>
            <span className="text-[#F5C518] text-sm font-extrabold tracking-[0.3em] uppercase group-hover:text-white transition-colors">
              SNITCH
            </span>
            <span className="text-zinc-700 text-[10px] ml-3 tracking-widest">
              © 2026
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-6">
          {["Privacy", "Terms", "Shipping", "Contact"].map((l) => (
            <a
              key={l}
              href="#"
              className="text-[10px] text-zinc-700 tracking-[0.15em] uppercase hover:text-zinc-400 transition-colors"
            >
              {l}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <a
            href="#"
            className="text-zinc-700 hover:text-[#F5C518] transition-colors"
            aria-label="Instagram"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>
          <a
            href="#"
            className="text-zinc-700 hover:text-[#F5C518] transition-colors"
            aria-label="Twitter/X"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Notfound;
