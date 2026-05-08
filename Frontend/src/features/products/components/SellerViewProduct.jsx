import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useProduct } from '../hook/useProduct';
import { useSelector } from 'react-redux';

const sym = (c) => ({ INR: '₹', USD: '$', EUR: '€', GBP: '£' }[c] ?? c);

const SellerViewProduct = () => {
    const { ProductId } = useParams();
    const navigate = useNavigate();
    const { handleViewDetailProduct,handleRelatedVariant } = useProduct();
    const product = useSelector(state => state.product.ViewProduct);
    const [mainImageIndex, setMainImageIndex] = useState(0);
    const [variants, setVariants] = useState([]);
    const [activeVariant, setActiveVariant] = useState(null);
    const [hoveredVariant, setHoveredVariant] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            await handleViewDetailProduct(ProductId);
           const data= await handleRelatedVariant({VariantId:ProductId});
           console.log(data);
           if (data) {
               // Assuming data is an array of variants
               setVariants(Array.isArray(data) ? data : [data]);
           }
        };
        fetchProduct();
    }, [ProductId]);

    if (!product) {
        return (
            <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center">
                <p className="text-[10px] text-[#F5C518] tracking-[0.4em] uppercase animate-pulse">Loading Asset...</p>
            </div>
        );
    }

    const displayProduct = hoveredVariant || activeVariant || product;
    const { title, description, category, stock } = displayProduct;
    const price = displayProduct.price || product.price;
    const images = displayProduct.images?.length > 0 ? displayProduct.images : (product.images || []);
    
    // Handle price being an object or a primitive
    let priceFormatted = '';
    if (typeof price === 'object' && price !== null) {
        priceFormatted = `${sym(price.currency || 'INR')}${price.amount?.toLocaleString() || '0'}`;
    } else {
        priceFormatted = `₹${Number(price || 0).toLocaleString()}`;
    }

    return (
        <div className="min-h-screen bg-[#0D0D0D] font-[Inter,sans-serif] text-[#F5F5F0] selection:bg-[#F5C518] selection:text-black pb-32">
            {/* ══ MINIMAL NAVBAR ══ */}
            <nav className="fixed top-0 inset-x-0 z-40 flex items-center justify-between px-8 xl:px-16 h-24 mix-blend-difference bg-[#0D0D0D]/50 backdrop-blur-md">
                <button 
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-4 group"
                >
                    <div className="w-8 h-[1px] bg-white group-hover:w-12 transition-all duration-300"></div>
                    <span className="text-[10px] font-medium tracking-[0.3em] uppercase text-white group-hover:text-[#F5C518] transition-colors">
                        Back to Dashboard
                    </span>
                </button>
                <span className="text-[#F5C518] text-sm font-bold tracking-[0.3em] uppercase leading-none mix-blend-normal">SELLER PORTAL</span>
            </nav>

            <main className="pt-32 px-8 xl:px-16 max-w-[1600px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-32 items-start">
                    
                    {/* Left: Image Gallery */}
                    <section className="lg:col-span-6 flex flex-col-reverse lg:flex-row gap-4 xl:gap-8">
                        {images.length > 0 ? (
                            <>
                                <div className="flex lg:flex-col gap-4 overflow-x-auto lg:overflow-y-auto w-full lg:w-24 shrink-0 no-scrollbar">
                                    {images.map((img, idx) => (
                                        <div 
                                            key={idx} 
                                            className={`relative w-20 h-24 lg:w-full lg:h-32 shrink-0 cursor-pointer border ${mainImageIndex === idx ? 'border-[#F5C518]' : 'border-transparent'} hover:border-zinc-500 transition-colors`}
                                            onClick={() => setMainImageIndex(idx)}
                                        >
                                            <img src={img.url || img} className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity" alt={`Thumbnail ${idx + 1}`} />
                                        </div>
                                    ))}
                                </div>
                                <div className="relative w-full aspect-[4/5] bg-[#111] overflow-hidden group">
                                    <img 
                                        src={images[mainImageIndex]?.url || images[mainImageIndex] || images[0]?.url || images[0]} 
                                        alt="Main View"
                                        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-700 ease-out"
                                    />
                                </div>
                            </>
                        ) : (
                            <div className="w-full aspect-[4/5] bg-[#111] flex items-center justify-center border border-zinc-800">
                                <p className="text-[10px] text-zinc-600 tracking-[0.4em] uppercase">No imagery available</p>
                            </div>
                        )}
                    </section>

                    {/* Right: Product Details & Management */}
                    <section className="lg:col-span-6 lg:sticky lg:top-32 flex flex-col pt-12 lg:pt-0">
                        {/* Status Badges */}
                        <div className="flex items-center gap-4 mb-8">
                            <span className="text-[9px] border border-zinc-800 text-zinc-400 px-3 py-1 tracking-[0.3em] uppercase">
                                {category || 'Product'}
                            </span>
                            <span className={`text-[9px] px-3 py-1 tracking-[0.3em] font-bold uppercase ${stock > 0 || stock === undefined ? 'bg-[#F5C518] text-black' : 'bg-red-500 text-white'}`}>
                                {stock > 0 || stock === undefined ? 'Active' : 'Out of Stock'}
                            </span>
                        </div>

                        {/* Title & Price */}
                        <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold tracking-[-0.04em] text-[#F5F5F0] uppercase leading-[0.85] mb-6">
                            {title}
                        </h1>
                        <p className="text-2xl text-[#F5C518] font-medium tracking-tight mb-12">
                            {priceFormatted}
                        </p>

                        <div className="h-[1px] w-full bg-zinc-900 mb-12"></div>

                        {/* Description */}
                        <div className="mb-12">
                            <h3 className="text-[10px] text-zinc-500 tracking-[0.3em] uppercase mb-4">Product Description</h3>
                            <p className="text-sm text-zinc-400 leading-relaxed max-w-md font-light">
                                {description || 'No description provided.'}
                            </p>
                        </div>

                        {/* Inventory & Analytics Info */}
                        <div className="grid grid-cols-2 gap-8 mb-16 max-w-md">
                            <div className="border border-zinc-800 p-6 bg-[#111]">
                                <p className="text-[10px] text-zinc-500 tracking-[0.2em] uppercase mb-2">Current Stock</p>
                                <p className="text-3xl font-light text-white">{stock !== undefined ? stock : '--'}</p>
                            </div>
                            <div className="border border-zinc-800 p-6 bg-[#111]">
                                <p className="text-[10px] text-zinc-500 tracking-[0.2em] uppercase mb-2">Total Sales</p>
                                <p className="text-3xl font-light text-white">{product.sales || '0'}</p>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-4 max-w-md mb-12">
                            <button 
                                onClick={() => navigate(`/seller/EditProduct/${ProductId}`)}
                                className="flex-1 bg-white text-black text-[12px] font-bold tracking-[0.2em] uppercase py-5 hover:bg-[#F5C518] transition-colors duration-300">
                                Edit Product
                            </button>
                            <button 
                                className="flex-1 border border-red-900/50 text-red-500 text-[12px] font-bold tracking-[0.2em] uppercase py-5 hover:bg-red-500 hover:text-white transition-colors duration-300">
                                Delete Asset
                            </button>
                        </div>

                        {/* Variants List */}
                        {variants && variants.length > 0 && (
                            <div className="border-t border-zinc-900 pt-8 max-w-md">
                                <h3 className="text-[10px] text-zinc-500 tracking-[0.3em] uppercase mb-4">Available Variants</h3>
                                <div className="flex flex-wrap gap-3">
                                    {[product, ...variants].map((v) => {
                                        const vPriceFormatted = typeof v.price === 'object' && v.price !== null
                                            ? `${sym(v.price.currency || 'INR')}${v.price.amount?.toLocaleString() || '0'}`
                                            : `₹${Number(v.price || 0).toLocaleString()}`;
                                        
                                        return (
                                            <div 
                                                key={v._id} 
                                                className={`border bg-transparent transition-all cursor-pointer flex flex-col w-[72px] shrink-0 ${activeVariant?._id === v._id ? 'border-[#F5C518]' : 'border-zinc-700 hover:border-white'}`}
                                                onClick={() => { setActiveVariant(v); setMainImageIndex(0); }}
                                                onMouseEnter={() => setHoveredVariant(v)}
                                                onMouseLeave={() => setHoveredVariant(null)}
                                                title={v.title}
                                            >
                                                {/* Variant Image - White Background like Amazon */}
                                                <div className="w-full h-[85px] bg-white flex items-center justify-center overflow-hidden p-0.5">
                                                    {v.images && v.images.length > 0 ? (
                                                        <img src={v.images[0].url || v.images[0]} alt="Variant" className="w-full h-full object-contain" />
                                                    ) : (
                                                        <span className="text-[8px] text-zinc-400 uppercase">No Img</span>
                                                    )}
                                                </div>

                                                {/* Details */}
                                                <div className="p-1.5 flex flex-col bg-[#111]">
                                                    <span className="text-[11px] text-white font-semibold leading-tight">{vPriceFormatted}</span>
                                                    <div className="flex justify-between items-center mt-1">
                                                        <span className="text-[9px] text-zinc-400 uppercase leading-none">{v.Size || 'N/A'}</span>
                                                        <div className={`w-1.5 h-1.5 rounded-full ${Number(v.stock) > 0 ? 'bg-green-500' : 'bg-red-500'}`} title={`Stock: ${v.stock || 0}`}></div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Specific Size Boxes */}
                                <div className="mt-8">
                                    <h3 className="text-[10px] text-zinc-500 tracking-[0.3em] uppercase mb-3">Sizes</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {[product, ...variants].map((v) => (
                                            console.log(v),
                                            <div 
                                                key={`size-${v._id}`} 
                                                className={`border bg-transparent transition-all cursor-pointer flex items-center justify-center min-w-[44px] px-3 py-2 group ${activeVariant?._id === v._id ? 'border-[#F5C518]' : 'border-zinc-700 hover:border-white'}`}
                                                onClick={() => { setActiveVariant(v); setMainImageIndex(0); }}
                                                onMouseEnter={() => setHoveredVariant(v)}
                                                onMouseLeave={() => setHoveredVariant(null)}
                                                title={`Stock: ${v.stock || 0}`}
                                            >
                                                <span className={`text-[11px] font-bold uppercase leading-none ${activeVariant?._id === v._id ? 'text-[#F5C518]' : 'text-zinc-300 group-hover:text-white'}`}>{v.size}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                    </section>
                </div>
            </main>
        </div>
    );
};

export default SellerViewProduct;