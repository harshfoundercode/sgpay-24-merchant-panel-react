import { useState } from "react";

// ── Toggle ───────────────────────────────────────────────────────────────────
const Toggle = ({ enabled, onChange }) => (
  <button
    onClick={() => onChange(!enabled)}
    className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors duration-200 focus:outline-none ${enabled ? "bg-blue-600" : "bg-gray-300"}`}
  >
    <span className={`inline-block h-3 w-3 transform rounded-full bg-white shadow transition-transform duration-200 ${enabled ? "translate-x-6" : "translate-x-1"}`} />
  </button>
);

// ── Status Badge ─────────────────────────────────────────────────────────────
const Badge = ({ label, color }) => {
  const map = {
    green:  "bg-green-50 text-green-700 border-green-200",
    red:    "bg-red-50 text-red-600 border-red-200",
    orange: "bg-orange-50 text-orange-600 border-orange-200",
  };
  return <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${map[color]}`}>{label}</span>;
};

// ── Header (shared) ──────────────────────────────────────────────────────────
const PageHeader = () => (
  <div className="flex items-start justify-between mb-6 flex-wrap gap-3">
    <div>
      <h1 className="text-[18px] font-bold text-gray-900">Settings</h1>
      <p className="text-xs text-gray-600 font-medium mt-0.5">Manage your account settings and webhook configuration</p>
    </div>
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs text-gray-700 shadow-sm cursor-pointer hover:bg-gray-50">
        <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="text-gray-400"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
        13 May 2025 – 14 May 2025
        <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="text-gray-400"><path d="M19 9l-7 7-7-7"/></svg>
      </div>
      <div className="relative">
        <div className="w-10 h-10 bg-white border border-gray-200 rounded-xl flex items-center justify-center shadow-xs cursor-pointer hover:bg-gray-50">
          <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="text-gray-500"><path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
        </div>
        <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">3</span>
      </div>
      <div className="flex items-center gap-2.5 px-3 py-2 bg-white border border-gray-200 rounded-xl shadow-xs cursor-pointer hover:bg-gray-50">
        <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
          <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth={1.8}><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
        </div>
        <div>
          <div className="text-xs font-bold text-gray-900">Demo Store</div>
          <div className="text-[11px] text-gray-400">MID: M12345678</div>
        </div>
        <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="text-gray-400"><path d="M19 9l-7 7-7-7"/></svg>
      </div>
    </div>
  </div>
);

// ── Change Password Tab ───────────────────────────────────────────────────────
const ChangePasswordTab = () => {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [form, setForm] = useState({ current: "", newPass: "", confirm: "" });

  const EyeBtn = ({ show, toggle }) => (
    <button type="button" onClick={toggle} className="text-gray-400 hover:text-gray-600 transition-colors">
      {show ? (
        <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
      ) : (
        <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
      )}
    </button>
  );

  return (
    <div className="max-w-xl">
      <h2 className="text-base font-bold text-gray-900 mb-1">Change Password</h2>
      <p className="text-sm text-gray-400 mb-6">Update your account password to keep it secure.</p>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
        {[
          { label: "Current Password", key: "current", show: showCurrent, toggle: () => setShowCurrent(v => !v) },
          { label: "New Password",     key: "newPass",  show: showNew,     toggle: () => setShowNew(v => !v) },
          { label: "Confirm New Password", key: "confirm", show: showConfirm, toggle: () => setShowConfirm(v => !v) },
        ].map(f => (
          <div key={f.key}>
            <label className="text-xs font-semibold text-gray-600 mb-1.5 block">{f.label}</label>
            <div className="relative">
              <input
                type={f.show ? "text" : "password"}
                value={form[f.key]}
                onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                placeholder="••••••••••••"
                className="w-full px-4 py-2.5 pr-10 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 placeholder:text-gray-300"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <EyeBtn show={f.show} toggle={f.toggle} />
              </div>
            </div>
          </div>
        ))}
        <div className="pt-2">
          <button className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors shadow-sm">
            Update Password
          </button>
        </div>
      </div>
    </div>
  );
};

