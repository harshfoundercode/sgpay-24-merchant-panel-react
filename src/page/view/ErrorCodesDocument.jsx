// import { useState } from "react";

// // ── Icons ──────────────────────────────────────────────────────────────────
// const Icon = ({ d, className = "w-5 h-5" }) => (
//   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={className}>
//     {Array.isArray(d) ? d.map((p, i) => <path key={i} d={p} />) : <path d={d} />}
//   </svg>
// );

// const BridgeLogo = () => (
//   <div className="flex items-center gap-2.5">
//     <div className="bg-blue-600 rounded-lg p-1.5">
//       <svg viewBox="0 0 24 24" className="w-6 h-6" fill="white"><path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM16 14a4 4 0 100 8 4 4 0 000-8z" /></svg>
//     </div>
//     <div>
//       <div className="font-bold text-white text-base leading-tight">Bridge Pay</div>
//       <div className="text-[11px] text-blue-300 leading-tight">Merchant Panel</div>
//     </div>
//   </div>
// );

// // ── Data ───────────────────────────────────────────────────────────────────
// const NAV = [
//   { label: "Dashboard", icon: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" },
//   { label: "Payout History", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" },
//   { label: "Reports", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z", hasChevron: true },
//   {
//     label: "API Integration", icon: "M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z", active: true, hasChevron: true,
//     children: ["API Integration Guide", "Sample Request & Response", "Webhooks", "API Keys", "SDKs & Libraries", "Postman Collection", "Error Code Reference"],
//   },
//   { label: "Settings", icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" },
//   { label: "Profile", icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" },
// ];

// const ALL_ERRORS = [
//   { code: "1001", http: "401 Unauthorized", category: "Authentication", message: "Invalid API Key", description: "The API key provided is invalid or missing.", solution: "Check your API key and try again." },
//   { code: "1002", http: "401 Unauthorized", category: "Authentication", message: "Invalid Merchant", description: "Merchant ID is invalid or not active.", solution: "Verify Merchant ID or contact support." },
//   { code: "1003", http: "400 Bad Request", category: "Validation", message: "Missing Required Parameter", description: "One or more required parameters are missing.", solution: "Ensure all required parameters are sent." },
//   { code: "1004", http: "400 Bad Request", category: "Validation", message: "Invalid Account Number", description: "The account number format is invalid.", solution: "Check and provide a valid account number." },
//   { code: "1005", http: "400 Bad Request", category: "Validation", message: "Invalid IFSC Code", description: "The IFSC code provided is invalid.", solution: "Verify IFSC code and try again." },
//   { code: "1006", http: "400 Bad Request", category: "Validation", message: "Invalid Mobile Number", description: "The mobile number format is invalid.", solution: "Provide a valid 10-digit mobile number." },
//   { code: "1007", http: "400 Bad Request", category: "Validation", message: "Invalid Amount", description: "The amount is invalid or less than minimum limit.", solution: "Check amount and minimum limit." },
//   { code: "1008", http: "400 Bad Request", category: "Validation", message: "Amount Exceeds Limit", description: "The amount exceeds the per transaction limit.", solution: "Reduce amount or contact support to increase limit." },
//   { code: "1009", http: "400 Bad Request", category: "Validation", message: "Unsupported Bank", description: "Payout to this bank is currently not supported.", solution: "Use another supported bank or contact support." },
//   { code: "1010", http: "409 Conflict", category: "Business", message: "Duplicate Order ID", description: "The order ID already exists in our system.", solution: "Use a unique order ID and try again." },
//   { code: "1011", http: "402 Payment Required", category: "Business", message: "Insufficient Balance", description: "Your wallet balance is insufficient.", solution: "Add funds to your wallet and try again." },
//   { code: "1012", http: "423 Locked", category: "Business", message: "Account Locked", description: "Your account is locked due to multiple failed attempts.", solution: "Contact support to unlock your account." },
//   { code: "1013", http: "429 Too Many Requests", category: "Rate Limit", message: "Rate Limit Exceeded", description: "Too many requests in a short time.", solution: "Slow down requests and try again after some time." },
//   { code: "1014", http: "500 Internal Server Error", category: "Server", message: "Internal Server Error", description: "Something went wrong on our end.", solution: "Please try again later. If the issue persists, contact support." },
//   { code: "1015", http: "502 Bad Gateway", category: "Server", message: "Bad Gateway", description: "Server received an invalid response.", solution: "Please try again later." },
//   { code: "1016", http: "503 Service Unavailable", category: "Server", message: "Service Unavailable", description: "The service is temporarily unavailable.", solution: "Please try again after some time." },
//   { code: "1017", http: "400 Bad Request", category: "Validation", message: "Invalid Bank Name", description: "The bank name provided does not match records.", solution: "Verify the bank name and retry." },
//   { code: "1018", http: "401 Unauthorized", category: "Authentication", message: "Token Expired", description: "The authentication token has expired.", solution: "Re-authenticate and generate a new token." },
//   { code: "1019", http: "400 Bad Request", category: "Validation", message: "Invalid UPI ID", description: "The UPI ID format is invalid.", solution: "Check and provide a valid UPI ID." },
//   { code: "1020", http: "403 Forbidden", category: "Authentication", message: "Permission Denied", description: "You do not have permission for this action.", solution: "Check API key permissions or contact support." },
//   { code: "1021", http: "400 Bad Request", category: "Business", message: "Payout Already Processed", description: "This payout has already been processed.", solution: "Check payout status before retrying." },
//   { code: "1022", http: "400 Bad Request", category: "Validation", message: "Invalid Currency", description: "The currency specified is not supported.", solution: "Use INR or a supported currency." },
//   { code: "1023", http: "429 Too Many Requests", category: "Rate Limit", message: "IP Rate Limit Exceeded", description: "Too many requests from this IP.", solution: "Reduce request frequency from your IP." },
//   { code: "1024", http: "500 Internal Server Error", category: "Server", message: "Database Error", description: "An internal database error occurred.", solution: "Contact support if the issue persists." },
//   { code: "1025", http: "400 Bad Request", category: "Validation", message: "Invalid PAN", description: "The PAN number format is invalid.", solution: "Check and provide a valid 10-character PAN." },
//   { code: "1026", http: "409 Conflict", category: "Business", message: "Merchant Already Exists", description: "A merchant with this ID already exists.", solution: "Use a different merchant ID." },
//   { code: "1027", http: "400 Bad Request", category: "Validation", message: "Invalid Date Format", description: "The date format provided is incorrect.", solution: "Use ISO 8601 format (YYYY-MM-DD)." },
//   { code: "1028", http: "401 Unauthorized", category: "Authentication", message: "Invalid Signature", description: "The request signature is invalid.", solution: "Regenerate the signature using the correct secret key." },
//   { code: "1029", http: "400 Bad Request", category: "Validation", message: "Beneficiary Not Found", description: "The beneficiary account could not be located.", solution: "Verify beneficiary details and retry." },
//   { code: "1030", http: "403 Forbidden", category: "Business", message: "KYC Not Verified", description: "Merchant KYC verification is incomplete.", solution: "Complete KYC verification from your profile." },
//   { code: "1031", http: "400 Bad Request", category: "Validation", message: "Invalid Transfer Mode", description: "The specified transfer mode is not supported.", solution: "Use IMPS, NEFT, RTGS, or UPI." },
//   { code: "1032", http: "504 Gateway Timeout", category: "Server", message: "Gateway Timeout", description: "The upstream server did not respond in time.", solution: "Retry the request after a few seconds." },
// ];

