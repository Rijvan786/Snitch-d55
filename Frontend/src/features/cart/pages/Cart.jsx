import React, { useEffect, useState, useRef, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { useCart } from '../hook/useCart.js';
import { useProduct } from '../../products/hook/useProduct';

/* ── helpers ─────────────────────────────────────── */
const sym = (c) => ({ INR: '₹', USD: '$', EUR: '€', GBP: '£' }[c] ?? c);

const Cart = () => {
  const { handleGetItems, handleIncrementCartItem, handleDecrementCartItem, handleDeleteCartItem } = useCart();
  const { handleGETallProduct } = useProduct();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth?.User);
  const cartItems = useSelector((state) => state.cart.items) ?? [];
  console.log(cartItems);
  const allProducts = useSelector((state) => state.product.allProduct) ?? [];

  // Search State
  const [search, setSearch] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef(null);

  // Toast State
  const [showToast, setShowToast] = useState(false);
  const [toastInfo, setToastInfo] = useState({ message: '', title: '', image: '', type: 'success' });

  const triggerToast = (message, title, image, type = 'success') => {
    setToastInfo({ message, title, image, type });
    setShowToast(true);
  };

  // Automatically hide toast
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const SubTotal = cartItems.reduce((acc, item) => acc + (item?.price?.amount ?? 0), 0);
  const shipping = cartItems.length > 0 ? 50 : 0;
  const total = SubTotal + shipping;

  const filtered = useMemo(() =>
    search.trim() === '' ? [] : allProducts.filter(p =>
      p.title?.toLowerCase().includes(search.toLowerCase())
    ).slice(0, 6)
  , [search, allProducts]);

  async function IncrementQuantityCartItem({ productId, variantId, quantity, price, title, image }) {
    await handleIncrementCartItem({ productId, variantId, quantity, price });
    triggerToast('Added to Cart', title, image, 'success');
  }

  async function DecrementQuantityCartItem({ productId, variantId, quantity, price, title, image }) {
    await handleDecrementCartItem({ productId, variantId, quantity, price });
    triggerToast('Quantity Decreased', title, image, 'info');
  }

  async function DeleteCartItem({ productId, variantId, title, image }) {
    await handleDeleteCartItem({ productId, variantId });
    triggerToast('Removed from Cart', title, image, 'error');
  }

  useEffect(() => {
    handleGetItems();
    handleGETallProduct();
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) setSearchOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="min-h-screen bg-[#141313] font-[Inter,sans-serif] text-[#e5e2e1] selection:bg-[#F5C518] selection:text-black">
      <style>{`@keyframes toast-shrink { from { width: 100%; } to { width: 0%; } }`}</style>
      
      {/* ── Sticky Top App Bar ── */}
      <header className="sticky top-0 z-50 flex justify-between items-center w-full px-6 sm:px-[64px] h-16 bg-[#141313]/95 backdrop-blur-md border-b border-[#444748]/50">
        <div className="flex items-center">
          <button 
            onClick={() => navigate('/')} 
            className="text-[#e5e2e1] hover:text-[#F5C518] transition-colors duration-200 flex items-center gap-2"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            <span className="hidden sm:inline text-[10px] tracking-[0.1em] uppercase font-semibold">Shop</span>
          </button>
        </div>
        <div className="absolute left-1/2 -translate-x-1/2">
          <h1 className="font-[Inter] text-base font-black text-[#e5e2e1] tracking-[0.2em] uppercase">SNITCH</h1>
        </div>

        {/* Global Search & Nav Actions */}
        <div className="flex items-center gap-6" ref={searchRef}>
          <div className="relative">
            <div className="relative flex items-center bg-[#1c1b1b] border border-[#444748] px-3 py-1.5 w-40 sm:w-60">
              <svg className="h-3.5 w-3.5 text-zinc-500 mr-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="SEARCH ARCHIVE..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setSearchOpen(true); }}
                onFocus={() => setSearchOpen(true)}
                className="bg-transparent border-0 p-0 text-[10px] text-white placeholder-zinc-600 focus:ring-0 focus:outline-none w-full uppercase tracking-wider"
              />
              {search && (
                <button onClick={() => { setSearch(''); setSearchOpen(false); }} className="text-zinc-500 hover:text-white ml-1.5">
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {/* Search Dropdown */}
            {searchOpen && filtered.length > 0 && (
              <div className="absolute top-full right-0 mt-2 w-64 sm:w-80 bg-[#1c1b1b] border border-[#444748] shadow-[0_8px_32px_rgba(0,0,0,0.5)] overflow-hidden z-50">
                {filtered.map(p => (
                  <button
                    key={p._id}
                    onMouseDown={() => { navigate(`/ViewProduct/${p._id}`); setSearch(''); setSearchOpen(false); }}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#252424] transition-colors text-left border-b border-[#444748]/30 last:border-0"
                  >
                    <div className="w-10 h-10 bg-[#252424] overflow-hidden shrink-0">
                      {p.images?.[0]?.url ? (
                        <img src={p.images[0].url} alt={p.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-zinc-800" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-bold text-white uppercase truncate">{p.title}</p>
                      <p className="text-[9px] text-[#F5C518] font-bold mt-0.5">{sym(p.price?.currency || 'INR')}{p.price?.amount?.toLocaleString()}</p>
                    </div>
                    <svg className="h-3 w-3 text-zinc-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button onClick={() => navigate('/profile')} className="text-[#e5e2e1] hover:text-[#F5C518] transition-colors duration-200">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </button>
        </div>
      </header>

      {/* ── Main Layout ── */}
      {cartItems.length === 0 ? (
        /* Empty State */
        <div className="flex-1 flex flex-col items-center justify-center gap-8 py-32">
          <div className="text-center">
            <svg className="h-16 w-16 text-[#444748] mx-auto mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
            </svg>
            <p className="text-xs text-[#8e9192] tracking-[0.25em] uppercase mb-2 font-semibold">Your bag is empty</p>
            <p className="text-xs text-zinc-500 font-light">Explore our curation to find pieces.</p>
          </div>
          <button
            onClick={() => navigate('/')}
            className="bg-white text-black px-12 py-5 text-[10px] font-black tracking-[0.2em] uppercase hover:bg-[#F5C518] transition-colors rounded-none"
          >
            Explore Collection
          </button>
        </div>
      ) : (
        /* Filled State */
        <main className="max-w-[1400px] mx-auto px-6 sm:px-8 xl:px-16 py-12 lg:py-20">
          {/* Title row */}
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase mb-2 text-white">Your Bag</h1>
          <p className="text-[10px] text-[#8e9192] tracking-[0.2em] uppercase mb-16 font-semibold">
            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} · Ready for checkout
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* ── Left Column: Items ── */}
            <div className="lg:col-span-8">
              
              {/* Table Header (desktop only) */}
              <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-[#444748]/50 text-[10px] tracking-[0.2em] uppercase text-zinc-500 font-bold">
                <div className="col-span-6">Product</div>
                <div className="col-span-3 text-center">Quantity</div>
                <div className="col-span-3 text-right">Total</div>
              </div>

              {/* Rows */}
              <div className="divide-y divide-[#444748]/30">
                {cartItems.map((item) => {
                  const variantObj = item.product?.variants?.find(
                    (v) => v._id === item.variants
                  ) ?? null;

                  const displayImg = item.product?.images?.[0]?.url
                    || item.product?.images?.[0]
                    || 'https://via.placeholder.com/300x400?text=No+Image';

                  const attributes = variantObj?.attributes
                    && Object.keys(variantObj.attributes).length > 0
                    ? Object.entries(variantObj.attributes)
                    : null;

                  const variantPrice = variantObj?.price?.amount
                    ? variantObj.price
                    : item?.price;
                      
                  return (
                    <div key={item._id} className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center py-8 group">
                      
                      {/* Product display */}
                      <div className="md:col-span-6 flex gap-6">
                        <div 
                          className="w-24 h-32 md:w-28 md:h-36 bg-[#1c1b1b] shrink-0 overflow-hidden relative cursor-pointer border border-[#444748]/30"
                          onClick={() => navigate(`/ViewProduct/${item.product._id}`)}
                        >
                          <img
                            src={displayImg}
                            alt={item.product?.title}
                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                          />
                        </div>

                        <div className="flex flex-col justify-between py-1 min-w-0 flex-1">
                          <div>
                            <h3 
                              className="text-base font-bold tracking-tight uppercase mb-1.5 text-white hover:text-[#F5C518] transition-colors cursor-pointer truncate"
                              onClick={() => navigate(`/ViewProduct/${item.product._id}`)}
                            >
                              {item.product?.title}
                            </h3>
                            <p className="text-[11px] text-zinc-500 font-light mb-3 truncate">
                              {item.product?.description}
                            </p>

                            {/* Attributes chips */}
                            <div className="flex flex-wrap gap-1.5 mb-3">
                              {attributes ? (
                                attributes.map(([key, val]) => (
                                  <span key={key} className="inline-flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider border border-[#444748] px-2 py-0.5 text-zinc-400">
                                    <span>{key}:</span>
                                    <span className="text-[#F5C518]">{val}</span>
                                  </span>
                                ))
                              ) : (
                                <span className="text-[9px] font-bold uppercase tracking-wider border border-[#444748]/30 px-2 py-0.5 text-zinc-500">
                                  Base
                                </span>
                              )}
                            </div>

                            <p className="text-xs font-semibold text-zinc-400">
                              {sym(item?.price?.currency)}{item?.price?.amount / item.quantity}
                            </p>
                          </div>

                          {/* Stock Status */}
                          <div className="mt-2.5">
                            {(() => {
                              const itemStock = variantObj ? (variantObj.stock ?? 0) : (item.product?.stock ?? 0);
                              return itemStock > 0 ? (
                                <span className="text-[9px] font-bold uppercase tracking-wider text-white-500 bg-green-500/10 border border-green-500/20 px-2 py-0.5">
                                  In Stock: {itemStock}
                                </span>
                              ) : (
                                <span className="text-[9px] font-bold uppercase tracking-wider text-red-500 bg-red-500/10 border border-red-500/20 px-2 py-0.5">
                                  Out of Stock
                                </span>
                              );
                             
                            })()}
                           
                          </div>
                           <span>{item.price.amount!==variantPrice.amount &&(
                            <>{
                              item.price.amount>variantPrice.amount?
                              <p className='text-green-500 text-sm'>yous will gate this at   {sym(item?.price?.currency),variantPrice.amount}. save {(item.price.amount-variantPrice.amount)} </p>:
                              <p className='text-red-500 text-sm'>Warning this product will cost you   {variantPrice.amount-item.price.amount} more </p>
                            }</> 
                           )}</span>
                          <button
                            onClick={() => DeleteCartItem({ productId: item.product._id, variantId: item.variants, title: item.product?.title, image: displayImg })}
                            className="mt-3 text-[10px] font-bold uppercase tracking-widest text-[#8e9192] hover:text-red-500 transition-colors w-fit border-b border-transparent hover:border-red-500/30 pb-0.5"
                          >
                            Remove
                          </button>
                        </div>
                      </div>

                      {/* Quantity adjuster */}
                      <div className="md:col-span-3 flex md:justify-center items-center">
                        <div className="flex items-center border border-[#444748]">
                          <button
                            onClick={() => {
                              if (item.quantity === 1) return;
                              DecrementQuantityCartItem({
                                productId: item.product._id,
                                variantId: item.variants,
                                quantity: -1,
                                price: (item?.price?.amount) / item.quantity,
                                title: item.product?.title,
                                image: displayImg
                              });
                            }}
                            className="w-9 h-9 flex items-center justify-center text-zinc-500 hover:text-white hover:bg-zinc-800 transition-colors text-base"
                          >
                            −
                          </button>
                          <span className="w-10 text-center text-xs font-bold text-white">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              IncrementQuantityCartItem({
                                productId: item.product._id,
                                variantId: item.variants,
                                quantity: 1,
                                price: (item?.price?.amount) / item.quantity,
                                title: item.product?.title,
                                image: displayImg
                              })
                            }
                            className="w-9 h-9 flex items-center justify-center text-zinc-500 hover:text-white hover:bg-zinc-800 transition-colors text-base"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Total */}
                      <div className="md:col-span-3 flex md:justify-end items-center">
                        <span className="text-base font-bold text-white tracking-tight">
                          {sym(item?.price?.currency)}{item?.price?.amount}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Continue Shopping button */}
              <div className="mt-8 pt-8 border-t border-[#444748]/30">
                <button onClick={() => navigate('/')} className="flex items-center gap-3 group">
                  <svg className="h-4 w-4 text-zinc-500 group-hover:text-[#F5C518] transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                  </svg>
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-400 group-hover:text-white transition-colors border-b border-transparent group-hover:border-[#F5C518] pb-0.5">
                    Continue Shopping
                  </span>
                </button>
              </div>
            </div>

            {/* ── Right Column: Order Summary ── */}
            <div className="lg:col-span-4">
              <div className="bg-[#1c1b1b] border border-[#444748] p-8 lg:sticky lg:top-24 rounded-none">
                <h2 className="text-[11px] font-black tracking-[0.25em] uppercase text-white mb-8 border-b border-[#444748]/50 pb-5">
                  Order Summary
                </h2>

                {/* Summarized item list */}
                <div className="space-y-4 mb-8">
                  {cartItems.map((item) => {
                    const variantObj = item.product?.variants?.find(
                      (v) => v._id === item.variants
                    ) ?? null;
                    const attrs = variantObj?.attributes;
                    const label = attrs ? Object.values(attrs).join(' · ') : 'Base';
                    return (
                      <div key={item._id} className="flex justify-between gap-3 text-xs">
                        <div className="flex-1 min-w-0">
                          <p className="text-zinc-300 font-bold uppercase truncate">{item.product?.title}</p>
                          <p className="text-[10px] text-zinc-500 font-semibold mt-0.5 uppercase tracking-wider">{label} · ×{item.quantity}</p>
                        </div>
                        <span className="text-zinc-300 font-bold shrink-0">
                          {sym(item?.price?.currency)}{item?.price?.amount}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Subtotal & Shipping breakdown */}
                <div className="space-y-3.5 border-t border-[#444748]/30 pt-6 mb-6 text-xs">
                  <div className="flex justify-between text-zinc-400 font-semibold uppercase tracking-wider">
                    <span>Subtotal</span>
                    <span className="text-white font-bold">₹{SubTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-zinc-400 font-semibold uppercase tracking-wider">
                    <span>Shipping</span>
                    <span className="text-white font-bold">₹{shipping}</span>
                  </div>
                </div>

                {/* Total */}
                <div className="border-t border-[#444748]/30 pt-6 mb-8 flex justify-between items-end">
                  <span className="text-[10px] tracking-[0.25em] uppercase text-zinc-400 font-black">Total</span>
                  <span className="text-3xl font-black tracking-tight text-[#F5C518]">
                    ₹{total.toLocaleString()}
                  </span>
                </div>

                {/* Checkout Trigger */}
                <button
                  onClick={() => {
                    if (!user) {
                      navigate('/register');
                    } else {
                      navigate('/payment');
                    }
                  }}
                  className="w-full bg-[#F5C518] text-black py-5 text-[11px] font-black tracking-[0.2em] uppercase hover:bg-white transition-colors duration-300 rounded-none mb-4 active:scale-[0.98]"
                >
                  Buy Now
                </button>

                {/* Secure Note */}
                <div className="flex items-center justify-center gap-2 text-zinc-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-[#F5C518]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span className="text-[9px] tracking-[0.2em] uppercase font-bold">Secure Checkout</span>
                </div>

                {/* Shipping & Return Covenants */}
                <div className="border-t border-[#444748]/30 mt-6 pt-5">
                  <p className="text-[9px] text-zinc-500 tracking-[0.15em] uppercase text-center font-bold">
                    Free returns · 30-day policy
                  </p>
                </div>
              </div>
            </div>

          </div>
        </main>
      )}

      {/* ══ TOAST NOTIFICATION ══ */}
      <div
        className={`fixed top-24 right-6 z-50 transition-all duration-500 ease-out ${
          showToast
            ? 'translate-y-0 opacity-100 pointer-events-auto'
            : '-translate-y-4 opacity-0 pointer-events-none'
        }`}
      >
        <div className="bg-[#1c1b1b] border border-[#444748] shadow-[0_8px_32px_rgba(0,0,0,0.5)] overflow-hidden w-[300px]">
          {/* Progress bar at top */}
          <div className="h-[2px] bg-[#444748] overflow-hidden">
            {showToast && (
              <div
                className={`h-full ${
                  toastInfo.type === 'success'
                    ? 'bg-[#F5C518]'
                    : toastInfo.type === 'error'
                    ? 'bg-red-500'
                    : 'bg-blue-400'
                }`}
                style={{ animation: 'toast-shrink 2.5s linear forwards' }}
              />
            )}
          </div>

          <div className="flex items-stretch gap-0">
            {/* Product image */}
            {toastInfo.image && (
              <div className="w-20 h-20 shrink-0 bg-[#252424] overflow-hidden">
                <img
                  src={toastInfo.image}
                  alt={toastInfo.title}
                  className="w-full h-full object-cover opacity-90"
                />
              </div>
            )}

            {/* Content */}
            <div className="flex-1 flex flex-col justify-center px-4 py-3 min-w-0">
              <div className="flex items-center gap-1.5 mb-1">
                <div
                  className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                    toastInfo.type === 'success'
                      ? 'bg-[#F5C518]'
                      : toastInfo.type === 'error'
                      ? 'bg-red-500'
                      : 'bg-blue-400'
                  }`}
                >
                  {toastInfo.type === 'success' && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-2.5 w-2.5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                  {toastInfo.type === 'error' && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-2.5 w-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  )}
                  {toastInfo.type === 'info' && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-2.5 w-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  )}
                </div>
                <p
                  className={`text-[10px] font-bold uppercase tracking-[0.18em] ${
                    toastInfo.type === 'success'
                      ? 'text-[#F5C518]'
                      : toastInfo.type === 'error'
                      ? 'text-red-500'
                      : 'text-blue-400'
                  }`}
                >
                  {toastInfo.message}
                </p>
              </div>
              <p className="text-[12px] font-bold text-white truncate leading-tight uppercase">
                {toastInfo.title}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;