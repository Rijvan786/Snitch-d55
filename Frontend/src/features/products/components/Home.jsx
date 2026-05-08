import  { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { useProduct } from '../hook/useProduct.js'

/* ── currency helper ─────────────────────────────────────── */
const sym = (c) => ({ INR: '₹', USD: '$', EUR: '€', GBP: '£' }[c] ?? c)

/* ── icons ───────────────────────────────────────────────── */
const SearchIcon = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
  </svg>
)
const CartIcon = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
  </svg>
)

/* ── Product Card ─────────────────────────────────────────── */
function ProductCard({ product }) {
  const navigate = useNavigate()
  const [hovered, setHovered] = useState(false)
  
  const cover = product.images?.[0]?.url
  const price = `${sym(product.price?.currency)}${product.price?.amount?.toLocaleString()}`



  return (
    <article
      className="group relative cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => navigate(`/ViewProduct/${product._id}`)}
    >
      {/* Image */}
      <div className="relative w-full overflow-hidden bg-[#1A1A1A]" style={{ aspectRatio: '3/4' }}>
        {cover ? (
          <img
            src={cover}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-[#444] text-xs tracking-widest uppercase">No Image</span>
          </div>
        )}
        {/* Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {/* Add to Bag */}
        <div className={`absolute bottom-0 left-0 right-0 flex items-center justify-center py-4 transition-all duration-300 ${hovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          <button
            onClick={e => { e.stopPropagation(); navigate(`/products/${product._id}`) }}
            className="bg-[#F5C518] text-black text-[11px] font-semibold tracking-[0.15em] uppercase px-8 py-3 hover:bg-white transition-colors duration-200"
          >
            Add to Bag
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="pt-4 pb-2">
        <p className="text-[10px] text-zinc-500 tracking-[0.2em] uppercase mb-1">
          {new Date(product.createdAt).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}
        </p>
        <h3 className="text-sm font-medium text-[#F5F5F0] leading-snug truncate">{product.title}</h3>
        <p className="mt-0.5 text-xs text-zinc-500 line-clamp-1">{product.description}</p>
        <p className="mt-2 text-sm font-semibold text-[#F5C518] tracking-tight">{price}</p>
      </div>
    </article>
  )
}

/* ── Empty State ─────────────────────────────────────────── */
function EmptyProducts() {
  return (
    <div className="flex flex-col items-center justify-center py-32 gap-4">
      <p className="text-[10px] text-zinc-600 tracking-[0.3em] uppercase">Coming Soon</p>
      <p className="text-2xl font-bold text-[#F5F5F0] tracking-tight">New drops loading…</p>
    </div>
  )
}

/* ── Home Page ───────────────────────────────────────────── */
const Home = () => {
  const { handleGETallProduct} = useProduct()
  const allProduct = useSelector(state => state.product.allProduct)
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const loading=useSelector(state=>state.auth.Loading)
  console.log(loading);
  useEffect(() => { handleGETallProduct() }, [])
 

  const products = allProduct ?? []
  const featured = products.slice(0, 4)

  return (
    <div className="min-h-screen bg-[#0D0D0D] font-[Inter,sans-serif] text-[#F5F5F0]">

      {/* ══ NAVBAR ═══════════════════════════════════════════ */}
      <nav className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-8 xl:px-16 h-16 bg-[#0D0D0D]/90 backdrop-blur-sm border-b border-zinc-900">
        {/* Brand */}
        <div>
          <span className="text-[#F5C518] text-lg font-bold tracking-[0.3em] uppercase leading-none">SNITCH</span>
          <p className="text-[8px] text-zinc-600 tracking-[0.25em] uppercase mt-0.5">EST. 2020</p>
        </div>

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center gap-8">
          {['Home', 'Shop', 'Collections', 'About'].map(link => (
            <li key={link}>
              <a href="#" className="text-[11px] font-medium tracking-[0.15em] uppercase text-zinc-400 hover:text-[#F5F5F0] transition-colors duration-200">
                {link}
              </a>
            </li>
          ))}
        </ul>

        {/* Right actions */}
        <div className="flex items-center gap-4">
          <button className="text-zinc-400 hover:text-[#F5F5F0] transition-colors hidden sm:block"><SearchIcon /></button>
          <button className="text-zinc-400 hover:text-[#F5F5F0] transition-colors"><CartIcon /></button>
          <button
            onClick={() => navigate('/login')}
            className="hidden sm:block text-[11px] font-semibold tracking-[0.15em] uppercase px-4 py-2 border border-[#F5C518] text-[#F5C518] hover:bg-[#F5C518] hover:text-black transition-all duration-200"
          >
            Login
          </button>
          {/* Mobile hamburger */}
          <button className="md:hidden text-zinc-400 hover:text-white" onClick={() => setMenuOpen(o => !o)}>
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d={menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed top-16 inset-x-0 z-40 bg-[#111] border-b border-zinc-900 py-6 px-8 flex flex-col gap-4 md:hidden">
          {['Home', 'Shop', 'Collections', 'About'].map(link => (
            <a key={link} href="#" className="text-[11px] tracking-[0.2em] uppercase text-zinc-300 hover:text-[#F5C518] transition-colors">
              {link}
            </a>
          ))}
          <button onClick={() => navigate('/login')} className="self-start text-[11px] font-semibold tracking-[0.15em] uppercase px-4 py-2 border border-[#F5C518] text-[#F5C518]">
            Login
          </button>
        </div>
      )}

      {/* ══ HERO ═════════════════════════════════════════════ */}
      <section className="relative flex items-center justify-center min-h-screen px-8 xl:px-16 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0D0D0D] via-[#111] to-[#0D0D0D]" />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'linear-gradient(#F5C518 1px, transparent 1px), linear-gradient(90deg, #F5C518 1px, transparent 1px)', backgroundSize: '80px 80px' }}
        />

        <div className="relative z-10 max-w-5xl w-full pt-24">
          {/* Label */}
          <p className="text-[10px] text-[#F5C518] tracking-[0.4em] uppercase mb-8">
            Fashion &bull; Style &bull; Culture
          </p>

          {/* Headline */}
          <h1 className="text-6xl sm:text-7xl xl:text-[96px] font-extrabold leading-[1.0] tracking-[-0.04em] text-[#F5F5F0]">
            DRESS THE<br />
            <span className="relative inline-block">
              CULTURE
              <span className="absolute -bottom-2 left-0 right-0 h-[5px] bg-[#F5C518]" />
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-12 text-base text-zinc-400 max-w-md leading-relaxed">
            Curated fashion for the bold. Experience the intersection of tailoring
            and street aesthetic with our latest drops.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-wrap gap-4">
            <button
              onClick={() => document.getElementById('new-arrivals')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-[#F5C518] text-black text-[12px] font-bold tracking-[0.2em] uppercase px-10 py-4 hover:bg-white transition-colors duration-200"
            >
              Shop Now
            </button>
            <button
              onClick={() => document.getElementById('new-arrivals')?.scrollIntoView({ behavior: 'smooth' })}
            className="border border-zinc-700 text-[#F5F5F0] text-[12px] font-semibold tracking-[0.2em] uppercase px-10 py-4 hover:border-[#F5F5F0] transition-colors duration-200">
              View Collections
            </button>
          </div>

          {/* Stats */}
          <div className="mt-20 flex gap-12 border-t border-zinc-900 pt-10">
            {[{ v: '50K+', l: 'Styles' }, { v: '200+', l: 'Brands' }, { v: '1M+', l: 'Members' }].map(s => (
              <div key={s.l}>
                <p className="text-2xl font-bold text-[#F5F5F0] tracking-tight">{s.v}</p>
                <p className="text-[10px] text-zinc-600 tracking-[0.2em] uppercase mt-1">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ NEW ARRIVALS ═════════════════════════════════════ */}
      <section id="new-arrivals" className="px-8 xl:px-16 py-28">
        <div className="max-w-[1400px] mx-auto">

          {/* Section header */}
          <div className="flex items-end justify-between mb-16">
            <div>
              <p className="text-[10px] text-[#F5C518] tracking-[0.4em] uppercase mb-3">New Arrivals</p>
              <h2 className="text-4xl font-bold tracking-[-0.03em] text-[#F5F5F0]">Latest Drops</h2>
            </div>
            <a href="#" className="hidden sm:flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase text-zinc-400 hover:text-[#F5C518] transition-colors border-b border-zinc-800 hover:border-[#F5C518] pb-0.5">
              View All
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </a>
          </div>

          {/* Product grid */}
          {products.length === 0 ? (
            <EmptyProducts />
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
              {featured.map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}

          {/* All products (if > 4) */}
          {products.length > 4 && (
            <div className="mt-20">
              <p className="text-[10px] text-zinc-600 tracking-[0.3em] uppercase mb-10">All Products</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
                {products.map(product => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ══ EDITORIAL BAND ═══════════════════════════════════ */}
      <section className="border-t border-b border-zinc-900 px-8 xl:px-16 py-28">
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12">
          <blockquote className="text-3xl xl:text-5xl font-bold tracking-[-0.03em] text-[#F5F5F0] max-w-2xl leading-tight">
            "Style is a way to say<br className="hidden lg:block" />
            <span className="text-[#F5C518]"> who you are</span><br className="hidden lg:block" />
            without having to speak."
          </blockquote>
          <div className="shrink-0">
            <p className="text-[10px] text-zinc-600 tracking-[0.3em] uppercase mb-4">The Collection</p>
            <a href="#" className="flex items-center gap-3 text-[#F5C518] text-sm font-semibold tracking-[0.15em] uppercase border-b-2 border-[#F5C518] pb-1 hover:text-white hover:border-white transition-colors duration-200">
              Shop Collection
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </a>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ═══════════════════════════════════════════ */}
      <footer className="px-8 xl:px-16 py-12 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-[#F5C518] text-sm font-bold tracking-[0.3em] uppercase">SNITCH</span>
          <span className="text-zinc-700 text-xs ml-4 tracking-widest">© 2025</span>
        </div>
        <div className="flex items-center gap-6">
          {['Privacy', 'Terms', 'Shipping', 'Contact'].map(l => (
            <a key={l} href="#" className="text-[10px] text-zinc-600 tracking-[0.15em] uppercase hover:text-zinc-300 transition-colors">{l}</a>
          ))}
        </div>
        <div className="flex items-center gap-4">
          {/* Instagram */}
          <a href="#" className="text-zinc-600 hover:text-[#F5C518] transition-colors">
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
          </a>
          {/* Twitter/X */}
          <a href="#" className="text-zinc-600 hover:text-[#F5C518] transition-colors">
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </a>
        </div>
      </footer>

    </div>
  )
}

export default Home