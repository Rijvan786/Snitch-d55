import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useProduct } from "../hook/useProduct.js";
import { useNavigate } from "react-router";
import { DashboardSkeleton } from "../../../App/Skeleton.jsx";

/* ─── Stitch design: Editorial Minimalist ───────────────────────────────────
   Inter · #FAFAFA bg · #1A1A1A text · hairline #E5E5E5 borders · no shadows
   ──────────────────────────────────────────────────────────────────────────── */

/* ── Sidebar nav links ── */
const NAV = [
  {
    label: "Inventory",
    path: "/seller",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
      </svg>
    ),
  },
  {
    label: "Collections",
    path: "#",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zm9.75 0A2.25 2.25 0 0115.75 3.75H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zm9.75 0a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
      </svg>
    ),
  },
  {
    label: "Orders",
    path: "#",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" />
      </svg>
    ),
  },
  {
    label: "Analytics",
    path: "#",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zm6.75-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v10.125c0 .621-.504 1.125-1.125 1.125h-2.25A1.125 1.125 0 019.75 19.875V9.75zm6.75-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v15c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125v-15z" />
      </svg>
    ),
  },
];

/* ── currency symbol helper ── */
const currencySymbol = (c) =>
  ({ INR: "₹", USD: "$", EUR: "€", GBP: "£" }[c] ?? c);

