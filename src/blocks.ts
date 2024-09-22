// Copyright (c) 2024 KibaOfficial
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { BLOCK_SIZE } from "./constants.js";
import { colors, shapes, ShapeType } from "./shapes.js";
import { Vector2 } from "./vector.js";

export class Blocks {
  shape: number[][];
  position: Vector2;
  color: string;

  constructor(shapeType: ShapeType, position: Vector2) {
    this.shape = shapes[shapeType];
    this.position = position;
    this.color = colors[shapeType];
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = this.color;
    for (let y = 0; y < this.shape.length; y++) {
      for (let x = 0; x < this.shape[y].length; x++) {
        if (this.shape[y][x] === 1) {
          ctx.fillRect(
            (this.position.x + x) * BLOCK_SIZE,
            (this.position.y + y) * BLOCK_SIZE,
            BLOCK_SIZE,
            BLOCK_SIZE
          );
        }
      }
    }
  }

  rotate(): void {
    this.shape = this.shape[0].map((_, index) =>
      this.shape.map((row) => row[index]).reverse()
    );
  }

  move(direction: Vector2): void {
    this.position.add(direction);
  }
}