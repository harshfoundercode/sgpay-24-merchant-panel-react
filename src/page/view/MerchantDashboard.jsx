import { useState, useEffect } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell,
} from "recharts";
import DateRangePicker from "../../components/DatePicker";
import dashboardService from "../../services/DashboardServices";

// ─── Format Helpers ──────────────────────────────────────────────────────────
const formatCurrency = (amount) => {
  const num = parseFloat(amount);
  if (isNaN(num)) return '₹0.00';
  if (num >= 10000000) return `₹${(num / 10000000).toFixed(2)} Cr`;
  if (num >= 100000) return `₹${(num / 100000).toFixed(2)} L`;
  return `₹${num.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

const formatCurrencyShort = (amount) => {
  const num = parseFloat(amount);
  if (isNaN(num)) return '₹0';
  if (num >= 10000000) return `₹${(num / 10000000).toFixed(1)}Cr`;
  if (num >= 100000) return `₹${(num / 100000).toFixed(1)}L`;
  if (num >= 1000) return `₹${(num / 1000).toFixed(0)}K`;
  return `₹${num.toFixed(0)}`;
};

const formatNumber = (num) => {
  if (!num && num !== 0) return '0';
  return parseInt(num).toLocaleString();
};

const yFormat = (v) => {
  if (v >= 100000) return `${(v / 100000).toFixed(1)}L`;
  if (v >= 1000) return `${(v / 1000).toFixed(0)}K`;
  return v;
};

// ─── Tooltip Components ──────────────────────────────────────────────────────
const CustomLineTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-white border border-gray-100 shadow-lg rounded-xl px-2 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-xs">
        <div className="font-semibold text-gray-600 mb-0.5">{label}</div>
        <div className="text-blue-600 font-bold text-[11px] sm:text-xs">{formatCurrency(payload[0].value)}</div>
      </div>
    );
  }
  return null;
};

const CustomBarTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-white border border-gray-100 shadow-lg rounded-xl px-2 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-xs">
        <div className="font-semibold text-gray-600 mb-0.5">{label}</div>
        <div className="text-blue-500 font-bold text-[11px] sm:text-xs">{payload[0].value} Txns</div>
      </div>
    );
  }
  return null;
};

// ─── Main Component ──────────────────────────────────────────────────────────
export default function MerchantDashboard() {
  const [chartPeriod, setChartPeriod] = useState("7D");
  const [dateRange, setDateRange] = useState(null);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDateRange, setSelectedDateRange] = useState(null);

  // Track window width for responsive charts
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 640;
  const isTablet = windowWidth >= 640 && windowWidth < 1024;

  const getTickStyle = () => ({
    fontSize: isMobile ? 9 : isTablet ? 10 : 11,
    fill: "#30304F",
    fontWeight: 700
  });

  // ─── Fetch Dashboard Data ──────────────────────────────────────────────────
  const fetchDashboardData = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {};
      if (dateRange) {
        params.start_date = dateRange.startFormatted;
        params.end_date = dateRange.endFormatted;
      }
      const response = await dashboardService.getDashboardData(params);
      console.log("Dashboard Data:", response);
      setDashboardData(response);
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
      setError("Failed to load dashboard data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [dateRange]);

  const handleDateChange = (dateData) => {
    if (dateData) {
      setDateRange(dateData);
      setSelectedDateRange(dateData);
      console.log('Date Range Selected:', dateData);
    } else {
      setDateRange(null);
      setSelectedDateRange(null);
      console.log('Date range cleared');
    }
  };

  const handleRefresh = () => {
    fetchDashboardData();
  };

  // ─── Prepare Data for Charts ──────────────────────────────────────────────
  const data = dashboardData || {};
  const walletBalance = data.wallet_balance || "0.00";
  const today = data.today || { payout_amount: "0.00", payout_count: 0 };
  const successRate = data.success_rate || "0.00";
  const successfulPayoutAmount = data.successful_payout_amount || "0.00";
  const pendingPayoutAmount = data.pending_payout_amount || "0.00";
  const cancelledPayoutAmount = data.cancelled_payout_amount || "0.00";
  
  const ratio = data.success_vs_failed_ratio || {
    success: "0",
    failed: "0",
    success_percentage: "0.00",
    failed_percentage: "0.00"
  };
  
  const volumeOverview = data.transaction_volume_overview || {
    total_transactions: 0,
    this_month_payout: "0.00",
    this_month_count: 0,
    pending_requests: 0,
    pending_amount: "0.00",
    failed_transactions: "0",
    failed_amount: "0.00"
  };
  
  const recentTransactions = data.recent_transactions || [];
  const payoutTrend = data.payout_trend || [];

  // ─── Format payout trend dates ──────────────────────────────────────────────
  console.log('Raw Payout Trend:', payoutTrend);

  const formattedPayoutTrend = payoutTrend.map(item => {
    const amountValue = parseFloat(item.total_amount) || parseFloat(item.amount) || 0;
    
    return {
      ...item,
      formattedDate: new Date(item.date).toLocaleDateString('en-IN', { 
        day: '2-digit', 
        month: 'short' 
      }),
      amount: amountValue,
      count: item.txn_count || 0
    };
  });

  console.log('Formatted Payout Trend:', formattedPayoutTrend);

  // ─── Pie Chart Data ────────────────────────────────────────────────────────
  const successCount = parseInt(ratio.success) || 0;
  const failedCount = parseInt(ratio.failed) || 0;
  const pendingCount = parseInt(volumeOverview.pending_requests) || 0;
  
  const pieData = [
    { name: "Successful", value: successCount || 1, color: "#16a34a" },
    { name: "Failed", value: failedCount || 1, color: "#ef4444" },
    { name: "Pending", value: pendingCount || 1, color: "#f59e0b" },
  ].filter(item => item.value > 0);

  if (pieData.length === 0) {
    pieData.push({ name: "No Data", value: 1, color: "#9ca3af" });
  }

  const totalPayouts = successCount + failedCount + pendingCount;

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
    return "All Time";
  };

  // ─── Loading State ──────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
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
            onClick={handleRefresh}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-5">
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-4 sm:mb-6 gap-3">
        <div>
          <h1 className="text-base sm:text-[18px] font-bold text-gray-900">
            Welcome back! <span className="text-lg sm:text-xl">👋</span>
          </h1>
          <p className="text-[11px] sm:text-xs text-gray-600 font-medium mt-0.5">
            Here's your payout overview.
            {selectedDateRange && (
              <span className="ml-2 text-blue-600 font-semibold">
                ({formatDateRangeDisplay()})
              </span>
            )}
          </p>
        </div>
      </div>

      {/* ── Stat Cards Row 1 ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-3 sm:mb-4">
        {[
          {
            icon: <svg width={18} sm:width={22} height={18} sm:height={22} viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth={1.8}><path d="M2 5a2 2 0 012-2h16a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5z"/><path d="M2 10h20"/></svg>,
            iconBg: "bg-indigo-50",
            label: "Wallet Balance",
            value: formatCurrency(walletBalance),
            sub: "Available to transfer",
            subColor: "text-gray-400",
          },
          {
            icon: <svg width={18} sm:width={22} height={18} sm:height={22} viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth={1.8}><path d="M3 3h18v18H3z" rx="2"/><path d="M7 17V9m4 8V5m4 12v-5"/></svg>,
            iconBg: "bg-green-50",
            label: "Today's Payout",
            value: formatCurrency(today.payout_amount),
            sub: `${today.payout_count} Transactions`,
            subColor: "text-gray-400",
          },
          // {
          //   icon: <svg width={18} sm:width={22} height={18} sm:height={22} viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth={1.8}><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414A1 1 0 0119 9.414V19a2 2 0 01-2 2z"/></svg>,
          //   iconBg: "bg-indigo-50",
          //   label: "Today's Transactions",
          //   value: formatNumber(today.payout_count),
          //   sub: "Total payout count",
          //   subColor: "text-gray-400",
          // },
          {
            icon: <svg width={18} sm:width={22} height={18} sm:height={22} viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth={1.8}><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414A1 1 0 0119 9.414V19a2 2 0 01-2 2z"/></svg>,
            iconBg: "bg-indigo-50",
            label: "Today's Success Rate",
            value: formatCurrency(today.success_amount),
            sub: `${today.success_count} Total success count`,
            subColor: "text-gray-400",
          },
          {
            icon: <svg width={18} sm:width={22} height={18} sm:height={22} viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth={1.8}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
            iconBg: "bg-blue-50",
            label: "Success Rate",
            value: `${parseFloat(successRate).toFixed(2)}%`,
            sub: (
              <span className="flex items-center gap-1 flex-wrap">
                <span className="text-gray-400 text-[10px] sm:text-xs">Overall</span>
              </span>
            ),
          },
        ].map((c, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 p-3 sm:p-4 flex items-start gap-2 sm:gap-3">
            <div className={`w-9 h-9 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center shrink-0 ${c.iconBg}`}>
              {c.icon}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[11px] sm:text-xs text-gray-800 font-bold mb-0.5">{c.label}</div>
              <div className="text-base sm:text-lg font-bold text-gray-900 leading-tight wrap-break-word">{c.value}</div>
              <div className="text-[10px] sm:text-xs mt-0.5">{typeof c.sub === "string" ? <span className={c.subColor}>{c.sub}</span> : c.sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Stat Cards Row 2 ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-5">
        {[
          {
            icon: <svg width={18} sm:width={22} height={18} sm:height={22} viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth={1.8}><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>,
            iconBg: "bg-indigo-50",
            label: "Total Payout Count",
            value: formatNumber(volumeOverview.total_transactions),
            sub: "All time",
          },
          {
            icon: <svg width={18} sm:width={22} height={18} sm:height={22} viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth={1.8}><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>,
            iconBg: "bg-green-50",
            label: "Successful Payout Amount",
            value: formatCurrency(successfulPayoutAmount),
            sub: "All time",
          },
          {
            icon: <svg width={18} sm:width={22} height={18} sm:height={22} viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth={1.8}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
            iconBg: "bg-yellow-50",
            label: "Pending Payout Amount",
            value: formatCurrency(pendingPayoutAmount),
            sub: "Will settle soon",
          },
          {
            icon: <svg width={18} sm:width={22} height={18} sm:height={22} viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth={1.8}><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>,
            iconBg: "bg-red-50",
            label: "Cancelled Payout Amount",
            value: formatCurrency(cancelledPayoutAmount),
            sub: "All time",
          },
        ].map((c, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 p-3 sm:p-4 flex items-start gap-2 sm:gap-3">
            <div className={`w-9 h-9 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center shrink-0 ${c.iconBg}`}>
              {c.icon}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[11px] sm:text-xs text-gray-800 font-bold mb-0.5">{c.label}</div>
              <div className="text-sm sm:text-base font-bold text-gray-900 leading-tight wrap-break-word">{c.value}</div>
              <div className="text-[10px] sm:text-xs text-gray-400 mt-0.5">{c.sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Filters ── */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-4 sm:mb-5">
        <DateRangePicker 
          onDateChange={handleDateChange}
          placeholder="Select date range"
        />
        
        {/* Selected Date Range Display */}
        {selectedDateRange && (
          <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 border border-blue-200 rounded-xl text-[11px] sm:text-xs">
            <span className="text-blue-600 font-medium">Selected:</span>
            <span className="text-gray-700 font-semibold">{formatDateRangeDisplay()}</span>
            <button 
              onClick={() => {
                setSelectedDateRange(null);
                setDateRange(null);
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
        
        <button 
          onClick={handleRefresh}
          className="flex items-center justify-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-xl text-[11px] sm:text-xs text-gray-500 hover:bg-gray-50 transition-colors sm:ml-auto"
        >
          <svg width={12} sm:width={14} height={12} sm:height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M1 4v6h6M23 20v-6h-6M20.49 9A9 9 0 005.64 5.64L1 10M23 14l-4.64 4.36A9 9 0 013.51 15"/>
          </svg>
          Refresh
        </button>
      </div>

      {/* ── Charts Row ── */}
      <div className="flex flex-col lg:flex-row gap-4 sm:gap-5 mb-4 sm:mb-5">

        {/* Payout Trend — left */}
        <div className="flex-1 lg:flex-3 bg-white rounded-2xl border border-gray-100 p-4 sm:p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-1">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-gray-900">Payout Trend</span>
              <svg width={12} sm:width={14} height={12} sm:height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="text-gray-300">
                <circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>
              </svg>
            </div>
            <div className="flex rounded-lg overflow-hidden border border-gray-200 self-start sm:self-auto">
              {["7D","30D","90D"].map(p => (
                <button key={p} onClick={() => setChartPeriod(p)}
                  className={`px-2.5 sm:px-3 py-1 text-[11px] sm:text-xs font-semibold transition-colors ${chartPeriod===p?"bg-blue-600 text-white":"bg-white text-gray-800 hover:bg-gray-50"}`}>
                  {p}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2 mb-3 pl-2 sm:pl-7 pt-2">
            <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#0665FA]" />
            <span className="text-[11px] sm:text-xs text-gray-800 font-semibold">Payout Amount (₹)</span>
          </div>
          <div className="h-50 w-full">
            {formattedPayoutTrend.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={formattedPayoutTrend} margin={{ top:5, right:10, left:0, bottom:0 }}>
                  <defs>
                    <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="formattedDate"
                    tick={getTickStyle()} 
                    axisLine={{ stroke: "#CBD5E1", strokeWidth: 1 }} 
                    tickLine={false} 
                  />
                  <YAxis 
                    tickFormatter={yFormat} 
                    tick={getTickStyle()} 
                    axisLine={false} 
                    tickLine={false} 
                    width={isMobile ? 30 : 35} 
                  />
                  <Tooltip content={<CustomLineTooltip />} />
                  <Line type="monotone" dataKey="amount" stroke="#3b82f6" strokeWidth={2.5}
                    dot={{ fill:"#3b82f6", r:isMobile ? 3 : 3.5, strokeWidth:2, stroke:"#fff" }}
                    activeDot={{ r:isMobile ? 4 : 5, fill:"#3b82f6" }} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                No payout trend data available
              </div>
            )}
          </div>
        </div>

        {/* Success vs Failed Ratio — right */}
        <div className="flex-1 lg:flex-2 bg-white rounded-2xl border border-gray-100 p-4 sm:p-5">
          <h3 className="text-sm font-bold text-gray-900 mb-3 sm:mb-4">Success vs Failed Ratio</h3>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <div className="relative">
              <div className="w-35 h-35 sm:w-42.5 sm:h-42.5">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie 
                      data={pieData} 
                      cx="50%" 
                      cy="50%" 
                      innerRadius={isMobile ? 35 : 45} 
                      outerRadius={isMobile ? 50 : 65}
                      dataKey="value" 
                      strokeWidth={2} 
                      stroke="#fff" 
                      startAngle={90} 
                      endAngle={-270}
                    >
                      {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-base sm:text-xl font-bold text-gray-900">{formatNumber(totalPayouts)}</span>
                <span className="text-[10px] sm:text-xs text-gray-500">Total Payouts</span>
              </div>
            </div>
            <div className="flex flex-col gap-2 sm:gap-3">
              {[
                { label:"Successful", count:`${formatNumber(ratio.success)} (${parseFloat(ratio.success_percentage).toFixed(2)}%)`, color:"#16a34a" },
                { label:"Failed",     count:`${formatNumber(ratio.failed)} (${parseFloat(ratio.failed_percentage).toFixed(2)}%)`, color:"#ef4444" },
                { label:"Pending",    count:`${formatNumber(volumeOverview.pending_requests)} (${parseFloat(parseFloat(volumeOverview.pending_requests || 0) / (totalPayouts || 1) * 100).toFixed(2)}%)`, color:"#f59e0b" },
              ].filter(item => parseFloat(item.count.split('(')[1]?.replace('%)', '')) > 0).map(item => (
                <div key={item.label} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full shrink-0" style={{ background: item.color }} />
                  <div className="text-[11px] sm:text-xs font-medium text-gray-700 min-w-17.5">{item.label}</div>
                  <div className="text-[10px] sm:text-[11px] text-gray-500">{item.count}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom Row ── */}
      <div className="flex flex-col lg:flex-row gap-4 sm:gap-5">

        {/* Transaction Volume — left */}
        <div className="flex-1 lg:flex-3 bg-white rounded-2xl border border-gray-100 p-4 sm:p-5">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-bold text-gray-900">Transaction Volume Overview</span>
            <svg width={12} sm:width={14} height={12} sm:height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="text-gray-300">
              <circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>
            </svg>
          </div>
          <div className="flex items-center gap-2 mb-3 pl-2 sm:pl-7 pt-3">
            <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#0665FA]" />
            <span className="text-[11px] sm:text-xs font-medium text-gray-800">Transaction Count</span>
          </div>
          <div className="flex flex-wrap gap-4 sm:gap-6 mb-4">
            {[
              { label: "Total Transactions", value: formatNumber(volumeOverview.total_transactions) },
              { label: "This Month Payout", value: formatCurrency(volumeOverview.this_month_payout) },
              { label: "This Month Count", value: formatNumber(volumeOverview.this_month_count) },
            ].map((item, i) => (
              <div key={i}>
                <div className="text-[10px] sm:text-xs text-gray-500">{item.label}</div>
                <div className="text-sm sm:text-base font-bold text-gray-900">{item.value}</div>
              </div>
            ))}
          </div>
          <div className="h-50 w-full">
            {formattedPayoutTrend.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={formattedPayoutTrend} 
                  margin={{ top:5, right:10, left:0, bottom:0 }} 
                  barSize={isMobile ? 20 : 24}
                >
                  <XAxis 
                    dataKey="formattedDate"
                    tick={getTickStyle()} 
                    axisLine={{ stroke: "#CBD5E1", strokeWidth: 1 }} 
                    tickLine={false} 
                  />
                  <YAxis 
                    tick={getTickStyle()} 
                    axisLine={false} 
                    tickLine={false} 
                    width={isMobile ? 25 : 30} 
                  />
                  <Tooltip content={<CustomBarTooltip />} cursor={{ fill:"#f1f5f9" }} />
                  <Bar dataKey="count" fill="#93c5fd" radius={[4,4,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                No transaction volume data available
              </div>
            )}
          </div>
        </div>

        {/* Quick Stats — right */}
        <div className="flex-1 lg:flex-2 grid grid-cols-2 gap-3 sm:gap-4">
          {/* This Month Payout */}
          <div className="bg-white rounded-2xl border border-gray-100 p-3 sm:p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-blue-50 flex items-center justify-center">
                <svg width={14} sm:width={16} height={14} sm:height={16} viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth={1.8}>
                  <path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
                </svg>
              </div>
              <span className="text-[11px] sm:text-xs text-gray-800 font-medium">This Month Payout</span>
            </div>
            <div className="text-base sm:text-lg font-bold text-gray-900">{formatCurrency(volumeOverview.this_month_payout)}</div>
            <div className="text-[10px] sm:text-xs text-gray-400 mt-0.5">{formatNumber(volumeOverview.this_month_count)} Transactions</div>
          </div>

          {/* Pending Requests */}
          <div className="bg-white rounded-2xl border border-gray-100 p-3 sm:p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-yellow-50 flex items-center justify-center">
                <svg width={14} sm:width={16} height={14} sm:height={16} viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth={1.8}>
                  <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                </svg>
              </div>
              <span className="text-[11px] sm:text-xs text-gray-800 font-medium">Pending Requests</span>
            </div>
            <div className="text-base sm:text-lg font-bold text-gray-900">{formatNumber(volumeOverview.pending_requests)}</div>
            <div className="text-[10px] sm:text-xs text-amber-500 font-semibold mt-0.5">{formatCurrency(volumeOverview.pending_amount)}</div>
          </div>

          {/* Failed Transactions */}
          <div className="bg-white rounded-2xl border border-gray-100 p-3 sm:p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-red-50 flex items-center justify-center">
                <svg width={14} sm:width={16} height={14} sm:height={16} viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth={1.8}>
                  <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
                </svg>
              </div>
              <span className="text-[11px] sm:text-xs text-gray-800 font-medium">Failed Transactions</span>
            </div>
            <div className="text-base sm:text-lg font-bold text-gray-900">{formatNumber(volumeOverview.failed_transactions)}</div>
            <div className="text-[10px] sm:text-xs text-red-500 font-semibold mt-0.5">{formatCurrency(volumeOverview.failed_amount)}</div>
          </div>

          {/* Success Rate */}
          <div className="bg-white rounded-2xl border border-gray-100 p-3 sm:p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-purple-50 flex items-center justify-center">
                <svg width={14} sm:width={16} height={14} sm:height={16} viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth={1.8}>
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <span className="text-[11px] sm:text-xs text-gray-800 font-medium">Success Rate</span>
            </div>
            <div className="text-base sm:text-lg font-bold text-gray-900">{parseFloat(successRate).toFixed(2)}%</div>
            <div className="text-[10px] sm:text-xs text-gray-400 mt-0.5">Overall performance</div>
          </div>
        </div>
      </div>

      {/* ── Recent Transactions Table ── */}
      {recentTransactions.length > 0 && (
        <div className="mt-4 sm:mt-5 bg-white rounded-2xl border border-gray-100 p-4 sm:p-5">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Recent Transactions</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 px-2 text-gray-500 font-medium">TRX ID</th>
                  <th className="text-left py-2 px-2 text-gray-500 font-medium">Order ID</th>
                  <th className="text-left py-2 px-2 text-gray-500 font-medium">Beneficiary</th>
                  <th className="text-left py-2 px-2 text-gray-500 font-medium">Amount</th>
                  <th className="text-left py-2 px-2 text-gray-500 font-medium">Status</th>
                  <th className="text-left py-2 px-2 text-gray-500 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentTransactions.slice(0, 5).map((txn) => (
                  <tr key={txn.id} className="border-b border-gray-50">
                    <td className="py-2 px-2 text-gray-900 font-medium">{txn.trx_id}</td>
                    <td className="py-2 px-2 text-gray-600">{txn.order_id}</td>
                    <td className="py-2 px-2 text-gray-600">{txn.bene_name}</td>
                    <td className="py-2 px-2 text-gray-900 font-medium">{formatCurrency(txn.amount)}</td>
                    <td className="py-2 px-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        txn.status === 'success' ? 'bg-green-100 text-green-700' :
                        txn.status === 'failed' ? 'bg-red-100 text-red-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {txn.status}
                      </span>
                    </td>
                    <td className="py-2 px-2 text-gray-500">
                      {new Date(txn.created_at).toLocaleDateString('en-IN', { 
                        day: '2-digit', 
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}