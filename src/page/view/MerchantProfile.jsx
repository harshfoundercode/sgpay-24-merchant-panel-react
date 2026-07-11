// import { useState } from "react";
// import { Secrete_key, Api_key } from "../../../env";
// import { useNavigate } from "react-router-dom";

// // ── Reusable components ───────────────────────────────────────────────────────
// const InfoRow = ({ label, value, isNode }) => (
//   <div className="flex flex-col sm:flex-row sm:items-start py-2 sm:py-2.5 border-b border-gray-50 last:border-0 gap-1 sm:gap-0">
//     <span className="text-[11px] sm:text-xs font-semibold text-gray-800 sm:w-36 md:w-40 shrink-0">{label}</span>
//     <span className="hidden sm:inline text-gray-400 mx-3 text-sm">:</span>
//     {isNode ? value : <span className="text-[11px] sm:text-sm font-medium text-gray-800 wrap-break-word">{value}</span>}
//   </div>
// );

// const CopyBtn = ({ text }) => {
//   const [copied, setCopied] = useState(false);
//   const handle = () => {
//     navigator.clipboard.writeText(text).catch(() => { });
//     setCopied(true);
//     setTimeout(() => setCopied(false), 1500);
//   };
//   return (
//     <button onClick={handle} className="text-gray-400 hover:text-blue-600 transition-colors shrink-0">
//       {copied
//         ? <svg width={13} sm:width={15} height={13} sm:height={15} viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth={2.5}><path d="M20 6L9 17l-5-5" /></svg>
//         : <svg width={13} sm:width={15} height={13} sm:height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
//       }
//     </button>
//   );
// };

// const Badge = ({ label, color }) => {
//   const map = {
//     green: "bg-green-50 text-green-700 border-green-200",
//     blue: "bg-blue-50 text-blue-700 border-blue-200",
//   };
//   return <span className={`px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold border whitespace-nowrap ${map[color]}`}>{label}</span>;
// };

// // ── Page Header ───────────────────────────────────────────────────────────────
// const PageHeader = () => (
//   <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-5 sm:mb-6 gap-3 flex-wrap">
//     <div>
//       <h1 className="text-lg sm:text-xl font-bold text-gray-900">Profile</h1>
//       <p className="text-xs sm:text-sm text-gray-400 mt-0.5">Manage your personal information and API credentials</p>
//     </div>
//     <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
//       <div className="flex items-center gap-2 sm:gap-2.5 px-2.5 sm:px-3 py-1.5 sm:py-2 bg-white border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 w-full sm:w-auto">
//         <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
//           <svg width={14} sm:width={16} height={14} sm:height={16} viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth={1.8}>
//             <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
//             <polyline points="9 22 9 12 15 12 15 22" />
//           </svg>
//         </div>
//         <div className="min-w-0 flex-1">
//           <div className="text-[11px] sm:text-xs font-bold text-gray-900 truncate">Demo Store</div>
//           <div className="text-[9px] sm:text-[11px] text-gray-400">MID: M12345678</div>
//         </div>
//         <svg width={12} sm:width={14} height={12} sm:height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="text-gray-400 shrink-0">
//           <path d="M19 9l-7 7-7-7" />
//         </svg>
//       </div>
//     </div>
//   </div>
// );

