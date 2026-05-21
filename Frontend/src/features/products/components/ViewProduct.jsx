import React, { useEffect, useState, useRef, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useProduct } from '../hook/useProduct';
import { useNavigate, useParams } from 'react-router';
import { useCart } from '../../cart/hook/useCart.js';
import Nav from '../../Shared/Components/Nav.jsx';

/* Currency helper */
const sym = (c) => ({ INR: '₹', USD: '$', EUR: '€', GBP: '£' }[c] ?? c);

const ViewProduct = () => {
  const { handleViewDetailProduct, handleGETallProduct } = useProduct();
  const { handleAddItem, handleGetItems } = useCart();
  const {ProductId}=useParams()
  console.log(ProductId);
  const navigate = useNavigate();
 
  
  const user = useSelector((state) => state.auth.User);
  const cartItems = useSelector((state) => state.cart.items) ?? [];
  const cartCount = cartItems.length;
  const allProducts = useSelector((state) => state.product.allProduct) ?? [];
  const [zoomImage, setZoomImage] = useState(null);
  const [product, setProduct] = useState(null);
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [variants, setVariants] = useState([]);
  const [activeVariant, setActiveVariant] = useState(null);
  const [hoveredVariant, setHoveredVariant] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [lastAddedVariant, setLastAddedVariant] = useState(null);
  const [search, setSearch] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef(null);

  async function fetchProduct(){
   const data=  await handleViewDetailProduct(ProductId);
   setProduct(data.product)
   console.log(data.product);
  }

  const filtered = useMemo(() =>
    search.trim() === '' ? [] : allProducts.filter(p =>
      p.title?.toLowerCase().includes(search.toLowerCase())
    ).slice(0, 6)
  , [search, allProducts]);

  useEffect(() => {
    const handler = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) setSearchOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);


  async function handleAddItems({productId, variantId, quantity, price}) {
    try {
      const res = await handleAddItem({productId, variantId, quantity, price});
      if (res && res.success) {
        const selectedVariant = (activeVariant && activeVariant._id !== product._id)
          ? activeVariant
          : (product.variants?.find(v => v._id === variantId) || product);
        
        setLastAddedVariant(selectedVariant);
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 2500);
      }
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
   fetchProduct();
   handleGETallProduct();
   if (user) {
     handleGetItems();
   }
  }, [ProductId, user]);
  
  useEffect(() => {
    if (product?.variants?.length > 0) {
      setVariants(product.variants);
    } else {
      setVariants([]);
    }
    setActiveVariant(null);
  }, [product]);

  // Loading / Empty State
  if (!product) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center">
        <p className="text-[10px] text-[#F5C518] tracking-[0.4em] uppercase animate-pulse">Loading Archive...</p>
      </div>
    );
  }

  const displayProduct = hoveredVariant || activeVariant || product;
  const { title, description, stock } = displayProduct;
  const price = displayProduct.price || product.price;
  const images = displayProduct.images?.length > 0 ? displayProduct.images : (product.images || []);

  const currencySymbol = sym(price?.currency || product?.price?.currency || product?.currency || 'INR');
  const priceFormatted = price?.amount 
      ? `${currencySymbol}${price.amount.toLocaleString()}`
      : `${currencySymbol}${Number(price || 0).toLocaleString()}`;

  ;
  return (
    <div className="min-h-screen bg-[#0D0D0D] font-[Inter,sans-serif] text-[#F5F5F0] selection:bg-[#F5C518] selection:text-black pb-32">
      <style>{`@keyframes toast-shrink { from { width: 100%; } to { width: 0%; } }`}</style>
      
      {/* ══ NAVBAR ══ */}
      <nav className="fixed top-0 inset-x-0 z-40 flex items-center gap-4 px-6 xl:px-16 h-16 bg-[#0D0D0D]/95 backdrop-blur-sm border-b border-zinc-900">
        {/* Back */}
        <button onClick={() => navigate(-1)} className="flex items-center gap-3 group shrink-0">
          <div className="w-7 h-[1px] bg-zinc-600 group-hover:w-10 transition-all duration-300 group-hover:bg-white" />
          <span className="hidden sm:inline text-[10px] font-semibold tracking-[0.25em] uppercase text-zinc-400 group-hover:text-white transition-colors">Back</span>
        </button>

        {/* Brand */}
        <span className="text-[#F5C518] text-sm font-bold tracking-[0.3em] uppercase leading-none shrink-0">SNITCH</span>

        {/* Search */}
        <div className="flex-1 max-w-md mx-auto relative" ref={searchRef}>
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-600 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={e => { setSearch(e.target.value); setSearchOpen(true); }}
              onFocus={() => setSearchOpen(true)}
              placeholder="Search all products…"
              className="w-full bg-zinc-900 border border-zinc-800 rounded-md pl-8 pr-8 py-2 text-xs text-[#F5F5F0] placeholder-zinc-600 outline-none focus:border-[#F5C518] transition-colors"
            />
            {search && (
              <button onClick={() => { setSearch(''); setSearchOpen(false); }} className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-zinc-400">
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            )}
          </div>
          {searchOpen && filtered.length > 0 && (
            <div className="absolute top-full mt-1.5 left-0 right-0 z-50 bg-[#111] border border-zinc-800 rounded-md shadow-xl overflow-hidden">
              {filtered.map(p => (
                <button
                  key={p._id}
                  onMouseDown={() => { navigate(`/ViewProduct/${p._id}`); setSearch(''); setSearchOpen(false); }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-zinc-900 transition-colors text-left"
                >
                  <div className="w-8 h-8 rounded overflow-hidden bg-zinc-900 shrink-0 border border-zinc-800">
                    {p.images?.[0]?.url ? <img src={p.images[0].url} alt={p.title} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-zinc-800" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-[#F5F5F0] truncate">{p.title}</p>
                    <p className="text-[10px] text-[#F5C518]">{p.price?.currency ? sym(p.price.currency) : '₹'}{p.price?.amount?.toLocaleString()}</p>
                  </div>
                  <svg className="h-3 w-3 text-zinc-700 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Cart */}
        <button onClick={() => navigate('/cart')} className="relative shrink-0 text-zinc-500 hover:text-[#F5C518] transition-colors">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
          </svg>
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 min-w-[16px] h-4 bg-[#F5C518] text-black text-[9px] font-extrabold leading-none rounded-full flex items-center justify-center px-[3px]">
              {cartCount > 99 ? '99+' : cartCount}
            </span>
          )}
        </button>
      </nav>
      <main className="pt-32 px-8 xl:px-16 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-32 items-start">
          
          {/* Left: Image Layout */}
          <section className="lg:col-span-7 flex flex-col-reverse lg:flex-row gap-4 xl:gap-8 h-fit">
            {images.length > 0 ? (
              <>
                {/* Thumbnails Slider */}
                <div className="flex lg:flex-col gap-4 overflow-x-auto lg:overflow-y-auto lg:max-h-[80vh] w-full lg:w-24 shrink-0 no-scrollbar pb-2 lg:pb-0">
                  {images.map((img, idx) => (
                    <div 
                      key={idx} 
                      className={`relative w-20 h-24 lg:w-full lg:h-32 shrink-0 cursor-pointer border ${mainImageIndex === idx ? 'border-[#F5C518]' : 'border-transparent'} hover:border-zinc-500 transition-colors`}
                      onClick={() => setMainImageIndex(idx)}
                    >
                      <img src={img.url} className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity" alt={`${title} - Thumbnail ${idx + 1}`} />
                    </div>
                  ))}
                </div>
                
                {/* Main Image 5:4 (or 4:5) Ratio */}
                <div className="relative w-full aspect-[4/5] bg-[#111] overflow-hidden group">
                  <img 
                    src={images[mainImageIndex]?.url || images[mainImageIndex] || images[0]?.url || images[0]} 
                    alt={`${title} - Main View`}
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-700 ease-out cursor-zoom-in"
                    onClick={() => setZoomImage(images[mainImageIndex]?.url || images[mainImageIndex] || images[0]?.url || images[0])}
                  />
                  
                  {/* Previous Button */}
                  {images.length > 1 && (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setMainImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
                      }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 backdrop-blur-sm text-white p-3 hover:bg-[#F5C518] hover:text-black transition-all z-10 opacity-100 md:opacity-0 md:group-hover:opacity-100"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                  )}

                  {/* Next Button */}
                  {images.length > 1 && (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setMainImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
                      }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 backdrop-blur-sm text-white p-3 hover:bg-[#F5C518] hover:text-black transition-all z-10 opacity-100 md:opacity-0 md:group-hover:opacity-100"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  )}
                </div>
              </>
            ) : (
              <div className="w-full aspect-[4/5] bg-[#111] flex items-center justify-center">
                 <p className="text-[10px] text-zinc-600 tracking-[0.4em] uppercase">No imagery available</p>
              </div>
            )}
          </section>

          {/* Right: Sticky Product Info */}
          <section className="lg:col-span-5 lg:sticky lg:top-32 flex flex-col pt-12 lg:pt-0">
            {/* Badges / Labels */}
            <div className="flex items-center gap-4 mb-8">
               <span className="text-[9px] border border-zinc-800 text-zinc-400 px-3 py-1 tracking-[0.3em] uppercase">New Arrival</span>
               <span className="text-[9px] bg-[#F5C518] text-black px-3 py-1 tracking-[0.3em] font-bold uppercase">Limited</span>
            </div>

            {/* Title */}
            <h1 className="text-5xl sm:text-6xl xl:text-7xl font-extrabold tracking-[-0.04em] text-[#F5F5F0] uppercase leading-[0.85] mb-6">
              {title}
            </h1>
            
            {/* Price */}
            <p className="text-2xl text-zinc-300 font-medium tracking-tight mb-12">
              {priceFormatted}
            </p>

            <div className="h-[1px] w-full bg-zinc-900 mb-12"></div>

            {/* Description */}
            <div className="mb-12">
               <h3 className="text-[10px] text-zinc-500 tracking-[0.3em] uppercase mb-4">The Details</h3>
               <p className="text-sm text-zinc-400 leading-relaxed max-w-md font-light mb-6">
                 {description}
               </p>
               {displayProduct.attributes && Object.keys(displayProduct.attributes).length > 0 && (
                 <div className="flex flex-wrap gap-2">
                   {Object.entries(displayProduct.attributes).map(([key, val]) => (
                     <span key={key} className="text-[10px] border border-zinc-800 text-zinc-400 px-3 py-1 tracking-[0.2em] uppercase">
                       <strong className="text-white">{key}:</strong> {val}
                     </span>
                   ))}
                 </div>
               )}
            </div>

            {/* Variants List */}
            {variants && variants.length > 0 && (
              <div className="border-t border-zinc-900 pt-8 max-w-md mb-12">
                  <h3 className="text-[10px] text-zinc-500 tracking-[0.3em] uppercase mb-4">Available Variants</h3>
                  <div className="flex flex-wrap gap-4">
                      {[product, ...variants].map((v) => {
                          const vPriceFormatted = v.price?.amount 
                              ? `${currencySymbol}${v.price.amount.toLocaleString()}`
                              : `${currencySymbol}${Number(v.price || 0).toLocaleString()}`;
                          
                          return (
                              <div 
                                  key={v._id || Math.random()} 
                                  className={`border transition-all duration-300 ease-out cursor-pointer flex flex-col w-[72px] shrink-0 ${activeVariant?._id === v._id ? 'bg-[#F5C518]/10 border-[#F5C518]' : 'border-zinc-700 hover:border-white hover:bg-white/5'}`}
                                  onClick={() => { setActiveVariant(v); setMainImageIndex(0); }}
                                 
                                 
                                  title={v.title || 'Variant'}
                              >
                                  {/* Variant Image - White Background like Amazon */}
                                  <div 
                                      className="w-full h-[85px] bg-white flex items-center justify-center overflow-hidden p-0.5"
                                      onMouseEnter={() => setHoveredVariant(v)}
                                  >
                                      {(v.images && v.images.length > 0) || (product.images && product.images.length > 0) ? (
                                          <img src={v.images?.length > 0 ? (v.images[0].url || v.images[0]) : (product.images[0]?.url || product.images[0])} alt="Variant" className="w-full h-full object-contain mix-blend-multiply" />
                                      ) : (
                                          <span className="text-[8px] text-zinc-400 uppercase">No Img</span>
                                      )}
                                  </div>

                                  {/* Details */}
                                  <div   onClick={() => { setActiveVariant(v); setMainImageIndex(0); }}
                                    className="p-1.5 flex flex-col bg-[#111]">
                                      <span className="text-[11px] text-white font-semibold leading-tight">{vPriceFormatted}</span>
                                      <div className="flex justify-end items-center mt-1">
                                          <div className={`w-1.5 h-1.5 rounded-full ${Number(v.stock) > 0 ? 'bg-green-500' : 'bg-red-500'}`} title={`Stock: ${v.stock || 0}`}></div>
                                      </div>
                                  </div>
                              </div>
                          );
                      })}
                  </div>

                  {/* Specific Attribute Selectors */}
                  <div className="mt-8">
                      <h3 className="text-[10px] text-zinc-500 tracking-[0.3em] uppercase mb-3">Quick Select</h3>
                      <div className="flex flex-wrap gap-3">
                          {[product, ...variants].map((v, i) => {
                              const vSize = v.attributes?.Size || v.attributes?.size || v.size || v.Size;
                              const vColor = v.attributes?.Color || v.attributes?.color || v.color || v.Color;
                              const label = (v._id === product._id) ? "Main Product" : ([vSize, vColor].filter(Boolean).join(' / ') || `Option ${i+1}`);
                              
                              return (
                                  <div 
                                      key={`attr-${v._id || i}`} 
                                      className={`border transition-all duration-300 ease-out cursor-pointer flex items-center justify-center min-w-[60px] px-4 py-3 group ${activeVariant?._id === v._id ? 'bg-[#F5C518]/10 border-[#F5C518] shadow-[0_0_10px_rgba(245,197,24,0.15)]' : 'bg-transparent border-zinc-700 hover:border-white hover:bg-white/5'}`}
                                      onClick={() => { setActiveVariant(v); setMainImageIndex(0); }}
                                      title={`Stock: ${v.stock || 0}`}
                                  >
                                      <span className={`text-[11px] font-bold uppercase leading-none transition-colors duration-300 ${activeVariant?._id === v._id ? 'text-[#F5C518]' : 'text-zinc-300 group-hover:text-white'}`}>{label}</span>
                                  </div>
                              );
                          })}
                      </div>
                  </div>
              </div>
            )}

            {/* Specs / Info Accordions (Simulated) */}
            <div className="space-y-4 mb-16 max-w-md">
               <div className="border-t border-zinc-900 pt-4 flex justify-between items-center cursor-pointer group">
                  <span className="text-[11px] tracking-[0.2em] uppercase text-zinc-300 group-hover:text-white transition-colors">Composition & Care</span>
                  <span className="text-zinc-600 group-hover:text-[#F5C518]">+</span>
               </div>
               <div className="border-t border-zinc-900 pt-4 flex justify-between items-center cursor-pointer group">
                  <span className="text-[11px] tracking-[0.2em] uppercase text-zinc-300 group-hover:text-white transition-colors">Shipping & Returns</span>
                  <span className="text-zinc-600 group-hover:text-[#F5C518]">+</span>
               </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 max-w-md">
              <button 
                onClick={async () => {
                  const targetVariant = (activeVariant && activeVariant._id !== product._id)
                    ? activeVariant
                    : (product.variants?.length > 0 ? product.variants[0] : null);

                  const variantId = targetVariant ? targetVariant._id : null;
                  const variantPrice = targetVariant?.price || product.price;

                  await handleAddItems({
                    productId: product._id,
                    variantId: variantId,
                    quantity: 1,
                    price: variantPrice,
                  });
                }}
                className="flex-1 border border-zinc-700 bg-transparent text-white text-[12px] font-bold tracking-[0.2em] uppercase py-5 hover:border-white transition-colors duration-300"
              >
                {(activeVariant && activeVariant._id !== product._id) ? 'Add Variant to Cart' : 'Add To Cart'}
              </button>
              <button 
                onClick={() => {
                  if (!user) {
                    navigate('/register');
                  } else {
                    navigate('/payment');
                  }
                }}
                className="flex-1 bg-[#F5C518] text-black text-[12px] font-bold tracking-[0.2em] uppercase py-5 hover:bg-white transition-colors duration-300">
                Buy Now
              </button>
            </div>

            {/* Need Help */}
             <div className="mt-12 text-center max-w-md">
               <a href="#" className="inline-block text-[10px] text-zinc-500 tracking-[0.2em] uppercase border-b border-zinc-800 hover:text-white hover:border-white transition-all pb-1">
                 Need sizing help? Contact a stylist.
               </a>
             </div>
          </section>

        </div>
      </main>

      {/* ══ ADDED TO CART TOAST (top-right with image) ══ */}
      <div
        className={`fixed top-24 right-6 z-50 transition-all duration-500 ease-out ${
          showToast
            ? 'translate-y-0 opacity-100 pointer-events-auto'
            : '-translate-y-4 opacity-0 pointer-events-none'
        }`}
      >
        <div className="bg-[#111] border border-zinc-800 shadow-2xl overflow-hidden w-[300px]">
          {/* Progress bar at top */}
          <div className="h-[2px] bg-zinc-800 overflow-hidden">
            {showToast && (
              <div
                className="h-full bg-[#F5C518]"
                style={{ animation: 'toast-shrink 2.5s linear forwards' }}
              />
            )}
          </div>

          <div className="flex items-stretch gap-0">
            {/* Product image */}
            <div className="w-20 h-20 shrink-0 bg-zinc-900 overflow-hidden">
              <img
                src={lastAddedVariant?.images?.[0]?.url || lastAddedVariant?.images?.[0] || images?.[0]?.url || images?.[0] || ''}
                alt={title}
                className="w-full h-full object-cover opacity-90"
              />
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col justify-between px-3 py-2.5 min-w-0">
              <div>
                {/* Header row */}
                <div className="flex items-center gap-1.5 mb-1">
                  <div className="w-4 h-4 bg-[#F5C518] rounded-full flex items-center justify-center shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-2.5 w-2.5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#F5C518]">Added to Bag</p>
                </div>
                <p className="text-[12px] font-semibold text-white truncate leading-tight">{title}</p>
                {/* Variant attributes — size / color */}
                {lastAddedVariant?.attributes && Object.keys(lastAddedVariant.attributes).length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-0.5">
                    {Object.entries(lastAddedVariant.attributes).map(([k, v]) => (
                      <span key={k} className="text-[9px] border border-zinc-700 text-[#F5C518] px-1.5 py-0.5 uppercase tracking-widest">
                        {k}: {v}
                      </span>
                    ))}
                  </div>
                )}
                <p className="text-[10px] text-zinc-500 mt-0.5">
                  {lastAddedVariant?.price?.amount
                    ? `${sym(lastAddedVariant.price.currency || price?.currency || 'INR')}${lastAddedVariant.price.amount.toLocaleString()}`
                    : priceFormatted
                  }
                </p>
              </div>

              {/* Actions */}
              <button
                onClick={() => navigate('/cart')}
                className="mt-2 w-full bg-[#F5C518] text-black text-[10px] font-bold uppercase tracking-[0.15em] py-1.5 hover:bg-white transition-colors"
              >
                View Bag →
              </button>
            </div>
          </div>
        </div>
      </div>


      {/* ══ FULLSCREEN ZOOM MODAL ══ */}
      {zoomImage && (
        <div 
          className="fixed inset-0 z-50 bg-[#0D0D0D]/95 backdrop-blur-md flex items-center justify-center p-4 lg:p-12 cursor-zoom-out"
          onClick={() => setZoomImage(null)}
        >
          {/* Close button */}
          <button 
            className="absolute top-8 right-8 text-zinc-500 hover:text-white transition-colors flex items-center gap-3 group"
            onClick={(e) => {
              e.stopPropagation();
              setZoomImage(null);
            }}
          >
            <span className="text-[10px] tracking-[0.3em] uppercase">Close</span>
            <div className="relative w-6 h-6 flex items-center justify-center transform rotate-45">
              <div className="absolute w-full h-[1px] bg-zinc-500 group-hover:bg-white transition-colors"></div>
              <div className="absolute h-full w-[1px] bg-zinc-500 group-hover:bg-white transition-colors"></div>
            </div>
          </button>

          <img 
            src={zoomImage} 
            alt="Zoomed view" 
            className="max-w-full max-h-full object-contain" 
            onClick={(e) => {
              // Allows clicking image to zoom out since cursor is zoom-out
              setZoomImage(null);
            }}
          />
        </div>
      )}

      {/* ══ RELATED PRODUCTS ══ */}
      {allProducts.filter((p) => p._id !== product?._id).length > 0 && (
        <section className="px-8 xl:px-16 pb-24 mt-24">
          {/* Section heading */}
          <div className="flex items-end justify-between mb-8 border-b border-zinc-900 pb-5">
            <div>
              <p className="text-[9px] text-zinc-600 tracking-[0.3em] uppercase mb-1">Curated For You</p>
              <h2 className="text-2xl font-extrabold tracking-tight uppercase text-white">You May Also Like</h2>
            </div>
            <button
              onClick={() => navigate('/')}
              className="text-[9px] tracking-[0.22em] uppercase text-zinc-500 hover:text-[#F5C518] transition-colors border-b border-transparent hover:border-[#F5C518] pb-0.5"
            >
              View All
            </button>
          </div>

          {/* Horizontal scroll grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {allProducts
              .filter((p) => p._id !== product?._id)
              .slice(0, 5)
              .map((p) => {
                const cover = p.images?.[0]?.url;
                const price = p.price;
                return (
                  <div
                    key={p._id}
                    onClick={() => navigate(`/ViewProduct/${p._id}`)}
                    className="group cursor-pointer"
                  >
                    {/* Image */}
                    <div className="w-full bg-[#111] overflow-hidden mb-3" style={{ aspectRatio: '3/4' }}>
                      {cover ? (
                        <img
                          src={cover}
                          alt={p.title}
                          className="w-full h-full object-cover opacity-75 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <svg className="h-8 w-8 text-zinc-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909" />
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <p className="text-[9px] text-zinc-600 tracking-[0.2em] uppercase mb-1 truncate">
                      {p.description?.slice(0, 30) || 'Snitch'}
                    </p>
                    <h3 className="text-sm font-bold uppercase text-white group-hover:text-[#F5C518] transition-colors leading-tight line-clamp-2 mb-1">
                      {p.title}
                    </h3>
                    {price?.amount && (
                      <p className="text-sm font-semibold text-zinc-300">
                        {sym(price.currency)}{price.amount.toLocaleString()}
                      </p>
                    )}
                  </div>
                );
              })
            }
          </div>
        </section>
      )}

    </div>
  );
};

export default ViewProduct;
