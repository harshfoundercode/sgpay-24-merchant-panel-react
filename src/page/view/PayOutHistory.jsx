// import { useState } from "react";
// import DateRangePicker from "../../components/DatePicker";

// // ── Status Badge ─────────────────────────────────────────────────────────────
// const StatusBadge = ({ status }) => {
//   const map = {
//     Success:   "bg-green-50 text-green-700 border-green-200",
//     Failed:    "bg-red-50 text-red-600 border-red-200",
//     Pending:   "bg-orange-50 text-orange-600 border-orange-200",
//     Cancelled: "bg-gray-100 text-gray-500 border-gray-200",
//   };
//   return (
//     <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${map[status] || "bg-gray-100 text-gray-500 border-gray-200"}`}>
//       {status}
//     </span>
//   );
// };

// // ── InfoRow ───────────────────────────────────────────────────────────────────
// const InfoRow = ({ label, value, mono }) => (
//   <div className="flex items-start py-2.5 border-b border-gray-50 last:border-0">
//     <span className="text-xs text-gray-600 font-medium w-44 flex-shrink-0">{label}</span>
//     <span className="text-gray-500 mx-3 text-xs">:</span>
//     <span className={`text-xs font-semibold text-gray-800 ${mono ? "font-mono" : ""}`}>{value || "–"}</span>
//   </div>
// );

// // ── Timeline Step ──
// const TimelineStep = ({ step, label, date, desc, done, last }) => (
//   <div className="flex gap-3 relative">
//     <div className="flex flex-col items-center">
//       <div className={`w-6 h-6 rounded-full flex items-center justify-center z-10 flex-shrink-0 ${done ? "bg-green-500" : "bg-gray-200"}`}>
//         {done ? (
//           <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={3}>
//             <path d="M20 6L9 17l-5-5"/>
//           </svg>
//         ) : (
//           <span className="text-xs font-bold text-gray-500">{step}</span>
//         )}
//       </div>
//       {!last && <div className={`w-0.5 flex-1 mt-1 ${done ? "bg-green-300" : "bg-gray-200"}`} style={{ minHeight: 40 }} />}
//     </div>
//     <div className="pb-4 flex-1">
//       <div className="text-xs font-bold text-gray-800">{label}</div>
//       <div className="text-[10px] text-gray-500 mt-0.5">{date}</div>
//       <div className="text-[11px] text-gray-600 mt-1">{desc}</div>
//     </div>
//   </div>
// );

// // ── Transaction Details Page ──────────────────────────────────────────────────
// const TransactionDetails = ({ txn, onBack }) => {
//   const netAmount = txn.amount - txn.charges;
  
//   return (
//     <div className="p-5 font-sans">
//       {/* Breadcrumb + header */}
//       <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
//         <div className="flex items-center gap-2 text-sm">
//           <button onClick={onBack} className="text-blue-600 hover:underline font-medium">Payout History</button>
//           <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="text-gray-400">
//             <path d="M9 18l6-6-6-6"/>
//           </svg>
//           <span className="text-gray-800 font-semibold">Transaction Details</span>
//         </div>
//       </div>

//       {/* Summary card */}
//       <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-5">
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
//           <div>
//             <div className="text-xs text-gray-600 font-medium mb-1">Payout ID</div>
//             <div className="flex items-center gap-1.5">
//               <span className="text-sm font-bold text-gray-900 font-mono">{txn.id}</span>
//               <button 
//                 onClick={() => navigator.clipboard.writeText(txn.id)}
//                 className="text-gray-400 hover:text-blue-600 transition-colors"
//               >
//                 <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
//                   <path d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
//                 </svg>
//               </button>
//             </div>
//             <div className="mt-1.5"><StatusBadge status={txn.status} /></div>
//           </div>
          
//           <div>
//             <div className="text-xs text-gray-600 font-medium mb-1">Amount</div>
//             <div className="text-lg font-bold text-gray-900">
//               ₹{txn.amount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
//             </div>
//           </div>
          
//           <div>
//             <div className="text-xs text-gray-600 font-medium mb-1">Charges</div>
//             <div className="text-sm font-semibold text-gray-900">
//               ₹{txn.charges.toFixed(2)}
//             </div>
//           </div>
          
//           <div>
//             <div className="text-xs text-gray-600 font-medium mb-1">Net Amount</div>
//             <div className="text-sm font-semibold text-gray-900">
//               ₹{netAmount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
//             </div>
//           </div>
          
//           <div>
//             <div className="text-xs text-gray-600 font-medium mb-1">UTR</div>
//             <div className="text-xs font-mono font-semibold text-gray-900">
//               {txn.utr || "–"}
//             </div>
//           </div>
          
//           <div>
//             <div className="text-xs text-gray-600 font-medium mb-1">Order ID</div>
//             <div className="flex items-center gap-1.5">
//               <span className="text-xs font-mono font-semibold text-gray-900">{txn.orderId}</span>
//               <button 
//                 onClick={() => navigator.clipboard.writeText(txn.orderId)}
//                 className="text-gray-400 hover:text-blue-600 transition-colors"
//               >
//                 <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
//                   <path d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
//                 </svg>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Details + Timeline */}
//       <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 mb-5">
//         <div className="lg:col-span-3 bg-white rounded-2xl border border-gray-100 p-5">
//           <h3 className="text-sm font-bold text-gray-900 mb-4">Payout Information</h3>
//           <InfoRow label="Date & Time" value={`${txn.date}, ${txn.time}`} />
//           <InfoRow label="Status" value={<StatusBadge status={txn.status} />} />
//           <InfoRow label="Payout Mode" value="NEFT" />
//           <InfoRow label="IFSC Code" value={txn.ifsc} mono />
//           <InfoRow label="Bank Name" value={txn.bank} />
//           <InfoRow label="Account Number" value="XXXXXXXXXX1234" mono />
//           <InfoRow label="Beneficiary Name" value={txn.beneficiary} />
//           <InfoRow label="Email (Beneficiary)" value="rohit.kumar@example.com" />
//           <InfoRow label="Mobile (Beneficiary)" value="+91 98765 43210" />
//           <InfoRow label="Remark (If Any)" value="–" />
//         </div>

