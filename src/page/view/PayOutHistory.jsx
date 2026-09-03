// import { useState, useEffect } from "react";
// import DateRangePicker from "../../components/DatePicker";
// import transactionService from "../../services/TransactionHistoryServices";
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";

// // ── Status Badge ─────────────────────────────────────────────────────────────
// const StatusBadge = ({ status }) => {
//   const map = {
//     success:   "bg-green-50 text-green-700 border-green-200",
//     failed:    "bg-red-50 text-red-600 border-red-200",
//     pending:   "bg-orange-50 text-orange-600 border-orange-200",
//     processing: "bg-blue-50 text-blue-600 border-blue-200",
//     initiated: "bg-yellow-50 text-yellow-600 border-yellow-200",
//     returned:  "bg-purple-50 text-purple-600 border-purple-200",
//     cancelled: "bg-gray-100 text-gray-500 border-gray-200",
//   };
  
//   const displayStatus = status?.charAt(0).toUpperCase() + status?.slice(1) || status || 'Unknown';
//   const key = status?.toLowerCase() || '';
//   const matchedKey = Object.keys(map).find(k => k === key);
  
//   return (
//     <span className={`px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold border whitespace-nowrap ${map[matchedKey] || "bg-gray-100 text-gray-500 border-gray-200"}`}>
//       {displayStatus}
//     </span>
//   );
// };

// // ── InfoRow ───────────────────────────────────────────────────────────────────
// const InfoRow = ({ label, value, mono }) => (
//   <div className="flex flex-col sm:flex-row sm:items-start py-2 sm:py-2.5 border-b border-gray-50 last:border-0">
//     <span className="text-[11px] sm:text-xs text-gray-600 font-medium sm:w-36 md:w-44 shrink-0">{label}</span>
//     <span className="hidden sm:inline text-gray-500 mx-3 text-xs">:</span>
//     <span className={`text-[11px] sm:text-xs font-semibold text-gray-800 mt-0.5 sm:mt-0 ${mono ? "font-mono" : ""}`}>{value || "–"}</span>
//   </div>
// );

// // ── Timeline Step ──
// const TimelineStep = ({ step, label, date, desc, done, last }) => (
//   <div className="flex gap-2 sm:gap-3 relative">
//     <div className="flex flex-col items-center">
//       <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center z-10 shrink-0 ${done ? "bg-green-500" : "bg-gray-200"}`}>
//         {done ? (
//           <svg width={10} sm:width={12} height={10} sm:height={12} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={3}>
//             <path d="M20 6L9 17l-5-5"/>
//           </svg>
//         ) : (
//           <span className="text-[10px] sm:text-xs font-bold text-gray-500">{step}</span>
//         )}
//       </div>
//       {!last && <div className={`w-0.5 flex-1 mt-1 ${done ? "bg-green-300" : "bg-gray-200"}`} style={{ minHeight: 40 }} />}
//     </div>
//     <div className="pb-3 sm:pb-4 flex-1">
//       <div className="text-[11px] sm:text-xs font-bold text-gray-800">{label}</div>
//       <div className="text-[9px] sm:text-[10px] text-gray-500 mt-0.5">{date}</div>
//       <div className="text-[10px] sm:text-[11px] text-gray-600 mt-0.5 sm:mt-1">{desc}</div>
//     </div>
//   </div>
// );

// // ── Transaction Details Page ──────────────────────────────────────────────────
// const TransactionDetails = ({ txn, onBack }) => {
//   if (!txn) return null;

//   const formatCurrency = (amount) => {
//     const num = parseFloat(amount);
//     if (isNaN(num)) return '0.00';
//     return num.toLocaleString("en-IN", { minimumFractionDigits: 2 });
//   };

// const formatDate = (dateString) => {
//   if (!dateString) return 'N/A';
//   const date = new Date(dateString);
//   return date.toLocaleDateString('en-IN', { 
//     day: '2-digit', 
//     month: 'short', 
//     year: 'numeric',
  
//   });
// };

//  const formatTime = (dateString) => {
//   if (!dateString) return 'N/A';
//   const date = new Date(dateString);
//   return date.toLocaleTimeString('en-IN', { 
//     hour: '2-digit', 
//     minute: '2-digit',
//     hour12: true,
//     timeZone: 'Asia/Kolkata'  // ← yeh add karo
//   });
// };

//   const netAmount = parseFloat(txn.amount) - parseFloat(txn.charges || 0);

//   // ─── PDF Export Function for Single Transaction ────────────────────────────
//   const exportTransactionPDF = () => {
//     try {
//       const doc = new jsPDF('p', 'mm', 'a4');
//       const pageWidth = doc.internal.pageSize.getWidth();
//       const pageHeight = doc.internal.pageSize.getHeight();
      
//       // Clean white background
//       doc.setFillColor(255, 255, 255);
//       doc.rect(0, 0, pageWidth, pageHeight, 'F');
      
//       // Top accent bar
//       doc.setFillColor(59, 130, 246);
//       doc.rect(0, 0, pageWidth, 6, 'F');
      
//       // Header
//       doc.setTextColor(31, 41, 55);
//       doc.setFontSize(24);
//       doc.setFont('helvetica', 'bold');
//       doc.text('PAYMENT RECEIPT', pageWidth / 2, 25, { align: 'center' });
      
//       doc.setFontSize(10);
//       doc.setFont('helvetica', 'normal');
//       doc.setTextColor(107, 114, 128);
//       doc.text('Transaction Confirmation', pageWidth / 2, 33, { align: 'center' });
      
//       doc.setFontSize(9);
//       doc.setTextColor(156, 163, 175);
//       doc.text(`Receipt #: ${txn.trx_id || txn.id}`, pageWidth / 2, 41, { align: 'center' });
      
//       doc.setDrawColor(229, 231, 235);
//       doc.line(30, 48, pageWidth - 30, 48);
      
//       // Status - Plain text without color background
//       const statusText = txn.status?.toUpperCase() || 'UNKNOWN';
//       doc.setTextColor(107, 114, 128);
//       doc.setFontSize(9);
//       doc.setFont('helvetica', 'bold');
//       doc.text(`Status: ${statusText}`, pageWidth - 30, 57, { align: 'right' });
      
//       // Amount Section
//       doc.setFillColor(249, 250, 251);
//       doc.roundedRect(20, 60, pageWidth - 40, 30, 4, 4, 'F');
      
//       doc.setTextColor(107, 114, 128);
//       doc.setFontSize(9);
//       doc.setFont('helvetica', 'normal');
//       doc.text('Total Amount', pageWidth / 2, 72, { align: 'center' });
      
//       doc.setTextColor(31, 41, 55);
//       doc.setFontSize(22);
//       doc.setFont('helvetica', 'bold');
//       doc.text(`Rs. ${formatCurrency(txn.amount)}`, pageWidth / 2, 86, { align: 'center' });
      
//       // Transaction Details Section
//       doc.setTextColor(31, 41, 55);
//       doc.setFontSize(13);
//       doc.setFont('helvetica', 'bold');
//       doc.text('Transaction Details', 20, 110);
      
//       doc.setDrawColor(229, 231, 235);
//       doc.line(20, 114, pageWidth - 20, 114);
      
//       // Details in clean rows
//       const details = [
//         ['Transaction ID', txn.trx_id || txn.id],
//         ['Order ID', txn.order_id || 'N/A'],
//         ['Date & Time', `${formatDate(txn.created_at)} at ${formatTime(txn.created_at)}`],
//         ['UTR Number', txn.utr || 'N/A'],
//       ];
      
//       let yPos = 124;
//       details.forEach(([label, value]) => {
//         doc.setFontSize(9);
//         doc.setTextColor(107, 114, 128);
//         doc.setFont('helvetica', 'bold');
//         doc.text(label, 20, yPos);
        
//         doc.setTextColor(31, 41, 55);
//         doc.setFont('helvetica', 'normal');
//         const maxWidth = 120;
//         const valueStr = String(value);
//         if (doc.getStringUnitWidth(valueStr) * 9 / 3 > maxWidth) {
//           const lines = doc.splitTextToSize(valueStr, maxWidth);
//           doc.text(lines, 80, yPos);
//         } else {
//           doc.text(valueStr, 80, yPos);
//         }
//         yPos += 8;
//       });
      
//       // Divider
//       yPos += 4;
//       doc.setDrawColor(229, 231, 235);
//       doc.line(20, yPos, pageWidth - 20, yPos);
//       yPos += 8;
      
//       // Amount Breakdown
//       doc.setTextColor(31, 41, 55);
//       doc.setFontSize(11);
//       doc.setFont('helvetica', 'bold');
//       doc.text('Amount Breakdown', 20, yPos);
//       yPos += 6;
      
//       const amountDetails = [
//         ['Subtotal', `Rs. ${formatCurrency(txn.amount)}`],
//         ['Charges', `Rs. ${formatCurrency(txn.charges || 0)}`],
//         ['Net Amount', `Rs. ${netAmount.toFixed(2)}`],
//       ];
      
//       amountDetails.forEach(([label, value], index) => {
//         const isLast = index === amountDetails.length - 1;
//         doc.setFontSize(9);
        
//         if (isLast) {
//           doc.setTextColor(31, 41, 55);
//           doc.setFont('helvetica', 'bold');
//         } else {
//           doc.setTextColor(107, 114, 128);
//           doc.setFont('helvetica', 'normal');
//         }
        
//         doc.text(label, 30, yPos + 6);
//         doc.text(value, pageWidth - 35, yPos + 6, { align: 'right' });
//         yPos += 7;
//       });
      
//       // Divider
//       yPos += 4;
//       doc.setDrawColor(229, 231, 235);
//       doc.line(20, yPos, pageWidth - 20, yPos);
//       yPos += 8;
      
//       // Beneficiary Section
//       doc.setTextColor(31, 41, 55);
//       doc.setFontSize(11);
//       doc.setFont('helvetica', 'bold');
//       doc.text('Beneficiary Details', 20, yPos);
//       yPos += 6;
      
//       const beneficiary = [
//         ['Name', txn.bene_name || 'N/A'],
//         ['Account Number', txn.account_number || 'XXXXXXXXXX1234'],
//         ['IFSC Code', txn.ifsc || 'N/A'],
//         ['Bank Name', txn.bank_name || 'N/A'],
//       ];
      
//       beneficiary.forEach(([label, value]) => {
//         doc.setFontSize(9);
//         doc.setTextColor(107, 114, 128);
//         doc.setFont('helvetica', 'bold');
//         doc.text(label, 30, yPos + 6);
        
//         doc.setTextColor(31, 41, 55);
//         doc.setFont('helvetica', 'normal');
//         doc.text(String(value), 80, yPos + 6);
//         yPos += 7;
//       });
      
//       // Footer
//       const footerY = pageHeight - 30;
//       doc.setDrawColor(229, 231, 235);
//       doc.line(20, footerY, pageWidth - 20, footerY);
      
//       doc.setTextColor(156, 163, 175);
//       doc.setFontSize(8);
//       doc.setFont('helvetica', 'italic');
//       doc.text('This is a system generated receipt.', pageWidth / 2, footerY + 8, { align: 'center' });
      
//       doc.setFontSize(7);
//       doc.setFont('helvetica', 'normal');
//       doc.text(`Generated on: ${new Date().toLocaleString()}`, pageWidth / 2, footerY + 15, { align: 'center' });
      
//       // Save
//       doc.save(`Transaction_Receipt_${txn.trx_id || txn.id}.pdf`);
//     } catch (error) {
//       console.error('Error generating PDF:', error);
//       alert('Failed to generate PDF. Please try again.');
//     }
//   };

//   // ─── Webhook Handler ─────────────────────────────────────────────────────
//   const handleResendWebhook = async (orderId) => {
//     if (!orderId) {
//       alert('Order ID not found for this transaction');
//       return;
//     }

//     try {
//       await transactionService.resendWebHook(orderId);
//       alert(`Webhook resent successfully for order ${orderId}`);
//       console.log('✅ Webhook resent successfully for order:', orderId);
//     } catch (error) {
//       console.error('❌ Failed to resend webhook:', error);
//       alert('Failed to resend webhook. Please try again.');
//     }
//   };

