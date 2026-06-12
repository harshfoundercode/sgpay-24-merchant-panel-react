import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    House, CreditCard, Store, Zap, GitBranch, RefreshCw,
    Scale, FileText, GitMerge, Webhook, Bell, Users, FileCode,
    Settings, Monitor, ChevronDown, ChevronRight, Search, Moon, Menu,
    ShieldAlert, TrendingUp, TrendingDown, CheckCircle, XCircle,
    RotateCcw, Wallet, BarChart2, Layers, UserCheck,
    AlertTriangle, Info, Power, Edit, Trash2, Plus,
    Eye, EyeOff, Copy, MoreVertical, ArrowLeft, ExternalLink,
    Database, Activity, Clock, Shield, Cpu, HardDrive,
    PauseCircle, Download, Filter, RefreshCcw, Wrench,
    ChevronLeft, HelpCircle, Sun, X, Check, AlertCircle,
    Receipt, DollarSign, Calendar,
    FileBarChart, FileSpreadsheet, ChartNoAxesCombined,
    ReceiptText, FileCheck, FileWarning, FilePieChart,
    LogOut,
    Bug
} from "lucide-react";
import {
    LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, BarChart, Bar, AreaChart, Area,
} from "recharts";
import MerchantDashboard from "../page/view/MerchantDashboard";
import PayoutHistory from "../page/view/PayOutHistory";
import MerchantProfile from "../page/view/MerchantProfile";
import MerchantSettings from "../page/view/MerchantSettings";
import ApiIntegrationGuide from "../page/view/ApiIntegrationGuide";
import ErrorCodeReference from "../page/view/ErrorCodesDocument";

const navConfig = [
    { id: "dashboard", label: "Dashboard", Icon: House },
    { id: "payout-history", label: "Payout History", Icon: CreditCard },
    { id: "settings", label: "Settings", Icon: Settings },
    { id: "profile", label: "Profile", Icon: UserCheck },
    { id: "apiIntegration", label: "API Integration Guide", Icon: Webhook },
    { id: "errorCode", label: "Error Code Reference", Icon: Bug },
];

// Reusable Placeholder Component
function PlaceholderPage({ title, subtitle, icon: Icon = Database }) {
    return (
        <div className="p-6">
            <h1 className="text-xl font-bold text-gray-800 mb-1">{title}</h1>
            <p className="text-sm text-gray-400">{subtitle || "This section is under construction"}</p>
            <div className="mt-8 flex flex-col items-center justify-center h-96 text-gray-300 gap-4">
                <Icon size={64} strokeWidth={1.5} />
                <p className="text-base font-medium text-gray-400">Coming Soon</p>
                <p className="text-sm text-gray-400">This feature is currently in development</p>
            </div>
        </div>
    );
}

export default function BridgeAdminDashboard() {
    const [activePage, setActivePage] = useState("dashboard");
    const [collapsed, setCollapsed] = useState(false);
    const [expandedNav, setExpandedNav] = useState({
        "reports": false
    });
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('bridge_admin_email');
        localStorage.removeItem('bridge_admin_remember');
        sessionStorage.clear();
        navigate('/');
    };

    function navigatePage(pageId) {
        setActivePage(pageId);
    }

    function toggleNav(id) {
        setExpandedNav(prev => ({ ...prev, [id]: !prev[id] }));
    }

    function renderPage() {
        switch (activePage) {
            case "dashboard":
                return <MerchantDashboard />;

            case "payout-history":
                return <PayoutHistory />;


            case "settings":
                return <MerchantSettings />;

            case "profile":
                return <MerchantProfile />;
            case "apiIntegration":
                return <ApiIntegrationGuide />;
                case "errorCode":
                    return <ErrorCodeReference />;
            default:
                return <PlaceholderPage title={activePage} subtitle="Page not found" icon={AlertTriangle} />;
        }
    }

    return (
        <div className="flex h-screen bg-gray-100 font-sans text-sm overflow-hidden">

            {/* SIDEBAR */}
            <aside className={`${collapsed ? "w-16" : "w-56"} bg-white shadow-lg flex flex-col shrink-0 h-full overflow-y-auto hide-scrollbar transition-all duration-200 border-r border-gray-200`}>
                {/* Logo */}
                <div className={`flex items-center gap-2.5 px-3 py-3 border-b border-gray-200 ${collapsed ? "justify-center" : ""}`}>
                    <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center shrink-0">
                        <svg width="18" height="18" fill="white" viewBox="0 0 24 24">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                        </svg>
                    </div>
                    {!collapsed && <span className="text-gray-800 font-bold text-[15px] tracking-wide">Bridge Admin</span>}
                </div>

                {/* Navigation */}
                <nav className="flex-1 py-3 px-2 space-y-0.5 overflow-y-auto">
                    {navConfig.map(item => {
                        const isActive = activePage === item.id || (item.sub && item.sub.some(s => s.id === activePage));
                        const isExpanded = expandedNav[item.id];

                        return (
                            <div key={item.id}>
                                <button
                                    onClick={() => {
                                        if (item.sub) {
                                            toggleNav(item.id);
                                            if (!collapsed) return;
                                        }
                                        navigatePage(item.id);
                                    }}
                                    title={collapsed ? item.label : undefined}
                                    className={`w-full flex items-center ${collapsed ? "justify-center" : "justify-between"} px-3 py-2 rounded-lg transition-colors
                    ${isActive ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}`}
                                >
                                    <div className={`flex items-center ${collapsed ? "" : "gap-3"}`}>
                                        <item.Icon size={18} className="shrink-0" />
                                        {!collapsed && <span className="text-[13px] font-medium">{item.label}</span>}
                                    </div>
                                    {!collapsed && item.hasChevron && (
                                        <ChevronDown size={13} className={`opacity-50 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                                    )}
                                </button>

                                {/* Sub-items */}
                                {item.sub && isExpanded && !collapsed && (
                                    <div className="ml-4 mt-0.5 space-y-0.5 border-l border-gray-200 pl-3">
                                        {item.sub.map(sub => (
                                            <button
                                                key={sub.id}
                                                onClick={() => navigatePage(sub.id)}
                                                className={`w-full flex items-center gap-2.5 px-2 py-1.5 rounded-lg text-[12px] transition-colors
                          ${activePage === sub.id ? "text-blue-600 bg-blue-50" : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"}`}
                                            >
                                                <sub.Icon size={13} className="shrink-0" />
                                                {sub.label}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </nav>

                {/* Bottom Section */}
                <div className="p-3 border-t border-gray-200 space-y-2">
                    <button
                        onClick={handleLogout}
                        className="w-full bg-gray-600 hover:bg-gray-700 text-white rounded-lg flex items-center justify-center gap-2 transition-colors p-2.5 text-xs font-bold mt-2"
                    >
                        <LogOut size={13} />
                        {!collapsed && "LOGOUT"}
                    </button>
                </div>
            </aside>

            {/* MAIN CONTENT */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Content Area */}
                <main className="flex-1 overflow-y-auto bg-gray-50">
                    {renderPage()}
                </main>
            </div>
        </div>
    );
}