// // ── Edit Profile Modal ────────────────────────────────────────────────────────
// const EditModal = ({ data, onClose, onSave }) => {
//   const [form, setForm] = useState({ ...data });
//   return (
//     <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-3 sm:p-4" onClick={onClose}>
//       <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-3 sm:mx-4 p-4 sm:p-6" onClick={e => e.stopPropagation()}>
//         <div className="flex items-center justify-between mb-4 sm:mb-5">
//           <h3 className="text-sm sm:text-base font-bold text-gray-900">Edit Profile</h3>
//           <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
//             <svg width={16} sm:width={18} height={16} sm:height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
//               <line x1="18" y1="6" x2="6" y2="18" />
//               <line x1="6" y1="6" x2="18" y2="18" />
//             </svg>
//           </button>
//         </div>
//         <div className="space-y-2.5 sm:space-y-3">
//           {[
//             { label: "Merchant Name", key: "name" },
//             { label: "Email Address", key: "email" },
//             { label: "Mobile Number", key: "mobile" },
//             { label: "Company Name", key: "company" },
//           ].map(f => (
//             <div key={f.key}>
//               <label className="text-[11px] sm:text-xs font-semibold text-gray-600 mb-1 block">{f.label}</label>
//               <input
//                 value={form[f.key]}
//                 onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
//                 className="w-full px-2.5 sm:px-3 py-1.5 sm:py-2 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
//               />
//             </div>
//           ))}
//         </div>
//         <div className="flex gap-2 mt-4 sm:mt-5">
//           <button onClick={onClose} className="flex-1 px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-200 rounded-xl text-xs sm:text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">Cancel</button>
//           <button onClick={() => { onSave(form); onClose(); }} className="flex-1 px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs sm:text-sm font-semibold transition-colors">Save Changes</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ── Main Profile Page ─────────────────────────────────────────────────────────
// export default function MerchantProfile() {
//   const [editOpen, setEditOpen] = useState(false);
//   const [showApiKey, setShowApiKey] = useState(false);
//   const [showSecret, setShowSecret] = useState(false);
//   const [regenerating, setRegenerating] = useState(false);
//   const navigate = useNavigate();

//   const [profile, setProfile] = useState({
//     name: "Demo Store",
//     email: "merchant@demostore.com",
//     mobile: "+91 98765 43210",
//     company: "Demo Store Private Limited",
//     address: "123, Business Park, 2nd Floor,\nSector 62, Noida, Uttar Pradesh - 201309, India",
//   });

//   const handleRegen = () => {
//     setRegenerating(true);
//     setTimeout(() => setRegenerating(false), 1500);
//   };

//   const EyeBtn = ({ show, toggle }) => (
//     <button onClick={toggle} className="text-gray-400 hover:text-gray-600 transition-colors shrink-0">
//       {show
//         ? <svg width={13} sm:width={15} height={13} sm:height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
//             <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
//             <line x1="1" y1="1" x2="23" y2="23" />
//           </svg>
//         : <svg width={13} sm:width={15} height={13} sm:height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
//             <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
//             <circle cx="12" cy="12" r="3" />
//           </svg>
//       }
//     </button>
//   );

//   const CredentialField = ({ label, value = "", show, onToggle }) => (
//     <div className="mb-3 sm:mb-4">
//       <label className="text-[11px] sm:text-xs font-semibold text-gray-600 mb-1 block">
//         {label}
//       </label>
//       <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-2 sm:py-2.5 border border-gray-200 rounded-xl bg-gray-50">
//         <span className="flex-1 text-[11px] sm:text-sm font-mono text-gray-700 truncate">
//           {show ? value : String(value).replace(/./g, "•").slice(0, 28)}
//         </span>
//         {onToggle && <EyeBtn show={show} toggle={onToggle} />}
//         <CopyBtn text={value || ""} />
//       </div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gray-50 p-3 sm:p-5 font-sans">
//       {editOpen && (
//         <EditModal
//           data={profile}
//           onClose={() => setEditOpen(false)}
//           onSave={updated => setProfile(p => ({ ...p, ...updated }))}
//         />
//       )}

//       <PageHeader />

//       <div className="flex flex-col lg:flex-row gap-4 sm:gap-5">
//         {/* ── Left column ── */}
//         <div className="flex-1 lg:flex-3 space-y-4 sm:space-y-5">

//           {/* Personal Information */}
//           <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5">
//             <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 sm:mb-5">
//               <h2 className="text-sm sm:text-base font-bold text-gray-900">Personal Information</h2>
//               <button
//                 onClick={() => setEditOpen(true)}
//                 className="flex items-center justify-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-200 rounded-xl text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
//               >
//                 <svg width={11} sm:width={13} height={11} sm:height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
//                   <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
//                   <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
//                 </svg>
//                 Edit Profile
//               </button>
//             </div>
//             <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
//               {/* Avatar */}
//               <div className="flex flex-col items-center gap-2 sm:gap-3 shrink-0">
//                 <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-indigo-50 border-2 border-indigo-100 flex items-center justify-center">
//                   <svg width={36} sm:width={42} height={36} sm:height={42} viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth={1.4}>
//                     <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
//                     <polyline points="9 22 9 12 15 12 15 22" />
//                     <rect x="8" y="6" width="3" height="4" rx="0.5" />
//                     <rect x="13" y="6" width="3" height="4" rx="0.5" />
//                   </svg>
//                 </div>
//                 <button className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 border border-gray-200 rounded-xl text-[10px] sm:text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors">
//                   <svg width={9} sm:width={11} height={9} sm:height={11} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
//                     <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
//                     <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
//                   </svg>
//                   Change Logo
//                 </button>
//               </div>

