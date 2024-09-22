// Copyright (c) 2024 KibaOfficial
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/**
 * Represents a 2D vector with x and y components.
 */
export class Vector2 {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  add(other: Vector2): void {
    this.x += other.x;
    this.y += other.y;
  }

  array(): [number, number] {
    return [this.x, this.y];
  }
}