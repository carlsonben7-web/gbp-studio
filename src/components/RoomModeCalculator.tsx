import React, { useState, useMemo } from 'react';
import { Calculator, Waves, Sparkles, AlertCircle, CheckCircle2, ChevronRight } from 'lucide-react';

export const RoomModeCalculator: React.FC = () => {
  const [unit, setUnit] = useState<'feet' | 'meters'>('feet');
  const [length, setLength] = useState<number>(22);
  const [width, setWidth] = useState<number>(16);
  const [height, setHeight] = useState<number>(10);

  // Speed of sound: 1130 ft/s or 343 m/s
  const speedOfSound = unit === 'feet' ? 1130 : 343;

  // Calculate fundamental axial modes (f = c / (2 * dimension))
  const modes = useMemo(() => {
    const l = Math.max(1, length);
    const w = Math.max(1, width);
    const h = Math.max(1, height);

    const fL1 = speedOfSound / (2 * l);
    const fL2 = 2 * fL1;
    const fL3 = 3 * fL1;

    const fW1 = speedOfSound / (2 * w);
    const fW2 = 2 * fW1;
    const fW3 = 3 * fW1;

    const fH1 = speedOfSound / (2 * h);
    const fH2 = 2 * fH1;
    const fH3 = 3 * fH1;

    // Room volume
    const volume = l * w * h;
    // Approximate Schroeder frequency: fs ≈ 2000 * sqrt(T60 / V), assuming standard untreated T60 ~ 0.5s
    const schroeder = unit === 'feet' 
      ? 2000 * Math.sqrt(0.5 / (volume * 0.0283168)) 
      : 2000 * Math.sqrt(0.5 / volume);

    // Check Bolt area proportion ratio (height:width:length)
    const ratioW = w / h;
    const ratioL = l / h;
    const isGoodRatio = (ratioW >= 1.2 && ratioW <= 1.6) && (ratioL >= 1.8 && ratioL <= 2.4);

    return {
      fL: [fL1, fL2, fL3],
      fW: [fW1, fW2, fW3],
      fH: [fH1, fH2, fH3],
      volume,
      schroeder: Math.round(schroeder),
      isGoodRatio,
      ratioW: ratioW.toFixed(2),
      ratioL: ratioL.toFixed(2),
    };
  }, [length, width, height, speedOfSound, unit]);

  return (
    <section id="room-calculator" className="py-20 bg-[#080a0c] border-b border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold">
              ENGINEERING UTILITY
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white mb-3">
            Axial Room Mode & Resonance Diagnostic
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            Every enclosed space has resonant frequencies where standing waves create severe bass peaks and nulls.
            Enter your room dimensions below to diagnose primary low-end acoustic interference.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls */}
          <div className="lg:col-span-5 bg-[#0e1217] border border-slate-800 rounded-lg p-6 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold">
                ROOM DIMENSIONS
              </span>
              <div className="flex rounded bg-slate-900 p-0.5 border border-slate-800 text-xs font-mono">
                <button
                  onClick={() => setUnit('feet')}
                  className={`px-3 py-1 rounded transition-colors ${
                    unit === 'feet' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400'
                  }`}
                >
                  Feet
                </button>
                <button
                  onClick={() => setUnit('meters')}
                  className={`px-3 py-1 rounded transition-colors ${
                    unit === 'meters' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400'
                  }`}
                >
                  Meters
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-mono text-slate-300 mb-1.5">
                  <span>Length ({unit}):</span>
                  <span className="text-amber-400 font-bold">{length} {unit}</span>
                </div>
                <input
                  type="range"
                  min="8"
                  max="60"
                  value={length}
                  onChange={(e) => setLength(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono text-slate-300 mb-1.5">
                  <span>Width ({unit}):</span>
                  <span className="text-amber-400 font-bold">{width} {unit}</span>
                </div>
                <input
                  type="range"
                  min="6"
                  max="45"
                  value={width}
                  onChange={(e) => setWidth(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono text-slate-300 mb-1.5">
                  <span>Ceiling Height ({unit}):</span>
                  <span className="text-amber-400 font-bold">{height} {unit}</span>
                </div>
                <input
                  type="range"
                  min="6"
                  max="25"
                  value={height}
                  onChange={(e) => setHeight(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>
            </div>

            <div className="p-3.5 rounded bg-slate-900 border border-slate-800 text-xs font-mono space-y-1">
              <div className="flex justify-between text-slate-400">
                <span>Room Volume:</span>
                <span className="text-white">{modes.volume.toLocaleString()} cu. {unit}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Dimensional Ratio:</span>
                <span className="text-white">1.00 : {modes.ratioW} : {modes.ratioL}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Schroeder Frequency:</span>
                <span className="text-amber-400 font-bold">~{modes.schroeder} Hz</span>
              </div>
            </div>
          </div>

          {/* Results Output */}
          <div className="lg:col-span-7 bg-[#0e1217] border border-amber-500/30 rounded-lg p-6 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
                CALCULATED AXIAL STANDING WAVES
              </span>
              <span className="text-[10px] font-mono text-slate-400">
                First 3 Harmonics per Dimension
              </span>
            </div>

            {/* Mode Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
              {/* Length modes */}
              <div className="p-3 rounded bg-slate-900/90 border border-slate-800">
                <span className="text-amber-400 font-bold block mb-2 text-[11px]">LENGTH MODES</span>
                <div className="space-y-1.5 text-slate-300">
                  <div className="flex justify-between">
                    <span className="text-slate-500">1st (f1):</span>
                    <span className="text-white font-semibold">{modes.fL[0].toFixed(1)} Hz</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">2nd (f2):</span>
                    <span className="text-white font-semibold">{modes.fL[1].toFixed(1)} Hz</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">3rd (f3):</span>
                    <span className="text-white font-semibold">{modes.fL[2].toFixed(1)} Hz</span>
                  </div>
                </div>
              </div>

              {/* Width modes */}
              <div className="p-3 rounded bg-slate-900/90 border border-slate-800">
                <span className="text-amber-400 font-bold block mb-2 text-[11px]">WIDTH MODES</span>
                <div className="space-y-1.5 text-slate-300">
                  <div className="flex justify-between">
                    <span className="text-slate-500">1st (f1):</span>
                    <span className="text-white font-semibold">{modes.fW[0].toFixed(1)} Hz</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">2nd (f2):</span>
                    <span className="text-white font-semibold">{modes.fW[1].toFixed(1)} Hz</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">3rd (f3):</span>
                    <span className="text-white font-semibold">{modes.fW[2].toFixed(1)} Hz</span>
                  </div>
                </div>
              </div>

              {/* Height modes */}
              <div className="p-3 rounded bg-slate-900/90 border border-slate-800">
                <span className="text-amber-400 font-bold block mb-2 text-[11px]">HEIGHT MODES</span>
                <div className="space-y-1.5 text-slate-300">
                  <div className="flex justify-between">
                    <span className="text-slate-500">1st (f1):</span>
                    <span className="text-white font-semibold">{modes.fH[0].toFixed(1)} Hz</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">2nd (f2):</span>
                    <span className="text-white font-semibold">{modes.fH[1].toFixed(1)} Hz</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">3rd (f3):</span>
                    <span className="text-white font-semibold">{modes.fH[2].toFixed(1)} Hz</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Architectural Diagnostic Assessment */}
            <div className="p-4 rounded bg-slate-900/60 border border-slate-800 text-xs text-slate-300 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-mono font-bold">
                <Sparkles className="w-4 h-4" />
                <span>GBP ACOUSTIC RECOMMENDATION:</span>
              </div>
              <p className="font-light leading-relaxed">
                Fundamental axial resonance occurs at <strong className="text-white font-mono">{modes.fL[0].toFixed(1)} Hz</strong> and <strong className="text-white font-mono">{modes.fW[0].toFixed(1)} Hz</strong>.
                Frequencies below {modes.schroeder} Hz behave modally where boundary reflections produce strong phase cancellations.
              </p>
              <p className="text-slate-400">
                Recommended treatment: Tuned membrane bass traps on front/rear boundary corners and high-density timber quadratic residue diffusers (QRD) on reflection zones to ensure flat frequency response.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
