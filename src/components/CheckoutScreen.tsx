import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const CheckoutScreen: React.FC = () => {
  const {
    cart,
    cartSubtotalINR,
    promoDiscountRatio,
    promoCode,
    addOrder,
    clearCart,
    setCurrentScreen,
    setCompletedOrderModal,
    showToast
  } = useApp();

  const [isSummaryOpen, setIsSummaryOpen] = useState(true);
  const [isNewAddressOpen, setIsNewAddressOpen] = useState(false);
  const [shippingMethod, setShippingMethod] = useState<'dhl' | 'standard'>('dhl');
  const [selectedGateway, setSelectedGateway] = useState<'stripe' | 'razorpay' | 'paypal'>('stripe');

  // Address fields for new address
  const [newRecipient, setNewRecipient] = useState({
    country: 'United Kingdom (UK)',
    firstName: '',
    lastName: '',
    postalCode: ''
  });

  const [cardDetails, setCardDetails] = useState({
    number: '•••• •••• •••• 9012',
    expiry: '08 / 28',
    cvv: '•••',
    name: 'Priya Sharma'
  });

  const [upiVpa, setUpiVpa] = useState('priyasharma@okaxis');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Financial calculations
  // Default values matching screen 4 if standard items, or calculated from cart
  const subtotalUSD = cartSubtotalINR > 0 ? (cartSubtotalINR / 83.45) : 452.50;
  const discountUSD = subtotalUSD * (promoDiscountRatio > 0 ? promoDiscountRatio : 0.10);
  const dutiesUSD = 38.50;
  const totalUSD = (subtotalUSD - discountUSD + dutiesUSD).toFixed(2);
  const totalINR = Math.round(parseFloat(totalUSD) * 83.20).toLocaleString('en-IN');

  const handlePlaceOrder = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const newOrderNum = `#MST-ORD-2026-000${Math.floor(493 + Math.random() * 50)}`;
      const placedOrder = {
        id: `ord-${Date.now()}`,
        orderNumber: newOrderNum,
        customerName: 'Priya Sharma',
        customerAvatar:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuA7J90lcN8ncOCX1bddpWYOnoGMCTapShZOEyrbi37WzwrcbsfciMcaIqYUFL-F-_vFxlfRVMyzszSzoaNafWm13APEKEY3ih8ysSC5kEEN7xgojNeBLCRyjr4UtGigHeqKBQs-OuC6W0u_k0W8o2l3A9pFKKgqaioXjwW6bDvrZyxkeftEzdRoH8YZBL_vf4ehjWGOWWVnniQ7xzcAPGWal0mzqvkkeX3vRtXTPxe7OE8bNMPDFxWd',
        customerCountry: 'United States',
        customerFlag: '🇺🇸',
        customerCity: 'New York, US',
        itemCount: cart.length || 2,
        summaryText: `${cart.length || 2} Haute Items (Tracked DDP)`,
        status: 'Packed & Labeled' as const,
        settledTotalFormatted: `$${totalUSD} USD`,
        paymentMethod:
          selectedGateway === 'stripe'
            ? 'Stripe Global / AMEX'
            : selectedGateway === 'razorpay'
            ? 'Razorpay UPI'
            : 'PayPal Direct',
        trackingNumber: `#98234${Math.floor(10000 + Math.random() * 90000)}`,
        isBespokeVerified: true
      };

      addOrder(placedOrder);
      clearCart();
      setCompletedOrderModal({
        orderNumber: newOrderNum,
        totalFormatted: `$${totalUSD} USD`
      });
      showToast(`Order ${newOrderNum} confirmed with DDP customs guarantee.`);
    }, 1500);
  };

  return (
    <div className="flex flex-col w-full pb-32 text-[#1a1c1b] max-w-3xl mx-auto">
      {/* Editorial Luxury Step Tracker */}
      <section className="w-full bg-[#f4f4f2] px-5 py-4 border-b border-black/[0.04]">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between text-[#1a1c1b]">
            <span className="font-label-caps-md text-label-caps-md tracking-widest text-[#735c00] font-semibold">
              STAGE 01 / 03
            </span>
            <div className="flex items-center gap-1.5 text-[#444748] font-label-caps-sm text-label-caps-sm">
              <span className="material-symbols-outlined text-[14px] text-[#735c00]">lock</span>
              <span>256-BIT ENCRYPTION</span>
            </div>
          </div>
          {/* Progress Bar Track */}
          <div className="w-full h-[2px] bg-[#e8e8e6] flex">
            <div className="h-full bg-black transition-all duration-500 w-1/3" />
          </div>
          <div className="grid grid-cols-3 pt-1 text-center">
            <div className="flex flex-col items-start text-left">
              <span className="font-label-caps-sm text-label-caps-sm font-bold text-black">
                1. ADDRESS
              </span>
              <span className="font-body-sm text-body-sm text-black truncate max-w-full">
                Shipping &amp; Identity
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-label-caps-sm text-label-caps-sm text-[#444748]">
                2. DUTIES
              </span>
              <span className="font-body-sm text-body-sm text-[#444748]">Customs (DDP)</span>
            </div>
            <div className="flex flex-col items-end text-right">
              <span className="font-label-caps-sm text-label-caps-sm text-[#444748]">
                3. PAYMENT
              </span>
              <span className="font-body-sm text-body-sm text-[#444748]">Vault Settlement</span>
            </div>
          </div>
        </div>
      </section>

      {/* Live Accordion Summary */}
      <section className="px-5 pt-4">
        <div className="bg-[#f4f4f2] rounded-xl p-4 transition-all duration-300 border border-black/[0.04]">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => setIsSummaryOpen(!isSummaryOpen)}
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#e2e3e1] flex items-center justify-center text-black">
                <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-headline-sm text-headline-sm tracking-tight text-[#1a1c1b]">
                    Order Vault ({cart.length || 2})
                  </span>
                  <span className="bg-[#735c00] text-white font-label-caps-sm text-label-caps-sm px-2 py-0.5 rounded-full">
                    {promoCode || 'GLOBALVIP'}
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-[#444748]">
                  Locked: 1 USD = ₹83.20 INR
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-headline-sm text-headline-sm font-semibold text-black">
                ${totalUSD}
              </span>
              <span
                className={`material-symbols-outlined text-[20px] text-[#444748] transition-transform duration-300 ${
                  isSummaryOpen ? 'rotate-180' : ''
                }`}
              >
                expand_more
              </span>
            </div>
          </div>

          {/* Collapsible items panel */}
          {isSummaryOpen && (
            <div className="flex flex-col gap-4 pt-4 mt-4 border-t border-[#e2e3e1]">
              {/* Item 1 */}
              <div className="flex gap-3 items-center">
                <img
                  className="w-16 h-20 object-cover rounded bg-[#e2e3e1]"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAMHYuHfCmRab2TMBrgBum-YFzIVk1oY4xvdolkp8XA7ugn3gR4eAmrf3ZJ-nUG1eOGjKVlhCPa4-VVgJ5W-WJDQ0ZDvPkbcoFRYmH1XeKKYIkvqWqbxy_kM3nvP8eM6swHlFfQFoLuL6xQF90y_2mK24ek1Sl3A7gvBRWIerlh-Eo7lV2Gf1_a3qeofao9PJHTRiPd1p0dRV_9ncQ_2rhCMbVj_u40JC46FM9oz7Xj09h4SKqqD4XI"
                  alt="Aurum Handloom Zari Saree"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-headline-sm text-headline-sm text-[#1a1c1b] truncate">
                    Aurum Handloom Zari Saree
                  </h4>
                  <p className="font-body-sm text-body-sm text-[#444748]">
                    Qty: 1 • Crimson Tailored
                  </p>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="font-label-md text-label-md font-medium text-black">
                      $342.50 USD
                    </span>
                    <span className="font-body-sm text-body-sm text-[#444748]">(₹28,500 INR)</span>
                  </div>
                </div>
              </div>

              {/* Item 2 */}
              <div className="flex gap-3 items-center">
                <img
                  className="w-16 h-20 object-cover rounded bg-[#e2e3e1]"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKtK8zSGo5CUOG04IaWN8uuCh59h3IFrvccA5kC_ESm2OXpiADLpfg0cepdR3NY00NDMs2ypjx1DoeL494uHojYQ_tH5QgJ9NlD64f05AByfBTHAFxIkd_TErz-dxYrse01b9cEXc4dze5BrvmTX5VHsHEPaWy3jsN8LjTXnA-z_ILCpKgwH1RoOo6mBkm0TvulZDunxJk1zLFXIJMOOoGqCGZJ_4W238XLsuoY-2TojqRPEZu81EQ"
                  alt="Artisanal Kundan Choker"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-headline-sm text-headline-sm text-[#1a1c1b] truncate">
                    Artisanal Kundan Choker
                  </h4>
                  <p className="font-body-sm text-body-sm text-[#444748]">
                    Qty: 1 • Master Artisan Series
                  </p>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="font-label-md text-label-md font-medium text-black">
                      $110.00 USD
                    </span>
                  </div>
                </div>
              </div>

              {/* Financial Breakdown */}
              <div className="bg-[#eeeeec] rounded-lg p-3 flex flex-col gap-1.5 font-body-sm text-body-sm">
                <div className="flex justify-between text-[#444748]">
                  <span>Item Subtotal</span>
                  <span>${subtotalUSD.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[#735c00] font-medium">
                  <span>VIP Promotion ({promoCode || 'GLOBALVIP'})</span>
                  <span>-${discountUSD.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[#444748]">
                  <span className="flex items-center gap-1">
                    Duties &amp; Customs (DDP Guarantee)
                    <span className="material-symbols-outlined text-[13px] text-[#735c00]">
                      verified_user
                    </span>
                  </span>
                  <span>${dutiesUSD.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[#444748]">
                  <span>Global Express Shipping</span>
                  <span className="text-[#735c00] font-semibold">Complimentary</span>
                </div>
                <div className="h-[1px] bg-[#e2e3e1] my-1" />
                <div className="flex justify-between items-baseline pt-1">
                  <span className="font-label-caps-md text-label-caps-md font-bold text-black">
                    TOTAL DUE
                  </span>
                  <div className="text-right">
                    <span className="font-headline-sm text-headline-sm text-black font-bold">
                      ${totalUSD} USD
                    </span>
                    <span className="block font-body-sm text-body-sm text-[#444748]">
                      Approx. ₹{totalINR} INR
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Step 1: Customer & International Shipping Address */}
      <section className="px-5 pt-6 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-black text-white font-label-caps-sm text-label-caps-sm flex items-center justify-center">
              1
            </span>
            <h2 className="font-headline-sm text-headline-sm text-[#1a1c1b] uppercase tracking-wider">
              Shipping Destination
            </h2>
          </div>
          <button
            onClick={() => showToast('Address book management open')}
            className="font-label-caps-sm text-label-caps-sm text-[#735c00] font-semibold uppercase flex items-center gap-1 hover:underline"
          >
            <span className="material-symbols-outlined text-[16px]">edit_location_alt</span>
            <span>Manage</span>
          </button>
        </div>

        {/* Active Address Card */}
        <div className="bg-white rounded-xl p-4 shadow-xs flex flex-col gap-2 relative border border-black/[0.04]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#735c00]" />
              <span className="font-label-caps-md text-label-caps-md tracking-wider font-bold text-black">
                PRIMARY RECIPIENT
              </span>
            </div>
            <span className="bg-[#e8e8e6] text-[#1a1c1b] font-label-caps-sm text-label-caps-sm px-2 py-0.5 rounded">
              DEFAULT
            </span>
          </div>

          <div className="flex flex-col pt-1">
            <span className="font-body-lg text-body-lg font-medium text-[#1a1c1b]">
              Priya Sharma
            </span>
            <p className="font-body-md text-body-md text-[#444748] mt-0.5 leading-relaxed">
              742 Evergreen Terrace, Apt 4B
              <br />
              New York, NY 10001, United States
            </p>
            <span className="font-body-sm text-body-sm text-[#444748] mt-1 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[14px]">call</span>
              +1 (555) 019-2849 • Verified via WhatsApp
            </span>
          </div>

          <div className="mt-2 pt-2 bg-[#f4f4f2] rounded-lg p-2.5 flex items-center gap-2">
            <span className="material-symbols-outlined text-[#735c00] text-[18px]">verified</span>
            <span className="font-body-sm text-body-sm text-[#1a1c1b]">
              USPS &amp; DHL Address Database Matched (Zero Delay)
            </span>
          </div>
        </div>

        {/* Add International Address Expandable Trigger */}
        <button
          onClick={() => setIsNewAddressOpen(!isNewAddressOpen)}
          className="w-full py-3.5 px-4 rounded-xl bg-[#eeeeec] text-[#1a1c1b] flex items-center justify-between hover:bg-[#e8e8e6] active:bg-[#e2e3e1] transition-colors"
        >
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#735c00] text-[20px]">
              add_circle
            </span>
            <span className="font-label-caps-md text-label-caps-md tracking-wide font-semibold">
              DELIVER TO A NEW ADDRESS / COUNTRY
            </span>
          </div>
          <span
            className={`material-symbols-outlined text-[18px] text-[#444748] transition-transform ${
              isNewAddressOpen ? 'rotate-180' : ''
            }`}
          >
            expand_more
          </span>
        </button>

        {/* Collapsed Address Form */}
        {isNewAddressOpen && (
          <div className="flex flex-col gap-3 bg-[#f4f4f2] p-4 rounded-xl border border-black/[0.04]">
            <div className="flex flex-col gap-1">
              <label className="font-label-caps-sm text-label-caps-sm text-[#444748]">
                COUNTRY / REGION
              </label>
              <select
                value={newRecipient.country}
                onChange={(e) => setNewRecipient({ ...newRecipient, country: e.target.value })}
                className="bg-white h-12 px-3 rounded-lg text-[#1a1c1b] font-body-md text-body-md outline-none border border-black/10"
              >
                <option value="United Kingdom (UK)">United Kingdom (UK)</option>
                <option value="United States (US)">United States (US)</option>
                <option value="United Arab Emirates (UAE)">United Arab Emirates (UAE)</option>
                <option value="Canada (CA)">Canada (CA)</option>
                <option value="Singapore (SG)">Singapore (SG)</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col gap-1">
                <label className="font-label-caps-sm text-label-caps-sm text-[#444748]">
                  FIRST NAME
                </label>
                <input
                  type="text"
                  value={newRecipient.firstName}
                  onChange={(e) => setNewRecipient({ ...newRecipient, firstName: e.target.value })}
                  placeholder="Aarav"
                  className="bg-white h-11 px-3 rounded-lg text-[#1a1c1b] font-body-md text-body-md outline-none border border-black/10"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-label-caps-sm text-label-caps-sm text-[#444748]">
                  LAST NAME
                </label>
                <input
                  type="text"
                  value={newRecipient.lastName}
                  onChange={(e) => setNewRecipient({ ...newRecipient, lastName: e.target.value })}
                  placeholder="Patel"
                  className="bg-white h-11 px-3 rounded-lg text-[#1a1c1b] font-body-md text-body-md outline-none border border-black/10"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-label-caps-sm text-label-caps-sm text-[#444748]">
                POSTAL CODE
              </label>
              <input
                type="text"
                value={newRecipient.postalCode}
                onChange={(e) => setNewRecipient({ ...newRecipient, postalCode: e.target.value })}
                placeholder="e.g. W1B 3AG"
                className="bg-white h-11 px-3 rounded-lg text-[#1a1c1b] font-body-md text-body-md outline-none border border-black/10"
              />
            </div>
            <button
              onClick={() => {
                setIsNewAddressOpen(false);
                showToast('Address saved as primary delivery destination');
              }}
              className="w-full py-3 bg-black text-white font-label-caps-md text-label-caps-md uppercase font-semibold rounded-lg hover:bg-neutral-800"
            >
              Save &amp; Ship To This Address
            </button>
          </div>
        )}
      </section>

      {/* Step 2: Shipping Tier & DDP Custom Clearance */}
      <section className="px-5 pt-6 flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-black text-white font-label-caps-sm text-label-caps-sm flex items-center justify-center">
            2
          </span>
          <h2 className="font-headline-sm text-headline-sm text-[#1a1c1b] uppercase tracking-wider">
            Transit Speed &amp; Duties
          </h2>
        </div>

        <div className="flex flex-col gap-2">
          {/* Option A: DHL Express Worldwide */}
          <label
            onClick={() => setShippingMethod('dhl')}
            className={`flex items-start gap-3 p-4 rounded-xl cursor-pointer relative overflow-hidden transition-all border ${
              shippingMethod === 'dhl'
                ? 'bg-white shadow-xs border-black'
                : 'bg-[#f4f4f2] border-transparent'
            }`}
          >
            <input
              type="radio"
              name="shippingMethod"
              checked={shippingMethod === 'dhl'}
              onChange={() => setShippingMethod('dhl')}
              className="mt-1 accent-black w-4 h-4"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="font-headline-sm text-headline-sm text-[#1a1c1b]">
                  DHL Express Worldwide
                </span>
                <span className="font-label-md text-label-md font-bold text-[#735c00]">
                  FREE (VIP)
                </span>
              </div>
              <p className="font-body-md text-body-md text-[#1a1c1b] mt-0.5">
                3–5 Business Days (Tracked Air Freight)
              </p>
              <p className="font-body-sm text-body-sm text-[#444748] mt-1">
                Real-time GPS tracking &amp; climate-controlled garment transit included.
              </p>
              <div className="mt-2 flex items-center gap-1.5 text-[#735c00] font-label-caps-sm text-label-caps-sm font-bold">
                <span className="material-symbols-outlined text-[15px]">verified</span>
                <span>DDP COMPLIANT: NO SURPRISE CHARGES AT YOUR DOOR</span>
              </div>
            </div>
          </label>

          {/* Option B: Standard Priority */}
          <label
            onClick={() => setShippingMethod('standard')}
            className={`flex items-start gap-3 p-4 rounded-xl cursor-pointer transition-all border ${
              shippingMethod === 'standard'
                ? 'bg-white shadow-xs border-black'
                : 'bg-[#f4f4f2] border-transparent'
            }`}
          >
            <input
              type="radio"
              name="shippingMethod"
              checked={shippingMethod === 'standard'}
              onChange={() => setShippingMethod('standard')}
              className="mt-1 accent-black w-4 h-4"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="font-headline-sm text-headline-sm text-[#1a1c1b]">
                  Standard Priority Courier
                </span>
                <span className="font-label-md text-label-md text-[#444748]">$0.00</span>
              </div>
              <p className="font-body-md text-body-md text-[#444748] mt-0.5">7–10 Business Days</p>
              <p className="font-body-sm text-body-sm text-[#444748] mt-0.5">
                Local postal final mile handoff.
              </p>
            </div>
          </label>
        </div>
      </section>

      {/* Step 3: Multi-Gateway Vault Payment */}
      <section className="px-5 pt-6 flex flex-col gap-3 pb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-black text-white font-label-caps-sm text-label-caps-sm flex items-center justify-center">
              3
            </span>
            <h2 className="font-headline-sm text-headline-sm text-[#1a1c1b] uppercase tracking-wider">
              Prestige Payment Vault
            </h2>
          </div>
          <div className="flex items-center gap-1 text-[#444748] font-label-caps-sm text-label-caps-sm">
            <span className="material-symbols-outlined text-[15px] text-[#735c00]">security</span>
            <span>PCI-DSS L1</span>
          </div>
        </div>

        {/* Multi-Gateway Tab Selectors */}
        <div className="grid grid-cols-3 gap-2">
          {/* Stripe Global */}
          <button
            type="button"
            onClick={() => setSelectedGateway('stripe')}
            className={`py-3 px-2 rounded-xl flex flex-col items-center justify-center gap-1.5 transition-all border ${
              selectedGateway === 'stripe'
                ? 'bg-white shadow-xs border-black'
                : 'bg-[#f4f4f2] border-transparent hover:bg-[#eeeeec]'
            }`}
          >
            <span
              className={`material-symbols-outlined text-[22px] ${
                selectedGateway === 'stripe' ? 'text-black' : 'text-[#444748]'
              }`}
            >
              credit_card
            </span>
            <span
              className={`font-label-caps-sm text-label-caps-sm font-bold ${
                selectedGateway === 'stripe' ? 'text-black' : 'text-[#444748]'
              }`}
            >
              CARD &amp; WALLET
            </span>
          </button>

          {/* Razorpay India Diaspora */}
          <button
            type="button"
            onClick={() => setSelectedGateway('razorpay')}
            className={`py-3 px-2 rounded-xl flex flex-col items-center justify-center gap-1.5 transition-all border ${
              selectedGateway === 'razorpay'
                ? 'bg-white shadow-xs border-black'
                : 'bg-[#f4f4f2] border-transparent hover:bg-[#eeeeec]'
            }`}
          >
            <span
              className={`material-symbols-outlined text-[22px] ${
                selectedGateway === 'razorpay' ? 'text-black' : 'text-[#444748]'
              }`}
            >
              currency_rupee
            </span>
            <span
              className={`font-label-caps-sm text-label-caps-sm font-bold ${
                selectedGateway === 'razorpay' ? 'text-black' : 'text-[#444748]'
              }`}
            >
              UPI / NETBANKING
            </span>
          </button>

          {/* PayPal Direct */}
          <button
            type="button"
            onClick={() => setSelectedGateway('paypal')}
            className={`py-3 px-2 rounded-xl flex flex-col items-center justify-center gap-1.5 transition-all border ${
              selectedGateway === 'paypal'
                ? 'bg-white shadow-xs border-black'
                : 'bg-[#f4f4f2] border-transparent hover:bg-[#eeeeec]'
            }`}
          >
            <span
              className={`material-symbols-outlined text-[22px] ${
                selectedGateway === 'paypal' ? 'text-black' : 'text-[#444748]'
              }`}
            >
              account_balance_wallet
            </span>
            <span
              className={`font-label-caps-sm text-label-caps-sm font-bold ${
                selectedGateway === 'paypal' ? 'text-black' : 'text-[#444748]'
              }`}
            >
              PAYPAL ONE-TOUCH
            </span>
          </button>
        </div>

        {/* Active Gateway Panel: Stripe Card & Wallets */}
        {selectedGateway === 'stripe' && (
          <div className="bg-white rounded-xl p-4 shadow-xs flex flex-col gap-3 border border-black/[0.04]">
            {/* Fast Checkout One-Click Buttons */}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => showToast('Apple Pay biometric sheet launched')}
                className="flex-1 h-12 rounded-lg bg-black text-white flex items-center justify-center gap-2 active:opacity-90 hover:bg-neutral-800"
              >
                <span className="font-label-caps-md text-label-caps-md uppercase tracking-wider font-bold">
                  Pay With Apple Pay
                </span>
              </button>
              <button
                type="button"
                onClick={() => showToast('Google Pay modal launched')}
                className="flex-1 h-12 rounded-lg bg-[#e8e8e6] text-[#1a1c1b] flex items-center justify-center gap-1 active:opacity-90 hover:bg-[#e2e3e1]"
              >
                <span className="font-label-caps-md text-label-caps-md uppercase tracking-wider font-bold">
                  GPay
                </span>
              </button>
            </div>

            <div className="flex items-center gap-2 my-1">
              <div className="flex-1 h-[1px] bg-[#e2e3e1]" />
              <span className="font-label-caps-sm text-label-caps-sm text-[#444748] uppercase">
                Or use Credit / Debit Card
              </span>
              <div className="flex-1 h-[1px] bg-[#e2e3e1]" />
            </div>

            {/* Card Inputs */}
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                <label className="font-label-caps-sm text-label-caps-sm text-[#444748] font-medium">
                  CARD NUMBER
                </label>
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={cardDetails.number}
                    onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                    className="w-full bg-[#f4f4f2] h-12 px-3 pr-16 rounded-lg text-[#1a1c1b] font-body-md text-body-md outline-none border border-black/10 focus:border-black"
                  />
                  <div className="absolute right-3 flex items-center gap-1 text-[#444748]">
                    <span className="font-label-caps-sm text-label-caps-sm font-bold text-black">
                      AMEX
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col gap-1">
                  <label className="font-label-caps-sm text-label-caps-sm text-[#444748] font-medium">
                    EXPIRATION DATE
                  </label>
                  <input
                    type="text"
                    value={cardDetails.expiry}
                    onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                    className="w-full bg-[#f4f4f2] h-12 px-3 rounded-lg text-[#1a1c1b] font-body-md text-body-md outline-none border border-black/10 focus:border-black"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-label-caps-sm text-label-caps-sm text-[#444748] font-medium">
                    CVV / CVC
                  </label>
                  <div className="relative flex items-center">
                    <input
                      type="password"
                      value={cardDetails.cvv}
                      onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                      className="w-full bg-[#f4f4f2] h-12 px-3 pr-8 rounded-lg text-[#1a1c1b] font-body-md text-body-md outline-none border border-black/10 focus:border-black"
                    />
                    <span className="material-symbols-outlined text-[16px] text-[#444748] absolute right-2.5">
                      help
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-label-caps-sm text-label-caps-sm text-[#444748] font-medium">
                  NAME ON CARD
                </label>
                <input
                  type="text"
                  value={cardDetails.name}
                  onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                  className="w-full bg-[#f4f4f2] h-12 px-3 rounded-lg text-[#1a1c1b] font-body-md text-body-md outline-none border border-black/10 focus:border-black"
                />
              </div>
            </div>
          </div>
        )}

        {/* Razorpay India Diaspora Panel */}
        {selectedGateway === 'razorpay' && (
          <div className="bg-white rounded-xl p-4 shadow-xs flex flex-col gap-3 border border-black/[0.04]">
            <div className="bg-[#fed65b]/40 text-[#745c00] p-3 rounded-lg text-body-sm font-body-sm flex items-start gap-2.5">
              <span className="material-symbols-outlined text-[20px] text-[#735c00] shrink-0">
                currency_exchange
              </span>
              <div>
                <span className="font-bold">Indian Diaspora Optimized:</span> Pay in INR using instant
                UPI (Google Pay, PhonePe, Paytm) or Indian Netbanking without FX conversion surcharges.
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-label-caps-sm text-label-caps-sm text-[#444748]">
                UPI VIRTUAL PAYMENT ADDRESS (VPA)
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={upiVpa}
                  onChange={(e) => setUpiVpa(e.target.value)}
                  placeholder="name@okhdfcbank"
                  className="flex-1 bg-[#f4f4f2] h-12 px-3 rounded-lg text-[#1a1c1b] font-body-md text-body-md outline-none border border-black/10"
                />
                <button
                  onClick={() => showToast('UPI ID verified: Priya Sharma')}
                  className="px-4 bg-black text-white font-label-caps-md text-label-caps-md rounded-lg uppercase hover:bg-neutral-800"
                >
                  Verify
                </button>
              </div>
            </div>
            <p className="font-body-sm text-body-sm text-[#444748]">
              Equivalent: ₹{totalINR} INR locked until settlement confirmation.
            </p>
          </div>
        )}

        {/* PayPal Panel */}
        {selectedGateway === 'paypal' && (
          <div className="bg-white rounded-xl p-6 shadow-xs flex flex-col gap-3 text-center border border-black/[0.04]">
            <span className="material-symbols-outlined text-[36px] text-[#735c00] mx-auto">
              bolt
            </span>
            <h4 className="font-headline-sm text-headline-sm text-[#1a1c1b]">
              PayPal Express Seamless Handoff
            </h4>
            <p className="font-body-sm text-body-sm text-[#444748] max-w-xs mx-auto">
              Authorize purchase and return instantly with Buyer Protection applied.
            </p>
          </div>
        )}

        {/* Final Primary Order Commitment */}
        <div className="flex flex-col gap-2 pt-2">
          <button
            onClick={handlePlaceOrder}
            disabled={isSubmitting}
            className="w-full py-4 px-6 rounded-xl bg-[#735c00] hover:bg-[#856b00] text-white flex items-center justify-between active:scale-[0.99] transition-transform shadow-lg disabled:opacity-75"
          >
            <div className="flex items-center gap-2">
              <span
                className={`material-symbols-outlined text-[20px] ${
                  isSubmitting ? 'animate-spin' : ''
                }`}
              >
                {isSubmitting ? 'sync' : 'lock'}
              </span>
              <span className="font-label-caps-md text-label-caps-md font-bold uppercase tracking-wider">
                {isSubmitting ? 'Securing Transaction...' : `PLACE ORDER & PAY $${totalUSD}`}
              </span>
            </div>
            <span className="font-headline-sm text-headline-sm font-semibold">USD</span>
          </button>
          <div className="flex items-center justify-center gap-1.5 text-[#444748] font-label-caps-sm text-label-caps-sm pt-1">
            <span className="material-symbols-outlined text-[14px] text-[#735c00]">shield</span>
            <span>DELIVERED DUTY PAID GUARANTEE • MST CONCIERGE ASSISTANCE</span>
          </div>
        </div>
      </section>
    </div>
  );
};