//         <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-5">
//           <h3 className="text-sm font-bold text-gray-900 mb-4">Payout Status Timeline</h3>
//           <TimelineStep 
//             step={1} 
//             done={txn.status !== "Pending"} 
//             label="Payout Initiated"  
//             date={txn.status !== "Pending" ? `${txn.date}, ${txn.time}` : "Pending"} 
//             desc="Payout request received" 
//           />
//           <TimelineStep 
//             step={2} 
//             done={txn.status === "Success"} 
//             label="Bank Processing"   
//             date={txn.status === "Success" ? `${txn.date}, ${txn.time}` : "Pending"} 
//             desc="Request sent to bank" 
//           />
//           <TimelineStep 
//             step={3} 
//             done={txn.status === "Success"} 
//             label="Payout Successful" 
//             date={txn.status === "Success" ? `${txn.date}, ${parseInt(txn.time.split(':')[0]) + 2}:${txn.time.split(':')[1]} ${txn.time.includes('PM') ? 'PM' : 'AM'}` : "Pending"} 
//             desc="Amount credited successfully" 
//           />
//           <TimelineStep 
//             step={4} 
//             done={txn.status === "Success"} 
//             last 
//             label="Payout Completed"  
//             date={txn.status === "Success" ? `${txn.date}, ${parseInt(txn.time.split(':')[0]) + 2}:${txn.time.split(':')[1]} ${txn.time.includes('PM') ? 'PM' : 'AM'}` : "Pending"} 
//             desc="Transaction completed" 
//           />
//         </div>
//       </div>

//       {/* Beneficiary + Actions */}
//       <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
//         <div className="lg:col-span-3 bg-white rounded-2xl border border-gray-100 p-5">
//           <h3 className="text-sm font-bold text-gray-900 mb-4">Beneficiary Details</h3>
//           <div className="flex items-start gap-4">
//             <div className="w-16 h-16 rounded-xl bg-indigo-50 flex items-center justify-center flex-shrink-0">
//               <svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth={1.5}>
//                 <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
//                 <polyline points="9 22 9 12 15 12 15 22"/>
//               </svg>
//             </div>
//             <div className="flex-1">
//               <InfoRow label="Name" value={txn.beneficiary} />
//               <InfoRow label="Account Number" value="XXXXXXXXXX1234" mono />
//               <InfoRow label="IFSC Code" value={txn.ifsc} mono />
//               <InfoRow label="Bank Name" value={txn.bank} />
//               <InfoRow label="Account Type" value="Savings Account" />
//             </div>
//           </div>
//         </div>

//         <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-5">
//           <h3 className="text-sm font-bold text-gray-900 mb-4">Actions</h3>
//           <div className="grid grid-cols-2 gap-3 mb-3">
//             <button className="flex items-center justify-center gap-2 px-4 py-2.5 border border-blue-600 rounded-xl text-xs font-medium text-blue-600 hover:bg-blue-50 transition-colors">
//               <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
//                 <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
//                 <circle cx="12" cy="12" r="3"/>
//               </svg>
//               View Receipt
//             </button>
//             <button className="flex items-center justify-center gap-2 px-4 py-2.5 border border-blue-600 rounded-xl text-xs font-medium text-blue-600 hover:bg-blue-50 transition-colors">
//               <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
//                 <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
//                 <polyline points="15 3 21 3 21 9"/>
//                 <line x1="10" y1="14" x2="21" y2="3"/>
//               </svg>
//               Raise Support Ticket
//             </button>
//           </div>
//           <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold transition-colors">
//             <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
//               <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
//             </svg>
//             Download Receipt
//           </button>
//         </div>
//       </div>

//       <button onClick={onBack} className="mt-5 flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors font-medium">
//         <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
//           <path d="M19 12H5M12 19l-7-7 7-7"/>
//         </svg>
//         Back to Payout History
//       </button>
//     </div>
//   );
// };

// // ── Main Payout History Page ───────────────────────────────────────────────────
// const allPayouts = [
//   { id:"BPY1234567890", date:"14 May 2025", time:"11:30 AM", beneficiary:"Rohit Kumar",  ifsc:"ICIC0001234", bank:"ICICI Bank",          amount:25000,  charges:12.50, orderId:"ORD123456", status:"Success",   utr:"ICIC512345678901" },
//   { id:"BPY1234567889", date:"14 May 2025", time:"10:45 AM", beneficiary:"Neha Sharma",  ifsc:"HDFC0005678", bank:"HDFC Bank",           amount:15000,  charges:10.00, orderId:"ORD123455", status:"Success",   utr:"HDFC512345678902" },
//   { id:"BPY1234567888", date:"14 May 2025", time:"10:20 AM", beneficiary:"Amit Verma",   ifsc:"SBIN0004321", bank:"State Bank of India", amount:8500,   charges:7.08,  orderId:"ORD123454", status:"Pending",   utr:null },
//   { id:"BPY1234567887", date:"14 May 2025", time:"09:15 AM", beneficiary:"Pooja Singh",  ifsc:"KKBK0009876", bank:"Kotak Mahindra Bank", amount:12000,  charges:9.44,  orderId:"ORD123453", status:"Failed",    utr:null },
//   { id:"BPY1234567886", date:"13 May 2025", time:"06:40 PM", beneficiary:"Vikram Joshi", ifsc:"ICIC0001234", bank:"ICICI Bank",          amount:30000,  charges:14.75, orderId:"ORD123452", status:"Success",   utr:"ICIC512345678903" },
//   { id:"BPY1234567885", date:"13 May 2025", time:"05:25 PM", beneficiary:"Anjali Mehta", ifsc:"HDFC0005678", bank:"HDFC Bank",           amount:5200,   charges:6.20,  orderId:"ORD123451", status:"Cancelled", utr:null },
//   { id:"BPY1234567884", date:"13 May 2025", time:"04:10 PM", beneficiary:"Suresh Patel", ifsc:"SBIN0004321", bank:"State Bank of India", amount:18750,  charges:11.80, orderId:"ORD123450", status:"Success",   utr:"SBIN512345678904" },
//   { id:"BPY1234567883", date:"13 May 2025", time:"03:05 PM", beneficiary:"Karan Malhotra",ifsc:"KKBK0009876",bank:"Kotak Mahindra Bank", amount:11000,  charges:8.85,  orderId:"ORD123449", status:"Pending",   utr:null },
//   { id:"BPY1234567882", date:"13 May 2025", time:"02:20 PM", beneficiary:"Megha Gupta",  ifsc:"ICIC0001234", bank:"ICICI Bank",          amount:9800,   charges:7.56,  orderId:"ORD123448", status:"Success",   utr:"ICIC512345678905" },
//   { id:"BPY1234567881", date:"13 May 2025", time:"01:10 PM", beneficiary:"Dev Sharma",   ifsc:"HDFC0005678", bank:"HDFC Bank",           amount:7600,   charges:6.84,  orderId:"ORD123447", status:"Failed",    utr:null },
// ];

