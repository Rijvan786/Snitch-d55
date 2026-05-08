import React from 'react';
import { useNavigate } from 'react-router';

const Payment = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0D0D0D] font-[Inter,sans-serif] text-[#F5F5F0] flex flex-col items-center justify-center p-8">
      <div className="max-w-md w-full bg-[#111] p-8 md:p-12 border border-zinc-900 rounded-lg text-center shadow-2xl">
        
        {/* Placeholder Icon */}
        <div className="w-16 h-16 bg-[#F5C518]/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-[#F5C518]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
        </div>

        <h1 className="text-3xl font-bold tracking-tight mb-4 text-[#F5F5F0]">Secure Checkout</h1>
        <p className="text-sm text-zinc-400 mb-8 leading-relaxed">
          Your item has been successfully added to the bag. 
          Please proceed with your payment to complete the order.
        </p>

        <button 
          onClick={() => alert("Payment logic will be implemented here!")}
          className="w-full bg-[#F5C518] text-black text-[12px] font-bold tracking-[0.2em] uppercase py-4 hover:bg-white transition-colors duration-300 mb-4"
        >
          Pay Now
        </button>

        <button 
          onClick={() => navigate(-1)}
          className="text-[10px] text-zinc-500 tracking-[0.2em] uppercase hover:text-white transition-colors"
        >
          Cancel & Return
        </button>
      </div>
    </div>
  );
};

export default Payment;
