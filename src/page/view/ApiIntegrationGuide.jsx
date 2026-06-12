import { useState, useRef } from "react";
import {
  Copy, Download, FileText, CheckCircle, RefreshCw,
  Lock, Send, Search, Webhook, AlertTriangle, Code2,
  ChevronDown, ChevronRight, Bell, Store, Calendar,
  Package, Activity, ArrowRight, Home, ShieldCheck,
  Layers, BookOpen, Wrench, BarChart2, ExternalLink,
  ToggleLeft,
} from "lucide-react";
import DateRangePicker from "../../components/DatePicker";
// ─── CONSTANTS ────────────────────────────────────────────────────────────────

const API_BASE_URL = "https://api.bridgepay.com";
const MERCHANT_ID  = "MID123456";



const TOOLS = [
  { label: "Postman Collection", sub: "Download collection",       bg: "bg-orange-100",  icon: Package,       iconColor: "text-orange-600" },
  { label: "Webhook Tester",     sub: "Test your webhook endpoint", bg: "bg-purple-100",  icon: Webhook,       iconColor: "text-purple-600" },
  { label: "API Changelog",      sub: "See recent updates",         bg: "bg-blue-100",    icon: FileText,      iconColor: "text-blue-600" },
  { label: "Rate Limits",        sub: "View API rate limits",       bg: "bg-green-100",   icon: BarChart2,     iconColor: "text-green-600" },
  { label: "Error Code Reference",sub:"View all error codes",       bg: "bg-red-100",     icon: AlertTriangle, iconColor: "text-red-600" },
];

const API_SECTIONS = [
  {
    n: 1,
    title:    "Authentication",
    sub:      "Generate access token using your API Key to authorize all API requests.",
    method:   "POST",
    endpoint: "/api/auth/token",
    reqLabel: "Request (JSON)",
    resLabel: "Response (JSON)",
    req: [
      { n: 1, parts: [{ t: "p", v: "{" }] },
      { n: 2, parts: [{ t: "k", v: '  "merchant_id"' }, { t: "p", v: ": " }, { t: "s", v: '"MID123456"' }, { t: "p", v: "," }] },
      { n: 3, parts: [{ t: "k", v: '  "api_key"' },     { t: "p", v: ": " }, { t: "s", v: '"sk_live****************"' }] },
      { n: 4, parts: [{ t: "p", v: "}" }] },
    ],
    res: [
      { n: 1, parts: [{ t: "p", v: "{" }] },
      { n: 2, parts: [{ t: "k", v: '  "status"' }, { t: "p", v: ": " }, { t: "b", v: "true" }, { t: "p", v: "," }] },
      { n: 3, parts: [{ t: "k", v: '  "token"' }, { t: "p", v: ": " }, { t: "s", v: '"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."' }] },
      { n: 4, parts: [{ t: "p", v: "}" }] },
    ],
  },
  {
    n: 2,
    title:    "Create Payout",
    sub:      "Create a new payout request to transfer money to beneficiary account.",
    method:   "POST",
    endpoint: "/api/payout/create",
    reqLabel: "Request (JSON)",
    resLabel: "Success Response (JSON)",
    req: [
      { n: 1, parts: [{ t: "p", v: "{" }] },
      { n: 2, parts: [{ t: "k", v: '  "amount"' },         { t: "p", v: ": " }, { t: "n", v: "1000" },                           { t: "p", v: "," }] },
      { n: 3, parts: [{ t: "k", v: '  "order_id"' },       { t: "p", v: ": " }, { t: "s", v: '"ORD123"' },                        { t: "p", v: "," }] },
      { n: 4, parts: [{ t: "k", v: '  "name"' },           { t: "p", v: ": " }, { t: "s", v: '"Harsh Singh"' },                   { t: "p", v: "," }] },
      { n: 5, parts: [{ t: "k", v: '  "account_number"' }, { t: "p", v: ": " }, { t: "s", v: '"1234567890"' },                    { t: "p", v: "," }] },
      { n: 6, parts: [{ t: "k", v: '  "ifsc"' },           { t: "p", v: ": " }, { t: "s", v: '"SBIN0001234"' },                   { t: "p", v: "," }] },
      { n: 7, parts: [{ t: "k", v: '  "remarks"' },        { t: "p", v: ": " }, { t: "s", v: '"Payout for order ORD123"' }] },
      { n: 8, parts: [{ t: "p", v: "}" }] },
    ],
    res: [
      { n: 1, parts: [{ t: "p", v: "{" }] },
      { n: 2, parts: [{ t: "k", v: '  "status"' },         { t: "p", v: ": " }, { t: "b", v: "true" },                            { t: "p", v: "," }] },
      { n: 3, parts: [{ t: "k", v: '  "message"' },        { t: "p", v: ": " }, { t: "s", v: '"Payout Initiated"' },              { t: "p", v: "," }] },
      { n: 4, parts: [{ t: "k", v: '  "transaction_id"' }, { t: "p", v: ": " }, { t: "s", v: '"TXN123456789"' }] },
      { n: 5, parts: [{ t: "p", v: "}" }] },
    ],
  },
  {
    n: 3,
    title:    "Check Status",
    sub:      "Check the status of your payout using transaction ID.",
    method:   "POST",
    endpoint: "/api/payout/status",
    reqLabel: "Request (JSON)",
    resLabel: "Response (JSON)",
    req: [
      { n: 1, parts: [{ t: "p", v: "{" }] },
      { n: 2, parts: [{ t: "k", v: '  "transaction_id"' }, { t: "p", v: ": " }, { t: "s", v: '"TXN123456789"' }] },
      { n: 3, parts: [{ t: "p", v: "}" }] },
    ],
    res: [
      { n: 1, parts: [{ t: "p", v: "{" }] },
      { n: 2, parts: [{ t: "k", v: '  "status"' },       { t: "p", v: ": " }, { t: "s", v: '"SUCCESS"' },               { t: "p", v: "," }] },
      { n: 3, parts: [{ t: "k", v: '  "utr"' },          { t: "p", v: ": " }, { t: "s", v: '"UTR1234567890"' },          { t: "p", v: "," }] },
      { n: 4, parts: [{ t: "k", v: '  "completed_at"' }, { t: "p", v: ": " }, { t: "s", v: '"2025-05-14 11:20:30"' }] },
      { n: 5, parts: [{ t: "p", v: "}" }] },
    ],
  },
];

