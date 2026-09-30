import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, ShieldCheck, ArrowRight, Disc, Send, CheckCircle2 } from 'lucide-react';

interface FooterProps {
  onOpenBooking: () => void;
  onOpenVault: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking, onOpenVault }) => {
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryMsg, setInquiryMsg] = useState('');
  const [inquirySent, setInquirySent] = useState(false);

  const handleSendInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryEmail) return;
    setInquirySent(true);
    setTimeout(() => {
      setInquirySent(false);
      setInquiryName('');
      setInquiryEmail('');
      setInquiryMsg('');
    }, 4000);
  };

  return (
    <footer id="contact" className="bg-[#07090b] border-t border-slate-800 text-slate-300 relative overflow-hidden">
      {/* Pre-footer Call to Action Banner */}
      <div className="border-b border-slate-800/80 bg-gradient-to-r from-amber-950/20 via-slate-900 to-amber-950/20 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold">
            READY TO ELEVATE YOUR SOUND TO MASTER QUALITY?
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold font-display text-white tracking-tight">
            Let&rsquo;s Create Sound That Endures For Decades.
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Whether cutting a career-defining record, requiring master polish through Prism Sound HD converters,
            or commissioning high-end acoustic architecture—we welcome your project.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={onOpenBooking}
              className="px-6 py-3.5 rounded bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold text-xs font-mono uppercase tracking-wider transition-all cursor-pointer shadow-xl shadow-amber-500/20 active:scale-[0.98]"
            >
              Start Project Consultation
            </button>
            <button
              onClick={onOpenVault}
              className="px-5 py-3.5 rounded border border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-slate-200 text-xs font-mono uppercase tracking-wider transition-all cursor-pointer"
            >
              Access Client Track Vault
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Col 1: Brand & Official Facility Location */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-sm bg-amber-500/20 border border-amber-500/40 flex items-center justify-center">
                <span className="font-display font-bold text-amber-400 text-lg">GBP</span>
              </div>
              <div>
                <h3 className="font-display font-bold text-white text-base">GLENN BROWN PRODUCTIONS</h3>
                <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider">
                  LLC • Sound Engineering & Acoustics
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed font-light">
              World-class audio engineering, Prism Sound HD AD8XR analog mastering, and custom architectural acoustic design.
            </p>

            {/* Official Facility Address Box */}
            <div className="p-4 rounded-lg bg-[#0d1015] border border-amber-500/30 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-bold uppercase">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span>PRIMARY STUDIO LOCATION</span>
              </div>
              <div className="text-xs font-mono text-white leading-relaxed">
                Glenn Brown Productions LLC <br />
                <span className="text-amber-300 font-semibold">190 spring ridge trce</span> <br />
                Roswell, GA 30076
              </div>
              <div className="text-[11px] text-slate-400 italic pt-1 border-t border-slate-800/80">
                Private facility • Studio tracking & mastering sessions by confirmed appointment.
              </div>
            </div>
          </div>

          {/* Col 2: Direct Contact & Hours */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-slate-200 font-bold pb-2 border-b border-slate-800">
              DIRECT DESK & HOURS
            </h4>

            <div className="space-y-3 text-xs font-mono">
              <a
                href="tel:7705550194"
                className="flex items-center gap-2.5 text-slate-300 hover:text-amber-400 transition-colors"
              >
                <Phone className="w-4 h-4 text-amber-500/80" />
                <span>(770) 555-0194</span>
              </a>

              <a
                href="mailto:contact@glennbrownproductions.com"
                className="flex items-center gap-2.5 text-slate-300 hover:text-amber-400 transition-colors"
              >
                <Mail className="w-4 h-4 text-amber-500/80" />
                <span>contact@glennbrownproductions.com</span>
              </a>

              <div className="flex items-start gap-2.5 text-slate-400 pt-1">
                <Clock className="w-4 h-4 text-amber-500/80 shrink-0 mt-0.5" />
                <div className="text-[11px] leading-relaxed">
                  <span className="text-slate-300 font-medium">Session Windows:</span> <br />
                  Mon – Sat: 10:00 AM – 8:00 PM EST <br />
                  Sunday: Master Lockout / Acoustic Analysis
                </div>
              </div>
            </div>

            <div className="pt-2 text-xs font-mono">
              <span className="text-slate-400 block mb-1">Affiliations:</span>
              <div className="flex flex-wrap gap-1.5 text-[10px]">
                <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">AES Member</span>
                <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">Grammy Voting Member</span>
                <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">TEF System</span>
              </div>
            </div>
          </div>

          {/* Col 3: Direct Inquiry Form */}
          <div className="lg:col-span-5 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-slate-200 font-bold pb-2 border-b border-slate-800">
              DIRECT DESK INQUIRY
            </h4>

            {inquirySent ? (
              <div className="p-4 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Thank you. Your message has been routed to Glenn Brown Productions LLC in Roswell, GA.</span>
              </div>
            ) : (
              <form onSubmit={handleSendInquiry} className="space-y-2.5 text-xs font-mono">
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={inquiryName}
                    onChange={(e) => setInquiryName(e.target.value)}
                    className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Your Email"
                    value={inquiryEmail}
                    onChange={(e) => setInquiryEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
                <textarea
                  rows={2}
                  required
                  placeholder="Tell us about your tracking, mastering, or acoustic design project..."
                  value={inquiryMsg}
                  onChange={(e) => setInquiryMsg(e.target.value)}
                  className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Transmit Inquiry to Chief Engineer</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Legal & Rights */}
        <div className="mt-12 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            &copy; 2026 Glenn Brown Productions LLC. All Rights Reserved.
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>190 Spring Ridge Trce, Roswell, GA 30076</span>
            <span>•</span>
            <span className="text-amber-500/80">Prism Sound Reference</span>
            <span>•</span>
            <span>GBP Custom Loudspeaker Acoustics</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
