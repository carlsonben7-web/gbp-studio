import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Disc, Sparkles, Sliders, Activity, Volume2, ShieldCheck, Zap } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

export const AudioABPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMastered, setIsMastered] = useState(true);
  const [analogWarmth, setAnalogWarmth] = useState(true);
  const [meterLevels, setMeterLevels] = useState({ left: 0, right: 0 });
  const animFrameRef = useRef<number | null>(null);

  const handlePlayToggle = () => {
    const active = audioEngine.togglePlay((playing) => setIsPlaying(playing));
    setIsPlaying(active);
  };

  const handleToggleMode = (mastered: boolean) => {
    setIsMastered(mastered);
    audioEngine.setMasteredMode(mastered);
  };

  // Monitor meter levels for authentic VU needle animation
  useEffect(() => {
    const loop = () => {
      if (isPlaying) {
        const lvls = audioEngine.getLevels();
        setMeterLevels(lvls);
      } else {
        setMeterLevels((prev) => ({
          left: Math.max(0, prev.left * 0.85),
          right: Math.max(0, prev.right * 0.85),
        }));
      }
      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPlaying]);

  // Clean up audio on unmount
  useEffect(() => {
    return () => {
      audioEngine.stop();
    };
  }, []);

  // Compute rotation angle for VU needle (-45 deg to +45 deg)
  const needleAngleL = -40 + meterLevels.left * 78;
  const needleAngleR = -40 + meterLevels.right * 78;

  return (
    <div className="bg-[#12161c] border border-amber-500/25 rounded-lg p-5 sm:p-7 shadow-2xl relative overflow-hidden">
      {/* Decorative Console Rack Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse shadow-lg shadow-amber-500/80" />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono tracking-widest uppercase text-amber-400 font-bold">
                GBP REFERENCE CONSOLE A/B ENGINE
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 border border-slate-700">
                PRISM SOUND AD8XR PATH
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Direct live audition: Unmastered Stem Mix vs. Glenn Brown HD Analog Master
            </p>
          </div>
        </div>

        {/* Playback Trigger */}
        <button
          onClick={handlePlayToggle}
          className={`flex items-center gap-2.5 px-4 py-2.5 rounded font-mono text-xs uppercase tracking-wider font-bold transition-all cursor-pointer shadow-lg ${
            isPlaying
              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 hover:bg-rose-500/30'
              : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/20'
          }`}
        >
          {isPlaying ? (
            <>
              <Pause className="w-4 h-4 fill-current" />
              <span>Halt Audition</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-current" />
              <span>Audition Real-Time A/B</span>
            </>
          )}
        </button>
      </div>

      {/* Main Rack Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6">
        {/* Left: Dual Analog VU Meters */}
        <div className="lg:col-span-6 bg-[#0b0d10] border border-slate-800 rounded p-4 relative">
          <div className="text-[10px] font-mono tracking-widest text-slate-400 uppercase mb-3 flex items-center justify-between">
            <span>BALLISTIC STEREO VU METERS (dBu)</span>
            <span className={`text-[10px] font-mono ${isPlaying ? 'text-emerald-400' : 'text-slate-600'}`}>
              {isPlaying ? 'SIGNAL LOCKED' : 'STANDBY'}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Left Channel VU */}
            <div className="bg-[#181d24] border border-amber-900/30 rounded p-3 text-center relative overflow-hidden">
              <div className="text-[10px] font-mono text-amber-500/80 mb-1 font-bold">CH A — LEFT</div>
              {/* Dial face */}
              <div className="h-24 relative flex items-end justify-center pb-2">
                {/* Scale markings */}
                <div className="absolute top-2 left-0 right-0 flex justify-between px-3 text-[9px] font-mono text-slate-400">
                  <span>-20</span>
                  <span>-10</span>
                  <span>-3</span>
                  <span className="text-amber-400 font-bold">0</span>
                  <span className="text-rose-500 font-bold">+3</span>
                </div>
                {/* Arc line */}
                <div className="absolute top-7 left-4 right-4 h-9 border-t border-slate-600 rounded-t-full opacity-40" />

                {/* Needle */}
                <div
                  className="w-0.5 h-16 bg-gradient-to-t from-amber-600 via-amber-400 to-rose-500 origin-bottom transition-transform duration-75 ease-out shadow-sm"
                  style={{ transform: `rotate(${needleAngleL}deg)` }}
                />
                {/* Pivot cap */}
                <div className="absolute bottom-1 w-4 h-4 rounded-full bg-slate-800 border border-slate-600 shadow" />
              </div>
              <div className="text-[10px] font-mono text-slate-400 mt-1">
                {(meterLevels.left * 10 - 7).toFixed(1)} dB
              </div>
            </div>

            {/* Right Channel VU */}
            <div className="bg-[#181d24] border border-amber-900/30 rounded p-3 text-center relative overflow-hidden">
              <div className="text-[10px] font-mono text-amber-500/80 mb-1 font-bold">CH B — RIGHT</div>
              {/* Dial face */}
              <div className="h-24 relative flex items-end justify-center pb-2">
                {/* Scale markings */}
                <div className="absolute top-2 left-0 right-0 flex justify-between px-3 text-[9px] font-mono text-slate-400">
                  <span>-20</span>
                  <span>-10</span>
                  <span>-3</span>
                  <span className="text-amber-400 font-bold">0</span>
                  <span className="text-rose-500 font-bold">+3</span>
                </div>
                {/* Arc line */}
                <div className="absolute top-7 left-4 right-4 h-9 border-t border-slate-600 rounded-t-full opacity-40" />

                {/* Needle */}
                <div
                  className="w-0.5 h-16 bg-gradient-to-t from-amber-600 via-amber-400 to-rose-500 origin-bottom transition-transform duration-75 ease-out shadow-sm"
                  style={{ transform: `rotate(${needleAngleR}deg)` }}
                />
                {/* Pivot cap */}
                <div className="absolute bottom-1 w-4 h-4 rounded-full bg-slate-800 border border-slate-600 shadow" />
              </div>
              <div className="text-[10px] font-mono text-slate-400 mt-1">
                {(meterLevels.right * 10 - 7).toFixed(1)} dB
              </div>
            </div>
          </div>

          {/* Calibrated Signal Stats */}
          <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-800/80 text-center font-mono text-[10px]">
            <div className="bg-slate-900/80 p-1.5 rounded">
              <span className="text-slate-400 block">SAMPLING</span>
              <span className="text-amber-400 font-bold">96.0 kHz</span>
            </div>
            <div className="bg-slate-900/80 p-1.5 rounded">
              <span className="text-slate-400 block">RESOLUTION</span>
              <span className="text-amber-400 font-bold">24-Bit Linear</span>
            </div>
            <div className="bg-slate-900/80 p-1.5 rounded">
              <span className="text-slate-400 block">DYNAMIC RANGE</span>
              <span className="text-emerald-400 font-bold">{isMastered ? '118.4 dB' : '104.2 dB'}</span>
            </div>
          </div>
        </div>

        {/* Right: Master Switcher & Signal Processors */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400 mb-2">
              PROCESSING COMPARISON SELECTOR
            </div>

            {/* Toggle Buttons */}
            <div className="grid grid-cols-2 gap-3 p-1.5 bg-[#0b0d10] border border-slate-800 rounded">
              <button
                onClick={() => handleToggleMode(false)}
                className={`py-3 px-3 rounded font-mono text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer flex flex-col items-center gap-1 ${
                  !isMastered
                    ? 'bg-slate-800 text-amber-300 border border-amber-500/40 shadow-inner'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <span>[A] RAW MIXDOWN</span>
                <span className="text-[10px] font-normal text-slate-400 lowercase">pre-mastered flat mix</span>
              </button>

              <button
                onClick={() => handleToggleMode(true)}
                className={`py-3 px-3 rounded font-mono text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer flex flex-col items-center gap-1 ${
                  isMastered
                    ? 'bg-gradient-to-r from-amber-600/30 to-amber-500/20 text-amber-300 border border-amber-500/70 shadow-lg shadow-amber-500/10'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>[B] GLENN BROWN MASTER</span>
                </div>
                <span className="text-[10px] font-normal text-amber-400/80 lowercase">prism sound + analog iron</span>
              </button>
            </div>
          </div>

          {/* Dynamic Comparison Analysis Box */}
          <div className="p-4 rounded border border-slate-800/80 bg-[#0d1015] text-xs font-mono space-y-2">
            <div className="flex items-center justify-between text-slate-300">
              <span className="text-slate-400">Current Harmonic State:</span>
              <span className={`font-bold ${isMastered ? 'text-amber-400' : 'text-slate-400'}`}>
                {isMastered ? 'HD Analog Saturation & Width' : 'Standard Raw Summing'}
              </span>
            </div>
            <div className="flex items-center justify-between text-slate-300">
              <span className="text-slate-400">Low End Control (60Hz):</span>
              <span className={`font-bold ${isMastered ? 'text-emerald-400' : 'text-slate-400'}`}>
                {isMastered ? '+2.8dB Solid Resonance' : 'Untamed Sub Rumble'}
              </span>
            </div>
            <div className="flex items-center justify-between text-slate-300">
              <span className="text-slate-400">High Frequency Air (12kHz):</span>
              <span className={`font-bold ${isMastered ? 'text-amber-400' : 'text-slate-400'}`}>
                {isMastered ? 'Prism High-Shelf Radiance' : 'Attenuated Transient Edge'}
              </span>
            </div>
            <div className="flex items-center justify-between text-slate-300">
              <span className="text-slate-400">Stereo Coherence:</span>
              <span className={`font-bold ${isMastered ? 'text-emerald-400' : 'text-slate-400'}`}>
                {isMastered ? 'Elliptical Bass + 130% Soundstage' : '100% Narrow Pan'}
              </span>
            </div>
          </div>

          {/* Footnote */}
          <p className="text-[11px] text-slate-400 italic">
            *Audio rendered via real-time Web Audio API mathematical DSP model reflecting the GBP hardware mastering chain.
          </p>
        </div>
      </div>
    </div>
  );
};