// ── Webhook Config Tab ────────────────────────────────────────────────────────
const WebhookTab = () => {
  const [webhookEnabled, setWebhookEnabled] = useState(true);
  const [webhookUrl, setWebhookUrl] = useState("https://yourdomain.com/webhook/bridgepay");
  const [showSecret, setShowSecret] = useState(false);
  const [copied, setCopied] = useState(false);
  const [events, setEvents] = useState({
    "Payout Success":   { checked: true,  desc: "Triggered when a payout is completed successfully" },
    "Payout Failed":    { checked: true,  desc: "Triggered when a payout fails" },
    "Payout Pending":   { checked: true,  desc: "Triggered when a payout is pending" },
    "Payout Cancelled": { checked: true,  desc: "Triggered when a payout is cancelled" },
    "Payout Reversed":  { checked: true,  desc: "Triggered when a payout is reversed" },
  });

  const toggleEvent = (key) => setEvents(prev => ({ ...prev, [key]: { ...prev[key], checked: !prev[key].checked } }));

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const attempts = [
    { date: "14 May 2025, 11:30 AM", status: "Success", code: 200, time: "245 ms" },
    { date: "14 May 2025, 10:15 AM", status: "Success", code: 200, time: "210 ms" },
    { date: "14 May 2025, 09:05 AM", status: "Failed",  code: 500, time: "130 ms" },
    { date: "14 May 2025, 08:00 AM", status: "Success", code: 200, time: "188 ms" },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
      {/* Left */}
      <div className="lg:col-span-3 space-y-5">
        {/* Config card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h2 className="text-sm font-bold text-gray-900 mb-1">Webhook Configuration</h2>
          <p className="text-xs text-gray-400 mb-5">Configure webhook to receive real-time updates for your payout transactions.</p>

          {/* Status toggle */}
          <div className="flex items-center gap-3 mb-5">
            <span className="text-xs font-medium text-gray-700 w-36">Webhook Status</span>
            <Toggle enabled={webhookEnabled} onChange={setWebhookEnabled} />
            <span className="text-xs font-medium text-gray-700">{webhookEnabled ? "Enabled" : "Disabled"}</span>
            {webhookEnabled && <Badge label="Active" color="green" />}
          </div>

          {/* URL */}
          <div className="mb-5">
            <label className="text-xs font-semibold text-gray-700 mb-2 block">Webhook URL</label>
            <input
              value={webhookUrl}
              onChange={e => setWebhookUrl(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 text-gray-700"
            />
            <p className="text-xs text-gray-600 mt-1.5">We will send POST requests to this URL</p>
          </div>

          {/* Events */}
          <div className="mb-5">
            <div className="text-sm font-semibold text-gray-700 mb-1">Select Events</div>
            <p className="text-xs text-gray-400 mb-3">Choose the events you want to receive</p>
            <div className="border border-gray-100 rounded-xl overflow-hidden divide-y divide-gray-50">
              {Object.entries(events).map(([name, { checked, desc }]) => (
                <label key={name} className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors">
                  <div className="mt-0.5 flex-shrink-0">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleEvent(name)}
                      className="sr-only"
                    />
                    <div
                      onClick={() => toggleEvent(name)}
                      className={`w-4.5 h-4.5 w-[18px] h-[18px] rounded flex items-center justify-center transition-colors cursor-pointer ${checked ? "bg-blue-600 border-blue-600" : "border-2 border-gray-300"} border`}
                    >
                      {checked && <svg width={11} height={11} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={3}><path d="M20 6L9 17l-5-5"/></svg>}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-gray-900">{name}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{desc}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <button className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl transition-colors shadow-sm">
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            Update Webhook
          </button>
        </div>

        {/* Secret */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h2 className="text-sm font-bold text-gray-900 mb-1">Webhook Secret (Optional)</h2>
          <p className="text-xs text-gray-400 mb-4">Add a secret key to verify webhook authenticity</p>
          <div className="relative">
            <input
              type={showSecret ? "text" : "password"}
              defaultValue="sk_webhook_demo_secret_key_123456789"
              className="w-full px-4 py-2.5 pr-20 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 text-gray-700 font-mono"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
              <button onClick={() => setShowSecret(v => !v)} className="text-gray-400 hover:text-gray-600 transition-colors">
                {showSecret ? (
                  <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                ) : (
                  <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                )}
              </button>
              <button onClick={() => handleCopy("sk_webhook_demo_secret_key_123456789")} className="text-gray-400 hover:text-gray-600 transition-colors">
                {copied ? (
                  <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth={2}><path d="M20 6L9 17l-5-5"/></svg>
                ) : (
                  <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
                )}
              </button>
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-1.5">Include this secret in your webhook logic to verify requests</p>
        </div>
      </div>

      {/* Right */}
      <div className="lg:col-span-2 space-y-5">
        {/* Webhook Details */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h3 className="text-sm font-bold text-gray-900 mb-4">Webhook Details</h3>
          {[
            { label: "Webhook URL",  value: "https://yourdomain.com/webhook/bridgepay", copy: true, mono: true, truncate: true },
            { label: "Status",       value: null, badge: <Badge label="Active" color="green" /> },
            { label: "Created On",   value: "10 May 2025, 11:20 AM" },
            { label: "Last Updated", value: "13 May 2025, 02:45 PM" },
            { label: "Last Triggered",value:"14 May 2025, 11:30 AM" },
          ].map(row => (
            <div key={row.label} className="flex items-start justify-between py-2.5 border-b border-gray-50 last:border-0 gap-3">
              <span className="text-xs text-gray-500 flex-shrink-0 w-28">{row.label}</span>
              {row.badge ? row.badge : (
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className={`text-xs font-medium text-gray-800 ${row.mono ? "font-mono" : ""} ${row.truncate ? "truncate max-w-[160px]" : ""}`}>
                    {row.value}
                  </span>
                  {row.copy && (
                    <button onClick={() => handleCopy(row.value)} className="text-gray-400 hover:text-blue-600 flex-shrink-0 transition-colors">
                      <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Test Webhook */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h3 className="text-sm font-bold text-gray-900 mb-1">Test Webhook</h3>
          <p className="text-xs text-gray-400 mb-3">Send a test webhook to verify your endpoint is working correctly.</p>
          <div className="flex items-center gap-2.5 bg-blue-50 border border-blue-100 rounded-xl px-3 py-2.5 mb-3">
            <svg width={14} height={14} viewBox="0 0 24 24" fill="currentColor" className="text-blue-500 flex-shrink-0">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
            </svg>
            <p className="text-xs text-blue-700">A sample payload will be sent to your webhook URL.</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors w-full justify-center">
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            Send Test Webhook
          </button>
        </div>

        {/* Recent Attempts */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100">
            <h3 className="text-sm font-bold text-gray-900">Recent Webhook Attempts</h3>
            <button className="text-xs text-blue-600 font-semibold hover:underline">View All</button>
          </div>
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50/70">
                {["Date & Time","Status","Response Code","Response Time"].map(h => (
                  <th key={h} className="px-4 py-2.5 text-left text-[11px] font-semibold text-gray-800 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {attempts.map((a, i) => (
                <tr key={i} className="border-t border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-3 text-xs text-gray-700 font-semibold whitespace-nowrap">{a.date}</td>
                  <td className="px-4 py-3">
                    <Badge label={a.status} color={a.status === "Success" ? "green" : "red"} />
                  </td>
                  <td className="px-4 py-3 text-xs font-mono text-gray-700">{a.code}</td>
                  <td className="px-4 py-3 text-xs text-gray-700">{a.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// ── Test Webhook Tab ──────────────────────────────────────────────────────────
const TestWebhookTab = () => {
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState(null);

  const handleSend = () => {
    setSending(true);
    setResult(null);
    setTimeout(() => {
      setSending(false);
      setResult({ status: 200, time: "238 ms", body: '{"success":true,"message":"Webhook received"}' });
    }, 1500);
  };

  return (
    <div className="max-w-2xl">
      <h2 className="text-base font-bold text-gray-900 mb-1">Test Webhook</h2>
      <p className="text-sm text-gray-400 mb-5">Send a test event to verify your webhook endpoint is working correctly.</p>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
        <div>
          <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Select Event</label>
          <div className="relative">
            <select className="w-full appearance-none pl-3 pr-8 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400">
              <option>Payout Success</option>
              <option>Payout Failed</option>
              <option>Payout Pending</option>
              <option>Payout Cancelled</option>
              <option>Payout Reversed</option>
            </select>
            <svg className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M19 9l-7 7-7-7"/></svg>
          </div>
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Sample Payload</label>
          <pre className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-xs font-mono text-gray-700 overflow-x-auto leading-relaxed">{`{
  "event": "payout.success",
  "payout_id": "BPY1234567890",
  "amount": 25000.00,
  "currency": "INR",
  "status": "success",
  "utr": "ICIC512345678901",
  "timestamp": "2025-05-14T11:30:28Z"
}`}</pre>
        </div>
        <button onClick={handleSend} disabled={sending}
          className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-sm font-semibold rounded-xl transition-colors shadow-sm">
          {sending ? (
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="animate-spin"><path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeOpacity={0.3}/><path d="M21 12a9 9 0 00-9-9"/></svg>
          ) : (
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          )}
          {sending ? "Sending..." : "Send Test Webhook"}
        </button>
        {result && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth={2}><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              <span className="text-sm font-semibold text-green-700">Webhook delivered successfully</span>
            </div>
            <div className="flex gap-4 text-xs text-green-600 mb-2">
              <span>Status: <strong>{result.status}</strong></span>
              <span>Response Time: <strong>{result.time}</strong></span>
            </div>
            <pre className="bg-white border border-green-100 rounded-lg p-2 text-xs font-mono text-gray-700">{result.body}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

// ── Main Settings ─────────────────────────────────────────────────────────────
export default function MerchantSettings() {
  const [activeTab, setActiveTab] = useState("webhook");
  const tabs = [
    { id: "password", label: "Change Password" },
    { id: "webhook",  label: "Webhook Configuration" },
    { id: "test",     label: "Test Webhook" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-5">
      <PageHeader />

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-sm font-semibold border-b-2 transition-colors -mb-px whitespace-nowrap ${
              activeTab === tab.id
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "password" && <ChangePasswordTab />}
      {activeTab === "webhook"  && <WebhookTab />}
      {activeTab === "test"     && <TestWebhookTab />}
    </div>
  );
}