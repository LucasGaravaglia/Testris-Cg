const lines = 20;
const columns = 10;
const squareSize = 24;

const width = columns * squareSize;
const height = lines * squareSize;

const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
const currentShape = 3;
const nextShape = 1;
let flagShape = true;

//0 - 6
const formats = [
  {
    f: [
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    color: "#f0f",
  },
  {
    f: [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0],
    ],
    color: "#ff0",
  },

  {
    f: [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0],
    ],
    color: "#0f0",
  },

  {
    f: [
      [1, 1],
      [1, 1],
    ],
    color: "#00f",
  },

  {
    f: [
      [0, 0, 1],
      [1, 1, 1],
      [0, 0, 0],
    ],
    color: "#009",
  },

  {
    f: [
      [1, 0, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],
    color: "#f00",
  },

  {
    f: [
      [1, 1, 1],
      [0, 1, 0],
      [0, 0, 0],
    ],
    color: "#900",
  },
];

let squares = [...Array(columns)].map(() => [...Array(lines)]);
for (let i = 0; i < columns; i++) {
  for (let j = 0; j < lines; j++) {
    squares[i][j] = 0;
  }
}

const drawSquare = (x, y, _color) => {
  context.fillStyle = _color;
  context.fillRect(x, y, squareSize, squareSize);
};

const drawGrid = () => {
  context.strokeStyle = "#ccc";
  context.beginPath();
  for (let i = 1; i < lines; i++) {
    context.moveTo(1, squareSize * i);
    context.lineTo(width, squareSize * i);
  }
  for (let j = 1; j < columns; j++) {
    context.moveTo(squareSize * j, 1);
    context.lineTo(squareSize * j, height);
  }
  context.stroke();
};

const drawBorder = () => {
  context.strokeStyle = "#444";
  context.strokeRect(1, 1, width, height);
};

const newTetramino = (x = 0, y = 0, clear = false) => {
  for (let i = 0; i < formats[currentShape].f.length; i++) {
    for (let j = 0; j < formats[currentShape].f.length; j++) {
      if (formats[currentShape].f[i][j]) {
        if (clear) squares[i + x][j + y] = 0;
        else squares[i + x][j + y] = 1;
      }
    }
  }
  return true;
};

const drawSquares = () => {
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < lines; j++) {
      if (squares[i][j]) {
        drawSquare(i * squareSize, j * squareSize, formats[currentShape].color);
      }
    }
  }
};

let temp = 0;
const runFrame = () => {
  if (formats[currentShape].f.length + temp + 1 <= lines) {
    if (temp !== -1) flagShape = newTetramino(0, temp, true);
    newTetramino(0, temp + 1);
    temp++;
  } else {
    flagShape = false;
  }
};
const clearFrame = () => {
  for (let i = 0; i < columns; i++)
    for (let j = 0; j < lines; j++)
      if (!squares[i][j]) drawSquare(i * squareSize, j * squareSize, "#fff");
};

timeStamp = 500;
const gameLoop = async () => {
  if (flagShape) runFrame();
  clearFrame();
  drawSquares();
  drawGrid();
  drawBorder();
  await sleep(timeStamp);
  requestAnimationFrame(gameLoop);
};

window.addEventListener("keydown", (event) => {
  if (event.keyCode == 37) {
    console.log("Left");
    timeStamp -= 100;
  } else if (event.keyCode == 38) console.log("Rotation");
  else if (event.keyCode == 39) {
    console.log("Right");
    timeStamp += 100;
  }
  // else if (event.keyCode == 40) currentShape.moveBottom();
});

gameLoop();

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
