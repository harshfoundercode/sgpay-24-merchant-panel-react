import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Mail, Shield, Lock, Eye, EyeOff, ArrowLeft,
  CheckCircle, AlertCircle, Clock, Zap, Info,
  ChevronDown,
} from "lucide-react";
import forgetImage from '../../assets/forgetStep1.png';


// ─── Spinner ─────────────────────────────────────────────────────────────────

function Spinner() {
  return (
    <svg
      className="animate-spin"
      width="18" height="18"
      viewBox="0 0 24 24" fill="none"
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity="0.25" />
      <path fill="currentColor" opacity="0.75"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}

// ─── OTP Input ────────────────────────────────────────────────────────────────

function OtpBox({ value, id, onChange, onKeyDown, inputRef }) {
  return (
    <input
      ref={inputRef}
      id={id}
      type="text"
      inputMode="numeric"
      maxLength={1}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      className={`
        w-full h-14 text-center text-xl font-bold text-gray-900
        border-2 rounded-xl outline-none transition-all duration-150
        font-sans
        ${value
          ? "border-indigo-500 bg-indigo-50 text-indigo-700"
          : "border-gray-200 bg-white"}
        focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100
      `}
    />
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [showCpw, setShowCpw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(0);
  const [toast, setToast] = useState(null);
  const [errors, setErrors] = useState({});

  const otpRefs = useRef([]);

  // toast helper
  const showToast = (text, isErr = false) => {
    setToast({ text, isErr });
    setTimeout(() => setToast(null), 3200);
  };

  // countdown
  useEffect(() => {
    if (timer <= 0) return;
    const id = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [timer]);

  // ── actions ──

  const sendOTP = async () => {
    const errs = {};
    if (!email) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) errs.email = "Enter a valid email";
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1400));
    showToast(`OTP sent to ${email}`);
    setStep(2); setTimer(600); setErrors({});
    setLoading(false);
  };

  const verifyOTP = async () => {
    if (otp.join("").length !== 6) { showToast("Enter all 6 digits", true); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1400));
    if (otp.join("") === "123456") {
      showToast("OTP verified!"); setStep(3); setErrors({});
    } else {
      showToast("Incorrect OTP — try again", true);
    }
    setLoading(false);
  };

  const resendOTP = async () => {
    if (timer > 0 || loading) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    showToast(`New OTP sent to ${email}`); setTimer(600);
    setLoading(false);
  };

  const resetPassword = async () => {
    const errs = {};
    if (!newPw) errs.newPw = "Password is required";
    else if (newPw.length < 8) errs.newPw = "Min 8 characters required";
    if (!confirmPw) errs.confirmPw = "Confirm your password";
    else if (newPw !== confirmPw) errs.confirmPw = "Passwords do not match";
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1400));
    showToast("Password reset — redirecting…");
    setTimeout(() => navigate("/login"), 2200);
    setLoading(false);
  };

  const handleOtpChange = (i, v) => {
    if (!/^\d*$/.test(v)) return;
    const next = [...otp]; next[i] = v.slice(-1); setOtp(next);
    if (v && i < 5) otpRefs.current[i + 1]?.focus();
  };
  const handleOtpKey = (i, e) => {
    if (e.key === "Backspace" && !otp[i] && i > 0) otpRefs.current[i - 1]?.focus();
  };

  // ── left panel config per step ──
  const leftCfg = [
    {
      sub: "No worries! Enter your registered email and we'll send you an OTP to reset your password.",
      badgeTitle: "Security First",
      badgeText: "Your security is our priority. We use OTP verification to ensure it's really you.",
      Illus: forgetImage,
      showTips: false,
    },
    {
      sub: "No worries! We just need to verify your identity. Enter the OTP sent to your registered email.",
      badgeTitle: "Security First",
      badgeText: "OTP verification ensures only you can reset your account password.",
      Illus: forgetImage,
      showTips: false,
    },
    {
      sub: "Almost there! Set a new strong password for your account to complete the process.",
      badgeTitle: "Security Tips",
      badgeText: "Use a strong password and don't share it with anyone.",
      Illus: forgetImage,
      showTips: true,
    },
  ];
  const lc = leftCfg[step - 1];

  // ── stepper steps ──
  const STEPS = [
    { n: 1, label: "Verify Email" },
    { n: 2, label: "Verify OTP" },
    { n: 3, label: "Reset Password" },
  ];

  // ── accordion config ──
  const CARDS = [
    {
      n: 1,
      icon: <Mail size={18} />,
      title: "Step 1: Enter Registered Email",
      sub: "Enter your registered email address and we will send you an OTP.",
    },
    {
      n: 2,
      icon: <Shield size={18} />,
      title: "Step 2: Verify OTP",
      sub: "Enter the 6-digit OTP sent to your email address.",
    },
    {
      n: 3,
      icon: <Lock size={18} />,
      title: "Step 3: Reset Password",
      sub: "Create a new password for your account.",
    },
  ];

  // ── icon bg per card state ──
  const iconBg = (n) => {
    if (step > n) return "bg-green-100 text-green-600";
    if (step === n) return "bg-indigo-100 text-indigo-600";
    return "bg-gray-100 text-gray-400";
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden font-sans">

      {/* ══════════════ TOAST ══════════════ */}
      {toast && (
        <div className={`
          fixed bottom-7 left-1/2 -translate-x-1/2 z-50
          flex items-center gap-2 px-5 py-2.5 rounded-full
          text-white text-sm font-medium shadow-xl whitespace-nowrap
          animate-[fadeUp_0.2s_ease]
          ${toast.isErr ? "bg-red-600" : "bg-green-600"}
        `}>
          {!toast.isErr && <CheckCircle size={15} />}
          {toast.text}
        </div>
      )}

      {/* ══════════════ LEFT PANEL ══════════════ */}
      <div className="hidden lg:flex flex-col w-[30%] min-w-67.5 shrink-0 bg-[#eef0fb] px-7 py-8 overflow-hidden">

        {/* logo */}
        <div className="flex items-center gap-2 mb-8">
          <Zap size={20} className="text-blue-700" />
          <span className="text-[17px] font-extrabold text-blue-700 tracking-tight">SGPAY24</span>
        </div>

        {/* title + sub */}
        <h2 className="text-[22px] font-extrabold text-gray-900 leading-snug mb-2">
          Forgot Password?
        </h2>
        <p className="text-[13px] text-gray-500 leading-relaxed mb-4">{lc.sub}</p>

        {/* illustration */}
        <div className="flex-1 flex items-center justify-center">
          <img
            src={forgetImage}
            alt="Luxury Bus Fleet"
            className="w-80 h-60 object-fill object-center"
          />
        </div>

        {/* security badge */}
        <div className="bg-white rounded-2xl p-3.5 flex items-start gap-3 shadow-sm mt-2">
          <Shield size={18} className="text-indigo-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-[12px] font-bold text-gray-900 mb-1">{lc.badgeTitle}</p>
            {lc.badgeText && (
              <p className="text-[11px] text-gray-500 leading-relaxed">{lc.badgeText}</p>
            )}
            {lc.showTips && (
              <ul className="mt-1.5 space-y-1">
                {[
                  "At least 8 characters",
                  "Include uppercase & lowercase letters",
                  "Include numbers and special characters",
                  "Avoid using common words",
                ].map((t) => (
                  <li key={t} className="flex items-center gap-1.5 text-[11px] text-gray-700">
                    <CheckCircle size={11} className="text-green-500 flex-shrink-0" /> {t}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* ══════════════ RIGHT PANEL ══════════════ */}
      <div className="flex-1 flex flex-col overflow-y-auto bg-white">

        {/* top bar */}
        <div className="flex justify-end px-8 pt-5 flex-shrink-0">
          <button
            onClick={() => navigate("/login")}
            className="text-[13px] font-semibold text-indigo-600 hover:opacity-75 transition-opacity"
          >
            ← Back to Login
          </button>
        </div>

        {/* scrollable content */}
        <div className="flex-1 px-8 pb-6 max-w-full w-full">

          {/* ── STEPPER ── */}
          <div className="flex items-start mb-7 mt-2">
            {STEPS.map(({ n, label }, i) => {
              const isDone = step > n;
              const isActive = step === n;
              return (
                <React.Fragment key={n}>
                  <div className="flex flex-col items-center gap-2 min-w-[80px]">
                    {/* circle */}
                    <div className={`
                      w-10 h-10 rounded-full flex items-center justify-center
                      text-[14px] font-bold border-2 transition-all duration-200 flex-shrink-0
                      ${isDone || isActive
                        ? "bg-indigo-600 border-indigo-600 text-white"
                        : "bg-white border-gray-300 text-gray-400"}
                    `}>
                      {isDone ? <CheckCircle size={17} /> : n}
                    </div>
                    {/* label */}
                    <span className={`
                      text-[12px] font-medium whitespace-nowrap
                      ${isDone || isActive ? "text-indigo-600 font-semibold" : "text-gray-400"}
                    `}>
                      {label}
                    </span>
                  </div>

                  {/* connector line */}
                  {i < STEPS.length - 1 && (
                    <div className={`
                      flex-1 h-0.5 mt-5 transition-all duration-300
                      ${step > n ? "bg-indigo-600" : "bg-gray-200"}
                    `} />
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* ── ACCORDION CARDS ── */}
          <div className="space-y-3.5">
            {CARDS.map(({ n, icon, title, sub }) => {
              const isOpen = step === n;
              const isDone = step > n;

              return (
                <div
                  key={n}
                  className="border-[1.5px] border-gray-200 rounded-2xl overflow-hidden bg-white"
                >
                  {/* card header */}
                  <div className="flex items-center justify-between px-5 py-4">
                    <div className="flex items-center gap-3.5">
                      {/* icon badge */}
                      <div className={`
                        w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0
                        ${iconBg(n)}
                      `}>
                        {isDone ? <CheckCircle size={18} /> : icon}
                      </div>
                      <div>
                        <p className={`text-[14px] font-bold ${step < n ? "text-gray-400" : "text-gray-900"}`}>
                          {title}
                        </p>
                        <p className="text-[12px] text-gray-500 mt-0.5">{sub}</p>
                      </div>
                    </div>
                    {!isOpen && <ChevronDown size={17} className="text-gray-400 flex-shrink-0" />}
                  </div>

                  {/* card body — only active step */}
                  {isOpen && (
                    <div className="px-5 pb-5 border-t border-gray-100">

                      {/* ════ STEP 1 ════ */}
                      {n === 1 && (
                        <>
                          <p className="text-[13px] font-semibold text-gray-700 mt-4 mb-1.5">
                            Email Address
                          </p>
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && sendOTP()}
                            placeholder="Enter your registered email"
                            className={`
                              w-full px-4 py-3 text-[14px] text-gray-900
                              border-[1.5px] rounded-xl outline-none transition-all
                              placeholder:text-gray-300
                              focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100
                              ${errors.email ? "border-red-400" : "border-gray-200"}
                            `}
                          />
                          {errors.email && (
                            <p className="flex items-center gap-1 mt-1.5 text-[12px] text-red-500">
                              <AlertCircle size={12} /> {errors.email}
                            </p>
                          )}

                          <button
                            onClick={sendOTP}
                            disabled={loading}
                            className="
                              w-full mt-4 py-3.5 rounded-xl
                              bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60
                              text-white text-[14px] font-bold
                              flex items-center justify-center gap-2
                              transition-all duration-150
                            "
                          >
                            {loading ? <><Spinner /> Sending OTP…</> : "Send OTP"}
                          </button>

                          <div className="flex items-center gap-3 my-3">
                            <div className="flex-1 h-px bg-gray-100" />
                            <span className="text-[12px] text-gray-400 font-medium">OR</span>
                            <div className="flex-1 h-px bg-gray-100" />
                          </div>

                          <button
                            onClick={() => navigate("/login")}
                            className="
                              w-full py-3 rounded-xl
                              border-[1.5px] border-gray-200 bg-white hover:bg-gray-50
                              text-[14px] font-medium text-gray-600
                              flex items-center justify-center gap-2
                              transition-all duration-150
                            "
                          >
                            ← Back to Login
                          </button>
                        </>
                      )}

                      {/* ════ STEP 2 ════ */}
                      {n === 2 && (
                        <>
                          {/* email strip */}
                          <div className="flex items-center justify-between bg-gray-50 border-[1.5px] border-gray-200 rounded-xl px-4 py-3 mt-4">
                            <div className="flex items-center gap-3">
                              <Mail size={15} className="text-gray-400" />
                              <div>
                                <p className="text-[11px] text-gray-500">We have sent a 6-digit OTP to</p>
                                <p className="text-[13px] font-semibold text-gray-900">
                                  {email || "example@email.com"}
                                </p>
                              </div>
                            </div>
                            <button
                              onClick={() => setStep(1)}
                              className="text-[13px] font-semibold text-indigo-600 hover:underline flex-shrink-0"
                            >
                              Change Email
                            </button>
                          </div>

                          <p className="text-[13px] font-semibold text-gray-700 mt-4 mb-2">
                            Enter OTP
                          </p>
                          <div className="flex gap-2.5">
                            {otp.map((d, i) => (
                              <OtpBox
                                key={i}
                                id={`otp-${i}`}
                                value={d}
                                inputRef={(el) => (otpRefs.current[i] = el)}
                                onChange={(e) => handleOtpChange(i, e.target.value)}
                                onKeyDown={(e) => handleOtpKey(i, e)}
                              />
                            ))}
                          </div>

                          {/* resend row */}
                          <div className="flex items-center justify-between mt-3">
                            <p className="text-[12px] text-gray-500">
                              Didn't receive the OTP?{" "}
                              <button
                                onClick={resendOTP}
                                disabled={timer > 0 || loading}
                                className="text-indigo-600 font-semibold disabled:opacity-40 hover:underline"
                              >
                                Resend OTP
                              </button>
                            </p>
                            {timer > 0 && (
                              <p className="text-[12px] text-gray-500">
                                Resend in{" "}
                                {String(Math.floor(timer / 60)).padStart(2, "0")}:
                                {String(timer % 60).padStart(2, "0")}
                              </p>
                            )}
                          </div>

                          <button
                            onClick={verifyOTP}
                            disabled={loading}
                            className="
                              w-full mt-4 py-3.5 rounded-xl
                              bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60
                              text-white text-[14px] font-bold
                              flex items-center justify-center gap-2
                              transition-all duration-150
                            "
                          >
                            {loading ? <><Spinner /> Verifying…</> : "Verify OTP"}
                          </button>

                          <button
                            onClick={() => setStep(1)}
                            className="
                              w-full mt-2.5 py-3 rounded-xl
                              border-[1.5px] border-gray-200 bg-white hover:bg-gray-50
                              text-[14px] font-medium text-gray-600
                              flex items-center justify-center gap-2
                              transition-all duration-150
                            "
                          >
                            ← Back
                          </button>
                        </>
                      )}

                      {/* ════ STEP 3 ════ */}
                      {n === 3 && (
                        <>
                          {/* new password */}
                          <p className="text-[13px] font-semibold text-gray-700 mt-4 mb-1.5">
                            New Password
                          </p>
                          <div className="relative">
                            <input
                              type={showPw ? "text" : "password"}
                              value={newPw}
                              onChange={(e) => setNewPw(e.target.value)}
                              placeholder="Enter new password"
                              className={`
                                w-full px-4 py-3 pr-11 text-[14px] text-gray-900
                                border-[1.5px] rounded-xl outline-none transition-all
                                placeholder:text-gray-300
                                focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100
                                ${errors.newPw ? "border-red-400" : "border-gray-200"}
                              `}
                            />
                            <button
                              type="button"
                              onClick={() => setShowPw((v) => !v)}
                              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-500"
                            >
                              {showPw ? <EyeOff size={17} /> : <Eye size={17} />}
                            </button>
                          </div>
                          {errors.newPw && (
                            <p className="flex items-center gap-1 mt-1.5 text-[12px] text-red-500">
                              <AlertCircle size={12} /> {errors.newPw}
                            </p>
                          )}

                          {/* confirm password */}
                          <p className="text-[13px] font-semibold text-gray-700 mt-4 mb-1.5">
                            Confirm New Password
                          </p>
                          <div className="relative">
                            <input
                              type={showCpw ? "text" : "password"}
                              value={confirmPw}
                              onChange={(e) => setConfirmPw(e.target.value)}
                              placeholder="Confirm new password"
                              className={`
                                w-full px-4 py-3 pr-11 text-[14px] text-gray-900
                                border-[1.5px] rounded-xl outline-none transition-all
                                placeholder:text-gray-300
                                focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100
                                ${errors.confirmPw ? "border-red-400" : "border-gray-200"}
                              `}
                            />
                            <button
                              type="button"
                              onClick={() => setShowCpw((v) => !v)}
                              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-500"
                            >
                              {showCpw ? <EyeOff size={17} /> : <Eye size={17} />}
                            </button>
                          </div>
                          {errors.confirmPw && (
                            <p className="flex items-center gap-1 mt-1.5 text-[12px] text-red-500">
                              <AlertCircle size={12} /> {errors.confirmPw}
                            </p>
                          )}

                          {/* hint */}
                          <div className="flex items-start gap-2 mt-3.5 bg-blue-50 border border-blue-200 rounded-xl px-4 py-3">
                            <Info size={14} className="text-blue-500 mt-0.5 flex-shrink-0" />
                            <p className="text-[12px] text-blue-600 leading-relaxed">
                              Make sure your new password is different from previous passwords.
                            </p>
                          </div>

                          <button
                            onClick={resetPassword}
                            disabled={loading}
                            className="
                              w-full mt-4 py-3.5 rounded-xl
                              bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60
                              text-white text-[14px] font-bold
                              flex items-center justify-center gap-2
                              transition-all duration-150
                            "
                          >
                            {loading ? <><Spinner /> Resetting Password…</> : "Reset Password"}
                          </button>

                          <button
                            onClick={() => setStep(2)}
                            className="
                              w-full mt-2.5 py-3 rounded-xl
                              border-[1.5px] border-gray-200 bg-white hover:bg-gray-50
                              text-[14px] font-medium text-gray-600
                              flex items-center justify-center gap-2
                              transition-all duration-150
                            "
                          >
                            ← Back
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* bottom hint */}
        <p className="text-center text-[12px] text-gray-500 pb-5 px-8 flex-shrink-0">
          {step === 1 && (
            <>
              Didn't receive the OTP? Check your spam folder or{" "}
              <span className="text-indigo-600 font-semibold cursor-pointer hover:underline">
                Resend OTP
              </span>
            </>
          )}
          {step === 2 && "OTP will expire in 10 minutes for security reasons."}
          {step === 3 && "Your password will be updated and you can login with your new password."}
        </p>
      </div>
    </div>
  );
}