//   return (
//     <div className="p-3 sm:p-5 font-sans">
//       {/* Breadcrumb + header */}
//       <div className="flex items-center justify-between mb-4 sm:mb-5 flex-wrap gap-3">
//         <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm flex-wrap">
//           <button onClick={onBack} className="text-blue-600 hover:underline font-medium">Payout History</button>
//           <svg width={12} sm:width={14} height={12} sm:height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="text-gray-400">
//             <path d="M9 18l6-6-6-6"/>
//           </svg>
//           <span className="text-gray-800 font-semibold">Transaction Details</span>
//         </div>
//         <div className="flex items-center gap-2">
//           <button
//             onClick={() => handleResendWebhook(txn.order_id)}
//             className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg text-xs font-medium transition-colors border border-blue-200"
//           >
//             <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
//               <path d="M4 4v16h16" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
//               <path d="M8 12l3 3 8-8" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
//             </svg>
//             Resend Webhook
//           </button>
//         </div>
//       </div>

//       {/* Summary card */}
//       <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 mb-4 sm:mb-5">
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 sm:gap-5">
//           <div>
//             <div className="text-[10px] sm:text-xs text-gray-600 font-medium mb-1">Payout ID</div>
//             <div className="flex items-center gap-1 flex-wrap">
//               <span className="text-xs sm:text-sm font-bold text-gray-900 font-mono break-all">{txn.trx_id || txn.id}</span>
//               <button 
//                 onClick={() => navigator.clipboard.writeText(txn.trx_id || txn.id)}
//                 className="text-gray-400 hover:text-blue-600 transition-colors shrink-0"
//               >
//                 <svg width={11} sm:width={13} height={11} sm:height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
//                   <path d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
//                 </svg>
//               </button>
//             </div>
//             <div className="mt-1.5"><StatusBadge status={txn.status} /></div>
//           </div>
          
//           <div>
//             <div className="text-[10px] sm:text-xs text-gray-600 font-medium mb-1">Amount</div>
//             <div className="text-base sm:text-lg font-bold text-gray-900">
//               ₹{formatCurrency(txn.amount)}
//             </div>
//           </div>
          
//           <div>
//             <div className="text-[10px] sm:text-xs text-gray-600 font-medium mb-1">Charges</div>
//             <div className="text-xs sm:text-sm font-semibold text-gray-900">
//               ₹{formatCurrency(txn.charges || 0)}
//             </div>
//           </div>
          
//           <div>
//             <div className="text-[10px] sm:text-xs text-gray-600 font-medium mb-1">Net Amount</div>
//             <div className="text-xs sm:text-sm font-semibold text-gray-900">
//               ₹{netAmount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
//             </div>
//           </div>
          
//           <div>
//             <div className="text-[10px] sm:text-xs text-gray-600 font-medium mb-1">UTR</div>
//             <div className="text-[10px] sm:text-xs font-mono font-semibold text-gray-900 break-all">
//               {txn.utr || "–"}
//             </div>
//           </div>
          
//           <div>
//             <div className="text-[10px] sm:text-xs text-gray-600 font-medium mb-1">Order ID</div>
//             <div className="flex items-center gap-1 flex-wrap">
//               <span className="text-[10px] sm:text-xs font-mono font-semibold text-gray-900">{txn.order_id || 'N/A'}</span>
//               <button 
//                 onClick={() => navigator.clipboard.writeText(txn.order_id || 'N/A')}
//                 className="text-gray-400 hover:text-blue-600 transition-colors shrink-0"
//               >
//                 <svg width={11} sm:width={13} height={11} sm:height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
//                   <path d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
//                 </svg>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Details + Timeline */}
//       <div className="flex flex-col lg:flex-row gap-4 sm:gap-5 mb-4 sm:mb-5">
//         <div className="flex-1 lg:flex-3 bg-white rounded-2xl border border-gray-100 p-4 sm:p-5">
//           <h3 className="text-xs sm:text-sm font-bold text-gray-900 mb-3 sm:mb-4">Payout Information</h3>
//           <InfoRow label="Date & Time" value={`${formatDate(txn.created_at)}, ${formatTime(txn.created_at)}`} />
//           <InfoRow label="Status" value={<StatusBadge status={txn.status} />} />
//           <InfoRow label="IFSC Code" value={txn.ifsc || 'N/A'} mono />
//           <InfoRow label="Bank Name" value={txn.bank_name || 'N/A'} />
//           <InfoRow label="Account Number" value={txn.account_number || 'XXXXXXXXXX1234'} mono />
//           <InfoRow label="Beneficiary Name" value={txn.bene_name || 'N/A'} />
//           <InfoRow label="Email (Beneficiary)" value={txn.email || 'N/A'} />
//           <InfoRow label="Mobile (Beneficiary)" value={txn.phone || 'N/A'} />
//           <InfoRow label="Remark (If Any)" value={txn.remark || '–'} />
//         </div>

//         <div className="flex-1 lg:flex-2 bg-white rounded-2xl border border-gray-100 p-4 sm:p-5">
//           <h3 className="text-xs sm:text-sm font-bold text-gray-900 mb-3 sm:mb-4">Payout Status Timeline</h3>
//           <TimelineStep 
//             step={1} 
//             done={txn.status !== "initiated" && txn.status !== "pending"} 
//             label="Payout Initiated"  
//             date={txn.status !== "initiated" && txn.status !== "pending" ? `${formatDate(txn.created_at)}, ${formatTime(txn.created_at)}` : "Pending"} 
//             desc="Payout request received" 
//           />
//           <TimelineStep 
//             step={2} 
//             done={txn.status === "success" || txn.status === "failed" || txn.status === "returned"} 
//             label="Bank Processing"   
//             date={txn.status === "success" ? `${formatDate(txn.created_at)}, ${formatTime(txn.created_at)}` : "Pending"} 
//             desc="Request sent to bank" 
//           />
//           <TimelineStep 
//             step={3} 
//             done={txn.status === "success"} 
//             label="Payout Successful" 
//             date={txn.status === "success" ? `${formatDate(txn.created_at)}, ${formatTime(txn.created_at)}` : "Pending"} 
//             desc="Amount credited successfully" 
//           />
//           <TimelineStep 
//             step={4} 
//             done={txn.status === "success"} 
//             last 
//             label="Payout Completed"  
//             date={txn.status === "success" ? `${formatDate(txn.created_at)}, ${formatTime(txn.created_at)}` : "Pending"} 
//             desc="Transaction completed" 
//           />
//         </div>
//       </div>

//       {/* Beneficiary + Actions */}
//       <div className="flex flex-col lg:flex-row gap-4 sm:gap-5">
//         <div className="flex-1 lg:flex-3 bg-white rounded-2xl border border-gray-100 p-4 sm:p-5">
//           <h3 className="text-xs sm:text-sm font-bold text-gray-900 mb-3 sm:mb-4">Beneficiary Details</h3>
//           <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
//             <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0">
//               <svg width={22} sm:width={28} height={22} sm:height={28} viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth={1.5}>
//                 <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
//                 <polyline points="9 22 9 12 15 12 15 22"/>
//               </svg>
//             </div>
//             <div className="flex-1 w-full">
//               <InfoRow label="Name" value={txn.bene_name || 'N/A'} />
//               <InfoRow label="Account Number" value={txn.account_number || 'XXXXXXXXXX1234'} mono />
//               <InfoRow label="IFSC Code" value={txn.ifsc || 'N/A'} mono />
//               <InfoRow label="Bank Name" value={txn.bank_name || 'N/A'} />
//             </div>
//           </div>
//         </div>

//         <div className="flex-1 lg:flex-2 bg-white rounded-2xl border border-gray-100 p-4 sm:p-5">
//           <h3 className="text-xs sm:text-sm font-bold text-gray-900 mb-3 sm:mb-4">Actions</h3>
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-3">
//             <button 
//               onClick={exportTransactionPDF}
//               className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 border border-blue-600 rounded-xl text-[10px] sm:text-xs font-medium text-blue-600 hover:bg-blue-50 transition-colors"
//             >
//               <svg width={12} sm:width={14} height={12} sm:height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
//                 <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
//                 <circle cx="12" cy="12" r="3"/>
//               </svg>
//               View Receipt
//             </button>
//             <button className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 border border-blue-600 rounded-xl text-[10px] sm:text-xs font-medium text-blue-600 hover:bg-blue-50 transition-colors">
//               <svg width={12} sm:width={14} height={12} sm:height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
//                 <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
//                 <polyline points="15 3 21 3 21 9"/>
//                 <line x1="10" y1="14" x2="21" y2="3"/>
//               </svg>
//               Raise Support Ticket
//             </button>
//           </div>
//           <button 
//             onClick={exportTransactionPDF}
//             className="w-full flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-[10px] sm:text-xs font-semibold transition-colors"
//           >
//             <svg width={12} sm:width={14} height={12} sm:height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
//               <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
//             </svg>
//             Download Receipt
//           </button>
//         </div>
//       </div>

//       <button onClick={onBack} className="mt-4 sm:mt-5 flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-600 hover:text-blue-600 transition-colors font-medium">
//         <svg width={14} sm:width={16} height={14} sm:height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
//           <path d="M19 12H5M12 19l-7-7 7-7"/>
//         </svg>
//         Back to Payout History
//       </button>
//     </div>
//   );
// };

// // ── Main Payout History Page ───────────────────────────────────────────────────
// export default function PayoutHistory() {
//   const [selected, setSelected] = useState(null);
//   const [statusFilter, setStatusFilter] = useState("All Status");
//   const [search, setSearch] = useState("");
//   const [benSearch, setBenSearch] = useState("");
//   const [page, setPage] = useState(1);
//   const [openMenu, setOpenMenu] = useState(null);
//   const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
//   const [dateRange, setDateRange] = useState(null);
//   const [selectedDateRange, setSelectedDateRange] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [webhookLoading, setWebhookLoading] = useState(null);
//   const [transactionData, setTransactionData] = useState({
//     data: [],
//     stats: {
//       all_count: 0,
//       initiated: "0",
//       processing: "0",
//       success: "0",
//       failed: "0",
//       returned: "0",
//       total_amount: "0",
//       success_amount: "0"
//     },
//     total: 0,
//     totalPages: 0,
//     page: 1,
//     limit: 10
//   });
//   const [limit, setLimit] = useState(10);

//   const rowsPerPage = 10;

//   // ─── Fetch Transactions ──────────────────────────────────────────────────
//   const fetchTransactions = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const params = {
//         page: page,
//         limit: limit
//       };
      
//       if (search) {
//         params.search = search;
//       }
      
//       if (statusFilter !== "All Status") {
//         params.status = statusFilter.toLowerCase();
//       }
      
//       if (dateRange) {
//         params.from_date = dateRange.startFormatted;
//         params.to_date = dateRange.endFormatted;
//       }
      
//       const response = await transactionService.getTransactions(params);
//       console.log("Transactions:", response);
//       setTransactionData(response);
//     } catch (err) {
//       console.error("Error fetching transactions:", err);
//       setError("Failed to load transactions. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTransactions();
//   }, [page, limit, statusFilter, dateRange, search]);