// const CATEGORY_CONFIG = {
//   Authentication: { color: "bg-blue-100 text-blue-700", dot: "bg-blue-500" },
//   Validation: { color: "bg-purple-100 text-purple-700", dot: "bg-purple-500" },
//   Business: { color: "bg-orange-100 text-orange-700", dot: "bg-orange-500" },
//   "Rate Limit": { color: "bg-teal-100 text-teal-700", dot: "bg-teal-500" },
//   Server: { color: "bg-red-100 text-red-700", dot: "bg-red-500" },
// };

// const PAGE_SIZE_OPTIONS = [15, 25, 50];

// export default function ErrorCodeReference() {
//   const [search, setSearch] = useState("");
//   const [category, setCategory] = useState("All Categories");
//   const [page, setPage] = useState(1);
//   const [pageSize, setPageSize] = useState(15);
//   const [apiExpanded, setApiExpanded] = useState(true);

//   const filtered = ALL_ERRORS.filter(e => {
//     const matchCat = category === "All Categories" || e.category === category;
//     const q = search.toLowerCase();
//     const matchSearch = !q || e.code.includes(q) || e.message.toLowerCase().includes(q) || e.category.toLowerCase().includes(q);
//     return matchCat && matchSearch;
//   });

//   const totalPages = Math.ceil(filtered.length / pageSize);
//   const paged = filtered.slice((page - 1) * pageSize, page * pageSize);

//   const stats = {
//     total: ALL_ERRORS.length,
//     client: ALL_ERRORS.filter(e => ["Validation", "Business", "Authentication", "Rate Limit"].includes(e.category)).length,
//     server: ALL_ERRORS.filter(e => e.category === "Server").length,
//     others: 0,
//   };
//   stats.others = stats.total - stats.client - stats.server;