// export default function PayoutHistory() {
//   // ✅ ALL hooks must be called at the top, before any conditional return
//   const [selected, setSelected] = useState(null);
//   const [statusFilter, setStatusFilter] = useState("All Status");
//   const [search, setSearch] = useState("");
//   const [benSearch, setBenSearch] = useState("");
//   const [page, setPage] = useState(1);
//   const [openMenu, setOpenMenu] = useState(null);
//   const [dateRange, setDateRange] = useState(null);
//   const rowsPerPage = 10;

//   // ✅ Now it's safe to return conditionally - after all hooks
//   if (selected) {
//     return <TransactionDetails txn={selected} onBack={() => setSelected(null)} />;
//   }

//   const filtered = allPayouts.filter(p => {
//     const matchStatus = statusFilter === "All Status" || p.status === statusFilter;
//     const matchOrder  = !search || p.orderId.toLowerCase().includes(search.toLowerCase());
//     const matchBen    = !benSearch || p.beneficiary.toLowerCase().includes(benSearch.toLowerCase());
//     return matchStatus && matchOrder && matchBen;
//   });

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
//     <div className="min-h-screen bg-gray-50 p-5 font-sans">
//       {/* Header */}
//       <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
//         <div>
//           <h1 className="text-[18px] font-bold text-gray-900">Payout History</h1>
//           <p className="text-xs text-gray-600 font-medium mt-0.5">View and track all your payout transactions</p>
//         </div>
//       </div>

//       {/* Filters */}
//       <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-5">
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           {/* Date Range */}
//           <div>
//             <label className="text-xs font-semibold text-black mb-1.5 block">Date Range</label>
//             <DateRangePicker 
//               onDateChange={handleDateChange}
//               placeholder="Select date range"
//             />
//           </div>
          
//           {/* Status */}
//           <div>
//             <label className="text-xs font-semibold text-black mb-1.5 block">Status</label>
//             <div className="relative">
//               <select
//                 value={statusFilter}
//                 onChange={e => { setStatusFilter(e.target.value); setPage(1); }}
//                 className="w-full appearance-none pl-3 pr-8 py-2 border border-gray-200 rounded-xl text-xs text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 cursor-pointer"
//               >
//                 {["All Status","Success","Failed","Pending","Cancelled"].map(s => <option key={s}>{s}</option>)}
//               </select>
//               <svg className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
//                 <path d="M19 9l-7 7-7-7"/>
//               </svg>
//             </div>
//           </div>
          
//           {/* Order ID */}
//           <div>
//             <label className="text-xs font-semibold text-black mb-1.5 block">Order ID (Optional)</label>
//             <div className="relative">
//               <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
//                 <circle cx="11" cy="11" r="8"/>
//                 <path d="M21 21l-4.35-4.35"/>
//               </svg>
//               <input
//                 value={search}
//                 onChange={e => { setSearch(e.target.value); setPage(1); }}
//                 placeholder="Search Order ID"
//                 className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 placeholder:text-gray-400"
//               />
//             </div>
//           </div>
          
//           {/* Beneficiary */}
//           <div>
//             <label className="text-xs font-semibold text-black mb-1.5 block">Beneficiary Name (Optional)</label>
//             <div className="relative">
//               <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
//                 <circle cx="11" cy="11" r="8"/>
//                 <path d="M21 21l-4.35-4.35"/>
//               </svg>
//               <input
//                 value={benSearch}
//                 onChange={e => { setBenSearch(e.target.value); setPage(1); }}
//                 placeholder="Search Beneficiary"
//                 className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 placeholder:text-gray-400"
//               />
//             </div>
//           </div>
//         </div>
//         <div className="flex justify-end gap-2 mt-3">
//           <button 
//             onClick={() => { setStatusFilter("All Status"); setSearch(""); setBenSearch(""); setPage(1); }}
//             className="px-4 py-2 border border-gray-200 rounded-xl text-xs text-gray-600 hover:bg-gray-50 transition-colors font-medium"
//           >
//             Reset
//           </button>
//           <button className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold transition-colors">
//             Apply Filters
//           </button>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
//         <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100">
//           <span className="text-sm font-bold text-gray-900">Total {filtered.length.toLocaleString()} Payouts</span>
//           <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition-colors font-medium">
//             <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
//               <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
//             </svg>
//             Export
//           </button>
//         </div>

