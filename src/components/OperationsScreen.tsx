import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { INITIAL_WAREHOUSES } from '../data/mockData';
import { OrderItem } from '../types';

export const OperationsScreen: React.FC = () => {
  const {
    orders,
    auditLogs,
    setActiveInvoiceOrder,
    setActiveShipLabelOrder,
    setActiveArtisanOrder,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState<string>('All');
  const [selectedWorkspace, setSelectedWorkspace] = useState(
    'MST Multi-Region (US, UK, IN, UAE, EU)'
  );
  const [isWorkspaceDropdownOpen, setIsWorkspaceDropdownOpen] = useState(false);
  const [reorderState, setReorderState] = useState<'idle' | 'loading' | 'done'>('idle');

  const tabs = [
    { label: 'All', count: 142 },
    { label: 'Verified', count: 38 },
    { label: 'Tailoring', count: 12 },
    { label: 'Packed', count: 24 },
    { label: 'DHL Ready', count: 56 },
    { label: 'Delivered', count: 12 }
  ];

  const handleReorder = () => {
    setReorderState('loading');
    setTimeout(() => {
      setReorderState('done');
      showToast('PO #8812 Queued: 25 Handloom Silk units allocated with Master Guild');
      setTimeout(() => setReorderState('idle'), 4000);
    }, 1200);
  };

  const filteredOrders = orders.filter((order) => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Tailoring') return order.status === 'Tailoring Prep';
    if (activeTab === 'Packed') return order.status === 'Packed & Labeled';
    if (activeTab === 'DHL Ready') return order.status === 'DHL Ready';
    if (activeTab === 'Delivered') return order.status === 'Delivered';
    return true;
  });

  return (
    <div className="flex flex-col w-full pb-24 text-[#1a1c1b] max-w-5xl mx-auto">
      {/* Top Operational Banner & Selector */}
      <div className="px-4 pt-4 pb-2 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#735c00] animate-pulse" />
            <span className="font-label-caps-md text-label-caps-md text-[#735c00] uppercase tracking-widest font-bold">
              Global Operations Center
            </span>
          </div>
          <span className="font-label-caps-sm text-label-caps-sm text-[#444748] bg-[#e8e8e6] px-2.5 py-0.5 rounded-full font-medium">
            System v4.8 • Live
          </span>
        </div>

        {/* Store Selector Pill Button */}
        <div className="relative">
          <div
            onClick={() => setIsWorkspaceDropdownOpen(!isWorkspaceDropdownOpen)}
            className="bg-[#f4f4f2] rounded-xl p-2.5 flex items-center justify-between shadow-xs cursor-pointer border border-black/[0.04] hover:bg-[#e8e8e6] transition-colors"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[18px]">hub</span>
              </div>
              <div className="min-w-0">
                <p className="font-label-caps-sm text-label-caps-sm text-[#444748] uppercase tracking-wider font-semibold">
                  Active Workspace
                </p>
                <p className="font-body-md text-body-md font-semibold text-[#1a1c1b] truncate">
                  {selectedWorkspace}
                </p>
              </div>
            </div>
            <button className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-[#1a1c1b] shadow-xs shrink-0">
              <span className="material-symbols-outlined text-[20px]">unfold_more</span>
            </button>
          </div>

          {isWorkspaceDropdownOpen && (
            <div className="absolute top-14 left-0 right-0 bg-white rounded-xl shadow-xl border border-black/10 py-2 z-30 animate-in fade-in">
              {[
                'MST Multi-Region (US, UK, IN, UAE, EU)',
                'North America Concierge (NYC Madison)',
                'United Kingdom & Europe (London Bond St)',
                'GCC & Middle East (Dubai DIFC)',
                'India Domestic Heritage (New Delhi HQ)'
              ].map((ws) => (
                <button
                  key={ws}
                  onClick={() => {
                    setSelectedWorkspace(ws);
                    setIsWorkspaceDropdownOpen(false);
                    showToast(`Switched workspace to ${ws}`);
                  }}
                  className={`w-full px-4 py-2 text-left text-sm flex items-center justify-between hover:bg-[#f4f4f2] ${
                    selectedWorkspace === ws ? 'font-bold bg-[#f9f9f7]' : ''
                  }`}
                >
                  <span>{ws}</span>
                  {selectedWorkspace === ws && (
                    <span className="material-symbols-outlined text-[16px] text-[#735c00]">
                      check
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Live KPI Stat Cards (2x2 Grid) */}
      <section className="px-4 py-2">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {/* Revenue KPI */}
          <div className="bg-white p-4 rounded-xl shadow-xs flex flex-col justify-between border border-black/[0.04]">
            <div className="flex items-center justify-between mb-1">
              <span className="font-label-caps-sm text-label-caps-sm text-[#444748] uppercase tracking-wider font-semibold">
                Today's Revenue
              </span>
              <span className="material-symbols-outlined text-[#735c00] text-[18px]">payments</span>
            </div>
            <div>
              <p className="font-headline-sm text-headline-sm font-semibold text-[#1a1c1b] tracking-tight">
                ₹14,82,450
              </p>
              <p className="font-label-sm text-label-sm text-[#444748]">$17,818 USD</p>
            </div>
            <div className="mt-3 pt-2 bg-[#f4f4f2] -mx-4 -mb-4 p-2 px-4 rounded-b-xl flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] text-[#735c00]">trending_up</span>
              <span className="font-label-caps-sm text-label-caps-sm text-[#735c00] font-bold">
                +18.4%
              </span>
              <span className="font-label-caps-sm text-label-caps-sm text-[#444748]">vs y'day</span>
            </div>
          </div>

          {/* Active Orders KPI */}
          <div className="bg-white p-4 rounded-xl shadow-xs flex flex-col justify-between border border-black/[0.04]">
            <div className="flex items-center justify-between mb-1">
              <span className="font-label-caps-sm text-label-caps-sm text-[#444748] uppercase tracking-wider font-semibold">
                Active Orders
              </span>
              <span className="material-symbols-outlined text-[#1a1c1b] text-[18px]">local_mall</span>
            </div>
            <div>
              <p className="font-headline-sm text-headline-sm font-semibold text-[#1a1c1b] tracking-tight">
                142
              </p>
              <p className="font-label-sm text-label-sm text-[#444748] leading-tight">
                38 queue • 12 bespoke
              </p>
            </div>
            <div className="mt-3 pt-2 bg-[#f4f4f2] -mx-4 -mb-4 p-2 px-4 rounded-b-xl flex items-center gap-1.5 truncate">
              <span className="w-1.5 h-1.5 rounded-full bg-[#735c00] shrink-0" />
              <span className="font-label-caps-sm text-label-caps-sm text-[#1a1c1b] truncate font-medium">
                Custom Tailoring Active
              </span>
            </div>
          </div>

          {/* Low Stock Alerts KPI */}
          <div className="bg-white p-4 rounded-xl shadow-xs flex flex-col justify-between border border-black/[0.04]">
            <div className="flex items-center justify-between mb-1">
              <span className="font-label-caps-sm text-label-caps-sm text-[#444748] uppercase tracking-wider font-semibold">
                Low Stock
              </span>
              <span className="material-symbols-outlined text-[#ba1a1a] text-[18px]">inventory_2</span>
            </div>
            <div>
              <p className="font-headline-sm text-headline-sm font-semibold text-[#ba1a1a] tracking-tight">
                7 SKUs
              </p>
              <p className="font-label-sm text-label-sm text-[#444748]">Safety limits reached</p>
            </div>
            <div className="mt-3 pt-2 bg-[#f4f4f2] -mx-4 -mb-4 p-2 px-4 rounded-b-xl flex items-center gap-1">
              <span className="material-symbols-outlined text-[13px] text-[#ba1a1a]">warning</span>
              <span className="font-label-caps-sm text-label-caps-sm text-[#ba1a1a] font-medium truncate">
                Pessimistic reserve
              </span>
            </div>
          </div>

          {/* Return Rate KPI */}
          <div className="bg-white p-4 rounded-xl shadow-xs flex flex-col justify-between border border-black/[0.04]">
            <div className="flex items-center justify-between mb-1">
              <span className="font-label-caps-sm text-label-caps-sm text-[#444748] uppercase tracking-wider font-semibold">
                Return Rate
              </span>
              <span className="material-symbols-outlined text-[#735c00] text-[18px]">assignment_return</span>
            </div>
            <div>
              <p className="font-headline-sm text-headline-sm font-semibold text-[#1a1c1b] tracking-tight">
                1.2%
              </p>
              <p className="font-label-sm text-label-sm text-[#444748]">Benchmark 4.5%</p>
            </div>
            <div className="mt-3 pt-2 bg-[#f4f4f2] -mx-4 -mb-4 p-2 px-4 rounded-b-xl flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] text-[#735c00]">verified</span>
              <span className="font-label-caps-sm text-label-caps-sm text-[#444748] truncate font-medium">
                Premium Quality
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Real-Time Order Management Section */}
      <section className="mt-4 flex flex-col">
        <div className="px-4 flex items-center justify-between mb-2">
          <div>
            <h2 className="font-headline-sm text-headline-sm font-semibold text-[#1a1c1b]">
              Order State Engine
            </h2>
            <p className="font-label-sm text-label-sm text-[#444748]">
              Cross-border synchronous dispatching
            </p>
          </div>
          <button
            onClick={() => showToast('Order filtering updated with active DHL filters')}
            className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#e8e8e6] text-[#1a1c1b] font-label-caps-sm text-label-caps-sm font-semibold hover:bg-gray-300 transition-colors"
          >
            <span className="material-symbols-outlined text-[14px]">tune</span>
            <span>Filter</span>
          </button>
        </div>

        {/* Scrollable Workflow Tabs */}
        <div className="overflow-x-auto no-scrollbar px-4 flex gap-2 py-1">
          {tabs.map((tab) => {
            const isSelected = activeTab === tab.label;
            return (
              <button
                key={tab.label}
                onClick={() => setActiveTab(tab.label)}
                className={`px-3 py-1.5 rounded-full font-label-caps-md text-label-caps-md whitespace-nowrap transition-all shadow-xs ${
                  isSelected
                    ? 'bg-black text-white'
                    : 'bg-[#e8e8e6] text-[#1a1c1b] hover:bg-[#e2e3e1]'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            );
          })}
        </div>

        {/* Order Cards Stream */}
        <div className="px-4 mt-2 flex flex-col gap-3">
          {filteredOrders.map((order) => {
            const isSophia = order.customerName === 'Sophia Chen';
            const isAisha = order.customerName === 'Aisha Al-Maktoum';

            return (
              <div
                key={order.id}
                className="bg-white rounded-xl p-4 shadow-xs flex flex-col gap-3 border border-black/[0.04]"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      className="w-10 h-10 rounded-full object-cover ring-1 ring-black/10"
                      src={order.customerAvatar}
                      alt={order.customerName}
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-body-md text-body-md font-semibold text-[#1a1c1b]">
                          {order.customerName}
                        </span>
                        <span className="text-xs">{order.customerFlag}</span>
                      </div>
                      <p className="font-label-sm text-label-sm text-[#444748]">
                        {order.customerCity} • {order.summaryText}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`px-2.5 py-0.5 rounded-full font-label-caps-sm text-label-caps-sm uppercase font-bold tracking-wider ${
                      order.status === 'Packed & Labeled'
                        ? 'bg-[#735c00] text-white'
                        : order.status === 'Tailoring Prep'
                        ? 'bg-[#e2e3e1] text-[#1a1c1b]'
                        : 'bg-black text-white'
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                <div className="bg-[#f4f4f2] rounded-lg p-3 flex items-center justify-between">
                  <div>
                    <p className="font-label-caps-sm text-label-caps-sm text-[#444748] uppercase tracking-wider">
                      Order Reference
                    </p>
                    <p className="font-body-sm text-body-sm font-semibold text-[#1a1c1b]">
                      {order.orderNumber}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-label-caps-sm text-label-caps-sm text-[#444748] uppercase tracking-wider">
                      Settled Total
                    </p>
                    <p className="font-body-sm text-body-sm font-semibold text-[#241a00]">
                      {order.settledTotalFormatted}{' '}
                      <span className="text-[#444748] text-[10px] font-normal">
                        ({order.paymentMethod})
                      </span>
                    </p>
                  </div>
                </div>

                {isSophia && (
                  <>
                    <div className="flex items-center justify-between py-1">
                      <div className="flex items-center gap-1.5 text-[#444748]">
                        <span className="material-symbols-outlined text-[16px] text-[#735c00]">
                          local_shipping
                        </span>
                        <span className="font-body-sm text-body-sm">
                          DHL Express:{' '}
                          <span className="font-semibold text-[#1a1c1b]">
                            {order.trackingNumber}
                          </span>
                        </span>
                      </div>
                      <span className="material-symbols-outlined text-[#735c00] text-[16px]">
                        verified
                      </span>
                    </div>
                    {/* Order 1 Action Buttons */}
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <button
                        onClick={() => setActiveInvoiceOrder(order)}
                        className="h-10 px-3 bg-[#e8e8e6] hover:bg-[#e2e3e1] rounded-lg text-[#1a1c1b] font-label-caps-md text-label-caps-md flex items-center justify-center gap-1.5 active:scale-95 transition-transform"
                      >
                        <span className="material-symbols-outlined text-[16px]">receipt_long</span>
                        <span>Invoice PDF</span>
                      </button>
                      <button
                        onClick={() => setActiveShipLabelOrder(order)}
                        className="h-10 px-3 bg-black hover:bg-neutral-800 text-white rounded-lg font-label-caps-md text-label-caps-md flex items-center justify-center gap-1.5 active:scale-95 transition-transform"
                      >
                        <span className="material-symbols-outlined text-[16px]">print</span>
                        <span>Ship Label</span>
                      </button>
                    </div>
                  </>
                )}

                {isAisha && (
                  <>
                    <div className="flex items-center gap-2 bg-[#ffe088]/40 p-2.5 rounded-lg text-[#241a00]">
                      <span className="material-symbols-outlined text-[18px] text-[#735c00] shrink-0">
                        straighten
                      </span>
                      <span className="font-body-sm text-body-sm font-medium leading-tight">
                        Custom Measurements Verified by Atelier Lead
                        {order.assignedArtisan && ` • Assigned: ${order.assignedArtisan}`}
                      </span>
                    </div>
                    <div className="pt-1">
                      <button
                        onClick={() => setActiveArtisanOrder(order)}
                        className="w-full h-10 bg-black hover:bg-neutral-800 text-white rounded-lg font-label-caps-md text-label-caps-md flex items-center justify-center gap-2 active:scale-95 transition-transform"
                      >
                        <span className="material-symbols-outlined text-[16px]">cut</span>
                        <span>
                          {order.assignedArtisan ? 'Reassign Master Artisan' : 'Assign Master Artisan'}
                        </span>
                      </button>
                    </div>
                  </>
                )}

                {!isSophia && !isAisha && (
                  <div className="flex items-center justify-between pt-1">
                    <span className="font-body-sm text-body-sm text-[#444748]">
                      Tracking: {order.trackingNumber}
                    </span>
                    <button
                      onClick={() => setActiveInvoiceOrder(order)}
                      className="px-3 py-1.5 bg-[#e8e8e6] rounded-lg text-xs font-semibold hover:bg-black hover:text-white transition-colors"
                    >
                      View Documents
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Multi-Warehouse Inventory & Reorder Monitor */}
      <section className="mt-6 px-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-headline-sm text-headline-sm font-semibold text-[#1a1c1b]">
              Warehouse Hubs
            </h2>
            <p className="font-label-sm text-label-sm text-[#444748]">
              Real-time stock reservation sync
            </p>
          </div>
          <button
            onClick={() => showToast('Full multi-vault inventory audit refreshed')}
            className="text-[#735c00] font-label-caps-md text-label-caps-md flex items-center gap-1 font-bold hover:underline"
          >
            <span>Full Audit</span>
            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </button>
        </div>

        {/* Warehouse Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {INITIAL_WAREHOUSES.map((wh) => (
            <div key={wh.id} className="bg-[#f4f4f2] p-3 rounded-xl flex flex-col gap-1 border border-black/[0.04]">
              <div className="flex items-center justify-between">
                <span className="font-label-caps-sm text-label-caps-sm text-[#444748] uppercase font-bold truncate">
                  {wh.name}
                </span>
                <span className="w-2 h-2 rounded-full bg-[#735c00]" />
              </div>
              <p className="font-headline-sm text-headline-sm font-semibold text-[#1a1c1b]">
                {wh.inStock.toLocaleString()}
              </p>
              <div className="flex items-center justify-between font-label-sm text-label-sm text-[#444748]">
                <span>In Stock</span>
                <span className="text-[#735c00] font-medium">{wh.held} Held</span>
              </div>
            </div>
          ))}
        </div>

        {/* Critical Low Stock Callout Card */}
        <div className="bg-[#40000a]/10 p-3 rounded-xl flex items-start gap-3 shadow-xs border border-[#ba1a1a]/20">
          <div className="w-8 h-8 rounded-full bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center shrink-0 mt-0.5">
            <span className="material-symbols-outlined text-[18px]">priority_high</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <span className="font-label-caps-sm text-label-caps-sm text-[#ba1a1a] font-bold uppercase tracking-wider">
                Critical Inventory Warning
              </span>
              <span className="font-label-caps-sm text-label-caps-sm text-[#444748]">DR-1001</span>
            </div>
            <p className="font-body-sm text-body-sm font-semibold text-[#1a1c1b] mt-0.5">
              Crimson Zari Handwoven Saree (Size M)
            </p>
            <p className="font-label-sm text-label-sm text-[#ba1a1a] font-medium mt-0.5">
              Only 2 units remain in global pool!
            </p>
            <button
              onClick={handleReorder}
              disabled={reorderState === 'loading'}
              className={`mt-2 w-full py-2 px-3 rounded-lg font-label-caps-md text-label-caps-md flex items-center justify-center gap-1.5 shadow-xs active:scale-95 transition-all text-white ${
                reorderState === 'done'
                  ? 'bg-[#735c00]'
                  : 'bg-black hover:bg-neutral-800'
              }`}
            >
              <span
                className={`material-symbols-outlined text-[15px] ${
                  reorderState === 'loading' ? 'animate-spin' : ''
                }`}
              >
                {reorderState === 'loading'
                  ? 'sync'
                  : reorderState === 'done'
                  ? 'check_circle'
                  : 'autorenew'}
              </span>
              <span>
                {reorderState === 'loading'
                  ? 'Guild Order Queued...'
                  : reorderState === 'done'
                  ? 'Reordered 25 Units (PO #8812)'
                  : 'Auto-Reorder From Artisan Weaver Guild'}
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Live Operational Audit Log Feed */}
      <section className="mt-6 px-4 flex flex-col gap-2">
        <div className="flex items-center justify-between mb-1">
          <h2 className="font-headline-sm text-headline-sm font-semibold text-[#1a1c1b]">
            Live Audit Stream
          </h2>
          <span className="font-label-caps-sm text-label-caps-sm text-[#444748] uppercase tracking-wider font-semibold">
            UTC Timezone
          </span>
        </div>

        <div className="bg-white rounded-xl p-3 shadow-xs flex flex-col gap-3 border border-black/[0.04]">
          {auditLogs.map((log, index) => (
            <React.Fragment key={log.id}>
              {index > 0 && <div className="h-[1px] bg-[#e8e8e6] w-full" />}
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-[#e8e8e6] text-[#1a1c1b] flex items-center justify-center shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[15px]">
                    {index % 2 === 0 ? 'currency_exchange' : 'sell'}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-body-sm text-body-sm font-semibold text-[#1a1c1b] truncate">
                      {log.user}
                    </span>
                    <span className="font-label-caps-sm text-label-caps-sm text-[#444748]">
                      {log.timeUTC}
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-[#444748] leading-tight mt-0.5">
                    {log.action}{' '}
                    {log.highlight && (
                      <span className="text-[#735c00] font-medium">{log.highlight}</span>
                    )}
                  </p>
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* Executive Quick Navigation Controls */}
      <section className="mt-5 px-4 flex flex-col gap-2">
        <p className="font-label-caps-sm text-label-caps-sm text-[#444748] uppercase tracking-wider font-semibold">
          Enterprise Controls
        </p>
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() =>
              showToast('RBAC Roles: SuperAdmin, Atelier Director, Master Artisan active')
            }
            className="bg-white p-3 rounded-xl flex flex-col items-center justify-center gap-1 shadow-xs hover:bg-[#e8e8e6] active:scale-95 transition-all border border-black/[0.04]"
          >
            <span className="material-symbols-outlined text-[20px] text-[#1a1c1b]">
              admin_panel_settings
            </span>
            <span className="font-label-caps-sm text-label-caps-sm text-[#1a1c1b] font-semibold">
              RBAC Roles
            </span>
          </button>
          <button
            onClick={() =>
              showToast('Tax Engine: Harmonized System (HS) Code 5007.20 DDP Active')
            }
            className="bg-white p-3 rounded-xl flex flex-col items-center justify-center gap-1 shadow-xs hover:bg-[#e8e8e6] active:scale-95 transition-all border border-black/[0.04]"
          >
            <span className="material-symbols-outlined text-[20px] text-[#1a1c1b]">
              account_balance
            </span>
            <span className="font-label-caps-sm text-label-caps-sm text-[#1a1c1b] font-semibold">
              Tax Engine
            </span>
          </button>
          <button
            onClick={() =>
              showToast('Currency Config: Auto-syncing rates via European Central Bank API')
            }
            className="bg-white p-3 rounded-xl flex flex-col items-center justify-center gap-1 shadow-xs hover:bg-[#e8e8e6] active:scale-95 transition-all border border-black/[0.04]"
          >
            <span className="material-symbols-outlined text-[20px] text-[#1a1c1b]">
              finance_mode
            </span>
            <span className="font-label-caps-sm text-label-caps-sm text-[#1a1c1b] font-semibold">
              Currency Config
            </span>
          </button>
        </div>
      </section>
    </div>
  );
};