//   const categories = ["All Categories", ...Object.keys(CATEGORY_CONFIG)];

//   return (
//     <div className="flex h-screen bg-gray-100 font-sans overflow-hidden">
//            <div className="flex-1 flex flex-col overflow-hidden">
//         {/* Top bar */}
//         <header className="bg-white border-b border-gray-200 px-6 py-3.5 flex items-center justify-between flex-shrink-0">
//           <div>
//             <h1 className="text-[18px] font-bold text-gray-900">Error Code Reference</h1>
//             <p className="text-xs text-gray-600 font-medium mt-0.5">Understand API error codes and their meanings to resolve issues quickly.</p>
//           </div>
//           <div className="flex items-center gap-4">
//             {/* Date picker */}
//             <button className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-600 hover:bg-gray-50">
//               <Icon d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" className="w-4 h-4 text-gray-400" />
//               13 May 2025 - 14 May 2025
//               <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
//             </button>
            
//             {/* Merchant */}
//             <button className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-gray-50">
//               <div className="bg-blue-100 rounded-md p-1">
//                 <Icon d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" className="w-4 h-4 text-blue-600" />
//               </div>
//               <div className="text-left">
//                 <div className="font-semibold text-gray-800 text-xs">Demo Store</div>
//                 <div className="text-gray-400 text-[10px]">MID: MID123456</div>
//               </div>
//               <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 text-gray-400"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
//             </button>
//           </div>
//         </header>

//         {/* Content */}
//         <div className="flex-1 overflow-auto p-6">
//           <div className="flex gap-5">
//             {/* Center column */}
//             <div className="flex-1 min-w-0 space-y-4">
//               {/* Stats */}
//               <div className="grid grid-cols-4 gap-4">
//                 {[
//                   { label: "Total Error Codes", value: stats.total, dot: "bg-gray-400" },
//                   { label: "Client Errors (4xx)", value: stats.client, dot: "bg-orange-400" },
//                   { label: "Server Errors (5xx)", value: stats.server, dot: "bg-red-500" },
//                   { label: "General / Others", value: stats.others, dot: "bg-blue-500" },
//                 ].map(s => (
//                   <div key={s.label} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
//                     <div className="flex items-center gap-1.5 mb-1">
//                       <span className={`w-2 h-2 rounded-full ${s.dot}`} />
//                       <span className="text-xs text-gray-500">{s.label}</span>
//                     </div>
//                     <div className="text-2xl font-extrabold text-gray-900">{s.value}</div>
//                   </div>
//                 ))}
//               </div>

//               {/* Table card */}
//               <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
//                 {/* Filters */}
//                 <div className="flex items-center gap-3 p-4 border-b border-gray-100">
//                   <div className="relative flex-1 max-w-xs">
//                     <Icon d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
//                     <input
//                       value={search}
//                       onChange={e => { setSearch(e.target.value); setPage(1); }}
//                       placeholder="Search by code or message..."
//                       className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-xs placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                     />
//                   </div>
//                   <div className="relative">
//                     <select
//                       value={category}
//                       onChange={e => { setCategory(e.target.value); setPage(1); }}
//                       className="appearance-none border border-gray-200 rounded-lg px-4 py-2 pr-8 text-xs text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white cursor-pointer"
//                     >
//                       {categories.map(c => <option key={c}>{c}</option>)}
//                     </select>
//                     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 text-gray-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
//                   </div>
//                   <div className="flex-1" />
//                   <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium px-4 py-2 rounded-lg transition">
//                     <Icon d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" className="w-4 h-4" />
//                     Download as CSV
//                   </button>
//                 </div>

