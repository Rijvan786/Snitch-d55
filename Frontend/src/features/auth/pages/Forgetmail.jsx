import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useToast, ToastContainer } from "../../Shared/Components/Toast";
import { useAuth } from "../hook/useAuth.js";

/* ─────────────────────────────────────────────
   Snitch — Forgot Password · Step 1
   Enter email → receive reset link
───────────────────────────────────────────── */
const Forgetmail = () => {
  const {handleForgetMail}=useAuth()
  const navigate = useNavigate();
  const { toasts, showToast, removeToast } = useToast();
  

  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      showToast("error", "Please enter a valid email address.");
      return;
    }
    setIsLoading(true);
    try {
      await handleForgetMail({ email: email.trim() });
      showToast("success", `Reset link sent to ${email.trim()}`);
      setTimeout(() => setIsSubmitted(true), 600);

    } catch (err) {
      showToast("error", err?.response?.data?.message ?? "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] font-[Inter,sans-serif] text-[#F5F5F0] flex flex-col selection:bg-[#F5C518] selection:text-black">

      {/* ── Toast ── */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      {/* ── Top Nav ── */}
      <header className="flex items-center justify-between px-6 sm:px-10 h-16 border-b border-zinc-900 shrink-0">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-full overflow-hidden border border-[#F5C518]/40 group-hover:border-[#F5C518] bg-black p-0.5 transition-all duration-300 group-hover:scale-105 shadow-md shadow-[#F5C518]/10">
            <img src="/Snitch.png" alt="Snitch Logo" className="w-full h-full object-cover rounded-full" />
          </div>
          <span className="text-[#F5C518] text-lg font-bold tracking-[0.28em] uppercase group-hover:text-white transition-colors">
            Snitch
          </span>
        </Link>
        <Link
          to="/login"
          className="flex items-center gap-2 text-[10px] font-semibold tracking-[0.2em] uppercase text-zinc-500 hover:text-white transition-colors duration-200 group"
        >
          <svg className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Back to Sign In
        </Link>
      </header>

      {/* ── Main ── */}
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-[420px]">

          {/* ───── FORM STATE ───── */}
          {!isSubmitted ? (
            <>
              {/* Brand Logo badge */}
              <div className="flex justify-center mb-8">
                <div className="relative group">
                  <div className="w-16 h-16 rounded-full bg-black border-2 border-[#F5C518]/40 group-hover:border-[#F5C518] flex items-center justify-center shadow-xl shadow-[#F5C518]/15 overflow-hidden transition-all duration-300 group-hover:scale-105 p-0.5">
                    <img src="/Snitch.png" alt="Snitch Logo" className="w-full h-full object-cover rounded-full" />
                  </div>
                  <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#111] border border-[#F5C518]/40 flex items-center justify-center text-[#F5C518]">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </span>
                </div>
              </div>

              {/* Heading */}
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-white tracking-tight mb-2.5">
                  Forgot your password?
                </h1>
                <p className="text-sm text-zinc-500 leading-relaxed max-w-[300px] mx-auto">
                  Enter the email linked to your Snitch account and we'll send you a secure reset link.
                </p>
              </div>

              {/* Form Card */}
              <div className="bg-[#111] border border-zinc-900 rounded-2xl p-7 shadow-2xl shadow-black/50">
                <form onSubmit={handleSubmit} noValidate className="space-y-5">

                  {/* Email input */}
                  <div className="space-y-1.5">
                    <label htmlFor="reset-email" className="block text-[10px] font-semibold text-zinc-500 uppercase tracking-[0.22em]">
                      Email Address
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none">
                        <svg className="w-4 h-4 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                        </svg>
                      </span>
                      <input
                        id="reset-email"
                        type="email"
                        required
                        autoFocus
                        autoComplete="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-[#1A1A1A] border border-zinc-800 rounded-lg pl-10 pr-4 py-3 text-sm text-white placeholder-zinc-600
                          focus:outline-none focus:border-[#F5C518]/70 focus:ring-1 focus:ring-[#F5C518]/20
                          hover:border-zinc-700 transition-all duration-200"
                      />
                    </div>
                  </div>

                  {/* CTA */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#F5C518] hover:bg-[#e0b315] active:scale-[0.98]
                               disabled:opacity-60 disabled:cursor-not-allowed
                               text-black font-bold text-[11px] rounded-lg py-3.5
                               tracking-widest uppercase transition-all duration-200
                               flex items-center justify-center gap-2.5"
                  >
                    {isLoading ? (
                      <>
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Sending Link…
                      </>
                    ) : (
                      <>
                        Send Reset Link
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                        </svg>
                      </>
                    )}
                  </button>
                </form>

                {/* Card footer */}
                <div className="mt-6 pt-5 border-t border-zinc-900 text-center">
                  <p className="text-xs text-zinc-600">
                    Remembered your password?{" "}
                    <Link to="/login" className="text-[#F5C518] font-semibold hover:underline transition-colors">
                      Sign in
                    </Link>
                  </p>
                </div>
              </div>

              {/* Security badge */}
              <div className="flex items-center justify-center gap-2 mt-6 text-zinc-700">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
                <span className="text-[10px] tracking-[0.15em] uppercase">Secured · End-to-end encrypted</span>
              </div>
            </>
          ) : (
            /* ───── SUCCESS STATE ───── */
            <div className="text-center">
              {/* Animated success ring */}
              <div className="flex justify-center mb-8">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                    <svg className="w-9 h-9 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 9v.906a2.25 2.25 0 01-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 001.183 1.981l6.478 3.488m8.839 2.51l-4.66-2.51m0 0l-1.023-.55a2.25 2.25 0 00-2.134 0l-1.022.55m0 0l-4.661 2.51m16.5 1.615a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V8.844a2.25 2.25 0 011.183-1.98l7.5-4.04a2.25 2.25 0 012.134 0l7.5 4.04a2.25 2.25 0 011.183 1.98V19.5z" />
                    </svg>
                  </div>
                  <span className="absolute inset-0 rounded-full border border-emerald-500/20 animate-ping" />
                </div>
              </div>

              <h2 className="text-2xl font-bold text-white mb-3 tracking-tight">Check your inbox</h2>
              <p className="text-sm text-zinc-500 leading-relaxed mb-1">We've sent a reset link to</p>
              <p className="text-sm font-bold text-[#F5C518] mb-6 break-all">{email}</p>

              <div className="bg-[#111] border border-zinc-900 rounded-xl p-5 mb-8 text-left space-y-3">
                {[
                  { icon: "⏱", text: "Link expires in 15 minutes" },
                  { icon: "📁", text: "Check your spam / junk folder" },
                  { icon: "📧", text: "Only one active link at a time" },
                ].map(({ icon, text }) => (
                  <div key={text} className="flex items-center gap-3 text-xs text-zinc-500">
                    <span className="text-base">{icon}</span>
                    {text}
                  </div>
                ))}
              </div>

              <button
                onClick={() => navigate("/resend-verify-mail", { state: { email } })}
                className="w-full text-[11px] uppercase tracking-[0.2em] font-semibold text-zinc-400
                           border border-zinc-800 hover:border-zinc-600 hover:text-white hover:bg-zinc-900
                           px-5 py-3 rounded-lg transition-all duration-200 mb-4"
              >
                Didn't receive it? Resend
              </button>

              <Link to="/login" className="text-xs text-zinc-600 hover:text-[#F5C518] transition-colors duration-200">
                ← Back to Sign In
              </Link>
            </div>
          )}
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="shrink-0 py-5 border-t border-zinc-900 text-center">
        <p className="text-[9px] text-zinc-800 tracking-[0.2em] uppercase">
          © 2026 Snitch · Fashion · Style · Culture
        </p>
      </footer>
    </div>
  );
};

export default Forgetmail;
