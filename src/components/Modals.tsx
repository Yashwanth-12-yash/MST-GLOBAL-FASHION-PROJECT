import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MASTER_ARTISANS } from '../data/mockData';

export const Modals: React.FC = () => {
  const {
    isSizeDrawerOpen,
    setIsSizeDrawerOpen,
    is360ModalOpen,
    setIs360ModalOpen,
    isConciergeOpen,
    setIsConciergeOpen,
    activeInvoiceOrder,
    setActiveInvoiceOrder,
    activeShipLabelOrder,
    setActiveShipLabelOrder,
    activeArtisanOrder,
    setActiveArtisanOrder,
    completedOrderModal,
    setCompletedOrderModal,
    assignArtisanToOrder,
    setCurrentScreen,
    showToast
  } = useApp();

  // 360 rotation slider
  const [rotationAngle, setRotationAngle] = useState(0);

  // Concierge booking state
  const [conciergeTime, setConciergeTime] = useState('Tomorrow, 4:00 PM EST');
  const [conciergeType, setConciergeType] = useState('Bridal Trousseau Video Consultation');
  const [isConciergeBooked, setIsConciergeBooked] = useState(false);

  // Selected artisan for assignment
  const [chosenArtisan, setChosenArtisan] = useState(MASTER_ARTISANS[0].name);

  return (
    <>
      {/* 1. Size Guide Drawer */}
      {isSizeDrawerOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-lg bg-white rounded-t-2xl p-6 max-h-[85vh] overflow-y-auto flex flex-col gap-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#735c00]">straighten</span>
                <h3 className="font-headline-sm text-headline-sm font-semibold text-[#1a1c1b]">
                  MST Haute Sizing &amp; Tailoring Guide
                </h3>
              </div>
              <button
                onClick={() => setIsSizeDrawerOpen(false)}
                className="w-8 h-8 rounded-full bg-[#eeeeec] flex items-center justify-center hover:bg-gray-200"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <p className="font-body-sm text-body-sm text-[#444748]">
              All MST Sarees include 1.0m complimentary unstitched pure silk blouse fabric. If you choose bespoke tailoring, our atelier fits each piece to your exact proportions.
            </p>

            {/* Size Table */}
            <div className="overflow-x-auto rounded-lg border border-black/10">
              <table className="w-full text-left font-body-sm text-body-sm">
                <thead className="bg-[#f4f4f2] text-[#1a1c1b] font-label-caps-sm text-label-caps-sm">
                  <tr>
                    <th className="p-2.5">Standard Size</th>
                    <th className="p-2.5">Bust (Inches)</th>
                    <th className="p-2.5">Waist (Inches)</th>
                    <th className="p-2.5">Saree Length</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5 text-[#444748]">
                  <tr>
                    <td className="p-2.5 font-semibold text-black">XS</td>
                    <td className="p-2.5">34"</td>
                    <td className="p-2.5">26"</td>
                    <td className="p-2.5">5.5 Meters</td>
                  </tr>
                  <tr className="bg-[#fafafa]">
                    <td className="p-2.5 font-semibold text-black">S</td>
                    <td className="p-2.5">36"</td>
                    <td className="p-2.5">28"</td>
                    <td className="p-2.5">5.5 Meters</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-semibold text-black">M</td>
                    <td className="p-2.5">38"</td>
                    <td className="p-2.5">30"</td>
                    <td className="p-2.5">5.5 Meters</td>
                  </tr>
                  <tr className="bg-[#fafafa]">
                    <td className="p-2.5 font-semibold text-black">L</td>
                    <td className="p-2.5">40"</td>
                    <td className="p-2.5">32"</td>
                    <td className="p-2.5">5.5 Meters</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-semibold text-black">XL</td>
                    <td className="p-2.5">42"</td>
                    <td className="p-2.5">34"</td>
                    <td className="p-2.5">5.5 Meters</td>
                  </tr>
                  <tr className="bg-[#fafafa]">
                    <td className="p-2.5 font-semibold text-black">Custom Bespoke</td>
                    <td className="p-2.5 font-medium text-[#735c00]" colSpan={3}>
                      Our master tailor reaches out via video or WhatsApp for custom measurements.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <button
              onClick={() => setIsSizeDrawerOpen(false)}
              className="w-full py-3 bg-black text-white font-label-caps-md text-label-caps-md uppercase font-semibold rounded-lg hover:bg-neutral-800"
            >
              Got It
            </button>
          </div>
        </div>
      )}

      {/* 2. Interactive 360 Degree View Modal */}
      {is360ModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="w-full max-w-md bg-white rounded-2xl p-6 flex flex-col gap-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-label-caps-sm text-label-caps-sm text-[#735c00] font-bold uppercase">
                  Atelier Virtual Model
                </span>
                <h3 className="font-headline-sm text-headline-sm font-semibold text-[#1a1c1b]">
                  360° Drape &amp; Weave Orbit
                </h3>
              </div>
              <button
                onClick={() => setIs360ModalOpen(false)}
                className="w-8 h-8 rounded-full bg-[#eeeeec] flex items-center justify-center hover:bg-gray-200"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            {/* Rotating Viewer */}
            <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-black flex items-center justify-center">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAMHYuHfCmRab2TMBrgBum-YFzIVk1oY4xvdolkp8XA7ugn3gR4eAmrf3ZJ-nUG1eOGjKVlhCPa4-VVgJ5W-WJDQ0ZDvPkbcoFRYmH1XeKKYIkvqWqbxy_kM3nvP8eM6swHlFfQFoLuL6xQF90y_2mK24ek1Sl3A7gvBRWIerlh-Eo7lV2Gf1_a3qeofao9PJHTRiPd1p0dRV_9ncQ_2rhCMbVj_u40JC46FM9oz7Xj09h4SKqqD4XI"
                alt="360 View"
                className="w-full h-full object-cover transition-transform duration-100 ease-out"
                style={{
                  filter: `hue-rotate(${rotationAngle * 0.15}deg) brightness(${
                    1 + Math.sin((rotationAngle * Math.PI) / 180) * 0.08
                  })`
                }}
              />
              <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-xs text-white font-mono text-xs px-2.5 py-1 rounded-full">
                Azimuth: {rotationAngle}°
              </div>
              <div className="absolute bottom-3 inset-x-3 bg-black/60 backdrop-blur-xs text-white font-label-caps-sm text-label-caps-sm px-3 py-1.5 rounded-lg text-center">
                Drag slider below to inspect 24K zari shimmer from all lighting angles
              </div>
            </div>

            {/* Slider */}
            <div className="flex flex-col gap-1">
              <div className="flex justify-between text-xs text-[#444748]">
                <span>0° (Front Pallu)</span>
                <span>180° (Pleats)</span>
                <span>360° (Full Drape)</span>
              </div>
              <input
                type="range"
                min="0"
                max="360"
                value={rotationAngle}
                onChange={(e) => setRotationAngle(Number(e.target.value))}
                className="w-full accent-black cursor-pointer h-2 bg-[#eeeeec] rounded-lg"
              />
            </div>

            <button
              onClick={() => setIs360ModalOpen(false)}
              className="w-full py-3 bg-black text-white font-label-caps-md text-label-caps-md uppercase font-semibold rounded-lg hover:bg-neutral-800"
            >
              Close Orbit
            </button>
          </div>
        </div>
      )}

      {/* 3. Video Concierge Booking Modal */}
      {isConciergeOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="w-full max-w-md bg-white rounded-2xl p-6 flex flex-col gap-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-label-caps-sm text-label-caps-sm text-[#735c00] font-bold uppercase">
                  MST Private Client Services
                </span>
                <h3 className="font-headline-sm text-headline-sm font-semibold text-[#1a1c1b]">
                  Book Master Video Consultation
                </h3>
              </div>
              <button
                onClick={() => {
                  setIsConciergeOpen(false);
                  setIsConciergeBooked(false);
                }}
                className="w-8 h-8 rounded-full bg-[#eeeeec] flex items-center justify-center hover:bg-gray-200"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            {isConciergeBooked ? (
              <div className="flex flex-col items-center text-center py-6 gap-3">
                <div className="w-14 h-14 rounded-full bg-[#f4f4f2] text-[#735c00] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[32px]">check_circle</span>
                </div>
                <h4 className="font-headline-sm text-headline-sm text-[#1a1c1b]">
                  Consultation Confirmed
                </h4>
                <p className="font-body-sm text-body-sm text-[#444748] max-w-xs">
                  We have reserved <span className="font-semibold text-black">{conciergeTime}</span>{' '}
                  with our Senior Bridal Curator. A calendar invite with high-definition video link has been emailed to you.
                </p>
                <button
                  onClick={() => {
                    setIsConciergeOpen(false);
                    setIsConciergeBooked(false);
                  }}
                  className="mt-2 px-6 py-2.5 bg-black text-white rounded-lg font-label-caps-md text-label-caps-md uppercase"
                >
                  Done
                </button>
              </div>
            ) : (
              <>
                <p className="font-body-sm text-body-sm text-[#444748]">
                  Connect 1-on-1 with our master styling team in New Delhi. We will showcase physical swatches, drape options, and verify custom measurements in real-time.
                </p>

                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="font-label-caps-sm text-label-caps-sm text-[#444748]">
                      CONSULTATION TYPE
                    </label>
                    <select
                      value={conciergeType}
                      onChange={(e) => setConciergeType(e.target.value)}
                      className="bg-[#f4f4f2] h-11 px-3 rounded-lg text-sm outline-none border border-black/10"
                    >
                      <option>Bridal Trousseau Video Consultation</option>
                      <option>Custom Blouse &amp; Fit Measurement Call</option>
                      <option>Heirloom Zari Fabric Curation Session</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="font-label-caps-sm text-label-caps-sm text-[#444748]">
                      PREFERRED TIME SLOT (EST / GMT / IST)
                    </label>
                    <select
                      value={conciergeTime}
                      onChange={(e) => setConciergeTime(e.target.value)}
                      className="bg-[#f4f4f2] h-11 px-3 rounded-lg text-sm outline-none border border-black/10"
                    >
                      <option>Tomorrow, 4:00 PM EST (New York)</option>
                      <option>Tomorrow, 7:30 PM GMT (London)</option>
                      <option>Thursday, 11:00 AM GST (Dubai)</option>
                      <option>Friday, 6:00 PM IST (New Delhi)</option>
                    </select>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setIsConciergeBooked(true);
                    showToast('Concierge video suite scheduled');
                  }}
                  className="w-full py-3 bg-[#735c00] hover:bg-[#856b00] text-white font-label-caps-md text-label-caps-md uppercase font-semibold rounded-lg flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">videocam</span>
                  <span>Confirm Video Appointment</span>
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* 4. Invoice PDF Modal */}
      {activeInvoiceOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="w-full max-w-lg bg-white rounded-2xl p-6 max-h-[90vh] overflow-y-auto flex flex-col gap-4 shadow-2xl">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <span className="font-label-caps-sm text-label-caps-sm text-[#735c00] font-bold uppercase">
                  MST Global Tax Invoice
                </span>
                <h3 className="font-headline-sm text-headline-sm font-semibold text-[#1a1c1b]">
                  {activeInvoiceOrder.orderNumber}
                </h3>
              </div>
              <button
                onClick={() => setActiveInvoiceOrder(null)}
                className="w-8 h-8 rounded-full bg-[#eeeeec] flex items-center justify-center hover:bg-gray-200"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            {/* Official Invoice Sheet */}
            <div className="p-4 bg-[#f9f9f7] rounded-xl border border-black/10 flex flex-col gap-3 font-mono text-xs">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-bold text-sm">MST ATELIER GLOBAL PVT LTD</p>
                  <p className="text-[#444748]">Varanasi Masterloom Estate, UP, India</p>
                  <p className="text-[#444748]">GSTIN: 09AAACM1294K1Z4 • IEC: 0518920194</p>
                </div>
                <div className="text-right">
                  <span className="inline-block px-2 py-0.5 bg-[#735c00] text-white font-sans text-[10px] font-bold rounded">
                    DDP CUSTOMS CLEARED
                  </span>
                  <p className="mt-1">Date: 02 Sep 2026</p>
                </div>
              </div>

              <div className="h-px bg-black/10" />

              <div className="flex justify-between">
                <div>
                  <p className="font-semibold text-black">BILLED TO / CONSIGNEE:</p>
                  <p>{activeInvoiceOrder.customerName}</p>
                  <p>{activeInvoiceOrder.customerCity}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-black">DISPATCH AIRWAY BILL:</p>
                  <p>DHL {activeInvoiceOrder.trackingNumber}</p>
                  <p>HS Code: 5007.20.10 (Silk Sarees)</p>
                </div>
              </div>

              <table className="w-full text-left mt-2">
                <thead className="border-b border-black/20 font-bold">
                  <tr>
                    <th className="py-1">Description</th>
                    <th className="py-1 text-center">Qty</th>
                    <th className="py-1 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5">
                  <tr>
                    <td className="py-2">Aurum Handloom Zari Saree (Crimson, Bespoke)</td>
                    <td className="py-2 text-center">1</td>
                    <td className="py-2 text-right">₹28,500.00</td>
                  </tr>
                  <tr>
                    <td className="py-2">Artisanal Kundan Choker (Gold Plated)</td>
                    <td className="py-2 text-center">1</td>
                    <td className="py-2 text-right">₹9,180.00</td>
                  </tr>
                </tbody>
              </table>

              <div className="h-px bg-black/10" />

              <div className="flex flex-col gap-1 items-end text-right">
                <p>Taxable Value: ₹37,680.00</p>
                <p>Integrated GST (5%): ₹1,884.00</p>
                <p>Cross-Border DDP Duty Paid: $38.50 USD</p>
                <p className="text-sm font-bold text-black mt-1">
                  Settled Total: {activeInvoiceOrder.settledTotalFormatted}
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  window.print();
                  showToast('Invoice PDF ready for download');
                }}
                className="flex-1 py-3 bg-black text-white font-label-caps-md text-label-caps-md uppercase font-semibold rounded-lg flex items-center justify-center gap-2 hover:bg-neutral-800"
              >
                <span className="material-symbols-outlined text-[16px]">download</span>
                <span>Download / Print PDF</span>
              </button>
              <button
                onClick={() => setActiveInvoiceOrder(null)}
                className="px-4 py-3 bg-[#eeeeec] text-[#1a1c1b] font-label-caps-md text-label-caps-md uppercase font-semibold rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. DHL Shipping Label Modal */}
      {activeShipLabelOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="w-full max-w-md bg-white rounded-2xl p-6 flex flex-col gap-4 shadow-2xl">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg text-[#d40511]">DHL EXPRESS</span>
                <span className="font-label-caps-sm text-label-caps-sm bg-black text-white px-2 py-0.5 rounded">
                  AIR WAYBILL
                </span>
              </div>
              <button
                onClick={() => setActiveShipLabelOrder(null)}
                className="w-8 h-8 rounded-full bg-[#eeeeec] flex items-center justify-center hover:bg-gray-200"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            {/* Air Waybill Thermal Label Simulation */}
            <div className="bg-white p-4 rounded-xl border-2 border-black flex flex-col gap-2 font-mono text-xs">
              <div className="flex justify-between items-center border-b-2 border-black pb-2">
                <div>
                  <span className="text-xl font-bold font-sans">DHL EXPRESS</span>
                  <p className="text-[10px]">GLOBAL FORWARDING DDP</p>
                </div>
                <div className="text-right">
                  <span className="text-xl font-extrabold">WPX</span>
                  <p className="text-[10px]">ZONE 6 (USA)</p>
                </div>
              </div>

              <div className="border-b border-black py-1">
                <p className="text-[9px] text-[#444748]">FROM (SHIPPER):</p>
                <p className="font-bold">MST ATELIER GLOBAL EXPORTS</p>
                <p>Connaught Place Atelier Suite 402, New Delhi, 110001 IN</p>
              </div>

              <div className="border-b-2 border-black py-1">
                <p className="text-[9px] text-[#444748]">TO (CONSIGNEE):</p>
                <p className="font-bold text-sm">{activeShipLabelOrder.customerName}</p>
                <p>742 Evergreen Terrace, Apt 4B</p>
                <p>New York, NY 10001, United States</p>
                <p>TEL: +1 (555) 019-2849</p>
              </div>

              <div className="flex justify-between py-1 border-b border-black text-[11px]">
                <span>Origin: DEL (Indira Gandhi Intl)</span>
                <span className="font-bold">Dest: JFK (New York)</span>
              </div>

              {/* Simulated Barcode */}
              <div className="py-2 flex flex-col items-center justify-center gap-1">
                <div className="w-full h-14 bg-[repeating-linear-gradient(90deg,#000,#000_2px,#fff_2px,#fff_5px,#000_5px,#000_7px,#fff_7px,#fff_9px,#000_9px,#000_12px)] rounded" />
                <span className="font-bold tracking-widest text-sm">
                  {activeShipLabelOrder.trackingNumber}
                </span>
              </div>

              <div className="flex justify-between text-[10px] pt-1">
                <span>DDP INCOTERMS 2026</span>
                <span>WEIGHT: 1.85 KG</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  window.print();
                  showToast('Thermal shipping label dispatched to printer');
                }}
                className="flex-1 py-3 bg-black text-white font-label-caps-md text-label-caps-md uppercase font-semibold rounded-lg flex items-center justify-center gap-2 hover:bg-neutral-800"
              >
                <span className="material-symbols-outlined text-[16px]">print</span>
                <span>Print Thermal Label (4x6)</span>
              </button>
              <button
                onClick={() => setActiveShipLabelOrder(null)}
                className="px-4 py-3 bg-[#eeeeec] text-[#1a1c1b] font-label-caps-md text-label-caps-md uppercase font-semibold rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. Assign Master Artisan Modal */}
      {activeArtisanOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="w-full max-w-md bg-white rounded-2xl p-6 flex flex-col gap-4 shadow-2xl">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <span className="font-label-caps-sm text-label-caps-sm text-[#735c00] font-bold uppercase">
                  Artisan Guild Assignment
                </span>
                <h3 className="font-headline-sm text-headline-sm font-semibold text-[#1a1c1b]">
                  {activeArtisanOrder.customerName}'s Ensemble
                </h3>
              </div>
              <button
                onClick={() => setActiveArtisanOrder(null)}
                className="w-8 h-8 rounded-full bg-[#eeeeec] flex items-center justify-center hover:bg-gray-200"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <p className="font-body-sm text-body-sm text-[#444748]">
              Select the heritage master weaver or master cutter to oversee handloom calibration and bespoke blouse tailoring for {activeArtisanOrder.orderNumber}.
            </p>

            <div className="flex flex-col gap-2">
              {MASTER_ARTISANS.map((artisan) => {
                const isSelected = chosenArtisan === artisan.name;
                return (
                  <label
                    key={artisan.id}
                    onClick={() => setChosenArtisan(artisan.name)}
                    className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'border-black bg-[#f4f4f2]'
                        : 'border-black/10 bg-white hover:bg-[#fafafa]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="chosenArtisan"
                      checked={isSelected}
                      onChange={() => setChosenArtisan(artisan.name)}
                      className="mt-1 accent-black"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-[#1a1c1b]">{artisan.name}</span>
                        <span className="text-xs text-[#735c00] font-semibold">
                          {artisan.experience}
                        </span>
                      </div>
                      <p className="text-xs text-[#444748]">{artisan.specialty}</p>
                      <p className="text-[11px] text-[#735c00] mt-0.5">
                        Current Queue: {artisan.activeAssignments} ensembles
                      </p>
                    </div>
                  </label>
                );
              })}
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => {
                  assignArtisanToOrder(activeArtisanOrder.id, chosenArtisan);
                  setActiveArtisanOrder(null);
                  showToast(`Master Artisan ${chosenArtisan} assigned to ${activeArtisanOrder.orderNumber}`);
                }}
                className="flex-1 py-3 bg-black text-white font-label-caps-md text-label-caps-md uppercase font-semibold rounded-lg hover:bg-neutral-800"
              >
                Confirm Guild Allocation
              </button>
              <button
                onClick={() => setActiveArtisanOrder(null)}
                className="px-4 py-3 bg-[#eeeeec] text-[#1a1c1b] font-label-caps-md text-label-caps-md uppercase font-semibold rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 7. Order Placed Celebration Modal */}
      {completedOrderModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="w-full max-w-md bg-white rounded-2xl p-6 flex flex-col items-center text-center gap-4 shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-[#fed65b] text-[#745c00] flex items-center justify-center shadow-lg animate-bounce">
              <span className="material-symbols-outlined text-[36px]">verified</span>
            </div>

            <div>
              <span className="font-label-caps-sm text-label-caps-sm text-[#735c00] font-bold uppercase tracking-widest">
                MST Haute Couture Acquisition
              </span>
              <h3 className="font-headline-lg-mobile text-headline-lg-mobile text-[#1a1c1b] font-serif mt-1">
                Order Confirmed
              </h3>
              <p className="font-mono text-xs font-semibold text-black mt-1">
                Ref: {completedOrderModal.orderNumber}
              </p>
            </div>

            <div className="w-full bg-[#f4f4f2] rounded-xl p-3.5 flex flex-col gap-2 text-left font-body-sm text-body-sm">
              <div className="flex justify-between">
                <span className="text-[#444748]">Settled Amount:</span>
                <span className="font-bold text-black">{completedOrderModal.totalFormatted}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#444748]">Transit Method:</span>
                <span className="font-semibold text-[#735c00]">DHL Express DDP (3-5 Days)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#444748]">Customs Guarantee:</span>
                <span className="font-semibold text-black">Duties 100% Prepaid</span>
              </div>
            </div>

            <p className="font-body-sm text-body-sm text-[#444748]">
              Your ensemble has been queued for bespoke artisan preparation. Real-time GPS tracking and live status updates will stream to your portal.
            </p>

            <div className="w-full flex flex-col gap-2 pt-1">
              <button
                onClick={() => {
                  setCompletedOrderModal(null);
                  setCurrentScreen('account');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full py-3.5 bg-black text-white font-label-caps-md text-label-caps-md uppercase font-bold rounded-lg hover:bg-neutral-800"
              >
                View in Operations Center
              </button>
              <button
                onClick={() => {
                  setCompletedOrderModal(null);
                  setCurrentScreen('discover');
                }}
                className="w-full py-2.5 bg-[#eeeeec] text-[#1a1c1b] font-label-caps-md text-label-caps-md uppercase font-semibold rounded-lg hover:bg-gray-300"
              >
                Return to Discover
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