//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead>
//               <tr className="bg-gray-50/70 border-b border-gray-100">
//                 {["ID","Date","Beneficiary Name","IFSC Code","Bank","Amount (₹)","Charges (₹)","Order ID","Status","UTR","Action"].map(h => (
//                   <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-800 whitespace-nowrap">{h}</th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {filtered.slice((page-1)*rowsPerPage, page*rowsPerPage).map(txn => (
//                 <tr key={txn.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/60 transition-colors">
//                   <td className="px-4 py-3.5">
//                     <button onClick={() => setSelected(txn)} className="text-xs font-mono text-gray-800 hover:text-blue-600 hover:underline transition-colors text-left">
//                       {txn.id}
//                     </button>
//                   </td>
//                   <td className="px-4 py-3.5">
//                     <div className="text-xs font-medium text-gray-800 whitespace-nowrap">{txn.date}</div>
//                     <div className="text-[11px] text-gray-500">{txn.time}</div>
//                   </td>
//                   <td className="px-4 py-3.5 text-xs font-medium text-gray-800 whitespace-nowrap">{txn.beneficiary}</td>
//                   <td className="px-4 py-3.5 text-xs font-medium text-gray-800 whitespace-nowrap">{txn.ifsc}</td>
//                   <td className="px-4 py-3.5 text-xs font-medium text-gray-700 whitespace-nowrap">{txn.bank}</td>
//                   <td className="px-4 py-3.5 text-xs font-semibold text-gray-900 whitespace-nowrap">
//                     {txn.amount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
//                   </td>
//                   <td className="px-4 py-3.5 text-xs font-medium text-gray-800 whitespace-nowrap">{txn.charges.toFixed(2)}</td>
//                   <td className="px-4 py-3.5 text-xs font-medium text-gray-800 whitespace-nowrap">{txn.orderId}</td>
//                   <td className="px-4 py-3.5"><StatusBadge status={txn.status} /></td>
//                   <td className="px-4 py-3.5 text-xs font-medium text-gray-800 whitespace-nowrap">{txn.utr || "–"}</td>
//                   <td className="px-4 py-3.5 relative">
//                     <button
//                       onClick={(e) => { e.stopPropagation(); setOpenMenu(openMenu === txn.id ? null : txn.id); }}
//                       className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 transition-colors"
//                     >
//                       <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor">
//                         <circle cx="12" cy="5" r="1.5"/>
//                         <circle cx="12" cy="12" r="1.5"/>
//                         <circle cx="12" cy="19" r="1.5"/>
//                       </svg>
//                     </button>
//                     {openMenu === txn.id && (
//                       <div className="absolute right-8 top-2 z-50 bg-white rounded-xl shadow-xl border border-gray-100 py-1 w-40">
//                         <button
//                           onClick={() => { setSelected(txn); setOpenMenu(null); }}
//                           className="flex items-center gap-2.5 w-full px-3 py-2 text-xs text-gray-700 hover:bg-gray-50 transition-colors"
//                         >
//                           <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
//                             <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
//                             <circle cx="12" cy="12" r="3"/>
//                           </svg>
//                           View Details
//                         </button>
//                         <button className="flex items-center gap-2.5 w-full px-3 py-2 text-xs text-gray-700 hover:bg-gray-50 transition-colors">
//                           <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
//                             <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
//                           </svg>
//                           Download Receipt
//                         </button>
//                         <button className="flex items-center gap-2.5 w-full px-3 py-2 text-xs text-gray-700 hover:bg-gray-50 transition-colors">
//                           <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
//                             <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
//                             <polyline points="15 3 21 3 21 9"/>
//                             <line x1="10" y1="14" x2="21" y2="3"/>
//                           </svg>
//                           Raise Ticket
//                         </button>
//                       </div>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination */}
//         <div className="flex items-center justify-between px-5 py-3.5 border-t border-gray-100 flex-wrap gap-3">
//           <span className="text-xs text-gray-500">
//             Showing {Math.min((page-1)*rowsPerPage+1, filtered.length)} to {Math.min(page*rowsPerPage, filtered.length)} of {filtered.length.toLocaleString()} results
//           </span>
//           <div className="flex items-center gap-2">
//             <button 
//               onClick={() => setPage(p => Math.max(1, p-1))} 
//               disabled={page===1}
//               className="p-1.5 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
//             >
//               <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
//                 <path d="M15 18l-6-6 6-6"/>
//               </svg>
//             </button>
//             {Array.from({ length: Math.min(5, Math.ceil(filtered.length/rowsPerPage)) }, (_, i) => i+1).map(p => (
//               <button 
//                 key={p} 
//                 onClick={() => setPage(p)}
//                 className={`w-8 h-8 rounded-lg text-xs font-semibold transition-colors ${page===p?"bg-blue-600 text-white":"border border-gray-200 text-gray-600 hover:bg-gray-50"}`}
//               >
//                 {p}
//               </button>
//             ))}
//             <button 
//               onClick={() => setPage(p => Math.min(Math.ceil(filtered.length/rowsPerPage), p+1))}
//               disabled={page===Math.ceil(filtered.length/rowsPerPage)}
//               className="p-1.5 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
//             >
//               <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
//                 <path d="M9 18l6-6-6-6"/>
//               </svg>
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import { useState } from "react";
import DateRangePicker from "../../components/DatePicker";