//               {/* Info */}
//               <div className="flex-1 min-w-0">
//                 <InfoRow label="Merchant Name" value={profile.name} />
//                 <InfoRow label="Email Address" value={profile.email} />
//                 <InfoRow label="Mobile Number" value={profile.mobile} />
//                 <InfoRow label="Company Name" value={profile.company} />
//                 <InfoRow label="Address" value={profile.address.split("\n").map((line, i) => (
//                   <div key={i}>{line}</div>
//                 ))} isNode />
//               </div>
//             </div>
//           </div>

//           {/* Business Information */}
//           <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5">
//             <h2 className="text-sm sm:text-base font-bold text-gray-900 mb-3 sm:mb-4">Business Information</h2>
//             <InfoRow label="Business Type" value="Private Limited" />
//             <InfoRow label="GST Number" value="09AABCD1234E1Z5" />
//             <InfoRow label="PAN Number" value="AABCD1234E" />
//             <InfoRow label="Website" value="www.demostore.com" />
//             <InfoRow label="Business Email" value="info@demostore.com" />
//           </div>

//           {/* Account Information */}
//           <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5">
//             <h2 className="text-sm sm:text-base font-bold text-gray-900 mb-3 sm:mb-4">Account Information</h2>
//             <InfoRow label="Account Created On" value="10 Jan 2025, 10:30 AM" />
//             <InfoRow label="Account Status" value={<Badge label="Active" color="green" />} isNode />
//             <InfoRow label="KYC Status" value={<Badge label="Verified" color="blue" />} isNode />
//             <InfoRow label="Last Login" value="14 May 2025, 11:20 AM" />
//             <InfoRow label="Login IP" value="223.186.25.105" />
//           </div>
//         </div>

//         {/* ── Right column ── */}
//         <div className="flex-1 lg:flex-2 space-y-4 sm:space-y-5">

//           {/* API Credentials */}
//           <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5">
//             <h2 className="text-sm sm:text-base font-bold text-gray-900 mb-3 sm:mb-4">API Credentials</h2>

//             {/* MID */}
//             <div className="mb-3 sm:mb-4">
//               <label className="text-[11px] sm:text-xs font-semibold text-gray-600 mb-1 block">Merchant ID (MID)</label>
//               <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-2 sm:py-2.5 border border-gray-200 rounded-xl bg-gray-50">
//                 <span className="flex-1 text-[11px] sm:text-sm font-mono font-semibold text-gray-800 truncate">M12345678</span>
//                 <CopyBtn text="M12345678" />
//               </div>
//             </div>

//             <CredentialField
//               label="API Key"
//               value={Api_key || "key not set"}
//               show={showApiKey}
//               onToggle={() => setShowApiKey(v => !v)}
//             />

//             <CredentialField
//               label="Secret Key"
//               value={Secrete_key || "key not set"}
//               show={showSecret}
//               onToggle={() => setShowSecret(v => !v)}
//             />

//             <button
//               onClick={handleRegen}
//               disabled={regenerating}
//               className="w-full flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 border border-blue-200 text-blue-600 hover:bg-blue-50 rounded-xl text-xs sm:text-sm font-semibold transition-colors disabled:opacity-60 mb-3 sm:mb-4"
//             >
//               <svg width={12} sm:width={14} height={12} sm:height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
//                 className={regenerating ? "animate-spin" : ""}>
//                 <path d="M1 4v6h6M23 20v-6h-6M20.49 9A9 9 0 005.64 5.64L1 10M23 14l-4.64 4.36A9 9 0 013.51 15" />
//               </svg>
//               {regenerating ? "Regenerating..." : "Regenerate Credentials"}
//             </button>

