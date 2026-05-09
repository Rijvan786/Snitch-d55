import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useProduct } from '../hook/useProduct';

const sym = (c) => ({ INR: '₹', USD: '$', EUR: '€', GBP: '£' }[c] ?? c);

const CameraIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-[#757575] mb-2 group-hover:text-[#1A1A1A] transition-colors">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
    </svg>
);

const SellerViewProduct = () => {
    const { ProductId } = useParams();
    const navigate = useNavigate();
    const { handleViewDetailProduct,handleAddVariant} = useProduct();
    
    const [product, setProduct] = useState(null);
    const [variants, setVariants] = useState([]);
    const [activeVariant, setActiveVariant] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Image Gallery State
    const [currentImgIdx, setCurrentImgIdx] = useState(0);

    // Variant Form State (Stored in LocalStorage)
    const [ variantForm, setVariantForm] = useState(() => {
        let draftAttributes = [{ name: 'Size', value: '' }];
        try { 
            const saved = localStorage.getItem(`draft_${ProductId}_attributes`);
            if (saved) draftAttributes = JSON.parse(saved); 
        } catch(e) {
            console.log("Draft Attribute ",e.message);
        }
        
        return {
            attributes: draftAttributes,
            price: localStorage.getItem(`draft_${ProductId}_price`) || '',
            stock: localStorage.getItem(`draft_${ProductId}_stock`) || ''
        };
    });

    const handleVariantChange = (e) => {
        const { name, value } = e.target;
        setVariantForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAttributeChange = (index, field, value) => {
        setVariantForm(prev => {
            const newAttributes = [...prev.attributes];
            newAttributes[index][field] = value;
            return { ...prev, attributes: newAttributes };
        });
    };

    const addAttribute = () => {
        setVariantForm(prev => ({
            ...prev,
            attributes: [...prev.attributes, { name: '', value: '' }]
        }));
    };

    const removeAttribute = (index) => {
        setVariantForm(prev => ({
            ...prev,
            attributes: prev.attributes.filter((_, i) => i !== index)
        }));
    };
    
    const [newImages, setNewImages] = useState(null);
    const [previewUrls, setPreviewUrls] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [formError, setFormError] = useState('');
    const [showVariantForm, setShowVariantForm] = useState(false);

    const fetchProductDetails = async () => {
        try {
            setIsLoading(true);
            const data = await handleViewDetailProduct(ProductId);
            const fetchedProduct = data?.product || data;
            setProduct(fetchedProduct);
            
            
            if (fetchedProduct?.variants && fetchedProduct.variants.length > 0) {
                setVariants(fetchedProduct.variants);
            }
        } catch(err) {
            console.log(`Fail to fetch Product Details: ${err.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProductDetails();
    }, [ProductId]);

    // Save draft state to LocalStorage
    useEffect(() => {
        localStorage.setItem(`draft_${ProductId}_attributes`, JSON.stringify(variantForm.attributes));
        localStorage.setItem(`draft_${ProductId}_price`, variantForm.price);
        localStorage.setItem(`draft_${ProductId}_stock`, variantForm.stock);
    }, [variantForm, ProductId]);

    // Drag & Drop Handlers
    const handleImageSelect = (e) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            if (files.length > 7) {
                setFormError('You can upload up to 7 images only.');
                return;
            }
            setFormError('');
            setNewImages(files);
            setPreviewUrls(files.map(f => URL.createObjectURL(f)));
        }
    };
    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files) {
            const files = Array.from(e.dataTransfer.files);
            if (files.length > 7) {
                setFormError('You can upload up to 7 images only.');
                return;
            }
            setFormError('');
            setNewImages(files);
            setPreviewUrls(files.map(f => URL.createObjectURL(f)));
        }
    };

    const handleCreateVariant = async (e) => {
        e.preventDefault();
        
        const validAttributes = variantForm.attributes.filter(a => a.name.trim() && a.value.trim());
        
        if (validAttributes.length === 0) {
            setFormError('At least one valid attribute (e.g. Size or Color) with a value is required.');
            return;
        }
        
        setIsSubmitting(true);
        setFormError('');
        try {
            const formData = new FormData();
            
            const attributesObj = {};
            validAttributes.forEach(attr => {
                attributesObj[attr.name] = attr.value;
            });
            formData.append('attributes', JSON.stringify(attributesObj));
            
            formData.append('price', variantForm.price);
            formData.append('stock', variantForm.stock);
            if (newImages) {
                for (let i = 0; i < newImages.length; i++) {
                    console.log(newImages[i])
                    formData.append('images', newImages[i]);
                }
            }    
            await  handleAddVariant({formData,ProductId})

            setIsSubmitting(false)
            // Reset form
            setVariantForm({
                attributes: [{ name: 'Size', value: '' }],
                price: '',
                stock: ''
            });
            setNewImages(null);
            setPreviewUrls([]);
            setShowVariantForm(false);

            // Clear draft from LocalStorage
            localStorage.removeItem(`draft_${ProductId}_attributes`);
            localStorage.removeItem(`draft_${ProductId}_price`);
            localStorage.removeItem(`draft_${ProductId}_stock`);
            
            fetchProductDetails();
        } catch (error) {
            console.error("Failed to add variant:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading || !product) {
        return (
            <div className="min-h-screen bg-[#F9F9F9] flex items-center justify-center">
                <p className="text-[11px] font-semibold text-[#757575] tracking-[0.1em] uppercase animate-pulse">Loading Workspace...</p>
            </div>
        );
    }
 
    console.log(product);
    const currencySymbol = sym(product.price?.currency || product.currency || 'INR');

    const priceFormatted = product.price?.amount 
        ? `${currencySymbol}${product.price.amount.toLocaleString()}`
        : `${currencySymbol}${Number(product.price || 0).toLocaleString()}`;

    return (
        <div className="min-h-screen bg-[#F9F9F9] font-[Inter,sans-serif] text-[#1A1A1A] pb-32">
            
            <nav className="sticky top-0 inset-x-0 z-40 flex items-center justify-between px-8 xl:px-[40px] h-24 bg-white/90 backdrop-blur-md border-b border-[#E5E5E5]">
                <button 
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-4 group"
                >
                    <div className="w-8 h-[1px] bg-[#1A1A1A] group-hover:w-12 transition-all duration-300"></div>
                    <span className="text-[11px] font-semibold tracking-[0.1em] uppercase text-[#757575] group-hover:text-[#1A1A1A] transition-colors">
                        Back to Dashboard
                    </span>
                </button>
                <span className="text-[#1A1A1A] text-[12px] font-medium tracking-[0.02em] uppercase leading-none">Seller Details</span>
            </nav>

            <main className="pt-16 px-8 xl:px-[40px] max-w-[1440px] mx-auto space-y-[80px]">
                
                {/* ══ TOP SECTION: PRODUCT OVERVIEW GALLERY ══ */}
                <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    <div className="lg:col-span-6 flex gap-4 h-[600px]">
                        {/* Left side thumbnails */}
                        <div className="w-20 shrink-0 flex flex-col gap-2 overflow-y-auto no-scrollbar pb-4 pr-1">
                            {product.images?.map((img, idx) => (
                                <button 
                                    key={idx} 
                                    onClick={() => setCurrentImgIdx(idx)}
                                    className={`w-full aspect-[3/4] rounded-md overflow-hidden border-2 transition-all ${idx === currentImgIdx ? 'border-[#1A1A1A]' : 'border-transparent hover:border-[#E5E5E5]'}`}
                                >
                                    <img src={img.url || img} className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                        
                        {/* Main Image with Prev/Next buttons */}
                        <div className="flex-1  rounded-lg  relative overflow-hidden group flex items-center justify-center">
                            {product.images && product.images.length > 0 ? (
                                <>
                                    <img 
                                        src={product.images[currentImgIdx]?.url || product.images[currentImgIdx]} 
                                        alt={product.title}
                                        className="w-full h-full object-contain mix-blend-multiply"
                                    />
                                    
                                    <button 
                                        onClick={() => setCurrentImgIdx(p => (p - 1 + product.images.length) % product.images.length)}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white backdrop-blur-sm shadow-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity border border-[#E5E5E5]"
                                    >
                                        &lt;
                                    </button>
                                    <button 
                                        onClick={() => setCurrentImgIdx(p => (p + 1) % product.images.length)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white backdrop-blur-sm shadow-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity border border-[#E5E5E5]"
                                    >
                                        &gt;
                                    </button>
                                </>
                            ) : (
                                <span className="text-[14px] text-[#757575] uppercase tracking-widest font-medium">No Image</span>
                            )}
                        </div>
                    </div>
                    
                    <div className="lg:col-span-6 flex flex-col justify-center h-full py-12">
                        <span className="text-[11px] tracking-[0.1em] font-semibold text-[#757575] uppercase mb-4">Master Product</span>
                        <h1 className="text-[32px] font-bold tracking-[-0.02em] leading-[1.2] mb-4 text-[#1A1A1A]">
                            {product.title}
                        </h1>
                        <p className="text-[24px] font-semibold text-[#1A1A1A] tracking-[-0.01em] mb-8">
                            {priceFormatted}
                        </p>
                        <p className="text-[#757575] text-[16px] leading-[1.6]">
                            {product.description}
                        </p>
                    </div>
                </section>

                {/* ══ MIDDLE SECTION: CREATE VARIANT FORM ══ */}
                <section className="bg-white border border-[#E5E5E5] rounded-lg p-8 lg:p-[48px] shadow-[0_10px_30px_rgba(0,0,0,0.02)]">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-[40px]">
                        <div>
                            <h2 className="text-[24px] font-semibold tracking-[-0.01em] text-[#1A1A1A] mb-1">Create New Variant</h2>
                            <p className="text-[14px] text-[#757575]">Add a new variation like size or color for this product.</p>
                        </div>
                        <button 
                            onClick={() => setShowVariantForm(!showVariantForm)}
                            className="bg-[#1A1A1A] text-white px-6 h-[40px] text-[13px] font-medium hover:bg-black transition-colors rounded-md shrink-0 flex items-center gap-2"
                        >
                            {showVariantForm ? (
                                <><span>✕</span> Close Form</>
                            ) : (
                                <><span>+</span> Add Variant</>
                            )}
                        </button>
                    </div>

                    {showVariantForm && (
                        <div className="animate-in fade-in slide-in-from-top-4 duration-300">
                            <div className="bg-[#F9F9F9] p-4 rounded-md border border-[#E5E5E5] mb-8">
                                <p className="text-[13px] text-[#757575] leading-[1.6]">
                                    <strong>Note:</strong> Sellers can create attributes dynamically (like Color, Size, Storage, Voltage). Images and price are optional, but <strong>at least one attribute is required</strong>. You can upload up to <strong>7 images</strong> per variant.
                                </p>
                            </div>
                            {formError && <p className="text-[13px] text-[#ba1a1a] mb-4 font-medium">{formError}</p>}

                            <form onSubmit={handleCreateVariant} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[24px] items-end">
                        {/* Dynamic Attributes */}
                        <div className="lg:col-span-2 flex flex-col gap-3 bg-[#F9F9F9] p-4 rounded-md border border-[#E5E5E5]">
                            <div className="flex items-center justify-between mb-1">
                                <label className="text-[12px] font-medium text-[#1A1A1A] tracking-[0.02em]">Variant Attributes</label>
                                <button type="button" onClick={addAttribute} className="text-[11px] font-medium text-[#1A1A1A] bg-white border border-[#E5E5E5] px-2 py-1 rounded hover:border-[#1A1A1A] transition-colors">
                                    + Add Attribute
                                </button>
                            </div>
                            
                            {variantForm.attributes.map((attr, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <input 
                                        type="text"
                                        placeholder="Name (e.g. Size)"
                                        value={attr.name}
                                        onChange={(e) => handleAttributeChange(index, 'name', e.target.value)}
                                        className="w-[100px] bg-white border border-[#E5E5E5] px-3 py-2 text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A] transition-colors rounded-md text-[13px]"
                                    />
                                    <input 
                                        type="text"
                                        placeholder="Value (e.g. XL)"
                                        value={attr.value}
                                        onChange={(e) => handleAttributeChange(index, 'value', e.target.value)}
                                        className="flex-1 bg-white border border-[#E5E5E5] px-3 py-2 text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A] transition-colors rounded-md text-[13px]"
                                    />
                                    {variantForm.attributes.length > 1 && (
                                        <button 
                                            type="button" 
                                            onClick={() => removeAttribute(index)}
                                            className="w-8 h-8 flex shrink-0 items-center justify-center text-[#ba1a1a] hover:bg-[#ba1a1a]/10 rounded-md transition-colors"
                                            title="Remove"
                                        >
                                            ✕
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-[12px] font-medium text-[#757575] tracking-[0.02em]">Price (Optional)</label>
                            <input 
                                type="number"
                                name="price"
                                value={variantForm.price}
                                onChange={handleVariantChange}
                                placeholder="400"
                                className="bg-white border border-[#E5E5E5] px-4 py-3 text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A] transition-colors rounded-md placeholder:text-[#E5E5E5]"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-[12px] font-medium text-[#757575] tracking-[0.02em]">Stock</label>
                            <input 
                                type="number"
                                name="stock"
                                value={variantForm.stock}
                                onChange={handleVariantChange}
                                placeholder="50"
                                className="bg-white border border-[#E5E5E5] px-4 py-3 text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A] transition-colors rounded-md placeholder:text-[#E5E5E5]"
                                required
                            />
                        </div>

                        {/* File Drag and Drop */}
                        <div className="lg:col-span-4 mt-2">
                            <label className="text-[12px] font-medium text-[#757575] tracking-[0.02em] mb-2 block">Upload Variant Images (Max 7, Optional)</label>
                            <div 
                                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                                onDragLeave={() => setIsDragging(false)}
                                onDrop={handleDrop}
                                className={`relative w-full border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center transition-colors group ${isDragging ? 'border-[#1A1A1A] bg-[#F9F9F9]' : 'border-[#E5E5E5] bg-white hover:bg-[#F9F9F9]'}`}
                            >
                                <input 
                                    type="file" 
                                    multiple 
                                    accept="image/*" 
                                    onChange={handleImageSelect}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                                />
                                <CameraIcon />
                                <p className="text-[14px] font-medium text-[#1A1A1A] mb-1">Drag & Drop images here</p>
                                <p className="text-[12px] text-[#757575]">or click to browse files</p>
                            </div>

                            {/* Dynamic Previews */}
                            {previewUrls.length > 0 && (
                                <div className="flex gap-4 mt-4 overflow-x-auto pb-2">
                                    {previewUrls.map((url, i) => (
                                        <div key={i} className="w-16 h-16 shrink-0 rounded-md border border-[#E5E5E5] overflow-hidden">
                                            <img src={url} alt="Preview" className="w-full h-full object-cover" />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="lg:col-span-4 mt-4">
                            <button 
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full md:w-auto bg-[#1A1A1A] text-white px-8 h-[48px] text-[14px] font-medium hover:bg-black transition-colors rounded-md disabled:opacity-50"
                            >
                                {isSubmitting ? 'Saving...' : 'Save Variant'}
                            </button>
                        </div>
                    </form>
                    </div>
                    )}
                </section>

                {/* ══ BOTTOM SECTION: MANAGE VARIANTS ══ */}
                <section>
                    <div className="mb-[40px] flex items-center justify-between border-b border-[#E5E5E5] pb-[24px]">
                        <h2 className="text-[24px] font-semibold tracking-[-0.01em] text-[#1A1A1A]">Manage Variants</h2>
                        <span className="text-[11px] font-semibold text-[#757575] tracking-[0.1em] uppercase bg-[#E5E5E5]/30 px-3 py-1 rounded-md">
                            {variants.length} Variants
                        </span>
                    </div>

                    {variants && variants.length > 0 ? (
                        <div className="flex flex-col lg:flex-row gap-[48px]">
                            {/* Left: Variant Selection (Old Design Pattern) */}
                            <div className="lg:w-1/2">
                                <h3 className="text-[12px] font-medium text-[#757575] tracking-[0.02em] mb-4">Available Variants</h3>
                                <div className="flex flex-wrap gap-3 mb-10">
                                    {variants.map((v, i) => {
                                        const vSize = v.attributes?.Size || v.attributes?.size || v.size || v.Size;
                                        const vColor = v.attributes?.Color || v.attributes?.color || v.color || v.Color;
                                        const vPrice = Number(v.price?.amount || v.price || 0);

                                        return (
                                            <div 
                                                key={v._id || i} 
                                                className={`bg-white transition-all cursor-pointer flex flex-col w-[100px] shrink-0 rounded-md overflow-hidden ${activeVariant?._id === v._id ? 'border-2 border-[#1A1A1A]' : 'border border-[#E5E5E5] hover:border-[#757575]'}`}
                                                onClick={() => {
                                                    setActiveVariant(v);
                                                    setCurrentImgIdx(0);
                                                }}
                                            >
                                                <div className="w-full h-[95px] bg-[#F9F9F9] flex items-center justify-center overflow-hidden">
                                                    {(v.images && v.images.length > 0) || (product.images && product.images.length > 0) ? (
                                                        <img src={v.images?.length > 0 ? (v.images[0].url || v.images[0]) : (product.images[0].url || product.images[0])} alt="Variant" className="w-full h-full object-contain mix-blend-multiply" />
                                                    ) : (
                                                        <span className="text-[10px] text-[#757575] uppercase">No Img</span>
                                                    )}
                                                </div>
                                                <div className="p-2 flex flex-col items-center border-t border-[#E5E5E5] gap-1">
                                                    <div className="flex flex-wrap items-center justify-center gap-1 text-center">
                                                        {vSize && <span className="text-[11px] text-[#1A1A1A] font-medium uppercase">{vSize}</span>}
                                                        {vSize && vColor && <span className="text-[10px] text-[#E5E5E5]">|</span>}
                                                        {vColor && <span className="text-[11px] text-[#757575] font-medium capitalize">{vColor}</span>}
                                                        {!vSize && !vColor && <span className="text-[11px] text-[#1A1A1A] font-medium uppercase">V{i+1}</span>}
                                                    </div>
                                                    {vPrice > 0 && <span className="text-[11px] font-semibold text-[#1A1A1A]">{currencySymbol}{vPrice.toLocaleString()}</span>}
                                                    <div className={`w-1.5 h-1.5 rounded-full mt-1 ${Number(v.stock) > 0 ? 'bg-[#1A1A1A]' : 'bg-[#ba1a1a]'}`} title={`Stock: ${v.stock || 0}`}></div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                <h3 className="text-[12px] font-medium text-[#757575] tracking-[0.02em] mb-3">Quick Select</h3>
                                <div className="flex flex-wrap gap-2">
                                    {variants.map((v, i) => {
                                        const vSize = v.attributes?.Size || v.attributes?.size || v.size || v.Size;
                                        const vColor = v.attributes?.Color || v.attributes?.color || v.color || v.Color;
                                        const label = [vSize, vColor].filter(Boolean).join(' / ') || `Variant ${i+1}`;
                                        
                                        return (
                                            <div 
                                                key={`quick-${v._id || i}`} 
                                                className={`transition-all cursor-pointer flex items-center justify-center min-w-[50px] px-3 py-2 rounded-md ${activeVariant?._id === v._id ? 'bg-[#1A1A1A] text-white' : 'bg-white border border-[#E5E5E5] text-[#757575] hover:border-[#1A1A1A] hover:text-[#1A1A1A]'}`}
                                                onClick={() => {
                                                    setActiveVariant(v);
                                                    setCurrentImgIdx(0);
                                                }}
                                            >
                                                <span className="text-[12px] font-medium uppercase leading-none">{label}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Right: Active Variant Management (Ample Space) */}
                            <div className="lg:w-1/2">
                                {activeVariant ? (
                                    <div className="bg-white border border-[#E5E5E5] rounded-lg p-8 lg:p-[48px] h-full flex flex-col shadow-[0_10px_30px_rgba(0,0,0,0.02)]">
                                        <div className="flex items-start gap-8 mb-12">
                                            <div className="w-32 aspect-[4/5] bg-[#F9F9F9] rounded-md border border-[#E5E5E5] flex items-center justify-center p-1 shrink-0 overflow-hidden">
                                                {(activeVariant.images && activeVariant.images.length > 0) || (product.images && product.images.length > 0) ? (
                                                    <img src={activeVariant.images?.length > 0 ? (activeVariant.images[0].url || activeVariant.images[0]) : (product.images[0].url || product.images[0])} className="w-full h-full object-contain mix-blend-multiply" />
                                                ) : (
                                                    <span className="text-[10px] text-[#757575] uppercase font-medium">No Img</span>
                                                )}
                                            </div>
                                            <div>
                                                <h3 className="text-[24px] font-semibold text-[#1A1A1A] tracking-[-0.01em] mb-2">Variant Details</h3>
                                                <p className="text-[#1A1A1A] text-[18px] font-semibold mb-4">
                                                    {currencySymbol}{Number(activeVariant.price?.amount || activeVariant.price || 0).toLocaleString()}
                                                </p>
                                                <div className="flex flex-wrap gap-2">
                                                    {activeVariant.attributes && Object.entries(activeVariant.attributes).map(([key, val]) => (
                                                        <span key={key} className="bg-[#F9F9F9] px-3 py-1 text-[11px] text-[#1A1A1A] tracking-[0.02em] font-medium rounded-md">
                                                            <span className="text-[#757575] uppercase">{key}:</span> <span className="uppercase">{val}</span>
                                                        </span>
                                                    ))}
                                                    {!activeVariant.attributes && (activeVariant.size || activeVariant.Size) && (
                                                        <span className="bg-[#F9F9F9] px-3 py-1 text-[11px] text-[#1A1A1A] tracking-[0.02em] font-medium rounded-md">
                                                            <span className="text-[#757575] uppercase">Size:</span> <span className="uppercase">{activeVariant.size || activeVariant.Size}</span>
                                                        </span>
                                                    )}
                                                    {!activeVariant.attributes && (activeVariant.color || activeVariant.Color) && (
                                                        <span className="bg-[#F9F9F9] px-3 py-1 text-[11px] text-[#1A1A1A] tracking-[0.02em] font-medium rounded-md">
                                                            <span className="text-[#757575] uppercase">Color:</span> <span className="uppercase">{activeVariant.color || activeVariant.Color}</span>
                                                        </span>
                                                    )}
                                                    
                                                    <span className={`px-3 py-1 text-[11px] text-white uppercase tracking-[0.02em] font-medium rounded-md ${Number(activeVariant.stock) > 0 ? 'bg-[#1A1A1A]' : 'bg-[#ba1a1a]'}`}>
                                                        Stock: {activeVariant.stock || 0}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                ) : (
                                    <div className="border border-dashed border-[#E5E5E5] bg-[#F9F9F9] rounded-lg p-8 lg:p-[48px] h-full flex flex-col items-center justify-center text-center">
                                        <div className="w-16 h-16 bg-white border border-[#E5E5E5] rounded-full flex items-center justify-center mb-6 shadow-sm">
                                            <span className="text-[#1A1A1A] text-2xl font-light">+</span>
                                        </div>
                                        <p className="text-[14px] font-medium text-[#1A1A1A] mb-2">Select a variant</p>
                                        <p className="text-[14px] text-[#757575] max-w-xs leading-[1.6]">Click on any variant image or size from the left to view details and manage inventory levels.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="py-24 flex items-center justify-center border border-dashed border-[#E5E5E5] rounded-lg bg-[#F9F9F9]">
                            <p className="text-[14px] text-[#757575]">No variants found.</p>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
};

export default SellerViewProduct;