//   // ─── Search with debounce ──────────────────────────────────────────────────
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       if (benSearch !== undefined) {
//         setPage(1);
//         fetchTransactions();
//       }
//     }, 500);
//     return () => clearTimeout(timer);
//   }, [benSearch]);

//   const handleDateChange = (dateData) => {
//     if (dateData) {
//       setDateRange(dateData);
//       setSelectedDateRange(dateData);
//       setPage(1);
//     } else {
//       setDateRange(null);
//       setSelectedDateRange(null);
//       setPage(1);
//     }
//   };

//   // ─── Format Helpers ──────────────────────────────────────────────────────
//   const formatCurrency = (amount) => {
//     const num = parseFloat(amount);
//     if (isNaN(num)) return '0.00';
//     return num.toLocaleString("en-IN", { minimumFractionDigits: 2 });
//   };

//  const formatDate = (dateString) => {
//   if (!dateString) return 'N/A';
//   const date = new Date(dateString);
//   return date.toLocaleDateString('en-IN', { 
//     day: '2-digit', 
//     month: 'short', 
//     year: 'numeric',
  
//   });
// };

//  const formatTime = (dateString) => {
//   if (!dateString) return 'N/A';
//   const date = new Date(dateString);
//   return date.toLocaleTimeString('en-IN', { 
//     hour: '2-digit', 
//     minute: '2-digit',
//     hour12: true,
//     timeZone: 'Asia/Kolkata'  // ← yeh add karo
//   });
// };

//   // ─── Format date range display ──────────────────────────────────────────────
//   const formatDateRangeDisplay = () => {
//     if (selectedDateRange) {
//       const start = selectedDateRange.startDate?.toLocaleDateString('en-US', { 
//         day: 'numeric', 
//         month: 'short', 
//         year: 'numeric' 
//       });
//       const end = selectedDateRange.endDate?.toLocaleDateString('en-US', { 
//         day: 'numeric', 
//         month: 'short', 
//         year: 'numeric' 
//       });
//       return `${start} - ${end}`;
//     }
//     return null;
//   };

//   // ─── Dropdown Menu Handler ──────────────────────────────────────────────
//   const handleMenuToggle = (txnId, event) => {
//     if (openMenu === txnId) {
//       setOpenMenu(null);
//       return;
//     }
    
//     const rect = event.currentTarget.getBoundingClientRect();
//     const dropdownWidth = 160; // w-40 = 160px
    
//     // Calculate position
//     let left = rect.right - dropdownWidth;
//     let top = rect.bottom + window.scrollY + 4;
    
//     // Check if dropdown goes off screen
//     if (left < 10) left = 10;
//     if (top + 100 > window.innerHeight + window.scrollY) {
//       top = rect.top + window.scrollY - 100;
//     }
    
//     setDropdownPosition({ top, left });
//     setOpenMenu(txnId);
//   };

//   // ─── Webhook Handler ─────────────────────────────────────────────────────
//   const handleResendWebhook = async (orderId, transactionId) => {
//     if (!orderId) {
//       alert('Order ID not found for this transaction');
//       return;
//     }

//     setWebhookLoading(transactionId);
//     try {
//       await transactionService.resendWebHook(orderId);
//       alert(`Webhook resent successfully for order ${orderId}`);
//       console.log('✅ Webhook resent successfully for order:', orderId);
//     } catch (error) {
//       console.error('❌ Failed to resend webhook:', error);
//       alert('Failed to resend webhook. Please try again.');
//     } finally {
//       setWebhookLoading(null);
//     }
//   };

//   // ─── PDF Export Function for All Transactions ──────────────────────────────
//   const exportTransactionsPDF = () => {
//     try {
//       const doc = new jsPDF('l', 'mm', 'a4');
//       const pageWidth = doc.internal.pageSize.getWidth();
//       const pageHeight = doc.internal.pageSize.getHeight();
      
//       // Clean white background
//       doc.setFillColor(255, 255, 255);
//       doc.rect(0, 0, pageWidth, pageHeight, 'F');
      
//       // Top accent bar
//       doc.setFillColor(59, 130, 246);
//       doc.rect(0, 0, pageWidth, 5, 'F');
      
//       // Header
//       doc.setTextColor(31, 41, 55);
//       doc.setFontSize(22);
//       doc.setFont('helvetica', 'bold');
//       doc.text('Payout History Report', pageWidth / 2, 22, { align: 'center' });
      
//       doc.setFontSize(9);
//       doc.setTextColor(107, 114, 128);
//       doc.setFont('helvetica', 'normal');
//       const filterText = `Status: ${statusFilter} | Date: ${dateRange ? `${dateRange.startFormatted} to ${dateRange.endFormatted}` : 'All Time'}`;
//       doc.text(filterText, pageWidth / 2, 30, { align: 'center' });
//       doc.setTextColor(156, 163, 175);
//       doc.setFontSize(8);
//       doc.text(`Generated: ${new Date().toLocaleString()}`, pageWidth / 2, 36, { align: 'center' });
      
//       doc.setDrawColor(229, 231, 235);
//       doc.line(20, 40, pageWidth - 20, 40);
      
//       // Stats Summary Cards
//       const statsData = [
//         { label: 'Total', value: transactionData.stats?.all_count || 0, color: [59, 130, 246] },
//         { label: 'Success', value: transactionData.stats?.success || 0, color: [22, 163, 74] },
//         { label: 'Failed', value: transactionData.stats?.failed || 0, color: [239, 68, 68] },
//         { label: 'Processing', value: transactionData.stats?.processing || 0, color: [59, 130, 246] },
//         { label: 'Initiated', value: transactionData.stats?.initiated || 0, color: [234, 179, 8] },
//         { label: 'Returned', value: transactionData.stats?.returned || 0, color: [168, 85, 247] },
//       ];
      
//       const cardWidth = (pageWidth - 40) / 6;
//       statsData.forEach((stat, index) => {
//         const xPos = 20 + index * (cardWidth + 2);
        
//         // Card background
//         doc.setFillColor(249, 250, 251);
//         doc.roundedRect(xPos, 47, cardWidth, 16, 2, 2, 'F');
        
//         doc.setTextColor(107, 114, 128);
//         doc.setFontSize(7);
//         doc.setFont('helvetica', 'bold');
//         doc.text(stat.label, xPos + cardWidth / 2, 54, { align: 'center' });
        
//         doc.setTextColor(stat.color[0], stat.color[1], stat.color[2]);
//         doc.setFontSize(10);
//         doc.setFont('helvetica', 'bold');
//         doc.text(String(stat.value), xPos + cardWidth / 2, 62, { align: 'center' });
//       });
      
//       // Table
//       const tableData = allPayouts.map(txn => [
//         txn.trx_id || txn.id,
//         formatDate(txn.created_at),
//         txn.bene_name || 'N/A',
//         txn.ifsc || 'N/A',
//         txn.bank_name || 'N/A',
//         `Rs.${formatCurrency(txn.amount)}`,
//         `Rs.${formatCurrency(txn.charges || 0)}`,
//         txn.order_id || 'N/A',
//         txn.status?.toUpperCase() || 'N/A',
//         txn.utr || '–',
//       ]);
      
//       autoTable(doc, {
//         startY: 70,
//         head: [['ID', 'Date', 'Beneficiary', 'IFSC', 'Bank', 'Amount', 'Charges', 'Order ID', 'Status', 'UTR']],
//         body: tableData,
//         theme: 'striped',
//         headStyles: {
//           fillColor: [59, 130, 246],
//           textColor: [255, 255, 255],
//           fontSize: 8,
//           fontStyle: 'bold',
//           halign: 'center',
//         },
//         bodyStyles: {
//           fontSize: 7,
//         },
//         columnStyles: {
//           0: { cellWidth: 'auto', halign: 'center' },
//           1: { cellWidth: 'auto', halign: 'center' },
//           2: { cellWidth: 'auto', halign: 'left' },
//           3: { cellWidth: 'auto', halign: 'center' },
//           4: { cellWidth: 'auto', halign: 'left' },
//           5: { cellWidth: 'auto', halign: 'right' },
//           6: { cellWidth: 'auto', halign: 'right' },
//           7: { cellWidth: 'auto', halign: 'center' },
//           8: { cellWidth: 'auto', halign: 'center' },
//           9: { cellWidth: 'auto', halign: 'center' },
//         },
//         margin: { left: 15, right: 15 },
//         pageBreak: 'auto',
//         rowPageBreak: 'avoid',
//         tableWidth: 'auto',
//         styles: {
//           overflow: 'linebreak',
//           cellPadding: 2,
//         },
//         didDrawPage: function(data) {
//           // Footer on each page
//           const footerY = doc.internal.pageSize.getHeight() - 10;
//           doc.setDrawColor(229, 231, 235);
//           doc.line(20, footerY - 5, pageWidth - 20, footerY - 5);
//           doc.setTextColor(156, 163, 175);
//           doc.setFontSize(7);
//           doc.setFont('helvetica', 'italic');
//           doc.text('This is a system generated report.', pageWidth / 2, footerY + 2, { align: 'center' });
//           doc.setFontSize(6);
//           doc.setFont('helvetica', 'normal');
//           doc.text(`Page ${data.pageNumber}`, pageWidth - 30, footerY + 2);
//         }
//       });
      
//       // Save
//       doc.save(`Payout_History_${new Date().toISOString().split('T')[0]}.pdf`);
//     } catch (error) {
//       console.error('Error generating PDF:', error);
//       alert('Failed to generate PDF. Please try again.');
//     }
//   };

//   // ─── PDF Export Function for Single Transaction from Menu ──────────────────
//   const exportSingleTransactionPDF = (txn) => {
//     try {
//       // Calculate net amount inside the function
//       const netAmount = parseFloat(txn.amount) - parseFloat(txn.charges || 0);
      
//       const doc = new jsPDF('p', 'mm', 'a4');
//       const pageWidth = doc.internal.pageSize.getWidth();
//       const pageHeight = doc.internal.pageSize.getHeight();
      
//       // Clean white background
//       doc.setFillColor(255, 255, 255);
//       doc.rect(0, 0, pageWidth, pageHeight, 'F');
      
//       // Top accent bar
//       doc.setFillColor(59, 130, 246);
//       doc.rect(0, 0, pageWidth, 6, 'F');
      
//       // Header
//       doc.setTextColor(31, 41, 55);
//       doc.setFontSize(24);
//       doc.setFont('helvetica', 'bold');
//       doc.text('PAYMENT RECEIPT', pageWidth / 2, 25, { align: 'center' });
      
//       doc.setFontSize(10);
//       doc.setFont('helvetica', 'normal');
//       doc.setTextColor(107, 114, 128);
//       doc.text('Transaction Confirmation', pageWidth / 2, 33, { align: 'center' });
      
//       doc.setFontSize(9);
//       doc.setTextColor(156, 163, 175);
//       doc.text(`Receipt #: ${txn.trx_id || txn.id}`, pageWidth / 2, 41, { align: 'center' });
      
//       doc.setDrawColor(229, 231, 235);
//       doc.line(30, 48, pageWidth - 30, 48);
      
//       // Status - Plain text without color background
//       const statusText = txn.status?.toUpperCase() || 'UNKNOWN';
//       doc.setTextColor(107, 114, 128);
//       doc.setFontSize(9);
//       doc.setFont('helvetica', 'bold');
//       doc.text(`Status: ${statusText}`, pageWidth - 30, 57, { align: 'right' });
      
//       // Amount Section
//       doc.setFillColor(249, 250, 251);
//       doc.roundedRect(20, 60, pageWidth - 40, 30, 4, 4, 'F');
      
//       doc.setTextColor(107, 114, 128);
//       doc.setFontSize(9);
//       doc.setFont('helvetica', 'normal');
//       doc.text('Total Amount', pageWidth / 2, 72, { align: 'center' });
      
//       doc.setTextColor(31, 41, 55);
//       doc.setFontSize(22);
//       doc.setFont('helvetica', 'bold');
//       doc.text(`Rs. ${formatCurrency(txn.amount)}`, pageWidth / 2, 86, { align: 'center' });
      
//       // Transaction Details Section
//       doc.setTextColor(31, 41, 55);
//       doc.setFontSize(13);
//       doc.setFont('helvetica', 'bold');
//       doc.text('Transaction Details', 20, 110);
      
//       doc.setDrawColor(229, 231, 235);
//       doc.line(20, 114, pageWidth - 20, 114);
      
//       const details = [
//         ['Transaction ID', txn.trx_id || txn.id],
//         ['Order ID', txn.order_id || 'N/A'],
//         ['Date & Time', `${formatDate(txn.created_at)} at ${formatTime(txn.created_at)}`],
//         ['UTR Number', txn.utr || 'N/A'],
//       ];
      
//       let yPos = 124;
//       details.forEach(([label, value]) => {
//         doc.setFontSize(9);
//         doc.setTextColor(107, 114, 128);
//         doc.setFont('helvetica', 'bold');
//         doc.text(label, 20, yPos);
        
//         doc.setTextColor(31, 41, 55);
//         doc.setFont('helvetica', 'normal');
//         const maxWidth = 120;
//         const valueStr = String(value);
//         if (doc.getStringUnitWidth(valueStr) * 9 / 3 > maxWidth) {
//           const lines = doc.splitTextToSize(valueStr, maxWidth);
//           doc.text(lines, 80, yPos);
//         } else {
//           doc.text(valueStr, 80, yPos);
//         }
//         yPos += 8;
//       });
      
//       yPos += 4;
//       doc.setDrawColor(229, 231, 235);
//       doc.line(20, yPos, pageWidth - 20, yPos);
//       yPos += 8;
      
//       // Amount Breakdown
//       doc.setTextColor(31, 41, 55);
//       doc.setFontSize(11);
//       doc.setFont('helvetica', 'bold');
//       doc.text('Amount Breakdown', 20, yPos);
//       yPos += 6;
      
//       const amountDetails = [
//         ['Subtotal', `Rs. ${formatCurrency(txn.amount)}`],
//         ['Charges', `Rs. ${formatCurrency(txn.charges || 0)}`],
//         ['Net Amount', `Rs. ${netAmount.toFixed(2)}`],
//       ];
      
//       amountDetails.forEach(([label, value], index) => {
//         const isLast = index === amountDetails.length - 1;
//         doc.setFontSize(9);
        
//         if (isLast) {
//           doc.setTextColor(31, 41, 55);
//           doc.setFont('helvetica', 'bold');
//         } else {
//           doc.setTextColor(107, 114, 128);
//           doc.setFont('helvetica', 'normal');
//         }
        
//         doc.text(label, 30, yPos + 6);
//         doc.text(value, pageWidth - 35, yPos + 6, { align: 'right' });
//         yPos += 7;
//       });
      
//       yPos += 4;
//       doc.setDrawColor(229, 231, 235);
//       doc.line(20, yPos, pageWidth - 20, yPos);
//       yPos += 8;
      
//       // Beneficiary Section
//       doc.setTextColor(31, 41, 55);
//       doc.setFontSize(11);
//       doc.setFont('helvetica', 'bold');
//       doc.text('Beneficiary Details', 20, yPos);
//       yPos += 6;
      
//       const beneficiary = [
//         ['Name', txn.bene_name || 'N/A'],
//         ['Account Number', txn.account_number || 'XXXXXXXXXX1234'],
//         ['IFSC Code', txn.ifsc || 'N/A'],
//         ['Bank Name', txn.bank_name || 'N/A'],
//       ];
      
//       beneficiary.forEach(([label, value]) => {
//         doc.setFontSize(9);
//         doc.setTextColor(107, 114, 128);
//         doc.setFont('helvetica', 'bold');
//         doc.text(label, 30, yPos + 6);
        
//         doc.setTextColor(31, 41, 55);
//         doc.setFont('helvetica', 'normal');
//         doc.text(String(value), 80, yPos + 6);
//         yPos += 7;
//       });
      
//       // Footer
//       const footerY = pageHeight - 30;
//       doc.setDrawColor(229, 231, 235);
//       doc.line(20, footerY, pageWidth - 20, footerY);
      
//       doc.setTextColor(156, 163, 175);
//       doc.setFontSize(8);
//       doc.setFont('helvetica', 'italic');
//       doc.text('This is a system generated receipt.', pageWidth / 2, footerY + 8, { align: 'center' });
      
//       doc.setFontSize(7);
//       doc.setFont('helvetica', 'normal');
//       doc.text(`Generated on: ${new Date().toLocaleString()}`, pageWidth / 2, footerY + 15, { align: 'center' });
      
//       doc.save(`Transaction_Receipt_${txn.trx_id || txn.id}.pdf`);
//     } catch (error) {
//       console.error('Error generating PDF:', error);
//       alert('Failed to generate PDF. Please try again.');
//     }
//   };

//   const allPayouts = transactionData.data || [];
//   const totalItems = transactionData.total || 0;
//   const stats = transactionData.stats || {};

//   if (selected) {
//     return <TransactionDetails txn={selected} onBack={() => setSelected(null)} />;
//   }

//   // ─── Loading State ──────────────────────────────────────────────────────────
//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
//           <p className="mt-4 text-gray-600">Loading transactions...</p>
//         </div>
//       </div>
//     );
//   }

//   // ─── Error State ────────────────────────────────────────────────────────────
//   if (error) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <svg className="w-12 h-12 text-red-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//           </svg>
//           <p className="mt-4 text-red-600">{error}</p>
//           <button 
//             onClick={fetchTransactions}
//             className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-3 sm:p-5 font-sans">
//       {/* Header */}
//       <div className="flex items-center justify-between mb-4 sm:mb-5 flex-wrap gap-3">
//         <div>
//           <h1 className="text-base sm:text-[18px] font-bold text-gray-900">Payout History</h1>
//           <p className="text-[10px] sm:text-xs text-gray-600 font-medium mt-0.5">
//             View and track all your payout transactions
//             {selectedDateRange && (
//               <span className="ml-2 text-blue-600 font-semibold">
//                 ({formatDateRangeDisplay()})
//               </span>
//             )}
//           </p>
//         </div>
//         <div className="flex items-center gap-2">
//           <span className="text-[10px] sm:text-xs text-gray-500">
//             Total: ₹{formatCurrency(stats.total_amount)}
//           </span>
//         </div>
//       </div>

//       {/* Filters */}
//       <div className="bg-white rounded-2xl border border-gray-100 p-3 sm:p-4 mb-4 sm:mb-5">
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
//           {/* Date Range */}
//           <div>
//             <label className="text-[10px] sm:text-xs font-semibold text-black mb-1 block">Date Range</label>
//             <DateRangePicker 
//               onDateChange={handleDateChange}
//               placeholder="Select date range"
//             />
//           </div>
          
//           {/* Status */}
//           <div>
//             <label className="text-[10px] sm:text-xs font-semibold text-black mb-1 block">Status</label>
//             <div className="relative">
//               <select
//                 value={statusFilter}
//                 onChange={e => { setStatusFilter(e.target.value); setPage(1); }}
//                 className="w-full appearance-none pl-2.5 sm:pl-3 pr-7 sm:pr-8 py-1.5 sm:py-2 border border-gray-200 rounded-xl text-[11px] sm:text-xs text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 cursor-pointer"
//               >
//                 {["All Status","Success","Failed","Pending","Processing","Initiated","Returned"].map(s => <option key={s}>{s}</option>)}
//               </select>
//               <svg className="absolute right-2 sm:right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" width={11} sm:width={12} height={11} sm:height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
//                 <path d="M19 9l-7 7-7-7"/>
//               </svg>
//             </div>
//           </div>
          
//           {/* Order ID */}
//           <div>
//             <label className="text-[10px] sm:text-xs font-semibold text-black mb-1 block">Order ID (Optional)</label>
//             <div className="relative">
//               <svg className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 text-gray-400" width={11} sm:width={13} height={11} sm:height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
//                 <circle cx="11" cy="11" r="8"/>
//                 <path d="M21 21l-4.35-4.35"/>
//               </svg>
//               <input
//                 value={search}
//                 onChange={e => { setSearch(e.target.value); setPage(1); }}
//                 placeholder="Search Order ID"
//                 className="w-full pl-8 sm:pl-9 pr-2.5 sm:pr-3 py-1.5 sm:py-2 border border-gray-200 rounded-xl text-[11px] sm:text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 placeholder:text-gray-400"
//               />
//             </div>
//           </div>
          
//           {/* Beneficiary */}
//           <div>
//             <label className="text-[10px] sm:text-xs font-semibold text-black mb-1 block">Beneficiary Name (Optional)</label>
//             <div className="relative">
//               <svg className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 text-gray-400" width={11} sm:width={13} height={11} sm:height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
//                 <circle cx="11" cy="11" r="8"/>
//                 <path d="M21 21l-4.35-4.35"/>
//               </svg>
//               <input
//                 value={benSearch}
//                 onChange={e => { setBenSearch(e.target.value); setPage(1); }}
//                 placeholder="Search Beneficiary"
//                 className="w-full pl-8 sm:pl-9 pr-2.5 sm:pr-3 py-1.5 sm:py-2 border border-gray-200 rounded-xl text-[11px] sm:text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 placeholder:text-gray-400"
//               />
//             </div>
//           </div>
//         </div>
        
//         {/* Selected Date Range Display */}
//         {selectedDateRange && (
//           <div className="flex items-center gap-2 mt-3 px-3 py-2 bg-blue-50 border border-blue-200 rounded-xl text-[11px] sm:text-xs">
//             <span className="text-blue-600 font-medium">Selected:</span>
//             <span className="text-gray-700 font-semibold">{formatDateRangeDisplay()}</span>
//             <button 
//               onClick={() => {
//                 setSelectedDateRange(null);
//                 setDateRange(null);
//                 setPage(1);
//               }}
//               className="text-gray-400 hover:text-red-500 transition-colors ml-1"
//             >
//               <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
//                 <line x1="18" y1="6" x2="6" y2="18"/>
//                 <line x1="6" y1="6" x2="18" y2="18"/>
//               </svg>
//             </button>
//           </div>
//         )}
        
//         <div className="flex flex-col sm:flex-row justify-end gap-2 mt-3">
//           <button 
//             onClick={() => { 
//               setStatusFilter("All Status"); 
//               setSearch(""); 
//               setBenSearch(""); 
//               setPage(1);
//               setSelectedDateRange(null);
//               setDateRange(null);
//             }}
//             className="px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-200 rounded-xl text-[11px] sm:text-xs text-gray-600 hover:bg-gray-50 transition-colors font-medium"
//           >
//             Reset All
//           </button>
//           <button 
//             onClick={fetchTransactions}
//             className="px-4 sm:px-5 py-1.5 sm:py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-[11px] sm:text-xs font-semibold transition-colors"
//           >
//             Apply Filters
//           </button>
//         </div>
//       </div>

//       {/* Stats Row */}
//       <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-3 mb-4">
//         <div className="bg-white rounded-xl border border-gray-100 p-2 sm:p-3 text-center">
//           <div className="text-[9px] sm:text-[10px] text-gray-500">Total</div>
//           <div className="text-sm sm:text-base font-bold text-gray-900">{stats.all_count || 0}</div>
//         </div>
//         <div className="bg-white rounded-xl border border-gray-100 p-2 sm:p-3 text-center">
//           <div className="text-[9px] sm:text-[10px] text-gray-500">Success</div>
//           <div className="text-sm sm:text-base font-bold text-green-600">{stats.success || 0}</div>
//         </div>
//         <div className="bg-white rounded-xl border border-gray-100 p-2 sm:p-3 text-center">
//           <div className="text-[9px] sm:text-[10px] text-gray-500">Failed</div>
//           <div className="text-sm sm:text-base font-bold text-red-600">{stats.failed || 0}</div>
//         </div>
//         <div className="bg-white rounded-xl border border-gray-100 p-2 sm:p-3 text-center">
//           <div className="text-[9px] sm:text-[10px] text-gray-500">Processing</div>
//           <div className="text-sm sm:text-base font-bold text-blue-600">{stats.processing || 0}</div>
//         </div>
//         <div className="bg-white rounded-xl border border-gray-100 p-2 sm:p-3 text-center">
//           <div className="text-[9px] sm:text-[10px] text-gray-500">Initiated</div>
//           <div className="text-sm sm:text-base font-bold text-yellow-600">{stats.initiated || 0}</div>
//         </div>
//         <div className="bg-white rounded-xl border border-gray-100 p-2 sm:p-3 text-center">
//           <div className="text-[9px] sm:text-[10px] text-gray-500">Returned</div>
//           <div className="text-sm sm:text-base font-bold text-purple-600">{stats.returned || 0}</div>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
//         <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 px-4 sm:px-5 py-3 sm:py-3.5 border-b border-gray-100">
//           <span className="text-xs sm:text-sm font-bold text-gray-900">Total {totalItems.toLocaleString()} Payouts</span>
//           <button 
//             onClick={exportTransactionsPDF}
//             className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-[11px] sm:text-sm font-medium transition-colors"
//           >
//             <svg width={12} sm:width={14} height={12} sm:height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
//               <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
//             </svg>
//             Export PDF
//           </button>
//         </div>

//         <div className="overflow-x-auto">
//           <table className="w-full min-w-200 lg:min-w-full">
//             <thead>
//               <tr className="bg-gray-50/70 border-b border-gray-100">
//                 {["ID","Date","Beneficiary Name","IFSC Code","Bank","Amount (₹)","Charges (₹)","Order ID","Status","UTR","Action"].map(h => (
//                   <th key={h} className="px-3 sm:px-4 py-2.5 sm:py-3 text-left text-[10px] sm:text-xs font-semibold text-gray-800 whitespace-nowrap">{h}</th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {allPayouts.length === 0 ? (
//                 <tr>
//                   <td colSpan={11} className="text-center py-8 text-gray-400 text-xs sm:text-sm">
//                     No transactions found
//                   </td>
//                 </tr>
//               ) : (
//                 allPayouts.map(txn => (
//                   <tr key={txn.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/60 transition-colors">
//                     <td className="px-3 sm:px-4 py-2.5 sm:py-3.5">
//                       <button onClick={() => setSelected(txn)} className="text-[10px] sm:text-xs font-mono text-gray-800 hover:text-blue-600 hover:underline transition-colors text-left">
//                         {txn.trx_id || txn.id}
//                       </button>
//                     </td>
//                     <td className="px-3 sm:px-4 py-2.5 sm:py-3.5">
//                       <div className="text-[10px] sm:text-xs font-medium text-gray-800 whitespace-nowrap">{formatDate(txn.created_at)}</div>
//                       <div className="text-[9px] sm:text-[11px] text-gray-500">{formatTime(txn.created_at)}</div>
//                     </td>
//                     <td className="px-3 sm:px-4 py-2.5 sm:py-3.5 text-[10px] sm:text-xs font-medium text-gray-800 whitespace-nowrap">{txn.bene_name || 'N/A'}</td>
//                     <td className="px-3 sm:px-4 py-2.5 sm:py-3.5 text-[10px] sm:text-xs font-medium text-gray-800 whitespace-nowrap">{txn.ifsc || 'N/A'}</td>
//                     <td className="px-3 sm:px-4 py-2.5 sm:py-3.5 text-[10px] sm:text-xs font-medium text-gray-700 whitespace-nowrap">{txn.bank_name || 'N/A'}</td>
//                     <td className="px-3 sm:px-4 py-2.5 sm:py-3.5 text-[10px] sm:text-xs font-semibold text-gray-900 whitespace-nowrap">
//                       {formatCurrency(txn.amount)}
//                     </td>
//                     <td className="px-3 sm:px-4 py-2.5 sm:py-3.5 text-[10px] sm:text-xs font-medium text-gray-800 whitespace-nowrap">{formatCurrency(txn.charges || 0)}</td>
//                     <td className="px-3 sm:px-4 py-2.5 sm:py-3.5 text-[10px] sm:text-xs font-medium text-gray-800 whitespace-nowrap">{txn.order_id || 'N/A'}</td>
//                     <td className="px-3 sm:px-4 py-2.5 sm:py-3.5"><StatusBadge status={txn.status} /></td>
//                     <td className="px-3 sm:px-4 py-2.5 sm:py-3.5 text-[10px] sm:text-xs font-medium text-gray-800 whitespace-nowrap">{txn.utr || "–"}</td>
//                     <td className="px-3 sm:px-4 py-2.5 sm:py-3.5">
//                       <div className="flex items-center gap-1">
//                         {/* ─── Webhook Button ─── */}
//                         <button
//                           onClick={() => {
//                             const orderId = txn.order_id;
//                             handleResendWebhook(orderId, txn.id);
//                           }}
//                           disabled={webhookLoading === txn.id}
//                           className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-600 transition-colors disabled:opacity-50"
//                           title="Resend Webhook"
//                         >
//                           {webhookLoading === txn.id ? (
//                             <span className="inline-block w-3.5 h-3.5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
//                           ) : (
//                             <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
//                               <path d="M4 4v16h16" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
//                               <path d="M8 12l3 3 8-8" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
//                             </svg>
//                           )}
//                         </button>

//                         {/* ─── Three Dot Menu ─── */}
//                         <button
//                           onClick={(e) => { 
//                             e.stopPropagation(); 
//                             handleMenuToggle(txn.id, e);
//                           }}
//                           className="p-1 rounded-lg hover:bg-gray-100 text-gray-400 transition-colors"
//                         >
//                           <svg width={14} sm:width={16} height={14} sm:height={16} viewBox="0 0 24 24" fill="currentColor">
//                             <circle cx="12" cy="5" r="1.5"/>
//                             <circle cx="12" cy="12" r="1.5"/>
//                             <circle cx="12" cy="19" r="1.5"/>
//                           </svg>
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination */}
//         <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 sm:px-5 py-3 sm:py-3.5 border-t border-gray-100">
//           <span className="text-[10px] sm:text-xs text-gray-500 text-center sm:text-left">
//             Showing {Math.min((page-1)*limit+1, totalItems)} to {Math.min(page*limit, totalItems)} of {totalItems.toLocaleString()} results
//           </span>
//           <div className="flex items-center gap-1.5 sm:gap-2">
//             <select 
//               value={limit}
//               onChange={(e) => { setLimit(parseInt(e.target.value)); setPage(1); }}
//               className="border border-gray-200 rounded-lg px-2 py-1 text-xs sm:text-sm"
//             >
//               <option value={5}>5</option>
//               <option value={10}>10</option>
//               <option value={25}>25</option>
//               <option value={50}>50</option>
//             </select>
//             <button 
//               onClick={() => setPage(p => Math.max(1, p-1))} 
//               disabled={page===1}
//               className="p-1 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
//             >
//               <svg width={12} sm:width={14} height={12} sm:height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
//                 <path d="M15 18l-6-6 6-6"/>
//               </svg>
//             </button>
//             {Array.from({ length: Math.min(5, transactionData.totalPages || 1) }, (_, i) => {
//               let p;
//               const totalPages = transactionData.totalPages || 1;
//               if (totalPages <= 5) {
//                 p = i + 1;
//               } else if (page <= 3) {
//                 p = i + 1;
//               } else if (page >= totalPages - 2) {
//                 p = totalPages - 4 + i;
//               } else {
//                 p = page - 2 + i;
//               }
//               return (
//                 <button 
//                   key={p} 
//                   onClick={() => setPage(p)}
//                   className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg text-[10px] sm:text-xs font-semibold transition-colors ${page===p?"bg-blue-600 text-white":"border border-gray-200 text-gray-600 hover:bg-gray-50"}`}
//                 >
//                   {p}
//                 </button>
//               );
//             })}
//             <button 
//               onClick={() => setPage(p => Math.min(transactionData.totalPages || 1, p+1))}
//               disabled={page===transactionData.totalPages || transactionData.totalPages===0}
//               className="p-1 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
//             >
//               <svg width={12} sm:width={14} height={12} sm:height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
//                 <path d="M9 18l6-6-6-6"/>
//               </svg>
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* ─── Dropdown Menu (Rendered with fixed positioning) ─── */}
//       {openMenu && (
//         <div 
//           className="fixed z-[9999] bg-white rounded-xl shadow-xl border border-gray-100 py-1 w-40 min-w-[160px]"
//           style={{
//             top: dropdownPosition.top + 'px',
//             left: dropdownPosition.left + 'px'
//           }}
//           onClick={(e) => e.stopPropagation()}
//         >
//           {/* Backdrop for click outside */}
//           <div 
//             className="fixed inset-0 z-[-1]" 
//             onClick={() => setOpenMenu(null)}
//           />
          
