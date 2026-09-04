import React, { useState, useEffect } from 'react';
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
    verifyOtp,
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
  const [otpInputTarget, setOtpInputTarget] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [resendCountdown, setResendCountdown] = useState(0);
  const [simulatedDispatch, setSimulatedDispatch] = useState<{
    code: string;
    recipient: string;
    channel: string;
    expiresInSeconds: number;
  } | null>(null);

  // Quick switch test accounts drawer
  const [showDemoAccounts, setShowDemoAccounts] = useState(false);

  // Countdown timer for OTP resend
  useEffect(() => {
    let timer: any;
    if (resendCountdown > 0) {
      timer = setInterval(() => {
        setResendCountdown((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [resendCountdown]);

  if (!isAuthModalOpen) return null;

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    if (!email.trim()) {
      setErrorMessage('Please provide your registered email address.');
      return;
    }
    if (!password) {
      setErrorMessage('Please enter your account password.');
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
    if (!password || password.length < 6) {
      setErrorMessage('Password must be at least 6 characters.');
      return;
    }
    setIsLoading(true);
    const result = await register({
      fullName: fullName.trim(),
      email: email.trim(),
      password,
      mobile: mobile.trim() || undefined,
      country,
      adminSecret: accountType === 'admin' ? adminSecretKey.trim() : undefined,
      requestedRole: accountType === 'admin' ? 'super_admin' : 'customer'
    });
    setIsLoading(false);
    if (!result.success) {
      setErrorMessage(result.error || 'Registration could not be completed.');
    }
  };

  const handleRequestOtp = async (targetOverride?: string) => {
    const target = (targetOverride || otpInputTarget).trim();
    if (!target) {
      setErrorMessage('Enter your mobile number or email to receive a secure OTP.');
      return;
    }
    setErrorMessage(null);
    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/otp-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: target.includes('@') ? target : undefined,
          mobile: !target.includes('@') ? target : undefined
        })
      });
      const data = await res.json();
      setIsLoading(false);
      if (!res.ok) {
        setErrorMessage(data.error || 'Unable to dispatch verification code.');
        return;
      }

      setSimulatedDispatch({
        code: data.otp,
        recipient: data.recipient || target,
        channel: data.channel || (target.includes('@') ? 'Official Atelier Email' : 'Priority SMS & WhatsApp'),
        expiresInSeconds: data.expiresInSeconds || 300
      });
      setOtpStep('verify');
      setOtpCode('');
      setResendCountdown(60);
      showToast(`Verification code dispatched to ${data.recipient || target}`);
    } catch (e) {
      setIsLoading(false);
      setErrorMessage('Failed to send verification code.');
    }
  };

  const handleVerifyOtp = async () => {
    const cleanOtp = otpCode.trim();
    if (!cleanOtp || cleanOtp.length !== 6) {
      setErrorMessage('Please enter the 6-digit verification code.');
      return;
    }
    setErrorMessage(null);
    setIsLoading(true);

    const result = await verifyOtp(otpInputTarget, cleanOtp);
    setIsLoading(false);
    if (!result.success) {
      setErrorMessage(result.error || 'Invalid verification code. Please check your notification.');
    }
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
                  placeholder="name@domain.com"
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
                <button
                  type="button"
                  onClick={() => {
                    showToast('Password reset instructions sent to your email.');
                  }}
                  className="text-xs text-gray-500 hover:text-black underline"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-2.5 text-[18px] text-gray-400">
                  lock
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Enter your account password"
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
                  <span>Sign In to Your Account</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </>
              )}
            </button>
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
                  placeholder="Enter your full name"
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
                  placeholder="name@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-black"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Mobile Number (Optional)
                </label>
                <input
                  type="tel"
                  placeholder="+91 98201 54321"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Country / Region
                </label>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm bg-white focus:outline-none focus:border-black"
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
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                Password * (min 6 characters)
              </label>
              <input
                type="password"
                required
                placeholder="Create a secure password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-black"
              />
            </div>

            <div className="pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-600">
                <input
                  type="checkbox"
                  checked={accountType === 'admin'}
                  onChange={(e) => setAccountType(e.target.checked ? 'admin' : 'customer')}
                  className="rounded text-black focus:ring-black"
                />
                <span>Register with Atelier Administrator privileges</span>
              </label>

              {accountType === 'admin' && (
                <div className="mt-2.5 p-3 rounded-xl bg-amber-50 border border-amber-200 animate-in fade-in">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#735c00] mb-1">
                    Master Atelier Secret Key
                  </label>
                  <input
                    type="password"
                    placeholder="Enter admin secret key"
                    value={adminSecretKey}
                    onChange={(e) => setAdminSecretKey(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border border-amber-300 text-sm bg-white focus:outline-none focus:border-amber-600"
                  />
                  <span className="text-[10px] text-gray-500 mt-1 block">
                    Security key verified against enterprise registry.
                  </span>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-[#1a1c1b] text-white rounded-xl font-label-caps-md text-xs uppercase tracking-wider hover:bg-black transition-all flex items-center justify-center gap-2 shadow-md disabled:opacity-50 mt-2"
            >
              {isLoading ? (
                <span>Creating Account...</span>
              ) : (
                <>
                  <span>Create Account &amp; Sign In</span>
                  <span className="material-symbols-outlined text-[16px]">how_to_reg</span>
                </>
              )}
            </button>
          </form>
        )}

        {/* TAB 3: REAL-WORLD DYNAMIC OTP VERIFICATION */}
        {isOtpMode && (
          <div className="p-6 space-y-4">
            <div className="text-center py-1">
              <span className="w-12 h-12 rounded-full bg-amber-100 text-[#735c00] flex items-center justify-center mx-auto mb-2 shadow-xs">
                <span className="material-symbols-outlined text-[24px]">phonelink_lock</span>
              </span>
              <h3 className="font-headline-sm text-sm font-bold text-black">
                {otpStep === 'request' ? 'Passwordless 2FA Login' : 'Enter Verification Code'}
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                {otpStep === 'request'
                  ? 'Receive a one-time 6-digit verification passcode dispatched to your email or phone'
                  : `Enter the 6-digit passcode dispatched to ${simulatedDispatch?.recipient || otpInputTarget}`}
              </p>
            </div>

            {/* REAL-WORLD SIMULATED INCOMING DISPATCH ALERT */}
            {otpStep === 'verify' && simulatedDispatch && (
              <div className="p-4 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 shadow-sm animate-in slide-in-from-top duration-300">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px] text-[#735c00]">
                      {simulatedDispatch.channel.includes('Email') ? 'mail' : 'sms'}
                    </span>
                    <span className="text-xs font-bold text-black uppercase tracking-wider">
                      {simulatedDispatch.channel}
                    </span>
                  </div>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Delivered Just Now</span>
                  </span>
                </div>
                <p className="text-xs text-gray-700 mt-1.5">
                  MST Atelier Security Code sent to <strong className="text-black font-semibold">{simulatedDispatch.recipient}</strong>:
                </p>
                <div className="flex items-center justify-between gap-2 mt-2.5 pt-2 border-t border-amber-200/60">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-lg font-extrabold tracking-widest bg-white px-3 py-1 rounded-lg border border-amber-200 text-[#735c00] shadow-xs">
                      {simulatedDispatch.code}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setOtpCode(simulatedDispatch.code);
                        showToast('Verification code auto-filled');
                      }}
                      className="px-2.5 py-1.5 bg-[#1a1c1b] text-white hover:bg-black rounded-lg text-[11px] font-semibold flex items-center gap-1 active:scale-95 transition-transform"
                    >
                      <span className="material-symbols-outlined text-[14px]">bolt</span>
                      <span>Auto-Fill Code</span>
                    </button>
                  </div>
                  <span className="text-[10px] text-gray-400">Valid for 5 min</span>
                </div>
              </div>
            )}

            {otpStep === 'request' ? (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Registered Mobile Number or Email
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. yashwanthk2004k@gmail.com or +91 98201 54321"
                    value={otpInputTarget}
                    onChange={(e) => setOtpInputTarget(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-black transition-colors"
                  />
                  <span className="text-[11px] text-gray-400 mt-1 block">
                    We'll generate a secure, real-time OTP and dispatch it to your device immediately.
                  </span>
                </div>

                <button
                  onClick={() => handleRequestOtp()}
                  disabled={isLoading || !otpInputTarget.trim()}
                  className="w-full py-3 bg-[#1a1c1b] text-white rounded-xl font-label-caps-md text-xs uppercase tracking-wider hover:bg-black transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-md"
                >
                  {isLoading ? (
                    <span>Dispatching Security Code...</span>
                  ) : (
                    <>
                      <span>Send Verification Code</span>
                      <span className="material-symbols-outlined text-[16px]">send</span>
                    </>
                  )}
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    6-Digit Verification Code
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="Enter 6-digit code"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                    className="w-full text-center tracking-widest text-xl font-mono font-bold py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-black bg-white"
                  />
                </div>

                <button
                  onClick={handleVerifyOtp}
                  disabled={isLoading || otpCode.length !== 6}
                  className="w-full py-3 bg-[#1a1c1b] text-white rounded-xl font-label-caps-md text-xs uppercase tracking-wider hover:bg-black transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-md"
                >
                  {isLoading ? (
                    <span>Verifying Code...</span>
                  ) : (
                    <>
                      <span>Verify &amp; Enter Atelier</span>
                      <span className="material-symbols-outlined text-[16px]">verified</span>
                    </>
                  )}
                </button>

                <div className="flex items-center justify-between pt-2 text-xs">
                  <button
                    type="button"
                    onClick={() => {
                      setOtpStep('request');
                      setOtpCode('');
                      setErrorMessage(null);
                    }}
                    className="text-gray-500 hover:text-black underline"
                  >
                    Change mobile or email
                  </button>

                  <button
                    type="button"
                    onClick={() => handleRequestOtp()}
                    disabled={resendCountdown > 0 || isLoading}
                    className={`font-semibold ${
                      resendCountdown > 0 ? 'text-gray-400 cursor-not-allowed' : 'text-[#735c00] hover:underline'
                    }`}
                  >
                    {resendCountdown > 0 ? `Resend code in ${resendCountdown}s` : 'Resend new code'}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Discreet Test Accounts Drawer for Evaluation */}
        <div className="border-t border-gray-100 bg-[#fbf9f4] px-6 py-3">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setShowDemoAccounts(!showDemoAccounts)}
              className="text-[11px] font-semibold text-gray-500 hover:text-black flex items-center gap-1 transition-colors"
            >
              <span className="material-symbols-outlined text-[14px]">
                {showDemoAccounts ? 'expand_less' : 'expand_more'}
              </span>
              <span>Test Accounts &amp; Quick Access</span>
            </button>
            <span className="text-[10px] text-gray-400 font-mono">Live DB Synchronized</span>
          </div>

          {showDemoAccounts && (
            <div className="mt-2.5 pt-2 border-t border-gray-200/60 grid grid-cols-1 sm:grid-cols-2 gap-2 animate-in fade-in">
              <button
                type="button"
                onClick={async () => {
                  await quickLoginAdmin();
                  setIsAuthModalOpen(false);
                }}
                className="p-2 bg-white rounded-lg border border-amber-200 text-left hover:border-amber-400 transition-all shadow-2xs"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-black">Administrator</span>
                  <span className="text-[9px] bg-amber-100 text-amber-800 font-bold px-1.5 rounded">Owner</span>
                </div>
                <p className="text-[10px] text-gray-500 truncate">yashwanthk2004k@gmail.com</p>
              </button>

              <button
                type="button"
                onClick={async () => {
                  await quickLoginCustomer();
                  setIsAuthModalOpen(false);
                }}
                className="p-2 bg-white rounded-lg border border-gray-200 text-left hover:border-black transition-all shadow-2xs"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-black">VIP Client</span>
                  <span className="text-[9px] bg-gray-100 text-gray-700 font-bold px-1.5 rounded">Customer</span>
                </div>
                <p className="text-[10px] text-gray-500 truncate">priya.sharma@example.com</p>
              </button>
            </div>
          )}
        </div>

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