// ─── TOKEN COLORS ─────────────────────────────────────────────────────────────

const TOKEN_CLASS = {
  k: "text-blue-300",     // key
  s: "text-amber-300",    // string value
  n: "text-green-300",    // number
  b: "text-purple-300",   // boolean
  p: "text-gray-400",     // punctuation / plain
};

// ─── HELPER COMPONENTS ────────────────────────────────────────────────────────

function CopyButton({ text, className = "" }) {
  const [copied, setCopied] = useState(false);
  const handle = () => {
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <button
      onClick={handle}
      title="Copy"
      className={`flex items-center justify-center transition-colors ${className}`}
    >
      {copied
        ? <CheckCircle size={13} className="text-green-400" />
        : <Copy size={13} className="text-gray-400 hover:text-gray-200" />
      }
    </button>
  );
}

function MethodBadge({ method }) {
  return (
    <span className="bg-blue-100 text-blue-700 text-[11px] font-bold px-2 py-0.5 rounded">
      {method}
    </span>
  );
}

function CodeLine({ line }) {
  return (
    <div className="leading-[1.65]">
      {line.parts.map((part, i) => (
        <span key={i} className={`font-mono text-[11.5px] ${TOKEN_CLASS[part.t]}`}>
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
      <div className="flex items-center justify-between px-3 py-2 bg-gray-50 border-b border-gray-200">
        <span className="text-[12px] font-semibold text-gray-600">{label}</span>
        <button
          onClick={() => navigator.clipboard?.writeText(raw)}
          className="text-gray-400 hover:text-gray-600 transition-colors"
          title="Copy"
        >
          <Copy size={13} />
        </button>
      </div>
      {/* body */}
      <div className="bg-[#0f1117] px-3 py-3 overflow-x-auto">
        <div className="flex gap-3">
          {/* line numbers */}
          <div className="select-none text-right flex-shrink-0">
            {lines.map(l => (
              <div key={l.n} className="text-[11px] leading-[1.65] text-gray-600">{l.n}</div>
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
  const epText = section.endpoint;
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
      {/* row: title + endpoint */}
      <div className="flex items-start justify-between gap-4 mb-1">
        <div>
          <h3 className="text-[15px] font-bold text-gray-900">
            {section.n}. {section.title}
          </h3>
          <p className="text-[12px] text-gray-400 mt-0.5">{section.sub}</p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <MethodBadge method={section.method} />
          <span className="text-[12px] font-mono text-gray-600 bg-gray-100 px-2 py-0.5 rounded">
            {section.endpoint}
          </span>
          <button
            onClick={() => navigator.clipboard?.writeText(epText)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            title="Copy endpoint"
          >
            <Copy size={13} />
          </button>
        </div>
      </div>

      {/* code panels */}
      <div className="flex gap-3 mt-4">
        <CodePanel label={section.reqLabel} lines={section.req} />
        <CodePanel label={section.resLabel} lines={section.res} />
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

export default function ApiIntegrationGuide() {
  const [activeLeftNav, setActiveLeftNav] = useState("intro");
  const [urlCopied,     setUrlCopied]     = useState(false);
  const [midCopied,     setMidCopied]     = useState(false);

  const handleCopyUrl = () => {
    navigator.clipboard?.writeText(API_BASE_URL);
    setUrlCopied(true);
    setTimeout(() => setUrlCopied(false), 1500);
  };

  const handleCopyMid = () => {
    navigator.clipboard?.writeText(MERCHANT_ID);
    setMidCopied(true);
    setTimeout(() => setMidCopied(false), 1500);
  };

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
    <div className="flex h-screen overflow-hidden bg-gray-50 font-sans text-sm">

   
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* ── TOP HEADER ── */}
        <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between flex-shrink-0">
          <div>
            <h1 className="text-xl font-bold text-gray-900">API Integration Guide</h1>
            <p className="text-xs text-gray-400 mt-0.5">
              Integrate once, pay out anytime. Powerful APIs for your business.
            </p>
          </div>
          <div className="flex items-center gap-3">
            {/* date range */}
           <DateRangePicker 
                        onDateChange={handleDateChange}
                        placeholder="14 May, 2025 - 14 May, 2025"
                    />

           
            {/* merchant dropdown */}
            <button className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 hover:bg-gray-50 transition-colors">
              <div className="w-6 h-6 bg-blue-600 rounded-md flex items-center justify-center flex-shrink-0">
                <Store size={13} className="text-white" />
              </div>
              <div className="text-left">
                <p className="text-[12px] font-semibold text-gray-800 leading-tight">Demo Store</p>
                <p className="text-[10px] text-gray-400 leading-tight">MID: MID123456</p>
              </div>
              <ChevronDown size={12} className="text-gray-400" />
            </button>
          </div>
        </header>

        {/* ── SCROLLABLE CONTENT ── */}
        <div className="flex-1 overflow-hidden flex">

          {/* Centre scroll area */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">

            {/* ── API OVERVIEW CARD ── */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
              <h2 className="text-[15px] font-bold text-gray-900 mb-0.5">API Overview</h2>
              <p className="text-[12px] text-gray-400 mb-4">
                Use the below details to make API requests to Bridge Pay.
              </p>

              {/* 4-column info grid */}
              <div className="grid grid-cols-4 border border-gray-200 rounded-xl overflow-hidden mb-4">
                {[
                  {
                    label: "Merchant ID",
                    content: (
                      <div className="flex items-center gap-1.5 text-[13px] font-semibold text-gray-900">
                        {MERCHANT_ID}
                        <button onClick={handleCopyMid} className="text-gray-300 hover:text-gray-500 transition-colors" title="Copy">
                          {midCopied
                            ? <CheckCircle size={12} className="text-green-500" />
                            : <Copy size={12} />}
                        </button>
                      </div>
                    ),
                  },
                  {
                    label: "Environment",
                    content: (
                      <span className="bg-green-100 text-green-700 text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
                        Production
                      </span>
                    ),
                  },
                  {
                    label: "Base URL",
                    content: (
                      <div className="flex items-center gap-1.5 text-[12px] font-semibold text-gray-900">
                        {API_BASE_URL}
                        <button onClick={handleCopyUrl} className="text-gray-300 hover:text-gray-500 transition-colors" title="Copy">
                          {urlCopied
                            ? <CheckCircle size={12} className="text-green-500" />
                            : <Copy size={12} />}
                        </button>
                      </div>
                    ),
                  },
                  {
                    label: "API Version",
                    content: <span className="text-[13px] font-semibold text-gray-900">v1</span>,
                  },
                ].map(({ label, content }, i) => (
                  <div
                    key={label}
                    className={`px-4 py-3 ${i < 3 ? "border-r border-gray-200" : ""}`}
                  >
                    <p className="text-[11px] text-gray-400 font-medium mb-1.5">{label}</p>
                    {content}
                  </div>
                ))}
              </div>

              
            </div>

            {/* ── API SECTIONS (1,2,3) ── */}
            {API_SECTIONS.map(section => (
              <ApiSection key={section.n} section={section} />
            ))}

           
          </div>

          {/* ── RIGHT PANEL ── */}
          <aside className="w-[245px] flex-shrink-0 overflow-y-auto bg-white border-l border-gray-200 p-4 space-y-4">

            {/* API Status */}
            <div className="border border-gray-200 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[13px] font-bold text-gray-800">API Status</p>
                <span className="flex items-center gap-1 text-[11px] font-semibold text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full">
                  <CheckCircle size={10} /> Active
                </span>
              </div>
              <div className="space-y-0">
                {[
                  ["Success Rate (Today)",          "99.20%"],
                  ["Today's API Hits",              "12,540"],
                  ["Total API Hits (This Month)",   "3,45,670"],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                    <span className="text-[11px] text-gray-400 leading-tight">{label}</span>
                    <span className="text-[12px] font-bold text-gray-800">{value}</span>
                  </div>
                ))}
                <div className="flex justify-between items-center pt-2">
                  <span className="text-[11px] text-gray-400">Last Updated</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] text-gray-700">2 min ago</span>
                    <RefreshCw size={11} className="text-blue-500 cursor-pointer hover:text-blue-700 transition-colors" />
                  </div>
                </div>
              </div>
            </div>

           

            {/* Need Custom Integration */}
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
              <p className="text-[13px] font-bold text-blue-800 mb-1.5">Need Custom Integration?</p>
              <p className="text-[11px] text-blue-600 leading-relaxed mb-3">
                Our team can help you with custom integration and faster go-live.
              </p>
              <button className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-3 py-2 text-[12px] font-semibold transition-colors">
                Contact Integration Team <ArrowRight size={13} />
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}