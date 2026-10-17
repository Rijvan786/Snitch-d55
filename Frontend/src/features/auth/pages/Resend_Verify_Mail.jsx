import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useToast, ToastContainer } from "../../Shared/Components/Toast";
import { useAuth } from "../hook/useAuth.js";

/* ─────────────────────────────────────────────
   Snitch — Resend Email Verification
   Purpose: Resend the account verification link
   after registration (email not verified yet).
   Pre-fills email from router location.state.
───────────────────────────────────────────── */

const COOLDOWN_SEC = 60;

const Resend_Verify_Mail = () => {
  const {handleResendMail}=useAuth()
  const navigate = useNavigate();
  const location = useLocation();
  const { toasts, showToast, removeToast } = useToast();

  const prefillEmail = location.state?.email ?? "";
  const [email, setEmail] = useState(prefillEmail);
  const [isLoading, setIsLoading] = useState(false);
  const [sentCount, setSentCount] = useState(0);
  const [cooldown, setCooldown] = useState(0);

  /* ── countdown timer ── */
  useEffect(() => {
    if (cooldown <= 0) return;
    const id = setInterval(() => setCooldown((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, [cooldown]);

  const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
  const canResend = cooldown === 0 && !isLoading;
  const progress = cooldown > 0 ? ((COOLDOWN_SEC - cooldown) / COOLDOWN_SEC) * 100 : 0;

  const handleResend = async (e) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      showToast("error", "Please enter a valid email address.");
      return;
    }
    if (cooldown > 0) return;
     await  handleResendMail({email:email})
    setIsLoading(true);
    try {
      // TODO: call API → POST /auth/resend-verification { email: email.trim() }
      await new Promise((r) => setTimeout(r, 1400));
      setSentCount((n) => n + 1);
      setCooldown(COOLDOWN_SEC);
      showToast("success", `Verification link sent to ${email.trim()} 📧`);
    } catch (err) {
      showToast("error", err?.response?.data?.message ?? "Failed to send. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] font-[Inter,sans-serif] text-[#F5F5F0] flex flex-col selection:bg-[#F5C518] selection:text-black">

      {/* ── Toast ── */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      {/* ── Nav ── */}
      <header className="flex items-center justify-between px-6 sm:px-10 h-16 border-b border-zinc-900 shrink-0">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-full overflow-hidden border border-[#F5C518]/40 group-hover:border-[#F5C518] bg-black p-0.5 transition-all duration-300 group-hover:scale-105 shadow-md shadow-[#F5C518]/10">
            <img src="/Snitch.png" alt="Snitch Logo" className="w-full h-full object-cover rounded-full" />
          </div>
          <span className="text-[#F5C518] text-lg font-bold tracking-[0.28em] uppercase group-hover:text-white transition-colors">
            Snitch
          </span>
        </Link>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[10px] font-semibold tracking-[0.2em] uppercase text-zinc-500 hover:text-white transition-colors duration-200 group"
        >
          <svg className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Go Back
        </button>
      </header>

      {/* ── Main ── */}
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-[440px]">

          {/* ── Icon badge with Snitch Logo ── */}
          <div className="flex justify-center mb-8">
            <div className="relative group">
              <div
                className={`w-16 h-16 rounded-full border-2 flex items-center justify-center shadow-xl transition-all duration-300 group-hover:scale-105 overflow-hidden p-0.5 bg-black
                  ${sentCount > 0
                    ? "border-emerald-500/50 shadow-emerald-500/20"
                    : "border-[#F5C518]/40 group-hover:border-[#F5C518] shadow-[#F5C518]/15"
                  }`}
              >
                <img src="/Snitch.png" alt="Snitch Logo" className="w-full h-full object-cover rounded-full" />
              </div>

              {/* Status Indicator / Sent count badge */}
              {sentCount > 0 ? (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-emerald-500 text-black text-[10px] font-black flex items-center justify-center shadow-lg shadow-emerald-500/40">
                  {sentCount}
                </span>
              ) : (
                <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#111] border border-[#F5C518]/40 flex items-center justify-center text-[#F5C518]">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </span>
              )}
            </div>
          </div>

          {/* ── Heading ── */}
          <div className="text-center mb-8">
            <p className="text-[10px] text-zinc-600 tracking-[0.3em] uppercase mb-2">
              Account Verification
            </p>
            <h1 className="text-2xl font-bold text-white tracking-tight mb-2.5">
              Resend email verification link
            </h1>
            <p className="text-sm text-zinc-500 leading-relaxed max-w-[320px] mx-auto">
              {sentCount === 0
                ? "Didn't get the verification email? Enter your email below and we'll resend it."
                : "Another link is on its way. Check your inbox and spam folder."}
            </p>
          </div>

          {/* ── Card ── */}
          <div className="bg-[#111] border border-zinc-900 rounded-2xl overflow-hidden shadow-2xl shadow-black/50">

            {/* Cooldown top progress bar */}
            <div className="h-0.5 bg-zinc-900">
              <div
                className="h-full bg-[#F5C518]/60 transition-all duration-1000 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="p-7">
              <form onSubmit={handleResend} noValidate className="space-y-5">

                {/* Email field */}
                <div className="space-y-1.5">
                  <label htmlFor="verify-email" className="block text-[10px] font-semibold text-zinc-500 uppercase tracking-[0.22em]">
                    Your Email Address
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none">
                      <svg className="w-4 h-4 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                      </svg>
                    </span>
                    <input
                      id="verify-email"
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

                {/* CTA Button */}
                <div className="space-y-2.5">
                  <button
                    type="submit"
                    disabled={!canResend}
                    className={`w-full font-bold text-[11px] rounded-lg py-3.5 tracking-widest uppercase
                      flex items-center justify-center gap-2.5 transition-all duration-200
                      ${canResend
                        ? "bg-[#F5C518] hover:bg-[#e0b315] active:scale-[0.98] text-black"
                        : "bg-zinc-800/80 text-zinc-500 cursor-not-allowed"
                      }`}
                  >
                    {isLoading ? (
                      <>
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Sending…
                      </>
                    ) : cooldown > 0 ? (
                      <>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Resend in {cooldown}s
                      </>
                    ) : (
                      <>
                        {sentCount === 0 ? "Send Verification Link" : "Resend Verification Link"}
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                        </svg>
                      </>
                    )}
                  </button>

                  {/* Cooldown label */}
                  {cooldown > 0 && (
                    <p className="text-center text-[10px] text-zinc-600 tracking-wide">
                      You can resend in <span className="text-zinc-400 font-semibold">{cooldown} seconds</span>
                    </p>
                  )}
                </div>
              </form>

              {/* Info tiles */}
              <div className="mt-6 pt-5 border-t border-zinc-900">
                <p className="text-[10px] font-bold text-zinc-700 uppercase tracking-[0.18em] mb-3">
                  Helpful tips
                </p>
                <div className="space-y-2.5">
                  {[
                    { icon: "📁", text: "Check your spam / junk folder" },
                    { icon: "✉️", text: "Make sure you're using the registered email" },
                    { icon: "⏱", text: "Verification links expire in 24 hours" },
                    { icon: "🔑", text: "Only one active link at a time" },
                  ].map(({ icon, text }) => (
                    <div key={text} className="flex items-center gap-3 text-xs text-zinc-600">
                      <span className="text-sm w-5 text-center shrink-0">{icon}</span>
                      {text}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── Footer links ── */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <Link
              to="/login"
              className="text-xs text-zinc-600 hover:text-[#F5C518] transition-colors duration-200"
            >
              Already verified? Sign In →
            </Link>
            <span className="w-px h-3 bg-zinc-800 hidden sm:block" />
            <Link
              to="/register"
              className="text-xs text-zinc-600 hover:text-[#F5C518] transition-colors duration-200"
            >
              Use a different email
            </Link>
          </div>

          {/* Security note */}
          <div className="flex items-center justify-center gap-2 mt-5 text-zinc-800">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
            <span className="text-[9px] tracking-[0.15em] uppercase">Secured · End-to-end encrypted</span>
          </div>
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

export default Resend_Verify_Mail;