//           {/* Find the selected transaction */}
//           {(() => {
//             const txn = allPayouts.find(t => t.id === openMenu);
//             if (!txn) return null;
            
//             return (
//               <>
//                 <button
//                   onClick={() => { setSelected(txn); setOpenMenu(null); }}
//                   className="flex items-center gap-2 sm:gap-2.5 w-full px-2.5 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-xs text-gray-700 hover:bg-gray-50 transition-colors"
//                 >
//                   <svg width={11} sm:width={13} height={11} sm:height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
//                     <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
//                     <circle cx="12" cy="12" r="3"/>
//                   </svg>
//                   View Details
//                 </button>
//                 <button 
//                   onClick={() => { 
//                     exportSingleTransactionPDF(txn);
//                     setOpenMenu(null);
//                   }}
//                   className="flex items-center gap-2 sm:gap-2.5 w-full px-2.5 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-xs text-gray-700 hover:bg-gray-50 transition-colors"
//                 >
//                   <svg width={11} sm:width={13} height={11} sm:height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
//                     <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
//                   </svg>
//                   Download Receipt
//                 </button>
//                 <button 
//                   onClick={() => setOpenMenu(null)}
//                   className="flex items-center gap-2 sm:gap-2.5 w-full px-2.5 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-xs text-gray-700 hover:bg-gray-50 transition-colors"
//                 >
//                   <svg width={11} sm:width={13} height={11} sm:height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
//                     <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
//                     <polyline points="15 3 21 3 21 9"/>
//                     <line x1="10" y1="14" x2="21" y2="3"/>
//                   </svg>
//                   Raise Ticket
//                 </button>
//               </>
//             );
//           })()}
//         </div>
//       )}
//     </div>
//   );
// }
import { useState, useEffect } from "react";
import DateRangePicker from "../../components/DatePicker";
import transactionService from "../../services/TransactionHistoryServices";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// ── Status Badge ─────────────────────────────────────────────────────────────
const StatusBadge = ({ status }) => {
  const map = {
    success:   "bg-green-50 text-green-700 border-green-200",
    failed:    "bg-red-50 text-red-600 border-red-200",
    pending:   "bg-orange-50 text-orange-600 border-orange-200",
    processing: "bg-blue-50 text-blue-600 border-blue-200",
    initiated: "bg-yellow-50 text-yellow-600 border-yellow-200",
    returned:  "bg-purple-50 text-purple-600 border-purple-200",
    cancelled: "bg-gray-100 text-gray-500 border-gray-200",
  };
  
  const displayStatus = status?.charAt(0).toUpperCase() + status?.slice(1) || status || 'Unknown';
  const key = status?.toLowerCase() || '';
  const matchedKey = Object.keys(map).find(k => k === key);
  
  return (
    <span className={`px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold border whitespace-nowrap ${map[matchedKey] || "bg-gray-100 text-gray-500 border-gray-200"}`}>
      {displayStatus}
    </span>
  );
};