//             {/* Warning */}
//             <div className="flex items-start gap-2 sm:gap-2.5 bg-amber-50 border border-amber-200 rounded-xl px-3 sm:px-3.5 py-2.5 sm:py-3">
//               <svg width={14} sm:width={16} height={14} sm:height={16} viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth={2} className="shrink-0 mt-0.5">
//                 <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
//                 <line x1="12" y1="9" x2="12" y2="13" />
//                 <line x1="12" y1="17" x2="12.01" y2="17" />
//               </svg>
//               <div>
//                 <p className="text-[11px] sm:text-xs font-semibold text-amber-800">Do not share your API keys with anyone.</p>
//                 <p className="text-[10px] sm:text-xs text-amber-700 mt-0.5">Keep your credentials secure.</p>
//               </div>
//             </div>
//           </div>

//           {/* API Documentation */}
//           <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5">
//             <h2 className="text-sm sm:text-base font-bold text-gray-900 mb-3 sm:mb-4">API Documentation</h2>
//             <div className="space-y-1.5 sm:space-y-2">
//               {[
//                 {
//                   icon: <svg width={16} sm:width={18} height={16} sm:height={18} viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth={1.8}><path d="M4 19.5A2.5 2.5 0 016.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" /></svg>,
//                   bg: "bg-indigo-50",
//                   title: "API Integration Guide",
//                   desc: "Step-by-step guide to integrate with Bridge Pay APIs",
//                   page: "/dashboard/api-integration",
//                 },
//                 {
//                   icon: <svg width={16} sm:width={18} height={16} sm:height={18} viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth={1.8}><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>,
//                   bg: "bg-amber-50",
//                   title: "Error Codes Documentation",
//                   desc: "Understand API error codes and their solutions",
//                   page: "/dashboard/error-codes",
//                 },
//               ].map((doc) => (
//                 <button
//                   key={doc.title}
//                   className="w-full flex items-center gap-2.5 sm:gap-3 p-3 sm:p-3.5 border border-gray-100 rounded-xl hover:bg-gray-50 hover:border-gray-200 transition-all text-left group"
//                   onClick={() => navigate(doc.page)}
//                 >
//                   <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl ${doc.bg} flex items-center justify-center shrink-0`}>
//                     {doc.icon}
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <div className="text-xs sm:text-sm font-semibold text-gray-800 group-hover:text-blue-600 transition-colors truncate">{doc.title}</div>
//                     <div className="text-[10px] sm:text-xs text-gray-500 mt-0.5 truncate">{doc.desc}</div>
//                   </div>
//                   <svg width={12} sm:width={14} height={12} sm:height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="text-gray-400 shrink-0">
//                     <path d="M9 18l6-6-6-6" />
//                   </svg>
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Need Help */}
//           <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5">
//             <h2 className="text-sm sm:text-base font-bold text-gray-900 mb-1">Need Help?</h2>
//             <p className="text-[10px] sm:text-xs text-gray-400 mb-3 sm:mb-4 leading-relaxed">If you face any issues with integration or have any questions, our support team is here to help you.</p>
//             <button className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-200 rounded-xl text-xs sm:text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors w-full">
//               <svg width={12} sm:width={14} height={12} sm:height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
//                 <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
//               </svg>
//               Contact Support
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
// src/pages/MerchantProfile.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import merchantProfileService from "../../services/MerchantProfileServices";

// ── Reusable components ───────────────────────────────────────────────────────
const InfoRow = ({ label, value, isNode }) => (
  <div className="flex flex-col sm:flex-row sm:items-start py-2 sm:py-2.5 border-b border-gray-50 last:border-0 gap-1 sm:gap-0">
    <span className="text-[11px] sm:text-xs font-semibold text-gray-800 sm:w-36 md:w-40 shrink-0">{label}</span>
    <span className="hidden sm:inline text-gray-400 mx-3 text-sm">:</span>
    {isNode ? value : <span className="text-[11px] sm:text-sm font-medium text-gray-800 wrap-break-word">{value || "—"}</span>}
  </div>
);

