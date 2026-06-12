import { useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell,
} from "recharts";
import DateRangePicker from "../../components/DatePicker";

const payoutTrend = [
  { date: "8 May", value: 100000 },
  { date: "9 May", value: 190000 },
  { date: "10 May", value: 170000 },
  { date: "11 May", value: 150000 },
  { date: "12 May", value: 240000 },
  { date: "13 May", value: 180000 },
  { date: "14 May", value: 155000 },
];

const volumeData = [
  { date: "8 May", count: 38 },
  { date: "9 May", count: 52 },
  { date: "10 May", count: 42 },
  { date: "11 May", count: 65 },
  { date: "12 May", count: 78 },
  { date: "13 May", count: 62 },
  { date: "14 May", count: 45 },
];

const pieData = [
  { name: "Successful", value: 12250, color: "#16a34a" },
  { name: "Failed",     value: 150,   color: "#ef4444" },
  { name: "Pending",    value: 50,    color: "#f59e0b" },
];

const yFormat = (v) => {
  if (v >= 100000) return `${(v / 100000).toFixed(1)}L`;
  if (v >= 1000)   return `${(v / 1000).toFixed(0)}K`;
  return v;
};

const CustomLineTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-white border border-gray-100 shadow-lg rounded-xl px-3 py-2 text-xs">
        <div className="font-semibold text-gray-600 mb-0.5">{label}</div>
        <div className="text-blue-600 font-bold">₹{(payload[0].value / 100000).toFixed(2)}L</div>
      </div>
    );
  }
  return null;
};

const CustomBarTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-white border border-gray-100 shadow-lg rounded-xl px-3 py-2 text-xs">
        <div className="font-semibold text-gray-600 mb-0.5">{label}</div>
        <div className="text-blue-500 font-bold">{payload[0].value} Txns</div>
      </div>
    );
  }
  return null;
};

