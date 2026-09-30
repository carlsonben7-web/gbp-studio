import React from 'react';
import { Award, Compass, Cpu, Music2, Sparkles, CheckCircle2, SlidersHorizontal, Layers } from 'lucide-react';
import analogRackImg from '../assets/images/gbp_analog_gear_1790785861451.jpg';

export const FounderBio: React.FC = () => {
  return (
    <section id="founder" className="py-20 lg:py-28 bg-[#090b0e] border-b border-slate-800/80 relative overflow-hidden">
      {/* Subtle diffuser background lines */}
      <div className="absolute inset-0 bg-diffuser-pattern opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Eyebrow */}
        <div className="flex items-center gap-2 mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold">
            THE HERITAGE & SCIENCE
          </span>
        </div>

        {/* Section Headline */}
        <div className="max-w-3xl mb-12">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight mb-5">
            Engineered with the Discipline of Physics. <br />
            <span className="text-amber-400">Crafted with the Ear of a Musician.</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Glenn Brown doesn’t just capture sound—he shapes the physical medium through which music lives.
            With four decades of acoustic architectural mastery and major-label production, his work stands as an
            uncompromising benchmark in modern recording.
          </p>
        </div>

        {/* Bio Layout: Narrative & Hardware Photography */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
          {/* Narrative Column */}
          <div className="lg:col-span-7 space-y-5 text-slate-300 text-sm sm:text-base leading-relaxed font-light">
            <p>
              With over four decades behind the console, a <strong className="text-white font-semibold">Grammy Award as Producer, Engineer, and Mastering Engineer</strong>,
              four additional Grammy nominations, and dual Emmy honors, Glenn Brown’s discography spans more than a thousand albums across rock, jazz, classical, electronic, and film scores.
            </p>

            <p>
              Unlike modern producers who rely solely on digital presets and automated algorithms, Glenn’s training began in electrical engineering, acoustics, and pure physics in the late 1970s. As chief engineer at major recording studios, he recognized early on that an exceptional master isn’t made inside a software box—it is born in the acoustic linearity of the room, the purity of isolated power grids, and the synergy of rare analog iron with reference digital conversion.
            </p>

            <p>
              In 1979, Glenn designed his first commercial studio architectural acoustics, going on to supervise the construction of world-class recording complexes, sound stages, and performance halls nationwide. His proprietary <strong className="text-amber-300 font-medium">GBP Custom Studio Loudspeaker Systems</strong> have been commissioned in 27 world-class facilities across Michigan, New York, and California—relied on by legends including <span className="text-white font-medium">Eminem, Kid Rock, and Dr. Dre</span> for surgical low-frequency clarity.
            </p>

            <p className="border-l-2 border-amber-500/60 pl-4 py-1 text-slate-200 italic text-sm">
              &ldquo;An acoustic space and an analog signal path shouldn't alter the artist’s emotional intent; their sole job is to reveal every nuanced transient with absolute authority and zero compromise.&rdquo;
            </p>

            <div className="pt-2 flex flex-wrap gap-2 text-xs font-mono">
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">
                • NARAS / Grammy Voting Member
              </span>
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">
                • Audio Engineering Society (AES)
              </span>
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">
                • TEF Acoustic Analysis Certified
              </span>
            </div>
          </div>

          {/* Analog Gear & Console Visual Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-lg overflow-hidden border border-amber-500/30 shadow-2xl group">
              <img
                src={analogRackImg}
                alt="Glenn Brown Analog Mastering Equipment and Vacuum Tubes"
                className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d10] via-transparent to-black/30" />
              
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded bg-[#0d1015]/90 backdrop-blur-md border border-slate-800">
                <div className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold mb-1">
                  DISCRETE ANALOG MASTERING CHAIN
                </div>
                <div className="text-xs text-slate-300">
                  Custom vacuum tube outboard, discrete class-A circuitry, and Prism Sound Dream HD converters.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Metric Bento Stat Callouts */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-6 rounded-lg bg-[#0e1217] border border-slate-800 hover:border-amber-500/40 transition-colors">
            <div className="text-3xl sm:text-4xl font-bold font-display text-white mb-1">1,000+</div>
            <div className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold mb-2">
              Album & Film Credits
            </div>
            <p className="text-xs text-slate-400">
              Spanning four decades across major labels, orchestral works, and independent masterpieces.
            </p>
          </div>

          <div className="p-6 rounded-lg bg-[#0e1217] border border-slate-800 hover:border-amber-500/40 transition-colors">
            <div className="text-3xl sm:text-4xl font-bold font-display text-white mb-1">Grammy & Emmy</div>
            <div className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold mb-2">
              Awarded Production
            </div>
            <p className="text-xs text-slate-400">
              Grammy winner as Producer, Engineer & Mastering Engineer, plus 4 Grammy nominations and 2 Emmys.
            </p>
          </div>

          <div className="p-6 rounded-lg bg-[#0e1217] border border-slate-800 hover:border-amber-500/40 transition-colors">
            <div className="text-3xl sm:text-4xl font-bold font-display text-white mb-1">27+ Systems</div>
            <div className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold mb-2">
              Custom GBP Monitors
            </div>
            <p className="text-xs text-slate-400">
              Bespoke large-scale loudspeaker installations active in premier studios in MI, NY, and CA.
            </p>
          </div>

          <div className="p-6 rounded-lg bg-[#0e1217] border border-slate-800 hover:border-amber-500/40 transition-colors">
            <div className="text-3xl sm:text-4xl font-bold font-display text-white mb-1">0.0001%</div>
            <div className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold mb-2">
              THD Reference Path
            </div>
            <p className="text-xs text-slate-400">
              Prism Sound Dream HD AD8XR clocking delivering mathematically pristine transient conversion.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
