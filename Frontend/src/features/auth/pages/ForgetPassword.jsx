import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import { useToast, ToastContainer } from "../../Shared/Components/Toast";
import { useAuth } from "../hook/useAuth.js";


/* ─────────────────────────────────────────────
   Snitch — Forget Password · Step 2
   User sets a new password using the token
   from the reset-link email.
   URL: /forget-password?token=<jwt>
───────────────────────────────────────────── */

const PasswordStrength = ({ password }) => {
 
  const checks = [
    { label: "8+ characters", pass: password.length >= 8 },
    { label: "Uppercase", pass: /[A-Z]/.test(password) },
    { label: "Number", pass: /\d/.test(password) },
    { label: "Special char", pass: /[^A-Za-z0-9]/.test(password) },
  ];

  const score = checks.filter((c) => c.pass).length;
  const colors = ["bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-emerald-500"];
  const labels = ["Weak", "Fair", "Good", "Strong"];

  if (!password) return null;
  return (
    <div className="space-y-2 pt-1">
      {/* Bar */}
      <div className="flex gap-1">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={`h-0.5 flex-1 rounded-full transition-all duration-300 ${
              i < score ? colors[score - 1] : "bg-zinc-800"
            }`}
          />
        ))}
      </div>
      {/* Label + checks */}
      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-x-3 gap-y-1">
          {checks.map(({ label, pass }) => (
            <span
              key={label}
              className={`text-[10px] flex items-center gap-1 transition-colors duration-200 ${
                pass ? "text-emerald-400" : "text-zinc-700"
              }`}
            >
              <span>{pass ? "✓" : "·"}</span>
              {label}
            </span>
          ))}
        </div>
        {score > 0 && (
          <span className={`text-[10px] font-semibold tracking-wider ${colors[score - 1].replace("bg-", "text-")}`}>
            {labels[score - 1]}
          </span>
        )}
      </div>
    </div>
  );
};

const EyeIcon = ({ visible }) =>
  visible ? (
    <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
    </svg>
  ) : (
    <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );

