
// import { useState, useRef } from "react";
// import {
//   Copy, Download, FileText, CheckCircle, RefreshCw,
//   Lock, Send, Search, Webhook, AlertTriangle, Code2,
//   ChevronDown, ChevronRight, Bell, Store, Calendar,
//   Package, Activity, ArrowRight, Home, ShieldCheck,
//   Layers, BookOpen, Wrench, BarChart2, ExternalLink,
//   ToggleLeft,
// } from "lucide-react";
// import DateRangePicker from "../../components/DatePicker";
// // ─── CONSTANTS ────────────────────────────────────────────────────────────────

// const API_BASE_URL = "https://api.bridgepay.com";
// const MERCHANT_ID  = "MID123456";

// const TOOLS = [
//   { label: "Postman Collection", sub: "Download collection",       bg: "bg-orange-100",  icon: Package,       iconColor: "text-orange-600" },
//   { label: "Webhook Tester",     sub: "Test your webhook endpoint", bg: "bg-purple-100",  icon: Webhook,       iconColor: "text-purple-600" },
//   { label: "API Changelog",      sub: "See recent updates",         bg: "bg-blue-100",    icon: FileText,      iconColor: "text-blue-600" },
//   { label: "Rate Limits",        sub: "View API rate limits",       bg: "bg-green-100",   icon: BarChart2,     iconColor: "text-green-600" },
//   { label: "Error Code Reference",sub:"View all error codes",       bg: "bg-red-100",     icon: AlertTriangle, iconColor: "text-red-600" },
// ];

// const API_SECTIONS = [
//   {
//     n: 1,
//     title:    "Authentication",
//     sub:      "Generate access token using your API Key to authorize all API requests.",
//     method:   "POST",
//     endpoint: "/api/auth/token",
//     reqLabel: "Request (JSON)",
//     resLabel: "Response (JSON)",
//     req: [
//       { n: 1, parts: [{ t: "p", v: "{" }] },
//       { n: 2, parts: [{ t: "k", v: '  "merchant_id"' }, { t: "p", v: ": " }, { t: "s", v: '"MID123456"' }, { t: "p", v: "," }] },
//       { n: 3, parts: [{ t: "k", v: '  "api_key"' },     { t: "p", v: ": " }, { t: "s", v: '"sk_live****************"' }] },
//       { n: 4, parts: [{ t: "p", v: "}" }] },
//     ],
//     res: [
//       { n: 1, parts: [{ t: "p", v: "{" }] },
//       { n: 2, parts: [{ t: "k", v: '  "status"' }, { t: "p", v: ": " }, { t: "b", v: "true" }, { t: "p", v: "," }] },
//       { n: 3, parts: [{ t: "k", v: '  "token"' }, { t: "p", v: ": " }, { t: "s", v: '"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."' }] },
//       { n: 4, parts: [{ t: "p", v: "}" }] },
//     ],
//   },
//   {
//     n: 2,
//     title:    "Create Payout",
//     sub:      "Create a new payout request to transfer money to beneficiary account.",
//     method:   "POST",
//     endpoint: "/api/payout/create",
//     reqLabel: "Request (JSON)",
//     resLabel: "Success Response (JSON)",
//     req: [
//       { n: 1, parts: [{ t: "p", v: "{" }] },
//       { n: 2, parts: [{ t: "k", v: '  "amount"' },         { t: "p", v: ": " }, { t: "n", v: "1000" },                           { t: "p", v: "," }] },
//       { n: 3, parts: [{ t: "k", v: '  "order_id"' },       { t: "p", v: ": " }, { t: "s", v: '"ORD123"' },                        { t: "p", v: "," }] },
//       { n: 4, parts: [{ t: "k", v: '  "name"' },           { t: "p", v: ": " }, { t: "s", v: '"Harsh Singh"' },                   { t: "p", v: "," }] },
//       { n: 5, parts: [{ t: "k", v: '  "account_number"' }, { t: "p", v: ": " }, { t: "s", v: '"1234567890"' },                    { t: "p", v: "," }] },
//       { n: 6, parts: [{ t: "k", v: '  "ifsc"' },           { t: "p", v: ": " }, { t: "s", v: '"SBIN0001234"' },                   { t: "p", v: "," }] },
//       { n: 7, parts: [{ t: "k", v: '  "remarks"' },        { t: "p", v: ": " }, { t: "s", v: '"Payout for order ORD123"' }] },
//       { n: 8, parts: [{ t: "p", v: "}" }] },
//     ],
//     res: [
//       { n: 1, parts: [{ t: "p", v: "{" }] },
//       { n: 2, parts: [{ t: "k", v: '  "status"' },         { t: "p", v: ": " }, { t: "b", v: "true" },                            { t: "p", v: "," }] },
//       { n: 3, parts: [{ t: "k", v: '  "message"' },        { t: "p", v: ": " }, { t: "s", v: '"Payout Initiated"' },              { t: "p", v: "," }] },
//       { n: 4, parts: [{ t: "k", v: '  "transaction_id"' }, { t: "p", v: ": " }, { t: "s", v: '"TXN123456789"' }] },
//       { n: 5, parts: [{ t: "p", v: "}" }] },
//     ],
//   },
//   {
//     n: 3,
//     title:    "Check Status",
//     sub:      "Check the status of your payout using transaction ID.",
//     method:   "POST",
//     endpoint: "/api/payout/status",
//     reqLabel: "Request (JSON)",
//     resLabel: "Response (JSON)",
//     req: [
//       { n: 1, parts: [{ t: "p", v: "{" }] },
//       { n: 2, parts: [{ t: "k", v: '  "transaction_id"' }, { t: "p", v: ": " }, { t: "s", v: '"TXN123456789"' }] },
//       { n: 3, parts: [{ t: "p", v: "}" }] },
//     ],
//     res: [
//       { n: 1, parts: [{ t: "p", v: "{" }] },
//       { n: 2, parts: [{ t: "k", v: '  "status"' },       { t: "p", v: ": " }, { t: "s", v: '"SUCCESS"' },               { t: "p", v: "," }] },
//       { n: 3, parts: [{ t: "k", v: '  "utr"' },          { t: "p", v: ": " }, { t: "s", v: '"UTR1234567890"' },          { t: "p", v: "," }] },
//       { n: 4, parts: [{ t: "k", v: '  "completed_at"' }, { t: "p", v: ": " }, { t: "s", v: '"2025-05-14 11:20:30"' }] },
//       { n: 5, parts: [{ t: "p", v: "}" }] },
//     ],
//   },
// ];

