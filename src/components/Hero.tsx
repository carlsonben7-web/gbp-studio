import React from 'react';
import { Calendar, ArrowRight, ShieldCheck, Award, Disc3, Sliders, ChevronDown, MapPin, Radio } from 'lucide-react';
import { AudioABPlayer } from './AudioABPlayer';
import controlRoomImg from '../assets/images/gbp_studio_control_1790785833418.jpg';

interface HeroProps {
  onOpenBooking: () => void;
  onOpenVault: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onOpenVault }) => {
  return (
    <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden border-b border-slate-800/80">
      {/* Background Image with Cinematic Dark Gradient Vignette */}
      <div className="absolute inset-0 z-0">
        <img
          src={controlRoomImg}
          alt="Glenn Brown Productions Studio Control Room"
          className="w-full h-full object-cover object-center opacity-25 filter brightness-75 contrast-125 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d10] via-[#0b0d10]/85 to-[#0b0d10]/95" />
        <div className="absolute inset-0 bg-acoustic-grid opacity-30" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Location & Facility Status Chip */}
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 backdrop-blur-md mb-6 animate-in fade-in slide-in-from-top-4 duration-500">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-xs font-mono uppercase tracking-widest text-amber-300 font-semibold">
            ROSWELL, GA FACILITY OPEN FOR SESSIONS
          </span>
          <span className="text-slate-500">•</span>
          <span className="text-xs font-mono text-slate-300">190 Spring Ridge Trce</span>
        </div>

        {/* Main Hero Header */}
        <div className="max-w-4xl">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12] mb-6">
            Four Decades of <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 bg-clip-text text-transparent">
              Grammy-Winning
            </span>{' '}
            Sonic Truth.
          </h1>

          <p className="text-base sm:text-xl text-slate-300 leading-relaxed font-light mb-8 max-w-3xl">
            Where acoustic physics meets analog musicality. From pristine multi-track isolation to transparent,
            competitive masters and bespoke room acoustics, <strong className="text-white font-medium">Glenn Brown Productions LLC</strong> engineers
            recordings that translate across every playback system and endure for a lifetime.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 mb-12">
            <button
              onClick={onOpenBooking}
              className="flex items-center gap-2.5 px-6 py-3.5 rounded bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold text-sm font-mono uppercase tracking-wider transition-all duration-200 shadow-xl shadow-amber-500/20 active:scale-[0.98] cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-slate-950" />
              <span>Schedule Session Consultation</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>

            <a
              href="#mastering"
              className="flex items-center gap-2 px-5 py-3.5 rounded border border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white text-sm font-mono uppercase tracking-wider transition-all cursor-pointer"
            >
              <Sliders className="w-4 h-4 text-amber-400" />
              <span>Explore Studio & Gear Specs</span>
            </a>

            <button
              onClick={onOpenVault}
              className="flex items-center gap-2 px-4 py-3.5 rounded border border-amber-500/30 bg-amber-500/5 hover:bg-amber-500/10 text-amber-300 text-sm font-mono uppercase tracking-wider transition-all cursor-pointer"
            >
              <span>Client Portal Vault</span>
            </button>
          </div>
        </div>

        {/* Authority Badges Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-6 border-t border-slate-800/80 mb-12">
          <div className="flex items-center gap-3 p-3 rounded bg-slate-900/50 border border-slate-800">
            <div className="p-2 rounded bg-amber-500/10 text-amber-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-mono font-bold text-white uppercase tracking-wider">Grammy & Emmy</div>
              <div className="text-[11px] text-slate-400">Awarded Engineering</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded bg-slate-900/50 border border-slate-800">
            <div className="p-2 rounded bg-amber-500/10 text-amber-400">
              <Disc3 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-mono font-bold text-white uppercase tracking-wider">1,000+ Credits</div>
              <div className="text-[11px] text-slate-400">Major Albums & Scores</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded bg-slate-900/50 border border-slate-800">
            <div className="p-2 rounded bg-amber-500/10 text-amber-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-mono font-bold text-white uppercase tracking-wider">Prism Sound HD</div>
              <div className="text-[11px] text-slate-400">Dream AD8XR Reference</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded bg-slate-900/50 border border-slate-800">
            <div className="p-2 rounded bg-amber-500/10 text-amber-400">
              <Radio className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-mono font-bold text-white uppercase tracking-wider">27+ Custom Systems</div>
              <div className="text-[11px] text-slate-400">GBP Monitors Nationwide</div>
            </div>
          </div>
        </div>

        {/* Live A/B Mastering Audio Console */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <h2 className="text-xs font-mono uppercase tracking-widest text-slate-300 font-bold">
                AUDITION REFERENCE MASTERING CHAIN
              </h2>
            </div>
            <span className="text-[11px] font-mono text-slate-400 hidden sm:inline">
              Toggle live between unprocessed mix and GBP analog master
            </span>
          </div>
          <AudioABPlayer />
        </div>
      </div>
    </section>
  );
};
