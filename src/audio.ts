// Copyright (c) 2024 KibaOfficial
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { GAME_AUDIOS } from "./constants.js";

export class AudioManager {
  private audioContext: AudioContext | null = null;
  private backgroundBuffer: AudioBuffer | null = null;
  private soundBuffers: { [key: string]: AudioBuffer } = {};
  private isMuted: boolean;
  private volume: number;
  private backgroundSource: AudioBufferSourceNode | null = null;

  constructor() {
    this.isMuted = false;
    this.volume = 1.0;
    this.preloadSounds();
  }

  private async loadAudioFile(url: string): Promise<AudioBuffer> {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    return await this.audioContext!.decodeAudioData(arrayBuffer);
  }

  public async initializeAudioContext(): Promise<void> {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      await this.loadBackgroundMusic(GAME_AUDIOS.THEME);
    }
  }

  private async loadBackgroundMusic(url: string): Promise<void> {
    if (this.audioContext) {
      this.backgroundBuffer = await this.loadAudioFile(url);
    }
  }

  public async playBackgroundMusic(): Promise<void> {
    if (this.audioContext && !this.isMuted && this.backgroundBuffer) {
      if (this.backgroundSource) {
        this.backgroundSource.stop();
      }
      this.backgroundSource = this.audioContext.createBufferSource();
      this.backgroundSource.buffer = this.backgroundBuffer;

      const gainNode = this.audioContext.createGain();
      gainNode.gain.setValueAtTime(this.volume, this.audioContext.currentTime);
      this.backgroundSource.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      this.backgroundSource.loop = true;
      this.backgroundSource.start(0);
    }
  }

  public stopBackgroundMusic(): void {
    if (this.backgroundSource) {
      this.backgroundSource.stop();
      this.backgroundSource = null;
    }
  }

  public playSoundEffect(name: string): void {
    if (this.soundBuffers[name]) {
      const soundSource = this.audioContext!.createBufferSource();
      soundSource.buffer = this.soundBuffers[name];

      const gainNode = this.audioContext!.createGain();
      gainNode.gain.setValueAtTime(this.volume, this.audioContext!.currentTime);
      soundSource.connect(gainNode);
      gainNode.connect(this.audioContext!.destination);
      soundSource.start(0);
    } else {
      console.error(`[t-tris]: Sound effect ${name} not loaded.`);
    }
  }

  public toggleMute(newVolume: number): void {
    this.volume = Math.max(0, Math.min(newVolume, 1));
    if (this.backgroundSource) {
      const gainNode = this.audioContext!.createGain();
      gainNode.gain.setValueAtTime(this.volume, this.audioContext!.currentTime);
      this.backgroundSource.connect(gainNode);
      gainNode.connect(this.audioContext!.destination);
    }
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public async preloadSounds(): Promise<void> {
    // await this.loadSoundEffect('GAMEOVER', GAME_AUDIOS.GAMEOVER);
    // await this.loadSoundEffect('LEVELUP', GAME_AUDIOS.LEVELUP);
  }
}