// ── UTC Time Formatter ──────────────────────────────────────────────────────
const formatUTCDate = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', { 
    day: '2-digit', 
    month: 'short', 
    year: 'numeric',
    timeZone: 'UTC'
  });
};

const formatUTCTime = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-IN', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true,
    timeZone: 'UTC'
  });
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
  if (!txn) return null;

  const formatCurrency = (amount) => {
    const num = parseFloat(amount);
    if (isNaN(num)) return '0.00';
    return num.toLocaleString("en-IN", { minimumFractionDigits: 2 });
  };

  const netAmount = parseFloat(txn.amount) - parseFloat(txn.charges || 0);

  // ─── PDF Export Function for Single Transaction ────────────────────────────
  const exportTransactionPDF = () => {
    try {
      const doc = new jsPDF('p', 'mm', 'a4');
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      
      // Clean white background
      doc.setFillColor(255, 255, 255);
      doc.rect(0, 0, pageWidth, pageHeight, 'F');
      
      // Top accent bar
      doc.setFillColor(59, 130, 246);
      doc.rect(0, 0, pageWidth, 6, 'F');
      
      // Header
      doc.setTextColor(31, 41, 55);
      doc.setFontSize(24);
      doc.setFont('helvetica', 'bold');
      doc.text('PAYMENT RECEIPT', pageWidth / 2, 25, { align: 'center' });
      
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(107, 114, 128);
      doc.text('Transaction Confirmation', pageWidth / 2, 33, { align: 'center' });
      
      doc.setFontSize(9);
      doc.setTextColor(156, 163, 175);
      doc.text(`Receipt #: ${txn.trx_id || txn.id}`, pageWidth / 2, 41, { align: 'center' });
      
      doc.setDrawColor(229, 231, 235);
      doc.line(30, 48, pageWidth - 30, 48);
      
      // Status - Plain text without color background
      const statusText = txn.status?.toUpperCase() || 'UNKNOWN';
      doc.setTextColor(107, 114, 128);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.text(`Status: ${statusText}`, pageWidth - 30, 57, { align: 'right' });
      
      // Amount Section
      doc.setFillColor(249, 250, 251);
      doc.roundedRect(20, 60, pageWidth - 40, 30, 4, 4, 'F');
      
      doc.setTextColor(107, 114, 128);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.text('Total Amount', pageWidth / 2, 72, { align: 'center' });
      
      doc.setTextColor(31, 41, 55);
      doc.setFontSize(22);
      doc.setFont('helvetica', 'bold');
      doc.text(`Rs. ${formatCurrency(txn.amount)}`, pageWidth / 2, 86, { align: 'center' });
      
      // Transaction Details Section
      doc.setTextColor(31, 41, 55);
      doc.setFontSize(13);
      doc.setFont('helvetica', 'bold');
      doc.text('Transaction Details', 20, 110);
      
      doc.setDrawColor(229, 231, 235);
      doc.line(20, 114, pageWidth - 20, 114);
      
      // Details in clean rows
      const details = [
        ['Transaction ID', txn.trx_id || txn.id],
        ['Order ID', txn.order_id || 'N/A'],
        ['Date & Time', txn.created_at],
        ['UTR Number', txn.utr || 'N/A'],
      ];
      
      let yPos = 124;
      details.forEach(([label, value]) => {
        doc.setFontSize(9);
        doc.setTextColor(107, 114, 128);
        doc.setFont('helvetica', 'bold');
        doc.text(label, 20, yPos);
        
        doc.setTextColor(31, 41, 55);
        doc.setFont('helvetica', 'normal');
        const maxWidth = 120;
        const valueStr = String(value);
        if (doc.getStringUnitWidth(valueStr) * 9 / 3 > maxWidth) {
          const lines = doc.splitTextToSize(valueStr, maxWidth);
          doc.text(lines, 80, yPos);
        } else {
          doc.text(valueStr, 80, yPos);
        }
        yPos += 8;
      });
      
      // Divider
      yPos += 4;
      doc.setDrawColor(229, 231, 235);
      doc.line(20, yPos, pageWidth - 20, yPos);
      yPos += 8;
      
      // Amount Breakdown
      doc.setTextColor(31, 41, 55);
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.text('Amount Breakdown', 20, yPos);
      yPos += 6;
      
      const amountDetails = [
        ['Subtotal', `Rs. ${formatCurrency(txn.amount)}`],
        ['Charges', `Rs. ${formatCurrency(txn.charges || 0)}`],
        ['Net Amount', `Rs. ${netAmount.toFixed(2)}`],
      ];
      
      amountDetails.forEach(([label, value], index) => {
        const isLast = index === amountDetails.length - 1;
        doc.setFontSize(9);
        
        if (isLast) {
          doc.setTextColor(31, 41, 55);
          doc.setFont('helvetica', 'bold');
        } else {
          doc.setTextColor(107, 114, 128);
          doc.setFont('helvetica', 'normal');
        }
        
        doc.text(label, 30, yPos + 6);
        doc.text(value, pageWidth - 35, yPos + 6, { align: 'right' });
        yPos += 7;
      });
      
      // Divider
      yPos += 4;
      doc.setDrawColor(229, 231, 235);
      doc.line(20, yPos, pageWidth - 20, yPos);
      yPos += 8;
      
      // Beneficiary Section
      doc.setTextColor(31, 41, 55);
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.text('Beneficiary Details', 20, yPos);
      yPos += 6;
      
      const beneficiary = [
        ['Name', txn.bene_name || 'N/A'],
        ['Account Number', txn.account_number || 'XXXXXXXXXX1234'],
        ['IFSC Code', txn.ifsc || 'N/A'],
        ['Bank Name', txn.bank_name || 'N/A'],
      ];
      
      beneficiary.forEach(([label, value]) => {
        doc.setFontSize(9);
        doc.setTextColor(107, 114, 128);
        doc.setFont('helvetica', 'bold');
        doc.text(label, 30, yPos + 6);
        
        doc.setTextColor(31, 41, 55);
        doc.setFont('helvetica', 'normal');
        doc.text(String(value), 80, yPos + 6);
        yPos += 7;
      });
      
      // Footer
      const footerY = pageHeight - 30;
      doc.setDrawColor(229, 231, 235);
      doc.line(20, footerY, pageWidth - 20, footerY);
      
      doc.setTextColor(156, 163, 175);
      doc.setFontSize(8);
      doc.setFont('helvetica', 'italic');
      doc.text('This is a system generated receipt.', pageWidth / 2, footerY + 8, { align: 'center' });
      
      doc.setFontSize(7);
      doc.setFont('helvetica', 'normal');
      doc.text(`Generated on: ${new Date().toLocaleString()}`, pageWidth / 2, footerY + 15, { align: 'center' });
      
      // Save
      doc.save(`Transaction_Receipt_${txn.trx_id || txn.id}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    }
  };

  // ─── Webhook Handler ─────────────────────────────────────────────────────
  const handleResendWebhook = async (orderId) => {
    if (!orderId) {
      alert('Order ID not found for this transaction');
      return;
    }

    try {
      await transactionService.resendWebHook(orderId);
      alert(`Webhook resent successfully for order ${orderId}`);
      console.log('✅ Webhook resent successfully for order:', orderId);
    } catch (error) {
      console.error('❌ Failed to resend webhook:', error);
      alert('Failed to resend webhook. Please try again.');
    }
  };

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
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleResendWebhook(txn.order_id)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg text-xs font-medium transition-colors border border-blue-200"
          >
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M4 4v16h16" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8 12l3 3 8-8" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Resend Webhook
          </button>
        </div>
      </div>

      {/* Summary card */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 mb-4 sm:mb-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 sm:gap-5">
          <div>
            <div className="text-[10px] sm:text-xs text-gray-600 font-medium mb-1">Payout ID</div>
            <div className="flex items-center gap-1 flex-wrap">
              <span className="text-xs sm:text-sm font-bold text-gray-900 font-mono break-all">{txn.trx_id || txn.id}</span>
              <button 
                onClick={() => navigator.clipboard.writeText(txn.trx_id || txn.id)}
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
              ₹{formatCurrency(txn.amount)}
            </div>
          </div>
          
          <div>
            <div className="text-[10px] sm:text-xs text-gray-600 font-medium mb-1">Charges</div>
            <div className="text-xs sm:text-sm font-semibold text-gray-900">
              ₹{formatCurrency(txn.charges || 0)}
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
              <span className="text-[10px] sm:text-xs font-mono font-semibold text-gray-900">{txn.order_id || 'N/A'}</span>
              <button 
                onClick={() => navigator.clipboard.writeText(txn.order_id || 'N/A')}
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
          <InfoRow label="Date & Time" value={txn.created_at} />
          <InfoRow label="Status" value={<StatusBadge status={txn.status} />} />
          <InfoRow label="IFSC Code" value={txn.ifsc || 'N/A'} mono />
          <InfoRow label="Bank Name" value={txn.bank_name || 'N/A'} />
          <InfoRow label="Account Number" value={txn.account_number || 'XXXXXXXXXX1234'} mono />
          <InfoRow label="Beneficiary Name" value={txn.bene_name || 'N/A'} />
          <InfoRow label="Email (Beneficiary)" value={txn.email || 'N/A'} />
          <InfoRow label="Mobile (Beneficiary)" value={txn.phone || 'N/A'} />
          <InfoRow label="Remark (If Any)" value={txn.remark || '–'} />
        </div>

        <div className="flex-1 lg:flex-2 bg-white rounded-2xl border border-gray-100 p-4 sm:p-5">
          <h3 className="text-xs sm:text-sm font-bold text-gray-900 mb-3 sm:mb-4">Payout Status Timeline</h3>
          <TimelineStep 
            step={1} 
            done={txn.status !== "initiated" && txn.status !== "pending"} 
            label="Payout Initiated"  
            date={txn.status !== "initiated" && txn.status !== "pending" ? `${txn.created_at}` : "Pending"} 
            desc="Payout request received" 
          />
          <TimelineStep 
            step={2} 
            done={txn.status === "success" || txn.status === "failed" || txn.status === "returned"} 
            label="Bank Processing"   
            date={txn.status === "success" ? `${txn.created_at}, ${txn.created_at}` : "Pending"} 
            desc="Request sent to bank" 
          />
          <TimelineStep 
            step={3} 
            done={txn.status === "success"} 
            label="Payout Successful" 
            date={txn.status === "success" ? `${txn.created_at}, ${txn.created_at}` : "Pending"} 
            desc="Amount credited successfully" 
          />
          <TimelineStep 
            step={4} 
            done={txn.status === "success"} 
            last 
            label="Payout Completed"  
            date={txn.status === "success" ? `${txn.created_at}, ${txn.created_at}` : "Pending"} 
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
              <InfoRow label="Name" value={txn.bene_name || 'N/A'} />
              <InfoRow label="Account Number" value={txn.account_number || 'XXXXXXXXXX1234'} mono />
              <InfoRow label="IFSC Code" value={txn.ifsc || 'N/A'} mono />
              <InfoRow label="Bank Name" value={txn.bank_name || 'N/A'} />
            </div>
          </div>
        </div>

        <div className="flex-1 lg:flex-2 bg-white rounded-2xl border border-gray-100 p-4 sm:p-5">
          <h3 className="text-xs sm:text-sm font-bold text-gray-900 mb-3 sm:mb-4">Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-3">
            <button 
              onClick={exportTransactionPDF}
              className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 border border-blue-600 rounded-xl text-[10px] sm:text-xs font-medium text-blue-600 hover:bg-blue-50 transition-colors"
            >
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
          <button 
            onClick={exportTransactionPDF}
            className="w-full flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-[10px] sm:text-xs font-semibold transition-colors"
          >
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
export default function PayoutHistory() {
  const [selected, setSelected] = useState(null);
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [search, setSearch] = useState("");
  const [benSearch, setBenSearch] = useState("");
  const [page, setPage] = useState(1);
  const [openMenu, setOpenMenu] = useState(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const [dateRange, setDateRange] = useState(null);
  const [selectedDateRange, setSelectedDateRange] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [webhookLoading, setWebhookLoading] = useState(null);
  const [transactionData, setTransactionData] = useState({
    data: [],
    stats: {
      all_count: 0,
      initiated: "0",
      processing: "0",
      success: "0",
      failed: "0",
      returned: "0",
      total_amount: "0",
      success_amount: "0"
    },
    total: 0,
    totalPages: 0,
    page: 1,
    limit: 10
  });
  const [limit, setLimit] = useState(10);

  const rowsPerPage = 10;

  // ─── Fetch Transactions ──────────────────────────────────────────────────
  const fetchTransactions = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {
        page: page,
        limit: limit
      };
      
      if (search) {
        params.search = search;
      }
      
      if (statusFilter !== "All Status") {
        params.status = statusFilter.toLowerCase();
      }
      
      if (dateRange) {
        params.from_date = dateRange.startFormatted;
        params.to_date = dateRange.endFormatted;
      }
      
      const response = await transactionService.getTransactions(params);
      console.log("Transactions:", response);
      setTransactionData(response);
    } catch (err) {
      console.error("Error fetching transactions:", err);
      setError("Failed to load transactions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [page, limit, statusFilter, dateRange, search]);

  // ─── Search with debounce ──────────────────────────────────────────────────
  useEffect(() => {
    const timer = setTimeout(() => {
      if (benSearch !== undefined) {
        setPage(1);
        fetchTransactions();
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [benSearch]);

  const handleDateChange = (dateData) => {
    if (dateData) {
      setDateRange(dateData);
      setSelectedDateRange(dateData);
      setPage(1);
    } else {
      setDateRange(null);
      setSelectedDateRange(null);
      setPage(1);
    }
  };

  // ─── Format Helpers ──────────────────────────────────────────────────────
  const formatCurrency = (amount) => {
    const num = parseFloat(amount);
    if (isNaN(num)) return '0.00';
    return num.toLocaleString("en-IN", { minimumFractionDigits: 2 });
  };

  // ─── Format date range display ──────────────────────────────────────────────
  const formatDateRangeDisplay = () => {
    if (selectedDateRange) {
      const start = selectedDateRange.startDate?.toLocaleDateString('en-US', { 
        day: 'numeric', 
        month: 'short', 
        year: 'numeric' 
      });
      const end = selectedDateRange.endDate?.toLocaleDateString('en-US', { 
        day: 'numeric', 
        month: 'short', 
        year: 'numeric' 
      });
      return `${start} - ${end}`;
    }
    return null;
  };

  // ─── Dropdown Menu Handler ──────────────────────────────────────────────
  const handleMenuToggle = (txnId, event) => {
    if (openMenu === txnId) {
      setOpenMenu(null);
      return;
    }
    
    const rect = event.currentTarget.getBoundingClientRect();
    const dropdownWidth = 160; // w-40 = 160px
    
    // Calculate position
    let left = rect.right - dropdownWidth;
    let top = rect.bottom + window.scrollY + 4;
    
    // Check if dropdown goes off screen
    if (left < 10) left = 10;
    if (top + 100 > window.innerHeight + window.scrollY) {
      top = rect.top + window.scrollY - 100;
    }
    
    setDropdownPosition({ top, left });
    setOpenMenu(txnId);
  };

  // ─── Webhook Handler ─────────────────────────────────────────────────────
  const handleResendWebhook = async (orderId, transactionId) => {
    if (!orderId) {
      alert('Order ID not found for this transaction');
      return;
    }

    setWebhookLoading(transactionId);
    try {
      await transactionService.resendWebHook(orderId);
      alert(`Webhook resent successfully for order ${orderId}`);
      console.log('✅ Webhook resent successfully for order:', orderId);
    } catch (error) {
      console.error('❌ Failed to resend webhook:', error);
      alert('Failed to resend webhook. Please try again.');
    } finally {
      setWebhookLoading(null);
    }
  };

  // ─── PDF Export Function for All Transactions ──────────────────────────────
  const exportTransactionsPDF = () => {
    try {
      const doc = new jsPDF('l', 'mm', 'a4');
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      
      // Clean white background
      doc.setFillColor(255, 255, 255);
      doc.rect(0, 0, pageWidth, pageHeight, 'F');
      
      // Top accent bar
      doc.setFillColor(59, 130, 246);
      doc.rect(0, 0, pageWidth, 5, 'F');
      
      // Header
      doc.setTextColor(31, 41, 55);
      doc.setFontSize(22);
      doc.setFont('helvetica', 'bold');
      doc.text('Payout History Report', pageWidth / 2, 22, { align: 'center' });
      
      doc.setFontSize(9);
      doc.setTextColor(107, 114, 128);
      doc.setFont('helvetica', 'normal');
      const filterText = `Status: ${statusFilter} | Date: ${dateRange ? `${dateRange.startFormatted} to ${dateRange.endFormatted}` : 'All Time'}`;
      doc.text(filterText, pageWidth / 2, 30, { align: 'center' });
      doc.setTextColor(156, 163, 175);
      doc.setFontSize(8);
      doc.text(`Generated: ${new Date().toLocaleString()}`, pageWidth / 2, 36, { align: 'center' });
      
      doc.setDrawColor(229, 231, 235);
      doc.line(20, 40, pageWidth - 20, 40);
      
      // Stats Summary Cards
      const statsData = [
        { label: 'Total', value: transactionData.stats?.all_count || 0, color: [59, 130, 246] },
        { label: 'Success', value: transactionData.stats?.success || 0, color: [22, 163, 74] },
        { label: 'Failed', value: transactionData.stats?.failed || 0, color: [239, 68, 68] },
        { label: 'Processing', value: transactionData.stats?.processing || 0, color: [59, 130, 246] },
        { label: 'Initiated', value: transactionData.stats?.initiated || 0, color: [234, 179, 8] },
        { label: 'Returned', value: transactionData.stats?.returned || 0, color: [168, 85, 247] },
      ];
      
      const cardWidth = (pageWidth - 40) / 6;
      statsData.forEach((stat, index) => {
        const xPos = 20 + index * (cardWidth + 2);
        
        // Card background
        doc.setFillColor(249, 250, 251);
        doc.roundedRect(xPos, 47, cardWidth, 16, 2, 2, 'F');
        
        doc.setTextColor(107, 114, 128);
        doc.setFontSize(7);
        doc.setFont('helvetica', 'bold');
        doc.text(stat.label, xPos + cardWidth / 2, 54, { align: 'center' });
        
        doc.setTextColor(stat.color[0], stat.color[1], stat.color[2]);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.text(String(stat.value), xPos + cardWidth / 2, 62, { align: 'center' });
      });
      
      // Table
      const tableData = allPayouts.map(txn => [
        txn.trx_id || txn.id,
        txn.created_at,
        txn.bene_name || 'N/A',
        txn.ifsc || 'N/A',
        txn.bank_name || 'N/A',
        `Rs.${formatCurrency(txn.amount)}`,
        `Rs.${formatCurrency(txn.charges || 0)}`,
        txn.order_id || 'N/A',
        txn.status?.toUpperCase() || 'N/A',
        txn.utr || '–',
      ]);
      
      autoTable(doc, {
        startY: 70,
        head: [['ID', 'Date', 'Beneficiary', 'IFSC', 'Bank', 'Amount', 'Charges', 'Order ID', 'Status', 'UTR']],
        body: tableData,
        theme: 'striped',
        headStyles: {
          fillColor: [59, 130, 246],
          textColor: [255, 255, 255],
          fontSize: 8,
          fontStyle: 'bold',
          halign: 'center',
        },
        bodyStyles: {
          fontSize: 7,
        },
        columnStyles: {
          0: { cellWidth: 'auto', halign: 'center' },
          1: { cellWidth: 'auto', halign: 'center' },
          2: { cellWidth: 'auto', halign: 'left' },
          3: { cellWidth: 'auto', halign: 'center' },
          4: { cellWidth: 'auto', halign: 'left' },
          5: { cellWidth: 'auto', halign: 'right' },
          6: { cellWidth: 'auto', halign: 'right' },
          7: { cellWidth: 'auto', halign: 'center' },
          8: { cellWidth: 'auto', halign: 'center' },
          9: { cellWidth: 'auto', halign: 'center' },
        },
        margin: { left: 15, right: 15 },
        pageBreak: 'auto',
        rowPageBreak: 'avoid',
        tableWidth: 'auto',
        styles: {
          overflow: 'linebreak',
          cellPadding: 2,
        },
        didDrawPage: function(data) {
          // Footer on each page
          const footerY = doc.internal.pageSize.getHeight() - 10;
          doc.setDrawColor(229, 231, 235);
          doc.line(20, footerY - 5, pageWidth - 20, footerY - 5);
          doc.setTextColor(156, 163, 175);
          doc.setFontSize(7);
          doc.setFont('helvetica', 'italic');
          doc.text('This is a system generated report.', pageWidth / 2, footerY + 2, { align: 'center' });
          doc.setFontSize(6);
          doc.setFont('helvetica', 'normal');
          doc.text(`Page ${data.pageNumber}`, pageWidth - 30, footerY + 2);
        }
      });
      
      // Save
      doc.save(`Payout_History_${new Date().toISOString().split('T')[0]}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    }
  };

  // ─── PDF Export Function for Single Transaction from Menu ──────────────────
  const exportSingleTransactionPDF = (txn) => {
    try {
      // Calculate net amount inside the function
      const netAmount = parseFloat(txn.amount) - parseFloat(txn.charges || 0);
      
      const doc = new jsPDF('p', 'mm', 'a4');
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      
      // Clean white background
      doc.setFillColor(255, 255, 255);
      doc.rect(0, 0, pageWidth, pageHeight, 'F');
      
      // Top accent bar
      doc.setFillColor(59, 130, 246);
      doc.rect(0, 0, pageWidth, 6, 'F');
      
      // Header
      doc.setTextColor(31, 41, 55);
      doc.setFontSize(24);
      doc.setFont('helvetica', 'bold');
      doc.text('PAYMENT RECEIPT', pageWidth / 2, 25, { align: 'center' });
      
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(107, 114, 128);
      doc.text('Transaction Confirmation', pageWidth / 2, 33, { align: 'center' });
      
      doc.setFontSize(9);
      doc.setTextColor(156, 163, 175);
      doc.text(`Receipt #: ${txn.trx_id || txn.id}`, pageWidth / 2, 41, { align: 'center' });
      
      doc.setDrawColor(229, 231, 235);
      doc.line(30, 48, pageWidth - 30, 48);
      
      // Status - Plain text without color background
      const statusText = txn.status?.toUpperCase() || 'UNKNOWN';
      doc.setTextColor(107, 114, 128);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.text(`Status: ${statusText}`, pageWidth - 30, 57, { align: 'right' });
      
      // Amount Section
      doc.setFillColor(249, 250, 251);
      doc.roundedRect(20, 60, pageWidth - 40, 30, 4, 4, 'F');
      
      doc.setTextColor(107, 114, 128);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.text('Total Amount', pageWidth / 2, 72, { align: 'center' });
      
      doc.setTextColor(31, 41, 55);
      doc.setFontSize(22);
      doc.setFont('helvetica', 'bold');
      doc.text(`Rs. ${formatCurrency(txn.amount)}`, pageWidth / 2, 86, { align: 'center' });
      
      // Transaction Details Section
      doc.setTextColor(31, 41, 55);
      doc.setFontSize(13);
      doc.setFont('helvetica', 'bold');
      doc.text('Transaction Details', 20, 110);
      
      doc.setDrawColor(229, 231, 235);
      doc.line(20, 114, pageWidth - 20, 114);
      
      const details = [
        ['Transaction ID', txn.trx_id || txn.id],
        ['Order ID', txn.order_id || 'N/A'],
        ['Date & Time', `${txn.created_at}`],
        ['UTR Number', txn.utr || 'N/A'],
      ];
      
      let yPos = 124;
      details.forEach(([label, value]) => {
        doc.setFontSize(9);
        doc.setTextColor(107, 114, 128);
        doc.setFont('helvetica', 'bold');
        doc.text(label, 20, yPos);
        
        doc.setTextColor(31, 41, 55);
        doc.setFont('helvetica', 'normal');
        const maxWidth = 120;
        const valueStr = String(value);
        if (doc.getStringUnitWidth(valueStr) * 9 / 3 > maxWidth) {
          const lines = doc.splitTextToSize(valueStr, maxWidth);
          doc.text(lines, 80, yPos);
        } else {
          doc.text(valueStr, 80, yPos);
        }
        yPos += 8;
      });
      
      yPos += 4;
      doc.setDrawColor(229, 231, 235);
      doc.line(20, yPos, pageWidth - 20, yPos);
      yPos += 8;
      
      // Amount Breakdown
      doc.setTextColor(31, 41, 55);
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.text('Amount Breakdown', 20, yPos);
      yPos += 6;
      
      const amountDetails = [
        ['Subtotal', `Rs. ${formatCurrency(txn.amount)}`],
        ['Charges', `Rs. ${formatCurrency(txn.charges || 0)}`],
        ['Net Amount', `Rs. ${netAmount.toFixed(2)}`],
      ];
      
      amountDetails.forEach(([label, value], index) => {
        const isLast = index === amountDetails.length - 1;
        doc.setFontSize(9);
        
        if (isLast) {
          doc.setTextColor(31, 41, 55);
          doc.setFont('helvetica', 'bold');
        } else {
          doc.setTextColor(107, 114, 128);
          doc.setFont('helvetica', 'normal');
        }
        
        doc.text(label, 30, yPos + 6);
        doc.text(value, pageWidth - 35, yPos + 6, { align: 'right' });
        yPos += 7;
      });
      
      yPos += 4;
      doc.setDrawColor(229, 231, 235);
      doc.line(20, yPos, pageWidth - 20, yPos);
      yPos += 8;
      
      // Beneficiary Section
      doc.setTextColor(31, 41, 55);
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.text('Beneficiary Details', 20, yPos);
      yPos += 6;
      
      const beneficiary = [
        ['Name', txn.bene_name || 'N/A'],
        ['Account Number', txn.account_number || 'XXXXXXXXXX1234'],
        ['IFSC Code', txn.ifsc || 'N/A'],
        ['Bank Name', txn.bank_name || 'N/A'],
      ];
      
      beneficiary.forEach(([label, value]) => {
        doc.setFontSize(9);
        doc.setTextColor(107, 114, 128);
        doc.setFont('helvetica', 'bold');
        doc.text(label, 30, yPos + 6);
        
        doc.setTextColor(31, 41, 55);
        doc.setFont('helvetica', 'normal');
        doc.text(String(value), 80, yPos + 6);
        yPos += 7;
      });
      
      // Footer
      const footerY = pageHeight - 30;
      doc.setDrawColor(229, 231, 235);
      doc.line(20, footerY, pageWidth - 20, footerY);
      
      doc.setTextColor(156, 163, 175);
      doc.setFontSize(8);
      doc.setFont('helvetica', 'italic');
      doc.text('This is a system generated receipt.', pageWidth / 2, footerY + 8, { align: 'center' });
      
      doc.setFontSize(7);
      doc.setFont('helvetica', 'normal');
      doc.text(`Generated on: ${new Date().toLocaleString()}`, pageWidth / 2, footerY + 15, { align: 'center' });
      
      doc.save(`Transaction_Receipt_${txn.trx_id || txn.id}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    }
  };

  const allPayouts = transactionData.data || [];
  const totalItems = transactionData.total || 0;
  const stats = transactionData.stats || {};

  if (selected) {
    return <TransactionDetails txn={selected} onBack={() => setSelected(null)} />;
  }

  // ─── Loading State ──────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading transactions...</p>
        </div>
      </div>
    );
  }

  // ─── Error State ────────────────────────────────────────────────────────────
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <svg className="w-12 h-12 text-red-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="mt-4 text-red-600">{error}</p>
          <button 
            onClick={fetchTransactions}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-5 font-sans">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 sm:mb-5 flex-wrap gap-3">
        <div>
          <h1 className="text-base sm:text-[18px] font-bold text-gray-900">Payout History</h1>
          <p className="text-[10px] sm:text-xs text-gray-600 font-medium mt-0.5">
            View and track all your payout transactions
            {selectedDateRange && (
              <span className="ml-2 text-blue-600 font-semibold">
                ({formatDateRangeDisplay()})
              </span>
            )}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] sm:text-xs text-gray-500">
            Total: ₹{formatCurrency(stats.total_amount)}
          </span>
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
                {["All Status","Success","Failed","Pending","Processing","Initiated","Returned"].map(s => <option key={s}>{s}</option>)}
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
        
        {/* Selected Date Range Display */}
        {selectedDateRange && (
          <div className="flex items-center gap-2 mt-3 px-3 py-2 bg-blue-50 border border-blue-200 rounded-xl text-[11px] sm:text-xs">
            <span className="text-blue-600 font-medium">Selected:</span>
            <span className="text-gray-700 font-semibold">{formatDateRangeDisplay()}</span>
            <button 
              onClick={() => {
                setSelectedDateRange(null);
                setDateRange(null);
                setPage(1);
              }}
              className="text-gray-400 hover:text-red-500 transition-colors ml-1"
            >
              <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
        )}
        
        <div className="flex flex-col sm:flex-row justify-end gap-2 mt-3">
          <button 
            onClick={() => { 
              setStatusFilter("All Status"); 
              setSearch(""); 
              setBenSearch(""); 
              setPage(1);
              setSelectedDateRange(null);
              setDateRange(null);
            }}
            className="px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-200 rounded-xl text-[11px] sm:text-xs text-gray-600 hover:bg-gray-50 transition-colors font-medium"
          >
            Reset All
          </button>
          <button 
            onClick={fetchTransactions}
            className="px-4 sm:px-5 py-1.5 sm:py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-[11px] sm:text-xs font-semibold transition-colors"
          >
            Apply Filters
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-3 mb-4">
        <div className="bg-white rounded-xl border border-gray-100 p-2 sm:p-3 text-center">
          <div className="text-[9px] sm:text-[10px] text-gray-500">Total</div>
          <div className="text-sm sm:text-base font-bold text-gray-900">{stats.all_count || 0}</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-2 sm:p-3 text-center">
          <div className="text-[9px] sm:text-[10px] text-gray-500">Success</div>
          <div className="text-sm sm:text-base font-bold text-green-600">{stats.success || 0}</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-2 sm:p-3 text-center">
          <div className="text-[9px] sm:text-[10px] text-gray-500">Failed</div>
          <div className="text-sm sm:text-base font-bold text-red-600">{stats.failed || 0}</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-2 sm:p-3 text-center">
          <div className="text-[9px] sm:text-[10px] text-gray-500">Processing</div>
          <div className="text-sm sm:text-base font-bold text-blue-600">{stats.processing || 0}</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-2 sm:p-3 text-center">
          <div className="text-[9px] sm:text-[10px] text-gray-500">Initiated</div>
          <div className="text-sm sm:text-base font-bold text-yellow-600">{stats.initiated || 0}</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-2 sm:p-3 text-center">
          <div className="text-[9px] sm:text-[10px] text-gray-500">Returned</div>
          <div className="text-sm sm:text-base font-bold text-purple-600">{stats.returned || 0}</div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 px-4 sm:px-5 py-3 sm:py-3.5 border-b border-gray-100">
          <span className="text-xs sm:text-sm font-bold text-gray-900">Total {totalItems.toLocaleString()} Payouts</span>
          <button 
            onClick={exportTransactionsPDF}
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-[11px] sm:text-sm font-medium transition-colors"
          >
            <svg width={12} sm:width={14} height={12} sm:height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
            </svg>
            Export PDF
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
              {allPayouts.length === 0 ? (
                <tr>
                  <td colSpan={11} className="text-center py-8 text-gray-400 text-xs sm:text-sm">
                    No transactions found
                  </td>
                </tr>
              ) : (
                allPayouts.map(txn => (
                  <tr key={txn.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/60 transition-colors">
                    <td className="px-3 sm:px-4 py-2.5 sm:py-3.5">
                      <button onClick={() => setSelected(txn)} className="text-[10px] sm:text-xs font-mono text-gray-800 hover:text-blue-600 hover:underline transition-colors text-left">
                        {txn.trx_id || txn.id}
                      </button>
                    </td>
                    <td className="px-3 sm:px-4 py-2.5 sm:py-3.5">
                      <div className="text-[10px] sm:text-xs font-medium text-gray-800 whitespace-nowrap">{txn.created_at}</div>
                    </td>
                    <td className="px-3 sm:px-4 py-2.5 sm:py-3.5 text-[10px] sm:text-xs font-medium text-gray-800 whitespace-nowrap">{txn.bene_name || 'N/A'}</td>
                    <td className="px-3 sm:px-4 py-2.5 sm:py-3.5 text-[10px] sm:text-xs font-medium text-gray-800 whitespace-nowrap">{txn.ifsc || 'N/A'}</td>
                    <td className="px-3 sm:px-4 py-2.5 sm:py-3.5 text-[10px] sm:text-xs font-medium text-gray-700 whitespace-nowrap">{txn.bank_name || 'N/A'}</td>
                    <td className="px-3 sm:px-4 py-2.5 sm:py-3.5 text-[10px] sm:text-xs font-semibold text-gray-900 whitespace-nowrap">
                      {formatCurrency(txn.amount)}
                    </td>
                    <td className="px-3 sm:px-4 py-2.5 sm:py-3.5 text-[10px] sm:text-xs font-medium text-gray-800 whitespace-nowrap">{formatCurrency(txn.charges || 0)}</td>
                    <td className="px-3 sm:px-4 py-2.5 sm:py-3.5 text-[10px] sm:text-xs font-medium text-gray-800 whitespace-nowrap">{txn.order_id || 'N/A'}</td>
                    <td className="px-3 sm:px-4 py-2.5 sm:py-3.5"><StatusBadge status={txn.status} /></td>
                    <td className="px-3 sm:px-4 py-2.5 sm:py-3.5 text-[10px] sm:text-xs font-medium text-gray-800 whitespace-nowrap">{txn.utr || "–"}</td>
                    <td className="px-3 sm:px-4 py-2.5 sm:py-3.5">
                      <div className="flex items-center gap-1">
                        {/* ─── Webhook Button ─── */}
                        <button
                          onClick={() => {
                            const orderId = txn.order_id;
                            handleResendWebhook(orderId, txn.id);
                          }}
                          disabled={webhookLoading === txn.id}
                          className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-600 transition-colors disabled:opacity-50"
                          title="Resend Webhook"
                        >
                          {webhookLoading === txn.id ? (
                            <span className="inline-block w-3.5 h-3.5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                              <path d="M4 4v16h16" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M8 12l3 3 8-8" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          )}
                        </button>

                        {/* ─── Three Dot Menu ─── */}
                        <button
                          onClick={(e) => { 
                            e.stopPropagation(); 
                            handleMenuToggle(txn.id, e);
                          }}
                          className="p-1 rounded-lg hover:bg-gray-100 text-gray-400 transition-colors"
                        >
                          <svg width={14} sm:width={16} height={14} sm:height={16} viewBox="0 0 24 24" fill="currentColor">
                            <circle cx="12" cy="5" r="1.5"/>
                            <circle cx="12" cy="12" r="1.5"/>
                            <circle cx="12" cy="19" r="1.5"/>
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 sm:px-5 py-3 sm:py-3.5 border-t border-gray-100">
          <span className="text-[10px] sm:text-xs text-gray-500 text-center sm:text-left">
            Showing {Math.min((page-1)*limit+1, totalItems)} to {Math.min(page*limit, totalItems)} of {totalItems.toLocaleString()} results
          </span>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <select 
              value={limit}
              onChange={(e) => { setLimit(parseInt(e.target.value)); setPage(1); }}
              className="border border-gray-200 rounded-lg px-2 py-1 text-xs sm:text-sm"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
            <button 
              onClick={() => setPage(p => Math.max(1, p-1))} 
              disabled={page===1}
              className="p-1 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <svg width={12} sm:width={14} height={12} sm:height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            </button>
            {Array.from({ length: Math.min(5, transactionData.totalPages || 1) }, (_, i) => {
              let p;
              const totalPages = transactionData.totalPages || 1;
              if (totalPages <= 5) {
                p = i + 1;
              } else if (page <= 3) {
                p = i + 1;
              } else if (page >= totalPages - 2) {
                p = totalPages - 4 + i;
              } else {
                p = page - 2 + i;
              }
              return (
                <button 
                  key={p} 
                  onClick={() => setPage(p)}
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg text-[10px] sm:text-xs font-semibold transition-colors ${page===p?"bg-blue-600 text-white":"border border-gray-200 text-gray-600 hover:bg-gray-50"}`}
                >
                  {p}
                </button>
              );
            })}
            <button 
              onClick={() => setPage(p => Math.min(transactionData.totalPages || 1, p+1))}
              disabled={page===transactionData.totalPages || transactionData.totalPages===0}
              className="p-1 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <svg width={12} sm:width={14} height={12} sm:height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* ─── Dropdown Menu (Rendered with fixed positioning) ─── */}
      {openMenu && (
        <div 
          className="fixed z-[9999] bg-white rounded-xl shadow-xl border border-gray-100 py-1 w-40 min-w-[160px]"
          style={{
            top: dropdownPosition.top + 'px',
            left: dropdownPosition.left + 'px'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Backdrop for click outside */}
          <div 
            className="fixed inset-0 z-[-1]" 
            onClick={() => setOpenMenu(null)}
          />
          
          {/* Find the selected transaction */}
          {(() => {
            const txn = allPayouts.find(t => t.id === openMenu);
            if (!txn) return null;
            
            return (
              <>
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
                <button 
                  onClick={() => { 
                    exportSingleTransactionPDF(txn);
                    setOpenMenu(null);
                  }}
                  className="flex items-center gap-2 sm:gap-2.5 w-full px-2.5 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-xs text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <svg width={11} sm:width={13} height={11} sm:height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                  </svg>
                  Download Receipt
                </button>
                <button 
                  onClick={() => setOpenMenu(null)}
                  className="flex items-center gap-2 sm:gap-2.5 w-full px-2.5 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-xs text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <svg width={11} sm:width={13} height={11} sm:height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
                    <polyline points="15 3 21 3 21 9"/>
                    <line x1="10" y1="14" x2="21" y2="3"/>
                  </svg>
                  Raise Ticket
                </button>
              </>
            );
          })()}
        </div>
      )}
    </div>
  );
}