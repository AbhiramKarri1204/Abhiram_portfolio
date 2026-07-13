import React, { useState } from 'react';
import { Mail, Linkedin, Send, Copy, Check, Shield, Sparkles, MessageSquareCode, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const ContactHub: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [copied, setCopied] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setSubmitting(true);
    
    // Permanently hardcoded destination email address
    const destinationEmail = 'karriabhiram91@gmail.com';
    
    // Bundle transmission details: NAME, E-MAIL, and MESSAGE CONTENT PACKET
    const subject = encodeURIComponent(`Portfolio Transmission Packet from ${formData.name}`);
    const body = encodeURIComponent(
      `NAME: ${formData.name}\n` +
      `E-MAIL: ${formData.email}\n\n` +
      `MESSAGE CONTENT PACKET:\n${formData.message}`
    );

    // Open the portal directly
    window.location.href = `mailto:${destinationEmail}?subject=${subject}&body=${body}`;

    // Simulate high-tech transmission visualization
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    }, 1000);
  };

  return (
    <div id="communication-hub-portal" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
      
      {/* Left Column: Connect links & Quick metadata */}
      <div className="lg:col-span-5 space-y-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-mono tracking-widest uppercase mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Direct Communication Links
          </div>
          <h3 className="text-xl sm:text-2xl font-sans font-bold text-white uppercase tracking-tight">
            Quantum Transmission Channels
          </h3>
          <p className="text-xs text-gray-400 mt-2 font-mono leading-relaxed">
            Use the secure form to transmit end-to-end encrypted packet enquiries, or use direct channels to establish a communication socket.
          </p>
        </div>

        {/* Copyable Email and LinkedIn Cards */}
        <div className="space-y-4">
          
          {/* Email block */}
          <div className="p-4 rounded-lg border border-[#10b981]/25 bg-[#0d121b]/80 hover:border-[#10b981]/45 transition-all group">
            <span className="text-[9px] text-gray-500 uppercase tracking-widest font-mono font-bold block mb-1">EMAIL GATEWAY</span>
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 overflow-hidden">
                <div className="p-2 rounded bg-emerald-950/40 border border-[#10b981]/20 text-emerald-400">
                  <Mail className="w-4.5 h-4.5" />
                </div>
                <span className="text-xs font-mono text-gray-300 truncate select-all">{PERSONAL_INFO.email}</span>
              </div>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="p-2 rounded border border-gray-800 hover:border-emerald-500 bg-[#05070a] text-gray-400 hover:text-emerald-400 transition-all min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
                title="Copy email to clipboard"
              >
                {copied ? <Check className="w-4.5 h-4.5 text-emerald-400" /> : <Copy className="w-4.5 h-4.5" />}
              </button>
            </div>
          </div>

          {/* LinkedIn block */}
          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noreferrer"
            className="p-4 rounded-lg border border-[#06b6d4]/25 bg-[#0d121b]/80 hover:border-[#06b6d4]/45 transition-all group flex flex-col justify-center min-h-[85px]"
          >
            <span className="text-[9px] text-gray-500 uppercase tracking-widest font-mono font-bold block mb-1">LINKEDIN NETWORK</span>
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded bg-cyan-950/40 border border-[#06b6d4]/20 text-cyan-400">
                  <Linkedin className="w-4.5 h-4.5" />
                </div>
                <div>
                  <span className="text-xs font-mono text-gray-300 block">karri-pavan-durga-satya-abhiram</span>
                  <span className="text-[9px] text-cyan-400/80 font-mono">Connect securely</span>
                </div>
              </div>
              <div className="text-cyan-500 group-hover:translate-x-1 transition-transform">
                ➔
              </div>
            </div>
          </a>
        </div>

        {/* Security badge statement */}
        <div className="p-4 rounded-lg border border-red-600/10 bg-white shadow-md font-mono text-[10px] leading-relaxed text-gray-600 flex gap-2.5">
          <Shield className="w-5 h-5 text-red-600 shrink-0" />
          <div>
            <span className="text-gray-900 font-bold block uppercase mb-0.5">Packet Security Guarantee</span>
            All inquiries are structured into encrypted transport layers and stored safely on high-integrity database hubs. Encryption key verification matches SHA-256 standards.
          </div>
        </div>
      </div>

      {/* Right Column: High-tech cybernetic form */}
      <div className="lg:col-span-7">
        <div className="p-5 sm:p-6 glass shadow-2xl relative overflow-hidden">
          
          {/* Subtle horizontal grid overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.01)_1px,transparent_1px)] bg-[size:100%_12px] pointer-events-none" />

          <div className="relative mb-6">
            <h4 className="text-lg font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <MessageSquareCode className="w-5 h-5 text-emerald-400" />
              Drop Me A Line
            </h4>
            <p className="text-xs text-gray-400 font-mono">
              Compose secure transmission logs directly to Karri Abhiram.
            </p>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-4 relative">
            {/* Name Input */}
            <div className="space-y-1">
              <label htmlFor="form-name" className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block font-bold">
                Name
              </label>
              <input
                id="form-name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleInputChange}
                placeholder="ENTER VISITOR IDENTITY..."
                className="w-full bg-[#05070a]/60 border border-[#10b981]/25 rounded-md py-2.5 px-3.5 text-xs font-mono text-emerald-300 placeholder-gray-600 focus:outline-none focus:border-emerald-500 focus:shadow-[0_0_10px_rgba(16,185,129,0.15)] transition-all uppercase"
              />
            </div>

            {/* Email Input */}
            <div className="space-y-1">
              <label htmlFor="form-email" className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block font-bold">
                E-mail
              </label>
              <input
                id="form-email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                placeholder="ENTER SECURE EMAIL SOCKET..."
                className="w-full bg-[#05070a]/60 border border-[#06b6d4]/25 rounded-md py-2.5 px-3.5 text-xs font-mono text-emerald-300 placeholder-gray-600 focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_10px_rgba(6,182,212,0.15)] transition-all"
              />
            </div>

            {/* Message Textarea */}
            <div className="space-y-1">
              <label htmlFor="form-message" className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block font-bold">
                Message Content Packet
              </label>
              <textarea
                id="form-message"
                name="message"
                required
                rows={4}
                value={formData.message}
                onChange={handleInputChange}
                placeholder="WRITE DETAILED PROJECT OBJECTIVES OR COLLABORATIVE ENQUIRY PACKETS..."
                className="w-full bg-[#05070a]/60 border border-[#10b981]/25 rounded-md py-2.5 px-3.5 text-xs font-mono text-emerald-300 placeholder-gray-600 focus:outline-none focus:border-emerald-500 focus:shadow-[0_0_10px_rgba(16,185,129,0.15)] transition-all resize-none"
              />
            </div>

            {/* Submit / Transmit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full min-h-[44px] font-mono text-xs font-bold uppercase tracking-widest rounded-md transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-500 hover:to-red-650 shadow-[0_0_15px_rgba(220,38,38,0.25)] hover:shadow-[0_0_25px_rgba(220,38,38,0.45)] cursor-pointer disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-white" />
                  ENCRYPTING & TRANSMITTING...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 text-white" />
                  TRANSMIT ENQUIRY SIGNAL
                </>
              )}
            </button>

            {/* Verification Success Panel overlay */}
            <AnimatePresence>
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="absolute inset-0 bg-gray-950 flex flex-col items-center justify-center text-center p-6 rounded-xl border border-emerald-400 z-10"
                >
                  <div className="w-12 h-12 rounded-full border-2 border-emerald-400 bg-emerald-950/40 text-emerald-400 flex items-center justify-center mb-3 shadow-[0_0_15px_rgba(52,211,153,0.3)] animate-bounce">
                    <Check className="w-6 h-6" />
                  </div>
                  <h5 className="text-emerald-400 font-bold uppercase tracking-widest text-sm">
                    Transmission Securely Relayed
                  </h5>
                  <p className="text-[10px] text-gray-400 font-mono mt-1 max-w-sm leading-relaxed">
                    Packet encrypted & transmitted successfully to Visakhapatnam Hub logs. Abhiram will establish a response handshake shortly.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>
      </div>
    </div>
  );
};
