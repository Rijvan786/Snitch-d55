import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useProduct } from '../hook/useProduct';
import { useSelector } from 'react-redux';

const EditProduct = () => {
    const { ProductId } = useParams();
    const navigate = useNavigate();
    const { handleEditProduct, handleAddVariant, handleRelatedVariant} = useProduct();
    const product = useSelector(state => state.product.ViewProduct);

    // Form state
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
    });

    const [isAddingVariant, setIsAddingVariant] = useState(false);
    const [variantData, setVariantData] = useState({
        title: '',
        description: '',
        priceAmount: '',
        PriceCurrency: 'INR',
        stock: '',
        size: ''
    });

    const [variantImages, setVariantImages] = useState([]);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const newImages = files.map(file => ({
            file,
            preview: URL.createObjectURL(file)
        }));
        setVariantImages(prev => [...prev, ...newImages]);
    };
    
    const removeImage = (index) => {
        setVariantImages(prev => prev.filter((_, i) => i !== index));
    };

    const [relatedVariants, setRelatedVariants] = useState([]);

    // Fetch related variants
    useEffect(() => {
        const fetchVariants = async () => {
            if (ProductId) {
                try {
                    const variants = await handleRelatedVariant({ VariantId: ProductId });
                    if (variants) {
                        setRelatedVariants(Array.isArray(variants) ? variants : [variants]);
                    }
                } catch (error) {
                    console.error("Error fetching related variants:", error);
                }
            }
        };
        fetchVariants();
    }, [ProductId]);

    // Pre-fill form when product loads
    useEffect(() => {
        if (product) {
            setFormData({
                title: product.title || '',
                description: product.description || '',
                price: typeof product.price === 'object' ? product.price.amount : (product.price || ''),
            });
        }
    }, [product]);

    if (!product) {
        return (
            <div className="min-h-screen bg-[#050505] flex items-center justify-center">
                <p className="text-[11px] text-[#F5C518] tracking-[0.4em] uppercase animate-pulse">Loading Workspace...</p>
            </div>
        );
    }

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            await handleEditProduct({
                title: formData.title,
                description: formData.description,
                priceAmount: formData.price,
           ProductId }, );
            
            // Optional: Provide visual feedback to the seller
            alert("Product details updated successfully!");
        } catch (error) {
            console.error("Error updating product details:", error);
            alert("Failed to update product details.");
        }
    };

    const handleAddVariants = async (e) => {
        e.preventDefault();
        try {
            const formDataToSubmit = new FormData();
            formDataToSubmit.append("title", variantData.title);
            formDataToSubmit.append("description", variantData.description);
            formDataToSubmit.append("priceAmount", variantData.priceAmount);
            formDataToSubmit.append("PriceCurrency", variantData.PriceCurrency);
            formDataToSubmit.append("size", variantData.size);
            formDataToSubmit.append("stock", variantData.stock);
            
            variantImages.forEach(img => formDataToSubmit.append("images", img.file));

            await handleAddVariant({ formdata: formDataToSubmit, ProductId });
            
            alert("Variant added to product!");
            setIsAddingVariant(false);
            setVariantData({ title: '', description: '', priceAmount: '', PriceCurrency: 'INR', stock: '', size: '' });
            setVariantImages([]);

            // Refresh existing variants
            const updatedVariants = await handleRelatedVariant({ VariantId: ProductId });
            if (updatedVariants) setRelatedVariants(Array.isArray(updatedVariants) ? updatedVariants : [updatedVariants]);
        } catch (error) {
            console.error("Error adding variant:", error);
            alert("Failed to add variant.");
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] font-[Inter,sans-serif] text-[#F5F5F0] selection:bg-[#F5C518] selection:text-black pb-32">
            {/* Elegant Navbar */}
            <nav className="fixed top-0 inset-x-0 z-40 flex items-center justify-between px-8 xl:px-16 h-28 bg-[#050505]/80 backdrop-blur-xl border-b border-white/5">
                <button 
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-4 group px-4 py-2 hover:bg-white/5 rounded-full transition-all"
                >
                    <div className="w-6 h-[1px] bg-zinc-500 group-hover:w-10 group-hover:bg-[#F5C518] transition-all duration-500"></div>
                    <span className="text-[10px] font-medium tracking-[0.3em] uppercase text-zinc-400 group-hover:text-white transition-colors">
                        Return
                    </span>
                </button>
                <span className="text-[#F5C518] text-[11px] font-bold tracking-[0.4em] uppercase leading-none">Workspace</span>
            </nav>

            <main className="pt-40 px-8 xl:px-16 max-w-[1400px] mx-auto">
                <div className="flex flex-col gap-4 mb-20 border-b border-white/10 pb-12">
                    <span className="text-[10px] text-[#F5C518] tracking-[0.3em] uppercase">Product Editor</span>
                    <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-white/90">{product.title || "Untitled Asset"}</h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-24">
                    {/* Left: Edit Existing Product Details */}
                    <section className="lg:col-span-7 space-y-12">
                        <div className="flex items-center gap-4">
                            <div className="w-2 h-2 bg-[#F5C518] rounded-full"></div>
                            <h2 className="text-[13px] text-zinc-300 tracking-[0.2em] uppercase font-medium">Core Details</h2>
                        </div>
                        
                        <form onSubmit={handleSave} className="space-y-10 bg-white/[0.02] p-10 lg:p-14 rounded-3xl border border-white/5 shadow-2xl backdrop-blur-sm">
                            <div className="space-y-3">
                                <label className="block text-[11px] text-zinc-400 tracking-[0.15em] uppercase font-medium ml-1">Asset Title</label>
                                <input 
                                    type="text" 
                                    value={formData.title}
                                    onChange={e => setFormData({...formData, title: e.target.value})}
                                    className="w-full bg-[#0A0A0A] border border-white/10 text-white px-6 py-5 rounded-2xl focus:outline-none focus:border-[#F5C518]/50 focus:ring-1 focus:ring-[#F5C518]/30 transition-all text-lg placeholder-zinc-700"
                                    placeholder="Enter title..."
                                />
                            </div>
                            
                            <div className="space-y-3">
                                <label className="block text-[11px] text-zinc-400 tracking-[0.15em] uppercase font-medium ml-1">Description</label>
                                <textarea 
                                    rows="5"
                                    value={formData.description}
                                    onChange={e => setFormData({...formData, description: e.target.value})}
                                    className="w-full bg-[#0A0A0A] border border-white/10 text-white px-6 py-5 rounded-2xl focus:outline-none focus:border-[#F5C518]/50 focus:ring-1 focus:ring-[#F5C518]/30 transition-all text-base resize-none leading-relaxed placeholder-zinc-700"
                                    placeholder="Provide a detailed description..."
                                />
                            </div>
                            
                            <div className="space-y-3">
                                <label className="block text-[11px] text-zinc-400 tracking-[0.15em] uppercase font-medium ml-1">Price Amount (₹)</label>
                                <div className="relative">
                                    <span className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-500 font-medium">₹</span>
                                    <input 
                                        type="number" 
                                        value={formData.price}
                                        onChange={e => setFormData({...formData, price: e.target.value})}
                                        className="w-full bg-[#0A0A0A] border border-white/10 text-white pl-12 pr-6 py-5 rounded-2xl focus:outline-none focus:border-[#F5C518]/50 focus:ring-1 focus:ring-[#F5C518]/30 transition-all text-lg placeholder-zinc-700"
                                        placeholder="0.00"
                                    />
                                </div>
                            </div>
                            
                            <div className="pt-4">
                                <button 
                                    type="submit"
                                    className="w-full bg-white text-[#050505] text-[12px] font-bold tracking-[0.2em] uppercase py-6 rounded-2xl hover:bg-[#F5C518] hover:shadow-[0_0_30px_rgba(245,197,24,0.2)] hover:-translate-y-1 transition-all duration-300">
                                    Commit Changes
                                </button>
                            </div>
                        </form>
                    </section>

                    {/* Right: Add Variant */}
                    <section className="lg:col-span-5 space-y-12">
                        <div className="flex items-center gap-4">
                            <div className="w-2 h-2 bg-zinc-600 rounded-full"></div>
                            <h2 className="text-[13px] text-zinc-300 tracking-[0.2em] uppercase font-medium">Variant Management</h2>
                        </div>

                        {/* Existing Variants */}
                        {relatedVariants && relatedVariants.length > 0 && (
                            <div className="space-y-4">
                                <h3 className="text-[11px] text-zinc-500 tracking-[0.2em] uppercase">Existing Variants</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {relatedVariants.map((variant, idx) => (
                                        <div key={idx} className="bg-[#111] border border-white/5 p-5 rounded-2xl group hover:border-[#F5C518]/30 transition-all flex items-center gap-4">
                                            {variant.images && variant.images.length > 0 ? (
                                                <img src={variant.images[0].url || variant.images[0]} alt="Variant" className="w-12 h-16 object-cover rounded-md" />
                                            ) : (
                                                <div className="w-12 h-16 bg-zinc-900 rounded-md flex items-center justify-center text-zinc-700 text-[10px]">N/A</div>
                                            )}
                                            <div>
                                                <p className="text-white text-sm font-medium mb-1 truncate max-w-[120px]" title={variant.title}>{variant.title || "Variant"}</p>
                                                <div className="flex flex-col gap-1 text-[10px] text-zinc-400">
                                                    <span className="uppercase">{variant.size ? `Size: ${variant.size}` : "Size: -"}</span>
                                                    <span>Stock: {variant.stock !== undefined ? variant.stock : (variant.Stock !== undefined ? variant.Stock : "-")}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        
                        {!isAddingVariant ? (
                            <div className="bg-white/[0.01] border border-white/5 p-12 rounded-3xl flex flex-col items-center justify-center text-center group hover:border-[#F5C518]/20 transition-all duration-500 cursor-pointer" onClick={() => setIsAddingVariant(true)}>
                                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6 group-hover:bg-[#F5C518]/10 group-hover:scale-110 transition-all duration-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-zinc-400 group-hover:text-[#F5C518] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                </div>
                                <h3 className="text-white font-medium text-lg mb-3 tracking-wide">Add New Variant</h3>
                                <p className="text-sm text-zinc-500 leading-relaxed max-w-[250px]">Expand your product offering with new colors, sizes, or configurations.</p>
                            </div>
                        ) : (
                            <div className="bg-white/[0.02] border border-[#F5C518]/30 p-10 lg:p-12 rounded-3xl relative shadow-[0_0_40px_rgba(245,197,24,0.05)] backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <button 
                                    onClick={() => setIsAddingVariant(false)}
                                    className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white transition-all"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                                
                                <div className="mb-10">
                                    <span className="inline-block px-3 py-1 rounded-full bg-[#F5C518]/10 text-[#F5C518] text-[10px] font-bold tracking-[0.2em] uppercase mb-4">Configuration</span>
                                    <h3 className="text-2xl font-bold text-white tracking-wide">Variant Details</h3>
                                </div>
                                
                                <form onSubmit={handleAddVariants} className="space-y-6">
                                    <div className="space-y-3">
                                        <label className="block text-[10px] text-zinc-400 tracking-[0.15em] uppercase font-medium ml-1">Variant Title</label>
                                        <input 
                                            type="text" 
                                            placeholder="e.g. Midnight Black Edition"
                                            value={variantData.title}
                                            onChange={e => setVariantData({...variantData, title: e.target.value})}
                                            className="w-full bg-[#0A0A0A] border border-white/10 text-white px-5 py-4 rounded-xl focus:outline-none focus:border-[#F5C518]/50 focus:ring-1 focus:ring-[#F5C518]/30 transition-all text-base placeholder-zinc-700"
                                        />
                                    </div>

                                    <div className="space-y-3">
                                        <label className="block text-[10px] text-zinc-400 tracking-[0.15em] uppercase font-medium ml-1">Description</label>
                                        <textarea 
                                            rows="3"
                                            placeholder="Variant specific details..."
                                            value={variantData.description}
                                            onChange={e => setVariantData({...variantData, description: e.target.value})}
                                            className="w-full bg-[#0A0A0A] border border-white/10 text-white px-5 py-4 rounded-xl focus:outline-none focus:border-[#F5C518]/50 focus:ring-1 focus:ring-[#F5C518]/30 transition-all text-base resize-none placeholder-zinc-700"
                                        />
                                    </div>
                                    
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-3">
                                            <label className="block text-[10px] text-zinc-400 tracking-[0.15em] uppercase font-medium ml-1">Price Amount</label>
                                            <input 
                                                type="number" 
                                                placeholder="0.00"
                                                value={variantData.priceAmount}
                                                onChange={e => setVariantData({...variantData, priceAmount: e.target.value})}
                                                className="w-full bg-[#0A0A0A] border border-white/10 text-white px-5 py-4 rounded-xl focus:outline-none focus:border-[#F5C518]/50 focus:ring-1 focus:ring-[#F5C518]/30 transition-all text-base placeholder-zinc-700"
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="block text-[10px] text-zinc-400 tracking-[0.15em] uppercase font-medium ml-1">Currency</label>
                                            <select 
                                                value={variantData.PriceCurrency}
                                                onChange={e => setVariantData({...variantData, PriceCurrency: e.target.value})}
                                                className="w-full bg-[#0A0A0A] border border-white/10 text-white px-5 py-4 rounded-xl focus:outline-none focus:border-[#F5C518]/50 focus:ring-1 focus:ring-[#F5C518]/30 transition-all text-base appearance-none"
                                            >
                                                <option value="INR">INR (₹)</option>
                                                <option value="USD">USD ($)</option>
                                                <option value="EUR">EUR (€)</option>
                                                <option value="GBP">GBP (£)</option>
                                            </select>
                                        </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-3">
                                            <label className="block text-[10px] text-zinc-400 tracking-[0.15em] uppercase font-medium ml-1">Size</label>
                                            <input 
                                                type="text" 
                                                placeholder="e.g. XL"
                                                value={variantData.size}
                                                onChange={e => setVariantData({...variantData, size: e.target.value})}
                                                className="w-full bg-[#0A0A0A] border border-white/10 text-white px-5 py-4 rounded-xl focus:outline-none focus:border-[#F5C518]/50 focus:ring-1 focus:ring-[#F5C518]/30 transition-all text-base placeholder-zinc-700"
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="block text-[10px] text-zinc-400 tracking-[0.15em] uppercase font-medium ml-1">Stock</label>
                                            <input 
                                                type="number" 
                                                placeholder="0"
                                                value={variantData.stock}
                                                onChange={e => setVariantData({...variantData, stock: e.target.value})}
                                                className="w-full bg-[#0A0A0A] border border-white/10 text-white px-5 py-4 rounded-xl focus:outline-none focus:border-[#F5C518]/50 focus:ring-1 focus:ring-[#F5C518]/30 transition-all text-base placeholder-zinc-700"
                                            />
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-3">
                                        <label className="block text-[10px] text-zinc-400 tracking-[0.15em] uppercase font-medium ml-1">Variant Images</label>
                                        <div className="border-2 border-dashed border-white/10 rounded-2xl p-6 text-center hover:border-[#F5C518]/30 transition-all">
                                            <input 
                                                type="file" 
                                                multiple 
                                                accept="image/*"
                                                onChange={handleImageChange}
                                                className="hidden"
                                                id="variant-image-upload"
                                            />
                                            <label htmlFor="variant-image-upload" className="cursor-pointer flex flex-col items-center">
                                                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-3 text-zinc-400 group-hover:text-[#F5C518] transition-colors">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                                    </svg>
                                                </div>
                                                <span className="text-[11px] text-zinc-300 font-medium tracking-wide">Click to upload images</span>
                                            </label>
                                        </div>
                                        {variantImages.length > 0 && (
                                            <div className="flex gap-4 mt-4 overflow-x-auto pb-2 no-scrollbar">
                                                {variantImages.map((img, idx) => (
                                                    <div key={idx} className="relative w-20 h-24 rounded-lg overflow-hidden shrink-0 group/img">
                                                        <img src={img.preview} alt="preview" className="w-full h-full object-cover" />
                                                        <button 
                                                            type="button"
                                                            onClick={() => removeImage(idx)}
                                                            className="absolute top-1 right-1 bg-black/50 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] opacity-0 group-hover/img:opacity-100 transition-opacity hover:bg-red-500"
                                                        >
                                                            &times;
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    
                                    <div className="pt-4">
                                        <button 
                                            type="submit"
                                            className="w-full bg-[#F5C518] text-[#050505] text-[11px] font-bold tracking-[0.2em] uppercase py-5 rounded-xl hover:bg-white hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all duration-300">
                                            Save Variant
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}
                    </section>
                </div>
            </main>
        </div>
    );
};

export default EditProduct;