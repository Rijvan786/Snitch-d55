import  { useState } from "react";
import PhoneInputPkg from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useAuth } from "../hook/useAuth.js";
import { Link,useNavigate} from "react-router";

// react-phone-input-2 CJS/ESM interop for Vite
const PhoneInput = PhoneInputPkg.default ?? PhoneInputPkg;

/* ─────────────────────────────────────────────
   Snitch — Register Page
   Layout: Desktop split-screen (left brand panel + right form)
           Mobile stacked (brand header → form)
───────────────────────────────────────────── */
const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: "",
    isSeller: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const {handleRegister}=useAuth()
const navigate=useNavigate()
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handlePhoneChange = (value) => {
    setFormData((prev) => ({ ...prev, phone: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    await handleRegister({
        fullname:formData.fullName,
        email:formData.email,
        contact:"+" + formData.phone,
        password:formData.password,
        isSeller:formData.isSeller
    });
    navigate("/")
    // TODO: dispatch register action
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] flex flex-col lg:flex-row">

      {/* ── LEFT PANEL (desktop only) ── */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-[55%] relative overflow-hidden flex-col">
        {/* Background image */}
        <img
          src="/register-panel.png"
          alt="Snitch Fashion"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Gradient overlay — dark vignette so text is legible */}
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
              Dress to<br />
              <span className="text-[#F5C518]">express,</span><br />
              not to impress.
            </h2>
            <p className="text-sm text-zinc-400 max-w-xs leading-relaxed">
              Discover curated streetwear, premium drops, and exclusive styles.
              Built for those who know what they want.
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
            <h2 className="text-2xl font-bold text-white">Create your account</h2>
            <p className="mt-1 text-sm text-zinc-500">
              Join Snitch and redefine your wardrobe.
            </p>
          </div>

          {/* Mobile heading */}
          <div className="lg:hidden mb-6">
            <h2 className="text-xl font-bold text-white">Create account</h2>
            <p className="mt-1 text-sm text-zinc-500">
              Join and redefine your wardrobe.
            </p>
          </div>

          {/* ── FORM ── */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Full Name */}
            <div className="space-y-1.5">
              <label
                htmlFor="fullName"
                className="block text-[10px] font-semibold text-zinc-500 uppercase tracking-[0.2em]"
              >
                Full Name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                placeholder="John Doe"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full bg-[#1A1A1A] border border-zinc-800 rounded-lg px-4 py-3 text-sm text-white placeholder-zinc-600
                           focus:outline-none focus:border-[#F5C518]/70 focus:ring-1 focus:ring-[#F5C518]/30
                           hover:border-zinc-700 transition-colors duration-200"
              />
            </div>

            {/* Phone */}
            <div className="space-y-1.5">
              <label className="block text-[10px] font-semibold text-zinc-500 uppercase tracking-[0.2em]">
                Contact Number
              </label>
              <PhoneInput
                country={"in"}
                value={formData.phone}
                onChange={handlePhoneChange}
                inputProps={{
                  name: "phone",
                  id: "phone",
                  required: true,
                  placeholder: "98765 43210",
                }}
                containerClass="!w-full"
                inputClass="!w-full !bg-[#1A1A1A] !border !border-zinc-800 !rounded-lg !pl-14 !pr-4 !py-3 !text-sm !text-white
                            !placeholder-zinc-600 hover:!border-zinc-700 focus:!border-[#F5C518]/70 focus:!ring-1
                            focus:!ring-[#F5C518]/30 !transition-colors !duration-200"
                buttonClass="!bg-[#1A1A1A] !border !border-zinc-800 !border-r-0 !rounded-l-lg hover:!bg-[#222]"
                dropdownClass="!bg-[#1A1A1A] !border !border-zinc-800 !text-white !rounded-lg !mt-1 !shadow-xl"
                searchClass="!bg-[#111] !border !border-zinc-700 !text-white !rounded-md !px-3 !py-2 !text-sm"
                enableSearch
              />
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="block text-[10px] font-semibold text-zinc-500 uppercase tracking-[0.2em]"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-[#1A1A1A] border border-zinc-800 rounded-lg px-4 py-3 text-sm text-white placeholder-zinc-600
                           focus:outline-none focus:border-[#F5C518]/70 focus:ring-1 focus:ring-[#F5C518]/30
                           hover:border-zinc-700 transition-colors duration-200"
              />
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label
                htmlFor="password"
                className="block text-[10px] font-semibold text-zinc-500 uppercase tracking-[0.2em]"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Min. 8 characters"
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

            {/* isSeller Checkbox */}
            <div
              onClick={() => setFormData((prev) => ({ ...prev, isSeller: !prev.isSeller }))}
              className={`flex items-center gap-3 rounded-lg border px-4 py-3 cursor-pointer transition-all duration-200
                ${formData.isSeller
                  ? "border-[#F5C518]/50 bg-[#F5C518]/5"
                  : "border-zinc-800 bg-[#1A1A1A] hover:border-zinc-700"
                }`}
            >
              {/* Custom checkbox */}
              <div
                className={`w-4.5 h-4.5 rounded flex-shrink-0 flex items-center justify-center border transition-all duration-200
                  ${formData.isSeller
                    ? "bg-[#F5C518] border-[#F5C518]"
                    : "bg-transparent border-zinc-600"
                  }`}
              >
                {formData.isSeller && (
                  <svg className="w-2.5 h-2.5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm text-white font-medium">
                  Register as a{" "}
                  <span className="text-[#F5C518]">Seller</span>
                </p>
                <p className="text-[11px] text-zinc-500 mt-0.5">
                  List your clothing and reach thousands of buyers
                </p>
              </div>

              {/* Seller badge */}
              {formData.isSeller && (
                <span className="text-[9px] font-bold tracking-widest uppercase text-[#F5C518] border border-[#F5C518]/40 rounded px-1.5 py-0.5 flex-shrink-0">
                  Seller
                </span>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-[#F5C518] hover:bg-[#e0b315] active:scale-[0.98] text-black font-bold text-sm
                         rounded-lg py-3.5 tracking-widest uppercase transition-all duration-200 mt-2"
            >
              Create Account
            </button>

          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-zinc-800" />
            <span className="text-[10px] text-zinc-700 tracking-widest uppercase">or</span>
            <div className="flex-1 h-px bg-zinc-800" />
          </div>

          {/* Login link */}
          <p className="text-center text-sm text-zinc-500">
            Already a Snitch member?{" "}
                       <Link className="text-[#F5C518] hover:underline font-semibold transition-colors duration-200" to="/login"> Sign in</Link>

          </p>

          {/* Legal */}
          <p className="text-center text-[10px] text-zinc-700 mt-6 leading-relaxed">
            By creating an account you agree to Snitch's{" "}
            <a href="#" className="underline hover:text-zinc-500 transition-colors">Terms of Service</a>
            {" "}&amp;{" "}
            <a href="#" className="underline hover:text-zinc-500 transition-colors">Privacy Policy</a>.
          </p>

        </div>
      </div>

    </div>
  );
};

export default Register;