// Copyright (c) 2024 KibaOfficial
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { GAME_AUDIOS } from "./constants.js";

/**
 * Manages the audio context and playback of background music and sound effects for the game.
 */
export class AudioManager {
  private audioContext: AudioContext | null = null;  
  private backgroundBuffer: AudioBuffer | null = null;
  private soundBuffers: { [key: string]: AudioBuffer } = {};
  private isMuted: boolean;
  private isSoundPlaying: boolean = false;
  private volume: number;
  private backgroundSource: AudioBufferSourceNode | null = null;
  private backgroundStartTime: number = 0;
  private backgroundPauseTime: number = 0;

  /**
   * Initializes the AudioManager and preloads any necessary sounds.
   */
  constructor() {
    this.isMuted = false;
    this.volume = 0.3;
    this.preloadSounds();
  }

  /**
   * Loads an audio file from the provided URL and returns an AudioBuffer.
   * @param {string} url - The URL of the audio file to load.
   * @returns {Promise<AudioBuffer>}A promise that resolves to the loaded AudioBuffer.
   */
  private async loadAudioFile(url: string): Promise<AudioBuffer> {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    return await this.audioContext!.decodeAudioData(arrayBuffer);
  }

  /**
   * Initializes the audio context and loads the background music.
   * Should be called to prepare audio before playing any sounds.
   */
  public async initializeAudioContext(): Promise<void> {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      await this.loadBackgroundMusic(GAME_AUDIOS.THEME);
    }
  }

  /**
   * Loads the background music from the provided URL into the background buffer.
   * @param {string} url - The URL of the background music file.
   */
  private async loadBackgroundMusic(url: string): Promise<void> {
    if (this.audioContext) {
      this.backgroundBuffer = await this.loadAudioFile(url);
    }
  }

  /**
   * Plays the background music in a loop if the audio context is initialized and not muted.
   */
  public playBackgroundMusic(): void {
    if (this.isSoundPlaying) {
      return;
    }
    if (this.audioContext && !this.isMuted && this.backgroundBuffer) {
      this.backgroundSource = this.audioContext.createBufferSource();
      this.backgroundSource.buffer = this.backgroundBuffer;

      const gainNode = this.audioContext.createGain();
      gainNode.gain.setValueAtTime(this.volume, this.audioContext.currentTime);
      this.backgroundSource.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      this.backgroundSource.loop = true;

      this.backgroundSource.start(0, this.backgroundPauseTime);
      this.backgroundStartTime = this.audioContext.currentTime - this.backgroundPauseTime;
      this.isSoundPlaying = true;
    }
  }

  public pauseBackgroundMusic(): void {
    if (this.backgroundSource && this.isSoundPlaying) {
      this.backgroundPauseTime = this.audioContext!.currentTime - this.backgroundStartTime;
      this.backgroundSource.stop();
      this.backgroundSource = null;
      this.isSoundPlaying = false;
    }
  }

  /**
   * Stops the background music if it is currently playing.
   */
  public stopBackgroundMusic(): void {
    if (this.backgroundSource) {
      this.backgroundSource.stop();
      this.backgroundSource = null;
    }
    this.isSoundPlaying = false;
    this.backgroundPauseTime = 0;
  }

  /**
   * Plays a sound effect by its name if it has been preloaded.
   * @param {string} name - The name of the sound effect to play.
   */
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

  /**
   * Toggles the mute state of the audio and adjusts the volume to the specified level.
   * @param {number} newVolume - A value between 0 and 1 representing the desired volume level.
   */
  public toggleMute(newVolume: number): void {
    this.volume = Math.max(0, Math.min(newVolume, 1));
    if (this.backgroundSource) {
      const gainNode = this.audioContext!.createGain();
      gainNode.gain.setValueAtTime(this.volume, this.audioContext!.currentTime);
      this.backgroundSource.connect(gainNode);
      gainNode.connect(this.audioContext!.destination);
    }
  }

  /**
   * Returns whether the audio is currently muted.
   * @returns {boolean} `true` if muted, otherwise `false`.
   */
  public getIsMuted(): boolean {
    return this.isMuted;
  }

  /**
   * Preloads sound effects into memory. This function should be expanded
   * to include the necessary sound files for the game.
   */
  public async preloadSounds(): Promise<void> {
    // await this.loadSoundEffect('GAMEOVER', GAME_AUDIOS.GAMEOVER);
    // await this.loadSoundEffect('LEVELUP', GAME_AUDIOS.LEVELUP);
  }
}
