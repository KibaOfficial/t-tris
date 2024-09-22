// Copyright (c) 2024 KibaOfficial
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

export enum ShapeType {
  I = "I",
  O = "O",
  T = "T",
  S = "S",
  Z = "Z",
  J = "J",
  L = "L",
}

export const shapes: Record<ShapeType, number[][]> = {
  [ShapeType.I]: [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]],
  [ShapeType.O]: [[0, 0, 0, 0], [0, 1, 1, 0], [0, 1, 1, 0], [0, 0, 0, 0]],
  [ShapeType.T]: [[0, 0, 0, 0], [0, 1, 1, 1], [0, 0, 1, 0], [0, 0, 0, 0]],
  [ShapeType.S]: [[0, 0, 0, 0], [0, 1, 1, 0], [1, 1, 0, 0], [0, 0, 0, 0]],
  [ShapeType.Z]: [[0, 0, 0, 0], [0, 1, 1, 0], [1, 1, 0, 0], [0, 0, 0, 0]],
  [ShapeType.J]: [[0, 0, 0, 0], [1, 0, 0, 0], [1, 1, 1, 0], [0, 0, 0, 0]],
  [ShapeType.L]: [[0, 0, 0, 0], [0, 0, 1, 0], [1, 1, 1, 0], [0, 0, 0, 0]],
};


export const colors: Record<ShapeType, string> = {
  [ShapeType.I]: 'cyan',
  [ShapeType.O]: 'yellow',
  [ShapeType.T]: 'purple',
  [ShapeType.S]: 'green',
  [ShapeType.Z]: 'red',
  [ShapeType.J]: 'blue',
  [ShapeType.L]: 'orange',  
}