const ForgetPassword = () => {
    const {handleForgetPassword} =useAuth()

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const { toasts, showToast, removeToast } = useToast();

  const [formData, setFormData] = useState({ password: "", confirm: "" });
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const handleChange = (e) => {
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }))
    };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password.length < 8) {
      showToast("error", "Password must be at least 8 characters.");
      return;
    }
    if (formData.password !== formData.confirm) {
      showToast("error", "Passwords do not match.");
      return;
    }
    if (!token) {
      showToast("error", "Invalid or expired reset link. Please request a new one.");
      return;
    }
    setIsLoading(true);
    try {
      // TODO: call API  →  POST /auth/reset-password  { token, password }
      // await authApi.resetPassword({ token, password: formData.password });
      handleForgetPassword({NewPassword:formData.password})
      await new Promise((r) => setTimeout(r, 1600));
      showToast("success", "Password updated successfully!");
      setTimeout(() => setIsDone(true), 700);
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

      {/* ── Nav ── */}
      <header className="flex items-center justify-between px-6 sm:px-10 h-16 border-b border-zinc-900 shrink-0">
        <Link to="/" className="text-[#F5C518] text-lg font-bold tracking-[0.28em] uppercase hover:opacity-80 transition-opacity">
          Snitch
        </Link>
        <span className="text-[10px] text-zinc-700 uppercase tracking-[0.2em]">
          Password Reset
        </span>
      </header>

      {/* ── Main ── */}
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-[420px]">

          {/* ── INVALID TOKEN BANNER ── */}
          {!token && (
            <div className="mb-6 flex items-start gap-3 bg-red-500/10 border border-red-500/20 rounded-xl p-4">
              <svg className="w-5 h-5 text-red-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
              <div>
                <p className="text-sm text-red-400 font-semibold">Invalid reset link</p>
                <p className="text-xs text-red-400/70 mt-0.5">
                  This link is missing or has expired.{" "}
                  <Link to="/forgot-password" className="underline hover:text-red-300">
                    Request a new one →
                  </Link>
                </p>
              </div>
            </div>
          )}

          {/* ───── FORM STATE ───── */}
          {!isDone ? (
            <>
              {/* Icon */}
              <div className="flex justify-center mb-8">
                <div className="w-16 h-16 rounded-2xl bg-[#F5C518]/10 border border-[#F5C518]/20 flex items-center justify-center shadow-lg shadow-[#F5C518]/5">
                  <svg className="w-7 h-7 text-[#F5C518]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                </div>
              </div>

              {/* Heading */}
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-white tracking-tight mb-2.5">
                  Set new password
                </h1>
                <p className="text-sm text-zinc-500 leading-relaxed max-w-[300px] mx-auto">
                  Choose a strong password to protect your Snitch account.
                </p>
              </div>

              {/* Card */}
              <div className="bg-[#111] border border-zinc-900 rounded-2xl p-7 shadow-2xl shadow-black/50">
                <form onSubmit={handleSubmit} noValidate className="space-y-5">

                  {/* New Password */}
                  <div className="space-y-1.5">
                    <label htmlFor="new-password" className="block text-[10px] font-semibold text-zinc-500 uppercase tracking-[0.22em]">
                      New Password
                    </label>
                    <div className="relative">
                      <input
                        id="new-password"
                        name="password"
                        type={showPwd ? "text" : "password"}
                        required
                        autoFocus
                        placeholder="Min. 8 characters"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full bg-[#1A1A1A] border border-zinc-800 rounded-lg px-4 py-3 pr-12 text-sm text-white placeholder-zinc-600
                          focus:outline-none focus:border-[#F5C518]/70 focus:ring-1 focus:ring-[#F5C518]/20
                          hover:border-zinc-700 transition-all duration-200"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPwd((v) => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-[#F5C518] transition-colors duration-200"
                      >
                        <EyeIcon visible={showPwd} />
                      </button>
                    </div>
                    <PasswordStrength password={formData.password} />
                  </div>

                  {/* Confirm Password */}
                  <div className="space-y-1.5">
                    <label htmlFor="confirm-password" className="block text-[10px] font-semibold text-zinc-500 uppercase tracking-[0.22em]">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <input
                        id="confirm-password"
                        name="confirm"
                        type={showConfirm ? "text" : "password"}
                        required
                        placeholder="Repeat your password"
                        value={formData.confirm}
                        onChange={handleChange}
                        className={`w-full bg-[#1A1A1A] border rounded-lg px-4 py-3 pr-12 text-sm text-white placeholder-zinc-600
                          focus:outline-none focus:ring-1 hover:border-zinc-700 transition-all duration-200
                          ${
                            formData.confirm && formData.confirm !== formData.password
                              ? "border-red-500/50 focus:border-red-500/80 focus:ring-red-500/20"
                              : formData.confirm && formData.confirm === formData.password
                              ? "border-emerald-500/40 focus:border-emerald-500/60 focus:ring-emerald-500/20"
                              : "border-zinc-800 focus:border-[#F5C518]/70 focus:ring-[#F5C518]/20"
                          }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirm((v) => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-[#F5C518] transition-colors duration-200"
                      >
                        <EyeIcon visible={showConfirm} />
                      </button>
                      {/* Match indicator */}
                      {formData.confirm && (
                        <span className={`absolute right-10 top-1/2 -translate-y-1/2 text-xs transition-colors ${
                          formData.confirm === formData.password ? "text-emerald-400" : "text-red-400"
                        }`}>
                          {formData.confirm === formData.password ? "✓" : "✗"}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isLoading || !token}
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
                        Updating Password…
                      </>
                    ) : (
                      <>
                        Reset Password
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      </>
                    )}
                  </button>
                </form>

                <div className="mt-6 pt-5 border-t border-zinc-900 text-center">
                  <Link to="/login" className="text-xs text-zinc-600 hover:text-[#F5C518] transition-colors">
                    ← Back to Sign In
                  </Link>
                </div>
              </div>
            </>
          ) : (
            /* ───── SUCCESS STATE ───── */
            <div className="text-center">
              <div className="flex justify-center mb-8">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                    <svg className="w-9 h-9 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="absolute inset-0 rounded-full border border-emerald-500/20 animate-ping" />
                </div>
              </div>

              <h2 className="text-2xl font-bold text-white mb-3 tracking-tight">
                Password updated!
              </h2>
              <p className="text-sm text-zinc-500 leading-relaxed mb-8 max-w-xs mx-auto">
                Your Snitch account password has been successfully reset. You can now sign in with your new credentials.
              </p>

              <button
                onClick={() => navigate("/login")}
                className="w-full bg-[#F5C518] hover:bg-[#e0b315] active:scale-[0.98]
                           text-black font-bold text-[11px] rounded-lg py-3.5
                           tracking-widest uppercase transition-all duration-200
                           flex items-center justify-center gap-2.5"
              >
                Sign In Now
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>
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

export default ForgetPassword;