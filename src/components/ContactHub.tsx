import React, { useState } from 'react';
import { Mail, Linkedin, Copy, Check, Shield, Sparkles, ExternalLink } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const ContactHub: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div id="communication-hub-portal" className="max-w-4xl mx-auto space-y-8">
      {/* Header Info */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 text-xs text-red-500 font-mono tracking-widest uppercase justify-center">
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          Secure Transmission Channels
        </div>
        <h3 className="text-2xl sm:text-3xl font-sans font-bold text-white uppercase tracking-tight">
          Establish Direct Handshake
        </h3>
        <p className="text-xs sm:text-sm text-gray-400 font-mono max-w-lg mx-auto">
          Contact Karri Abhiram via direct communication sockets for collaboration and enquiry packets.
        </p>
      </div>

      {/* Grid of Contact Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Email Gateway Card */}
        <div className="p-6 rounded-2xl border border-red-500/25 bg-black hover:border-red-500/50 hover:shadow-[0_0_20px_rgba(239,68,68,0.1)] transition-all duration-300 group flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[9px] text-gray-500 uppercase tracking-widest font-mono font-bold">Protocol // Email</span>
              <div className="p-2.5 rounded-lg bg-red-950/20 border border-red-500/20 text-red-500">
                <Mail className="w-5 h-5" />
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-sans font-bold text-white uppercase">Direct Email Socket</h3>
              <p className="text-xs text-gray-400 font-mono">Send secure inquiry packets anytime.</p>
            </div>
            <div className="p-3 bg-red-950/10 border border-red-500/15 rounded-md font-mono text-xs text-red-400 select-all font-semibold">
              {PERSONAL_INFO.email}
            </div>
          </div>
          
          <button
            type="button"
            onClick={handleCopyEmail}
            className="w-full min-h-[44px] px-4 py-2.5 rounded-lg border border-red-500/30 bg-red-950/10 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                <span>Copied to Clipboard</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Email Address</span>
              </>
            )}
          </button>
        </div>

        {/* LinkedIn Gateway Card */}
        <div className="p-6 rounded-2xl border border-red-500/25 bg-black hover:border-red-500/50 hover:shadow-[0_0_20px_rgba(239,68,68,0.1)] transition-all duration-300 group flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[9px] text-gray-500 uppercase tracking-widest font-mono font-bold">Network // LinkedIn</span>
              <div className="p-2.5 rounded-lg bg-red-950/20 border border-red-500/20 text-red-500">
                <Linkedin className="w-5 h-5" />
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-sans font-bold text-white uppercase">LinkedIn Account</h3>
              <p className="text-xs text-gray-400 font-mono">View curriculum logs and endorsements.</p>
            </div>
            <div className="p-3 bg-red-950/10 border border-red-500/15 rounded-md font-mono text-xs text-red-400 select-all font-semibold">
              karri-pavan-durga-satya-abhiram
            </div>
          </div>

          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noreferrer"
            className="w-full min-h-[44px] px-4 py-2.5 rounded-lg border border-red-500/30 bg-red-950/10 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Connect on LinkedIn</span>
          </a>
        </div>

      </div>

      {/* Security Statement */}
      <div className="p-4 rounded-xl border border-slate-900 bg-black shadow-md font-mono text-[10px] leading-relaxed text-gray-400 flex items-start gap-3 max-w-xl mx-auto">
        <Shield className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
        <div>
          <span className="text-white font-bold block uppercase mb-0.5">Secure Direct Connectivity</span>
          All communications over standard career nodes and SMTP tunnels guarantee secure validation. Encryption signatures match high-integrity SHA-256 protocols.
        </div>
      </div>
    </div>
  );
};
