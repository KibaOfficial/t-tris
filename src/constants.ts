// Copyright (c) 2024 KibaOfficial
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

let gameInit = false;
let gameOver = false;
let gameRun = true;
let paused = false;

export const GRID_ROWS = 20;
export const GRID_COLS = 10;
export const BLOCK_SIZE = 30;

export const GAME_AUDIOS = {
  THEME: 'assets/audio/theme.wav',
  // GAMEOVER: 'assets/audio/gameover.wav',
  // LEVELUP: 'assets/audio/levelup.wav'
}

export interface GameCanvas {
  game: HTMLCanvasElement;
  gameCtx: CanvasRenderingContext2D;
}

export function setGameInit(value: boolean) {
  gameInit = value;
}

export function setGameOver(value: boolean) {
  gameOver = value
}

export function getGameInit() {
  return gameInit;
}

export function setGameRun(value: boolean) {
  gameRun = value;
}

export function getGameRun() {
  return gameRun;
}

export function setPaused(value: boolean) {
  paused = value;
}

export function isPaused() {
  return paused;
}

export function isGameOver() {
  return gameOver;
}