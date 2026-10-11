/**
 * Synthesizes peaceful mountain wind and distant Qingjiang river water sounds
 * using the Web Audio API without needing external audio files.
 */
class AmbientSoundManager {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private gainNode: GainNode | null = null;
  private noiseNode: AudioBufferSourceNode | null = null;

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }

  public start() {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!this.ctx) {
        this.ctx = new AudioCtx();
      }
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      // Generate 5-second loop of brown/pink noise (wind & flowing river sound)
      const bufferSize = this.ctx.sampleRate * 5;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      let lastOut = 0.0;

      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        // Brown noise filter for deep, soothing river rumble and mountain breeze
        lastOut = (lastOut + 0.02 * white) / 1.02;
        data[i] = lastOut * 3.5;
      }

      this.noiseNode = this.ctx.createBufferSource();
      this.noiseNode.buffer = buffer;
      this.noiseNode.loop = true;

      // Gentle lowpass filter for distant mountain river flow
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 380;

      // Gentle highpass to remove harsh rumble
      const highpass = this.ctx.createBiquadFilter();
      highpass.type = 'highpass';
      highpass.frequency.value = 80;

      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(0.01, this.ctx.currentTime);
      this.gainNode.gain.linearRampToValueAtTime(0.12, this.ctx.currentTime + 2.5);

      this.noiseNode.connect(filter);
      filter.connect(highpass);
      highpass.connect(this.gainNode);
      this.gainNode.connect(this.ctx.destination);

      this.noiseNode.start(0);
      this.isPlaying = true;
    } catch {
      // Audio context might be restricted before user gesture
      this.isPlaying = false;
    }
  }

  public transitionToScene(scene: string) {
    try {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        this.ctx = new AudioCtx();
      }
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      if (!this.isPlaying) {
        this.start();
      }

      if (this.gainNode && this.ctx) {
        const now = this.ctx.currentTime;
        // Target volume and filter depending on scene
        let targetGain = 0.10;
        if (scene === 'cover') targetGain = 0.08;
        if (scene === 'cabin') targetGain = 0.09;
        if (scene === 'qingjiang') targetGain = 0.13;
        if (scene === 'lamp') targetGain = 0.07;
        if (scene === 'finalLetter') {
          targetGain = 0.10;
          // Trigger gentle morning birds in final letter
          this.playMorningAmbience();
        }

        // Smooth crossfade transition (1.5s)
        this.gainNode.gain.cancelScheduledValues(now);
        this.gainNode.gain.setValueAtTime(this.gainNode.gain.value, now);
        this.gainNode.gain.linearRampToValueAtTime(targetGain, now + 1.5);
      }
    } catch {
      // ignore
    }
  }

  public playPageTurnSound() {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!this.ctx) {
        this.ctx = new AudioCtx();
      }
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      const t = this.ctx.currentTime;
      // Synthesize soft rustling paper / wind sweep
      const bufferSize = Math.floor(this.ctx.sampleRate * 0.85);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.ctx.sampleRate * 0.35));
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(450, t);
      filter.frequency.exponentialRampToValueAtTime(180, t + 0.7);
      filter.Q.value = 1.8;

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.08, t);
      gain.gain.linearRampToValueAtTime(0.001, t + 0.8);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start(t);
    } catch {
      // ignore
    }
  }

  public playRadioTuningBroadcast(onVoice?: () => void, onEnd?: () => void) {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!this.ctx) {
        this.ctx = new AudioCtx();
      }
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      const t = this.ctx.currentTime;
      const duration = 4.2;
      const sampleRate = this.ctx.sampleRate;
      const buffer = this.ctx.createBuffer(1, Math.floor(sampleRate * duration), sampleRate);
      const data = buffer.getChannelData(0);

      // Analog static noise + periodic wave
      for (let i = 0; i < data.length; i++) {
        const white = Math.random() * 2 - 1;
        data[i] = white * 0.45;
      }

      const noiseSource = this.ctx.createBufferSource();
      noiseSource.buffer = buffer;

      // Bandpass radio speaker filter
      const bandpass = this.ctx.createBiquadFilter();
      bandpass.type = 'bandpass';
      bandpass.frequency.setValueAtTime(800, t);
      bandpass.frequency.linearRampToValueAtTime(1400, t + 1.2);
      bandpass.frequency.linearRampToValueAtTime(950, t + 2.5);
      bandpass.Q.value = 3.5;

      // Carrier whistling oscillator (heterodyne frequency whistle)
      const osc = this.ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, t);
      osc.frequency.exponentialRampToValueAtTime(880, t + 1.2);
      osc.frequency.exponentialRampToValueAtTime(440, t + 2.2);

      const oscGain = this.ctx.createGain();
      oscGain.gain.setValueAtTime(0.02, t);
      oscGain.gain.linearRampToValueAtTime(0.005, t + 2.0);
      oscGain.gain.linearRampToValueAtTime(0.0, t + 2.5);

      const mainGain = this.ctx.createGain();
      mainGain.gain.setValueAtTime(0.12, t);
      mainGain.gain.linearRampToValueAtTime(0.16, t + 2.2);
      // Abrupt cutout after voice
      mainGain.gain.setValueAtTime(0.14, t + 3.4);
      mainGain.gain.linearRampToValueAtTime(0.001, t + 3.8);

      noiseSource.connect(bandpass);
      bandpass.connect(mainGain);
      osc.connect(oscGain);
      oscGain.connect(mainGain);
      mainGain.connect(this.ctx.destination);

      noiseSource.start(t);
      osc.start(t);
      noiseSource.stop(t + duration);
      osc.stop(t + 2.5);

      // Voice trigger at 2.2s
      setTimeout(() => {
        if (onVoice) onVoice();

        // Attempt Web Speech API faint whisper
        if ('speechSynthesis' in window) {
          try {
            const utter = new SpeechSynthesisUtterance('清江');
            utter.lang = 'zh-CN';
            utter.rate = 0.75;
            utter.pitch = 0.8;
            utter.volume = 0.5;
            window.speechSynthesis.speak(utter);
          } catch {}
        }
      }, 2100);

      setTimeout(() => {
        if (onEnd) onEnd();
      }, Math.floor(duration * 1000));
    } catch {
      if (onVoice) onVoice();
      if (onEnd) onEnd();
    }
  }

  public playStoneStepSound() {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!this.ctx) this.ctx = new AudioCtx();
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(160, t);
      osc.frequency.exponentialRampToValueAtTime(70, t + 0.18);
      gain.gain.setValueAtTime(0.09, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.22);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.24);
    } catch {}
  }

  public playWoodBoxOpenSound() {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!this.ctx) this.ctx = new AudioCtx();
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const t = this.ctx.currentTime;
      // Soft wood friction
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(140, t);
      osc.frequency.linearRampToValueAtTime(260, t + 0.35);
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 450;
      gain.gain.setValueAtTime(0.04, t);
      gain.gain.linearRampToValueAtTime(0.001, t + 0.38);
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.4);
    } catch {}
  }

  public playTinBoxSound() {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!this.ctx) this.ctx = new AudioCtx();
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1450, t);
      osc.frequency.exponentialRampToValueAtTime(680, t + 0.3);
      gain.gain.setValueAtTime(0.06, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.32);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.35);
    } catch {}
  }

  public playDigSoilSound() {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!this.ctx) this.ctx = new AudioCtx();
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const t = this.ctx.currentTime;
      const buffer = this.ctx.createBuffer(1, Math.floor(this.ctx.sampleRate * 0.15), this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < data.length; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.ctx.sampleRate * 0.05));
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 320;
      filter.Q.value = 1.4;
      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.06, t);
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      noise.start(t);
    } catch {}
  }

  public playWaterLapSound() {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!this.ctx) this.ctx = new AudioCtx();
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const t = this.ctx.currentTime;
      // Soft river water splash & lap
      const buffer = this.ctx.createBuffer(1, Math.floor(this.ctx.sampleRate * 0.4), this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < data.length; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.ctx.sampleRate * 0.12));
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(480, t);
      filter.frequency.linearRampToValueAtTime(220, t + 0.35);
      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.08, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.38);
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      noise.start(t);
    } catch {}
  }

  public playMossWipeSound() {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!this.ctx) this.ctx = new AudioCtx();
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const t = this.ctx.currentTime;
      // Tactile stone & moss friction
      const buffer = this.ctx.createBuffer(1, Math.floor(this.ctx.sampleRate * 0.25), this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < data.length; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.sin((i / this.ctx.sampleRate) * Math.PI * 40);
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(420, t);
      filter.Q.setValueAtTime(1.8, t);
      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.06, t);
      gain.gain.linearRampToValueAtTime(0.001, t + 0.24);
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      noise.start(t);
    } catch {}
  }

  public playFluteChimeSound() {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!this.ctx) this.ctx = new AudioCtx();
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const notes = [293.66, 369.99, 440.0, 587.33]; // D4, F#4, A4, D5 (serene pentatonic)
      notes.forEach((freq, idx) => {
        const t = this.ctx!.currentTime + idx * 0.55;
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t);
        gain.gain.setValueAtTime(0.001, t);
        gain.gain.linearRampToValueAtTime(0.05, t + 0.15);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 1.6);
        osc.connect(gain);
        gain.connect(this.ctx!.destination);
        osc.start(t);
        osc.stop(t + 1.8);
      });
    } catch {}
  }

  public playDoorCreakSound() {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!this.ctx) this.ctx = new AudioCtx();
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const t = this.ctx.currentTime;

      // Authentic slow wooden door creak (modulated sawtooth with slow lowpass filter)
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(80, t);
      osc.frequency.exponentialRampToValueAtTime(190, t + 0.5);
      osc.frequency.linearRampToValueAtTime(140, t + 0.9);
      osc.frequency.exponentialRampToValueAtTime(95, t + 1.4);

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(260, t);
      filter.frequency.linearRampToValueAtTime(420, t + 0.8);
      filter.Q.value = 4.0;

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.08, t + 0.2);
      gain.gain.linearRampToValueAtTime(0.06, t + 1.1);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 1.5);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 1.55);
    } catch {}
  }

  public playPourWaterSound() {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!this.ctx) this.ctx = new AudioCtx();
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const t = this.ctx.currentTime;
      const duration = 2.0;

      // Filtered bubbling water noise
      const bufferSize = Math.floor(this.ctx.sampleRate * duration);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.35;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(500, t);
      filter.frequency.linearRampToValueAtTime(750, t + duration * 0.7);
      filter.frequency.linearRampToValueAtTime(600, t + duration);
      filter.Q.value = 2.2;

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.01, t);
      gain.gain.linearRampToValueAtTime(0.07, t + 0.3);
      gain.gain.setValueAtTime(0.06, t + duration - 0.4);
      gain.gain.linearRampToValueAtTime(0.001, t + duration);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start(t);
      noise.stop(t + duration);
    } catch {}
  }

  public playTeaCupPlaceSound() {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!this.ctx) this.ctx = new AudioCtx();
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const t = this.ctx.currentTime;

      // Soft earthenware clink on wood
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(820, t);
      osc.frequency.exponentialRampToValueAtTime(320, t + 0.12);

      gain.gain.setValueAtTime(0.07, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.14);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.15);
    } catch {}
  }

  public playRadioStaticWhisper(onVoice?: (msg: string) => void, onEnd?: () => void) {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!this.ctx) this.ctx = new AudioCtx();
      if (this.ctx.state === 'suspended') this.ctx.resume();

      const t = this.ctx.currentTime;
      const duration = 3.6;
      const bufferSize = Math.floor(this.ctx.sampleRate * duration);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.4;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(850, t);
      filter.frequency.linearRampToValueAtTime(1100, t + 1.2);
      filter.frequency.linearRampToValueAtTime(720, t + 2.4);
      filter.Q.value = 3.2;

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.08, t);
      gain.gain.linearRampToValueAtTime(0.12, t + 1.0);
      gain.gain.setValueAtTime(0.1, t + 2.6);
      gain.gain.linearRampToValueAtTime(0.001, t + duration);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start(t);
      noise.stop(t + duration);

      setTimeout(() => {
        if (onVoice) onVoice('……清江……');
      }, 1000);

      setTimeout(() => {
        if (onVoice) onVoice('……回来……');
      }, 2100);

      setTimeout(() => {
        if (onEnd) onEnd();
      }, Math.floor(duration * 1000));
    } catch {
      if (onVoice) onVoice('……清江……');
      if (onEnd) onEnd();
    }
  }

  public playMorningAmbience() {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!this.ctx) this.ctx = new AudioCtx();
      if (this.ctx.state === 'suspended') this.ctx.resume();

      // Start base river/wind if not already playing
      if (!this.isPlaying) {
        this.start();
      }

      // Synthesize periodic subtle dawn bird calls (delicate, high, distant)
      const playChirp = () => {
        if (!this.ctx || this.ctx.state === 'suspended') return;
        const now = this.ctx.currentTime;
        const birdOsc = this.ctx.createOscillator();
        const birdGain = this.ctx.createGain();
        birdOsc.type = 'sine';
        birdOsc.frequency.setValueAtTime(2800, now);
        birdOsc.frequency.exponentialRampToValueAtTime(3600, now + 0.08);
        birdOsc.frequency.exponentialRampToValueAtTime(2400, now + 0.18);

        birdGain.gain.setValueAtTime(0.001, now);
        birdGain.gain.linearRampToValueAtTime(0.012, now + 0.04);
        birdGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);

        birdOsc.connect(birdGain);
        birdGain.connect(this.ctx.destination);
        birdOsc.start(now);
        birdOsc.stop(now + 0.25);
      };

      // Play 2-3 distant chirps spaced naturally
      setTimeout(playChirp, 1200);
      setTimeout(playChirp, 1600);
      setTimeout(playChirp, 4200);
      setTimeout(playChirp, 7500);
    } catch {}
  }

  public playFinalMelody(onEnd?: () => void) {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!this.ctx) this.ctx = new AudioCtx();
      if (this.ctx.state === 'suspended') this.ctx.resume();

      // Poignant, warm, pentatonic progression (D, F#, A, B, E, D) evoking nostalgic warmth and emotional closure
      // D major / pentatonic notes in Hz
      const notes = [
        { freq: 293.66, time: 0.0, dur: 2.2 },   // D4
        { freq: 369.99, time: 0.8, dur: 2.4 },   // F#4
        { freq: 440.00, time: 1.8, dur: 2.8 },   // A4
        { freq: 493.88, time: 3.2, dur: 2.5 },   // B4
        { freq: 440.00, time: 4.6, dur: 3.0 },   // A4
        { freq: 369.99, time: 6.2, dur: 3.5 },   // F#4
        { freq: 293.66, time: 8.0, dur: 5.5 },   // D4
      ];

      notes.forEach((n) => {
        const t = this.ctx!.currentTime + n.time;
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(n.freq, t);

        gain.gain.setValueAtTime(0.0001, t);
        gain.gain.linearRampToValueAtTime(0.045, t + 0.4);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + n.dur);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);
        osc.start(t);
        osc.stop(t + n.dur + 0.1);
      });

      if (onEnd) {
        setTimeout(onEnd, 12000);
      }
    } catch {
      if (onEnd) onEnd();
    }
  }

  public playPaperFoldSound() {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!this.ctx) this.ctx = new AudioCtx();
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const t = this.ctx.currentTime;
      const bufferSize = Math.floor(this.ctx.sampleRate * 0.4);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.ctx.sampleRate * 0.15));
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(600, t);
      filter.frequency.linearRampToValueAtTime(320, t + 0.35);
      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.06, t);
      gain.gain.linearRampToValueAtTime(0.001, t + 0.38);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      noise.start(t);
    } catch {}
  }

  public playWarmLampLitSound() {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!this.ctx) this.ctx = new AudioCtx();
      if (this.ctx.state === 'suspended') this.ctx.resume();

      // Deep, serene warm harmonic chord for the lamp lighting till dawn
      const chords = [220.0, 277.18, 329.63, 440.0]; // A3, C#4, E4, A4
      chords.forEach((freq, i) => {
        const t = this.ctx!.currentTime + i * 0.08;
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t);
        gain.gain.setValueAtTime(0.001, t);
        gain.gain.linearRampToValueAtTime(0.04, t + 0.3);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 2.8);
        osc.connect(gain);
        gain.connect(this.ctx!.destination);
        osc.start(t);
        osc.stop(t + 3.0);
      });
    } catch {}
  }

  public stop() {
    if (this.gainNode && this.ctx) {
      try {
        this.gainNode.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 1.2);
        setTimeout(() => {
          if (this.noiseNode) {
            try {
              this.noiseNode.stop();
              this.noiseNode.disconnect();
            } catch {}
          }
          this.isPlaying = false;
        }, 1200);
      } catch {
        this.isPlaying = false;
      }
    } else {
      this.isPlaying = false;
    }
  }
}

export const ambientSound = new AmbientSoundManager();
