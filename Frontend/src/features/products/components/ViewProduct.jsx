import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useProduct } from '../hook/useProduct';
import { useNavigate, useParams } from 'react-router';

/* Currency helper */
const sym = (c) => ({ INR: '₹', USD: '$', EUR: '€', GBP: '£' }[c] ?? c);

const ViewProduct = () => {
  const { handleViewDetailProduct } = useProduct();
  const {ProductId}=useParams()
  console.log(ProductId);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const user = useSelector((state) => state.auth.User);
  const [zoomImage, setZoomImage] = useState(null);
  const [product,setProduct]=useState(null)
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [variants, setVariants] = useState([]);
  const [activeVariant, setActiveVariant] = useState(null);
  const [hoveredVariant, setHoveredVariant] = useState(null);

  async function fetchProduct(){
   const data=  await handleViewDetailProduct(ProductId);
   setProduct(data.product)
console.log(product);
  }
  useEffect(() => {
   fetchProduct()
  }, [ProductId]);

  useEffect(() => {
    if (product?.variants?.length > 0) {
      setVariants(product.variants);
    }
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

  return (
    <div className="min-h-screen bg-[#0D0D0D] font-[Inter,sans-serif] text-[#F5F5F0] selection:bg-[#F5C518] selection:text-black pb-32">
      
      {/* ══ MINIMAL NAVBAR OVERRIDE ══ */}
      <nav className="fixed top-0 inset-x-0 z-40 flex items-center justify-between px-8 xl:px-16 h-24 mix-blend-difference">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-4 group"
        >
          <div className="w-8 h-[1px] bg-white group-hover:w-12 transition-all duration-300"></div>
          <span className="text-[10px] font-medium tracking-[0.3em] uppercase text-white group-hover:text-[#F5C518] transition-colors">
            Back to Shop
          </span>
        </button>
        <span className="text-[#F5C518] text-sm font-bold tracking-[0.3em] uppercase leading-none mix-blend-normal">SNITCH</span>
      </nav>

      {/* ══ PRODUCT LAYOUT ══ */}
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
                                  <div className="p-1.5 flex flex-col bg-[#111]">
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
                              const label = [vSize, vColor].filter(Boolean).join(' / ') || `Option ${i+1}`;
                              
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
                onClick={() => {
     
                  navigate(`/cart/${activeVariant?._id || product._id}`);
                }}
                className="flex-1 border border-zinc-700 bg-transparent text-white text-[12px] font-bold tracking-[0.2em] uppercase py-5 hover:border-white transition-colors duration-300">
                Add To Cart
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

    </div>
  );
};

export default ViewProduct;
