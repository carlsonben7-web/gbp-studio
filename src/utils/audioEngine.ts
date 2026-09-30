/**
 * Web Audio API Engine for GBP Studio Acoustics Demonstration
 * Generates an organic harmonic musical passage and provides real-time
 * A/B switching between Raw Mixdown and Glenn Brown HD Analog Master.
 */

class AudioDemoEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private isMastered: boolean = true;
  private timer: number | null = null;
  private gainNode: GainNode | null = null;
  private filterHigh: BiquadFilterNode | null = null;
  private filterLow: BiquadFilterNode | null = null;
  private waveshaper: WaveShaperNode | null = null;
  private analyserL: AnalyserNode | null = null;
  private analyserR: AnalyserNode | null = null;
  private step: number = 0;

  private makeDistortionCurve(amount: number = 20) {
    const k = typeof amount === 'number' ? amount : 20;
    const n_samples = 44100;
    const curve = new Float32Array(n_samples);
    const deg = Math.PI / 180;
    for (let i = 0; i < n_samples; ++i) {
      const x = (i * 2) / n_samples - 1;
      curve[i] = ((3 + k) * x * 20 * deg) / (Math.PI + k * Math.abs(x));
    }
    return curve;
  }

  public init() {
    if (this.ctx) return;
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    this.ctx = new AudioCtx();

    // Master bus
    this.gainNode = this.ctx.createGain();
    this.gainNode.gain.value = 0.45;

    // Tube saturation emulation
    this.waveshaper = this.ctx.createWaveShaper();
    this.waveshaper.curve = this.makeDistortionCurve(6);
    this.waveshaper.oversample = '4x';

    // High frequency sheen EQ (Mastering top-end air)
    this.filterHigh = this.ctx.createBiquadFilter();
    this.filterHigh.type = 'highshelf';
    this.filterHigh.frequency.value = 8500;
    this.filterHigh.gain.value = 3.5;

    // Solid low-end contour (GBP punch)
    this.filterLow = this.ctx.createBiquadFilter();
    this.filterLow.type = 'lowshelf';
    this.filterLow.frequency.value = 75;
    this.filterLow.gain.value = 2.8;

    // Analyzers for stereo VU meters
    const splitter = this.ctx.createChannelSplitter(2);
    this.analyserL = this.ctx.createAnalyser();
    this.analyserR = this.ctx.createAnalyser();
    this.analyserL.fftSize = 256;
    this.analyserR.fftSize = 256;

    // Routing
    this.waveshaper.connect(this.filterLow);
    this.filterLow.connect(this.filterHigh);
    this.filterHigh.connect(this.gainNode);
    this.gainNode.connect(this.ctx.destination);
    this.gainNode.connect(splitter);
    splitter.connect(this.analyserL, 0);
    splitter.connect(this.analyserR, 1);

    this.updateProcessingMode();
  }

  public togglePlay(onStateChange?: (playing: boolean) => void): boolean {
    this.init();
    if (!this.ctx) return false;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    if (this.isPlaying) {
      this.stop();
      if (onStateChange) onStateChange(false);
      return false;
    } else {
      this.start();
      if (onStateChange) onStateChange(true);
      return true;
    }
  }

  public setMasteredMode(mastered: boolean) {
    this.isMastered = mastered;
    this.updateProcessingMode();
  }

  private updateProcessingMode() {
    if (!this.filterHigh || !this.filterLow || !this.gainNode) return;
    const now = this.ctx ? this.ctx.currentTime : 0;

    if (this.isMastered) {
      // Glenn Brown HD Master: Pristine sheen, tight weight, warm harmonics
      this.filterHigh.gain.setTargetAtTime(3.5, now, 0.05);
      this.filterLow.gain.setTargetAtTime(2.8, now, 0.05);
      this.gainNode.gain.setTargetAtTime(0.55, now, 0.05);
    } else {
      // Raw unmastered mix: Duller, slightly attenuated, lower RMS
      this.filterHigh.gain.setTargetAtTime(-2.0, now, 0.05);
      this.filterLow.gain.setTargetAtTime(-1.0, now, 0.05);
      this.gainNode.gain.setTargetAtTime(0.35, now, 0.05);
    }
  }

  private playNote(freq: number, type: OscillatorType, duration: number, startDelay: number, volume: number = 0.2, pan: number = 0) {
    if (!this.ctx || !this.waveshaper) return;
    const now = this.ctx.currentTime + startDelay;

    const osc = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();
    const panner = this.ctx.createStereoPanner();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);

    // Warm envelope
    noteGain.gain.setValueAtTime(0.0001, now);
    noteGain.gain.exponentialRampToValueAtTime(volume, now + 0.03);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    panner.pan.setValueAtTime(pan, now);

    osc.connect(noteGain);
    noteGain.connect(panner);
    panner.connect(this.waveshaper);

    osc.start(now);
    osc.stop(now + duration + 0.1);
  }

  private triggerChord(rootFreq: number, intervalType: 'maj7' | 'min7' | 'dom7', time: number) {
    const semitones = intervalType === 'maj7' ? [0, 4, 7, 11, 14] : intervalType === 'min7' ? [0, 3, 7, 10, 14] : [0, 4, 7, 10];
    semitones.forEach((st, idx) => {
      const f = rootFreq * Math.pow(2, st / 12);
      const pan = (idx - 1.5) * 0.45;
      this.playNote(f, 'sine', 1.8, time, 0.12, pan);
      this.playNote(f * 2, 'triangle', 1.2, time + 0.02, 0.03, -pan);
    });
  }

  private triggerBass(freq: number, time: number) {
    this.playNote(freq, 'sawtooth', 0.65, time, 0.22, 0);
    this.playNote(freq * 0.5, 'sine', 0.7, time, 0.35, 0);
  }

  private triggerKick(time: number) {
    if (!this.ctx || !this.waveshaper) return;
    const now = this.ctx.currentTime + time;
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();

    osc.frequency.setValueAtTime(120, now);
    osc.frequency.exponentialRampToValueAtTime(42, now + 0.12);

    g.gain.setValueAtTime(0.4, now);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

    osc.connect(g);
    g.connect(this.waveshaper);
    osc.start(now);
    osc.stop(now + 0.26);
  }

  private start() {
    this.isPlaying = true;
    this.step = 0;

    const chords = [
      { root: 146.83, type: 'min7' as const, bass: 73.42 }, // D min
      { root: 196.00, type: 'dom7' as const, bass: 98.00 }, // G 7
      { root: 130.81, type: 'maj7' as const, bass: 65.41 }, // C maj7
      { root: 174.61, type: 'maj7' as const, bass: 87.31 }, // F maj7
    ];

    const bpm = 88;
    const stepDuration = (60 / bpm); // ~0.68s per beat

    const scheduleLoop = () => {
      if (!this.isPlaying) return;
      const currentChord = chords[Math.floor(this.step / 4) % chords.length];
      const beatInBar = this.step % 4;

      if (beatInBar === 0) {
        this.triggerChord(currentChord.root, currentChord.type, 0);
        this.triggerBass(currentChord.bass, 0);
        this.triggerKick(0);
      } else if (beatInBar === 2) {
        this.triggerKick(0);
        this.triggerBass(currentChord.bass * 1.5, 0);
      } else if (beatInBar === 3) {
        this.triggerBass(currentChord.bass, 0);
      }

      this.step++;
      this.timer = window.setTimeout(scheduleLoop, stepDuration * 1000);
    };

    scheduleLoop();
  }

  public stop() {
    this.isPlaying = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  public getLevels(): { left: number; right: number } {
    if (!this.isPlaying || !this.analyserL || !this.analyserR) {
      return { left: 0, right: 0 };
    }

    const dataL = new Uint8Array(this.analyserL.frequencyBinCount);
    const dataR = new Uint8Array(this.analyserR.frequencyBinCount);
    this.analyserL.getByteTimeDomainData(dataL);
    this.analyserR.getByteTimeDomainData(dataR);

    let sumL = 0;
    let sumR = 0;
    for (let i = 0; i < dataL.length; i++) {
      const vL = (dataL[i] - 128) / 128;
      const vR = (dataR[i] - 128) / 128;
      sumL += vL * vL;
      sumR += vR * vR;
    }

    const rmsL = Math.sqrt(sumL / dataL.length);
    const rmsR = Math.sqrt(sumR / dataR.length);

    // Map to normalized scale 0 to 1
    const factor = this.isMastered ? 3.4 : 2.1;
    return {
      left: Math.min(1, rmsL * factor),
      right: Math.min(1, rmsR * factor),
    };
  }
}

export const audioEngine = new AudioDemoEngine();