// ── Status Badge ─────────────────────────────────────────────────────────────
const StatusBadge = ({ status }) => {
  const map = {
    Success:   "bg-green-50 text-green-700 border-green-200",
    Failed:    "bg-red-50 text-red-600 border-red-200",
    Pending:   "bg-orange-50 text-orange-600 border-orange-200",
    Cancelled: "bg-gray-100 text-gray-500 border-gray-200",
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold border whitespace-nowrap ${map[status] || "bg-gray-100 text-gray-500 border-gray-200"}`}>
      {status}
    </span>
  );
};

// ── InfoRow ───────────────────────────────────────────────────────────────────
const InfoRow = ({ label, value, mono }) => (
  <div className="flex flex-col sm:flex-row sm:items-start py-2 sm:py-2.5 border-b border-gray-50 last:border-0">
    <span className="text-[11px] sm:text-xs text-gray-600 font-medium sm:w-36 md:w-44 shrink-0">{label}</span>
    <span className="hidden sm:inline text-gray-500 mx-3 text-xs">:</span>
    <span className={`text-[11px] sm:text-xs font-semibold text-gray-800 mt-0.5 sm:mt-0 ${mono ? "font-mono" : ""}`}>{value || "–"}</span>
  </div>
);

// ── Timeline Step ──
const TimelineStep = ({ step, label, date, desc, done, last }) => (
  <div className="flex gap-2 sm:gap-3 relative">
    <div className="flex flex-col items-center">
      <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center z-10 shrink-0 ${done ? "bg-green-500" : "bg-gray-200"}`}>
        {done ? (
          <svg width={10} sm:width={12} height={10} sm:height={12} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={3}>
            <path d="M20 6L9 17l-5-5"/>
          </svg>
        ) : (
          <span className="text-[10px] sm:text-xs font-bold text-gray-500">{step}</span>
        )}
      </div>
      {!last && <div className={`w-0.5 flex-1 mt-1 ${done ? "bg-green-300" : "bg-gray-200"}`} style={{ minHeight: 40 }} />}
    </div>
    <div className="pb-3 sm:pb-4 flex-1">
      <div className="text-[11px] sm:text-xs font-bold text-gray-800">{label}</div>
      <div className="text-[9px] sm:text-[10px] text-gray-500 mt-0.5">{date}</div>
      <div className="text-[10px] sm:text-[11px] text-gray-600 mt-0.5 sm:mt-1">{desc}</div>
    </div>
  </div>
);