export default function MerchantDashboard() {
  const [chartPeriod, setChartPeriod] = useState("7D");

  const [dateRange, setDateRange] = useState(null);

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
            // Fetch data for selected date range here
            // fetchDashboardData(dateData.startDate, dateData.endDate);
        } else {
            console.log('Date range cleared');
            // Handle clearing date range
        }
    };
  return (
    <div className="min-h-screen bg-gray-50 p-5">

      {/* ── Header ── */}
      <div className="flex items-start justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-[18px] font-bold text-gray-900">
            Welcome back, Demo Store! <span className="text-xl">👋</span>
          </h1>
          <p className="text-xs text-gray-600 font-medium mt-0.5">Here's your payout overview.</p>
        </div>
        <div className="flex items-center gap-3">
          
          {/* Merchant info */}
          <div className="flex items-center gap-2.5 px-3 py-2 bg-white border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50">
            <div className="w-8 h-8 bg-gray-100 rounded-2xl flex items-center justify-center">
              <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth={1.8}>
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
            </div>
            <div>
              <div className="text-xs font-bold text-gray-900">Demo Store</div>
              <div className="text-[10px] text-gray-400">MID: M12345678</div>
            </div>
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="text-gray-400"><path d="M19 9l-7 7-7-7"/></svg>
          </div>
        </div>
      </div>

      {/* ── Stat Cards Row 1 ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {[
          {
            icon: <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth={1.8}><path d="M2 5a2 2 0 012-2h16a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5z"/><path d="M2 10h20"/></svg>,
            iconBg: "bg-indigo-50",
            label: "Wallet Balance",
            value: "₹2,45,680.50",
            sub: "Available to transfer",
            subColor: "text-gray-400",
          },
          {
            icon: <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth={1.8}><path d="M3 3h18v18H3z" rx="2"/><path d="M7 17V9m4 8V5m4 12v-5"/></svg>,
            iconBg: "bg-green-50",
            label: "Today's Payout",
            value: "₹85,000.00",
            sub: "25 Transactions",
            subColor: "text-gray-400",
          },
          {
            icon: <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth={1.8}><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414A1 1 0 0119 9.414V19a2 2 0 01-2 2z"/></svg>,
            iconBg: "bg-indigo-50",
            label: "Today's Transactions",
            value: "42",
            sub: "Total payout count",
            subColor: "text-gray-400",
          },
          {
            icon: <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth={1.8}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
            iconBg: "bg-blue-50",
            label: "Success Rate",
            value: "98.65%",
            sub: (
              <span className="flex items-center gap-1">
                <span className="text-gray-400">vs yesterday</span>
                <span className="text-green-500 font-semibold">↑ 1.25%</span>
              </span>
            ),
          },
        ].map((c, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 flex items-start gap-3 ">
            <div className={`w-11 h-11 rounded-4xl flex items-center justify-center flex-shrink-0 ${c.iconBg}`}>
              {c.icon}
            </div>
            <div className="min-w-0 space-y-1">
              <div className="text-xs  text-gray-800 font-bold mb-0.5">{c.label}</div>
              <div className="text-lg font-bold text-gray-900 leading-tight">{c.value}</div>
              <div className="text-xs mt-0.5">{typeof c.sub === "string" ? <span className={c.subColor}>{c.sub}</span> : c.sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Stat Cards Row 2 ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
        {[
          {
            icon: <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth={1.8}><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>,
            iconBg: "bg-indigo-50",
            label: "Total Payout Count",
            value: "12,450",
            sub: "All time",
          },
          {
            icon: <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth={1.8}><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>,
            iconBg: "bg-green-50",
            label: "Successful Payout Amount",
            value: "₹1,25,00,000.00",
            sub: "All time",
          },
          {
            icon: <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth={1.8}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
            iconBg: "bg-yellow-50",
            label: "Pending Payout Amount",
            value: "₹85,000.00",
            sub: "Will settle soon",
          },
          {
            icon: <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth={1.8}><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>,
            iconBg: "bg-red-50",
            label: "Cancelled Payout Amount",
            value: "₹12,500.00",
            sub: "All time",
          },
        ].map((c, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100  p-4 flex items-start gap-3">
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${c.iconBg}`}>
              {c.icon}
            </div>
            <div className="min-w-0 space-y-1.5">
              <div className="text-xs text-gray-800 font-bold mb-0.5">{c.label}</div>
              <div className="text-base font-bold text-gray-900 leading-tight">{c.value}</div>
              <div className="text-xs text-gray-400 mt-0.5">{c.sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Filters ── */}
      <div className="flex items-center gap-3 mb-5 flex-wrap">
        <DateRangePicker 
                        onDateChange={handleDateChange}
                        placeholder="14 May, 2025 - 14 May, 2025"
                    />
        <div className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs text-gray-700 cursor-pointer hover:bg-gray-50 min-w-[130px]">
          <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="text-gray-400"><path d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
          All Status
          <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="text-gray-400 ml-auto"><path d="M19 9l-7 7-7-7"/></svg>
        </div>
        <button className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs text-gray-500 hover:bg-gray-50 ml-auto transition-colors">
          <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M1 4v6h6M23 20v-6h-6M20.49 9A9 9 0 005.64 5.64L1 10M23 14l-4.64 4.36A9 9 0 013.51 15"/></svg>
          Reset Filters
        </button>
      </div>

      {/* ── Charts Row ── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 mb-5">

        {/* Payout Trend — left 3 cols */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-gray-900">Payout Trend</span>
              <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="text-gray-300"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
            </div>
            <div className="flex rounded-lg overflow-hidden border border-gray-200">
              {["7D","30D","90D"].map(p => (
                <button key={p} onClick={() => setChartPeriod(p)}
                  className={`px-3 py-1.5 text-xs font-semibold transition-colors ${chartPeriod===p?"bg-blue-600 text-white":"bg-white text-gray-800 hover:bg-gray-50"}`}>
                  {p}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2 mb-3 pl-7 pt-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#0665FA]" />
            <span className="text-xs text-gray-800 font-semibold ">Payout Amount (₹)</span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={payoutTrend} margin={{ top:5, right:10, left:0, bottom:0 }}>
              <defs>
                <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#3b82f6" stopOpacity={0.15}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="date" tick={{ fontSize:11, fill:"#30304F",fontWeight: 700, }} axisLine={{ stroke: "#CBD5E1", strokeWidth: 1 }} tickLine={false} />
              <YAxis tickFormatter={yFormat} tick={{ fontSize:11, fill:"#30304F",fontWeight: 700, }} axisLine={false} tickLine={false} width={38} />
              <Tooltip content={<CustomLineTooltip />} />
              <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2.5}
                dot={{ fill:"#3b82f6", r:4, strokeWidth:2, stroke:"#fff" }}
                activeDot={{ r:6, fill:"#3b82f6" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
 
        {/* Success vs Failed Ratio — right 2 cols */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-5">
          <h3 className="text-sm font-bold text-gray-900 mb-4">Success vs Failed Ratio</h3>
          <div className="flex items-center justify-around gap-4">
            <div className="relative">
              <PieChart width={170} height={170}>
                <Pie data={pieData} cx={81} cy={81} innerRadius={55} outerRadius={78}
                  dataKey="value" strokeWidth={2} stroke="#fff" startAngle={90} endAngle={-270}>
                  {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
              </PieChart>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-xl font-bold text-gray-900">12,450</span>
                <span className="text-xs text-gray-500">Total Payouts</span>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              {[
                { label:"Successful", count:"12,250 (98.39%)", color:"#16a34a" },
                { label:"Failed",     count:"150 (1.21%)",     color:"#ef4444" },
                { label:"Pending",    count:"50 (0.40%)",      color:"#f59e0b" },
              ].map(item => (
                <div key={item.label} className="flex items-start gap-2">
                  <div className="w-2.5 h-2.5 rounded-full mt-0.5 shrink-0" style={{ background: item.color }} />
                  <div className="text-xs font-medium text-gray-700">{item.label}</div>
                  <div className="text-[11px] text-gray-500">{item.count}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom Row ── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">

        {/* Transaction Volume — left 3 cols */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-gray-100 p-5">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-bold text-gray-900">Transaction Volume Overview</span>
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="text-gray-300"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
          </div>
          <div className="flex items-center gap-2 mb-3 pl-7 pt-3">
            <div className="w-2.5 h-2.5 rounded-full bg-[#0665FA]" />
            <span className="text-xs font-medium text-gray-800">Transaction Count</span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={volumeData} margin={{ top:5, right:10, left:0, bottom:0 }} barSize={28}>
              <XAxis dataKey="date" tick={{ fontSize:11, fill:"#30304F",fontWeight: 700, }} axisLine={{ stroke: "#CBD5E1", strokeWidth: 1 }}tickLine={false} />
              <YAxis tick={{ fontSize:11, fill:"#30304F",fontWeight: 700, }} axisLine={false} tickLine={false} width={30} />
              <Tooltip content={<CustomBarTooltip />} cursor={{ fill:"#f1f5f9" }} />
              <Bar dataKey="count" fill="#93c5fd" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Quick Stats — right 2 cols */}
        <div className="lg:col-span-2 grid grid-cols-2 gap-4 content-start">
          {/* This Month Payout */}
          <div className="bg-white rounded-2xl border border-gray-100 p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center">
                <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth={1.8}><path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
              </div>
              <span className="text-xs text-gray-800 font-medium">This Month Payout</span>
            </div>
            <div className="text-lg font-bold text-gray-900">₹12.50 Lakh</div>
            <div className="text-xs text-gray-400 mt-0.5">320 Transactions</div>
          </div>

          {/* Pending Requests */}
          <div className="bg-white rounded-2xl border border-gray-100  p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-xl bg-yellow-50 flex items-center justify-center">
                <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth={1.8}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              </div>
              <span className="text-xs text-gray-800 font-medium">Pending Requests</span>
            </div>
            <div className="text-lg font-bold text-gray-900">5</div>
            <div className="text-xs text-amber-500 font-semibold mt-0.5">Requires attention</div>
          </div>

          {/* Failed Transactions */}
          <div className="bg-white rounded-2xl border border-gray-100 p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-xl bg-red-50 flex items-center justify-center">
                <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth={1.8}><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
              </div>
              <span className="text-xs text-gray-800 font-medium">Failed Transactions</span>
            </div>
            <div className="text-lg font-bold text-gray-900">2</div>
            <div className="text-xs text-red-500 font-semibold mt-0.5">This Month</div>
          </div>

          {/* Avg Processing Time */}
          <div className="bg-white rounded-2xl border border-gray-100 p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-xl bg-purple-50 flex items-center justify-center">
                <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth={1.8}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              </div>
              <span className="text-xs text-gray-800 font-medium">Avg. Processing Time</span>
            </div>
            <div className="text-lg font-bold text-gray-900">8 Sec</div>
            <div className="flex items-center gap-1 mt-0.5">
              <span className="text-xs text-gray-400">vs yesterday</span>
              <span className="text-xs text-green-500 font-semibold">↓ 1 Sec</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}