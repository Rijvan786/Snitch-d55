import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router';

/* ─── currency helper ────────────────────────────── */
const sym = (c) => ({ INR: '₹', USD: '$', EUR: '€', GBP: '£' }[c] ?? '₹');

/* ─── static recommended products ───────────────── */
const RECS = [
  {
    id: 1, name: 'NOIR BOMBER JACKET', price: 4999, wide: true,
    img: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80&fit=crop',
  },
  {
    id: 2, name: 'DRIFT DENIM', price: 2799, wide: false,
    img: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=80&fit=crop',
  },
  {
    id: 3, name: 'GHOST LAYER TEE', price: 1299, wide: false,
    img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80&fit=crop',
  },
  
];

/* ─── dummy order items (shown when Redux cart is empty) ─ */
const DUMMY_ITEMS = [
  {
    _id: 'd1',
    img: 'https://images.unsplash.com/photo-1614093302611-8efc4a9a1c32?w=200&q=80&fit=crop',
    title: 'URBAN NOIR HOODIE',
    size: 'L', qty: 1, price: '₹2,499',
  },
  {
    _id: 'd2',
    img: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=200&q=80&fit=crop',
    title: 'EDITORIAL CARGO PANTS',
    size: '32', qty: 1, price: '₹3,199',
  },
  {
    _id: 'd3',
    img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&q=80&fit=crop',
    title: 'STEALTH RUNNER T-SHIRT',
    size: 'M', qty: 2, price: '₹3,198',
  },
];

