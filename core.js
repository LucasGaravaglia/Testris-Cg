import {
  height,
  width,
  gravity,
  context,
  sleep,
  columns,
  rows,
} from "./config.js";
import GameScreen from "./gameScreen.js";
import Piece from "./piece.js";

let nGravity = gravity;
let effectData = { x: 0, y: 0, color: "#000", count: 0, effect: -1 };
let rank = 0;
let initTimeStamp = new Date().getTime();

function generateColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const randomPiece = () => {
  return Math.floor(Math.random() * 8) + 1;
};

const randomEffect = () => {
  effectData.count = 0;
  gameScreen.grid[effectData.y][effectData.x] = 0;
  effectData.y = Math.floor(Math.random() * rows);
  effectData.x = Math.floor(Math.random() * columns);
  if (gameScreen.grid[effectData.y][effectData.x] != 0) {
    randomEffect();
    return;
  }
  effectData.color = generateColor();
  effectData.effect = 1;
  gameScreen.grid[effectData.y][effectData.x] = effectData.effect;
};

window.addEventListener("keydown", (event) => {
  if (event.keyCode == 37) {
    piece.left(gameScreen);
  } else if (event.keyCode == 38) {
    piece.rotate(gameScreen);
  } else if (event.keyCode == 39) {
    piece.right(gameScreen);
  } else if (event.keyCode == 40) {
    nGravity -= 100;
  }
});

const drawBorder = () => {
  context.strokeStyle = "#444";
  context.strokeRect(1, 1, width, height);
};

const drawEffect = () => {
  context.fillStyle = effectData.color;
  context.fillRect(
    effectData.x * 20 + 1,
    effectData.y * 20 + 1,
    20 - 1,
    20 - 1
  );
};
//Get hh:mm:ss
const getTime = (initTimeStamp) => {
  let time = new Date().getTime() - initTimeStamp;
  let seconds = Math.floor(time / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);
  seconds = seconds % 60;
  minutes = minutes % 60;
  return `${minutes < 10 ? `0${minutes}` : minutes}:${
    seconds < 10 ? `0${seconds}` : seconds
  }`;
};

const drawInfos = () => {
  context.clearRect(width + 1, 0, width + 100, height);
  context.fillStyle = "#111";
  context.font = "20px Arial";

  context.fillText(`Rank: ${rank}.`, width + 20, 20);
  context.fillText(`Tempo de jogo: ${getTime(initTimeStamp)}.`, width + 20, 40);

  nextPiece.draw(context, 150, 50);
};

const draw = () => {
  context.clearRect(0, 0, width + 100, height);
  gameScreen.draw(context, piece);
  drawEffect();
  piece.draw(context);
  drawBorder();
  drawInfos();
};

const run = async () => {
  let isDown = piece.down(gameScreen);
  if (isDown == 0) {
    nGravity = 400;
    if (effectData.count == 2) {
      randomEffect();
    } else {
      effectData.count++;
    }
    gameScreen.AddPiece(piece);
    removeLines = gameScreen.getRemoveLives();
    if (removeLines.length > 0) {
      rank += removeLines.length;
      gameScreen.dropLine(removeLines);
      randomEffect();
    }
    piece = nextPiece;
    nextPiece = new Piece(3, 0, randomPiece());

    for (let i = 0; i < piece.size; i++)
      for (let j = 0; j < piece.size; j++)
        if (
          piece.shape[i][j] > 0 &&
          gameScreen.grid[piece.y + i][piece.x + j] > 0
        ) {
          return window.confirm("Game Over");
        }
  }
  draw();

  await sleep(nGravity);
  requestAnimationFrame(run);
};

let gameScreen = new GameScreen();
let piece = new Piece(3, 0, randomPiece());
let nextPiece = new Piece(3, 0, randomPiece());
randomEffect();
let removeLines = [];

await run();
