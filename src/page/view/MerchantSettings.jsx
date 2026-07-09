import { useState, useEffect } from "react";
import merchantSettingsService from "../../services/SettingServices";

// ── Toggle ───────────────────────────────────────────────────────────────────
const Toggle = ({ enabled, onChange }) => (
  <button
    onClick={() => onChange(!enabled)}
    className={`relative inline-flex h-4 w-8 sm:h-5 sm:w-10 items-center rounded-full transition-colors duration-200 focus:outline-none ${enabled ? "bg-blue-600" : "bg-gray-300"}`}
  >
    <span className={`inline-block h-2.5 w-2.5 sm:h-3 sm:w-3 transform rounded-full bg-white shadow transition-transform duration-200 ${enabled ? "translate-x-4 sm:translate-x-6" : "translate-x-0.5 sm:translate-x-1"}`} />
  </button>
);

// ── Status Badge ─────────────────────────────────────────────────────────────
const Badge = ({ label, color }) => {
  const map = {
    green:  "bg-green-50 text-green-700 border-green-200",
    red:    "bg-red-50 text-red-600 border-red-200",
    orange: "bg-orange-50 text-orange-600 border-orange-200",
  };
  return <span className={`px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold border whitespace-nowrap ${map[color]}`}>{label}</span>;
};

// ── Header (shared) ──────────────────────────────────────────────────────────
const PageHeader = () => (
  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-5 sm:mb-6 gap-3">
    <div>
      <h1 className="text-base sm:text-[18px] font-bold text-gray-900">Settings</h1>
      <p className="text-[10px] sm:text-xs text-gray-600 font-medium mt-0.5">Manage your account settings and webhook configuration</p>
    </div>
    <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
      
    </div>
  </div>
);

