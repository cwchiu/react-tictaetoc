import { CIRCLE, CROSS } from "./constants";
import React from "react";
import Cross from "./components/Cross/index";
import Circle from "./components/Circle/index";
const _ = require("lodash");

export class Block {
  constructor(id, owner = 0) {
    this.id = id;
    this.owner = owner;
  }

  hasOwner() {
    return this.owner !== 0;
  }

  draw() {
    const theme = {
      scaleFactor: 5
    };

    if (this.owner === CIRCLE) {
      return <Circle theme={theme} />;
    } else if (this.owner === CROSS) {
      return <Cross theme={theme} />;
    }
    return null;
  }

  get(v) {
    return this.id;
  }
}

export const initBlocks = () => [
  new Block(0),
  new Block(1),
  new Block(2),

  new Block(3),
  new Block(4),
  new Block(5),

  new Block(6),
  new Block(7),
  new Block(8)
];

const WIN_CASE = [
  // 橫向
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // 縱向
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  // 右斜
  [2, 4, 6],
  // 左斜
  [0, 4, 8]
];

export const checkWin = (blocks) => {

  for (let item of WIN_CASE) {
    //console.log(item);
    console.log(blocks.filter(block => item.includes(block.id)));
    const sum = blocks.filter(block => item.includes(block.id)).reduce((c,block) => c + block.owner, 0);

    if (Math.abs(sum) === 3) {
      return sum > 0 ? CIRCLE : CROSS;
    }

  }
  console.log('result: false');
  return 0;
};