// // ─── TOKEN COLORS ─────────────────────────────────────────────────────────────

// const TOKEN_CLASS = {
//   k: "text-blue-300",     // key
//   s: "text-amber-300",    // string value
//   n: "text-green-300",    // number
//   b: "text-purple-300",   // boolean
//   p: "text-gray-400",     // punctuation / plain
// };

// // ─── HELPER COMPONENTS ────────────────────────────────────────────────────────

// // Enhanced CopyButton with proper clipboard API and toast notification
// function CopyButton({ text, className = "", showToast = true }) {
//   const [copied, setCopied] = useState(false);
//   const [toast, setToast] = useState(null);

//   const handleCopy = async () => {
//     if (!text) return;
    
//     try {
//       await navigator.clipboard.writeText(text);
//       setCopied(true);
//       if (showToast) {
//         setToast("Copied to clipboard!");
//         setTimeout(() => setToast(null), 2000);
//       }
//       setTimeout(() => setCopied(false), 1500);
//     } catch (err) {
//       console.error('Failed to copy:', err);
//       setToast("Failed to copy");
//       setTimeout(() => setToast(null), 2000);
//     }
//   };

//   return (
//     <>
//       <button
//         onClick={handleCopy}
//         title="Copy to clipboard"
//         className={`flex items-center justify-center transition-colors ${className}`}
//       >
//         {copied
//           ? <CheckCircle size={13} className="text-green-400" />
//           : <Copy size={13} className="text-gray-400 hover:text-gray-200" />
//         }
//       </button>
//       {toast && (
//         <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-3 py-1.5 rounded-lg shadow-lg z-50 whitespace-nowrap">
//           {toast}
//         </div>
//       )}
//     </>
//   );
// }

// function MethodBadge({ method }) {
//   return (
//     <span className="bg-blue-100 text-blue-700 text-[10px] sm:text-[11px] font-bold px-1.5 sm:px-2 py-0.5 rounded whitespace-nowrap">
//       {method}
//     </span>
//   );
// }

// function CodeLine({ line }) {
//   return (
//     <div className="leading-[1.65] whitespace-pre-wrap wrap-break-word">
//       {line.parts.map((part, i) => (
//         <span key={i} className={`font-mono text-[10px] sm:text-[11.5px] ${TOKEN_CLASS[part.t]}`}>
//           {part.v}
//         </span>
//       ))}
//     </div>
//   );
// }

// function CodePanel({ label, lines }) {
//   const raw = lines.map(l => l.parts.map(p => p.v).join("")).join("\n");
  
//   return (
//     <div className="flex-1 border border-gray-200 rounded-lg overflow-hidden min-w-0">
//       {/* header */}
//       <div className="flex items-center justify-between px-2.5 sm:px-3 py-1.5 sm:py-2 bg-gray-50 border-b border-gray-200">
//         <span className="text-[11px] sm:text-[12px] font-semibold text-gray-600 truncate">{label}</span>
//         <CopyButton text={raw} className="ml-2" />
//       </div>
//       {/* body */}
//       <div className="bg-[#0f1117] px-2.5 sm:px-3 py-2.5 sm:py-3 overflow-x-auto">
//         <div className="flex gap-2 sm:gap-3 min-w-70">
//           {/* line numbers */}
//           <div className="select-none text-right shrink-0">
//             {lines.map(l => (
//               <div key={l.n} className="text-[10px] sm:text-[11px] leading-[1.65] text-gray-600">{l.n}</div>
//             ))}
//           </div>
//           {/* code */}
//           <div className="flex-1 min-w-0">
//             {lines.map(l => <CodeLine key={l.n} line={l} />)}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function ApiSection({ section }) {
//   const epText = section.endpoint;
  
//   return (
//     <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-5">
//       {/* row: title + endpoint */}
//       <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4 mb-2 sm:mb-1">
//         <div>
//           <h3 className="text-[14px] sm:text-[15px] font-bold text-gray-900">
//             {section.n}. {section.title}
//           </h3>
//           <p className="text-[11px] sm:text-[12px] text-gray-400 mt-0.5">{section.sub}</p>
//         </div>
//         <div className="flex flex-wrap items-center gap-2 shrink-0">
//           <MethodBadge method={section.method} />
//           <span className="text-[11px] sm:text-[12px] font-mono text-gray-600 bg-gray-100 px-1.5 sm:px-2 py-0.5 rounded truncate max-w-37.5 sm:max-w-none">
//             {section.endpoint}
//           </span>
//           <CopyButton text={epText} className="shrink-0" />
//         </div>
//       </div>