/* ── Product Card ── */
function ProductCard({ product }) {
  const navigate = useNavigate();
  const coverImg = product.images?.[0]?.url;
  const extraImgs = product.images?.slice(1, 4) ?? [];
    const loading = useSelector((state) => state.auth.Loading);
    console.log(loading,"skelton");

  return (
    <article className="group bg-white border border-[#E5E5E5] rounded-lg overflow-hidden flex flex-col transition-colors hover:border-[#C4C7C7]">
      {/* Image area */}
      <div className="relative w-full aspect-[4/3] bg-[#F3F3F3] overflow-hidden">
        {coverImg ? (
          <img
            src={coverImg}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[#C4C7C7]">
            <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M7.5 8.25h.008v.008H7.5V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
          </div>
        )}

        {/* Extra image thumbnails strip */}
        {extraImgs.length > 0 && (
          <div className="absolute bottom-2 left-2 flex gap-1">
            {extraImgs.map((img) => (
              <div
                key={img._id}
                className="h-9 w-9 rounded border-2 border-white overflow-hidden bg-[#E5E5E5]"
              >
                <img src={img.url} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
            {product.images.length > 4 && (
              <div className="h-9 w-9 rounded border-2 border-white bg-black/60 flex items-center justify-center text-[10px] font-semibold text-white">
                +{product.images.length - 4}
              </div>
            )}
          </div>
        )}

        {/* Images count badge */}
        {product.images?.length > 0 && (
          <div className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm rounded-sm px-1.5 py-0.5 text-[10px] font-medium text-[#1A1A1A]">
            {product.images.length} {product.images.length === 1 ? "photo" : "photos"}
          </div>
        )}
      </div>

      {/* Card body */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        {/* Title + description */}
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-[#1A1A1A] leading-snug truncate">
            {product.title}
          </h3>
          <p className="mt-0.5 text-xs text-[#757575] leading-relaxed line-clamp-2">
            {product.description}
          </p>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-base font-semibold text-[#1A1A1A] tracking-tight">
            {currencySymbol(product.price?.currency)}
            {product.price?.amount?.toLocaleString()}
          </span>
          <span className="text-[10px] uppercase tracking-widest text-[#A3A3A3] font-medium bg-[#F3F3F3] px-1.5 py-0.5 rounded-sm">
            {product.price?.currency}
          </span>
        </div>

        {/* Divider + actions */}
        <div className="border-t border-[#E5E5E5] pt-3 flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-widest text-[#A3A3A3] font-medium">
            {new Date(product.createdAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </span>
          <div className="flex items-center gap-3">
            <button className="text-xs text-[#757575] hover:text-[#1A1A1A] transition-colors">
              Edit
            </button>
            <button
              onClick={() => navigate(`/seller/products/${product._id}`)}
              className="text-xs font-medium text-[#1A1A1A] hover:underline transition-colors"
            >
              View →
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

/* ── Empty state ── */
function EmptyState({ onAdd }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="h-16 w-16 rounded-full bg-[#F3F3F3] flex items-center justify-center mb-5">
        <svg className="h-7 w-7 text-[#C4C7C7]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.3}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
        </svg>
      </div>
      <p className="text-sm font-medium text-[#1A1A1A]">No products yet</p>
      <p className="mt-1 text-xs text-[#A3A3A3]">Add your first product to start selling.</p>
      <button
        onClick={onAdd}
        className="mt-6 h-10 rounded-md bg-[#1A1A1A] px-6 text-xs font-medium tracking-wide text-white hover:bg-[#333333] transition-colors"
      >
        Add Product
      </button>
    </div>
  );
}

/* ── Main Dashboard Component ── */
const   Dashboard = () => {
  const { handleGetSellerProduct } = useProduct();
  const products = useSelector((state) => state.product.products);
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeNav, setActiveNav] = useState("Inventory");
    const loading = useSelector((state) => state.auth.Loading);
    console.log(loading,"dashboard  ");

  useEffect(() => {
    handleGetSellerProduct();
  }, []);

  /* filter by search */
  const filtered = (products ?? []).filter((p) =>
    p.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardSkeleton>
      <div className="flex min-h-screen bg-[#F9F9F9] font-[Inter,sans-serif]">

      {/* ── Mobile top-bar ── */}
      <header className="lg:hidden fixed top-0 inset-x-0 z-20 flex items-center justify-between bg-white border-b border-[#E5E5E5] px-5 h-14">
        <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#1A1A1A]">
          SNITCH
        </span>
        <nav className="flex items-center gap-1">
          {NAV.map(({ label, icon }) => (
            <button
              key={label}
              title={label}
              onClick={() => setActiveNav(label)}
              className={`flex items-center justify-center w-9 h-9 rounded-md transition-colors ${
                activeNav === label
                  ? "text-[#1A1A1A] bg-[#F3F3F3]"
                  : "text-[#A3A3A3] hover:text-[#1A1A1A]"
              }`}
            >
              {icon}
            </button>
          ))}
        </nav>
      </header>

      {/* ── Desktop sidebar ── */}
      <aside className="hidden lg:flex flex-col w-56 min-h-screen bg-white border-r border-[#E5E5E5] px-6 py-8 shrink-0">
        {/* Logo */}
        <div className="mb-10">
          <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#1A1A1A]">
            SNITCH
          </span>
          <p className="text-[10px] tracking-widest text-[#A3A3A3] uppercase mt-0.5">
            Seller Studio
          </p>
        </div>

        {/* Nav */}
        <nav className="flex flex-col gap-0.5 flex-1">
          {NAV.map(({ label, icon }) => (
            <button
              key={label}
              onClick={() => setActiveNav(label)}
              className={`flex items-center gap-3 px-3 py-3 rounded-md text-sm transition-colors text-left ${
                activeNav === label
                  ? "font-semibold text-[#1A1A1A]"
                  : "text-[#757575] hover:text-[#1A1A1A]"
              }`}
            >
              {icon}
              {label}
            </button>
          ))}
        </nav>

        {/* Profile */}
        <div className="mt-auto pt-6 border-t border-[#E5E5E5] flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-[#E5E5E5] flex items-center justify-center text-xs font-semibold text-[#1A1A1A]">
            S
          </div>
          <div>
            <p className="text-xs font-medium text-[#1A1A1A] leading-tight">Seller</p>
            <p className="text-[10px] text-[#A3A3A3]">Admin</p>
          </div>
        </div>
      </aside>

      {/* ── Main content ── */}
      <main className="flex-1 px-4 pt-20 pb-16 sm:px-6 sm:pt-10 lg:px-12 xl:px-16 overflow-y-auto">
        <div className="mx-auto w-full max-w-[1100px]">

          {/* ── Page header ── */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#A3A3A3] mb-1">
                My Listings
              </p>
              <h1 className="text-3xl font-bold tracking-tight text-[#1A1A1A] leading-none">
                Your Products
              </h1>
              <p className="mt-1.5 text-sm text-[#757575]">
                {products?.length ?? 0}{" "}
                {products?.length === 1 ? "item" : "items"} listed
              </p>
            </div>

            <button
              onClick={() => navigate("/seller/create-product")}
              className="self-start sm:self-auto h-11 rounded-md bg-[#1A1A1A] px-6 text-sm font-medium tracking-wide text-white hover:bg-[#333333] transition-colors whitespace-nowrap flex items-center gap-2"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Add Product
            </button>
          </div>

          {/* ── Filter bar ── */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-8">
            {/* Search */}
            <div className="relative flex-1 w-full sm:max-w-xs">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#C4C7C7] pointer-events-none"
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                className="w-full rounded-md border border-[#E5E5E5] bg-white pl-9 pr-4 py-2.5 text-sm text-[#1A1A1A] placeholder-[#C4C7C7] outline-none focus:border-[#1A1A1A] transition-colors"
              />
            </div>

            {/* Filter pills */}
            <div className="flex items-center gap-2">
              {["All", "Published"].map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`h-9 rounded-full px-4 text-xs font-medium tracking-wide transition-colors ${
                    activeFilter === f
                      ? "bg-[#1A1A1A] text-white"
                      : "border border-[#E5E5E5] text-[#757575] hover:text-[#1A1A1A] hover:border-[#C4C7C7]"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* ── Product grid / empty state ── */}
          {filtered.length === 0 ? (
            <EmptyState onAdd={() => navigate("/create-product")} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
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