import React, { useState } from "react";
import { useAuth } from "../hook/useAuth.js";
import {Link, Navigate, useNavigate} from "react-router"
import ContinueWithGoogle from "../components/ContinuewithGoogle.jsx";
import { useSelector } from "react-redux";
import { AuthSkeleton } from "../../products/components/Skeleton.jsx";

/* ─────────────────────────────────────────────
   Snitch — Login Page
   Layout: Desktop split-screen (left brand panel + right form)
           Mobile stacked (brand header → form)
───────────────────────────────────────────── */
const Login = () => {
  const [formData, setFormData] = useState({
    identifier: "", // can be email OR username
    password: "",
  });
  const { handleLogin } = useAuth();
  const User=useSelector(state=>state.auth.User)
  // console.log(User);
  const [showPassword, setShowPassword] = useState(false);
  const navigate=useNavigate()
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Detect if the user entered an email or a username
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.identifier.trim());
    const payload = isEmail
      ? { email: formData.identifier.trim(), password: formData.password }
      : { fullname: formData.identifier.trim(), password: formData.password };
    console.log("Login payload:", payload);
    console.log(payload);
    await handleLogin(payload);
    navigate("/seller/create-product")
    

 };

  return (
    <AuthSkeleton>
      <div className="min-h-screen bg-[#0D0D0D] flex flex-col lg:flex-row">

      {/* ── LEFT PANEL (desktop only) ── */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-[55%] relative overflow-hidden flex-col">
        {/* Background image */}
        <img
          src="/register-panel.png"
          alt="Snitch Fashion"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />

        {/* Content over the image */}
        <div className="relative z-10 flex flex-col justify-between h-full p-10 xl:p-14">

          {/* Top: Brand mark */}
          <div>
            <span className="text-[#F5C518] text-2xl font-bold tracking-[0.25em] uppercase">
              Snitch
            </span>
          </div>

          {/* Bottom: Editorial copy */}
          <div className="space-y-4">
            <p className="text-[10px] text-zinc-400 tracking-[0.4em] uppercase">
              Fashion &bull; Style &bull; Culture
            </p>
            <h2 className="text-4xl xl:text-5xl font-bold text-white leading-tight">
              Welcome<br />
              <span className="text-[#F5C518]">back,</span><br />
              trendsetter.
            </h2>
            <p className="text-sm text-zinc-400 max-w-xs leading-relaxed">
              Your wardrobe is waiting. Sign in and keep building your
              signature look.
            </p>

            {/* Stats row */}
            <div className="flex gap-8 pt-4">
              {[
                { value: "50K+", label: "Styles" },
                { value: "200+", label: "Brands" },
                { value: "1M+", label: "Members" },
              ].map(({ value, label }) => (
                <div key={label}>
                  <p className="text-[#F5C518] text-xl font-bold">{value}</p>
                  <p className="text-zinc-500 text-xs mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL — Form ── */}
      <div className="flex-1 flex flex-col items-center justify-center px-5 py-12 sm:px-8 lg:px-12 xl:px-16 overflow-y-auto">

        {/* Mobile-only brand header */}
        <div className="lg:hidden mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-[0.25em] uppercase text-[#F5C518]">
            Snitch
          </h1>
          <p className="mt-1 text-[10px] text-zinc-600 tracking-[0.35em] uppercase">
            Fashion &bull; Style &bull; Culture
          </p>
        </div>

        {/* Form container */}
        <div className="w-full max-w-md">

          {/* Desktop heading */}
          <div className="hidden lg:block mb-8">
            <h2 className="text-2xl font-bold text-white">Welcome back</h2>
            <p className="mt-1 text-sm text-zinc-500">
              Sign in to your Snitch account.
            </p>
          </div>

          {/* Mobile heading */}
          <div className="lg:hidden mb-6">
            <h2 className="text-xl font-bold text-white">Sign in</h2>
            <p className="mt-1 text-sm text-zinc-500">
              Welcome back to Snitch.
            </p>
          </div>

          {/* ── FORM ── */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email or Username */}
            <div className="space-y-1.5">
              <label
                htmlFor="identifier"
                className="block text-[10px] font-semibold text-zinc-500 uppercase tracking-[0.2em]"
              >
                Email or Username
              </label>
              <input
                id="identifier"
                name="identifier"
                type="text"
                required
                autoComplete="username"
                placeholder="Enter your email or username"
                value={formData.identifier}
                onChange={handleChange}
                className="w-full bg-[#1A1A1A] border border-zinc-800 rounded-lg px-4 py-3 text-sm text-white placeholder-zinc-600
                           focus:outline-none focus:border-[#F5C518]/70 focus:ring-1 focus:ring-[#F5C518]/30
                           hover:border-zinc-700 transition-colors duration-200"
              />
              {/* Live hint: tells user which mode is detected */}
              {formData.identifier.length > 0 && (
                <p className="text-[10px] text-zinc-600 pl-0.5">
                  Signing in as{" "}
                  <span className="text-[#F5C518] font-semibold">
                    {/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.identifier.trim())
                      ? "email"
                      : "username"}
                  </span>
                </p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-[10px] font-semibold text-zinc-500 uppercase tracking-[0.2em]"
                >
                  Password
                </label>
                <a
                  href="/forgot-password"
                  className="text-[10px] text-[#F5C518] hover:underline tracking-wide uppercase font-semibold transition-colors duration-200"
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-[#1A1A1A] border border-zinc-800 rounded-lg px-4 py-3 pr-12 text-sm text-white placeholder-zinc-600
                             focus:outline-none focus:border-[#F5C518]/70 focus:ring-1 focus:ring-[#F5C518]/30
                             hover:border-zinc-700 transition-colors duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-[#F5C518] transition-colors duration-200"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-[#F5C518] hover:bg-[#e0b315] active:scale-[0.98] text-black font-bold text-sm
                         rounded-lg py-3.5 tracking-widest uppercase transition-all duration-200 mt-2"
            >
              Sign In
            </button>
          <ContinueWithGoogle/>

          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-zinc-800" />
            <span className="text-[10px] text-zinc-700 tracking-widest uppercase">or</span>
            <div className="flex-1 h-px bg-zinc-800" />
          </div>

          {/* Register link */}
          <p className="text-center text-sm text-zinc-500">
            New to Snitch?{" "}
      
              
            <Link className="text-[#F5C518] hover:underline font-semibold transition-colors duration-200" to="/register"> Create account</Link>
             
          
          </p>

          {/* Legal */}
          <p className="text-center text-[10px] text-zinc-700 mt-6 leading-relaxed">
            By signing in you agree to Snitch's{" "}
            <a href="#" className="underline hover:text-zinc-500 transition-colors">Terms of Service</a>
            {" "}&amp;{" "}
            <a href="#" className="underline hover:text-zinc-500 transition-colors">Privacy Policy</a>.
          </p>

        </div>
      </div>

    </div>
    </AuthSkeleton>
  );
};

export default Login;