//       {/* code panels */}
//       <div className="flex flex-col sm:flex-row gap-3 mt-3 sm:mt-4">
//         <CodePanel label={section.reqLabel} lines={section.req} />
//         <CodePanel label={section.resLabel} lines={section.res} />
//       </div>
//     </div>
//   );
// }

// // ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

// export default function ApiIntegrationGuide() {
//   const [activeLeftNav, setActiveLeftNav] = useState("intro");
//   const [urlCopied,     setUrlCopied]     = useState(false);
//   const [midCopied,     setMidCopied]     = useState(false);
//   const [toast, setToast] = useState(null);

//   const showToastMessage = (message) => {
//     setToast(message);
//     setTimeout(() => setToast(null), 2000);
//   };

//   const handleCopyUrl = async () => {
//     try {
//       await navigator.clipboard.writeText(API_BASE_URL);
//       setUrlCopied(true);
//       showToastMessage("Base URL copied!");
//       setTimeout(() => setUrlCopied(false), 1500);
//     } catch (err) {
//       showToastMessage("Failed to copy");
//     }
//   };

//   const handleCopyMid = async () => {
//     try {
//       await navigator.clipboard.writeText(MERCHANT_ID);
//       setMidCopied(true);
//       showToastMessage("Merchant ID copied!");
//       setTimeout(() => setMidCopied(false), 1500);
//     } catch (err) {
//       showToastMessage("Failed to copy");
//     }
//   };

//   const [dateRange, setDateRange] = useState(null);

//   const handleDateChange = (dateData) => {
//     if (dateData) {
//       setDateRange(dateData);
//       console.log('Date Range Selected:', {
//         startDate: dateData.startDate,
//         endDate: dateData.endDate,
//         startFormatted: dateData.startFormatted,
//         endFormatted: dateData.endFormatted,
//         dateRange: dateData.dateRange
//       });
//     } else {
//       console.log('Date range cleared');
//     }
//   };
  
//   return (
//     <div className="flex flex-col h-screen overflow-hidden bg-gray-50 font-sans text-sm">

//       {/* Toast Notification */}
//       {toast && (
//         <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-3 py-1.5 rounded-lg shadow-lg z-50 whitespace-nowrap">
//           {toast}
//         </div>
//       )}

//       {/* ── TOP HEADER ── */}
//       <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
//         <div>
//           <h1 className="text-lg sm:text-xl font-bold text-gray-900">API Integration Guide</h1>
//           <p className="text-[11px] sm:text-xs text-gray-400 mt-0.5">
//             Integrate once, pay out anytime. Powerful APIs for your business.
//           </p>
//         </div>
//         <div className="flex flex-wrap items-center gap-2 sm:gap-3">
//           {/* date range */}
//           <DateRangePicker 
//             onDateChange={handleDateChange}
//             placeholder="14 May, 2025 - 14 May, 2025"
//           />

//           {/* merchant dropdown */}
//           <button className="flex items-center gap-2 border border-gray-200 rounded-lg px-2.5 sm:px-3 py-1.5 sm:py-2 hover:bg-gray-50 transition-colors shrink-0">
//             <div className="w-6 h-6 bg-blue-600 rounded-md flex items-center justify-center shrink-0">
//               <Store size={12} sm:size={13} className="text-white" />
//             </div>
//             <div className="text-left min-w-0">
//               <p className="text-[11px] sm:text-[12px] font-semibold text-gray-800 leading-tight truncate">Demo Store</p>
//               <p className="text-[9px] sm:text-[10px] text-gray-400 leading-tight">MID: MID123456</p>
//             </div>
//             <ChevronDown size={11} sm:size={12} className="text-gray-400 shrink-0" />
//           </button>
//         </div>
//       </header>

//       {/* ── SCROLLABLE CONTENT ── */}
//       <div className="flex-1 overflow-hidden flex flex-col md:flex-row">

//         {/* Main scroll area */}
//         <div className="flex-1 overflow-y-auto p-3 sm:p-5 space-y-4">

//           {/* ── API OVERVIEW CARD ── */}
//           <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-5">
//             <h2 className="text-[14px] sm:text-[15px] font-bold text-gray-900 mb-0.5">API Overview</h2>
//             <p className="text-[11px] sm:text-[12px] text-gray-400 mb-3 sm:mb-4">
//               Use the below details to make API requests to Bridge Pay.
//             </p>

