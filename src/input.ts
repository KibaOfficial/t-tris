// Copyright (c) 2024 KibaOfficial
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { isPaused, setPaused } from "./constants.js";
import { AudioManager } from './audio.js';

export class InputManager {
  private keys: Set<string> = new Set();
  private audioManager: AudioManager;

  constructor(audioManager: AudioManager) {
    this.audioManager = audioManager;
    document.addEventListener("keydown", this.onKeyDown.bind(this));
    document.addEventListener("keyup", (event) => {
      this.keys.delete(event.key);
    });
  }

  private onKeyDown(event: KeyboardEvent): void {
    if (event.key === "Escape") {
      setPaused(!isPaused());
    }
    if (!this.audioManager.getIsMuted()) {
      this.audioManager.playBackgroundMusic();
    }
    this.keys.add(event.key.toLowerCase());
  }

  isKeyPressed(key: string): boolean {
    return this.keys.has(key.toLowerCase());
  }
}
