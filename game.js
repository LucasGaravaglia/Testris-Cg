import piece from "./piece.js";
import grid from "./grid.js";
import { context, width, height, rows, columns } from "./config.js";

let gravity = 500;

let tetramino = new piece(3, 1, 1);
let countTetramino = 0;
let gameGrid = new grid();

const drawBorder = () => {
  context.strokeStyle = "#444";
  context.strokeRect(1, 1, width, height);
};

const run = async () => {
  draw();
  tetramino.down(gameGrid);
  drawBorder();
  await sleep(gravity);
  requestAnimationFrame(run);
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const draw = () => {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      if (tetramino.grid[i][j] != 0) {
        ctx.fillStyle = "#000";
        ctx.fillRect(j * 20, i * 20, 20, 20);
      }
    }
  }
};

run();

// window.addEventListener("keydown", (event) => {
//   if (event.keyCode == 37) {
//     if (movCol - 1 >= 0) {
//       movCol--;
//     }
//   } else if (event.keyCode == 38) console.log("Rotation");
//   else if (event.keyCode == 39) {
//     if (movCol + 1 <= columns) {
//       movCol++;
//     }
//   }
//   // else if (event.keyCode == 40) currentShape.moveBottom();
// });
