import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { updateQuantity, removeFromCart } from '../product.slice';
import { useProduct } from '../hook/useProduct';

// Helper for currency
const sym = (c) => ({ INR: '₹', USD: '$', EUR: '€', GBP: '£' }[c] ?? c);

const Addtocart = () => {
   const { handleViewDetailProduct } = useProduct();
  const {cartId}=useParams()

  const navigate = useNavigate();
  const dispatch = useDispatch();

  
  // Checking auth state securely
  const user = useSelector((state) => state.auth?.User);

  // Real Cart Data from Redux
   const cartItems = useSelector((state) => state.product.items) || [];
   console.log(cartItems);
   const subtotal = cartItems.reduce((acc, item) => acc + (item?.price?.amount || 0) * item.quantity, 0);
   const shipping = cartItems.length > 0 ? 50 : 0; 
   const total = subtotal + shipping;

  async function fetchProduct(){
     await handleViewDetailProduct(cartId)
      
  
  }
    useEffect(() => {
    // Relying on previously fetched product or routing state for ViewProduct details
   fetchProduct()
  }, [cartId]);
  return (
    <div className="min-h-screen bg-[#0D0D0D] font-[Inter,sans-serif] text-[#F5F5F0] selection:bg-[#F5C518] selection:text-black">
      
      {/* Minimal Navbar */}
      <nav className="flex items-center justify-between px-8 xl:px-16 h-24 border-b border-zinc-900">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-4 group"
        >
          <div className="w-8 h-[1px] bg-zinc-600 group-hover:w-12 transition-all duration-300 group-hover:bg-white"></div>
          <span className="text-[10px] font-medium tracking-[0.3em] uppercase text-zinc-400 group-hover:text-white transition-colors">
            Continue Shopping
          </span>
        </button>
        <span className="text-[#F5C518] text-sm font-bold tracking-[0.3em] uppercase leading-none">SNITCH</span>
      </nav>

      <main className="max-w-[1400px] mx-auto px-8 xl:px-16 py-12 lg:py-24">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-[-0.04em] uppercase mb-16 text-white">
          Your Bag
        </h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-32 border border-zinc-900 border-dashed">
            <p className="text-[11px] text-zinc-500 tracking-[0.3em] uppercase mb-6">Your bag is empty</p>
            <button 
               onClick={() => navigate('/')}
               className="bg-white text-black px-8 py-4 text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-[#F5C518] transition-colors">
               Explore Collection
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Cart Items List */}
            <div className="lg:col-span-8 space-y-8">
              <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-zinc-900 text-[10px] tracking-[0.2em] uppercase text-zinc-600 font-semibold">
                <div className="col-span-6">Product</div>
                <div className="col-span-3 text-center">Quantity</div>
                <div className="col-span-3 text-right">Total</div>
              </div>
              
              {cartItems.map((item) => (
                <div key={item._id} className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center py-6 border-b border-zinc-900/50 group">
                  {/* Product Details */}
                  <div className="md:col-span-6 flex gap-6">
                    <div className="w-24 h-32 md:w-32 md:h-40 bg-[#111] shrink-0 overflow-hidden relative">
                      <img src={item.images?.[0]?.url || 'https://via.placeholder.com/300x400?text=No+Image'} alt={item.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
                    </div>
                    <div className="flex flex-col justify-center">
                      <h3 className="text-xl font-bold tracking-tight uppercase mb-2 text-white">{item.title}</h3>
                      <p className="text-xs text-zinc-500 font-light mb-4">{item.description}</p>
                      <p className="text-sm font-medium text-zinc-300">{sym(item?.price?.currency)}{item?.price?.amount}</p>
                      <button 
                        onClick={() => dispatch(removeFromCart(item._id))}
                        className="text-[10px] text-zinc-500 hover:text-red-500 uppercase tracking-[0.2em] mt-auto w-fit transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  {/* Quantity Actions */}
                  <div className="md:col-span-3 flex justify-start md:justify-center items-center">
                    <div className="flex items-center border border-zinc-800">
                      <button 
                        onClick={() => dispatch(updateQuantity({ id: item._id, quantity: item.quantity - 1 }))}
                        className="px-4 py-2 text-zinc-500 hover:text-white transition-colors"
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                      <button 
                        onClick={() => dispatch(updateQuantity({ id: item._id, quantity: item.quantity + 1 }))}
                        className="px-4 py-2 text-zinc-500 hover:text-white transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Item Total */}
                  <div className="md:col-span-3 flex justify-between md:justify-end items-center">
                    <span className="md:hidden text-[10px] tracking-[0.2em] uppercase text-zinc-600">Total:</span>
                    <span className="text-lg font-semibold text-white tracking-tight">
                      {sym(item?.price?.currency)}{(item?.price?.amount || 0) * item.quantity}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-4">
              <div className="bg-[#111] p-8 md:p-12 border border-zinc-900 sticky top-12">
                <h2 className="text-[12px] font-bold tracking-[0.3em] uppercase text-white mb-8 border-b border-zinc-800 pb-4">Order Summary</h2>
                
                <div className="space-y-4 mb-8 text-sm">
                  <div className="flex justify-between text-zinc-400">
                    <span>Subtotal</span>
                    <span className="text-white font-medium">₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>Shipping</span>
                    <span className="text-white font-medium">₹{shipping}</span>
                  </div>
                </div>
                
                <div className="border-t border-zinc-800 pt-6 mb-10 flex justify-between items-end">
                  <span className="text-xs tracking-[0.2em] uppercase text-zinc-500">Total</span>
                  <span className="text-3xl font-bold tracking-tight text-[#F5C518]">₹{total}</span>
                </div>

                <button 
                  onClick={() => {
                    if (!user) {
                      navigate('/register');
                    } else {
                      navigate('/payment');
                    }
                  }}
                  className="w-full bg-white text-black py-5 text-[12px] font-bold tracking-[0.2em] uppercase hover:bg-[#F5C518] transition-colors duration-300"
                >
                  Buy Now
                </button>

                <div className="mt-6 flex items-center justify-center gap-2 text-zinc-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span className="text-[10px] tracking-[0.2em] uppercase">Secure Checkout</span>
                </div>
              </div>
            </div>

          </div>
        )}
      </main>
    </div>
  );
};

export default Addtocart;