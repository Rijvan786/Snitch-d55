import React, { useState, useRef, useCallback } from "react";
import { useProduct } from "../hook/useProduct.js";
import { CreateProductSkeleton } from "../../../App/Skeleton.jsx"; 

/* ─────────────────────────────────────────────────────────────────────────
   Stitch design reference: Editorial Minimalist — Inter, neutral palette,
   aggressive white-space, 1px #E5E5E5 borders, dark-charcoal (#1A1A1A) CTA
   ───────────────────────────────────────────────────────────────────────── */

const NAV_LINKS = [
  { label: "Collections", icon: CollectionsIcon },
  { label: "Inventory",   icon: InventoryIcon   },
  { label: "Orders",      icon: OrdersIcon      },
  { label: "Analytics",   icon: AnalyticsIcon   },
];

const CURRENCIES = ["INR", "USD", "EUR", "GBP"];
const MAX_IMAGES = 7;

/* ── icon components (inline SVGs) ── */
function CollectionsIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zm0 9.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zm9.75-9.75A2.25 2.25 0 0115.75 3.75H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zm0 9.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
    </svg>
  );
}
function InventoryIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
    </svg>
  );
}
function OrdersIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" />
    </svg>
  );
}
function AnalyticsIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zm6.75-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v10.125c0 .621-.504 1.125-1.125 1.125h-2.25A1.125 1.125 0 019.75 19.875V9.75zm6.75-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v15c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125v-15z" />
    </svg>
  );
}
function UploadIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#C4C7C7]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.3}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   Sidebar
   ───────────────────────────────────────────────────────────────────────── */
