import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const LogisticsPortal: React.FC = () => {
  const {
    orders,
    updateOrderStatus,
    setActiveShipLabelOrder,
    setCurrentScreen,
    showToast,
    isAdmin,
    currentUser,
    quickLoginAdmin,
    setIsAuthModalOpen,
    setAuthModalMode
  } = useApp();

  const [selectedCourier, setSelectedCourier] = useState('DHL Express Worldwide');
  const [scannedAwb, setScannedAwb] = useState('');
  const [filterStatus, setFilterStatus] = useState<'All' | 'PACKED' | 'SHIPPED' | 'OUT FOR DELIVERY'>('All');

  if (!isAdmin) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center p-4 bg-[#f4f4f2] text-[#1a1c1b]">
        <div className="w-full max-w-xl bg-white rounded-3xl border border-black/10 shadow-2xl p-8 sm:p-10 text-center">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 text-[#735c00] border border-amber-200 flex items-center justify-center mx-auto mb-4">
            <span className="material-symbols-outlined text-[36px]">local_shipping</span>
          </div>
          <span className="inline-block px-3 py-1 rounded-full bg-amber-100 text-[#735c00] text-[11px] font-bold uppercase tracking-wider mb-2">
            Restricted Logistics Console
          </span>
          <h1 className="font-headline-sm text-2xl font-bold tracking-tight text-[#1a1c1b]">
            Administrator Clearance Required
          </h1>
          <p className="text-gray-600 text-xs sm:text-sm max-w-md mx-auto mt-2 leading-relaxed">
            International Air Waybill manifests, customs filings, and courier dispatches are accessible only to administrators.
          </p>
          <div className="my-5 p-4 rounded-2xl bg-[#f9f9f7] text-left text-xs space-y-2 border border-black/5">
            <div className="flex justify-between">
              <span className="text-gray-500">Current User:</span>
              <span className="font-semibold">{currentUser ? currentUser.fullName : 'Guest'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Admin Authority:</span>
              <span className="font-bold text-[#735c00]">Yashwanth (yashwanthk2004k@gmail.com)</span>
            </div>
          </div>
          <div className="space-y-2.5">
            <button
              onClick={() => setCurrentScreen('discover')}
              className="w-full py-3 bg-[#1a1c1b] text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-black transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">storefront</span>
              <span>Return to Store &amp; My Account</span>
            </button>
            <button
              onClick={() => {
                setAuthModalMode('login');
                setIsAuthModalOpen(true);
              }}
              className="w-full py-2.5 border border-gray-300 rounded-xl text-xs font-semibold uppercase tracking-wider hover:border-black transition-all"
            >
              Administrator Sign In
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleSimulateScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!scannedAwb) return;
    const match = orders.find((o) => o.trackingNumber?.includes(scannedAwb) || o.orderNumber.includes(scannedAwb));
    if (match) {
      updateOrderStatus(match.id, 'SHIPPED');
      showToast(`Air Waybill ${scannedAwb} scanned: Manifested with ${selectedCourier}`);
      setScannedAwb('');
    } else {
      showToast('Scanned barcode not recognized in current shipping run.');
    }
  };

  return (
    <div className="flex flex-col w-full pb-28 pt-2 max-w-5xl mx-auto px-4 text-[#1a1c1b]">
      {/* Logistics Banner */}
      <div className="bg-[#1a1c1b] text-white rounded-2xl p-6 mb-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-label-caps-md text-xs uppercase tracking-widest text-[#fed65b] font-bold">
                International Logistics &amp; DDP Hub
              </span>
            </div>
            <h1 className="font-headline-sm text-2xl font-bold tracking-tight mt-1">
              Cross-Border Dispatch Console
            </h1>
            <p className="text-xs text-gray-400 mt-1">
              Pre-cleared Customs (DDP) • Automated Air Waybills • Thermal Label Generation
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentScreen('admin')}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-xs font-semibold rounded-xl border border-white/20"
            >
              Admin ERP
            </button>
            <button
              onClick={() => setCurrentScreen('discover')}
              className="px-4 py-2 bg-[#fed65b] text-black text-xs font-bold rounded-xl"
            >
              Customer Store
            </button>
          </div>
        </div>

        {/* Courier Selector Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-white/10 mt-6 text-xs">
          {[
            { name: 'DHL Express Worldwide', code: 'DHL', zone: 'USA, UK, EU, UAE', eta: '3-5 Days' },
            { name: 'Blue Dart Apex Express', code: 'BD', zone: 'India Domestic', eta: '1-2 Days' },
            { name: 'FedEx Priority International', code: 'FDX', zone: 'Americas & APAC', eta: '2-4 Days' },
            { name: 'Aramex GCC Cross-Border', code: 'ARX', zone: 'Middle East', eta: '3-5 Days' }
          ].map((c) => (
            <div
              key={c.name}
              onClick={() => {
                setSelectedCourier(c.name);
                showToast(`Default dispatch courier set to ${c.name}`);
              }}
              className={`p-3 rounded-xl cursor-pointer border transition-all ${
                selectedCourier === c.name
                  ? 'bg-[#fed65b] text-black border-[#fed65b] font-bold shadow-md'
                  : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/10'
              }`}
            >
              <span className="font-mono text-xs uppercase block">{c.code}</span>
              <p className="font-bold text-xs mt-0.5 truncate">{c.name}</p>
              <p className="text-[10px] opacity-80 mt-0.5">{c.eta} • {c.zone}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Barcode Scanner Simulator */}
      <div className="bg-white rounded-2xl border border-black/5 p-5 shadow-xs mb-6">
        <h2 className="font-bold text-sm text-black mb-1">Handheld Barcode Dispatch Scanner</h2>
        <p className="text-xs text-gray-500 mb-4">
          Scan Air Waybill or Order Number barcode to instantly manifest and dispatch packages to DHL courier lockbox.
        </p>

        <form onSubmit={handleSimulateScan} className="flex gap-2">
          <div className="relative flex-1">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[18px]">
              barcode_scanner
            </span>
            <input
              type="text"
              placeholder="Scan or type AWB (e.g. DHL-984029410 or MST-ORD-2026-000493)..."
              className="w-full pl-9 pr-3 py-2.5 bg-[#f9f9f7] rounded-xl border border-gray-200 text-xs font-mono outline-none"
              value={scannedAwb}
              onChange={(e) => setScannedAwb(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 bg-black text-white text-xs font-bold rounded-xl hover:bg-neutral-800 shrink-0"
          >
            Scan &amp; Dispatch
          </button>
        </form>
      </div>

      {/* Dispatch Manifest Queue */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-sm text-black uppercase tracking-wider">
            Consignment Dispatch Queue
          </h2>
          <div className="flex gap-1 bg-[#e8e8e6] p-1 rounded-xl text-xs">
            {['All', 'PACKED', 'SHIPPED', 'OUT FOR DELIVERY'].map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st as any)}
                className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                  filterStatus === st ? 'bg-white text-black font-bold shadow-xs' : 'text-gray-600'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {orders
            .filter((o) => (filterStatus === 'All' ? true : o.status === filterStatus))
            .map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-2xl border border-black/5 p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-sm text-black">{order.orderNumber}</span>
                    <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                      {order.status}
                    </span>
                    <span className="bg-blue-50 text-blue-800 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                      DDP Cleared
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Consignee: <strong className="text-black">{order.customerName}</strong> ({order.customerCity || order.customerCountry}) • Courier:{' '}
                    <strong className="text-black">{order.courierName || 'DHL Express Worldwide'}</strong>
                  </p>
                  <p className="font-mono text-xs text-gray-600 mt-0.5">
                    Air Waybill: <strong className="text-black">{order.trackingNumber || 'DHL-GLOBAL-481902'}</strong>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveShipLabelOrder(order)}
                    className="px-3 py-1.5 bg-[#f9f9f7] border border-gray-200 rounded-xl text-xs font-semibold text-black hover:bg-gray-100 flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[16px]">print</span>
                    <span>Print 4x6 Label</span>
                  </button>
                  <button
                    onClick={() => {
                      updateOrderStatus(order.id, 'SHIPPED');
                      showToast(`Order ${order.orderNumber} dispatched with tracking updates sent to customer`);
                    }}
                    className="px-4 py-1.5 bg-black text-white text-xs font-bold rounded-xl hover:bg-neutral-800"
                  >
                    Mark Handed to Courier
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