//             {/* 2x2 grid on mobile, 4 column on desktop */}
//             <div className="grid grid-cols-2 md:grid-cols-4 border border-gray-200 rounded-xl overflow-hidden mb-4">
//               {[
//                 {
//                   label: "Merchant ID",
//                   content: (
//                     <div className="flex items-center gap-1 text-[12px] sm:text-[13px] font-semibold text-gray-900 flex-wrap">
//                       <span className="truncate">{MERCHANT_ID}</span>
//                       <button onClick={handleCopyMid} className="text-gray-300 hover:text-gray-500 transition-colors shrink-0" title="Copy Merchant ID">
//                         {midCopied
//                           ? <CheckCircle size={11} sm:size={12} className="text-green-500" />
//                           : <Copy size={11} sm:size={12} />}
//                       </button>
//                     </div>
//                   ),
//                 },
//                 {
//                   label: "Environment",
//                   content: (
//                     <span className="bg-green-100 text-green-700 text-[10px] sm:text-[11px] font-semibold px-2 py-0.5 rounded-full inline-block">
//                       Production
//                     </span>
//                   ),
//                 },
//                 {
//                   label: "Base URL",
//                   content: (
//                     <div className="flex items-center gap-1 text-[11px] sm:text-[12px] font-semibold text-gray-900 flex-wrap">
//                       <span className="truncate max-w-30 sm:max-w-none">{API_BASE_URL}</span>
//                       <button onClick={handleCopyUrl} className="text-gray-300 hover:text-gray-500 transition-colors shrink-0" title="Copy Base URL">
//                         {urlCopied
//                           ? <CheckCircle size={11} sm:size={12} className="text-green-500" />
//                           : <Copy size={11} sm:size={12} />}
//                       </button>
//                     </div>
//                   ),
//                 },
//                 {
//                   label: "API Version",
//                   content: <span className="text-[12px] sm:text-[13px] font-semibold text-gray-900">v1</span>,
//                 },
//               ].map(({ label, content }, i) => (
//                 <div
//                   key={label}
//                   className={`px-3 sm:px-4 py-2.5 sm:py-3 ${
//                     i % 2 === 0 && i < 2 ? "border-r border-gray-200" : 
//                     i % 2 === 1 && i < 2 ? "" :
//                     i === 2 && i < 3 ? "border-r border-gray-200" : ""
//                   } ${i < 2 ? "border-b border-gray-200" : ""}`}
//                 >
//                   <p className="text-[10px] sm:text-[11px] text-gray-400 font-medium mb-1 sm:mb-1.5">{label}</p>
//                   {content}
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* ── API SECTIONS (1,2,3) ── */}
//           {API_SECTIONS.map(section => (
//             <ApiSection key={section.n} section={section} />
//           ))}
//         </div>

//         {/* ── RIGHT PANEL ── */}
//         <aside className="w-full md:w-65 lg:w-70 shrink-0 overflow-y-auto bg-white border-t md:border-t-0 md:border-l border-gray-200 p-3 sm:p-4 space-y-3 sm:space-y-4">
//           {/* API Status */}
//           <div className="border border-gray-200 rounded-xl p-3 sm:p-4">
//             <div className="flex items-center justify-between mb-2 sm:mb-3">
//               <p className="text-[12px] sm:text-[13px] font-bold text-gray-800">API Status</p>
//               <span className="flex items-center gap-1 text-[10px] sm:text-[11px] font-semibold text-green-700 bg-green-50 border border-green-200 px-1.5 sm:px-2 py-0.5 rounded-full">
//                 <CheckCircle size={9} sm:size={10} /> Active
//               </span>
//             </div>
//             <div className="space-y-0">
//               {[
//                 ["Success Rate (Today)", "99.20%"],
//                 ["Today's API Hits", "12,540"],
//                 ["Total API Hits (This Month)", "3,45,670"],
//               ].map(([label, value]) => (
//                 <div key={label} className="flex justify-between items-center py-1.5 sm:py-2 border-b border-gray-50 last:border-0">
//                   <span className="text-[10px] sm:text-[11px] text-gray-400 leading-tight">{label}</span>
//                   <span className="text-[11px] sm:text-[12px] font-bold text-gray-800">{value}</span>
//                 </div>
//               ))}
//               <div className="flex justify-between items-center pt-1.5 sm:pt-2">
//                 <span className="text-[10px] sm:text-[11px] text-gray-400">Last Updated</span>
//                 <div className="flex items-center gap-1">
//                   <span className="text-[10px] sm:text-[11px] text-gray-700">2 min ago</span>
//                   <RefreshCw size={10} sm:size={11} className="text-blue-500 cursor-pointer hover:text-blue-700 transition-colors" />
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Need Custom Integration */}
//           <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 sm:p-4">
//             <p className="text-[12px] sm:text-[13px] font-bold text-blue-800 mb-1 sm:mb-1.5">Need Custom Integration?</p>
//             <p className="text-[10px] sm:text-[11px] text-blue-600 leading-relaxed mb-2.5 sm:mb-3">
//               Our team can help you with custom integration and faster go-live.
//             </p>
//             <button className="w-full flex items-center justify-center gap-1.5 sm:gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-2.5 sm:px-3 py-1.5 sm:py-2 text-[11px] sm:text-[12px] font-semibold transition-colors">
//               Contact Integration Team <ArrowRight size={11} sm:size={13} />
//             </button>
//           </div>
//         </aside>
//       </div>
//     </div>
//   );
// }
// src/pages/view/ApiIntegrationGuide.jsx
import { useState, useEffect, useRef } from "react";
import {
  Copy, Download, FileText, CheckCircle, RefreshCw,
  Lock, Send, Search, Webhook, AlertTriangle, Code2,
  ChevronDown, ChevronRight, Bell, Store, Calendar,
  Package, Activity, ArrowRight, Home, ShieldCheck,
  Layers, BookOpen, Wrench, BarChart2, ExternalLink,
  ToggleLeft,
} from "lucide-react";
import DateRangePicker from "../../components/DatePicker";
import apiIntegrationService from "../../services/ApiIntegrationServices";

