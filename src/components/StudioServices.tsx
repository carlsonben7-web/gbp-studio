import React, { useState } from 'react';
import { Mic2, Disc, Waves, Shield, CheckCircle, ArrowRight, Sliders, Volume2, Cpu, Wrench, Sparkles, Layers } from 'lucide-react';
import liveRoomImg from '../assets/images/gbp_live_tracking_1790785849004.jpg';
import analogRackImg from '../assets/images/gbp_analog_gear_1790785861451.jpg';

interface StudioServicesProps {
  onOpenBookingWithService: (service: 'Live Tracking Lockout' | 'High-Definition Mastering' | 'Acoustic Architecture Consultation') => void;
}

export const StudioServices: React.FC<StudioServicesProps> = ({ onOpenBookingWithService }) => {
  const [selectedMicCategory, setSelectedMicCategory] = useState<'vocal' | 'drum' | 'acoustic'>('vocal');

  const mics = {
    vocal: [
      { name: 'Neumann U47 (Vintage VF14 Tube)', use: 'Lead Vocals & Warm Acoustic Soloists', character: 'Velvety top, lush midrange body' },
      { name: 'Telefunken ELA M 251E', use: 'Airy Female/Male Vocals & Intimate Strings', character: 'Silky 12kHz sheen, zero sibilance' },
      { name: 'Neumann U67 (Original 1965)', use: 'Dynamic Vocals, Brass & Acoustic Guitars', character: 'Rich harmonic density, smooth roll-off' },
    ],
    drum: [
      { name: 'Coles 4038 Ribbon Pairs', use: 'Overheads & Natural Room Perspective', character: 'Pure Blumlein stereo image, fast transients' },
      { name: 'AKG D12 & Neumann U47 FET', use: 'Kick Drum Inner & Outer Resonance', character: 'Deep 40Hz fundamental weight with punch' },
      { name: 'Sennheiser MD 421-U & Shure SM57 Unidyne', use: 'Snare, Toms & Percussion', character: 'High SPL handling with tight transient snap' },
    ],
    acoustic: [
      { name: 'Shoeps Colette MK4 Pair', use: 'Grand Piano & Orchestral Ensembles', character: 'Laboratory ruler-flat frequency response' },
      { name: 'Royer R-121 Matched Pairs', use: 'Guitar Amps & Brass Sections', character: 'Figure-8 rejection with creamy smooth high-end' },
      { name: 'AKG C12 (Original Brass Capsule)', use: 'Acoustic Upright Bass & Cello', character: 'Deep sub definition and intimate harmonic air' },
    ],
  };

  return (
    <section className="py-20 lg:py-28 bg-[#0b0d10] border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold">
              CORE SPECIALIZATIONS
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight mb-4">
            Uncompromising Standards. <br />
            <span className="text-slate-400">Three Distinct Disciplines of Sound.</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Every link in the chain matters. From the physical physics of the recording space to the mathematical precision of high-definition digital conversion and room geometry.
          </p>
        </div>

        {/* SERVICE 01: RECORDING & TRACKING */}
        <div id="studio-tracking" className="mb-24 pt-8 border-t border-slate-800/80">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Visual & Image */}
            <div className="lg:col-span-6 relative">
              <div className="rounded-lg overflow-hidden border border-slate-800 shadow-2xl relative group">
                <img
                  src={liveRoomImg}
                  alt="Glenn Brown Productions Live Tracking Room with Solid Wood Diffusers"
                  className="w-full h-80 sm:h-[420px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d10] via-transparent to-black/30" />
                <div className="absolute top-4 left-4 px-2.5 py-1 rounded bg-amber-500/20 backdrop-blur-md border border-amber-500/40 text-[10px] font-mono uppercase tracking-wider text-amber-300 font-bold">
                  FACILITY 01 • LIVE TRACKING
                </div>
              </div>

              {/* Quick Spec Badge Card */}
              <div className="grid grid-cols-3 gap-2 mt-3 font-mono text-[11px] text-center">
                <div className="p-2 rounded bg-slate-900/80 border border-slate-800">
                  <span className="text-slate-400 block text-[9px]">FLOOR SYSTEM</span>
                  <span className="text-white font-semibold">Floating Decoupled</span>
                </div>
                <div className="p-2 rounded bg-slate-900/80 border border-slate-800">
                  <span className="text-slate-400 block text-[9px]">POWER GRID</span>
                  <span className="text-amber-400 font-semibold">Isolated Ground 60Hz</span>
                </div>
                <div className="p-2 rounded bg-slate-900/80 border border-slate-800">
                  <span className="text-slate-400 block text-[9px]">NOISE FLOOR</span>
                  <span className="text-emerald-400 font-semibold">&lt; NC-15 Ultra-Silent</span>
                </div>
              </div>
            </div>

            {/* Content & Details */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-amber-400 font-bold tracking-widest uppercase">
                <Mic2 className="w-4 h-4 text-amber-400" />
                <span>SERVICE 01 • TRACKING & MIXING SUITE</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Pristine Capture Without Acoustic Coloration.
              </h3>

              <div className="space-y-4 text-slate-300 text-sm leading-relaxed font-light">
                <p>
                  Unwanted room nodes, phase smearing, and sterile preamp stages degrade performances before mixing even begins. At <strong className="text-white font-medium">Glenn Brown Productions LLC</strong>, our live recording environment is engineered with custom-tuned timber quadratic residue diffusers and a physically floating floor system.
                </p>
                <p>
                  Whether tracking full ensembles, acoustic grand piano, vintage drum kits, or vocal performances, every transient is translated with three-dimensional depth, realistic stereo separation, and absolute dynamic impact.
                </p>
              </div>

              {/* Key Capabilities Bullet Points */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-start gap-2.5 text-xs text-slate-300">
                  <CheckCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>Isolated clean-power circuits eliminating EMI and ground hum</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-300">
                  <CheckCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>Zero-latency analog discrete headphone cue mixes</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-300">
                  <CheckCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>Surround and multi-channel spatial tracking capability</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-300">
                  <CheckCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>Comprehensive vintage microphone locker</span>
                </div>
              </div>

              {/* Interactive Mic Locker Selector */}
              <div className="p-4 rounded-lg bg-[#0e1217] border border-slate-800">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                    CURATED MICROPHONE VAULT
                  </span>
                  <div className="flex gap-1">
                    {(['vocal', 'drum', 'acoustic'] as const).map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedMicCategory(cat)}
                        className={`text-[10px] font-mono px-2 py-0.5 rounded capitalize transition-all ${
                          selectedMicCategory === cat
                            ? 'bg-amber-500 text-slate-950 font-bold'
                            : 'bg-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  {mics[selectedMicCategory].map((mic) => (
                    <div key={mic.name} className="flex items-center justify-between text-xs p-2 rounded bg-slate-900/60 border border-slate-800/80">
                      <div>
                        <span className="font-mono text-amber-300 font-semibold block">{mic.name}</span>
                        <span className="text-slate-400 text-[11px]">{mic.use}</span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-400 italic hidden sm:inline">{mic.character}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Service Action Button */}
              <div>
                <button
                  onClick={() => onOpenBookingWithService('Live Tracking Lockout')}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs font-mono uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-amber-500/10"
                >
                  <span>Inquire About Tracking Dates</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* SERVICE 02: HIGH-DEFINITION MASTERING */}
        <div id="mastering" className="mb-24 pt-8 border-t border-slate-800/80">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Content & Details (Left) */}
            <div className="lg:col-span-6 space-y-6 order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-amber-400 font-bold tracking-widest uppercase">
                <Disc className="w-4 h-4 text-amber-400" />
                <span>SERVICE 02 • HIGH-DEFINITION MASTERING</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Clarity, Weight, and Dynamic Balance for Every Playback System.
              </h3>

              <div className="space-y-4 text-slate-300 text-sm leading-relaxed font-light">
                <p>
                  Modern algorithmic brickwall limiters often crush transient life and collapse soundstages. At GBP, mastering is an art form rooted in psychoacoustics and pristine analog outboard.
                </p>
                <p>
                  Centered around industry-standard <strong className="text-white font-medium">Prism Sound Dream HD AD8XR converters</strong>, custom high-voltage tube EQ, and transparent discrete analog dynamics processing, we sculpt mixes to translate effortlessly from club PA systems to high-end audiophile playback and streaming earbuds.
                </p>
              </div>

              {/* Mastering Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-start gap-2.5 text-xs text-slate-300">
                  <CheckCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>Prism Sound Dream AD8XR clocking & conversion</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-300">
                  <CheckCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>Custom GBP loudspeaker acoustic room monitoring</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-300">
                  <CheckCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>Certified Apple Digital Masters & Red Book DDP</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-300">
                  <CheckCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>Complimentary mix evaluation with every booking</span>
                </div>
              </div>

              {/* Mastering Chain Flow Diagram */}
              <div className="p-4 rounded-lg bg-[#0e1217] border border-slate-800">
                <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold mb-3">
                  REFERENCE MASTERING SIGNAL FLOW
                </div>
                <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono">
                  <div className="px-2.5 py-1.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
                    24-Bit / 96k Input
                  </div>
                  <span className="text-amber-500 font-bold">→</span>
                  <div className="px-2.5 py-1.5 rounded bg-amber-500/10 border border-amber-500/40 text-amber-300 font-bold">
                    Prism DA Converter
                  </div>
                  <span className="text-amber-500 font-bold">→</span>
                  <div className="px-2.5 py-1.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
                    Discrete Class-A EQ
                  </div>
                  <span className="text-amber-500 font-bold">→</span>
                  <div className="px-2.5 py-1.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
                    Custom Tube Dynamics
                  </div>
                  <span className="text-amber-500 font-bold">→</span>
                  <div className="px-2.5 py-1.5 rounded bg-amber-500/10 border border-amber-500/40 text-amber-300 font-bold">
                    Prism AD8XR Recapture
                  </div>
                </div>
              </div>

              {/* Service Action Button */}
              <div>
                <button
                  onClick={() => onOpenBookingWithService('High-Definition Mastering')}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs font-mono uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-amber-500/10"
                >
                  <span>Send Mix for Mastering Review</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Gear Visual (Right) */}
            <div className="lg:col-span-6 relative order-1 lg:order-2">
              <div className="rounded-lg overflow-hidden border border-slate-800 shadow-2xl relative group">
                <img
                  src={analogRackImg}
                  alt="Glenn Brown Analog Mastering Equipment and Stepped Attenuators"
                  className="w-full h-80 sm:h-[420px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d10] via-transparent to-black/30" />
                <div className="absolute top-4 left-4 px-2.5 py-1 rounded bg-amber-500/20 backdrop-blur-md border border-amber-500/40 text-[10px] font-mono uppercase tracking-wider text-amber-300 font-bold">
                  FACILITY 02 • HD MASTERING LAB
                </div>
              </div>

              {/* Master Deliverables Spec */}
              <div className="grid grid-cols-3 gap-2 mt-3 font-mono text-[11px] text-center">
                <div className="p-2 rounded bg-slate-900/80 border border-slate-800">
                  <span className="text-slate-400 block text-[9px]">CONVERTER</span>
                  <span className="text-white font-semibold">Prism Sound Dream</span>
                </div>
                <div className="p-2 rounded bg-slate-900/80 border border-slate-800">
                  <span className="text-slate-400 block text-[9px]">RESOLUTION</span>
                  <span className="text-amber-400 font-semibold">Up to 192kHz/24-Bit</span>
                </div>
                <div className="p-2 rounded bg-slate-900/80 border border-slate-800">
                  <span className="text-slate-400 block text-[9px]">DELIVERABLE</span>
                  <span className="text-emerald-400 font-semibold">DDP / Vinyl / Hi-Res</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SERVICE 03: ACOUSTIC DESIGN & CUSTOM HARDWARE */}
        <div id="acoustic-design" className="pt-8 border-t border-slate-800/80">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Visual: Acoustic Architecture Matrix */}
            <div className="lg:col-span-6 relative">
              <div className="rounded-lg p-6 bg-[#0e1217] border border-amber-500/30 shadow-2xl relative overflow-hidden">
                <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <Waves className="w-5 h-5 text-amber-400" />
                    <span className="font-mono text-xs uppercase tracking-wider text-white font-bold">
                      GBP ACOUSTIC LABORATORY & SPEAKER DESIGN
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                    27 Systems Installed
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="p-3 rounded bg-slate-900/80 border border-slate-800 flex items-start gap-3">
                    <div className="p-2 rounded bg-amber-500/10 text-amber-400 shrink-0">
                      <Cpu className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-mono font-bold text-white uppercase">TEF System & Acoustical Testing</h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Precision time-energy-frequency analysis measuring room reflection, waterfall resonance decay, and phase alignment on-site.
                      </p>
                    </div>
                  </div>

                  <div className="p-3 rounded bg-slate-900/80 border border-slate-800 flex items-start gap-3">
                    <div className="p-2 rounded bg-amber-500/10 text-amber-400 shrink-0">
                      <Layers className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-mono font-bold text-white uppercase">CAD Architectural Room Blueprints</h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Mathematical quadratic residue diffusors (QRD), tuned Helmholtz low-frequency diaphragmatic bass traps, and flutter-echo mitigation.
                      </p>
                    </div>
                  </div>

                  <div className="p-3 rounded bg-slate-900/80 border border-slate-800 flex items-start gap-3">
                    <div className="p-2 rounded bg-amber-500/10 text-amber-400 shrink-0">
                      <Volume2 className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-mono font-bold text-white uppercase">Bespoke GBP Custom Studio Loudspeakers</h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Large-scale custom active monitor systems engineered specifically for non-fatiguing dynamic linearity, utilized in studios for Eminem and Dr. Dre.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-5 p-3 rounded bg-amber-500/5 border border-amber-500/20 text-xs font-mono text-slate-300">
                  <span className="text-amber-400 font-bold block mb-1">ACOUSTIC CONSULTATION AVAILABILITY:</span>
                  Serving commercial recording facilities, private home screening suites, and performance venues nationwide with on-site acoustic analysis and tuning.
                </div>
              </div>
            </div>

            {/* Content & Details */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-amber-400 font-bold tracking-widest uppercase">
                <Wrench className="w-4 h-4 text-amber-400" />
                <span>SERVICE 03 • ACOUSTIC DESIGN & CUSTOM HARDWARE</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Transforming Physical Spaces Into Accurate Listening Environments.
              </h3>

              <div className="space-y-4 text-slate-300 text-sm leading-relaxed font-light">
                <p>
                  You cannot mix or master what you cannot accurately hear. More than 80% of perceived sonic flaws stem directly from uncontrolled room modes, boundary interference, and flutter reverberation.
                </p>
                <p>
                  Glenn Brown began his formal acoustic design studies in 1977 and completed his first commercial studio architectural blueprints in 1979. Today, <strong className="text-white font-medium">Glenn Brown Productions LLC</strong> provides turnkey acoustic engineering, room calibration, isolated ground systems, and bespoke studio monitors.
                </p>
              </div>

              {/* Capabilities checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-start gap-2.5 text-xs text-slate-300">
                  <CheckCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>Full-frequency TEF acoustical testing</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-300">
                  <CheckCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>Noise & structural vibration mitigation</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-300">
                  <CheckCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>Custom quadratic residue diffusor manufacture</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-300">
                  <CheckCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>Clean power & technical ground distribution</span>
                </div>
              </div>

              {/* Service Action Button */}
              <div>
                <button
                  onClick={() => onOpenBookingWithService('Acoustic Architecture Consultation')}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs font-mono uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-amber-500/10"
                >
                  <span>Schedule Acoustic Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
