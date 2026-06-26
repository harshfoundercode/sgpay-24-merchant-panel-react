// src/pages/auth/BridgePayLogin.jsx
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import authService from "../../services/AuthServices";

const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const BoltIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>
);

const ChartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 20V10M12 20V4M6 20v-6" />
  </svg>
);

const HeadsetIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 18v-6a9 9 0 0118 0v6" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z" />
  </svg>
);

const EyeIcon = ({ show }) =>
  show ? (
    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" strokeLinecap="round" />
    </svg>
  );

const features = [
  {
    icon: <ShieldIcon />,
    title: "Secure & Compliant",
    desc: "Bank level security with end-to-end encryption and compliance.",
  },
  {
    icon: <BoltIcon />,
    title: "Instant & Reliable",
    desc: "Process payouts instantly and reliably to any bank account.",
  },
  {
    icon: <ChartIcon />,
    title: "Real-time Analytics",
    desc: "Track transactions, success rates and payout performance in real-time.",
  },
  {
    icon: <HeadsetIcon />,
    title: "24/7 Support",
    desc: "Our support team is always available to help you, anytime.",
  },
];

const CityScapeIllustration = () => (
  <svg viewBox="0 0 600 200" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
    {/* Sky elements */}
    <circle cx="80" cy="40" r="25" fill="#c7d9f5" opacity="0.5" />
    <circle cx="110" cy="35" r="18" fill="#c7d9f5" opacity="0.4" />
    <circle cx="520" cy="50" r="20" fill="#c7d9f5" opacity="0.5" />
    <circle cx="545" cy="42" r="15" fill="#c7d9f5" opacity="0.4" />
    {/* Birds */}
    <path d="M200 30 Q203 27 206 30" stroke="#a0b8e0" strokeWidth="1.5" fill="none" />
    <path d="M215 25 Q218 22 221 25" stroke="#a0b8e0" strokeWidth="1.5" fill="none" />
    <path d="M380 20 Q383 17 386 20" stroke="#a0b8e0" strokeWidth="1.5" fill="none" />
    {/* Background buildings */}
    <rect x="20" y="90" width="40" height="100" rx="2" fill="#b8cef0" opacity="0.6" />
    <rect x="30" y="75" width="20" height="20" rx="1" fill="#b8cef0" opacity="0.5" />
    <rect x="65" y="70" width="50" height="120" rx="2" fill="#aec4ee" opacity="0.7" />
    <rect x="78" y="60" width="12" height="15" fill="#aec4ee" opacity="0.6" />
    <rect x="120" y="80" width="35" height="110" rx="2" fill="#b5caf0" opacity="0.65" />
    <rect x="430" y="75" width="50" height="115" rx="2" fill="#aec4ee" opacity="0.7" />
    <rect x="445" y="62" width="12" height="18" fill="#aec4ee" opacity="0.6" />
    <rect x="490" y="85" width="40" height="105" rx="2" fill="#b5caf0" opacity="0.65" />
    <rect x="540" y="95" width="45" height="100" rx="2" fill="#b8cef0" opacity="0.6" />
    {/* Main tall buildings */}
    <rect x="160" y="45" width="55" height="145" rx="2" fill="#9ab8e8" opacity="0.8" />
    <rect x="172" y="35" width="15" height="15" rx="1" fill="#9ab8e8" opacity="0.7" />
    {/* Windows */}
    {[55, 65, 75, 85, 95, 105, 115, 125].map((y, i) => (
      <rect key={i} x="168" y={y} width="8" height="6" rx="1" fill="#daeaf8" opacity="0.7" />
    ))}
    {[55, 65, 75, 85, 95, 105, 115, 125].map((y, i) => (
      <rect key={i} x="182" y={y} width="8" height="6" rx="1" fill="#daeaf8" opacity="0.7" />
    ))}
    <rect x="240" y="55" width="60" height="135" rx="2" fill="#93b3e5" opacity="0.8" />
    <rect x="318" y="50" width="70" height="140" rx="2" fill="#9ab8e8" opacity="0.8" />
    <rect x="395" y="60" width="30" height="130" rx="2" fill="#a8c0ec" opacity="0.75" />
    {/* Bridge */}
    <path d="M100 175 Q200 130 300 160 Q400 130 500 175" stroke="#8ba8d8" strokeWidth="2.5" fill="none" />
    <line x1="200" y1="132" x2="200" y2="175" stroke="#8ba8d8" strokeWidth="1.5" />
    <line x1="300" y1="160" x2="300" y2="175" stroke="#8ba8d8" strokeWidth="1.5" />
    <line x1="400" y1="132" x2="400" y2="175" stroke="#8ba8d8" strokeWidth="1.5" />
    {/* Suspender cables */}
    {[170, 185, 215, 230, 270, 285, 315, 330, 370, 385, 415, 430].map((x, i) => (
      <line key={i} x1={x} y1={i % 2 === 0 ? 148 : 155} x2={x} y2="175" stroke="#a0badc" strokeWidth="1" opacity="0.7" />
    ))}
    {/* Water */}
    <path d="M0 185 Q150 178 300 182 Q450 186 600 180 L600 200 L0 200 Z" fill="#c5d8f2" opacity="0.5" />
    <path d="M0 190 Q100 185 200 188 Q350 183 500 187 Q560 189 600 186 L600 200 L0 200 Z" fill="#b8d0ef" opacity="0.4" />
    {/* Trees */}
    <ellipse cx="50" cy="168" rx="12" ry="10" fill="#a8c4e8" opacity="0.7" />
    <rect x="48" y="170" width="4" height="12" fill="#9ab8e0" opacity="0.6" />
    <ellipse cx="555" cy="165" rx="14" ry="11" fill="#a8c4e8" opacity="0.7" />
    <rect x="553" y="167" width="4" height="13" fill="#9ab8e0" opacity="0.6" />
    <ellipse cx="570" cy="168" rx="10" ry="9" fill="#b0cae8" opacity="0.6" />
  </svg>
);

