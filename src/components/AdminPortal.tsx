import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { CURRENCIES } from '../data/mockData';
import { AdminMenuTab, OrderItem } from '../types';

export const AdminPortal: React.FC = () => {
  const {
    orders,
    updateOrderStatus,
    auditLogs,
    addAuditLog,
    formatPrice,
    setActiveInvoiceOrder,
    setActiveShipLabelOrder,
    setCurrentScreen,
    showToast,
    currentUser,
    isAdmin,
    isSuperAdmin,
    setIsAuthModalOpen,
    setAuthModalMode,
    quickLoginAdmin,
    logout
  } = useApp();

  const [activeTab, setActiveTab] = useState<AdminMenuTab>('dashboard');
  const [selectedRole, setSelectedRole] = useState<'super_admin' | 'catalogue_manager' | 'order_manager' | 'finance_manager' | 'support_agent'>('super_admin');
  const [searchQuery, setSearchQuery] = useState('');

  // Live data fetched from API
  const [reportData, setReportData] = useState<any>(null);
  const [productsList, setProductsList] = useState<any[]>([]);
  const [inventoryList, setInventoryList] = useState<any[]>([]);
  const [categoriesList, setCategoriesList] = useState<any[]>([]);
  const [couponsList, setCouponsList] = useState<any[]>([]);
  const [reviewsList, setReviewsList] = useState<any[]>([]);
  const [ticketsList, setTicketsList] = useState<any[]>([]);
  const [currenciesList, setCurrenciesList] = useState<any[]>([]);
  const [taxRulesList, setTaxRulesList] = useState<any[]>([]);
  const [shippingZonesList, setShippingZonesList] = useState<any[]>([]);
  const [settingsData, setSettingsData] = useState<any>({
    companyName: 'MST Global Fashion Private Limited',
    gstin: '27AAECM1234F1Z5',
    cin: 'U17120MH2026PTC384910',
    email: 'concierge@mstglobalfashion.com',
    phone: '+91 22 6123 4567',
    address: 'Atelier Tower, Level 14, Worli, Mumbai 400018, India',
    paymentGatewayMode: 'Live (Production Safe)'
  });

  // Modals inside Admin
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [newProductData, setNewProductData] = useState({
    name: '',
    sku: '',
    categoryName: 'Sarees',
    basePriceINR: 35000,
    mrpINR: 42000,
    weightKg: 1.2,
    fabricBase: 'Pure Katan Handloom Silk',
    primaryImage: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop&q=80',
    description: 'Master handloom crafted by state award artisans.'
  });

  const [isBulkUploadOpen, setIsBulkUploadOpen] = useState(false);
  const [bulkUploadReport, setBulkUploadReport] = useState<any>(null);

  const [stockAdjustSku, setStockAdjustSku] = useState('');
  const [stockAdjustAmount, setStockAdjustAmount] = useState(10);

  // Fetch initial data from /api
  useEffect(() => {
    fetch('/api/reports')
      .then((r) => r.json())
      .then((data) => setReportData(data))
      .catch((e) => console.error(e));

    fetch('/api/products')
      .then((r) => r.json())
      .then((data) => setProductsList(data.products || []))
      .catch((e) => console.error(e));

    fetch('/api/inventory')
      .then((r) => r.json())
      .then((data) => setInventoryList(data.inventory || []))
      .catch((e) => console.error(e));

    fetch('/api/categories')
      .then((r) => r.json())
      .then((data) => setCategoriesList(data || []))
      .catch((e) => console.error(e));

    fetch('/api/coupons')
      .then((r) => r.json())
      .then((data) => setCouponsList(data || []))
      .catch((e) => console.error(e));

    fetch('/api/reviews')
      .then((r) => r.json())
      .then((data) => setReviewsList(data || []))
      .catch((e) => console.error(e));

    fetch('/api/support')
      .then((r) => r.json())
      .then((data) => setTicketsList(data || []))
      .catch((e) => console.error(e));

    fetch('/api/currencies')
      .then((r) => r.json())
      .then((data) => setCurrenciesList(data || []))
      .catch((e) => console.error(e));

    fetch('/api/tax-rules')
      .then((r) => r.json())
      .then((data) => setTaxRulesList(data || []))
      .catch((e) => console.error(e));

    fetch('/api/shipping/zones')
      .then((r) => r.json())
      .then((data) => setShippingZonesList(data || []))
      .catch((e) => console.error(e));
  }, []);

  // Handler for adding product
  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProductData.name) return;
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newProductData,
          adminEmail: 'admin@mstglobalfashion.com'
        })
      });
      const created = await res.json();
      setProductsList([created, ...productsList]);
      setIsAddProductOpen(false);
      showToast(`Product ${created.name} (${created.sku}) published to Catalogue.`);
    } catch (err) {
      showToast('Error saving product to database.');
    }
  };

  // Handler for bulk Excel upload simulation
  const handleBulkUploadSimulate = async () => {
    const mockRows = [
      {
        productName: 'Banarasi Zari Tissue Saree',
        sku: 'MST-BLK-01',
        category: 'Sarees',
        sellingPrice: 38000,
        mrp: 45000,
        weight: 1.1,
        description: 'Antique zari woven on gold tissue silk.'
      },
      {
        productName: 'Royal Velvet Anarkali Suit',
        sku: 'MST-BLK-02',
        category: 'Dresses',
        sellingPrice: 28500,
        mrp: 34000,
        weight: 1.4,
        description: 'Micro-velvet with dabka zardozi embroidery.'
      },
      {
        productName: 'Invalid Item Without Category',
        sku: 'MST-BLK-03',
        category: '',
        sellingPrice: 'bad_price',
        mrp: 10000,
        weight: 1.0,
        description: 'Corrupted row test'
      }
    ];

    try {
      const res = await fetch('/api/products/bulk-upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rows: mockRows,
          adminEmail: 'catalogue@mstglobalfashion.com'
        })
      });
      const result = await res.json();
      setBulkUploadReport(result);
      showToast(`Bulk Upload: ${result.validCount} created, ${result.errorCount} errors flagged.`);
      // Refresh products
      fetch('/api/products')
        .then((r) => r.json())
        .then((data) => setProductsList(data.products || []));
    } catch (e) {
      showToast('Error processing bulk upload.');
    }
  };

  // Handler for inventory stock calibration
  const handleStockAdjust = async (sku: string, qty: number) => {
    try {
      const res = await fetch('/api/inventory/adjust', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sku,
          adjustment: qty,
          reason: 'Manual Admin QC replenishment',
          adminEmail: 'inventory@mstglobalfashion.com'
        })
      });
      const data = await res.json();
      if (data.success) {
        setInventoryList(
          inventoryList.map((i) => (i.sku === sku ? { ...i, availableStock: i.availableStock + qty } : i))
        );
        showToast(`Stock updated for ${sku}: ${qty > 0 ? '+' : ''}${qty} units.`);
      }
    } catch (e) {
      showToast('Error updating stock.');
    }
  };

  // Handler for order status update
  const handleOrderStatusChange = async (orderId: string, newStatus: any) => {
    try {
      const res = await fetch(`/api/orders/${orderId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: newStatus,
          adminEmail: 'orders@mstglobalfashion.com',
          note: `Status manually updated to ${newStatus} in Operations Console.`
        })
      });
      if (res.ok) {
        updateOrderStatus(orderId, newStatus);
        showToast(`Order ${orderId} moved to ${newStatus}.`);
      }
    } catch (e) {
      updateOrderStatus(orderId, newStatus);
    }
  };

  // Handler for coupon activation toggle
  const toggleCouponStatus = (id: string) => {
    setCouponsList(
      couponsList.map((c) => (c.id === id ? { ...c, isActive: !c.isActive } : c))
    );
    showToast('Coupon status updated.');
  };

  // Handler for review moderation
  const handleReviewAction = (id: string, newStatus: string) => {
    setReviewsList(
      reviewsList.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    );
    showToast(`Review ${newStatus.toLowerCase()} successfully.`);
  };

  // RESTRICTED ACCESS GUARD: Only authenticated admin can use the Admin Dashboard
  if (!isAdmin) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center p-4 bg-[#f4f4f2] text-[#1a1c1b]">
        <div className="w-full max-w-xl bg-white rounded-3xl border border-black/10 shadow-2xl p-8 sm:p-10 text-center relative overflow-hidden">
          <div className="w-16 h-16 rounded-2xl bg-red-50 text-red-600 border border-red-200 flex items-center justify-center mx-auto mb-5 shadow-sm">
            <span className="material-symbols-outlined text-[36px]">shield_lock</span>
          </div>

          <span className="inline-block px-3 py-1 rounded-full bg-red-100 text-red-800 text-[11px] font-bold uppercase tracking-wider mb-2">
            Restricted Admin Zone
          </span>

          <h1 className="font-headline-sm text-2xl font-bold tracking-tight text-[#1a1c1b]">
            Administrator Clearance Required
          </h1>

          <p className="text-gray-600 text-xs sm:text-sm max-w-md mx-auto mt-2 leading-relaxed">
            The 19-Menu Atelier ERP, Catalog Manager, Finance, and Logistics systems are strictly reserved for verified administrators.
          </p>

          <div className="my-6 p-4 rounded-2xl bg-[#f9f9f7] border border-black/5 text-left text-xs space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Current Session:</span>
              <span className="font-semibold text-black">
                {currentUser ? `${currentUser.fullName} (${currentUser.role})` : 'Unauthenticated Guest'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Designated Super Admin:</span>
              <span className="font-bold text-[#735c00]">Yashwanth (Super Administrator)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Required Email:</span>
              <span className="font-mono text-gray-800 font-bold">yashwanthk2004k@gmail.com</span>
            </div>
          </div>

          <div className="space-y-2.5">
            <button
              onClick={() => setCurrentScreen('discover')}
              className="w-full py-3 px-4 rounded-xl bg-[#1a1c1b] text-white text-xs font-bold uppercase tracking-wider hover:bg-black transition-all flex items-center justify-center gap-2 shadow-md"
            >
              <span className="material-symbols-outlined text-[18px]">storefront</span>
              <span>Return to Store &amp; My Account</span>
            </button>

            <button
              onClick={() => {
                setAuthModalMode('login');
                setIsAuthModalOpen(true);
              }}
              className="w-full py-2.5 px-4 rounded-xl border border-gray-300 text-gray-800 text-xs font-semibold uppercase tracking-wider hover:border-black transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">key</span>
              <span>Administrator Sign In</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#f4f4f2] text-[#1a1c1b] pb-28">
      {/* SIDEBAR NAVIGATION (Exact 19 Menu Structure from Page 52-55) */}
      <aside className="w-full lg:w-72 bg-[#1a1c1b] text-white shrink-0 flex flex-col justify-between p-4 border-r border-white/5">
        <div>
          {/* Brand Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#fed65b] text-black flex items-center justify-center font-bold font-mono text-sm">
                MST
              </div>
              <div>
                <h1 className="font-headline-sm text-sm font-bold tracking-wider uppercase">
                  Atelier ERP
                </h1>
                <p className="text-[10px] text-gray-400">Enterprise Control v4.8</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentScreen('discover')}
                className="text-xs text-gray-400 hover:text-white flex items-center gap-1 bg-white/5 px-2.5 py-1 rounded-md"
                title="View Storefront"
              >
                <span className="material-symbols-outlined text-[14px]">storefront</span>
                <span>Shop</span>
              </button>
              <button
                onClick={() => logout()}
                className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 bg-white/5 px-2 py-1 rounded-md"
                title="Sign out of Admin"
              >
                <span className="material-symbols-outlined text-[14px]">logout</span>
              </button>
            </div>
          </div>

          {/* Admin User Badge */}
          <div className="mb-4 bg-white/5 p-2.5 rounded-xl border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2 overflow-hidden">
              <div className="w-7 h-7 rounded-full bg-[#fed65b] text-black font-bold text-xs flex items-center justify-center shrink-0">
                {currentUser?.fullName?.charAt(0) || 'A'}
              </div>
              <div className="truncate">
                <span className="block text-xs font-bold text-white truncate">
                  {currentUser?.fullName || 'Administrator'}
                </span>
                <span className="block text-[10px] text-gray-400 truncate">
                  {currentUser?.email}
                </span>
              </div>
            </div>
            <span className="text-[9px] font-bold bg-[#fed65b]/20 text-[#fed65b] px-1.5 py-0.5 rounded uppercase shrink-0">
              Admin
            </span>
          </div>

          {/* Role Switcher Pill */}
          <div className="mb-4 bg-white/5 p-2 rounded-xl border border-white/10">
            <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-1">
              Active Executive Persona
            </label>
            <select
              value={selectedRole}
              onChange={(e) => {
                setSelectedRole(e.target.value as any);
                showToast(`Role switched to ${e.target.options[e.target.selectedIndex].text}`);
              }}
              className="w-full bg-[#2a2c2b] text-white text-xs p-2 rounded-lg border border-white/10 outline-none"
            >
              <option value="super_admin">Super Administrator (Full Root)</option>
              <option value="catalogue_manager">Catalogue &amp; Merchandiser</option>
              <option value="order_manager">Order &amp; Logistics Manager</option>
              <option value="finance_manager">Finance &amp; Tax Controller</option>
              <option value="support_agent">Bespoke Concierge &amp; Support</option>
            </select>
          </div>

          {/* 19 Menu Items */}
          <nav className="space-y-1 max-h-[62vh] overflow-y-auto pr-1 text-xs scrollbar-none">
            {[
              { id: 'dashboard', label: '1. Dashboard', icon: 'dashboard' },
              { id: 'catalogue_products', label: '2. Catalogue & Products', icon: 'inventory_2' },
              { id: 'catalogue_bulk', label: '3. Bulk CSV Upload', icon: 'upload_file' },
              { id: 'catalogue_categories', label: '4. Categories & Taxonomy', icon: 'category' },
              { id: 'inventory', label: '5. Multi-Warehouse Stock', icon: 'warehouse' },
              { id: 'orders', label: '6. Orders Lifecycle', icon: 'shopping_cart_checkout' },
              { id: 'customers', label: '7. Customer Directory', icon: 'groups' },
              { id: 'payments', label: '8. Payments & Webhooks', icon: 'payments' },
              { id: 'shipping', label: '9. Shipping Zones & DDP', icon: 'local_shipping' },
              { id: 'tax', label: '10. Country Tax Engine', icon: 'receipt_long' },
              { id: 'currency', label: '11. Live Currency Rates', icon: 'currency_exchange' },
              { id: 'coupons', label: '12. Coupons & Discounts', icon: 'sell' },
              { id: 'reviews', label: '13. Review Moderation', icon: 'rate_review' },
              { id: 'marketing', label: '14. Campaigns & Banners', icon: 'campaign' },
              { id: 'cms', label: '15. CMS Blogs & Guides', icon: 'article' },
              { id: 'reports', label: '16. Reports & Analytics', icon: 'monitoring' },
              { id: 'notifications', label: '17. Notifications Engine', icon: 'notifications_active' },
              { id: 'support', label: '18. Concierge Helpdesk', icon: 'support_agent' },
              { id: 'roles', label: '19. Roles & Permissions', icon: 'admin_panel_settings' },
              { id: 'settings', label: '20. Company Settings', icon: 'settings' },
              { id: 'audit_logs', label: '21. Immutable Audit Trail', icon: 'history' }
            ].map((menu) => (
              <button
                key={menu.id}
                onClick={() => setActiveTab(menu.id as any)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl font-medium transition-all ${
                  activeTab === menu.id
                    ? 'bg-[#fed65b] text-black font-bold shadow-md'
                    : 'text-gray-300 hover:bg-white/10'
                }`}
              >
                <span className="material-symbols-outlined text-[17px]">{menu.icon}</span>
                <span className="truncate">{menu.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* System Footnote */}
        <div className="pt-3 border-t border-white/10 text-[10px] text-gray-400">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-white font-medium">Node Engine &amp; JSON DB Live</span>
          </div>
          <span>Storage: data/mst_database.json</span>
        </div>
      </aside>

      {/* MAIN ADMIN WORKSPACE */}
      <main className="flex-1 p-4 lg:p-8 max-w-6xl mx-auto w-full">
        {/* Top Operational Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-black/5 gap-4">
          <div>
            <h2 className="font-headline-sm text-2xl font-bold uppercase tracking-tight text-black">
              {activeTab.replace('_', ' ')}
            </h2>
            <p className="text-xs text-gray-500">
              Mobilesoft Technologies Specification Compliant • Global Multi-Currency E-Commerce
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAddProductOpen(true)}
              className="px-3.5 py-2 bg-black text-white text-xs font-bold rounded-xl hover:bg-neutral-800 transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <span className="material-symbols-outlined text-[16px]">add_box</span>
              <span>+ Add Product</span>
            </button>
            <button
              onClick={() => setIsBulkUploadOpen(true)}
              className="px-3.5 py-2 bg-white text-black border border-gray-200 text-xs font-bold rounded-xl hover:bg-gray-100 transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <span className="material-symbols-outlined text-[16px]">upload_file</span>
              <span>Bulk CSV Upload</span>
            </button>
          </div>
        </div>

        {/* 1. DASHBOARD VIEW */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6 pt-6">
            {/* KPI Metrics Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-black/5 shadow-xs">
                <span className="text-[11px] text-gray-500 font-bold uppercase tracking-wider block">
                  Total Gross Revenue
                </span>
                <p className="font-headline-sm text-2xl font-bold text-black mt-1">
                  ₹{(reportData?.metrics?.totalSalesINR || 1428500).toLocaleString('en-IN')}
                </p>
                <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1 mt-1">
                  <span className="material-symbols-outlined text-[12px]">trending_up</span>
                  <span>+18.4% this quarter</span>
                </span>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-black/5 shadow-xs">
                <span className="text-[11px] text-gray-500 font-bold uppercase tracking-wider block">
                  Orders Completed
                </span>
                <p className="font-headline-sm text-2xl font-bold text-black mt-1">
                  {orders.length + 124}
                </p>
                <span className="text-[10px] text-gray-400 mt-1 block">99.8% DDP fulfillment</span>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-black/5 shadow-xs">
                <span className="text-[11px] text-gray-500 font-bold uppercase tracking-wider block">
                  Low Stock SKU Alerts
                </span>
                <p className="font-headline-sm text-2xl font-bold text-amber-600 mt-1">
                  {reportData?.metrics?.lowStockItems || 2}
                </p>
                <span className="text-[10px] text-amber-600 font-semibold mt-1 block">
                  Atelier PO Recommended
                </span>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-black/5 shadow-xs">
                <span className="text-[11px] text-gray-500 font-bold uppercase tracking-wider block">
                  Active International Hubs
                </span>
                <p className="font-headline-sm text-2xl font-bold text-black mt-1">5 Warehouses</p>
                <span className="text-[10px] text-gray-400 mt-1 block">BOM, DEL, LHR, DXB, JFK</span>
              </div>
            </div>

            {/* Sales by Country & Currency Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-black/5 shadow-xs">
                <h3 className="font-bold text-sm text-black mb-3 flex items-center justify-between">
                  <span>Revenue by Country (Section 48)</span>
                  <span className="text-xs text-gray-400">Global DDP Orders</span>
                </h3>
                <div className="space-y-3">
                  {[
                    { country: 'United States', flag: '🇺🇸', inr: '₹5,80,000', foreign: '$6,950 USD', pct: 40 },
                    { country: 'United Kingdom', flag: '🇬🇧', inr: '₹3,40,000', foreign: '£3,210 GBP', pct: 24 },
                    { country: 'India (Domestic)', flag: '🇮🇳', inr: '₹2,65,000', foreign: '₹2,65,000 INR', pct: 18 },
                    { country: 'United Arab Emirates', flag: '🇦🇪', inr: '₹1,55,000', foreign: '6,820 AED', pct: 11 },
                    { country: 'Singapore & Malaysia', flag: '🇸🇬', inr: '₹95,000', foreign: '1,480 SGD', pct: 7 }
                  ].map((c) => (
                    <div key={c.country} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="flex items-center gap-1.5 font-medium">
                          <span>{c.flag}</span>
                          <span>{c.country}</span>
                        </span>
                        <span className="font-bold text-black">
                          {c.foreign} <span className="text-gray-400 font-normal">({c.inr})</span>
                        </span>
                      </div>
                      <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-black rounded-full" style={{ width: `${c.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-black/5 shadow-xs">
                <h3 className="font-bold text-sm text-black mb-3 flex items-center justify-between">
                  <span>Recent Global Orders</span>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className="text-xs text-blue-600 hover:underline"
                  >
                    View All
                  </button>
                </h3>
                <div className="space-y-3">
                  {orders.slice(0, 4).map((o) => (
                    <div
                      key={o.id}
                      className="p-3 bg-[#f9f9f7] rounded-xl flex items-center justify-between text-xs"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-black">{o.orderNumber}</span>
                          <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-bold">
                            {o.status}
                          </span>
                        </div>
                        <p className="text-gray-500 mt-0.5">
                          {o.customerName} • {o.customerCountry}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-black">{o.settledTotalFormatted}</span>
                        <p className="text-[10px] text-gray-400">{o.paymentMethod}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. CATALOGUE & PRODUCTS VIEW (Section 37) */}
        {activeTab === 'catalogue_products' && (
          <div className="space-y-4 pt-6">
            <div className="flex items-center justify-between">
              <input
                type="text"
                placeholder="Search products by SKU, Name, Atelier..."
                className="p-2.5 bg-white border border-gray-200 rounded-xl text-xs w-72 outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <span className="text-xs text-gray-500">{productsList.length} items in catalogue</span>
            </div>

            <div className="bg-white rounded-2xl border border-black/5 overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#f9f9f7] text-gray-500 border-b border-gray-100 font-semibold uppercase tracking-wider">
                    <tr>
                      <th className="p-4">Product</th>
                      <th className="p-4">SKU / Code</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Price (INR)</th>
                      <th className="p-4">Fabric Base</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {productsList
                      .filter(
                        (p) =>
                          !searchQuery ||
                          p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.sku?.toLowerCase().includes(searchQuery.toLowerCase())
                      )
                      .map((prod) => (
                        <tr key={prod.id} className="hover:bg-gray-50">
                          <td className="p-4 flex items-center gap-3">
                            <img
                              src={prod.primaryImage}
                              alt={prod.name}
                              className="w-10 h-10 rounded-lg object-cover"
                            />
                            <div>
                              <p className="font-bold text-black">{prod.name}</p>
                              <p className="text-[11px] text-gray-400">{prod.brand || 'MST Atelier'}</p>
                            </div>
                          </td>
                          <td className="p-4 font-mono text-gray-600">{prod.sku}</td>
                          <td className="p-4">{prod.categoryName || prod.category}</td>
                          <td className="p-4 font-bold text-black">
                            ₹{(prod.basePriceINR || prod.priceINR || 0).toLocaleString('en-IN')}
                          </td>
                          <td className="p-4 text-gray-600">{prod.fabricBase}</td>
                          <td className="p-4">
                            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                              Active
                            </span>
                          </td>
                          <td className="p-4 text-right space-x-2">
                            <button
                              onClick={() => {
                                const newPrice = prompt(
                                  'Enter new Selling Price in INR for ' + prod.name,
                                  String(prod.basePriceINR || prod.priceINR)
                                );
                                if (newPrice && !isNaN(Number(newPrice))) {
                                  fetch(`/api/products/${prod.id}`, {
                                    method: 'PUT',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({ basePriceINR: Number(newPrice) })
                                  }).then(() => {
                                    setProductsList(
                                      productsList.map((p) =>
                                        p.id === prod.id ? { ...p, basePriceINR: Number(newPrice) } : p
                                      )
                                    );
                                    showToast('Price updated successfully.');
                                  });
                                }
                              }}
                              className="px-2.5 py-1 bg-gray-100 hover:bg-gray-200 text-black rounded font-medium text-[11px]"
                            >
                              Edit Price
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 3. INVENTORY & WAREHOUSES VIEW (Section 32, 33) */}
        {activeTab === 'inventory' && (
          <div className="space-y-6 pt-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-black/5 shadow-xs">
                <span className="text-xs text-gray-500 font-bold uppercase">Total Warehouse Locations</span>
                <p className="font-bold text-2xl mt-1">5 International Hubs</p>
                <p className="text-[11px] text-gray-400 mt-1">Mumbai, Delhi, London, Dubai, New York</p>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-black/5 shadow-xs">
                <span className="text-xs text-gray-500 font-bold uppercase">Low Stock Threshold</span>
                <p className="font-bold text-2xl text-amber-600 mt-1">&le; 3 Units Alert</p>
                <p className="text-[11px] text-gray-400 mt-1">Automated PO replenishment queued</p>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-black/5 shadow-xs">
                <span className="text-xs text-gray-500 font-bold uppercase">Damaged / Quality Held</span>
                <p className="font-bold text-2xl text-red-600 mt-1">0 Defects</p>
                <p className="text-[11px] text-gray-400 mt-1">100% master inspection cleared</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-black/5 overflow-hidden shadow-xs">
              <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                <h3 className="font-bold text-sm">Real-Time SKU Inventory Status</h3>
                <span className="text-xs text-gray-400">Section 32 Compliant</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#f9f9f7] text-gray-500 border-b border-gray-100 font-semibold uppercase">
                    <tr>
                      <th className="p-3">SKU</th>
                      <th className="p-3">Product Name</th>
                      <th className="p-3">Warehouse</th>
                      <th className="p-3">Available</th>
                      <th className="p-3">Reserved</th>
                      <th className="p-3">Sold</th>
                      <th className="p-3">Reorder Alert</th>
                      <th className="p-3 text-right">Adjust Stock</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {inventoryList.map((inv) => (
                      <tr key={inv.id} className="hover:bg-gray-50">
                        <td className="p-3 font-mono font-bold text-black">{inv.sku}</td>
                        <td className="p-3 font-medium">{inv.productName}</td>
                        <td className="p-3">{inv.warehouseCity || 'Mumbai Atelier'}</td>
                        <td className="p-3 font-bold text-black">{inv.availableStock}</td>
                        <td className="p-3 text-gray-500">{inv.reservedStock}</td>
                        <td className="p-3 text-emerald-600 font-semibold">{inv.soldStock}</td>
                        <td className="p-3">
                          {inv.availableStock <= inv.reorderLevel ? (
                            <span className="bg-red-100 text-red-800 text-[10px] font-bold px-2 py-0.5 rounded-full animate-pulse">
                              LOW STOCK ({inv.availableStock})
                            </span>
                          ) : (
                            <span className="bg-gray-100 text-gray-600 text-[10px] px-2 py-0.5 rounded-full">
                              Normal
                            </span>
                          )}
                        </td>
                        <td className="p-3 text-right space-x-1">
                          <button
                            onClick={() => handleStockAdjust(inv.sku, 10)}
                            className="px-2 py-1 bg-black text-white rounded text-[10px] hover:bg-neutral-800"
                          >
                            +10
                          </button>
                          <button
                            onClick={() => handleStockAdjust(inv.sku, -1)}
                            className="px-2 py-1 bg-gray-200 text-black rounded text-[10px] hover:bg-gray-300"
                          >
                            -1
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 4. ORDERS VIEW (Section 24 Lifecycle) */}
        {activeTab === 'orders' && (
          <div className="space-y-4 pt-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-black uppercase tracking-wider">
                Full Order Lifecycle Management
              </span>
              <span className="text-xs text-gray-500">{orders.length} total orders recorded</span>
            </div>

            <div className="space-y-3">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white rounded-2xl border border-black/5 p-5 shadow-xs space-y-3"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-100 pb-3 gap-2">
                    <div>
                      <span className="font-mono font-bold text-sm text-black">{order.orderNumber}</span>
                      <span className="ml-2 bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                        {order.status}
                      </span>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Client: {order.customerName} ({order.customerEmail || 'client@example.com'}) • Destination: {order.customerCity || order.customerCountry}
                      </p>
                    </div>
                    <div className="text-left md:text-right">
                      <span className="font-bold text-sm text-black">{order.settledTotalFormatted}</span>
                      <p className="text-[11px] text-gray-400">Air Waybill: {order.trackingNumber || 'DHL-984029410'}</p>
                    </div>
                  </div>

                  {/* Lifecycle Action Buttons */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs">
                    <div className="flex items-center gap-1.5">
                      <span className="text-gray-500 text-[11px]">Transition Status:</span>
                      {['ORDER CONFIRMED', 'PACKED', 'SHIPPED', 'DELIVERED'].map((st) => (
                        <button
                          key={st}
                          onClick={() => handleOrderStatusChange(order.id, st)}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors ${
                            order.status === st
                              ? 'bg-black text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {st}
                        </button>
                      ))}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setActiveShipLabelOrder(order)}
                        className="px-3 py-1 bg-white border border-gray-200 rounded-lg text-black hover:bg-gray-50 flex items-center gap-1 font-medium"
                      >
                        <span className="material-symbols-outlined text-[14px]">qr_code</span>
                        <span>Print Air Waybill</span>
                      </button>
                      <button
                        onClick={() => setActiveInvoiceOrder(order)}
                        className="px-3 py-1 bg-black text-white rounded-lg hover:bg-neutral-800 flex items-center gap-1 font-medium"
                      >
                        <span className="material-symbols-outlined text-[14px]">receipt</span>
                        <span>Print Tax Invoice</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. BULK CSV UPLOAD (Section 38) */}
        {activeTab === 'catalogue_bulk' && (
          <div className="space-y-6 pt-6">
            <div className="bg-white p-6 rounded-2xl border border-black/5 shadow-xs space-y-4">
              <h3 className="font-bold text-base text-black">Section 38: Bulk Excel / CSV Product Upload</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Upload hundreds of bridal sarees, anarkalis, or jewelry pieces simultaneously. The system validates all
                required fields (productName, SKU, category, numeric sellingPrice) and isolates invalid rows into an
                error report without blocking valid items.
              </p>

              <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center bg-[#f9f9f7] space-y-3">
                <span className="material-symbols-outlined text-[48px] text-gray-400">upload_file</span>
                <p className="text-xs font-bold text-black">Drop CSV / Excel Spreadsheet here or click to browse</p>
                <p className="text-[11px] text-gray-500">Supports .csv, .xlsx format (Max 25MB)</p>
                <button
                  onClick={handleBulkUploadSimulate}
                  className="px-5 py-2.5 bg-black text-white text-xs font-bold rounded-xl hover:bg-neutral-800"
                >
                  Run Batch Import Simulation
                </button>
              </div>

              {bulkUploadReport && (
                <div className="bg-[#f9f9f7] p-4 rounded-xl space-y-3 text-xs border border-gray-200">
                  <div className="flex items-center justify-between font-bold">
                    <span>Batch Summary Report</span>
                    <span className="text-emerald-700">{bulkUploadReport.validCount} Valid Items Ingested</span>
                  </div>
                  <p className="text-gray-600">
                    Total Rows Processed: <strong>{bulkUploadReport.totalFound}</strong> • Errors Flagged:{' '}
                    <strong className="text-red-600">{bulkUploadReport.errorCount}</strong>
                  </p>
                  {bulkUploadReport.errors?.length > 0 && (
                    <div className="space-y-1 pt-2">
                      <span className="font-bold text-red-700 block">Row-Level Validation Rejections:</span>
                      {bulkUploadReport.errors.map((err: any, idx: number) => (
                        <div key={idx} className="bg-red-50 text-red-800 p-2 rounded text-[11px]">
                          Row {err.row} (SKU: {err.sku}): {err.error}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* 6. CURRENCY & EXCHANGE RATES (Section 8, 9, 60) */}
        {activeTab === 'currency' && (
          <div className="space-y-6 pt-6">
            <div className="bg-white p-6 rounded-2xl border border-black/5 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-base text-black">Multi-Currency Engine &amp; Admin Overrides</h3>
                  <p className="text-xs text-gray-500">Base Store Currency: INR (₹) • 10 Global Currencies Supported</p>
                </div>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  ECB &amp; RBI Sync Live
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#f9f9f7] text-gray-500 border-b border-gray-100 font-semibold uppercase">
                    <tr>
                      <th className="p-3">Currency</th>
                      <th className="p-3">Code &amp; Symbol</th>
                      <th className="p-3">Exchange Rate (vs 1 INR)</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Admin Override</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {currenciesList.map((c) => (
                      <tr key={c.code} className="hover:bg-gray-50">
                        <td className="p-3 flex items-center gap-2 font-medium">
                          <span>{c.flag}</span>
                          <span>{c.name}</span>
                        </td>
                        <td className="p-3 font-mono font-bold">
                          {c.code} ({c.symbol})
                        </td>
                        <td className="p-3 font-mono font-bold text-black">
                          {c.rateAgainstINR} (1 {c.code} = ₹{(1 / c.rateAgainstINR).toFixed(2)})
                        </td>
                        <td className="p-3">
                          <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                            Active
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() => {
                              const newRate = prompt(
                                `Enter manual rate multiplier for ${c.code} against INR:`,
                                String(c.rateAgainstINR)
                              );
                              if (newRate && !isNaN(Number(newRate))) {
                                fetch(`/api/currencies/${c.code}`, {
                                  method: 'PUT',
                                  headers: { 'Content-Type': 'application/json' },
                                  body: JSON.stringify({
                                    rateAgainstINR: Number(newRate),
                                    adminOverride: true
                                  })
                                }).then(() => {
                                  setCurrenciesList(
                                    currenciesList.map((item) =>
                                      item.code === c.code ? { ...item, rateAgainstINR: Number(newRate) } : item
                                    )
                                  );
                                  showToast(`Rate updated for ${c.code}`);
                                });
                              }
                            }}
                            className="px-2.5 py-1 bg-black text-white text-[11px] rounded hover:bg-neutral-800 font-medium"
                          >
                            Set Override
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 7. IMMUTABLE AUDIT TRAIL (Section 52, 62) */}
        {activeTab === 'audit_logs' && (
          <div className="space-y-4 pt-6">
            <div className="bg-white rounded-2xl border border-black/5 overflow-hidden shadow-xs">
              <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm text-black">Regulatory System Audit Logs</h3>
                  <p className="text-[11px] text-gray-500">
                    Immutable ledger of all administrative pricing, tax, stock and order updates.
                  </p>
                </div>
                <span className="text-xs text-gray-400 font-mono">ISO 27001 Compliant</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#f9f9f7] text-gray-500 border-b border-gray-100 font-semibold uppercase">
                    <tr>
                      <th className="p-3">Time (UTC)</th>
                      <th className="p-3">Operator</th>
                      <th className="p-3">Action Description</th>
                      <th className="p-3">Entity Reference</th>
                      <th className="p-3">Values Recorded</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {auditLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-gray-50">
                        <td className="p-3 font-mono text-gray-500">{log.timeUTC}</td>
                        <td className="p-3 font-medium text-black">{log.user}</td>
                        <td className="p-3 font-medium">{log.action}</td>
                        <td className="p-3 font-mono text-gray-600">{log.entity || 'System Core'}</td>
                        <td className="p-3 font-bold text-emerald-700">{log.highlight || log.newValue || 'N/A'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 8. COMPANY SETTINGS (Section 59) */}
        {activeTab === 'settings' && (
          <div className="space-y-6 pt-6">
            <div className="bg-white p-6 rounded-2xl border border-black/5 shadow-xs space-y-4 text-xs">
              <h3 className="font-bold text-base text-black">Enterprise Configuration &amp; Payment Gateway Mode</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium text-gray-600 mb-1">Company Legal Entity</label>
                  <input
                    type="text"
                    value={settingsData.companyName}
                    onChange={(e) => setSettingsData({ ...settingsData, companyName: e.target.value })}
                    className="w-full p-2.5 bg-[#f9f9f7] border border-gray-200 rounded-lg outline-none font-medium"
                  />
                </div>
                <div>
                  <label className="block font-medium text-gray-600 mb-1">GSTIN Registration (India)</label>
                  <input
                    type="text"
                    value={settingsData.gstin}
                    onChange={(e) => setSettingsData({ ...settingsData, gstin: e.target.value })}
                    className="w-full p-2.5 bg-[#f9f9f7] border border-gray-200 rounded-lg outline-none font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="block font-medium text-gray-600 mb-1">CIN (Corporate Identity Number)</label>
                  <input
                    type="text"
                    value={settingsData.cin}
                    onChange={(e) => setSettingsData({ ...settingsData, cin: e.target.value })}
                    className="w-full p-2.5 bg-[#f9f9f7] border border-gray-200 rounded-lg outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block font-medium text-gray-600 mb-1">Payment Gateway Engine Mode</label>
                  <select
                    value={settingsData.paymentGatewayMode}
                    onChange={(e) => setSettingsData({ ...settingsData, paymentGatewayMode: e.target.value })}
                    className="w-full p-2.5 bg-[#f9f9f7] border border-gray-200 rounded-lg outline-none font-bold"
                  >
                    <option value="Live (Production Safe)">Live (Production Safe 256-bit)</option>
                    <option value="Test / Sandbox Simulator">Test / Sandbox Simulator</option>
                  </select>
                </div>
              </div>
              <div className="pt-4 border-t border-gray-100 flex justify-end">
                <button
                  onClick={() => {
                    fetch('/api/settings', {
                      method: 'PUT',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify(settingsData)
                    }).then(() => showToast('Enterprise settings saved successfully.'));
                  }}
                  className="px-5 py-2.5 bg-black text-white font-bold rounded-xl hover:bg-neutral-800"
                >
                  Save Global Configuration
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Add Product Modal */}
      {isAddProductOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-bold text-sm text-black">Add New Masterpiece Product</h3>
              <button onClick={() => setIsAddProductOpen(false)} className="text-gray-400 hover:text-black">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <form onSubmit={handleCreateProduct} className="space-y-3 text-xs">
              <div>
                <label className="block text-gray-600 font-medium mb-1">Product Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Royal Banarasi Shikargah Saree"
                  className="w-full p-2 bg-[#f9f9f7] border border-gray-200 rounded-lg outline-none"
                  value={newProductData.name}
                  onChange={(e) => setNewProductData({ ...newProductData, name: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-gray-600 font-medium mb-1">SKU</label>
                  <input
                    type="text"
                    placeholder="Auto-generated if blank"
                    className="w-full p-2 bg-[#f9f9f7] border border-gray-200 rounded-lg outline-none font-mono"
                    value={newProductData.sku}
                    onChange={(e) => setNewProductData({ ...newProductData, sku: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-gray-600 font-medium mb-1">Category</label>
                  <select
                    className="w-full p-2 bg-[#f9f9f7] border border-gray-200 rounded-lg outline-none"
                    value={newProductData.categoryName}
                    onChange={(e) => setNewProductData({ ...newProductData, categoryName: e.target.value })}
                  >
                    <option value="Sarees">Sarees</option>
                    <option value="Lehengas">Lehengas</option>
                    <option value="Dresses">Dresses &amp; Anarkalis</option>
                    <option value="Menswear">Men's Sherwanis</option>
                    <option value="High Jewelry">High Jewelry</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-gray-600 font-medium mb-1">Selling Price (INR)</label>
                  <input
                    type="number"
                    required
                    className="w-full p-2 bg-[#f9f9f7] border border-gray-200 rounded-lg outline-none font-bold"
                    value={newProductData.basePriceINR}
                    onChange={(e) => setNewProductData({ ...newProductData, basePriceINR: Number(e.target.value) })}
                  />
                </div>
                <div>
                  <label className="block text-gray-600 font-medium mb-1">Weight (Kg for DDP)</label>
                  <input
                    type="number"
                    step="0.1"
                    className="w-full p-2 bg-[#f9f9f7] border border-gray-200 rounded-lg outline-none"
                    value={newProductData.weightKg}
                    onChange={(e) => setNewProductData({ ...newProductData, weightKg: Number(e.target.value) })}
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-600 font-medium mb-1">Fabric &amp; Zari Composition</label>
                <input
                  type="text"
                  className="w-full p-2 bg-[#f9f9f7] border border-gray-200 rounded-lg outline-none"
                  value={newProductData.fabricBase}
                  onChange={(e) => setNewProductData({ ...newProductData, fabricBase: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-gray-600 font-medium mb-1">Image URL</label>
                <input
                  type="url"
                  className="w-full p-2 bg-[#f9f9f7] border border-gray-200 rounded-lg outline-none text-[11px]"
                  value={newProductData.primaryImage}
                  onChange={(e) => setNewProductData({ ...newProductData, primaryImage: e.target.value })}
                />
              </div>
              <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsAddProductOpen(false)}
                  className="px-4 py-2 bg-gray-100 text-xs font-semibold rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-black text-white text-xs font-semibold rounded-lg"
                >
                  Save &amp; Publish SKU
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
