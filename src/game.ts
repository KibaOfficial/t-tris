// Copyright (c) 2024 KibaOfficial
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import { BLOCK_SIZE, getGameInit, setGameInit, getGameRun, isPaused, GRID_COLS, GRID_ROWS, GameCanvas } from "./constants.js";
import { drawGrid, initGameField, renderNextPiece, updateLayer } from "./utils.js";
import { InputManager } from "./input.js";
import { AudioManager } from "./audio.js";
import { Blocks } from "./blocks.js";
import { ShapeType } from "./shapes.js";
import { Vector2 } from "./vector.js";

let currentShapeIndex = 0;
const shapesArray = Object.values(ShapeType);
const delayBetweenShapes = 1000;
let gameCtx: CanvasRenderingContext2D | null = null;

const audioManager = new AudioManager();
const inputManager = new InputManager(audioManager);

function initCanvas(): GameCanvas {
  const game = document.getElementById("game") as HTMLCanvasElement | null;

  if (game === null) {
    throw new Error("game element not found");
  }

  game.width = GRID_COLS * BLOCK_SIZE;
  game.height = GRID_ROWS * BLOCK_SIZE;

  const ctx = game.getContext("2d");

  if (ctx === null) {
    throw new Error("game context not found");
  }

  initGameField(ctx);

  return { game, gameCtx: ctx };
}

export async function gameLoop() {
  if (!getGameInit()) {
    const canvasObj = initCanvas();
    gameCtx = canvasObj.gameCtx;
    setGameInit(true);
    await audioManager.initializeAudioContext();
  }

  if (getGameRun() && !isPaused()) {
    updateLayer(gameCtx!, (ctx) => {
      drawGrid(ctx, GRID_COLS, GRID_ROWS);
    });

    const nextShapeType = shapesArray[currentShapeIndex];
    const nextPiece = new Blocks(nextShapeType, new Vector2(0, 0));
    renderNextPiece(nextPiece, "next-piece");

    currentShapeIndex = (currentShapeIndex + 1) % shapesArray.length;

    setTimeout(() => {
      requestAnimationFrame(gameLoop);
    }, delayBetweenShapes);
  } else {
    requestAnimationFrame(gameLoop);
  }
}