export default function BridgePayLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };
  
  const handleLogin = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }
    
    if (!email.includes('@') || !email.includes('.')) {
      setError("Please enter a valid email address");
      return;
    }
    
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }
    
    setLoading(true);
    setError("");
    
    try {
      // Call the login API
      const response = await authService.login(email, password);
      console.log("Login successful:", response);
      
      // Handle remember me
      if (rememberMe) {
        localStorage.setItem('rememberEmail', email);
      } else {
        localStorage.removeItem('rememberEmail');
      }
      
      // Show success message (optional)
      // Redirect to dashboard after successful login
      navigate('/dashboard');
      
    } catch (err) {
      console.error("Login error:", err);
      
      // Handle different error scenarios
      if (err.response) {
        const status = err.response.status;
        const data = err.response.data;
        
        if (status === 401) {
          setError("Invalid email or password. Please try again.");
        } else if (status === 404) {
          setError("User not found. Please check your email.");
        } else if (status === 403) {
          setError("Your account is locked. Please contact support.");
        } else if (data?.message) {
          setError(data.message);
        } else {
          setError("Login failed. Please try again.");
        }
      } else if (err.request) {
        setError("Network error. Please check your connection.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-3 sm:p-4 font-sans">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-5xl overflow-hidden flex flex-col md:flex-row" style={{ minHeight: "auto" }}>
        
        {/* Left Panel */}
        <div className="flex-1 bg-linear-to-b from-white to-blue-50 p-5 sm:p-6 md:p-8 flex flex-col relative overflow-hidden">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-5 sm:mb-6 md:mb-8">
            <div className="bg-blue-600 rounded-lg p-1.5">
              <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="white">
                <path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM16 14a4 4 0 100 8 4 4 0 000-8z" />
              </svg>
            </div>
            <div>
              <div className="font-bold text-blue-900 text-base sm:text-lg leading-tight">Bridge Pay</div>
              <div className="text-[11px] sm:text-xs text-gray-500 leading-tight">Merchant Panel</div>
            </div>
          </div>

          {/* Hero text */}
          <div className="mb-6 sm:mb-7 md:mb-8">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-blue-950 leading-tight">
              Payouts Made Simple,
            </h1>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-blue-600 leading-tight">
              Business Made Better
            </h1>
            <p className="text-gray-500 text-xs sm:text-sm mt-2 sm:mt-3 max-w-xs">
              Bridge Pay helps businesses automate payouts with speed, security and reliability.
            </p>
          </div>

          {/* Feature list */}
          <div className="space-y-3 sm:space-y-4 mb-auto">
            {features.map((f, i) => (
              <div key={i} className="flex items-start gap-2 sm:gap-3">
                <div className="bg-blue-50 rounded-xl p-2 shrink-0">
                  {f.icon}
                </div>
                <div>
                  <div className="font-semibold text-blue-900 text-xs sm:text-sm">{f.title}</div>
                  <div className="text-gray-500 text-[11px] sm:text-xs mt-0.5">{f.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* City illustration */}
          <div className="mt-5 sm:mt-6 -mx-5 sm:-mx-6 md:-mx-8 -mb-5 sm:-mb-6 md:-mb-8">
            <CityScapeIllustration />
          </div>
        </div>

        {/* Right Panel */}
        <div className="flex-1 flex flex-col p-5 sm:p-6 md:p-8 relative">
          {/* Language selector */}
          <div className="flex justify-end mb-5 sm:mb-6 md:mb-8">
            <button className="flex items-center gap-1.5 border border-gray-200 rounded-lg px-2.5 py-2 sm:px-3 sm:py-2 text-xs sm:text-sm text-gray-600 hover:bg-gray-50 transition">
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5}>
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
              </svg>
              English
              <svg viewBox="0 0 24 24" className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          {/* Welcome */}
          <div className="mb-5 sm:mb-6 md:mb-7">
            <h2 className="text-xl sm:text-2xl font-extrabold text-blue-950">Welcome Back!</h2>
            <p className="text-gray-500 text-xs sm:text-sm mt-1">Login to access your merchant account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4 sm:space-y-5">
            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-xs sm:text-sm flex items-center gap-2">
                <span>⚠️</span> {error}
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  disabled={loading}
                  className="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition disabled:opacity-60"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" strokeWidth={1.5}>
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 11V7a5 5 0 0110 0v4" />
                  </svg>
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  disabled={loading}
                  className="w-full pl-9 sm:pl-10 pr-10 sm:pr-12 py-2.5 sm:py-3 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition disabled:opacity-60"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition disabled:opacity-40"
                >
                  <EyeIcon show={showPassword} />
                </button>
              </div>
            </div>

            {/* Remember me + Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  disabled={loading}
                  className="w-4 h-4 rounded accent-blue-600 disabled:opacity-40"
                />
                <span className="text-xs sm:text-sm text-gray-600">Remember me</span>
              </label>
              <button
                type="button"
                onClick={handleForgotPassword}
                disabled={loading}
                className="text-xs sm:text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline transition disabled:opacity-40"
              >
                Forgot Password?
              </button>
            </div>

            {/* Login button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold py-3 sm:py-3.5 rounded-xl transition text-sm tracking-wide shadow-md shadow-blue-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs sm:text-sm text-gray-400">or</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* Support */}
            <p className="text-center text-xs sm:text-sm text-gray-500 pt-1">
              New to Bridge Pay?{" "}
              <button className="text-blue-600 font-semibold hover:underline transition">
                Contact Support
              </button>
            </p>
          </form>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-2 sm:bottom-4 left-0 right-0 text-center text-[10px] sm:text-xs text-gray-400 flex items-center justify-center gap-1 sm:gap-2 flex-wrap px-2">
        <svg viewBox="0 0 24 24" className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" strokeWidth={2}>
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 11V7a5 5 0 0110 0v4" />
        </svg>
        Secure Login &nbsp;|&nbsp; © 2025 Bridge Pay. All rights reserved.
      </div>
    </div>
  );
}