import React, { useEffect, useRef, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { useProduct } from "../hook/useProduct.js";
import { useNavigate } from "react-router";
import { DashboardSkeleton } from "../../../App/Skeleton.jsx";
import { useAuth } from "../../auth/hook/useAuth.js";

/* ── helpers ─────────────────────────────────────────── */
const sym = (c) => ({ INR: "₹", USD: "$", EUR: "€", GBP: "£" }[c] ?? c);
const fmt = (p) => `${sym(p?.currency)}${p?.amount?.toLocaleString() ?? "—"}`;

/* ── NAV items ───────────────────────────────────────── */
const NAV = [
  { label: "Inventory",   icon: "M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" },
  { label: "Collections", icon: "M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zm9.75 0A2.25 2.25 0 0115.75 3.75H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zm9.75 0a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" },
  { label: "Orders",      icon: "M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" },
  { label: "Analytics",   icon: "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zm6.75-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v10.125c0 .621-.504 1.125-1.125 1.125h-2.25A1.125 1.125 0 019.75 19.875V9.75zm6.75-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v15c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125v-15z" },
];

const FILTERS = ["All", "Published", "Draft"];

/* ── Product Card ────────────────────────────────────── */
function ProductCard({ product }) {
  const navigate = useNavigate();
  const cover = product.images?.[0]?.url;
  const extraCount = (product.images?.length ?? 0) - 1;

  return (
    <article
      className="group bg-white border border-[#E8E8E8] rounded-xl overflow-hidden flex flex-col cursor-pointer transition-all duration-200 hover:shadow-[0_4px_24px_rgba(0,0,0,0.08)] hover:-translate-y-0.5"
      onClick={() => navigate(`/seller/products/${product._id}`)}
    >
      {/* ── Image ── */}
      <div className="relative w-full bg-[#F4F4F4] overflow-hidden" style={{ aspectRatio: "4/3" }}>
        {cover ? (
          <img
            src={cover}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-[#C8C8C8]">
            <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M7.5 8.25h.008v.008H7.5V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
            <span className="text-[10px] tracking-widest uppercase">No Photo</span>
          </div>
        )}

        {/* Photo count badge */}
        {product.images?.length > 0 && (
          <span className="absolute top-2 right-2 bg-white/85 backdrop-blur-sm text-[10px] font-semibold text-[#1A1A1A] px-2 py-0.5 rounded-full">
            {product.images.length} {product.images.length === 1 ? "photo" : "photos"}
          </span>
        )}

        {/* Extra thumbnails strip */}
        {extraCount > 0 && (
          <div className="absolute bottom-2 left-2 flex gap-1">
            {product.images.slice(1, 4).map((img) => (
              <div key={img._id} className="h-8 w-8 rounded-md border-2 border-white overflow-hidden bg-[#E5E5E5] shadow-sm">
                <img src={img.url} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
            {extraCount > 3 && (
              <div className="h-8 w-8 rounded-md border-2 border-white bg-black/60 flex items-center justify-center text-[9px] font-bold text-white shadow-sm">
                +{extraCount - 3}
              </div>
            )}
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
      </div>

      {/* ── Body ── */}
      <div className="flex flex-col flex-1 p-4 gap-2.5">
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-[#1A1A1A] truncate leading-snug">{product.title}</h3>
          <p className="mt-0.5 text-xs text-[#888] line-clamp-2 leading-relaxed">{product.description}</p>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-base font-bold text-[#1A1A1A] tracking-tight">{fmt(product.price)}</span>
          <span className="text-[10px] uppercase tracking-widest text-[#AAA] bg-[#F4F4F4] px-2 py-0.5 rounded-full font-medium">
            {product.price?.currency}
          </span>
        </div>

        <div className="border-t border-[#F0F0F0] pt-2.5 flex items-center justify-between">
          <span className="text-[10px] text-[#BBBBBB] font-medium">
            {new Date(product.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={(e) => { e.stopPropagation(); navigate(`/seller/products/${product._id}`); }}
              className="text-[11px] text-[#888] hover:text-[#1A1A1A] transition-colors font-medium"
            >
              Edit
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); navigate(`/seller/products/${product._id}`); }}
              className="text-[11px] font-semibold text-[#1A1A1A] hover:underline transition-colors"
            >
              View →
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

/* ── Empty State ─────────────────────────────────────── */
function EmptyState({ query, onAdd }) {
  return (
    <div className="flex flex-col items-center justify-center py-28 text-center">
      <div className="h-16 w-16 rounded-2xl bg-[#F4F4F4] flex items-center justify-center mb-5">
        <svg className="h-7 w-7 text-[#CCC]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.3}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
      </div>
      <p className="text-sm font-semibold text-[#1A1A1A]">
        {query ? `No results for "${query}"` : "No products yet"}
      </p>
      <p className="mt-1 text-xs text-[#AAA]">
        {query ? "Try a different search term." : "Add your first product to start selling."}
      </p>
      {!query && (
        <button
          onClick={onAdd}
          className="mt-6 h-10 rounded-lg bg-[#1A1A1A] px-6 text-xs font-semibold tracking-wide text-white hover:bg-[#333] transition-colors"
        >
          Add Product
        </button>
      )}
    </div>
  );
}

/* ── Dashboard ───────────────────────────────────────── */
const Dashboard = () => {
  const { handleGetSellerProduct } = useProduct();
  const { handleLogout } = useAuth();
  const products = useSelector((s) => s.product.products);
  const user = useSelector((s) => s.auth?.User);
  const navigate = useNavigate();
  const initials = user?.fullname
    ? user.fullname.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
    : 'S';

  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeNav, setActiveNav] = useState("Inventory");
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef(null);

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

  useEffect(() => { handleGetSellerProduct(); }, []);

  /* live filter */
  const filtered = useMemo(() => {
    const list = products ?? [];
    return list.filter((p) =>
      p.title?.toLowerCase().includes(search.toLowerCase())
    );
  }, [products, search]);

  return (
    <DashboardSkeleton>
      <div className="flex min-h-screen bg-[#F7F7F7]" style={{ fontFamily: "'Inter', sans-serif" }}>

        {/* ── Mobile top-bar ── */}
        <header className="lg:hidden fixed top-0 inset-x-0 z-20 flex items-center justify-between bg-white border-b border-[#EBEBEB] px-5 h-14">
          <span className="text-[11px] font-bold tracking-[0.22em] uppercase text-[#1A1A1A]">SNITCH</span>
          <nav className="flex items-center gap-1">
            {NAV.map(({ label, icon }) => (
              <button
                key={label}
                title={label}
                onClick={() => setActiveNav(label)}
                className={`flex items-center justify-center w-9 h-9 rounded-lg transition-colors ${
                  activeNav === label ? "bg-[#F0F0F0] text-[#1A1A1A]" : "text-[#AAAAAA] hover:text-[#1A1A1A]"
                }`}
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
                </svg>
              </button>
            ))}
            {/* Mobile logout */}
            <button
              onClick={handleLogout}
              title="Logout"
              className="flex items-center justify-center w-9 h-9 rounded-lg text-zinc-400 hover:text-red-500 hover:bg-red-50 transition-colors"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
              </svg>
            </button>
          </nav>
        </header>

        {/* ── Desktop sidebar ── */}
        <aside className="hidden lg:flex flex-col w-56 min-h-screen bg-white border-r border-[#EBEBEB] px-5 py-8 shrink-0">
          <div className="mb-10 px-1">
            <span className="text-[11px] font-bold tracking-[0.22em] uppercase text-[#1A1A1A]">SNITCH</span>
            <p className="text-[10px] tracking-widest text-[#BBBBBB] uppercase mt-0.5">Seller Studio</p>
          </div>

          <nav className="flex flex-col gap-0.5 flex-1">
            {NAV.map(({ label, icon }) => (
              <button
                key={label}
                onClick={() => setActiveNav(label)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors text-left ${
                  activeNav === label
                    ? "bg-[#F4F4F4] font-semibold text-[#1A1A1A]"
                    : "text-[#888] hover:text-[#1A1A1A] hover:bg-[#FAFAFA]"
                }`}
              >
                <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
                </svg>
                {label}
              </button>
            ))}
          </nav>

          {/* Profile */}
          <button
            onClick={() => navigate('/seller/profile')}
            className="pt-5 border-t border-[#EBEBEB] flex items-center gap-3 w-full text-left hover:opacity-80 transition-opacity"
          >
            <div className="h-8 w-8 bg-[#1A1A1A] flex items-center justify-center text-xs font-bold text-white shrink-0">{initials}</div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-[#1A1A1A] truncate">{user?.fullname || 'Seller'}</p>
              <p className="text-[10px] text-[#BBBBBB]">View Profile →</p>
            </div>
          </button>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="mt-3 flex items-center gap-3 px-3 py-2.5 rounded-lg w-full text-left text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors text-sm"
          >
            <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
            </svg>
            Sign Out
          </button>
        </aside>

        {/* ── Main ── */}
        <main className="flex-1 px-4 pt-20 pb-16 sm:px-6 sm:pt-8 lg:px-10 xl:px-14 overflow-y-auto">
          <div className="mx-auto w-full max-w-[1200px]">

            {/* ── Page header ── */}
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#BBBBBB] mb-1">My Listings</p>
                <h1 className="text-2xl font-bold tracking-tight text-[#1A1A1A] leading-none">Your Products</h1>
                <p className="mt-1.5 text-xs text-[#888]">
                  {products?.length ?? 0} {products?.length === 1 ? "item" : "items"} listed
                </p>
              </div>

              <button
                onClick={() => navigate("/seller/create-product")}
                className="self-start sm:self-auto h-10 rounded-lg bg-[#1A1A1A] px-5 text-xs font-semibold tracking-wide text-white hover:bg-[#2A2A2A] transition-colors flex items-center gap-2 whitespace-nowrap"
              >
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Add Product
              </button>
            </div>

            {/* ── Search + Filter bar ── */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-7">
              {/* Search input */}
              <div className="relative w-full sm:max-w-sm" ref={searchRef}>
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#CCCCCC] pointer-events-none"
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
                  className="w-full rounded-lg border border-[#E5E5E5] bg-white pl-9 pr-9 py-2.5 text-sm text-[#1A1A1A] placeholder-[#CCCCCC] outline-none focus:border-[#1A1A1A] focus:ring-1 focus:ring-[#1A1A1A] transition-all"
                />
                {search && (
                  <button
                    onClick={() => { setSearch(""); setSearchOpen(false); }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#CCCCCC] hover:text-[#888] transition-colors"
                  >
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}

                {/* Search Suggestions Dropdown */}
                {searchOpen && search && filtered.length > 0 && (
                  <div className="absolute top-full mt-1.5 left-0 right-0 z-50 bg-white border border-[#E5E5E5] rounded-lg shadow-[0_8px_32px_rgba(0,0,0,0.08)] overflow-hidden max-h-72 overflow-y-auto">
                    {filtered.slice(0, 6).map((p) => (
                      <button
                        key={p._id}
                        onMouseDown={() => {
                          navigate(`/seller/products/${p._id}`);
                          setSearch("");
                          setSearchOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-[#F7F7F7] transition-colors text-left border-b border-[#F0F0F0] last:border-0"
                      >
                        {/* Thumbnail */}
                        <div className="w-8 h-8 rounded-md overflow-hidden bg-[#F4F4F4] shrink-0 border border-[#E8E8E8]">
                          {p.images?.[0]?.url ? (
                            <img src={p.images[0].url} alt={p.title} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <svg className="h-3.5 w-3.5 text-[#CCCCCC]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909" />
                              </svg>
                            </div>
                          )}
                        </div>
                        {/* Text */}
                        <div className="flex-1 min-w-0">
                          <p className="text-[13px] font-medium text-[#1A1A1A] truncate">{p.title}</p>
                          <p className="text-[11px] text-[#888] font-semibold">{fmt(p.price)}</p>
                        </div>
                        {/* Arrow */}
                        <svg className="h-3.5 w-3.5 text-[#CCCCCC] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                      </button>
                    ))}
                    {filtered.length > 6 && (
                      <p className="px-3 py-2 text-[11px] text-[#AAAAAA] bg-[#FAFAFA]">
                        +{filtered.length - 6} more results below
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Filter pills */}
              <div className="flex items-center gap-2 flex-wrap">
                {FILTERS.map((f) => (
                  <button
                    key={f}
                    onClick={() => setActiveFilter(f)}
                    className={`h-9 rounded-full px-4 text-[11px] font-semibold tracking-wide transition-all duration-150 ${
                      activeFilter === f
                        ? "bg-[#1A1A1A] text-white shadow-sm"
                        : "border border-[#E5E5E5] text-[#888] hover:text-[#1A1A1A] hover:border-[#BBBBBB] bg-white"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>

              {/* Result count */}
              {search && (
                <span className="text-xs text-[#AAAAAA] ml-auto whitespace-nowrap">
                  {filtered.length} result{filtered.length !== 1 ? "s" : ""}
                </span>
              )}
            </div>

            {/* ── Product Grid ── */}
            {filtered.length === 0 ? (
              <EmptyState query={search} onAdd={() => navigate("/seller/create-product")} />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filtered.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            )}

          </div>
        </main>
      </div>
       </DashboardSkeleton>
  );
};

export default Dashboard;