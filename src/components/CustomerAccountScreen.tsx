import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AVATAR_PROFILE_URL } from '../data/mockData';

export const CustomerAccountScreen: React.FC = () => {
  const {
    orders,
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
    quickLoginCustomer,
    logout
  } = useApp();

  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'returns' | 'tickets' | 'profile'>('orders');
  const [selectedOrderDetails, setSelectedOrderDetails] = useState<any | null>(null);

  // Return modal state
  const [returnOrderId, setReturnOrderId] = useState<string | null>(null);
  const [returnReason, setReturnReason] = useState('Fit/Size issue');
  const [returnDesc, setReturnDesc] = useState('');

  // Support ticket state
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketCategory, setTicketCategory] = useState('Order & Delivery Status');
  const [ticketMessage, setTicketMessage] = useState('');
  const [ticketsList, setTicketsList] = useState([
    {
      id: 'tkt-1',
      number: 'MST-TKT-9921',
      category: 'Delivery Schedule',
      status: 'OPEN',
      date: 'Today, 2:15 PM',
      messages: [
        { sender: 'You', text: 'Kindly verify if delivery before March 15 is guaranteed for New York wedding.' },
        { sender: 'MST Concierge (Sanjana)', text: 'Your order is booked under DHL Express Priority with DDP cleared. Scheduled delivery is March 12.' }
      ]
    }
  ]);

  // Saved addresses state (Section 16)
  const [addresses, setAddresses] = useState([
    {
      id: 'addr-1',
      label: 'Home (Primary Shipping)',
      name: 'Priya Sharma',
      mobile: '+91 98201 54321',
      line1: 'B-402, Imperial Heights, Worli Sea Face',
      city: 'Mumbai',
      state: 'Maharashtra',
      postalCode: '400018',
      country: 'India',
      isDefault: true
    },
    {
      id: 'addr-2',
      label: 'Overseas Residence (USA)',
      name: 'Priya Sharma',
      mobile: '+1 (212) 555-0198',
      line1: '742 Park Avenue, Apt 11B',
      city: 'New York',
      state: 'NY',
      postalCode: '10021',
      country: 'United States',
      isDefault: false
    }
  ]);

  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [newAddr, setNewAddr] = useState({
    label: 'Office',
    name: '',
    mobile: '',
    line1: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'India'
  });

  const handleCreateReturn = () => {
    if (!returnOrderId) return;
    showToast(`Return Request registered for ${returnOrderId}. Courier pickup arranged in 24-48 hours.`);
    setReturnOrderId(null);
    setReturnDesc('');
  };

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketMessage) return;
    const newTkt = {
      id: 'tkt-' + Date.now(),
      number: 'MST-TKT-' + Math.floor(9900 + Math.random() * 99),
      category: ticketCategory,
      status: 'OPEN',
      date: 'Just now',
      messages: [{ sender: 'You', text: ticketMessage }]
    };
    setTicketsList([newTkt, ...ticketsList]);
    setTicketMessage('');
    setTicketSubject('');
    showToast(`Support Ticket ${newTkt.number} created. Dedicated concierge assigned.`);
  };

  return (
    <div className="flex flex-col w-full pb-28 pt-2 max-w-5xl mx-auto px-4">
      {/* Customer Header Card */}
      <div className="bg-gradient-to-r from-[#1a1c1b] via-[#2c2820] to-[#1a1c1b] text-white rounded-2xl p-6 mb-6 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 opacity-10 pointer-events-none flex items-center pr-6">
          <span className="material-symbols-outlined text-[140px]">loyalty</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#fed65b] text-black font-bold text-xl flex items-center justify-center ring-2 ring-[#fed65b] overflow-hidden">
              {currentUser?.avatar ? (
                <img src={currentUser.avatar} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <span>{currentUser?.fullName?.charAt(0) || 'M'}</span>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-headline-sm text-xl font-bold tracking-tight">
                  {currentUser?.fullName || 'Guest Client'}
                </h1>
                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                  isAdmin ? 'bg-[#fed65b] text-black' : 'bg-white/20 text-white'
                }`}>
                  {isAdmin ? 'Super Administrator' : 'Heritage VIP Collector'}
                </span>
              </div>
              <p className="text-gray-300 text-xs mt-0.5">
                {currentUser?.email || 'No email registered'} • {currentUser?.mobile || '+91 98201 54321'}
              </p>
              <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-[#fed65b]">
                <span>Lifetime Spend: ₹2,45,000</span>
                <span>•</span>
                <span>Loyalty Points: 1,420 pts</span>
                {isAdmin && (
                  <>
                    <span>•</span>
                    <button
                      onClick={() => quickLoginCustomer()}
                      className="underline hover:text-white transition-colors text-[11px]"
                      title="Preview portal as normal customer"
                    >
                      Preview as Customer
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap sm:flex-col items-start sm:items-end gap-2">
            {isAdmin && (
              <button
                onClick={() => setCurrentScreen('admin')}
                className="px-4 py-2 rounded-xl bg-[#fed65b] text-black hover:bg-[#eec64b] text-xs font-bold tracking-wider uppercase transition-colors flex items-center gap-2 shadow-sm"
              >
                <span className="material-symbols-outlined text-[16px]">admin_panel_settings</span>
                <span>Open Admin ERP</span>
              </button>
            )}

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setAuthModalMode('login');
                  setIsAuthModalOpen(true);
                }}
                className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-[11px] font-medium tracking-wider uppercase transition-colors"
              >
                {currentUser ? 'Switch Account' : 'Sign In'}
              </button>
              {currentUser && (
                <button
                  onClick={() => logout()}
                  className="px-3 py-1.5 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-300 text-[11px] font-medium tracking-wider uppercase transition-colors"
                >
                  Sign Out
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 overflow-x-auto pt-6 border-t border-white/10 mt-6 scrollbar-none">
          {[
            { id: 'orders', label: 'My Orders', icon: 'package_2' },
            { id: 'addresses', label: 'Saved Addresses', icon: 'location_on' },
            { id: 'returns', label: 'Returns & Refunds', icon: 'assignment_return' },
            { id: 'tickets', label: 'Concierge Helpdesk', icon: 'support_agent' },
            { id: 'profile', label: 'Profile & Security', icon: 'manage_accounts' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-[#fed65b] text-black shadow-md'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* TAB 1: MY ORDERS */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-headline-sm text-base font-bold uppercase tracking-wider text-black">
              Order History &amp; Live Tracking
            </h2>
            <span className="text-xs text-gray-500">{orders.length} orders recorded</span>
          </div>

          {orders.map((order) => {
            const isDelivered = order.status === 'Delivered' || order.status === 'DELIVERED';
            const statusColor = isDelivered
              ? 'bg-emerald-100 text-emerald-800'
              : order.status.includes('CANCELLED')
              ? 'bg-red-100 text-red-800'
              : 'bg-amber-100 text-amber-800';

            return (
              <div
                key={order.id}
                className="bg-white rounded-2xl border border-black/5 shadow-xs p-5 hover:border-black/15 transition-all"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-gray-100 gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-bold text-black">{order.orderNumber}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${statusColor}`}>
                        {order.status}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Placed on {order.orderDate ? new Date(order.orderDate).toLocaleDateString('en-GB') : '28 Feb 2026'} • Destination: {order.customerCity || 'Mumbai, IN'}
                    </p>
                  </div>
                  <div className="text-left md:text-right">
                    <p className="text-sm font-bold text-black">{order.settledTotalFormatted}</p>
                    <p className="text-[11px] text-gray-500">Paid via {order.paymentMethod}</p>
                  </div>
                </div>

                {/* Tracking Progress Pipeline (Section 24) */}
                <div className="py-4">
                  <div className="relative flex items-center justify-between">
                    <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-gray-200 z-0" />
                    <div
                      className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-black z-0 transition-all duration-500"
                      style={{
                        width: isDelivered ? '100%' : order.status.includes('SHIPPED') ? '75%' : '40%'
                      }}
                    />
                    {[
                      { step: 'Confirmed', icon: 'check_circle', active: true },
                      { step: 'Tailoring & QC', icon: 'inventory_2', active: true },
                      { step: 'Dispatched (DHL)', icon: 'local_shipping', active: order.status.includes('SHIPPED') || isDelivered },
                      { step: 'Delivered', icon: 'home', active: isDelivered }
                    ].map((st, i) => (
                      <div key={i} className="flex flex-col items-center relative z-10">
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center text-xs ${
                            st.active ? 'bg-black text-white' : 'bg-gray-200 text-gray-400'
                          }`}
                        >
                          <span className="material-symbols-outlined text-[14px]">{st.icon}</span>
                        </div>
                        <span className="text-[10px] font-medium text-gray-600 mt-1 whitespace-nowrap">
                          {st.step}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Courier and Air Waybill details */}
                <div className="bg-[#f9f9f7] rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px] text-[#735c00]">flight_takeoff</span>
                    <span>
                      Carrier: <strong className="text-black">{order.courierName || 'DHL Express Worldwide'}</strong> (Air Waybill: <strong className="text-black font-mono">{order.trackingNumber || 'DHL-984029410'}</strong>)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveShipLabelOrder(order)}
                      className="px-3 py-1 bg-white border border-gray-200 rounded-lg text-black font-medium hover:bg-gray-50 flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[14px]">qr_code</span>
                      <span>Air Waybill</span>
                    </button>
                    <button
                      onClick={() => setActiveInvoiceOrder(order)}
                      className="px-3 py-1 bg-black text-white rounded-lg font-medium hover:bg-neutral-800 flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[14px]">receipt</span>
                      <span>Download Tax Invoice</span>
                    </button>
                    <button
                      onClick={() => setReturnOrderId(order.orderNumber)}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[14px]">assignment_return</span>
                      <span>Return / Exchange</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* TAB 2: SAVED ADDRESSES */}
      {activeTab === 'addresses' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-headline-sm text-base font-bold uppercase tracking-wider text-black">
              Address Book
            </h2>
            <button
              onClick={() => setIsAddingAddress(!isAddingAddress)}
              className="px-3 py-1.5 bg-black text-white text-xs font-semibold rounded-lg hover:bg-neutral-800 flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[14px]">add</span>
              <span>Add New Address</span>
            </button>
          </div>

          {isAddingAddress && (
            <div className="bg-white rounded-2xl border border-black/10 p-5 shadow-md">
              <h3 className="font-bold text-sm mb-3">Add Global Shipping Address</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="p-2.5 bg-[#f9f9f7] rounded-lg border border-gray-200 outline-none"
                  value={newAddr.name}
                  onChange={(e) => setNewAddr({ ...newAddr, name: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Mobile Phone (+ Country Code)"
                  className="p-2.5 bg-[#f9f9f7] rounded-lg border border-gray-200 outline-none"
                  value={newAddr.mobile}
                  onChange={(e) => setNewAddr({ ...newAddr, mobile: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Flat, House No., Building, Street"
                  className="p-2.5 bg-[#f9f9f7] rounded-lg border border-gray-200 outline-none sm:col-span-2"
                  value={newAddr.line1}
                  onChange={(e) => setNewAddr({ ...newAddr, line1: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="City"
                  className="p-2.5 bg-[#f9f9f7] rounded-lg border border-gray-200 outline-none"
                  value={newAddr.city}
                  onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="State / Province"
                  className="p-2.5 bg-[#f9f9f7] rounded-lg border border-gray-200 outline-none"
                  value={newAddr.state}
                  onChange={(e) => setNewAddr({ ...newAddr, state: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Postal Code / ZIP"
                  className="p-2.5 bg-[#f9f9f7] rounded-lg border border-gray-200 outline-none"
                  value={newAddr.postalCode}
                  onChange={(e) => setNewAddr({ ...newAddr, postalCode: e.target.value })}
                />
                <select
                  className="p-2.5 bg-[#f9f9f7] rounded-lg border border-gray-200 outline-none"
                  value={newAddr.country}
                  onChange={(e) => setNewAddr({ ...newAddr, country: e.target.value })}
                >
                  <option value="India">India</option>
                  <option value="United States">United States</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="United Arab Emirates">United Arab Emirates</option>
                  <option value="Singapore">Singapore</option>
                  <option value="Malaysia">Malaysia</option>
                  <option value="Australia">Australia</option>
                  <option value="Canada">Canada</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => setIsAddingAddress(false)}
                  className="px-4 py-2 bg-gray-100 text-xs font-semibold rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (!newAddr.name || !newAddr.line1) return;
                    setAddresses([
                      ...addresses,
                      {
                        id: 'addr-' + Date.now(),
                        ...newAddr,
                        isDefault: false
                      }
                    ]);
                    setIsAddingAddress(false);
                    showToast('Address added to your address book');
                  }}
                  className="px-4 py-2 bg-black text-white text-xs font-semibold rounded-lg"
                >
                  Save Address
                </button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {addresses.map((addr) => (
              <div
                key={addr.id}
                className="bg-white rounded-2xl border border-black/5 p-5 relative shadow-xs"
              >
                {addr.isDefault && (
                  <span className="absolute top-4 right-4 bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                    Default Shipping
                  </span>
                )}
                <span className="font-label-caps-sm text-xs font-bold text-gray-500 uppercase tracking-wider">
                  {addr.label}
                </span>
                <p className="font-bold text-sm text-black mt-1">{addr.name}</p>
                <p className="text-xs text-gray-600 mt-0.5">{addr.line1}</p>
                <p className="text-xs text-gray-600">
                  {addr.city}, {addr.state} {addr.postalCode}
                </p>
                <p className="text-xs text-black font-semibold mt-1">{addr.country}</p>
                <p className="text-xs text-gray-500 mt-1">Phone: {addr.mobile}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: RETURNS & REFUNDS (Section 44, 45, 46) */}
      {activeTab === 'returns' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-black/5 p-6 shadow-xs">
            <h2 className="font-headline-sm text-base font-bold uppercase tracking-wider text-black mb-2">
              Atelier Returns &amp; Exchange Policy
            </h2>
            <p className="text-xs text-gray-600 leading-relaxed">
              We offer complimentary doorstep pickup across India, USA, UK, UAE, and Singapore within 7 days of delivery.
              Items must be unworn, in pristine condition with security tag intact and original wooden packaging.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-gray-100 text-center">
              <div className="p-3 bg-[#f9f9f7] rounded-xl">
                <span className="material-symbols-outlined text-[20px] text-[#735c00]">edit_calendar</span>
                <p className="text-xs font-bold text-black mt-1">1. Request</p>
                <p className="text-[11px] text-gray-500">Initiate online in 60s</p>
              </div>
              <div className="p-3 bg-[#f9f9f7] rounded-xl">
                <span className="material-symbols-outlined text-[20px] text-[#735c00]">local_shipping</span>
                <p className="text-xs font-bold text-black mt-1">2. Doorstep Pickup</p>
                <p className="text-[11px] text-gray-500">DHL / Blue Dart courier</p>
              </div>
              <div className="p-3 bg-[#f9f9f7] rounded-xl">
                <span className="material-symbols-outlined text-[20px] text-[#735c00]">verified</span>
                <p className="text-xs font-bold text-black mt-1">3. Master QC</p>
                <p className="text-[11px] text-gray-500">Inspected at Atelier</p>
              </div>
              <div className="p-3 bg-[#f9f9f7] rounded-xl">
                <span className="material-symbols-outlined text-[20px] text-[#735c00]">payments</span>
                <p className="text-xs font-bold text-black mt-1">4. Instant Refund</p>
                <p className="text-[11px] text-gray-500">Back to original card/UPI</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-black/5 p-5 shadow-xs">
            <h3 className="font-bold text-sm mb-3">Active &amp; Past Return Requests</h3>
            <div className="border border-gray-100 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div>
                <span className="font-mono font-bold text-black">MST-RET-2026-000184</span>
                <span className="ml-2 bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Refund Processed
                </span>
                <p className="text-gray-600 mt-1">Order #MST-ORD-2026-000492 • Reason: Custom blouse adjustment</p>
              </div>
              <div className="text-left sm:text-right">
                <p className="font-bold text-black">₹42,500 ($510.00 USD)</p>
                <p className="text-[11px] text-emerald-600 font-medium">Credited to AMEX ending 9012</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: CONCIERGE HELPDESK & SUPPORT TICKETS (Section 51) */}
      {activeTab === 'tickets' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-black/5 p-6 shadow-xs">
            <h2 className="font-headline-sm text-base font-bold uppercase tracking-wider text-black mb-1">
              Live Bespoke Concierge
            </h2>
            <p className="text-xs text-gray-600 mb-4">
              Connect with our master drapers, sizing consultants, or shipment clearance coordinators.
            </p>

            <form onSubmit={handleCreateTicket} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-gray-600 font-medium mb-1">Issue Category</label>
                  <select
                    className="w-full p-2.5 bg-[#f9f9f7] rounded-lg border border-gray-200 outline-none"
                    value={ticketCategory}
                    onChange={(e) => setTicketCategory(e.target.value)}
                  >
                    <option value="Order & Delivery Status">Order &amp; Delivery Status</option>
                    <option value="Bespoke Sizing & Blouse Fit">Bespoke Sizing &amp; Blouse Fit</option>
                    <option value="Customs & DDP Inquiries">Customs &amp; DDP Inquiries</option>
                    <option value="Returns & Exchanges">Returns &amp; Exchanges</option>
                    <option value="Bridal Trousseau Consultation">Bridal Trousseau Consultation</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-600 font-medium mb-1">Order Reference (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. #MST-ORD-2026-000493"
                    className="w-full p-2.5 bg-[#f9f9f7] rounded-lg border border-gray-200 outline-none"
                    value={ticketSubject}
                    onChange={(e) => setTicketSubject(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-600 text-xs font-medium mb-1">Your Message to Concierge</label>
                <textarea
                  rows={3}
                  placeholder="Describe your inquiry or sizing requirements..."
                  className="w-full p-2.5 bg-[#f9f9f7] rounded-lg border border-gray-200 outline-none text-xs"
                  value={ticketMessage}
                  onChange={(e) => setTicketMessage(e.target.value)}
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-black text-white text-xs font-semibold rounded-lg hover:bg-neutral-800 flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[16px]">send</span>
                  <span>Submit Ticket</span>
                </button>
              </div>
            </form>
          </div>

          {/* Ticket List */}
          <div className="space-y-3">
            {ticketsList.map((t) => (
              <div key={t.id} className="bg-white rounded-2xl border border-black/5 p-5 shadow-xs">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs text-black">{t.number}</span>
                    <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {t.status}
                    </span>
                  </div>
                  <span className="text-[11px] text-gray-400">{t.date}</span>
                </div>

                <div className="pt-3 space-y-2">
                  {t.messages.map((m, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-xl text-xs ${
                        m.sender === 'You' ? 'bg-[#f4f4f2] text-black ml-4' : 'bg-amber-50 text-amber-900 mr-4 border border-amber-200/50'
                      }`}
                    >
                      <span className="font-bold block text-[10px] text-gray-500 uppercase tracking-wider mb-0.5">
                        {m.sender}
                      </span>
                      {m.text}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: PROFILE & SECURITY */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-2xl border border-black/5 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div>
              <h2 className="font-headline-sm text-base font-bold uppercase tracking-wider text-black">
                Personal Details &amp; Access Roles
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Manage your credentials, international shipping defaults, and security permissions.
              </p>
            </div>
            <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
              isAdmin ? 'bg-[#fed65b] text-black' : 'bg-gray-100 text-gray-700'
            }`}>
              {currentUser?.role?.replace('_', ' ') || 'Customer'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-gray-500 font-medium mb-1">Full Legal Name</label>
              <input
                type="text"
                defaultValue={currentUser?.fullName || 'Priya Sharma'}
                className="w-full p-2.5 bg-[#f9f9f7] rounded-lg border border-gray-200 outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-500 font-medium mb-1">Email Address</label>
              <input
                type="email"
                readOnly
                defaultValue={currentUser?.email || 'priya.sharma@example.com'}
                className="w-full p-2.5 bg-gray-100 rounded-lg border border-gray-200 text-gray-600 outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-500 font-medium mb-1">Primary Mobile Number</label>
              <input
                type="text"
                defaultValue={currentUser?.mobile || '+91 98201 54321'}
                className="w-full p-2.5 bg-[#f9f9f7] rounded-lg border border-gray-200 outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-500 font-medium mb-1">Default Country of Delivery</label>
              <select className="w-full p-2.5 bg-[#f9f9f7] rounded-lg border border-gray-200 outline-none">
                <option>India (GST 5% Apparel)</option>
                <option>United States (State Sales Tax &amp; DDP)</option>
                <option>United Kingdom (20% VAT)</option>
                <option>United Arab Emirates (5% VAT)</option>
                <option>Singapore (9% GST)</option>
              </select>
            </div>
          </div>

          {isAdmin && (
            <div className="p-4 rounded-xl bg-[#f9f9f7] border border-gray-200 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="font-bold block text-black">Administrator Access</span>
                <p className="text-gray-500 text-[11px]">
                  Super Administrator privileges active for {currentUser?.email}. Access to full Atelier ERP and Logistics console.
                </p>
              </div>
              <button
                onClick={() => setCurrentScreen('admin')}
                className="px-4 py-2 bg-black text-white text-xs font-semibold rounded-lg hover:bg-neutral-800 shrink-0"
              >
                Launch Admin ERP
              </button>
            </div>
          )}

          <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
            <button
              onClick={() => logout()}
              className="text-xs text-red-600 hover:text-red-800 font-medium"
            >
              Sign Out of This Device
            </button>

            <button
              onClick={() => showToast('Profile preferences saved successfully')}
              className="px-5 py-2.5 bg-black text-white text-xs font-semibold rounded-lg hover:bg-neutral-800"
            >
              Save Profile Updates
            </button>
          </div>
        </div>
      )}

      {/* Return Request Modal */}
      {returnOrderId && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-bold text-sm text-black">Request Return / Exchange</h3>
              <button onClick={() => setReturnOrderId(null)} className="text-gray-400 hover:text-black">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <p className="text-xs text-gray-500">
              Initiating return for Order <strong className="text-black font-mono">{returnOrderId}</strong>.
            </p>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-gray-600 font-medium mb-1">Reason for Return</label>
                <select
                  className="w-full p-2.5 bg-[#f9f9f7] rounded-lg border border-gray-200 outline-none"
                  value={returnReason}
                  onChange={(e) => setReturnReason(e.target.value)}
                >
                  <option value="Fit/Size issue">Fit / Sizing doesn't match measurements</option>
                  <option value="Color variance">Color differs slightly under natural light</option>
                  <option value="Defect or transit crease">Transit crease or fabric flaw</option>
                  <option value="Event postponed">Event postponed or no longer required</option>
                  <option value="Exchange for another weave">Exchange for another Master Handloom</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-600 font-medium mb-1">Additional Notes</label>
                <textarea
                  rows={3}
                  placeholder="Provide any specific instructions for our Quality team..."
                  className="w-full p-2.5 bg-[#f9f9f7] rounded-lg border border-gray-200 outline-none text-xs"
                  value={returnDesc}
                  onChange={(e) => setReturnDesc(e.target.value)}
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setReturnOrderId(null)}
                className="px-4 py-2 bg-gray-100 text-xs font-semibold rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateReturn}
                className="px-4 py-2 bg-black text-white text-xs font-semibold rounded-lg"
              >
                Confirm Return Pickup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