//                 {/* Table */}
//                 <div className="overflow-x-auto">
//                   <table className="w-full text-sm">
//                     <thead>
//                       <tr className="bg-gray-50 border-b border-gray-100">
//                         {["Error Code", "HTTP Status", "Category", "Message", "Description", "Possible Solution"].map(h => (
//                           <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
//                         ))}
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {paged.map((row, i) => {
//                         const cfg = CATEGORY_CONFIG[row.category] || { color: "bg-gray-100 text-gray-600" };
//                         return (
//                           <tr key={row.code} className={`border-b border-gray-50 hover:bg-blue-50/30 transition-colors ${i % 2 === 0 ? "" : "bg-gray-50/30"}`}>
//                             <td className="px-4 py-3 text-xs font-semibold text-gray-800">{row.code}</td>
//                             <td className="px-4 py-3 text-xs text-gray-600 whitespace-nowrap">{row.http}</td>
//                             <td className="px-4 py-3">
//                               <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${cfg.color}`}>{row.category}</span>
//                             </td>
//                             <td className="px-4 py-3 font-medium text-xs text-gray-700 whitespace-nowrap">{row.message}</td>
//                             <td className="px-4 py-3 text-gray-500 max-w-xs text-xs">{row.description}</td>
//                             <td className="px-4 py-3 text-gray-500 max-w-xs text-xs">{row.solution}</td>
//                           </tr>
//                         );
//                       })}
//                     </tbody>
//                   </table>
//                 </div>

//                 {/* Pagination */}
//                 <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
//                   <span className="text-xs text-gray-500">
//                     Showing {Math.min((page - 1) * pageSize + 1, filtered.length)} to {Math.min(page * pageSize, filtered.length)} of {filtered.length} results
//                   </span>
//                   <div className="flex items-center gap-2">
//                     <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition">
//                       <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
//                     </button>
//                     {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map(p => (
//                       <button key={p} onClick={() => setPage(p)} className={`w-8 h-8 rounded-lg text-sm font-medium transition ${p === page ? "bg-blue-600 text-white" : "border border-gray-200 text-gray-600 hover:bg-gray-50"}`}>{p}</button>
//                     ))}
//                     {totalPages > 5 && <span className="text-gray-400 text-sm">…</span>}
//                     <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition">
//                       <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
//                     </button>
//                     <div className="relative ml-2">
//                       <select value={pageSize} onChange={e => { setPageSize(Number(e.target.value)); setPage(1); }} className="appearance-none border border-gray-200 rounded-lg px-3 py-1.5 pr-7 text-xs text-gray-600 focus:outline-none bg-white cursor-pointer">
//                         {PAGE_SIZE_OPTIONS.map(o => <option key={o}>{o} / page</option>)}
//                       </select>
//                       <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5 text-gray-400 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Right sidebar */}
//             <div className="w-60 flex-shrink-0 space-y-4">
//               {/* Categories */}
//               <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
//                 <h3 className="font-bold text-gray-800 text-sm mb-3">Error Code Categories</h3>
//                 <div className="space-y-3">
//                   {[
//                     { name: "Authentication (401)", dot: "bg-blue-500", desc: "Errors related to authentication and authorization." },
//                     { name: "Validation (400)", dot: "bg-purple-500", desc: "Errors due to invalid input or missing parameters." },
//                     { name: "Business (4xx)", dot: "bg-orange-400", desc: "Business logic errors like insufficient balance, duplicate etc." },
//                     { name: "Rate Limit (429)", dot: "bg-teal-500", desc: "Errors due to exceeding rate limit of requests." },
//                     { name: "Server (5xx)", dot: "bg-red-500", desc: "Server side errors from Bridge Pay servers." },
//                   ].map(c => (
//                     <div key={c.name}>
//                       <div className="flex items-center gap-2 mb-0.5">
//                         <span className={`w-2 h-2 rounded-full flex-shrink-0 ${c.dot}`} />
//                         <span className="text-xs font-semibold text-blue-700 cursor-pointer hover:underline">{c.name}</span>
//                       </div>
//                       <p className="text-[10px] text-gray-500 pl-4">{c.desc}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Need Help */}
//               <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
//                 <h3 className="font-bold text-gray-800 text-sm mb-1">Need Help?</h3>
//                 <p className="text-[10px] text-gray-500 mb-3">If you are facing any issues related to API integration or error codes.</p>
//                 <button className="w-full flex items-center justify-center gap-2 border-1 border-blue-600 text-blue-600 font-semibold text-xs py-2.5 rounded-xl hover:bg-blue-50 transition">
//                   <Icon d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" className="w-4 h-4" />
//                   Contact Support
//                 </button>
//               </div>

//               {/* Best Practices */}
//               <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
//                 <div className="flex items-center gap-2 mb-2">
//                   <svg viewBox="0 0 24 24" className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="10" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4M12 16h.01" /></svg>
//                   <h3 className="font-bold text-amber-800 text-sm">Best Practices</h3>
//                 </div>
//                 <ul className="space-y-1.5">
//                   {[
//                     "Always validate input parameters before sending request.",
//                     "Use unique Order ID for every payout request.",
//                     "Implement proper error handling in your integration.",
//                     "Refer to API Integration Guide for detailed documentation.",
//                   ].map((tip, i) => (
//                     <li key={i} className="flex items-start gap-1.5 text-[11px] text-amber-800">
//                       <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-amber-600"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
//                       {tip}
//                     </li>
//                   ))}
//                 </ul>
//                 <button className="mt-3 w-full flex items-center justify-between text-xs font-semibold text-amber-700 border border-amber-300 rounded-lg px-3 py-2 hover:bg-amber-100 transition">
//                   View Integration Guide
//                   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import { useState } from "react";

// ── Icons ──────────────────────────────────────────────────────────────────
const Icon = ({ d, className = "w-4 h-4 sm:w-5 sm:h-5" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={className}>
    {Array.isArray(d) ? d.map((p, i) => <path key={i} d={p} />) : <path d={d} />}
  </svg>
);

const BridgeLogo = () => (
  <div className="flex items-center gap-2.5">
    <div className="bg-blue-600 rounded-lg p-1.5">
      <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6" fill="white"><path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM16 14a4 4 0 100 8 4 4 0 000-8z" /></svg>
    </div>
    <div>
      <div className="font-bold text-white text-sm sm:text-base leading-tight">Bridge Pay</div>
      <div className="text-[10px] sm:text-[11px] text-blue-300 leading-tight">Merchant Panel</div>
    </div>
  </div>
);

// ── Data ───────────────────────────────────────────────────────────────────
const NAV = [
  { label: "Dashboard", icon: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" },
  { label: "Payout History", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" },
  { label: "Reports", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z", hasChevron: true },
  {
    label: "API Integration", icon: "M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z", active: true, hasChevron: true,
    children: ["API Integration Guide", "Sample Request & Response", "Webhooks", "API Keys", "SDKs & Libraries", "Postman Collection", "Error Code Reference"],
  },
  { label: "Settings", icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" },
  { label: "Profile", icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" },
];

const ALL_ERRORS = [
  { code: "1001", http: "401 Unauthorized", category: "Authentication", message: "Invalid API Key", description: "The API key provided is invalid or missing.", solution: "Check your API key and try again." },
  { code: "1002", http: "401 Unauthorized", category: "Authentication", message: "Invalid Merchant", description: "Merchant ID is invalid or not active.", solution: "Verify Merchant ID or contact support." },
  { code: "1003", http: "400 Bad Request", category: "Validation", message: "Missing Required Parameter", description: "One or more required parameters are missing.", solution: "Ensure all required parameters are sent." },
  { code: "1004", http: "400 Bad Request", category: "Validation", message: "Invalid Account Number", description: "The account number format is invalid.", solution: "Check and provide a valid account number." },
  { code: "1005", http: "400 Bad Request", category: "Validation", message: "Invalid IFSC Code", description: "The IFSC code provided is invalid.", solution: "Verify IFSC code and try again." },
  { code: "1006", http: "400 Bad Request", category: "Validation", message: "Invalid Mobile Number", description: "The mobile number format is invalid.", solution: "Provide a valid 10-digit mobile number." },
  { code: "1007", http: "400 Bad Request", category: "Validation", message: "Invalid Amount", description: "The amount is invalid or less than minimum limit.", solution: "Check amount and minimum limit." },
  { code: "1008", http: "400 Bad Request", category: "Validation", message: "Amount Exceeds Limit", description: "The amount exceeds the per transaction limit.", solution: "Reduce amount or contact support to increase limit." },
  { code: "1009", http: "400 Bad Request", category: "Validation", message: "Unsupported Bank", description: "Payout to this bank is currently not supported.", solution: "Use another supported bank or contact support." },
  { code: "1010", http: "409 Conflict", category: "Business", message: "Duplicate Order ID", description: "The order ID already exists in our system.", solution: "Use a unique order ID and try again." },
  { code: "1011", http: "402 Payment Required", category: "Business", message: "Insufficient Balance", description: "Your wallet balance is insufficient.", solution: "Add funds to your wallet and try again." },
  { code: "1012", http: "423 Locked", category: "Business", message: "Account Locked", description: "Your account is locked due to multiple failed attempts.", solution: "Contact support to unlock your account." },
  { code: "1013", http: "429 Too Many Requests", category: "Rate Limit", message: "Rate Limit Exceeded", description: "Too many requests in a short time.", solution: "Slow down requests and try again after some time." },
  { code: "1014", http: "500 Internal Server Error", category: "Server", message: "Internal Server Error", description: "Something went wrong on our end.", solution: "Please try again later. If the issue persists, contact support." },
  { code: "1015", http: "502 Bad Gateway", category: "Server", message: "Bad Gateway", description: "Server received an invalid response.", solution: "Please try again later." },
  { code: "1016", http: "503 Service Unavailable", category: "Server", message: "Service Unavailable", description: "The service is temporarily unavailable.", solution: "Please try again after some time." },
  { code: "1017", http: "400 Bad Request", category: "Validation", message: "Invalid Bank Name", description: "The bank name provided does not match records.", solution: "Verify the bank name and retry." },
  { code: "1018", http: "401 Unauthorized", category: "Authentication", message: "Token Expired", description: "The authentication token has expired.", solution: "Re-authenticate and generate a new token." },
  { code: "1019", http: "400 Bad Request", category: "Validation", message: "Invalid UPI ID", description: "The UPI ID format is invalid.", solution: "Check and provide a valid UPI ID." },
  { code: "1020", http: "403 Forbidden", category: "Authentication", message: "Permission Denied", description: "You do not have permission for this action.", solution: "Check API key permissions or contact support." },
  { code: "1021", http: "400 Bad Request", category: "Business", message: "Payout Already Processed", description: "This payout has already been processed.", solution: "Check payout status before retrying." },
  { code: "1022", http: "400 Bad Request", category: "Validation", message: "Invalid Currency", description: "The currency specified is not supported.", solution: "Use INR or a supported currency." },
  { code: "1023", http: "429 Too Many Requests", category: "Rate Limit", message: "IP Rate Limit Exceeded", description: "Too many requests from this IP.", solution: "Reduce request frequency from your IP." },
  { code: "1024", http: "500 Internal Server Error", category: "Server", message: "Database Error", description: "An internal database error occurred.", solution: "Contact support if the issue persists." },
  { code: "1025", http: "400 Bad Request", category: "Validation", message: "Invalid PAN", description: "The PAN number format is invalid.", solution: "Check and provide a valid 10-character PAN." },
  { code: "1026", http: "409 Conflict", category: "Business", message: "Merchant Already Exists", description: "A merchant with this ID already exists.", solution: "Use a different merchant ID." },
  { code: "1027", http: "400 Bad Request", category: "Validation", message: "Invalid Date Format", description: "The date format provided is incorrect.", solution: "Use ISO 8601 format (YYYY-MM-DD)." },
  { code: "1028", http: "401 Unauthorized", category: "Authentication", message: "Invalid Signature", description: "The request signature is invalid.", solution: "Regenerate the signature using the correct secret key." },
  { code: "1029", http: "400 Bad Request", category: "Validation", message: "Beneficiary Not Found", description: "The beneficiary account could not be located.", solution: "Verify beneficiary details and retry." },
  { code: "1030", http: "403 Forbidden", category: "Business", message: "KYC Not Verified", description: "Merchant KYC verification is incomplete.", solution: "Complete KYC verification from your profile." },
  { code: "1031", http: "400 Bad Request", category: "Validation", message: "Invalid Transfer Mode", description: "The specified transfer mode is not supported.", solution: "Use IMPS, NEFT, RTGS, or UPI." },
  { code: "1032", http: "504 Gateway Timeout", category: "Server", message: "Gateway Timeout", description: "The upstream server did not respond in time.", solution: "Retry the request after a few seconds." },
];

const CATEGORY_CONFIG = {
  Authentication: { color: "bg-blue-100 text-blue-700", dot: "bg-blue-500" },
  Validation: { color: "bg-purple-100 text-purple-700", dot: "bg-purple-500" },
  Business: { color: "bg-orange-100 text-orange-700", dot: "bg-orange-500" },
  "Rate Limit": { color: "bg-teal-100 text-teal-700", dot: "bg-teal-500" },
  Server: { color: "bg-red-100 text-red-700", dot: "bg-red-500" },
};

const PAGE_SIZE_OPTIONS = [15, 25, 50];

export default function ErrorCodeReference() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);
  const [apiExpanded, setApiExpanded] = useState(true);

  const filtered = ALL_ERRORS.filter(e => {
    const matchCat = category === "All Categories" || e.category === category;
    const q = search.toLowerCase();
    const matchSearch = !q || e.code.includes(q) || e.message.toLowerCase().includes(q) || e.category.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);

  const stats = {
    total: ALL_ERRORS.length,
    client: ALL_ERRORS.filter(e => ["Validation", "Business", "Authentication", "Rate Limit"].includes(e.category)).length,
    server: ALL_ERRORS.filter(e => e.category === "Server").length,
    others: 0,
  };
  stats.others = stats.total - stats.client - stats.server;

  const categories = ["All Categories", ...Object.keys(CATEGORY_CONFIG)];

  return (
    <div className="flex flex-col h-screen bg-gray-100 font-sans overflow-hidden">
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
          <div>
            <h1 className="text-base sm:text-[18px] font-bold text-gray-900">Error Code Reference</h1>
            <p className="text-[11px] sm:text-xs text-gray-600 font-medium mt-0.5">Understand API error codes and their meanings to resolve issues quickly.</p>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-4">
            {/* Date picker */}
            <button className="flex items-center gap-1.5 sm:gap-2 border border-gray-200 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 text-[11px] sm:text-xs text-gray-600 hover:bg-gray-50">
              <Icon d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
              <span className="hidden sm:inline">13 May 2025 - 14 May 2025</span>
              <span className="sm:hidden">13-14 May</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3 h-3 sm:w-4 sm:h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
            </button>
            
            {/* Merchant */}
            <button className="flex items-center gap-1.5 sm:gap-2 border border-gray-200 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 text-xs text-gray-600 hover:bg-gray-50">
              <div className="bg-blue-100 rounded-md p-0.5 sm:p-1">
                <Icon d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
              </div>
              <div className="text-left min-w-0">
                <div className="font-semibold text-gray-800 text-[10px] sm:text-xs truncate">Demo Store</div>
                <div className="text-gray-400 text-[9px] sm:text-[10px]">MID: MID123456</div>
              </div>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-auto p-3 sm:p-6">
          <div className="flex flex-col lg:flex-row gap-4 sm:gap-5">
            {/* Main column */}
            <div className="flex-1 min-w-0 space-y-3 sm:space-y-4">
              {/* Stats - 2x2 on mobile, 4 column on desktop */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4">
                {[
                  { label: "Total Error Codes", value: stats.total, dot: "bg-gray-400" },
                  { label: "Client Errors (4xx)", value: stats.client, dot: "bg-orange-400" },
                  { label: "Server Errors (5xx)", value: stats.server, dot: "bg-red-500" },
                  { label: "General / Others", value: stats.others, dot: "bg-blue-500" },
                ].map(s => (
                  <div key={s.label} className="bg-white rounded-xl p-3 sm:p-4 border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${s.dot}`} />
                      <span className="text-[10px] sm:text-xs text-gray-500">{s.label}</span>
                    </div>
                    <div className="text-lg sm:text-2xl font-extrabold text-gray-900">{s.value}</div>
                  </div>
                ))}
              </div>

              {/* Table card */}
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                {/* Filters */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 p-3 sm:p-4 border-b border-gray-100">
                  <div className="relative flex-1 max-w-full sm:max-w-xs">
                    <Icon d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      value={search}
                      onChange={e => { setSearch(e.target.value); setPage(1); }}
                      placeholder="Search by code or message..."
                      className="w-full pl-8 sm:pl-9 pr-3 sm:pr-4 py-1.5 sm:py-2 border border-gray-200 rounded-lg text-[11px] sm:text-xs placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                  <div className="relative w-full sm:w-auto">
                    <select
                      value={category}
                      onChange={e => { setCategory(e.target.value); setPage(1); }}
                      className="appearance-none border border-gray-200 rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 pr-7 sm:pr-8 text-[11px] sm:text-xs text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white cursor-pointer w-full"
                    >
                      {categories.map(c => <option key={c}>{c}</option>)}
                    </select>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                  </div>
                  <div className="hidden sm:block flex-1" />
                  <button className="flex items-center justify-center gap-1.5 sm:gap-2 bg-blue-600 hover:bg-blue-700 text-white text-[11px] sm:text-xs font-medium px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition">
                    <Icon d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">Download as CSV</span>
                    <span className="sm:hidden">Export</span>
                  </button>
                </div>

                {/* Table - horizontal scroll on mobile */}
                <div className="overflow-x-auto">
                  <table className="w-full min-w-200 lg:min-w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-100">
                        {["Error Code", "HTTP Status", "Category", "Message", "Description", "Possible Solution"].map(h => (
                          <th key={h} className="text-left px-3 sm:px-4 py-2 sm:py-3 text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                        ))}
                      
                      </tr>
                      
                    </thead>
                    <tbody>
                      {paged.map((row, i) => {
                        const cfg = CATEGORY_CONFIG[row.category] || { color: "bg-gray-100 text-gray-600" };
                        return (
                          <tr key={row.code} className={`border-b border-gray-50 hover:bg-blue-50/30 transition-colors ${i % 2 === 0 ? "" : "bg-gray-50/30"}`}>
                            <td className="px-3 sm:px-4 py-2.5 sm:py-3 text-[11px] sm:text-xs font-semibold text-gray-800">{row.code}</td>
                            <td className="px-3 sm:px-4 py-2.5 sm:py-3 text-[11px] sm:text-xs text-gray-600 whitespace-nowrap">{row.http}</td>
                            <td className="px-3 sm:px-4 py-2.5 sm:py-3">
                              <span className={`px-1.5 sm:px-2.5 py-0.5 rounded-full text-[9px] sm:text-xs font-semibold ${cfg.color}`}>{row.category}</span>
                            </td>
                            <td className="px-3 sm:px-4 py-2.5 sm:py-3 font-medium text-[11px] sm:text-xs text-gray-700 whitespace-nowrap">{row.message}</td>
                            <td className="px-3 sm:px-4 py-2.5 sm:py-3 text-gray-500 max-w-50 sm:max-w-xs text-[11px] sm:text-xs">{row.description}</td>
                            <td className="px-3 sm:px-4 py-2.5 sm:py-3 text-gray-500 max-w-50 sm:max-w-xs text-[11px] sm:text-xs">{row.solution}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Pagination - responsive */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-3 sm:px-4 py-3 border-t border-gray-100">
                  <span className="text-[10px] sm:text-xs text-gray-500">
                    Showing {Math.min((page - 1) * pageSize + 1, filtered.length)} to {Math.min(page * pageSize, filtered.length)} of {filtered.length} results
                  </span>
                  <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
                    <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="p-1 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map(p => (
                      <button key={p} onClick={() => setPage(p)} className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg text-[11px] sm:text-sm font-medium transition ${p === page ? "bg-blue-600 text-white" : "border border-gray-200 text-gray-600 hover:bg-gray-50"}`}>{p}</button>
                    ))}
                    {totalPages > 5 && <span className="text-gray-400 text-[11px] sm:text-sm">…</span>}
                    <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="p-1 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                    </button>
                    <div className="relative ml-0 sm:ml-2">
                      <select value={pageSize} onChange={e => { setPageSize(Number(e.target.value)); setPage(1); }} className="appearance-none border border-gray-200 rounded-lg px-2 sm:px-3 py-1 pr-5 sm:pr-7 text-[10px] sm:text-xs text-gray-600 focus:outline-none bg-white cursor-pointer">
                        {PAGE_SIZE_OPTIONS.map(o => <option key={o}>{o}</option>)}
                      </select>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-400 absolute right-1 top-1/2 -translate-y-1/2 pointer-events-none"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right sidebar - hidden on mobile, visible on desktop */}
            <div className="hidden lg:block w-64 xl:w-72 shrink-0 space-y-4">
              {/* Categories */}
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
                <h3 className="font-bold text-gray-800 text-sm mb-3">Error Code Categories</h3>
                <div className="space-y-3">
                  {[
                    { name: "Authentication (401)", dot: "bg-blue-500", desc: "Errors related to authentication and authorization." },
                    { name: "Validation (400)", dot: "bg-purple-500", desc: "Errors due to invalid input or missing parameters." },
                    { name: "Business (4xx)", dot: "bg-orange-400", desc: "Business logic errors like insufficient balance, duplicate etc." },
                    { name: "Rate Limit (429)", dot: "bg-teal-500", desc: "Errors due to exceeding rate limit of requests." },
                    { name: "Server (5xx)", dot: "bg-red-500", desc: "Server side errors from Bridge Pay servers." },
                  ].map(c => (
                    <div key={c.name}>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className={`w-2 h-2 rounded-full shrink-0 ${c.dot}`} />
                        <span className="text-xs font-semibold text-blue-700 cursor-pointer hover:underline">{c.name}</span>
                      </div>
                      <p className="text-[10px] text-gray-500 pl-4">{c.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Need Help */}
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
                <h3 className="font-bold text-gray-800 text-sm mb-1">Need Help?</h3>
                <p className="text-[10px] text-gray-500 mb-3">If you are facing any issues related to API integration or error codes.</p>
                <button className="w-full flex items-center justify-center gap-2 border border-blue-600 text-blue-600 font-semibold text-xs py-2.5 rounded-xl hover:bg-blue-50 transition">
                  <Icon d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" className="w-3.5 h-3.5" />
                  Contact Support
                </button>
              </div>

              {/* Best Practices */}
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="10" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4M12 16h.01" /></svg>
                  <h3 className="font-bold text-amber-800 text-sm">Best Practices</h3>
                </div>
                <ul className="space-y-1.5">
                  {[
                    "Always validate input parameters before sending request.",
                    "Use unique Order ID for every payout request.",
                    "Implement proper error handling in your integration.",
                    "Refer to API Integration Guide for detailed documentation.",
                  ].map((tip, i) => (
                    <li key={i} className="flex items-start gap-1.5 text-[11px] text-amber-800">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-3 h-3 shrink-0 mt-0.5 text-amber-600"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      {tip}
                    </li>
                  ))}
                </ul>
                <button className="mt-3 w-full flex items-center justify-between text-xs font-semibold text-amber-700 border border-amber-300 rounded-lg px-3 py-2 hover:bg-amber-100 transition">
                  View Integration Guide
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}