// ── Change Password Tab ───────────────────────────────────────────────────────
const ChangePasswordTab = () => {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [form, setForm] = useState({ current: "", newPass: "", confirm: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [toast, setToast] = useState(null);

  const showToast = (message, isError = false) => {
    setToast({ message, isError });
    setTimeout(() => setToast(null), 3000);
  };

  const EyeBtn = ({ show, toggle }) => (
    <button type="button" onClick={toggle} className="text-gray-400 hover:text-gray-600 transition-colors">
      {show ? (
        <svg width={14} sm:width={16} height={14} sm:height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/>
          <line x1="1" y1="1" x2="23" y2="23"/>
        </svg>
      ) : (
        <svg width={14} sm:width={16} height={14} sm:height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
          <circle cx="12" cy="12" r="3"/>
        </svg>
      )}
    </button>
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!form.current) { showToast("Please enter your current password", true); return; }
    if (!form.newPass) { showToast("Please enter a new password", true); return; }
    if (form.newPass.length < 6) { showToast("New password must be at least 6 characters", true); return; }
    if (!form.confirm) { showToast("Please confirm your new password", true); return; }
    if (form.newPass !== form.confirm) { showToast("Passwords do not match", true); return; }
    if (form.current === form.newPass) { showToast("New password must be different from current password", true); return; }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await merchantSettingsService.changePassword(form.current, form.newPass);
      showToast("Password changed successfully!", false);
      setSuccess("Password updated successfully");
      setForm({ current: "", newPass: "", confirm: "" });
    } catch (err) {
      console.error("Change password error:", err);
      let errorMessage = "Failed to change password. Please try again.";
      if (err.response?.status === 401) {
        errorMessage = "Current password is incorrect. Please try again.";
      } else if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      }
      showToast(errorMessage, true);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-full sm:max-w-xl">
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

      <h2 className="text-sm sm:text-base font-bold text-gray-900 mb-1">Change Password</h2>
      <p className="text-xs sm:text-sm text-gray-400 mb-4 sm:mb-6">Update your account password to keep it secure.</p>
      <form onSubmit={handleSubmit}>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-6 space-y-3 sm:space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-xs sm:text-sm">{error}</div>
          )}
          {success && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-xl text-green-600 text-xs sm:text-sm">{success}</div>
          )}
          
          <div>
            <label className="text-[11px] sm:text-xs font-semibold text-gray-600 mb-1 block">Current Password</label>
            <div className="relative">
              <input
                type={showCurrent ? "text" : "password"}
                value={form.current}
                onChange={e => setForm(p => ({ ...p, current: e.target.value }))}
                placeholder="••••••••••••"
                disabled={loading}
                className="w-full px-3 sm:px-4 py-2 sm:py-2.5 pr-8 sm:pr-10 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 placeholder:text-gray-300 disabled:opacity-60"
              />
              <div className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2">
                <EyeBtn show={showCurrent} toggle={() => setShowCurrent(v => !v)} />
              </div>
            </div>
          </div>

          <div>
            <label className="text-[11px] sm:text-xs font-semibold text-gray-600 mb-1 block">New Password</label>
            <div className="relative">
              <input
                type={showNew ? "text" : "password"}
                value={form.newPass}
                onChange={e => setForm(p => ({ ...p, newPass: e.target.value }))}
                placeholder="••••••••••••"
                disabled={loading}
                className="w-full px-3 sm:px-4 py-2 sm:py-2.5 pr-8 sm:pr-10 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 placeholder:text-gray-300 disabled:opacity-60"
              />
              <div className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2">
                <EyeBtn show={showNew} toggle={() => setShowNew(v => !v)} />
              </div>
            </div>
          </div>

          <div>
            <label className="text-[11px] sm:text-xs font-semibold text-gray-600 mb-1 block">Confirm New Password</label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                value={form.confirm}
                onChange={e => setForm(p => ({ ...p, confirm: e.target.value }))}
                placeholder="••••••••••••"
                disabled={loading}
                className="w-full px-3 sm:px-4 py-2 sm:py-2.5 pr-8 sm:pr-10 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 placeholder:text-gray-300 disabled:opacity-60"
              />
              <div className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2">
                <EyeBtn show={showConfirm} toggle={() => setShowConfirm(v => !v)} />
              </div>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-xs sm:text-sm font-semibold rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Updating...
                </>
              ) : (
                "Update Password"
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

// ── Webhook Config Tab ────────────────────────────────────────────────────────
const WebhookTab = () => {
  const [webhookEnabled, setWebhookEnabled] = useState(true);
  const [webhookUrl, setWebhookUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [showSecret, setShowSecret] = useState(false);
  const [copied, setCopied] = useState(false);
  const [events, setEvents] = useState({
    "Payout Success":   { checked: true,  desc: "Triggered when a payout is completed successfully" },
    "Payout Failed":    { checked: true,  desc: "Triggered when a payout fails" },
    "Payout Pending":   { checked: true,  desc: "Triggered when a payout is pending" },
    "Payout Cancelled": { checked: true,  desc: "Triggered when a payout is cancelled" },
    "Payout Reversed":  { checked: true,  desc: "Triggered when a payout is reversed" },
  });
  const [initialLoading, setInitialLoading] = useState(true);

  const showToast = (message, isError = false) => {
    setToast({ message, isError });
    setTimeout(() => setToast(null), 3000);
  };

  // ─── Fetch Webhook Data ──────────────────────────────────────────────────
  useEffect(() => {
    const fetchWebhookData = async () => {
      try {
        const response = await merchantSettingsService.getWebhookUrl();
        console.log("Webhook Data:", response);
        if (response) {
          setWebhookUrl(response.webhook_url || "");
          setWebhookEnabled(response.webhook_enabled === 1 || response.webhook_enabled === true);
        }
      } catch (err) {
        console.error("Error fetching webhook data:", err);
        showToast("Failed to load webhook configuration", true);
      } finally {
        setInitialLoading(false);
      }
    };
    fetchWebhookData();
  }, []);

  // ─── Handle Webhook URL Update ──────────────────────────────────────────
  const handleUpdateWebhook = async () => {
    if (!webhookUrl) {
      showToast("Please enter a webhook URL", true);
      return;
    }
    try { new URL(webhookUrl); } catch {
      showToast("Please enter a valid URL", true);
      return;
    }

    setLoading(true);
    try {
      await merchantSettingsService.updateWebhookUrl(webhookUrl);
      showToast("Webhook URL updated successfully!", false);
    } catch (err) {
      console.error("Error updating webhook:", err);
      showToast(err.response?.data?.message || "Failed to update webhook URL", true);
    } finally {
      setLoading(false);
    }
  };

  // ─── Handle Webhook Toggle ──────────────────────────────────────────────
  const handleToggleWebhook = async (enabled) => {
    setLoading(true);
    try {
      await merchantSettingsService.toggleWebhook(enabled ? 1 : 0);
      setWebhookEnabled(enabled);
      showToast(`Webhook ${enabled ? 'enabled' : 'disabled'} successfully!`, false);
    } catch (err) {
      console.error("Error toggling webhook:", err);
      showToast(err.response?.data?.message || "Failed to toggle webhook", true);
      setWebhookEnabled(!enabled);
    } finally {
      setLoading(false);
    }
  };

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

  if (initialLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-4 sm:gap-5">
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

      {/* Left */}
      <div className="flex-1 lg:flex-3 space-y-4 sm:space-y-5">
        {/* Config card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5">
          <h2 className="text-xs sm:text-sm font-bold text-gray-900 mb-1">Webhook Configuration</h2>
          <p className="text-[10px] sm:text-xs text-gray-400 mb-4 sm:mb-5">Configure webhook to receive real-time updates for your payout transactions.</p>

          {/* Status toggle */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-4 sm:mb-5">
            <span className="text-[11px] sm:text-xs font-medium text-gray-700 w-full sm:w-36">Webhook Status</span>
            <div className="flex items-center gap-2">
              <Toggle enabled={webhookEnabled} onChange={handleToggleWebhook} />
              <span className="text-[11px] sm:text-xs font-medium text-gray-700">{webhookEnabled ? "Enabled" : "Disabled"}</span>
              {webhookEnabled && <Badge label="Active" color="green" />}
            </div>
          </div>

          {/* URL */}
          <div className="mb-4 sm:mb-5">
            <label className="text-[11px] sm:text-xs font-semibold text-gray-700 mb-1.5 sm:mb-2 block">Webhook URL</label>
            <input
              value={webhookUrl}
              onChange={e => setWebhookUrl(e.target.value)}
              disabled={loading}
              className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-200 rounded-xl text-[11px] sm:text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 text-gray-700 disabled:opacity-60"
              placeholder="https://yourdomain.com/webhook"
            />
            <p className="text-[10px] sm:text-xs text-gray-600 mt-1.5">We will send POST requests to this URL</p>
          </div>

          {/* Events */}
          <div className="mb-4 sm:mb-5">
            <div className="text-xs sm:text-sm font-semibold text-gray-700 mb-1">Select Events</div>
            <p className="text-[10px] sm:text-xs text-gray-400 mb-2 sm:mb-3">Choose the events you want to receive</p>
            <div className="border border-gray-100 rounded-xl overflow-hidden divide-y divide-gray-50">
              {Object.entries(events).map(([name, { checked, desc }]) => (
                <label key={name} className="flex items-start gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 hover:bg-gray-50 cursor-pointer transition-colors">
                  <div className="mt-0.5 shrink-0">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleEvent(name)}
                      className="sr-only"
                    />
                    <div
                      onClick={() => toggleEvent(name)}
                      className={`w-4 h-4 rounded flex items-center justify-center transition-colors cursor-pointer ${checked ? "bg-blue-600 border-blue-600" : "border-2 border-gray-300"} border`}
                    >
                      {checked && <svg width={9} height={9} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={3}><path d="M20 6L9 17l-5-5"/></svg>}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[11px] sm:text-xs font-semibold text-gray-900">{name}</div>
                    <div className="text-[10px] sm:text-xs text-gray-400 mt-0.5">{desc}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <button
            onClick={handleUpdateWebhook}
            disabled={loading}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-[11px] sm:text-xs font-semibold rounded-xl transition-colors shadow-sm"
          >
            {loading ? (
              <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <>
                <svg width={12} sm:width={14} height={12} sm:height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                Update Webhook
              </>
            )}
          </button>
        </div>

        {/* Secret */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5">
          <h2 className="text-xs sm:text-sm font-bold text-gray-900 mb-1">Webhook Secret (Optional)</h2>
          <p className="text-[10px] sm:text-xs text-gray-400 mb-3 sm:mb-4">Add a secret key to verify webhook authenticity</p>
          <div className="relative">
            <input
              type={showSecret ? "text" : "password"}
              defaultValue="sk_webhook_demo_secret_key_123456789"
              className="w-full px-3 sm:px-4 py-2 sm:py-2.5 pr-16 sm:pr-20 border border-gray-200 rounded-xl text-[10px] sm:text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 text-gray-700 font-mono"
            />
            <div className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 sm:gap-2">
              <button onClick={() => setShowSecret(v => !v)} className="text-gray-400 hover:text-gray-600 transition-colors">
                {showSecret ? (
                  <svg width={13} sm:width={16} height={13} sm:height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                ) : (
                  <svg width={13} sm:width={16} height={13} sm:height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                )}
              </button>
              <button onClick={() => handleCopy("sk_webhook_demo_secret_key_123456789")} className="text-gray-400 hover:text-gray-600 transition-colors">
                {copied ? (
                  <svg width={13} sm:width={16} height={13} sm:height={16} viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth={2}>
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                ) : (
                  <svg width={13} sm:width={16} height={13} sm:height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                  </svg>
                )}
              </button>
            </div>
          </div>
          <p className="text-[10px] sm:text-xs text-gray-400 mt-1.5">Include this secret in your webhook logic to verify requests</p>
        </div>
      </div>

      {/* Right */}
      <div className="flex-1 lg:flex-2 space-y-4 sm:space-y-5">
        {/* Webhook Details */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5">
          <h3 className="text-xs sm:text-sm font-bold text-gray-900 mb-3 sm:mb-4">Webhook Details</h3>
          {[
            { label: "Webhook URL",  value: webhookUrl || "Not configured", copy: true, mono: true, truncate: true },
            { label: "Status",       value: null, badge: webhookEnabled ? <Badge label="Active" color="green" /> : <Badge label="Disabled" color="red" /> },
            { label: "Created On",   value: "10 May 2025, 11:20 AM" },
            { label: "Last Updated", value: "13 May 2025, 02:45 PM" },
            { label: "Last Triggered",value:"14 May 2025, 11:30 AM" },
          ].map(row => (
            <div key={row.label} className="flex flex-col sm:flex-row sm:items-start justify-between py-2 sm:py-2.5 border-b border-gray-50 last:border-0 gap-2 sm:gap-3">
              <span className="text-[11px] sm:text-xs text-gray-500 shrink-0 sm:w-28">{row.label}</span>
              {row.badge ? row.badge : (
                <div className="flex items-center gap-1.5 min-w-0 flex-1">
                  <span className={`text-[11px] sm:text-xs font-medium text-gray-800 ${row.mono ? "font-mono" : ""} ${row.truncate ? "truncate" : ""} break-all`}>
                    {row.value}
                  </span>
                  {row.copy && (
                    <button onClick={() => handleCopy(row.value)} className="text-gray-400 hover:text-blue-600 shrink-0 transition-colors">
                      <svg width={11} sm:width={13} height={11} sm:height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                        <path d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                      </svg>
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Test Webhook */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5">
          <h3 className="text-xs sm:text-sm font-bold text-gray-900 mb-1">Test Webhook</h3>
          <p className="text-[10px] sm:text-xs text-gray-400 mb-3">Send a test webhook to verify your endpoint is working correctly.</p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-2.5 bg-blue-50 border border-blue-100 rounded-xl px-3 sm:px-3 py-2 sm:py-2.5 mb-3">
            <svg width={12} sm:width={14} height={12} sm:height={14} viewBox="0 0 24 24" fill="currentColor" className="text-blue-500 shrink-0">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
            </svg>
            <p className="text-[10px] sm:text-xs text-blue-700">A sample payload will be sent to your webhook URL.</p>
          </div>
          <button className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-200 rounded-xl text-[11px] sm:text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors w-full">
            <svg width={12} sm:width={14} height={12} sm:height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <line x1="22" y1="2" x2="11" y2="13"/>
              <polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
            Send Test Webhook
          </button>
        </div>

        {/* Recent Attempts */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 px-4 sm:px-5 py-3 sm:py-3.5 border-b border-gray-100">
            <h3 className="text-xs sm:text-sm font-bold text-gray-900">Recent Webhook Attempts</h3>
            <button className="text-[11px] sm:text-xs text-blue-600 font-semibold hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-125">
              <thead>
                <tr className="bg-gray-50/70">
                  {["Date & Time","Status","Response Code","Response Time"].map(h => (
                    <th key={h} className="px-3 sm:px-4 py-2 sm:py-2.5 text-left text-[10px] sm:text-[11px] font-semibold text-gray-800 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {attempts.map((a, i) => (
                  <tr key={i} className="border-t border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="px-3 sm:px-4 py-2.5 sm:py-3 text-[10px] sm:text-xs text-gray-700 font-semibold whitespace-nowrap">{a.date}</td>
                    <td className="px-3 sm:px-4 py-2.5 sm:py-3">
                      <Badge label={a.status} color={a.status === "Success" ? "green" : "red"} />
                    </td>
                    <td className="px-3 sm:px-4 py-2.5 sm:py-3 text-[10px] sm:text-xs font-mono text-gray-700">{a.code}</td>
                    <td className="px-3 sm:px-4 py-2.5 sm:py-3 text-[10px] sm:text-xs text-gray-700">{a.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
    <div className="max-w-full sm:max-w-2xl">
      <h2 className="text-sm sm:text-base font-bold text-gray-900 mb-1">Test Webhook</h2>
      <p className="text-xs sm:text-sm text-gray-400 mb-4 sm:mb-5">Send a test event to verify your webhook endpoint is working correctly.</p>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5 space-y-3 sm:space-y-4">
        <div>
          <label className="text-[11px] sm:text-xs font-semibold text-gray-600 mb-1 block">Select Event</label>
          <div className="relative">
            <select className="w-full appearance-none pl-2.5 sm:pl-3 pr-7 sm:pr-8 py-2 sm:py-2.5 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400">
              <option>Payout Success</option>
              <option>Payout Failed</option>
              <option>Payout Pending</option>
              <option>Payout Cancelled</option>
              <option>Payout Reversed</option>
            </select>
            <svg className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" width={11} sm:width={12} height={11} sm:height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M19 9l-7 7-7-7"/>
            </svg>
          </div>
        </div>
        <div>
          <label className="text-[11px] sm:text-xs font-semibold text-gray-600 mb-1 block">Sample Payload</label>
          <pre className="bg-gray-50 border border-gray-100 rounded-xl p-3 sm:p-4 text-[10px] sm:text-xs font-mono text-gray-700 overflow-x-auto leading-relaxed">{`{
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
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-xs sm:text-sm font-semibold rounded-xl transition-colors shadow-sm">
          {sending ? (
            <svg width={12} sm:width={14} height={12} sm:height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="animate-spin">
              <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeOpacity={0.3}/>
              <path d="M21 12a9 9 0 00-9-9"/>
            </svg>
          ) : (
            <svg width={12} sm:width={14} height={12} sm:height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <line x1="22" y1="2" x2="11" y2="13"/>
              <polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          )}
          {sending ? "Sending..." : "Send Test Webhook"}
        </button>
        {result && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-3 sm:p-4">
            <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
              <svg width={13} sm:width={16} height={13} sm:height={16} viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth={2}>
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span className="text-xs sm:text-sm font-semibold text-green-700">Webhook delivered successfully</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-1 sm:gap-4 text-[10px] sm:text-xs text-green-600 mb-1.5 sm:mb-2">
              <span>Status: <strong>{result.status}</strong></span>
              <span>Response Time: <strong>{result.time}</strong></span>
            </div>
            <pre className="bg-white border border-green-100 rounded-lg p-2 text-[10px] sm:text-xs font-mono text-gray-700 overflow-x-auto">{result.body}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

// ── Main Settings ─────────────────────────────────────────────────────────────
export default function MerchantSettings() {
  const [activeTab, setActiveTab] = useState("password");
  const tabs = [
    { id: "password", label: "Change Password" },
    { id: "webhook",  label: "Webhook Configuration" },
    { id: "test",     label: "Test Webhook" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-5">
      <PageHeader />

      {/* Tabs - responsive horizontal scroll on mobile */}
      <div className="overflow-x-auto -mx-3 sm:mx-0 px-3 sm:px-0">
        <div className="flex border-b border-gray-200 mb-5 sm:mb-6 min-w-max sm:min-w-0">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-sm font-semibold border-b-2 transition-colors -mb-px whitespace-nowrap ${
                activeTab === tab.id
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {activeTab === "password" && <ChangePasswordTab />}
      {activeTab === "webhook"  && <WebhookTab />}
      {activeTab === "test"     && <TestWebhookTab />}
    </div>
  );
}