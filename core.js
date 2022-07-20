const { construct } = require("core-js/fn/reflect");

const widthCanvas = 300;
const heightCanvas = 550;
const lines = 20;
const columns = 10;
const widthGrid = widthCanvas / columns; //x - largura
const heightGrid = heightCanvas / lines; //y - altura

const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

// let squares = [...Array(columns)].map(() => [...Array(lines)]);
// squares[3][3] = new square("#f0f");

// class square {
//   construct(_color) {
//     this.color = _color;
//   }
//   draw = (x, y) => {
//     context.fillStyle = this.color;
//     context.fillRect(x, y, x + widthGrid, y + heightGrid);
//   };
// }

const gameLoop = () => {
  drawGrid();
  // drawSquare();
  requestAnimationFrame(gameLoop);
};

const drawGrid = () => {
  context.strokeStyle = "#ccc";
  context.beginPath();
  for (let i = 1; i < lines; i++) {
    context.moveTo(0, heightGrid * i);
    context.lineTo(widthCanvas, heightGrid * i);
  }
  for (let j = 1; j < columns; j++) {
    context.moveTo(widthGrid * j, 0);
    context.lineTo(widthGrid * j, heightCanvas);
  }
  context.stroke();
};

// const drawSquare = () => {
//   for (let i = 0; i < lines; i++) {
//     for (let j = 0; j < columns; j++) {
//       if (squares[j][i]) {
//         squares[j][i].draw(widthGrid * (j + 1), heightGrid * (i + 1));
//       }
//     }
//   }
// };

window.addEventListener("keydown", (event) => {
  if (event.keyCode == 37) console.log("Left");
  else if (event.keyCode == 38) console.log("Rotation");
  else if (event.keyCode == 39) console.log("Right");
  // else if (event.keyCode == 40) currentShape.moveBottom();
});

gameLoop();