// ─── TOKEN COLORS ─────────────────────────────────────────────────────────────

const TOKEN_CLASS = {
  k: "text-blue-300",     // key
  s: "text-amber-300",    // string value
  n: "text-green-300",    // number
  b: "text-purple-300",   // boolean
  p: "text-gray-400",     // punctuation / plain
};

// ─── HELPER COMPONENTS ────────────────────────────────────────────────────────

// Enhanced CopyButton with proper clipboard API and toast notification
function CopyButton({ text, className = "", showToast = true }) {
  const [copied, setCopied] = useState(false);
  const [toast, setToast] = useState(null);

  const handleCopy = async () => {
    if (!text) return;
    
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      if (showToast) {
        setToast("Copied to clipboard!");
        setTimeout(() => setToast(null), 2000);
      }
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error('Failed to copy:', err);
      setToast("Failed to copy");
      setTimeout(() => setToast(null), 2000);
    }
  };

  return (
    <>
      <button
        onClick={handleCopy}
        title="Copy to clipboard"
        className={`flex items-center justify-center transition-colors ${className}`}
      >
        {copied
          ? <CheckCircle size={13} className="text-green-400" />
          : <Copy size={13} className="text-gray-400 hover:text-gray-200" />
        }
      </button>
      {toast && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-3 py-1.5 rounded-lg shadow-lg z-50 whitespace-nowrap">
          {toast}
        </div>
      )}
    </>
  );
}

function MethodBadge({ method }) {
  return (
    <span className="bg-blue-100 text-blue-700 text-[10px] sm:text-[11px] font-bold px-1.5 sm:px-2 py-0.5 rounded whitespace-nowrap">
      {method}
    </span>
  );
}

function CodeLine({ line }) {
  return (
    <div className="leading-[1.65] whitespace-pre-wrap wrap-break-word">
      {line.parts.map((part, i) => (
        <span key={i} className={`font-mono text-[10px] sm:text-[11.5px] ${TOKEN_CLASS[part.t]}`}>
          {part.v}
        </span>
      ))}
    </div>
  );
}

function CodePanel({ label, lines }) {
  const raw = lines.map(l => l.parts.map(p => p.v).join("")).join("\n");
  
  return (
    <div className="flex-1 border border-gray-200 rounded-lg overflow-hidden min-w-0">
      {/* header */}
      <div className="flex items-center justify-between px-2.5 sm:px-3 py-1.5 sm:py-2 bg-gray-50 border-b border-gray-200">
        <span className="text-[11px] sm:text-[12px] font-semibold text-gray-600 truncate">{label}</span>
        <CopyButton text={raw} className="ml-2" />
      </div>
      {/* body */}
      <div className="bg-[#0f1117] px-2.5 sm:px-3 py-2.5 sm:py-3 overflow-x-auto">
        <div className="flex gap-2 sm:gap-3 min-w-70">
          {/* line numbers */}
          <div className="select-none text-right shrink-0">
            {lines.map(l => (
              <div key={l.n} className="text-[10px] sm:text-[11px] leading-[1.65] text-gray-600">{l.n}</div>
            ))}
          </div>
          {/* code */}
          <div className="flex-1 min-w-0">
            {lines.map(l => <CodeLine key={l.n} line={l} />)}
          </div>
        </div>
      </div>
    </div>
  );
}

function ApiSection({ section }) {
  const epText = section.url || section.endpoint;
  
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-5">
      {/* row: title + endpoint */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4 mb-2 sm:mb-1">
        <div>
          <h3 className="text-[14px] sm:text-[15px] font-bold text-gray-900">
            {section.n}. {section.title}
          </h3>
          <p className="text-[11px] sm:text-[12px] text-gray-400 mt-0.5">{section.description}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <MethodBadge method={section.method} />
          <span className="text-[11px] sm:text-[12px] font-mono text-gray-600 bg-gray-100 px-1.5 sm:px-2 py-0.5 rounded truncate max-w-37.5 sm:max-w-none">
            {section.url || section.endpoint}
          </span>
          <CopyButton text={epText} className="shrink-0" />
        </div>
      </div>

      {/* code panels */}
      <div className="flex flex-col sm:flex-row gap-3 mt-3 sm:mt-4">
        {section.request && (
          <CodePanel 
            label={section.reqLabel || "Request (JSON)"} 
            lines={formatRequestData(section.request)} 
          />
        )}
        {section.response && section.response.success && (
          <CodePanel 
            label={section.resLabel || "Response (JSON)"} 
            lines={formatResponseData(section.response.success.example)} 
          />
        )}
      </div>
    </div>
  );
}

