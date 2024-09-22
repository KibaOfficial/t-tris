// Copyright (c) 2024 KibaOfficial
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Blocks } from "./blocks.js";
import { BLOCK_SIZE} from "./constants.js";
import { Vector2 } from "./vector.js";

export function drawLine(ctx: CanvasRenderingContext2D, p1: Vector2, p2: Vector2, color: string = "white", lineWidth: number = 1): void {
  ctx.save();
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;
  ctx.moveTo(p1.x * BLOCK_SIZE, p1.y * BLOCK_SIZE);
  ctx.lineTo(p2.x * BLOCK_SIZE, p2.y * BLOCK_SIZE);
  ctx.stroke();
  ctx.restore();
}

export function drawGrid(ctx: CanvasRenderingContext2D, GRID_COLS: number, GRID_ROWS: number, color: string = "#303030"): void {
  for (let x = 0; x <= GRID_COLS; x++) {
    drawLine(ctx, new Vector2(x, 0), new Vector2(x, GRID_ROWS), color);
  }
  for (let y = 0; y <= GRID_ROWS; y++) {
    drawLine(ctx, new Vector2(0, y), new Vector2(GRID_COLS, y), color);
  }
}

export function updateLayer(ctx: CanvasRenderingContext2D | null, drawFn: (ctx: CanvasRenderingContext2D) => void): void {
  if (ctx === null) {
    return;
  }
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  drawFn(ctx);
}

export function initGameField(ctx: CanvasRenderingContext2D): void {
  updateLayer(ctx, (ctx) => {
    drawGrid(ctx, 10, 24);
  });
}

export function renderNextPiece(nextPiece: Blocks, canvasId: string): void {
  const nextPieceCanvas = document.getElementById(canvasId) as HTMLCanvasElement;
  const ctx = nextPieceCanvas.getContext("2d");

  if (!ctx) return;

  ctx.clearRect(0, 0, nextPieceCanvas.width, nextPieceCanvas.height); // Canvas leeren

  drawGrid(ctx, 4, 4); // 4x4 Grid zeichnen

  // Form zeichnen
  nextPiece.draw(ctx);
}
