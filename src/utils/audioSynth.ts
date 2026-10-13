// Pure Web Audio API ambient sound generator
// Generates gentle rain, campfire, or soft breeze without external audio files

class AmbientSoundManager {
  private ctx: AudioContext | null = null;
  private currentSource: AudioNode | null = null;
  private gainNode: GainNode | null = null;
  private isPlaying: boolean = false;
  private currentType: 'rain' | 'campfire' | 'breeze' | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public play(type: 'rain' | 'campfire' | 'breeze', volume: number = 0.25) {
    this.stop();
    this.initContext();
    if (!this.ctx) return;

    this.currentType = type;
    this.isPlaying = true;

    this.gainNode = this.ctx.createGain();
    this.gainNode.gain.setValueAtTime(volume, this.ctx.currentTime);
    this.gainNode.connect(this.ctx.destination);

    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    if (type === 'rain') {
      // Pink/Brown noise filtered for soothing rain
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.06;
        b6 = white * 0.115926;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, this.ctx.currentTime);

      whiteNoise.connect(filter);
      filter.connect(this.gainNode);
      whiteNoise.start();
      this.currentSource = whiteNoise;
    } else if (type === 'breeze') {
      // Soft sweeping gentle wind
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        output[i] = (lastOut + 0.02 * white) / 1.02;
        lastOut = output[i];
        output[i] *= 1.5;
      }

      const breezeNoise = this.ctx.createBufferSource();
      breezeNoise.buffer = noiseBuffer;
      breezeNoise.loop = true;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(450, this.ctx.currentTime);
      filter.Q.setValueAtTime(1.5, this.ctx.currentTime);

      breezeNoise.connect(filter);
      filter.connect(this.gainNode);
      breezeNoise.start();
      this.currentSource = breezeNoise;
    } else if (type === 'campfire') {
      // Brown noise with soft random crackles
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        output[i] = (lastOut + 0.02 * white) / 1.02;
        lastOut = output[i];
        if (Math.random() < 0.0008) {
          output[i] += (Math.random() * 2 - 1) * 0.8;
        }
      }

      const fireNoise = this.ctx.createBufferSource();
      fireNoise.buffer = noiseBuffer;
      fireNoise.loop = true;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(600, this.ctx.currentTime);

      fireNoise.connect(filter);
      filter.connect(this.gainNode);
      fireNoise.start();
      this.currentSource = fireNoise;
    }
  }

  public setVolume(volume: number) {
    if (this.gainNode && this.ctx) {
      this.gainNode.gain.setValueAtTime(volume, this.ctx.currentTime);
    }
  }

  public stop() {
    if (this.currentSource) {
      try {
        (this.currentSource as AudioBufferSourceNode).stop();
      } catch {
        // Ignored
      }
      this.currentSource.disconnect();
      this.currentSource = null;
    }
    this.isPlaying = false;
    this.currentType = null;
  }

  public getStatus() {
    return {
      isPlaying: this.isPlaying,
      type: this.currentType,
    };
  }
}

export const ambientSound = new AmbientSoundManager();