// ─── Format Helpers ──────────────────────────────────────────────────────────
function formatRequestData(request) {
  const lines = [];
  let lineNum = 1;
  
  if (request.required_fields) {
    lines.push({ n: lineNum++, parts: [{ t: "p", v: "{" }] });
    
    // Required fields
    Object.entries(request.required_fields).forEach(([key, value], index, array) => {
      const isLast = index === array.length - 1 && !request.optional_fields;
      const example = value.example || `"${key}_value"`;
      lines.push({ 
        n: lineNum++, 
        parts: [
          { t: "k", v: `  "${key}"` },
          { t: "p", v: ": " },
          { t: typeof example === 'string' ? "s" : "n", v: JSON.stringify(example) },
          { t: "p", v: isLast ? "" : "," }
        ]
      });
    });
    
    // Optional fields
    if (request.optional_fields) {
      Object.entries(request.optional_fields).forEach(([key, value], index, array) => {
        const isLast = index === array.length - 1;
        const example = value.example || `"${key}_value"`;
        lines.push({ 
          n: lineNum++, 
          parts: [
            { t: "k", v: `  "${key}"` },
            { t: "p", v: ": " },
            { t: typeof example === 'string' ? "s" : "n", v: JSON.stringify(example) },
            { t: "p", v: isLast ? "" : "," }
          ]
        });
      });
    }
    
    lines.push({ n: lineNum++, parts: [{ t: "p", v: "}" }] });
  } else if (request.example) {
    // If there's an example directly
    const exampleStr = JSON.stringify(request.example, null, 2);
    exampleStr.split('\n').forEach((line, index) => {
      const trimmed = line.replace(/^ {2}/, '');
      lines.push({ n: lineNum++, parts: [{ t: "p", v: trimmed }] });
    });
  }
  
  return lines;
}

