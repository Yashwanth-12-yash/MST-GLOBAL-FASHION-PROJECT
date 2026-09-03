import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BRAND_LOGO_URL } from '../data/mockData';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    authModalMode,
    setAuthModalMode,
    login,
    register,
    quickLoginAdmin,
    quickLoginCustomer,
    currentUser,
    isAdmin,
    showToast
  } = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [country, setCountry] = useState('India');
  const [showPassword, setShowPassword] = useState(false);
  const [accountType, setAccountType] = useState<'customer' | 'admin'>('customer');
  const [adminSecretKey, setAdminSecretKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // OTP Login Mode state
  const [isOtpMode, setIsOtpMode] = useState(false);
  const [otpStep, setOtpStep] = useState<'request' | 'verify'>('request');
  const [otpCode, setOtpCode] = useState('');
  const [serverOtp, setServerOtp] = useState('884920');

  if (!isAuthModalOpen) return null;

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    if (!email.trim()) {
      setErrorMessage('Please provide your registered email address.');
      return;
    }
    setIsLoading(true);
    const result = await login(email.trim(), password);
    setIsLoading(false);
    if (!result.success) {
      setErrorMessage(result.error || 'Authentication failed. Please verify credentials.');
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    if (!fullName.trim() || !email.trim()) {
      setErrorMessage('Full name and email address are required.');
      return;
    }
    setIsLoading(true);
    const result = await register({
      fullName: fullName.trim(),
      email: email.trim(),
      password,
      mobile,
      country,
      adminSecret: accountType === 'admin' ? adminSecretKey.trim() : undefined,
      requestedRole: accountType === 'admin' ? 'super_admin' : 'customer'
    });
    setIsLoading(false);
    if (!result.success) {
      setErrorMessage(result.error || 'Registration could not be completed.');
    }
  };

  const handleRequestOtp = async () => {
    if (!mobile && !email) {
      setErrorMessage('Enter your mobile number or email to receive a secure OTP.');
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/otp-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile, email })
      });
      const data = await res.json();
      setIsLoading(false);
      setServerOtp('884920');
      setOtpStep('verify');
      showToast('OTP sent! Use demo code: 884920');
    } catch (e) {
      setIsLoading(false);
      setErrorMessage('Failed to send verification code.');
    }
  };

  const handleVerifyOtp = async () => {
    if (otpCode.trim() !== serverOtp && otpCode.trim() !== '884920') {
      setErrorMessage('Invalid verification code. Please enter 884920');
      return;
    }
    setIsLoading(true);
    // If mobile or email matches admin email, login as admin, otherwise customer
    if (email.toLowerCase() === 'yashwanthk2004k@gmail.com') {
      await quickLoginAdmin();
    } else {
      await login(email || 'priya.sharma@example.com', 'otp', 'customer');
    }
    setIsLoading(false);
    setIsAuthModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative w-full max-w-lg bg-[#ffffff] rounded-2xl shadow-2xl border border-black/10 overflow-hidden my-6 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Decorative Banner */}
        <div className="bg-[#1a1c1b] text-white p-6 pb-5 relative">
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            aria-label="Close modal"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#735c00] to-[#fed65b] flex items-center justify-center p-0.5 shadow-md">
              <img
                src={BRAND_LOGO_URL}
                alt="MST Global Fashion"
                className="w-full h-full object-contain rounded-lg filter brightness-0 invert"
              />
            </div>
            <div>
              <span className="font-label-caps-sm text-[10px] tracking-widest uppercase text-[#fed65b] font-bold">
                Security &amp; Account Portal
              </span>
              <h2 className="font-headline-sm text-lg font-bold tracking-tight text-white">
                MST Global Fashion
              </h2>
            </div>
          </div>

          <p className="text-gray-300 text-xs mt-2 leading-relaxed">
            Sign in to access your bespoke orders, cross-border shipments, or administrative dashboard.
          </p>

          {/* Current session info if logged in */}
          {currentUser && (
            <div className="mt-3 py-1.5 px-3 rounded-lg bg-white/10 border border-white/15 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-gray-200">Active session:</span>
                <span className="font-semibold text-white truncate max-w-[170px]">{currentUser.fullName}</span>
              </div>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                isAdmin ? 'bg-[#fed65b] text-black' : 'bg-white/20 text-gray-200'
              }`}>
                {currentUser.role.replace('_', ' ')}
              </span>
            </div>
          )}
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-gray-100 bg-[#f9f9f7]">
          <button
            onClick={() => {
              setAuthModalMode('login');
              setErrorMessage(null);
              setIsOtpMode(false);
            }}
            className={`flex-1 py-3 text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 ${
              authModalMode === 'login' && !isOtpMode
                ? 'bg-white text-black border-b-2 border-black font-bold'
                : 'text-gray-500 hover:text-black'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">login</span>
            <span>Sign In</span>
          </button>
          <button
            onClick={() => {
              setAuthModalMode('register');
              setErrorMessage(null);
              setIsOtpMode(false);
            }}
            className={`flex-1 py-3 text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 ${
              authModalMode === 'register' && !isOtpMode
                ? 'bg-white text-black border-b-2 border-black font-bold'
                : 'text-gray-500 hover:text-black'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">person_add</span>
            <span>Create Account</span>
          </button>
          <button
            onClick={() => {
              setIsOtpMode(true);
              setErrorMessage(null);
            }}
            className={`flex-1 py-3 text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 ${
              isOtpMode
                ? 'bg-white text-black border-b-2 border-black font-bold'
                : 'text-gray-500 hover:text-black'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">pin</span>
            <span>OTP Login</span>
          </button>
        </div>

        {/* Error Alert Pill */}
        {errorMessage && (
          <div className="mx-6 mt-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2 animate-in fade-in">
            <span className="material-symbols-outlined text-[18px] text-red-600">error</span>
            <span className="flex-1">{errorMessage}</span>
          </div>
        )}

        {/* TAB 1: STANDARD LOGIN FORM */}
        {authModalMode === 'login' && !isOtpMode && (
          <form onSubmit={handleLoginSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-2.5 text-[18px] text-gray-400">
                  mail
                </span>
                <input
                  type="email"
                  required
                  placeholder="e.g. yashwanthk2004k@gmail.com or customer email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-black transition-colors"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                  Password
                </label>
                <span className="text-[11px] text-gray-400">(Any password accepted in demo)</span>
              </div>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-2.5 text-[18px] text-gray-400">
                  lock
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-black transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-black"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-[#1a1c1b] text-white rounded-xl font-label-caps-md text-xs uppercase tracking-wider hover:bg-black transition-all flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
            >
              {isLoading ? (
                <span>Authenticating Credentials...</span>
              ) : (
                <>
                  <span>Sign In to MST Account</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </>
              )}
            </button>

            {/* Staff / Admin Discreet Quick Access */}
            <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500">
              <span>Looking for your customer orders? Sign in above.</span>
              <button
                type="button"
                onClick={() => {
                  setEmail('yashwanthk2004k@gmail.com');
                  setPassword('admin');
                }}
                className="text-gray-400 hover:text-black hover:underline text-[10px]"
                title="Store Administrator quick autofill"
              >
                Atelier Admin
              </button>
            </div>
          </form>
        )}

        {/* TAB 2: REGISTRATION FORM */}
        {authModalMode === 'register' && !isOtpMode && (
          <form onSubmit={handleRegisterSubmit} className="p-6 space-y-3.5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Yashwanth or Priya"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. yashwanthk2004k@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-black"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  placeholder="+91 98200 99999"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Country
                </label>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-black bg-white"
                >
                  <option value="India">India (₹ INR)</option>
                  <option value="United States">United States ($ USD)</option>
                  <option value="United Kingdom">United Kingdom (£ GBP)</option>
                  <option value="United Arab Emirates">UAE (AED)</option>
                  <option value="Singapore">Singapore (SGD)</option>
                  <option value="Australia">Australia (AUD)</option>
                  <option value="Canada">Canada (CAD)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="Create a secure password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-black"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-[#1a1c1b] text-white rounded-xl font-label-caps-md text-xs uppercase tracking-wider hover:bg-black transition-all flex items-center justify-center gap-2 shadow-md disabled:opacity-50 mt-2"
            >
              {isLoading ? (
                <span>Registering Account...</span>
              ) : (
                <>
                  <span>Create MST Account</span>
                  <span className="material-symbols-outlined text-[16px]">how_to_reg</span>
                </>
              )}
            </button>
          </form>
        )}

        {/* TAB 3: OTP VERIFICATION */}
        {isOtpMode && (
          <div className="p-6 space-y-4">
            <div className="text-center py-1">
              <span className="w-12 h-12 rounded-full bg-amber-100 text-[#735c00] flex items-center justify-center mx-auto mb-2">
                <span className="material-symbols-outlined text-[24px]">phonelink_lock</span>
              </span>
              <h3 className="font-headline-sm text-sm font-bold text-black">
                {otpStep === 'request' ? 'Passwordless Mobile / Email Login' : 'Enter Verification Code'}
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                {otpStep === 'request'
                  ? 'Receive a 6-digit authentication code via SMS or WhatsApp'
                  : 'Enter the 6-digit verification code sent to your device'}
              </p>
            </div>

            {otpStep === 'request' ? (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Mobile Number or Email
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. +91 98201 54321 or your@email.com"
                    value={mobile || email}
                    onChange={(e) => {
                      if (e.target.value.includes('@')) {
                        setEmail(e.target.value);
                      } else {
                        setMobile(e.target.value);
                      }
                    }}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-black"
                  />
                </div>

                <button
                  onClick={handleRequestOtp}
                  disabled={isLoading}
                  className="w-full py-3 bg-[#1a1c1b] text-white rounded-xl font-label-caps-md text-xs uppercase tracking-wider hover:bg-black transition-all flex items-center justify-center gap-2"
                >
                  <span>Send Verification Code</span>
                  <span className="material-symbols-outlined text-[16px]">send</span>
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    6-Digit Code
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="884920"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    className="w-full text-center tracking-widest text-lg font-mono font-bold py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-black"
                  />
                  <span className="block text-[11px] text-gray-400 text-center mt-1">
                    Demo Code: <strong className="text-black font-mono">884920</strong>
                  </span>
                </div>

                <button
                  onClick={handleVerifyOtp}
                  disabled={isLoading}
                  className="w-full py-3 bg-[#1a1c1b] text-white rounded-xl font-label-caps-md text-xs uppercase tracking-wider hover:bg-black transition-all flex items-center justify-center gap-2"
                >
                  <span>Verify &amp; Sign In</span>
                  <span className="material-symbols-outlined text-[16px]">verified</span>
                </button>

                <button
                  onClick={() => setOtpStep('request')}
                  className="w-full text-center text-xs text-gray-500 hover:text-black"
                >
                  Change mobile/email number
                </button>
              </div>
            )}
          </div>
        )}

        {/* Modal Footer Security Badge */}
        <div className="px-6 py-3 bg-[#f9f9f7] border-t border-gray-100 flex items-center justify-between text-[10px] text-gray-400">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[14px] text-emerald-600">lock</span>
            <span>256-bit TLS Encrypted Session</span>
          </div>
          <span>MST Security Compliance</span>
        </div>

      </div>
    </div>
  );
};
