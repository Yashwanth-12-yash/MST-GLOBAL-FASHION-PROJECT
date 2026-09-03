import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const BagScreen: React.FC = () => {
  const {
    cart,
    cartSubtotalINR,
    updateCartQuantity,
    removeFromCart,
    formatPrice,
    promoCode,
    promoDiscountRatio,
    applyPromoCode,
    setCurrentScreen,
    showToast
  } = useApp();

  const [inputCode, setInputCode] = useState('');

  const discountINR = Math.round(cartSubtotalINR * promoDiscountRatio);
  const totalINR = cartSubtotalINR - discountINR;

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode.trim()) return;
    const success = applyPromoCode(inputCode.trim());
    if (!success) {
      showToast('Invalid code. Try MSTGLOBAL15 or GLOBALVIP');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
        <div className="w-16 h-16 rounded-full bg-[#f4f4f2] flex items-center justify-center text-[#735c00] mb-4">
          <span className="material-symbols-outlined text-[32px]">shopping_bag</span>
        </div>
        <h3 className="font-headline-md text-headline-md text-[#1a1c1b] font-serif">
          Your Bag is Empty
        </h3>
        <p className="font-body-sm text-body-sm text-[#444748] mt-1 max-w-sm">
          Discover handloom sarees, bespoke anarkalis, and handcrafted jewels woven by master artisans.
        </p>
        <button
          onClick={() => setCurrentScreen('discover')}
          className="mt-6 px-6 py-3 bg-black text-white font-label-caps-md text-label-caps-md uppercase tracking-wider rounded-lg shadow-sm hover:bg-neutral-800 transition-colors"
        >
          Explore Runway Drops
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full pb-32 text-[#1a1c1b] px-4 max-w-3xl mx-auto">
      <div className="pt-6 pb-2">
        <span className="font-label-caps-md text-label-caps-md text-[#735c00] font-bold uppercase tracking-widest">
          Atelier Vault
        </span>
        <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-[#1a1c1b] font-serif">
          Shopping Bag ({cart.length})
        </h2>
      </div>

      {/* Cart Items List */}
      <div className="flex flex-col gap-4 mt-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl p-4 shadow-xs flex gap-4 border border-black/[0.04]"
          >
            <img
              src={item.product.primaryImage}
              alt={item.product.title}
              className="w-20 h-28 object-cover rounded-lg bg-[#eeeeec] flex-shrink-0"
            />
            <div className="flex-1 min-w-0 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between">
                  <h4 className="font-headline-sm text-headline-sm text-[#1a1c1b] truncate font-serif">
                    {item.product.title}
                  </h4>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-[#444748] hover:text-[#ba1a1a] p-1"
                  >
                    <span className="material-symbols-outlined text-[18px]">delete</span>
                  </button>
                </div>
                <p className="font-body-sm text-body-sm text-[#444748] mt-0.5">
                  {item.selectedColor.name} • {item.selectedSize.label}
                </p>
                {item.selectedSize.priceDeltaINR ? (
                  <span className="text-[11px] text-[#735c00] font-medium">
                    Bespoke Tailoring Included (+₹{item.selectedSize.priceDeltaINR.toLocaleString()})
                  </span>
                ) : null}
              </div>

              <div className="flex items-center justify-between pt-2">
                {/* Quantity Stepper */}
                <div className="flex items-center gap-2 bg-[#f4f4f2] rounded-lg p-1">
                  <button
                    onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                    className="w-7 h-7 rounded bg-white flex items-center justify-center font-bold text-sm hover:bg-gray-200"
                  >
                    -
                  </button>
                  <span className="w-6 text-center font-semibold text-sm">{item.quantity}</span>
                  <button
                    onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                    className="w-7 h-7 rounded bg-white flex items-center justify-center font-bold text-sm hover:bg-gray-200"
                  >
                    +
                  </button>
                </div>

                <span className="font-headline-sm text-headline-sm font-semibold text-[#1a1c1b]">
                  {formatPrice(
                    (item.product.priceINR + (item.selectedSize.priceDeltaINR || 0)) * item.quantity
                  )}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Promo Code Input */}
      <form onSubmit={handleApply} className="mt-6 flex gap-2">
        <input
          type="text"
          value={inputCode}
          onChange={(e) => setInputCode(e.target.value.toUpperCase())}
          placeholder="Promo code (e.g. MSTGLOBAL15)"
          className="flex-1 bg-[#f4f4f2] h-12 px-4 rounded-xl font-mono text-sm uppercase tracking-wider outline-none border border-black/10 focus:border-black"
        />
        <button
          type="submit"
          className="px-6 bg-black text-white font-label-caps-md text-label-caps-md uppercase tracking-wider rounded-xl hover:bg-neutral-800 transition-colors"
        >
          Apply
        </button>
      </form>

      {promoCode && (
        <div className="mt-2 flex items-center justify-between text-xs text-[#735c00] bg-[#fed65b]/30 p-2.5 rounded-lg">
          <span>Code {promoCode} applied ({Math.round(promoDiscountRatio * 100)}% off)</span>
          <span className="font-bold">Active</span>
        </div>
      )}

      {/* Financial Summary */}
      <div className="mt-6 bg-[#f4f4f2] rounded-xl p-4 flex flex-col gap-2 font-body-sm text-body-sm border border-black/[0.04]">
        <div className="flex justify-between text-[#444748]">
          <span>Subtotal</span>
          <span>{formatPrice(cartSubtotalINR)}</span>
        </div>
        {discountINR > 0 && (
          <div className="flex justify-between text-[#735c00] font-medium">
            <span>VIP Discount</span>
            <span>-{formatPrice(discountINR)}</span>
          </div>
        )}
        <div className="flex justify-between text-[#444748]">
          <span>Import Duties &amp; Taxes (DDP)</span>
          <span className="text-[#735c00] font-semibold">Included</span>
        </div>
        <div className="flex justify-between text-[#444748]">
          <span>DHL Express Worldwide</span>
          <span className="text-[#735c00] font-semibold">Complimentary</span>
        </div>
        <div className="h-px bg-[#e2e3e1] my-1" />
        <div className="flex justify-between items-baseline font-semibold text-[#1a1c1b] text-base">
          <span>Estimated Total</span>
          <span>{formatPrice(totalINR)}</span>
        </div>
      </div>

      {/* Primary Checkout CTA */}
      <button
        onClick={() => {
          setCurrentScreen('checkout');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className="mt-6 w-full py-4 bg-[#735c00] hover:bg-[#856b00] text-white rounded-xl font-label-caps-md text-label-caps-md uppercase tracking-wider font-bold flex items-center justify-center gap-2 shadow-lg active:scale-[0.99] transition-all"
      >
        <span>Proceed To Global Checkout</span>
        <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
      </button>
    </div>
  );
};
