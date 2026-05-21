import { useEffect, useRef, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { useProduct } from "../hook/useProduct.js";
import { useAuth } from "../../auth/hook/useAuth.js";

/* ── helpers ─────────────────────────────────────────── */
const sym = (c) => ({ INR: "₹", USD: "$", EUR: "€", GBP: "£" }[c] ?? c);
const fmt = (p) => `${sym(p?.currency)}${p?.amount?.toLocaleString() ?? "—"}`;

const FILTERS = ["All", "New Arrivals", "Popular"];

/* ── Product Card ────────────────────────────────────── */
function ProductCard({ product }) {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);
  const cover = product.images?.[0]?.url;
  const extraCount = (product.images?.length ?? 0) - 1;

  return (
    <article
      className="group relative cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => navigate(`/ViewProduct/${product._id}`)}
    >
      {/* ── Image ── */}
      <div
        className="relative w-full overflow-hidden bg-[#1A1A1A] rounded-lg"
        style={{ aspectRatio: "3/4" }}
      >
        {cover ? (
          <img
            src={cover}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-zinc-700">
            <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M7.5 8.25h.008v.008H7.5V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
            <span className="text-[10px] tracking-widest uppercase text-zinc-600">No Image</span>
          </div>
        )}

        {/* Photo count badge */}
        {product.images?.length > 0 && (
          <span className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm text-[10px] font-semibold text-white px-2 py-0.5 rounded-full">
            {product.images.length} {product.images.length === 1 ? "photo" : "photos"}
          </span>
        )}

        {/* Extra thumbnails strip */}
        {extraCount > 0 && (
          <div className="absolute bottom-2 left-2 flex gap-1">
            {product.images.slice(1, 4).map((img) => (
              <div key={img._id} className="h-8 w-8 rounded-md border-2 border-zinc-800 overflow-hidden bg-zinc-900 shadow">
                <img src={img.url} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
            {extraCount > 3 && (
              <div className="h-8 w-8 rounded-md border-2 border-zinc-800 bg-black/70 flex items-center justify-center text-[9px] font-bold text-white">
                +{extraCount - 3}
              </div>
            )}
          </div>
        )}

        {/* Hover scrim + Add to Bag */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
        <div
          className={`absolute bottom-0 left-0 right-0 flex items-center justify-center py-4 transition-all duration-300 ${
            hovered ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <button
            onClick={(e) => { e.stopPropagation(); navigate(`/ViewProduct/${product._id}`); }}
            className="bg-[#F5C518] text-black text-[11px] font-bold tracking-[0.15em] uppercase px-8 py-3 hover:bg-white transition-colors duration-200 rounded-sm"
          >
            Add to Bag
          </button>
        </div>
      </div>

      {/* ── Info ── */}
      <div className="pt-3 pb-1">
        <p className="text-[10px] text-zinc-600 tracking-[0.2em] uppercase mb-1">
          {new Date(product.createdAt).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}
        </p>
        <h3 className="text-sm font-semibold text-[#F5F5F0] leading-snug truncate">{product.title}</h3>
        <p className="mt-0.5 text-xs text-zinc-500 line-clamp-1">{product.description}</p>
        <p className="mt-1.5 text-sm font-bold text-[#F5C518] tracking-tight">{fmt(product.price)}</p>
      </div>
    </article>
  );
}

/* ── Empty State ─────────────────────────────────────── */
function EmptyState({ query }) {
  return (
    <div className="flex flex-col items-center justify-center py-32 gap-4 text-center">
      <div className="h-16 w-16 rounded-2xl bg-zinc-900 flex items-center justify-center mb-2">
        <svg className="h-7 w-7 text-zinc-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.3}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
      </div>
      <p className="text-sm font-semibold text-[#F5F5F0]">
        {query ? `No results for "${query}"` : "New drops loading…"}
      </p>
      <p className="text-[10px] text-zinc-600 tracking-[0.2em] uppercase">
        {query ? "Try a different search term." : "Come back soon."}
      </p>
    </div>
  );
}

/* ── Home ────────────────────────────────────────────── */
const Home = () => {
  const { handleGETallProduct } = useProduct();
  const { handleLogout } = useAuth();
  const allProduct = useSelector((s) => s.product.allProduct);
  const user = useSelector((s) => s.auth?.User);
  const cartCount = useSelector((s) => s.cart?.items?.length ?? 0);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef(null);
  const displayName = user?.fullname || user?.username || user?.email?.split('@')[0] || null;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => { handleGETallProduct(); }, []);

  const products = allProduct ?? [];

  /* live search filter */
  const filtered = useMemo(
    () => products.filter((p) => p.title?.toLowerCase().includes(search.toLowerCase())),
    [products, search]
  );

  return (
    <div className="min-h-screen bg-[#0D0D0D]" style={{ fontFamily: "'Inter', sans-serif", color: "#F5F5F0" }}>

      {/* ══ NAVBAR ══════════════════════════════════════════ */}
      <nav className="fixed top-0 inset-x-0 z-50 flex items-center gap-4 px-6 xl:px-14 h-16 bg-[#0D0D0D]/95 backdrop-blur-sm border-b border-zinc-900">
        {/* Brand */}
        <div className="shrink-0">
          <span className="text-[#F5C518] text-lg font-extrabold tracking-[0.3em] uppercase leading-none">SNITCH</span>
          <p className="text-[8px] text-zinc-700 tracking-[0.25em] uppercase mt-0.5">EST. 2020</p>
        </div>

        {/* ── Live search ── */}
        <div className="flex-1 hidden sm:block max-w-md" ref={searchRef}>
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-600 pointer-events-none"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setSearchOpen(true); }}
              onFocus={() => setSearchOpen(true)}
              placeholder="Search products…"
              className="w-full bg-[#111] border border-zinc-800 rounded-md pl-9 pr-9 py-2.5 text-sm text-[#F5F5F0] placeholder-zinc-600 outline-none focus:border-[#F5C518] transition-colors"
            />
            {search && (
              <button
                onClick={() => { setSearch(""); setSearchOpen(false); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-zinc-400 transition-colors"
              >
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}

            {/* Search Suggestions Dropdown */}
            {searchOpen && search && filtered.length > 0 && (
              <div className="absolute top-full mt-1.5 left-0 right-0 z-50 bg-[#111] border border-zinc-800 rounded-md shadow-xl overflow-hidden max-h-72 overflow-y-auto">
                {filtered.slice(0, 6).map((p) => (
                  <button
                    key={p._id}
                    onMouseDown={() => {
                      navigate(`/ViewProduct/${p._id}`);
                      setSearch("");
                      setSearchOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-zinc-900 transition-colors text-left"
                  >
                    {/* Thumbnail */}
                    <div className="w-8 h-8 rounded-md overflow-hidden bg-zinc-900 shrink-0 border border-zinc-800">
                      {p.images?.[0]?.url ? (
                        <img src={p.images[0].url} alt={p.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <svg className="h-3.5 w-3.5 text-zinc-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909" />
                          </svg>
                        </div>
                      )}
                    </div>
                    {/* Text */}
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-medium text-[#F5F5F0] truncate">{p.title}</p>
                      <p className="text-[11px] text-[#F5C518] font-semibold">{fmt(p.price)}</p>
                    </div>
                    {/* Arrow */}
                    <svg className="h-3.5 w-3.5 text-zinc-700 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </button>
                ))}
                {filtered.length > 6 && (
                  <p className="px-3 py-2 text-[11px] text-zinc-600 border-t border-zinc-800">
                    +{filtered.length - 6} more results below
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-5 ml-auto shrink-0">
          <ul className="hidden md:flex items-center gap-7">
            {["Home", "Shop", "Collections", "About"].map((link) => (
              <li key={link}>
                <Link href="#" className="text-[11px] font-medium tracking-[0.15em] uppercase text-zinc-500 hover:text-[#F5F5F0] transition-colors duration-200">{link}</Link>
              </li>
            ))}
          </ul>

          {/* Cart */}
          <button
            onClick={() => navigate("/cart")}
            className="relative text-zinc-500 hover:text-[#F5F5F0] transition-colors"
            aria-label="Cart"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 min-w-[16px] h-4 bg-[#F5C518] text-black text-[9px] font-extrabold leading-none rounded-full flex items-center justify-center px-[3px]">
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            )}
          </button>

          {user ? (
            <div className="hidden sm:flex items-center gap-3">
              <button
                onClick={() => navigate(user?.role === 'seller' ? '/seller/profile' : '/Profile')}
                className="flex items-center gap-2 group"
              >
                <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-zinc-400 group-hover:text-[#F5C518] transition-colors truncate max-w-[80px]">
                  {displayName}
                </span>
                <div className="w-5 h-5 bg-[#F5C518] flex items-center justify-center shrink-0">
                  <span className="text-black text-[9px] font-extrabold leading-none">
                    {displayName?.[0]?.toUpperCase() ?? '?'}
                  </span>
                </div>
              </button>
              {/* Logout */}
              <button
                onClick={handleLogout}
                title="Logout"
                className="flex items-center gap-1.5 text-zinc-600 hover:text-red-400 transition-colors duration-200 group"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                </svg>
              </button>
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="hidden sm:block text-[11px] font-bold tracking-[0.15em] uppercase px-4 py-2 border border-[#F5C518] text-[#F5C518] hover:bg-[#F5C518] hover:text-black transition-all duration-200"
            >
              Login
            </button>
          )}

          {/* Hamburger */}
          <button className="md:hidden text-zinc-500 hover:text-white" onClick={() => setMenuOpen((o) => !o)}>
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed top-16 inset-x-0 z-40 bg-[#111] border-b border-zinc-900 py-5 px-6 flex flex-col gap-4 md:hidden">
          {/* Mobile search */}
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-600 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products…"
              className="w-full bg-[#0D0D0D] border border-zinc-800 rounded-md pl-9 pr-4 py-2.5 text-sm text-[#F5F5F0] placeholder-zinc-600 outline-none focus:border-[#F5C518] transition-colors"
            />
          </div>
          {["Home", "Shop", "Collections", "About"].map((link) => (
            <a key={link} href="#" className="text-[11px] tracking-[0.2em] uppercase text-zinc-400 hover:text-[#F5C518] transition-colors">{link}</a>
          ))}
          <button onClick={() => navigate("/login")} className="self-start text-[11px] font-bold tracking-[0.15em] uppercase px-4 py-2 border border-[#F5C518] text-[#F5C518]">Login</button>
        </div>
      )}

      {/* ══ MAIN CONTENT ════════════════════════════════════ */}
      <main className="pt-24 pb-20 px-6 xl:px-14">
        <div className="max-w-[1400px] mx-auto">

          {/* ── Page header ── */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div>
              <p className="text-[10px] text-[#F5C518] tracking-[0.35em] uppercase mb-1 font-semibold">Fashion · Style · Culture</p>
              <h1 className="text-3xl font-extrabold tracking-[-0.03em] text-[#F5F5F0] leading-none">New Arrivals</h1>
              <p className="mt-1.5 text-xs text-zinc-500">
                {products.length} {products.length === 1 ? "style" : "styles"} available
              </p>
            </div>

            {/* Filter pills */}
            <div className="flex items-center gap-2 flex-wrap">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`h-9 rounded-full px-4 text-[11px] font-semibold tracking-wide transition-all duration-150 ${
                    activeFilter === f
                      ? "bg-[#F5C518] text-black shadow-sm"
                      : "border border-zinc-800 text-zinc-500 hover:text-[#F5F5F0] hover:border-zinc-600 bg-transparent"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Result count when searching */}
          {search && (
            <p className="text-xs text-zinc-600 mb-5">
              {filtered.length} result{filtered.length !== 1 ? "s" : ""} for&nbsp;
              <span className="text-zinc-400">"{search}"</span>
              <button onClick={() => setSearch("")} className="ml-2 text-[#F5C518] hover:underline">Clear</button>
            </p>
          )}

          {/* ── Product Grid ── */}
          {filtered.length === 0 ? (
            <EmptyState query={search} />
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-5 gap-y-10">
              {filtered.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}

        </div>
      </main>

      {/* ══ FOOTER ══════════════════════════════════════════ */}
      <footer className="border-t border-zinc-900 px-6 xl:px-14 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-[#F5C518] text-sm font-extrabold tracking-[0.3em] uppercase">SNITCH</span>
          <span className="text-zinc-800 text-xs ml-4 tracking-widest">© 2025</span>
        </div>
        <div className="flex items-center gap-6">
          {["Privacy", "Terms", "Shipping", "Contact"].map((l) => (
            <a key={l} href="#" className="text-[10px] text-zinc-700 tracking-[0.15em] uppercase hover:text-zinc-400 transition-colors">{l}</a>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <a href="#" className="text-zinc-700 hover:text-[#F5C518] transition-colors">
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
          </a>
          <a href="#" className="text-zinc-700 hover:text-[#F5C518] transition-colors">
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </a>
        </div>
      </footer>

    </div>
  );
};

export default Home;           