function formatResponseData(response) {
  const lines = [];
  let lineNum = 1;
  
  if (response) {
    const responseStr = JSON.stringify(response, null, 2);
    responseStr.split('\n').forEach((line, index) => {
      const trimmed = line.replace(/^ {2}/, '');
      const parts = [];
      // Simple parsing for coloring
      if (trimmed.includes('"') && trimmed.includes(':')) {
        const colonIndex = trimmed.indexOf(':');
        if (colonIndex > 0) {
          parts.push({ t: "k", v: trimmed.substring(0, colonIndex + 1) });
          const rest = trimmed.substring(colonIndex + 1);
          if (rest.includes('true') || rest.includes('false')) {
            parts.push({ t: "b", v: rest });
          } else if (rest.match(/\d+/)) {
            parts.push({ t: "n", v: rest });
          } else {
            parts.push({ t: "s", v: rest });
          }
        } else {
          parts.push({ t: "p", v: trimmed });
        }
      } else {
        parts.push({ t: "p", v: trimmed });
      }
      lines.push({ n: lineNum++, parts });
    });
  }
  
  return lines;
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

export default function ApiIntegrationGuide() {
  const [activeLeftNav, setActiveLeftNav] = useState("intro");
  const [urlCopied,     setUrlCopied]     = useState(false);
  const [midCopied,     setMidCopied]     = useState(false);
  const [toast, setToast] = useState(null);
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [dateRange, setDateRange] = useState(null);

  const handleDateChange = (dateData) => {
    if (dateData) {
      setDateRange(dateData);
      console.log('Date Range Selected:', dateData);
    } else {
      console.log('Date range cleared');
    }
  };

  // ─── Fetch API Documentation ──────────────────────────────────────────────
  useEffect(() => {
    const fetchApiDoc = async () => {
      setLoading(true);
      try {
        const response = await apiIntegrationService.getApiDocumentation();
        console.log("API Documentation:", response);
        setApiData(response);
        setError(null);
      } catch (err) {
        console.error("Error fetching API documentation:", err);
        setError("Failed to load API documentation. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchApiDoc();
  }, []);

  const showToastMessage = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 2000);
  };

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(apiData?.base_url || "https://api.bridgepay.com");
      setUrlCopied(true);
      showToastMessage("Base URL copied!");
      setTimeout(() => setUrlCopied(false), 1500);
    } catch (err) {
      showToastMessage("Failed to copy");
    }
  };

  // ─── Loading State ──────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex flex-col h-screen overflow-hidden bg-gray-50 font-sans text-sm">
        <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-gray-900">API Integration Guide</h1>
            <p className="text-[11px] sm:text-xs text-gray-400 mt-0.5">Loading documentation...</p>
          </div>
        </header>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading API documentation...</p>
          </div>
        </div>
      </div>
    );
  }

  // ─── Error State ────────────────────────────────────────────────────────────
  if (error) {
    return (
      <div className="flex flex-col h-screen overflow-hidden bg-gray-50 font-sans text-sm">
        <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-gray-900">API Integration Guide</h1>
            <p className="text-[11px] sm:text-xs text-gray-400 mt-0.5">Failed to load documentation</p>
          </div>
        </header>
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="text-center">
            <AlertTriangle size={48} className="text-red-500 mx-auto mb-4" />
            <p className="text-red-600 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  const doc = apiData || {};
  const baseUrl = doc.base_url || "https://api.bridgepay.com";
  const merchantId = "MRC1782461505559"; // You can get this from localStorage or auth context

  // ─── Prepare API Sections ──────────────────────────────────────────────────
  const apiSections = doc.endpoints ? doc.endpoints.map((endpoint, index) => ({
    n: index + 1,
    title: endpoint.title || `Endpoint ${index + 1}`,
    description: endpoint.description || "",
    method: endpoint.method || "POST",
    url: endpoint.url || "",
    endpoint: endpoint.url || "",
    reqLabel: "Request (JSON)",
    resLabel: "Response (JSON)",
    request: endpoint.request || null,
    response: endpoint.response || null,
  })) : [];

  // ─── Transaction Statuses ──────────────────────────────────────────────────
  const statuses = doc.transaction_statuses || {};
  const chargesInfo = doc.charges_info || {};
  const notes = doc.notes || [];

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gray-50 font-sans text-sm">

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-3 py-1.5 rounded-lg shadow-lg z-50 whitespace-nowrap">
          {toast}
        </div>
      )}

      {/* ── TOP HEADER ── */}
      <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-gray-900">{doc.title || "API Integration Guide"}</h1>
          <p className="text-[11px] sm:text-xs text-gray-400 mt-0.5">
            {doc.version ? `Version ${doc.version}` : ""} - Integrate once, pay out anytime.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {/* date range */}
          <DateRangePicker 
            onDateChange={handleDateChange}
            placeholder="14 May, 2025 - 14 May, 2025"
          />

          {/* merchant dropdown */}
          <button className="flex items-center gap-2 border border-gray-200 rounded-lg px-2.5 sm:px-3 py-1.5 sm:py-2 hover:bg-gray-50 transition-colors shrink-0">
            <div className="w-6 h-6 bg-blue-600 rounded-md flex items-center justify-center shrink-0">
              <Store size={12} sm:size={13} className="text-white" />
            </div>
            <div className="text-left min-w-0">
              <p className="text-[11px] sm:text-[12px] font-semibold text-gray-800 leading-tight truncate">Demo Store</p>
              <p className="text-[9px] sm:text-[10px] text-gray-400 leading-tight">MID: {merchantId}</p>
            </div>
            <ChevronDown size={11} sm:size={12} className="text-gray-400 shrink-0" />
          </button>
        </div>
      </header>

      {/* ── SCROLLABLE CONTENT ── */}
      <div className="flex-1 overflow-hidden flex flex-col md:flex-row">

        {/* Main scroll area */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-5 space-y-4">

          {/* ── API OVERVIEW CARD ── */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-5">
            <h2 className="text-[14px] sm:text-[15px] font-bold text-gray-900 mb-0.5">API Overview</h2>
            <p className="text-[11px] sm:text-[12px] text-gray-400 mb-3 sm:mb-4">
              Use the below details to make API requests to Bridge Pay.
            </p>

            {/* 2x2 grid on mobile, 4 column on desktop */}
            <div className="grid grid-cols-2 md:grid-cols-4 border border-gray-200 rounded-xl overflow-hidden mb-4">
              {[
                {
                  label: "Merchant ID",
                  content: (
                    <div className="flex items-center gap-1 text-[12px] sm:text-[13px] font-semibold text-gray-900 flex-wrap">
                      <span className="truncate">{merchantId}</span>
                      <button onClick={() => {
                        navigator.clipboard.writeText(merchantId);
                        setMidCopied(true);
                        showToastMessage("Merchant ID copied!");
                        setTimeout(() => setMidCopied(false), 1500);
                      }} className="text-gray-300 hover:text-gray-500 transition-colors shrink-0" title="Copy Merchant ID">
                        {midCopied
                          ? <CheckCircle size={11} sm:size={12} className="text-green-500" />
                          : <Copy size={11} sm:size={12} />}
                      </button>
                    </div>
                  ),
                },
                {
                  label: "Environment",
                  content: (
                    <span className="bg-green-100 text-green-700 text-[10px] sm:text-[11px] font-semibold px-2 py-0.5 rounded-full inline-block">
                      Production
                    </span>
                  ),
                },
                {
                  label: "Base URL",
                  content: (
                    <div className="flex items-center gap-1 text-[11px] sm:text-[12px] font-semibold text-gray-900 flex-wrap">
                      <span className="truncate max-w-30 sm:max-w-none">{baseUrl}</span>
                      <button onClick={handleCopyUrl} className="text-gray-300 hover:text-gray-500 transition-colors shrink-0" title="Copy Base URL">
                        {urlCopied
                          ? <CheckCircle size={11} sm:size={12} className="text-green-500" />
                          : <Copy size={11} sm:size={12} />}
                      </button>
                    </div>
                  ),
                },
                {
                  label: "API Version",
                  content: <span className="text-[12px] sm:text-[13px] font-semibold text-gray-900">{doc.version || "v1"}</span>,
                },
              ].map(({ label, content }, i) => (
                <div
                  key={label}
                  className={`px-3 sm:px-4 py-2.5 sm:py-3 ${
                    i % 2 === 0 && i < 2 ? "border-r border-gray-200" : 
                    i % 2 === 1 && i < 2 ? "" :
                    i === 2 && i < 3 ? "border-r border-gray-200" : ""
                  } ${i < 2 ? "border-b border-gray-200" : ""}`}
                >
                  <p className="text-[10px] sm:text-[11px] text-gray-400 font-medium mb-1 sm:mb-1.5">{label}</p>
                  {content}
                </div>
              ))}
            </div>
          </div>

          {/* ── Authentication Section ── */}
          {doc.authentication && (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-5">
              <h3 className="text-[14px] sm:text-[15px] font-bold text-gray-900 mb-1">Authentication</h3>
              <p className="text-[11px] sm:text-[12px] text-gray-400 mb-3">{doc.authentication.description}</p>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 sm:p-4">
                {doc.authentication.fields && Object.entries(doc.authentication.fields).map(([key, value]) => (
                  <div key={key} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 py-1.5 border-b border-gray-100 last:border-0">
                    <span className="text-[11px] sm:text-[12px] font-semibold text-gray-700 sm:w-24">{key}</span>
                    <span className="text-[11px] sm:text-[12px] text-gray-500">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── API SECTIONS ── */}
          {apiSections.length > 0 ? (
            apiSections.map(section => (
              <ApiSection key={section.n} section={section} />
            ))
          ) : (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-5 text-center text-gray-400">
              No API endpoints available
            </div>
          )}

          {/* ── Transaction Statuses ── */}
          {Object.keys(statuses).length > 0 && (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-5">
              <h3 className="text-[14px] sm:text-[15px] font-bold text-gray-900 mb-3">Transaction Statuses</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {Object.entries(statuses).map(([status, description]) => (
                  <div key={status} className="flex items-start gap-2 p-2 bg-gray-50 rounded-lg border border-gray-100">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                      status === 'success' ? 'bg-green-100 text-green-700' :
                      status === 'failed' ? 'bg-red-100 text-red-700' :
                      status === 'processing' ? 'bg-blue-100 text-blue-700' :
                      status === 'initiated' ? 'bg-yellow-100 text-yellow-700' :
                      status === 'returned' ? 'bg-orange-100 text-orange-700' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {status}
                    </span>
                    <span className="text-[11px] text-gray-600">{description}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Charges Info ── */}
          {chargesInfo.description && (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-5">
              <h3 className="text-[14px] sm:text-[15px] font-bold text-gray-900 mb-2">Charges Information</h3>
              <p className="text-[11px] sm:text-[12px] text-gray-400 mb-3">{chargesInfo.description}</p>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 sm:p-4">
                {chargesInfo.charge_percent && (
                  <div className="flex justify-between py-1.5 border-b border-gray-100">
                    <span className="text-[11px] sm:text-[12px] text-gray-600">Charge</span>
                    <span className="text-[11px] sm:text-[12px] font-semibold text-gray-800">{chargesInfo.charge_percent}</span>
                  </div>
                )}
                {chargesInfo.gst && (
                  <div className="flex justify-between py-1.5 border-b border-gray-100">
                    <span className="text-[11px] sm:text-[12px] text-gray-600">GST</span>
                    <span className="text-[11px] sm:text-[12px] font-semibold text-gray-800">{chargesInfo.gst}</span>
                  </div>
                )}
                {chargesInfo.example && (
                  <div className="flex justify-between py-1.5">
                    <span className="text-[11px] sm:text-[12px] text-gray-600">Example Total</span>
                    <span className="text-[11px] sm:text-[12px] font-semibold text-gray-800">
                      Amount: ₹{chargesInfo.example.amount} + Charges: ₹{chargesInfo.example.charges} + GST: ₹{chargesInfo.example.gst} = ₹{chargesInfo.example.total_deducted_from_wallet}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── Notes ── */}
          {notes.length > 0 && (
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 sm:p-5">
              <h4 className="text-[12px] sm:text-[13px] font-bold text-blue-800 mb-2">📌 Important Notes</h4>
              <ul className="space-y-1.5">
                {notes.map((note, index) => (
                  <li key={index} className="text-[11px] sm:text-[12px] text-blue-700 flex items-start gap-2">
                    <span className="text-blue-400 mt-0.5">•</span>
                    {note}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* ── RIGHT PANEL ── */}
        <aside className="w-full md:w-65 lg:w-70 shrink-0 overflow-y-auto bg-white border-t md:border-t-0 md:border-l border-gray-200 p-3 sm:p-4 space-y-3 sm:space-y-4">
          {/* API Status */}
          <div className="border border-gray-200 rounded-xl p-3 sm:p-4">
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <p className="text-[12px] sm:text-[13px] font-bold text-gray-800">API Status</p>
              <span className="flex items-center gap-1 text-[10px] sm:text-[11px] font-semibold text-green-700 bg-green-50 border border-green-200 px-1.5 sm:px-2 py-0.5 rounded-full">
                <CheckCircle size={9} sm:size={10} /> Active
              </span>
            </div>
            <div className="space-y-0">
              {[
                ["Success Rate (Today)", "99.20%"],
                ["Today's API Hits", "12,540"],
                ["Total API Hits (This Month)", "3,45,670"],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between items-center py-1.5 sm:py-2 border-b border-gray-50 last:border-0">
                  <span className="text-[10px] sm:text-[11px] text-gray-400 leading-tight">{label}</span>
                  <span className="text-[11px] sm:text-[12px] font-bold text-gray-800">{value}</span>
                </div>
              ))}
              <div className="flex justify-between items-center pt-1.5 sm:pt-2">
                <span className="text-[10px] sm:text-[11px] text-gray-400">Last Updated</span>
                <div className="flex items-center gap-1">
                  <span className="text-[10px] sm:text-[11px] text-gray-700">2 min ago</span>
                  <RefreshCw size={10} sm:size={11} className="text-blue-500 cursor-pointer hover:text-blue-700 transition-colors" />
                </div>
              </div>
            </div>
          </div>

          {/* Need Custom Integration */}
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 sm:p-4">
            <p className="text-[12px] sm:text-[13px] font-bold text-blue-800 mb-1 sm:mb-1.5">Need Custom Integration?</p>
            <p className="text-[10px] sm:text-[11px] text-blue-600 leading-relaxed mb-2.5 sm:mb-3">
              Our team can help you with custom integration and faster go-live.
            </p>
            <button className="w-full flex items-center justify-center gap-1.5 sm:gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-2.5 sm:px-3 py-1.5 sm:py-2 text-[11px] sm:text-[12px] font-semibold transition-colors">
              Contact Integration Team <ArrowRight size={11} sm:size={13} />
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}