/* ═══════════════════════════════════════════════════ */
const OrderSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('order_id') ?? '—';

  /* redux */
  const user     = useSelector((s) => s.auth?.User);
  const cart     = useSelector((s) => s.cart.items)      ?? [];
  const total    = useSelector((s) => s.cart.TotalPrice) ?? 0;
  const currency = useSelector((s) => s.cart.currency)   ?? 'INR';

  /* search state */
  const [search, setSearch]         = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef(null);

  /* copy feedback */
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target))
        setSearchOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const filtered =
    search.trim() === ''
      ? []
      : cart
          .filter((p) =>
            p.product?.title?.toLowerCase().includes(search.toLowerCase())
          )
          .slice(0, 6);

  const handleCopy = () => {
    navigator.clipboard?.writeText(orderId);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  /* ── render ── */
  return (
    <div className="min-h-screen bg-[#141313] font-[Inter,sans-serif] text-[#e5e2e1] selection:bg-[#F5C518] selection:text-black overflow-x-hidden">

      {/* keyframes */}
      <style>{`
        @keyframes fadeUp  { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes drawCheck { from{stroke-dashoffset:40} to{stroke-dashoffset:0} }
        .fu  { animation: fadeUp 0.55s ease both }
        .d1  { animation-delay:.10s }
        .d2  { animation-delay:.20s }
        .d3  { animation-delay:.30s }
        .d4  { animation-delay:.42s }
        .d5  { animation-delay:.55s }
        .d6  { animation-delay:.68s }
        .check-path { stroke-dasharray:40; stroke-dashoffset:40; animation: drawCheck 0.5s ease forwards 0.35s }
      `}</style>

      {/* dot-grid overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: 'radial-gradient(#444748 1px,transparent 1px)',
          backgroundSize: '24px 24px',
          opacity: 0.14,
        }}
      />

      {/* ══════════════════════════════════════════════
          NAVBAR
      ══════════════════════════════════════════════ */}
      <header className="sticky top-0 z-50 flex items-center justify-between w-full px-6 sm:px-16 h-16 bg-[#141313]/95 backdrop-blur-md border-b border-[#444748]/50">

        {/* back */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-[#e5e2e1] hover:text-[#F5C518] transition-colors"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          <span className="hidden sm:inline text-[10px] tracking-[0.12em] uppercase font-semibold">Shop</span>
        </button>

        {/* brand */}
        <span className="absolute left-1/2 -translate-x-1/2 text-base font-black tracking-[0.22em] uppercase">
          SNITCH
        </span>

        {/* search + profile */}
        <div className="flex items-center gap-5" ref={searchRef}>
          <div className="relative">
            <div className="flex items-center bg-[#1c1b1b] border border-[#444748] px-3 py-1.5 w-36 sm:w-52">
              <svg className="h-3.5 w-3.5 text-zinc-500 mr-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="SEARCH…"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setSearchOpen(true); }}
                onFocus={() => setSearchOpen(true)}
                className="bg-transparent border-0 p-0 text-[10px] text-white placeholder-zinc-600 focus:ring-0 focus:outline-none w-full uppercase tracking-wider"
              />
              {search && (
                <button onClick={() => { setSearch(''); setSearchOpen(false); }} className="text-zinc-500 hover:text-white ml-1">
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {/* dropdown */}
            {searchOpen && filtered.length > 0 && (
              <div className="absolute top-full right-0 mt-2 w-72 bg-[#1c1b1b] border border-[#444748] shadow-[0_8px_32px_rgba(0,0,0,0.6)] z-50">
                {filtered.map((p) => (
                  <button
                    key={p._id}
                    onMouseDown={() => { navigate(`/ViewProduct/${p.product._id}`); setSearch(''); setSearchOpen(false); }}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#252424] transition-colors text-left border-b border-[#444748]/30 last:border-0"
                  >
                    <div className="w-10 h-10 bg-[#252424] overflow-hidden shrink-0">
                      {p.product?.images?.[0]?.url
                        ? <img src={p.product.images[0].url} alt={p.product.title} className="w-full h-full object-cover" />
                        : <div className="w-full h-full bg-zinc-800" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-bold text-white uppercase truncate">{p.product?.title}</p>
                      <p className="text-[9px] text-[#F5C518] font-bold mt-0.5">
                        {sym(p.price?.currency)}{p.price?.amount?.toLocaleString()}
                      </p>
                    </div>
                    <svg className="h-3 w-3 text-zinc-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button onClick={() => navigate('/Profile')} className="text-[#e5e2e1] hover:text-[#F5C518] transition-colors">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </button>
        </div>
      </header>

      {/* ══════════════════════════════════════════════
          MAIN CONTENT
      ══════════════════════════════════════════════ */}
      <main className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-16 pt-20 pb-40">

        {/* ── HERO ── */}
        <section className="flex flex-col items-center text-center py-20 border-b border-[#444748]/40">

          {/* animated checkmark */}
          <div className="fu w-[72px] h-[72px] border-2 border-[#ffd65b] flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-[#ffd65b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} strokeLinecap="square">
              <path className="check-path" d="M4 13l5 5L20 6" />
            </svg>
          </div>

          {/* order badge */}
          <span className="fu d1 inline-block border border-[#ffd65b] text-[#ffd65b] text-[10px] tracking-[0.22em] uppercase font-bold px-4 py-1.5 mb-6">
            ORDER #{orderId}
          </span>

          {/* headline */}
          <h1 className="fu d2 text-5xl sm:text-7xl font-black tracking-tighter uppercase leading-none text-[#e5e2e1] mb-4">
            ORDER<br />CONFIRMED
          </h1>

          {/* sub */}
          <p className="fu d3 text-base sm:text-lg text-[#c4c7c7] max-w-md mb-4">
            Your style is on its way.
            {user?.fullname && (
              <span className="text-[#e5e2e1] font-semibold">
                {' '}Thanks, {user.fullname.split(' ')[0]}.
              </span>
            )}
          </p>

          {/* delivery estimate */}
          <p className="fu d4 text-[10px] tracking-[0.2em] uppercase text-[#8e9192] font-semibold mb-10">
            Estimated Delivery &nbsp;·&nbsp; 3 – 5 Business Days
          </p>

          {/* CTAs */}
          <div className="fu d5 flex flex-col sm:flex-row gap-4 w-full max-w-xs sm:max-w-sm">
            <button
              onClick={() => navigate('/')}
              className="flex-1 bg-[#F5C518] text-black text-[11px] font-black tracking-[0.18em] uppercase py-4 px-6 hover:bg-white transition-colors duration-300 active:scale-[0.98]"
            >
              Track Order
            </button>
            <button
              onClick={() => navigate('/')}
              className="flex-1 border border-[#e5e2e1] text-[#e5e2e1] text-[11px] font-bold tracking-[0.18em] uppercase py-4 px-6 hover:border-[#ffd65b] hover:text-[#ffd65b] transition-colors duration-300"
            >
              Shop More
            </button>
          </div>

          {/* invoice */}
          <button className="fu d6 mt-5 text-[10px] tracking-[0.15em] uppercase text-[#8e9192] font-semibold underline decoration-[#ffd65b] decoration-2 underline-offset-4 hover:text-[#ffd65b] transition-colors">
            Download Invoice
          </button>
        </section>

        {/* ── ORDER DETAILS ── */}
        <section className="mt-20 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">

          {/* left — order summary */}
          <div className="lg:col-span-7">
            <p className="text-[10px] tracking-[0.25em] uppercase font-black text-zinc-500 mb-5">Order Summary</p>

            <div className="border border-[#444748] bg-[#1c1b1b] divide-y divide-[#444748]/50">
              {(cart.length > 0 ? cart : []).map((item) => (
                <div key={item._id} className="flex items-center gap-5 p-5">
                  {/* thumbnail */}
                  <div className="shrink-0 border border-[#444748]/40 overflow-hidden" style={{ width: 56, height: 72 }}>
                    <img
                      src={item?.product?.images?.[0]?.url}
                      alt={item.product?.title}
                      className="w-full h-full object-cover"
                      onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=200&q=80&fit=crop'; }}
                    />
                  </div>
                  {/* info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-black uppercase tracking-tight text-white truncate mb-1">
                      {item.product?.title}
                    </p>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold">
                      Base &nbsp;·&nbsp; Qty {item.quantity}
                    </p>
                  </div>
                  {/* price */}
                  <span className="text-sm font-bold text-[#e5e2e1] shrink-0">
                    {sym(item?.price?.currency ?? currency)}
                    {item?.price?.amount?.toLocaleString()}
                  </span>
                </div>
              ))}

              {/* dummy fallback rows when cart is empty */}
              {cart.length === 0 && DUMMY_ITEMS.map((item) => (
                <div key={item._id} className="flex items-center gap-5 p-5">
                  <div className="shrink-0 border border-[#444748]/40 overflow-hidden" style={{ width: 56, height: 72 }}>
                    <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-black uppercase tracking-tight text-white truncate mb-1">{item.title}</p>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold">
                      Size {item.size} &nbsp;·&nbsp; Qty {item.qty}
                    </p>
                  </div>
                  <span className="text-sm font-bold text-[#e5e2e1] shrink-0">{item.price}</span>
                </div>
              ))}

              {/* totals */}
              <div className="p-5 space-y-2.5">
                <div className="flex justify-between text-xs text-zinc-400 font-semibold uppercase tracking-wider">
                  <span>Subtotal</span>
                  <span className="text-[#e5e2e1]">{sym(currency)}{total?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xs text-zinc-400 font-semibold uppercase tracking-wider">
                  <span>Shipping</span>
                  <span className="text-[#ffd65b] font-bold">Free</span>
                </div>
                <div className="flex justify-between items-end border-t border-[#444748]/40 pt-4 mt-1">
                  <span className="text-[10px] tracking-[0.25em] uppercase font-black text-zinc-400">Grand Total</span>
                  <span className="text-2xl font-black tracking-tight text-[#F5C518]">
                    {sym(currency)}{total?.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* right — delivery / payment / order id */}
          <div className="lg:col-span-5 space-y-5">

            {/* delivery */}
            <div className="border border-[#444748] bg-[#1c1b1b] p-6">
              <p className="text-[10px] tracking-[0.25em] uppercase font-black text-zinc-500 mb-4">Delivery Address</p>
              {user ? (
                <div className="space-y-0.5 text-sm text-[#e5e2e1]">
                  <p className="font-bold uppercase">{user.fullname}</p>
                  {user.address && <p className="text-zinc-400 text-xs mt-1">{user.address}</p>}
                  {user.city    && (
                    <p className="text-zinc-400 text-xs">
                      {user.city}{user.pincode ? ` — ${user.pincode}` : ''}
                    </p>
                  )}
                  {user.email   && <p className="text-zinc-500 text-[11px] mt-2">{user.email}</p>}
                </div>
              ) : (
                <p className="text-xs text-zinc-500 italic">Address details unavailable</p>
              )}
            </div>

            {/* payment */}
            <div className="border border-[#444748] bg-[#1c1b1b] p-6">
              <p className="text-[10px] tracking-[0.25em] uppercase font-black text-zinc-500 mb-4">Payment Method</p>
              <div className="flex items-center gap-3 mb-3">
                <svg className="h-5 w-5 text-zinc-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                </svg>
                <p className="text-sm text-[#e5e2e1] font-semibold">Razorpay · Secure Payment</p>
              </div>
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="text-xs text-zinc-400 uppercase tracking-widest font-semibold">
                  {sym(currency)}{total?.toLocaleString()} Paid
                </span>
                <span className="border border-[#ffd65b] text-[#ffd65b] text-[9px] tracking-[0.2em] uppercase font-bold px-2 py-0.5">
                  Payment Successful
                </span>
              </div>
            </div>

            {/* order id */}
            <div className="border border-[#444748]/50 bg-[#1c1b1b] p-5 flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="text-[10px] tracking-[0.22em] uppercase font-black text-zinc-500 mb-1">Razorpay Order ID</p>
                <p className="text-xs font-mono text-[#c4c7c7] break-all">{orderId}</p>
              </div>
              <button
                onClick={handleCopy}
                className="text-zinc-500 hover:text-[#ffd65b] transition-colors shrink-0"
                title="Copy ID"
              >
                {copied ? (
                  <svg className="h-4 w-4 text-[#ffd65b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </section>

        {/* ── YOU MIGHT ALSO LIKE ── */}
        <section className="mt-32">
          <div className="flex items-center justify-between border-b border-[#444748] pb-4 mb-10">
            <p className="text-[10px] tracking-[0.25em] uppercase font-black text-zinc-500">You Might Also Like</p>
            <button
              onClick={() => navigate('/')}
              className="text-[10px] tracking-[0.15em] uppercase font-semibold text-[#c4c7c7] hover:text-[#ffd65b] transition-colors underline decoration-[#ffd65b] decoration-2 underline-offset-4"
            >
              View All
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {RECS.map((item) => (
              <div
                key={item.id}
                className={`group cursor-pointer ${item.wide ? 'col-span-2' : 'col-span-1'}`}
                onClick={() => navigate('/')}
              >
                <div
                  className={`relative bg-[#1c1b1b] border border-[#444748]/40 overflow-hidden mb-3 ${
                    item.wide ? 'aspect-[16/9]' : 'aspect-[3/4]'
                  }`}
                >
                  {/* product image */}
                  <img
                    src={item.img}
                    alt={item.name}
                    className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                  />
                  {/* dark scrim */}
                  <div className="absolute inset-0 bg-black/20" />
                  {/* hover overlay */}
                  <div className="absolute inset-x-0 bottom-0 h-10 bg-black/75 flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-full group-hover:translate-y-0 transition-all duration-300">
                    <span className="text-[10px] font-black tracking-[0.2em] uppercase text-[#ffd65b]">Add to Bag</span>
                  </div>
                </div>
                <p className="text-xs font-bold uppercase tracking-tight text-[#e5e2e1] group-hover:text-[#ffd65b] transition-colors mb-1">
                  {item.name}
                </p>
                <p className="text-[11px] text-zinc-500 font-semibold">₹{item.price.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* ══════════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════════ */}
      <footer className="relative z-10 border-t border-[#444748]/50 bg-[#141313] py-10">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-16 flex flex-col sm:flex-row items-center justify-between gap-6">
          <span className="text-base font-black tracking-[0.22em] uppercase text-[#8e9192]">SNITCH</span>
          <div className="flex items-center gap-8">
            {['Instagram', 'Twitter', 'Pinterest'].map((s) => (
              <a key={s} href="#" className="text-[10px] tracking-[0.18em] uppercase text-[#8e9192] hover:text-[#ffd65b] transition-colors font-semibold">
                {s}
              </a>
            ))}
          </div>
          <p className="text-[10px] text-[#8e9192] tracking-widest uppercase">
            © {new Date().getFullYear()} SNITCH. All Rights Reserved.
          </p>
        </div>
      </footer>

    </div>
  );
};

export default OrderSuccess;