const CopyBtn = ({ text }) => {
  const [copied, setCopied] = useState(false);
  const handle = () => {
    navigator.clipboard.writeText(text).catch(() => { });
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <button onClick={handle} className="text-gray-400 hover:text-blue-600 transition-colors shrink-0">
      {copied
        ? <svg width={13} sm:width={15} height={13} sm:height={15} viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth={2.5}><path d="M20 6L9 17l-5-5" /></svg>
        : <svg width={13} sm:width={15} height={13} sm:height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
      }
    </button>
  );
};

const Badge = ({ label, color }) => {
  const map = {
    green: "bg-green-50 text-green-700 border-green-200",
    blue: "bg-blue-50 text-blue-700 border-blue-200",
    red: "bg-red-50 text-red-600 border-red-200",
    yellow: "bg-yellow-50 text-yellow-700 border-yellow-200",
  };
  return <span className={`px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold border whitespace-nowrap ${map[color] || map.green}`}>{label}</span>;
};

// ── Page Header ───────────────────────────────────────────────────────────────
const PageHeader = ({ merchant }) => (
  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-5 sm:mb-6 gap-3 flex-wrap">
    <div>
      <h1 className="text-lg sm:text-xl font-bold text-gray-900">Profile</h1>
      <p className="text-xs sm:text-sm text-gray-400 mt-0.5">Manage your personal information and API credentials</p>
    </div>
    <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
      <div className="flex items-center gap-2 sm:gap-2.5 px-2.5 sm:px-3 py-1.5 sm:py-2 bg-white border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 w-full sm:w-auto">
        <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
          <svg width={14} sm:width={16} height={14} sm:height={16} viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth={1.8}>
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-[11px] sm:text-xs font-bold text-gray-900 truncate">{merchant?.merchant_name || merchant?.business_name || "Merchant"}</div>
          <div className="text-[9px] sm:text-[11px] text-gray-400">{merchant?.merchant_id || "MID: N/A"}</div>
        </div>
        <svg width={12} sm:width={14} height={12} sm:height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="text-gray-400 shrink-0">
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  </div>
);

