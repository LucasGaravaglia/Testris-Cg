const size = 20;
const rows = 20;
const columns = 10;
const height = size * rows;
const width = size * columns;
const gravity = 100;

const colors = [
  "#00f",
  "#f00",
  "#0f0",
  "#0ff",
  "#f51",
  "#25f",
  "#f25",
  "#453123",
];

class Piece {
  constructor(x, y, type) {
    this.y = y;
    this.x = x;
    this.type = type;
    if (type == 1) {
      this.shape = [
        [0, type, 0],
        [0, type, type],
        [0, 0, type],
      ];
      this.size = 3;
    } else if (type == 2) {
      this.shape = [
        [0, 0, 0],
        [type, type, type],
        [0, type, 0],
      ];
      this.size = 3;
    } else if (type == 3) {
      this.shape = [
        [0, 0, 0],
        [type, 0, 0],
        [type, type, type],
      ];
      this.size = 3;
    } else if (type == 4) {
      this.shape = [
        [type, type],
        [type, type],
      ];
      this.size = 2;
    } else if (type == 5) {
      this.shape = [
        [0, 0, 0],
        [0, 0, type],
        [type, type, type],
      ];
      this.size = 3;
    } else if (type == 6) {
      this.shape = [
        [0, 0, 0],
        [type, type, 0],
        [0, type, type],
      ];
      this.size = 3;
    } else if (type == 7) {
      this.shape = [
        [0, 0, 0],
        [0, type, type],
        [type, type, 0],
      ];
      this.size = 3;
    } else if (type == 8) {
      this.shape = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [type, type, type, type],
      ];
      this.size = 4;
    }
  }

  rotate(gameScreen) {
    let copy = [...Array(this.size)].map(() => [...Array(this.size)]);

    for (let i = 0; i < this.size; i++)
      for (let j = 0; j < this.size; j++)
        copy[j][this.size - 1 - i] = this.shape[i][j];

    for (let i = 0; i < this.size; i++)
      for (let j = 0; j < this.size; j++)
        if (
          copy[i][j] != 0 &&
          (this.y + j >= rows || gameScreen.grid[this.y + i][this.x + j] != 0)
        )
          return 0;

    for (let i = 0; i < this.size; i++)
      for (let j = 0; j < this.size; j++) this.shape[i][j] = copy[i][j];

    return 1;
  }

  down(gameScreen) {
    for (let i = 0; i < this.size; i++)
      for (let j = 0; j < this.size; j++) {
        if (
          this.shape[i][j] != 0 &&
          this.y + i + 1 < rows &&
          gameScreen.grid[this.y + i + 1][this.x + j] != 0
        )
          return 0;
        if (this.shape[i][j] != 0 && this.y + i + 1 >= rows) return 0;
      }
    this.y++;
    return 1;
  }
  right(gameScreen) {
    for (let i = 0; i < this.size; i++)
      for (let j = 0; j < this.size; j++) {
        if (this.shape[i][j] != 0 && this.x + 1 + j >= columns) return 0;
        if (gameScreen.grid[this.y][this.x] != 0 && this.shape[i][j] != 0)
          return 0;
      }

    this.x++;
    return 1;
  }
  left(gameScreen) {
    for (let i = 0; i < this.size; i++)
      for (let j = 0; j < this.size; j++) {
        if (gameScreen.grid[this.y][this.x] != 0 && this.shape[i][j] != 0)
          return 0;
        if (this.shape[i][j] != 0 && this.x - 1 + j < 0) return 0;
      }

    this.x--;
    return 1;
  }

  draw(ctx) {
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        if (this.shape[i][j] != 0) {
          ctx.fillStyle = "#000";
          ctx.fillRect((this.x + j) * 20, (this.y + i) * 20, 20, 20);
          ctx.fillStyle = colors[this.shape[i][j] - 1];
          ctx.fillRect(
            (this.x + j) * 20 + 1,
            (this.y + i) * 20 + 1,
            20 - 1,
            20 - 1
          );
        }
      }
    }
  }
}

class GameScreen {
  constructor() {
    this.grid = [...Array(rows)].map(() => [...Array(columns)]);
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        this.grid[i][j] = 0;
      }
    }
  }
  getRemoveLives() {
    let removeLines = [];
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        if (this.grid[i][j] == 0) break;
        if (j == columns - 1) removeLines.push(i);
      }
    }
    return removeLines;
  }

  dropLine(removeLines) {
    for (let i = 0; i < removeLines.length; i++) {
      for (let j = 0; j < columns; j++) {
        this.grid[removeLines[i]][j] = 0;
      }
      for (let z = rows - 1; z > 0; z--) {
        for (let j = 0; j < columns; j++) {
          if (z - 1 >= 0) this.grid[z][j] = this.grid[z - 1][j];
        }
      }
    }
  }

  AddPiece(piece) {
    for (let i = 0; i < piece.size; i++)
      for (let j = 0; j < piece.size; j++) {
        if (piece.shape[i][j] != 0) {
          this.grid[piece.y + i][piece.x + j] = piece.shape[i][j];
        }
      }
  }

  draw(ctx, piece) {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        if (this.grid[i][j] != 0) {
          ctx.fillStyle = "#000";
          ctx.fillRect(j * 20, i * 20, 20, 20);
          ctx.fillStyle = colors[this.grid[i][j] - 1];
          ctx.fillRect(j * 20 + 1, i * 20 + 1, 20 - 1, 20 - 1);
        } else {
          ctx.fillStyle = "#000";
          ctx.fillRect(j * 20, i * 20, 20, 20);
          ctx.fillStyle = "#fff";
          ctx.fillRect(j * 20 + 1, i * 20 + 1, 20 - 1, 20 - 1);
        }
      }
    }
  }
}

const randomPiece = () => {
  // return 4;
  return Math.floor(Math.random() * 8) + 1;
};

window.addEventListener("keydown", (event) => {
  if (event.keyCode == 37) {
    piece.left(gameScreen);
  } else if (event.keyCode == 38) {
    piece.rotate(gameScreen);
  } else if (event.keyCode == 39) {
    piece.right(gameScreen);
  }
  // else if (event.keyCode == 40) currentShape.moveBottom();
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

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const run = async () => {
  let isDown = piece.down(gameScreen);
  if (isDown == 0) {
    gameScreen.AddPiece(piece);
    removeLines = gameScreen.getRemoveLives();
    if (removeLines.length > 0) gameScreen.dropLine(removeLines);
    piece = new Piece(3, 1, randomPiece());

    for (let i = 0; i < piece.size; i++)
      for (let j = 0; j < piece.size; j++)
        if (
          piece.shape[i][j] != 0 &&
          gameScreen.grid[piece.y + i][piece.x + j] != 0
        ) {
          console.log("Game Over");
          return;
        }
  }
  draw();
  await sleep(gravity);
  requestAnimationFrame(run);
};

const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
let gameScreen = new GameScreen();
let piece = new Piece(3, 1, randomPiece());
let removeLines = [];

await run();
