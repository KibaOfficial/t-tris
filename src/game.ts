// Copyright (c) 2024 KibaOfficial
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { BLOCK_SIZE, getGameInit, setGameInit, getGameRun, setPaused, isPaused, GRID_COLS, GRID_ROWS, GameCanvas } from "./constants.js";
import { drawGrid, initGameField, renderNextPiece, updateLayer } from "./utils.js";
import { InputManager } from "./input.js";
import { Blocks } from "./blocks.js";
import { ShapeType } from "./shapes.js";
import { Vector2 } from "./vector.js";

let currentShapeIndex = 0;
const shapesArray = Object.values(ShapeType);
const delayBetweenShapes = 1000


const inputManager = new InputManager();

function initCanvas(): GameCanvas {
  const game = document.getElementById("game") as HTMLCanvasElement | null;

  if (game === null) {
    throw new Error("game element not found");
  }

  game.width = GRID_COLS * BLOCK_SIZE;
  game.height = GRID_ROWS * BLOCK_SIZE;

  const gameCtx = game.getContext("2d");

  if (gameCtx === null) {
    throw new Error("game context not found");
  }

  initGameField(gameCtx);

  return { game, gameCtx };
}

export function gameLoop() {
  if (!getGameInit()) {
    const { gameCtx } = initCanvas();
    initGameField(gameCtx);
    setGameInit(true);
  }

  if (getGameRun() && !isPaused()) {
    const { gameCtx } = initCanvas();

    updateLayer(gameCtx, (ctx) => {
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