// ── Edit Profile Modal ────────────────────────────────────────────────────────
const EditModal = ({ data, onClose, onSave, loading }) => {
  const [form, setForm] = useState({});
  
  useEffect(() => {
    if (data) {
      setForm({
        merchant_name: data.merchant_name || "",
        business_name: data.business_name || "",
        email: data.email || "",
        mobile: data.mobile || "",
        city: data.city || "",
        state: data.state || "",
        pincode: data.pincode || "",
        business_address: data.business_address || "",
        website_url: data.website_url || "",
        gst_number: data.gst_number || "",
        pan_number: data.pan_number || "",
        business_type: data.business_type || "",
      });
    }
  }, [data]);

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-3 sm:p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto mx-3 sm:mx-4 p-4 sm:p-6" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4 sm:mb-5 sticky top-0 bg-white pb-2 border-b border-gray-100">
          <h3 className="text-sm sm:text-base font-bold text-gray-900">Edit Profile</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <svg width={16} sm:width={18} height={16} sm:height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {[
            { label: "Merchant Name", key: "merchant_name", required: true },
            { label: "Business Name", key: "business_name", required: true },
            { label: "Email Address", key: "email", type: "email", required: true },
            { label: "Mobile Number", key: "mobile", required: true },
            { label: "Business Type", key: "business_type" },
            { label: "GST Number", key: "gst_number" },
            { label: "PAN Number", key: "pan_number" },
            { label: "Website URL", key: "website_url" },
            { label: "City", key: "city" },
            { label: "State", key: "state" },
            { label: "Pincode", key: "pincode" },
            { label: "Business Address", key: "business_address", full: true },
          ].map(f => (
            <div key={f.key} className={f.full ? "col-span-1 sm:col-span-2" : ""}>
              <label className="text-[11px] sm:text-xs font-semibold text-gray-600 mb-1 block">
                {f.label} {f.required && <span className="text-red-500">*</span>}
              </label>
              {f.key === "business_address" ? (
                <textarea
                  value={form[f.key] || ""}
                  onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                  rows={2}
                  className="w-full px-2.5 sm:px-3 py-1.5 sm:py-2 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 resize-none"
                />
              ) : (
                <input
                  type={f.type || "text"}
                  value={form[f.key] || ""}
                  onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                  className="w-full px-2.5 sm:px-3 py-1.5 sm:py-2 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex gap-2 mt-4 sm:mt-5">
          <button onClick={onClose} className="flex-1 px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-200 rounded-xl text-xs sm:text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">Cancel</button>
          <button 
            onClick={() => { onSave(form); }} 
            disabled={loading}
            className="flex-1 px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white rounded-xl text-xs sm:text-sm font-semibold transition-colors flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

// ── Main Profile Page ─────────────────────────────────────────────────────────
export default function MerchantProfile() {
  const [editOpen, setEditOpen] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);
  const [showSecret, setShowSecret] = useState(false);
  const [regenerating, setRegenerating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(null);
  const [editLoading, setEditLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  const showToast = (message, isError = false) => {
    setToast({ message, isError });
    setTimeout(() => setToast(null), 3000);
  };

  // ─── Fetch Profile ──────────────────────────────────────────────────────────
  const fetchProfile = async () => {
    setLoading(true);
    try {
      const response = await merchantProfileService.getProfile();
      console.log("Profile Data:", response);
      setProfile(response);
    } catch (error) {
      console.error("Error fetching profile:", error);
      showToast("Failed to load profile", true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // ─── Update Profile ─────────────────────────────────────────────────────────
  const handleUpdateProfile = async (formData) => {
    setEditLoading(true);
    try {
      const response = await merchantProfileService.updateProfile(formData);
      console.log("Profile updated:", response);
      setProfile(response);
      showToast("Profile updated successfully!", false);
      setEditOpen(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      showToast(error.response?.data?.message || "Failed to update profile", true);
    } finally {
      setEditLoading(false);
    }
  };

  // ─── Regenerate API Keys ────────────────────────────────────────────────────
  const handleRegenerateKeys = async () => {
    setRegenerating(true);
    try {
      const response = await merchantProfileService.regenerateApiKeys();
      console.log("Keys regenerated:", response);
      setProfile(prev => ({
        ...prev,
        api_key: response.api_key || response.data?.api_key,
        secret_key: response.secret_key || response.data?.secret_key
      }));
      showToast("API keys regenerated successfully!", false);
    } catch (error) {
      console.error("Error regenerating keys:", error);
      showToast(error.response?.data?.message || "Failed to regenerate keys", true);
    } finally {
      setRegenerating(false);
    }
  };

  const EyeBtn = ({ show, toggle }) => (
    <button onClick={toggle} className="text-gray-400 hover:text-gray-600 transition-colors shrink-0">
      {show
        ? <svg width={13} sm:width={15} height={13} sm:height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
            <line x1="1" y1="1" x2="23" y2="23" />
          </svg>
        : <svg width={13} sm:width={15} height={13} sm:height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
      }
    </button>
  );

  const CredentialField = ({ label, value = "", show, onToggle }) => (
    <div className="mb-3 sm:mb-4">
      <label className="text-[11px] sm:text-xs font-semibold text-gray-600 mb-1 block">
        {label}
      </label>
      <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-2 sm:py-2.5 border border-gray-200 rounded-xl bg-gray-50">
        <span className="flex-1 text-[11px] sm:text-sm font-mono text-gray-700 truncate">
          {show ? value : value ? String(value).replace(/./g, "•").slice(0, 28) : "Not set"}
        </span>
        {onToggle && <EyeBtn show={show} toggle={onToggle} />}
        <CopyBtn text={value || ""} />
      </div>
    </div>
  );

  // ─── Loading State ──────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  const merchant = profile || {};

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-5 font-sans">
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg text-sm ${
          toast.isError ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
        }`}>
          {!toast.isError ? (
            <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M20 6L9 17l-5-5"/>
            </svg>
          ) : (
            <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
          )}
          {toast.message}
        </div>
      )}

      {editOpen && (
        <EditModal
          data={merchant}
          onClose={() => setEditOpen(false)}
          onSave={handleUpdateProfile}
          loading={editLoading}
        />
      )}

      <PageHeader merchant={merchant} />

      <div className="flex flex-col lg:flex-row gap-4 sm:gap-5">
        {/* ── Left column ── */}
        <div className="flex-1 lg:flex-3 space-y-4 sm:space-y-5">

          {/* Personal Information */}
          <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 sm:mb-5">
              <h2 className="text-sm sm:text-base font-bold text-gray-900">Personal Information</h2>
              {/* <button
                onClick={() => setEditOpen(true)}
                className="flex items-center justify-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-200 rounded-xl text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <svg width={11} sm:width={13} height={11} sm:height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
                Edit Profile
              </button> */}
            </div>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              {/* Avatar */}
              {/* <div className="flex flex-col items-center gap-2 sm:gap-3 shrink-0"> */}
                {/* <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-indigo-50 border-2 border-indigo-100 flex items-center justify-center">
                  <svg width={36} sm:width={42} height={36} sm:height={42} viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth={1.4}>
                    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                    <rect x="8" y="6" width="3" height="4" rx="0.5" />
                    <rect x="13" y="6" width="3" height="4" rx="0.5" />
                  </svg>
                </div> */}
                {/* <button className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 border border-gray-200 rounded-xl text-[10px] sm:text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                  <svg width={9} sm:width={11} height={9} sm:height={11} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                  Change Logo
                </button> */}
              {/* </div> */}

              {/* Info */}
              <div className="flex-1 min-w-0">
                <InfoRow label="Merchant Name" value={merchant.merchant_name} />
                <InfoRow label="Business Name" value={merchant.business_name} />
                <InfoRow label="Email Address" value={merchant.email} />
                <InfoRow label="Mobile Number" value={merchant.mobile} />
                <InfoRow label="Business Type" value={merchant.business_type} />
                <InfoRow label="City" value={merchant.city} />
                <InfoRow label="State" value={merchant.state} />
                <InfoRow label="Pincode" value={merchant.pincode} />
                <InfoRow label="Address" value={merchant.business_address} />
              </div>
            </div>
          </div>

          {/* Business Information */}
          <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5">
            <h2 className="text-sm sm:text-base font-bold text-gray-900 mb-3 sm:mb-4">Business Information</h2>
            <InfoRow label="Business Type" value={merchant.business_type || "—"} />
            <InfoRow label="GST Number" value={merchant.gst_number || "—"} />
            <InfoRow label="PAN Number" value={merchant.pan_number || "—"} />
            <InfoRow label="Website" value={merchant.website_url || "—"} />
            <InfoRow label="Settlement Cycle" value={merchant.settlement_cycle || "—"} />
            <InfoRow label="Auto Settlement" value={merchant.auto_settlement ? "Enabled" : "Disabled"} />
          </div>

          {/* Account Information */}
          <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5">
            <h2 className="text-sm sm:text-base font-bold text-gray-900 mb-3 sm:mb-4">Account Information</h2>
            <InfoRow label="Account Created On" value={merchant.created_at ? new Date(merchant.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : "—"} />
            <InfoRow label="Account Status" value={<Badge label={merchant.merchant_status === 'active' ? 'Active' : merchant.merchant_status || 'Unknown'} color={merchant.merchant_status === 'active' ? 'green' : merchant.merchant_status === 'pending' ? 'yellow' : 'red'} />} isNode />
            <InfoRow label="Wallet Balance" value={`₹${parseFloat(merchant.wallet || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}`} />
            <InfoRow label="Merchant ID" value={merchant.merchant_id} />
            <InfoRow label="Account Holder" value={merchant.account_holder_name || "—"} />
            <InfoRow label="Bank Name" value={merchant.bank_name || "—"} />
            <InfoRow label="IFSC Code" value={merchant.ifsc_code || "—"} />
          </div>
        </div>

        {/* ── Right column ── */}
        <div className="flex-1 lg:flex-2 space-y-4 sm:space-y-5">

          {/* API Credentials */}
          <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5">
            <h2 className="text-sm sm:text-base font-bold text-gray-900 mb-3 sm:mb-4">API Credentials</h2>

            {/* MID */}
            <div className="mb-3 sm:mb-4">
              <label className="text-[11px] sm:text-xs font-semibold text-gray-600 mb-1 block">Merchant ID (MID)</label>
              <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-2 sm:py-2.5 border border-gray-200 rounded-xl bg-gray-50">
                <span className="flex-1 text-[11px] sm:text-sm font-mono font-semibold text-gray-800 truncate">{merchant.merchant_id || "N/A"}</span>
                <CopyBtn text={merchant.merchant_id || ""} />
              </div>
            </div>

            <CredentialField
              label="API Key"
              value={merchant.api_key || ""}
              show={showApiKey}
              onToggle={() => setShowApiKey(v => !v)}
            />

            <CredentialField
              label="Secret Key"
              value={merchant.secret_key || ""}
              show={showSecret}
              onToggle={() => setShowSecret(v => !v)}
            />

            <button
              onClick={handleRegenerateKeys}
              disabled={regenerating}
              className="w-full flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 border border-blue-200 text-blue-600 hover:bg-blue-50 rounded-xl text-xs sm:text-sm font-semibold transition-colors disabled:opacity-60 mb-3 sm:mb-4"
            >
              <svg width={12} sm:width={14} height={12} sm:height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
                className={regenerating ? "animate-spin" : ""}>
                <path d="M1 4v6h6M23 20v-6h-6M20.49 9A9 9 0 005.64 5.64L1 10M23 14l-4.64 4.36A9 9 0 013.51 15" />
              </svg>
              {regenerating ? "Regenerating..." : "Regenerate Credentials"}
            </button>

            {/* Warning */}
            <div className="flex items-start gap-2 sm:gap-2.5 bg-amber-50 border border-amber-200 rounded-xl px-3 sm:px-3.5 py-2.5 sm:py-3">
              <svg width={14} sm:width={16} height={14} sm:height={16} viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth={2} className="shrink-0 mt-0.5">
                <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              <div>
                <p className="text-[11px] sm:text-xs font-semibold text-amber-800">Do not share your API keys with anyone.</p>
                <p className="text-[10px] sm:text-xs text-amber-700 mt-0.5">Keep your credentials secure.</p>
              </div>
            </div>
          </div>

          {/* API Documentation */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5">
            <h2 className="text-sm sm:text-base font-bold text-gray-900 mb-3 sm:mb-4">API Documentation</h2>
            <div className="space-y-1.5 sm:space-y-2">
              {[
                {
                  icon: <svg width={16} sm:width={18} height={16} sm:height={18} viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth={1.8}><path d="M4 19.5A2.5 2.5 0 016.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" /></svg>,
                  bg: "bg-indigo-50",
                  title: "API Integration Guide",
                  desc: "Step-by-step guide to integrate with Bridge Pay APIs",
                  page: "/dashboard/api-integration",
                },
                // {
                //   icon: <svg width={16} sm:width={18} height={16} sm:height={18} viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth={1.8}><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>,
                //   bg: "bg-amber-50",
                //   title: "Error Codes Documentation",
                //   desc: "Understand API error codes and their solutions",
                //   page: "/dashboard/error-codes",
                // },
              ].map((doc) => (
                <button
                  key={doc.title}
                  className="w-full flex items-center gap-2.5 sm:gap-3 p-3 sm:p-3.5 border border-gray-100 rounded-xl hover:bg-gray-50 hover:border-gray-200 transition-all text-left group"
                  onClick={() => navigate(doc.page)}
                >
                  <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl ${doc.bg} flex items-center justify-center shrink-0`}>
                    {doc.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs sm:text-sm font-semibold text-gray-800 group-hover:text-blue-600 transition-colors truncate">{doc.title}</div>
                    <div className="text-[10px] sm:text-xs text-gray-500 mt-0.5 truncate">{doc.desc}</div>
                  </div>
                  <svg width={12} sm:width={14} height={12} sm:height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="text-gray-400 shrink-0">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              ))}
            </div>
          </div>

          {/* Need Help */}
          <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5">
            <h2 className="text-sm sm:text-base font-bold text-gray-900 mb-1">Need Help?</h2>
            <p className="text-[10px] sm:text-xs text-gray-400 mb-3 sm:mb-4 leading-relaxed">If you face any issues with integration or have any questions, our support team is here to help you.</p>
            <button className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-200 rounded-xl text-xs sm:text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors w-full">
              <svg width={12} sm:width={14} height={12} sm:height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
              </svg>
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}