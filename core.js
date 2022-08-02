import { height, width, gravity, canvas, context, sleep } from "./config.js";
import GameScreen from "./gameScreen.js";
import Piece from "./piece.js";

let nGravity = gravity;

const randomPiece = () => {
  return 4;
  return Math.floor(Math.random() * 8) + 1;
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

const draw = () => {
  context.clearRect(0, 0, width, height);
  gameScreen.draw(context, piece);
  piece.draw(context);
  drawBorder();
};

const run = async () => {
  let isDown = piece.down(gameScreen);
  if (isDown == 0) {
    nGravity = 400;
    gameScreen.AddPiece(piece);
    removeLines = gameScreen.getRemoveLives();
    if (removeLines.length > 0) gameScreen.dropLine(removeLines);
    piece = new Piece(3, 0, randomPiece());

    for (let i = 0; i < piece.size; i++)
      for (let j = 0; j < piece.size; j++)
        if (
          piece.shape[i][j] != 0 &&
          gameScreen.grid[piece.y + i][piece.x + j] != 0
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
let removeLines = [];

if (await run()) window.location.reload();