function Sidebar({ activeNav, setActiveNav }) {
  return (
    <aside className="hidden lg:flex flex-col w-56 min-h-screen bg-white border-r border-[#E5E5E5] px-6 py-8 shrink-0">
      {/* Logo */}
      <div className="mb-10">
        <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#1A1A1A]">
          SNITCH
        </span>
        <p className="text-[10px] tracking-widest text-[#A3A3A3] uppercase mt-0.5">
          Seller Studio
        </p>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-1 flex-1">
        {NAV_LINKS.map(({ label, icon: Icon }) => (
          <button
            key={label}
            onClick={() => setActiveNav(label)}
            className={`flex items-center gap-3 px-3 py-3 rounded-md text-sm transition-colors text-left ${
              activeNav === label
                ? "font-semibold text-[#1A1A1A]"
                : "text-[#757575] hover:text-[#1A1A1A]"
            }`}
          >
            <Icon />
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
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   Field wrapper
   ───────────────────────────────────────────────────────────────────────── */
function Field({ label, hint, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <label className="text-xs font-medium tracking-wide text-[#444748] uppercase">
          {label}
        </label>
        {hint && <span className="text-[11px] text-[#A3A3A3]">{hint}</span>}
      </div>
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   Shared input class
   ───────────────────────────────────────────────────────────────────────── */
const inputCls =
  "w-full rounded-md border border-[#E5E5E5] bg-white px-4 py-3 text-sm text-[#1A1A1A] placeholder-[#C4C7C7] outline-none transition-colors focus:border-[#1A1A1A]";

/* ─────────────────────────────────────────────────────────────────────────
   Main Component
   ───────────────────────────────────────────────────────────────────────── */
export const 
CreateProduct = () => {
  const { handleCreateProduct } = useProduct();

  /* ── consolidated form state ── */
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priceAmount: "",
    priceCurrency: "INR",
  });
    const [images, setImages]       = useState([]);
  const [dragging, setDragging]   = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [activeNav, setActiveNav] = useState("Inventory");

  /* ── handleChange — works for any text/select input ── */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /* ── separate state for non-text fields ── */


  const fileInputRef = useRef(null);

  /* ── image helpers ── */
  const addFiles =  (files) => {
      const slots = MAX_IMAGES - images.length;
      if (slots <= 0) return;
      const incoming = Array.from(files).slice(0, slots);
      const mapped = incoming.map(file => ({
        file,
        preview: URL.createObjectURL(file),
      }));
      setImages((prev) => [...prev, ...mapped]);
    }

  const handleFilechange=(e)=>{
    addFiles(e.target.files)
    e.target.value=''
  }

  const removeImage = (i) => {
    setImages((prev) => {
      const copy = [...prev];
      URL.revokeObjectURL(copy[i].preview);
      copy.splice(i, 1);
      return copy;
    });
  };

  const clearAll = () => {
    images.forEach(({ preview }) => URL.revokeObjectURL(preview));
    setFormData({ title: "", description: "", priceAmount: "", priceCurrency: "INR" });
    setImages([]);
  };

  /* ── drag events ── */
  const onDragOver  = (e) => { e.preventDefault(); setDragging(true);  };
  const onDragLeave = ()  => setDragging(false);
  const onDrop      = (e) => { e.preventDefault(); setDragging(false); addFiles(e.dataTransfer.files); };

  /* ── submit ── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try { const formdata = new FormData();
            formdata.append("title", formData.title);
            formdata.append("description",  formData.description);
             formdata.append("priceAmount", formData.priceAmount);
             formdata.append("priceCurrency", formData.priceCurrency);
             images.forEach( img  =>formdata.append("images", img.file))
      setSubmitting(true);
      await handleCreateProduct(formdata);
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <CreateProductSkeleton>
      <div className="flex min-h-screen bg-[#F9F9F9] font-[Inter,sans-serif]">
      <Sidebar activeNav={activeNav} setActiveNav={setActiveNav} />

      {/* ── Main Content ── */}
      <main className="flex-1 px-6 py-12 lg:px-16 xl:px-24 overflow-y-auto">
        <div className="mx-auto w-full max-w-[680px]">

          {/* ── Page Header ── */}
          <div className="mb-14">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#A3A3A3] mb-2">
              Seller Dashboard
            </p>
            <h1 className="text-[32px] font-bold tracking-tight text-[#1A1A1A] leading-none">
              New Product
            </h1>
            <p className="mt-2 text-sm text-[#757575] leading-relaxed">
              Fill in the details below to publish your listing.
            </p>
          </div>

          {/* ── Form ── */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-10">

            {/* Title */}
            <Field label="Title">
              <input
                id="title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Classic White Tee"
                required
                className={inputCls}
              />
            </Field>

            {/* Description */}
            <Field label="Description">
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your product — material, fit, sizing…"
                rows={4}
                required
                className={`${inputCls} resize-none`}
              />
            </Field>

            {/* Price Row */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium tracking-wide text-[#444748] uppercase">
                Price
              </label>
              <div className="flex gap-3">
                {/* Amount */}
                <div className="relative flex-1">
                  <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-sm text-[#A3A3A3] select-none">
                    {formData.priceCurrency === "INR" ? "₹" : formData.priceCurrency === "USD" ? "$" : formData.priceCurrency === "EUR" ? "€" : "£"}
                  </span>
                  <input
                    id="priceAmount"
                    name="priceAmount"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.priceAmount}
                    onChange={handleChange}
                    placeholder="0.00"
                    required
                    className={`${inputCls} pl-8`}
                  />
                </div>

                {/* Currency */}
                <div className="w-32">
                  <select
                    id="priceCurrency"
                    name="priceCurrency"
                    value={formData.priceCurrency}
                    onChange={handleChange}
                    className={`${inputCls} cursor-pointer appearance-none bg-[url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2024%2024%22%20stroke%3D%22%23A3A3A3%22%20stroke-width%3D%221.5%22%3E%3Cpath%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20d%3D%22M19.5%208.25l-7.5%207.5-7.5-7.5%22%2F%3E%3C%2Fsvg%3E")] bg-[length:16px] bg-[right_12px_center] bg-no-repeat pr-9`}
                  >
                    {CURRENCIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Images */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium tracking-wide text-[#444748] uppercase">
                  Images
                </label>
                <span className="text-[11px] text-[#A3A3A3]">
                  {images.length} / {MAX_IMAGES}
                </span>
              </div>

              {/* Drop zone */}
              {images.length < MAX_IMAGES && (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={onDragOver}
                  onDragLeave={onDragLeave}
                  onDrop={onDrop}
                  className={`w-full rounded-md border-2 border-dashed py-12 px-6 text-center transition-colors ${
                    dragging
                      ? "border-[#1A1A1A] bg-[#F3F3F3]"
                      : "border-[#E5E5E5] bg-white hover:border-[#C4C7C7] hover:bg-[#FAFAFA]"
                  }`}
                >
                  <div className="flex flex-col items-center gap-2 pointer-events-none">
                    <UploadIcon />
                    <p className="text-sm text-[#444748] mt-1">
                      <span className="font-medium text-[#1A1A1A]">Click to upload</span>{" "}
                      or drag &amp; drop
                    </p>
                    <p className="text-[11px] text-[#A3A3A3]">
                      PNG, JPG, WEBP — up to {MAX_IMAGES} images
                    </p>
                  </div>
                </button>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
               onChange={handleFilechange}
                 className="hidden"
              />

              {/* Preview grid */}
              {images.length > 0 && (
                <div className="grid grid-cols-4 gap-3 mt-1">
                  {images.map((img, i) => (
                    <div key={i} className="group relative aspect-square">
                      <img
                        src={img.preview}
                        alt={`upload-${i}`}
                        className="h-full w-full rounded-md object-cover border border-[#E5E5E5]"
                      />
                      {/* Cover badge */}
                      {i === 0 && (
                        <span className="absolute bottom-1.5 left-1.5 rounded-sm bg-white/85 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-[#1A1A1A] backdrop-blur-sm">
                          Cover
                        </span>
                      )}
                      {/* Remove btn */}
                      <button
                        type="button"
                        onClick={() => removeImage(i)}
                        className="absolute top-1.5 right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-white shadow-sm opacity-0 group-hover:opacity-100 transition-opacity text-[#757575] hover:text-[#ba1a1a]"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  ))}

                  {/* Add-more tile */}
                  {images.length < MAX_IMAGES && (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="aspect-square rounded-md border border-dashed border-[#E5E5E5] bg-white flex items-center justify-center text-[#C4C7C7] hover:border-[#1A1A1A] hover:text-[#1A1A1A] transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="border-t border-[#E5E5E5]" />

            {/* Actions */}
            <div className="flex items-center justify-between gap-4 pb-4">
              <button
                type="button"
                onClick={clearAll}
                className="text-sm text-[#757575] hover:text-[#1A1A1A] transition-colors"
              >
                Clear form
              </button>

              <button
                type="submit"
                disabled={submitting}
                className="h-12 rounded-md bg-[#1A1A1A] px-8 text-sm font-medium tracking-wide text-white transition-colors hover:bg-[#333333] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? "Publishing…" : "PUBLISH PRODUCT"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
    </CreateProductSkeleton>
  );
};