// ── Transaction Details Page ──────────────────────────────────────────────────
const TransactionDetails = ({ txn, onBack }) => {
  const netAmount = txn.amount - txn.charges;
  
  return (
    <div className="p-3 sm:p-5 font-sans">
      {/* Breadcrumb + header */}
      <div className="flex items-center justify-between mb-4 sm:mb-5 flex-wrap gap-3">
        <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm flex-wrap">
          <button onClick={onBack} className="text-blue-600 hover:underline font-medium">Payout History</button>
          <svg width={12} sm:width={14} height={12} sm:height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="text-gray-400">
            <path d="M9 18l6-6-6-6"/>
          </svg>
          <span className="text-gray-800 font-semibold">Transaction Details</span>
        </div>
      </div>

      {/* Summary card */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 mb-4 sm:mb-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 sm:gap-5">
          <div>
            <div className="text-[10px] sm:text-xs text-gray-600 font-medium mb-1">Payout ID</div>
            <div className="flex items-center gap-1 flex-wrap">
              <span className="text-xs sm:text-sm font-bold text-gray-900 font-mono break-all">{txn.id}</span>
              <button 
                onClick={() => navigator.clipboard.writeText(txn.id)}
                className="text-gray-400 hover:text-blue-600 transition-colors shrink-0"
              >
                <svg width={11} sm:width={13} height={11} sm:height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                </svg>
              </button>
            </div>
            <div className="mt-1.5"><StatusBadge status={txn.status} /></div>
          </div>
          
          <div>
            <div className="text-[10px] sm:text-xs text-gray-600 font-medium mb-1">Amount</div>
            <div className="text-base sm:text-lg font-bold text-gray-900">
              ₹{txn.amount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
            </div>
          </div>
          
          <div>
            <div className="text-[10px] sm:text-xs text-gray-600 font-medium mb-1">Charges</div>
            <div className="text-xs sm:text-sm font-semibold text-gray-900">
              ₹{txn.charges.toFixed(2)}
            </div>
          </div>
          
          <div>
            <div className="text-[10px] sm:text-xs text-gray-600 font-medium mb-1">Net Amount</div>
            <div className="text-xs sm:text-sm font-semibold text-gray-900">
              ₹{netAmount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
            </div>
          </div>
          
          <div>
            <div className="text-[10px] sm:text-xs text-gray-600 font-medium mb-1">UTR</div>
            <div className="text-[10px] sm:text-xs font-mono font-semibold text-gray-900 break-all">
              {txn.utr || "–"}
            </div>
          </div>
          
          <div>
            <div className="text-[10px] sm:text-xs text-gray-600 font-medium mb-1">Order ID</div>
            <div className="flex items-center gap-1 flex-wrap">
              <span className="text-[10px] sm:text-xs font-mono font-semibold text-gray-900">{txn.orderId}</span>
              <button 
                onClick={() => navigator.clipboard.writeText(txn.orderId)}
                className="text-gray-400 hover:text-blue-600 transition-colors shrink-0"
              >
                <svg width={11} sm:width={13} height={11} sm:height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Details + Timeline */}
      <div className="flex flex-col lg:flex-row gap-4 sm:gap-5 mb-4 sm:mb-5">
        <div className="flex-1 lg:flex-3 bg-white rounded-2xl border border-gray-100 p-4 sm:p-5">
          <h3 className="text-xs sm:text-sm font-bold text-gray-900 mb-3 sm:mb-4">Payout Information</h3>
          <InfoRow label="Date & Time" value={`${txn.date}, ${txn.time}`} />
          <InfoRow label="Status" value={<StatusBadge status={txn.status} />} />
          <InfoRow label="Payout Mode" value="NEFT" />
          <InfoRow label="IFSC Code" value={txn.ifsc} mono />
          <InfoRow label="Bank Name" value={txn.bank} />
          <InfoRow label="Account Number" value="XXXXXXXXXX1234" mono />
          <InfoRow label="Beneficiary Name" value={txn.beneficiary} />
          <InfoRow label="Email (Beneficiary)" value="rohit.kumar@example.com" />
          <InfoRow label="Mobile (Beneficiary)" value="+91 98765 43210" />
          <InfoRow label="Remark (If Any)" value="–" />
        </div>

        <div className="flex-1 lg:flex-2 bg-white rounded-2xl border border-gray-100 p-4 sm:p-5">
          <h3 className="text-xs sm:text-sm font-bold text-gray-900 mb-3 sm:mb-4">Payout Status Timeline</h3>
          <TimelineStep 
            step={1} 
            done={txn.status !== "Pending"} 
            label="Payout Initiated"  
            date={txn.status !== "Pending" ? `${txn.date}, ${txn.time}` : "Pending"} 
            desc="Payout request received" 
          />
          <TimelineStep 
            step={2} 
            done={txn.status === "Success"} 
            label="Bank Processing"   
            date={txn.status === "Success" ? `${txn.date}, ${txn.time}` : "Pending"} 
            desc="Request sent to bank" 
          />
          <TimelineStep 
            step={3} 
            done={txn.status === "Success"} 
            label="Payout Successful" 
            date={txn.status === "Success" ? `${txn.date}, ${parseInt(txn.time.split(':')[0]) + 2}:${txn.time.split(':')[1]} ${txn.time.includes('PM') ? 'PM' : 'AM'}` : "Pending"} 
            desc="Amount credited successfully" 
          />
          <TimelineStep 
            step={4} 
            done={txn.status === "Success"} 
            last 
            label="Payout Completed"  
            date={txn.status === "Success" ? `${txn.date}, ${parseInt(txn.time.split(':')[0]) + 2}:${txn.time.split(':')[1]} ${txn.time.includes('PM') ? 'PM' : 'AM'}` : "Pending"} 
            desc="Transaction completed" 
          />
        </div>
      </div>

      {/* Beneficiary + Actions */}
      <div className="flex flex-col lg:flex-row gap-4 sm:gap-5">
        <div className="flex-1 lg:flex-3 bg-white rounded-2xl border border-gray-100 p-4 sm:p-5">
          <h3 className="text-xs sm:text-sm font-bold text-gray-900 mb-3 sm:mb-4">Beneficiary Details</h3>
          <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0">
              <svg width={22} sm:width={28} height={22} sm:height={28} viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth={1.5}>
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
            </div>
            <div className="flex-1 w-full">
              <InfoRow label="Name" value={txn.beneficiary} />
              <InfoRow label="Account Number" value="XXXXXXXXXX1234" mono />
              <InfoRow label="IFSC Code" value={txn.ifsc} mono />
              <InfoRow label="Bank Name" value={txn.bank} />
              <InfoRow label="Account Type" value="Savings Account" />
            </div>
          </div>
        </div>

        <div className="flex-1 lg:flex-2 bg-white rounded-2xl border border-gray-100 p-4 sm:p-5">
          <h3 className="text-xs sm:text-sm font-bold text-gray-900 mb-3 sm:mb-4">Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-3">
            <button className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 border border-blue-600 rounded-xl text-[10px] sm:text-xs font-medium text-blue-600 hover:bg-blue-50 transition-colors">
              <svg width={12} sm:width={14} height={12} sm:height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
              View Receipt
            </button>
            <button className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 border border-blue-600 rounded-xl text-[10px] sm:text-xs font-medium text-blue-600 hover:bg-blue-50 transition-colors">
              <svg width={12} sm:width={14} height={12} sm:height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
              Raise Support Ticket
            </button>
          </div>
          <button className="w-full flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-[10px] sm:text-xs font-semibold transition-colors">
            <svg width={12} sm:width={14} height={12} sm:height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
            </svg>
            Download Receipt
          </button>
        </div>
      </div>

      <button onClick={onBack} className="mt-4 sm:mt-5 flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-600 hover:text-blue-600 transition-colors font-medium">
        <svg width={14} sm:width={16} height={14} sm:height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        Back to Payout History
      </button>
    </div>
  );
};

// ── Main Payout History Page ───────────────────────────────────────────────────
const allPayouts = [
  { id:"BPY1234567890", date:"14 May 2025", time:"11:30 AM", beneficiary:"Rohit Kumar",  ifsc:"ICIC0001234", bank:"ICICI Bank",          amount:25000,  charges:12.50, orderId:"ORD123456", status:"Success",   utr:"ICIC512345678901" },
  { id:"BPY1234567889", date:"14 May 2025", time:"10:45 AM", beneficiary:"Neha Sharma",  ifsc:"HDFC0005678", bank:"HDFC Bank",           amount:15000,  charges:10.00, orderId:"ORD123455", status:"Success",   utr:"HDFC512345678902" },
  { id:"BPY1234567888", date:"14 May 2025", time:"10:20 AM", beneficiary:"Amit Verma",   ifsc:"SBIN0004321", bank:"State Bank of India", amount:8500,   charges:7.08,  orderId:"ORD123454", status:"Pending",   utr:null },
  { id:"BPY1234567887", date:"14 May 2025", time:"09:15 AM", beneficiary:"Pooja Singh",  ifsc:"KKBK0009876", bank:"Kotak Mahindra Bank", amount:12000,  charges:9.44,  orderId:"ORD123453", status:"Failed",    utr:null },
  { id:"BPY1234567886", date:"13 May 2025", time:"06:40 PM", beneficiary:"Vikram Joshi", ifsc:"ICIC0001234", bank:"ICICI Bank",          amount:30000,  charges:14.75, orderId:"ORD123452", status:"Success",   utr:"ICIC512345678903" },
  { id:"BPY1234567885", date:"13 May 2025", time:"05:25 PM", beneficiary:"Anjali Mehta", ifsc:"HDFC0005678", bank:"HDFC Bank",           amount:5200,   charges:6.20,  orderId:"ORD123451", status:"Cancelled", utr:null },
  { id:"BPY1234567884", date:"13 May 2025", time:"04:10 PM", beneficiary:"Suresh Patel", ifsc:"SBIN0004321", bank:"State Bank of India", amount:18750,  charges:11.80, orderId:"ORD123450", status:"Success",   utr:"SBIN512345678904" },
  { id:"BPY1234567883", date:"13 May 2025", time:"03:05 PM", beneficiary:"Karan Malhotra",ifsc:"KKBK0009876",bank:"Kotak Mahindra Bank", amount:11000,  charges:8.85,  orderId:"ORD123449", status:"Pending",   utr:null },
  { id:"BPY1234567882", date:"13 May 2025", time:"02:20 PM", beneficiary:"Megha Gupta",  ifsc:"ICIC0001234", bank:"ICICI Bank",          amount:9800,   charges:7.56,  orderId:"ORD123448", status:"Success",   utr:"ICIC512345678905" },
  { id:"BPY1234567881", date:"13 May 2025", time:"01:10 PM", beneficiary:"Dev Sharma",   ifsc:"HDFC0005678", bank:"HDFC Bank",           amount:7600,   charges:6.84,  orderId:"ORD123447", status:"Failed",    utr:null },
];

export default function PayoutHistory() {
  const [selected, setSelected] = useState(null);
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [search, setSearch] = useState("");
  const [benSearch, setBenSearch] = useState("");
  const [page, setPage] = useState(1);
  const [openMenu, setOpenMenu] = useState(null);
  const [dateRange, setDateRange] = useState(null);
  const rowsPerPage = 10;

  if (selected) {
    return <TransactionDetails txn={selected} onBack={() => setSelected(null)} />;
  }

  const filtered = allPayouts.filter(p => {
    const matchStatus = statusFilter === "All Status" || p.status === statusFilter;
    const matchOrder  = !search || p.orderId.toLowerCase().includes(search.toLowerCase());
    const matchBen    = !benSearch || p.beneficiary.toLowerCase().includes(benSearch.toLowerCase());
    return matchStatus && matchOrder && matchBen;
  });

  const handleDateChange = (dateData) => {
    if (dateData) {
      setDateRange(dateData);
      console.log('Date Range Selected:', {
        startDate: dateData.startDate,
        endDate: dateData.endDate,
        startFormatted: dateData.startFormatted,
        endFormatted: dateData.endFormatted,
        dateRange: dateData.dateRange
      });
    } else {
      console.log('Date range cleared');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-5 font-sans">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 sm:mb-5 flex-wrap gap-3">
        <div>
          <h1 className="text-base sm:text-[18px] font-bold text-gray-900">Payout History</h1>
          <p className="text-[10px] sm:text-xs text-gray-600 font-medium mt-0.5">View and track all your payout transactions</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-gray-100 p-3 sm:p-4 mb-4 sm:mb-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {/* Date Range */}
          <div>
            <label className="text-[10px] sm:text-xs font-semibold text-black mb-1 block">Date Range</label>
            <DateRangePicker 
              onDateChange={handleDateChange}
              placeholder="Select date range"
            />
          </div>
          
          {/* Status */}
          <div>
            <label className="text-[10px] sm:text-xs font-semibold text-black mb-1 block">Status</label>
            <div className="relative">
              <select
                value={statusFilter}
                onChange={e => { setStatusFilter(e.target.value); setPage(1); }}
                className="w-full appearance-none pl-2.5 sm:pl-3 pr-7 sm:pr-8 py-1.5 sm:py-2 border border-gray-200 rounded-xl text-[11px] sm:text-xs text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 cursor-pointer"
              >
                {["All Status","Success","Failed","Pending","Cancelled"].map(s => <option key={s}>{s}</option>)}
              </select>
              <svg className="absolute right-2 sm:right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" width={11} sm:width={12} height={11} sm:height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M19 9l-7 7-7-7"/>
              </svg>
            </div>
          </div>
          
          {/* Order ID */}
          <div>
            <label className="text-[10px] sm:text-xs font-semibold text-black mb-1 block">Order ID (Optional)</label>
            <div className="relative">
              <svg className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 text-gray-400" width={11} sm:width={13} height={11} sm:height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <circle cx="11" cy="11" r="8"/>
                <path d="M21 21l-4.35-4.35"/>
              </svg>
              <input
                value={search}
                onChange={e => { setSearch(e.target.value); setPage(1); }}
                placeholder="Search Order ID"
                className="w-full pl-8 sm:pl-9 pr-2.5 sm:pr-3 py-1.5 sm:py-2 border border-gray-200 rounded-xl text-[11px] sm:text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 placeholder:text-gray-400"
              />
            </div>
          </div>
          
          {/* Beneficiary */}
          <div>
            <label className="text-[10px] sm:text-xs font-semibold text-black mb-1 block">Beneficiary Name (Optional)</label>
            <div className="relative">
              <svg className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 text-gray-400" width={11} sm:width={13} height={11} sm:height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <circle cx="11" cy="11" r="8"/>
                <path d="M21 21l-4.35-4.35"/>
              </svg>
              <input
                value={benSearch}
                onChange={e => { setBenSearch(e.target.value); setPage(1); }}
                placeholder="Search Beneficiary"
                className="w-full pl-8 sm:pl-9 pr-2.5 sm:pr-3 py-1.5 sm:py-2 border border-gray-200 rounded-xl text-[11px] sm:text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 placeholder:text-gray-400"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-end gap-2 mt-3">
          <button 
            onClick={() => { setStatusFilter("All Status"); setSearch(""); setBenSearch(""); setPage(1); }}
            className="px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-200 rounded-xl text-[11px] sm:text-xs text-gray-600 hover:bg-gray-50 transition-colors font-medium"
          >
            Reset
          </button>
          <button className="px-4 sm:px-5 py-1.5 sm:py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-[11px] sm:text-xs font-semibold transition-colors">
            Apply Filters
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 px-4 sm:px-5 py-3 sm:py-3.5 border-b border-gray-100">
          <span className="text-xs sm:text-sm font-bold text-gray-900">Total {filtered.length.toLocaleString()} Payouts</span>
          <button className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-200 rounded-xl text-[11px] sm:text-sm text-gray-600 hover:bg-gray-50 transition-colors font-medium">
            <svg width={12} sm:width={14} height={12} sm:height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
            </svg>
            Export
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-200 lg:min-w-full">
            <thead>
              <tr className="bg-gray-50/70 border-b border-gray-100">
                {["ID","Date","Beneficiary Name","IFSC Code","Bank","Amount (₹)","Charges (₹)","Order ID","Status","UTR","Action"].map(h => (
                  <th key={h} className="px-3 sm:px-4 py-2.5 sm:py-3 text-left text-[10px] sm:text-xs font-semibold text-gray-800 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.slice((page-1)*rowsPerPage, page*rowsPerPage).map(txn => (
                <tr key={txn.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/60 transition-colors">
                  <td className="px-3 sm:px-4 py-2.5 sm:py-3.5">
                    <button onClick={() => setSelected(txn)} className="text-[10px] sm:text-xs font-mono text-gray-800 hover:text-blue-600 hover:underline transition-colors text-left">
                      {txn.id}
                    </button>
                  </td>
                  <td className="px-3 sm:px-4 py-2.5 sm:py-3.5">
                    <div className="text-[10px] sm:text-xs font-medium text-gray-800 whitespace-nowrap">{txn.date}</div>
                    <div className="text-[9px] sm:text-[11px] text-gray-500">{txn.time}</div>
                  </td>
                  <td className="px-3 sm:px-4 py-2.5 sm:py-3.5 text-[10px] sm:text-xs font-medium text-gray-800 whitespace-nowrap">{txn.beneficiary}</td>
                  <td className="px-3 sm:px-4 py-2.5 sm:py-3.5 text-[10px] sm:text-xs font-medium text-gray-800 whitespace-nowrap">{txn.ifsc}</td>
                  <td className="px-3 sm:px-4 py-2.5 sm:py-3.5 text-[10px] sm:text-xs font-medium text-gray-700 whitespace-nowrap">{txn.bank}</td>
                  <td className="px-3 sm:px-4 py-2.5 sm:py-3.5 text-[10px] sm:text-xs font-semibold text-gray-900 whitespace-nowrap">
                    {txn.amount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                  </td>
                  <td className="px-3 sm:px-4 py-2.5 sm:py-3.5 text-[10px] sm:text-xs font-medium text-gray-800 whitespace-nowrap">{txn.charges.toFixed(2)}</td>
                  <td className="px-3 sm:px-4 py-2.5 sm:py-3.5 text-[10px] sm:text-xs font-medium text-gray-800 whitespace-nowrap">{txn.orderId}</td>
                  <td className="px-3 sm:px-4 py-2.5 sm:py-3.5"><StatusBadge status={txn.status} /></td>
                  <td className="px-3 sm:px-4 py-2.5 sm:py-3.5 text-[10px] sm:text-xs font-medium text-gray-800 whitespace-nowrap">{txn.utr || "–"}</td>
                  <td className="px-3 sm:px-4 py-2.5 sm:py-3.5 relative">
                    <button
                      onClick={(e) => { e.stopPropagation(); setOpenMenu(openMenu === txn.id ? null : txn.id); }}
                      className="p-1 rounded-lg hover:bg-gray-100 text-gray-400 transition-colors"
                    >
                      <svg width={14} sm:width={16} height={14} sm:height={16} viewBox="0 0 24 24" fill="currentColor">
                        <circle cx="12" cy="5" r="1.5"/>
                        <circle cx="12" cy="12" r="1.5"/>
                        <circle cx="12" cy="19" r="1.5"/>
                      </svg>
                    </button>
                    {openMenu === txn.id && (
                      <div className="absolute right-6 sm:right-8 top-0 sm:top-2 z-50 bg-white rounded-xl shadow-xl border border-gray-100 py-1 w-36 sm:w-40">
                        <button
                          onClick={() => { setSelected(txn); setOpenMenu(null); }}
                          className="flex items-center gap-2 sm:gap-2.5 w-full px-2.5 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-xs text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <svg width={11} sm:width={13} height={11} sm:height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                            <circle cx="12" cy="12" r="3"/>
                          </svg>
                          View Details
                        </button>
                        <button className="flex items-center gap-2 sm:gap-2.5 w-full px-2.5 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-xs text-gray-700 hover:bg-gray-50 transition-colors">
                          <svg width={11} sm:width={13} height={11} sm:height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                            <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                          </svg>
                          Download Receipt
                        </button>
                        <button className="flex items-center gap-2 sm:gap-2.5 w-full px-2.5 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-xs text-gray-700 hover:bg-gray-50 transition-colors">
                          <svg width={11} sm:width={13} height={11} sm:height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
                            <polyline points="15 3 21 3 21 9"/>
                            <line x1="10" y1="14" x2="21" y2="3"/>
                          </svg>
                          Raise Ticket
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 sm:px-5 py-3 sm:py-3.5 border-t border-gray-100">
          <span className="text-[10px] sm:text-xs text-gray-500 text-center sm:text-left">
            Showing {Math.min((page-1)*rowsPerPage+1, filtered.length)} to {Math.min(page*rowsPerPage, filtered.length)} of {filtered.length.toLocaleString()} results
          </span>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button 
              onClick={() => setPage(p => Math.max(1, p-1))} 
              disabled={page===1}
              className="p-1 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <svg width={12} sm:width={14} height={12} sm:height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            </button>
            {Array.from({ length: Math.min(5, Math.ceil(filtered.length/rowsPerPage)) }, (_, i) => i+1).map(p => (
              <button 
                key={p} 
                onClick={() => setPage(p)}
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg text-[10px] sm:text-xs font-semibold transition-colors ${page===p?"bg-blue-600 text-white":"border border-gray-200 text-gray-600 hover:bg-gray-50"}`}
              >
                {p}
              </button>
            ))}
            <button 
              onClick={() => setPage(p => Math.min(Math.ceil(filtered.length/rowsPerPage), p+1))}
              disabled={page===Math.ceil(filtered.length/rowsPerPage)}
              className="p-1 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <svg width={12} sm:width={14} height={12} sm:height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}