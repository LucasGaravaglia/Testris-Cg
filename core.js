const size = 20;
const rows = 20;
const columns = 10;
const height = size * rows;
const width = size * columns;
const gravity = 100;

class Piece {
  constructor(x, y, type) {
    this.y = y;
    this.x = x;
    this.type = type;
    if (type == 1) {
      this.shape = [
        [0, 1, 0],
        [0, 1, 1],
        [0, 0, 1],
      ];
      this.size = 3;
      this.color = "#00f";
    } else if (type == 2) {
      this.shape = [
        [1, 1, 1],
        [0, 1, 0],
        [0, 0, 0],
      ];
      this.size = 3;
      this.color = "#f00";
    } else if (type == 3) {
      this.shape = [
        [1, 0, 0],
        [1, 1, 1],
        [0, 0, 0],
      ];
      this.size = 3;
      this.color = "#0f0";
    } else if (type == 4) {
      this.shape = [
        [1, 1],
        [1, 1],
      ];
      this.size = 2;
      this.color = "#0ff";
    } else if (type == 5) {
      this.shape = [
        [0, 0, 1],
        [1, 1, 1],
        [0, 0, 0],
      ];
      this.size = 3;
      this.color = "#f51";
    } else if (type == 6) {
      this.shape = [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0],
      ];
      this.size = 3;
      this.color = "#25f";
    } else if (type == 7) {
      this.shape = [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0],
      ];
      this.size = 3;
      this.color = "#f25";
    } else if (type == 8) {
      this.shape = [
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ];
      this.size = 4;
      this.color = "#453123";
    }
  }

  rotate(gameScreen) {
    let copy = [...Array(this.size)].map(() => [...Array(this.size)]);

    // fez a copy girando a piece
    for (let i = 0; i < this.size; i++)
      for (let j = 0; j < this.size; j++)
        copy[this.size - 1 - j][i] = this.shape[j][i];

    // verificar se copy colide com algo
    // for (let i = 0; i < this.size; i++)
    //   for (let j = 0; j < this.size; j++) {
    //     if (copy[i][j] != 0 && this.y + i < rows) return 0;
    //     if (copy[i][j] != 0 && gameScreen.grade[this.y + i][this.x + j] != 0)
    //       return 0;
    //   }
    // copiar a copy para o self.grade
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
          gameScreen.grade[this.y + i + 1][this.x + j] != 0
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
        if (gameScreen.grade[this.y][this.x] * this.shape[i][j] != 0) return 0;
      }

    this.x++;
    return 1;
  }
  left(gameScreen) {
    for (let i = 0; i < this.size; i++)
      for (let j = 0; j < this.size; j++) {
        if (gameScreen.grade[this.y][this.x] * this.shape[i][j] != 0) return 0;
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
        }
      }
    }
  }
}

class GameScreen {
  constructor() {
    this.grade = [...Array(rows)].map(() => [...Array(columns)]);
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        this.grade[i][j] = 0;
      }
    }
  }
  getRemoveLives() {
    let removeLines = [];
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        if (this.grade[i][j] == 0) break;
        if (j == columns - 1) removeLines.push(i);
      }
    }
    return removeLines;
  }

  dropLine(removeLines) {
    for (let i = 0; i < removeLines.length; i++) {
      for (let j = 0; j < columns; j++) {
        this.grade[removeLines[i]][j] = 0;
      }
      for (let z = rows - 1; z > 0; z--) {
        for (let j = 0; j < columns; j++) {
          if (z - 1 >= 0) this.grade[z][j] = this.grade[z - 1][j];
        }
      }
    }
  }

  AddPiece(piece) {
    for (let i = 0; i < piece.size; i++)
      for (let j = 0; j < piece.size; j++) {
        if (piece.shape[i][j] != 0) {
          this.grade[piece.y + i][piece.x + j] = piece.shape[i][j];
        }
      }
  }

  draw(ctx) {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        if (this.grade[i][j] != 0) {
          ctx.fillStyle = "#0f0";
          ctx.fillRect(j * 20, i * 20, 20, 20);
        } else {
          ctx.fillStyle = "#fff";
          ctx.fillRect(j * 20, i * 20, 20, 20);
        }
      }
    }
  }
}

const randomPiece = () => {
  return 4;
  return Math.floor(Math.random() * 8) + 1;
};

window.addEventListener("keydown", (event) => {
  if (event.keyCode == 37) {
    console.log("left");
    piece.left(gameScreen);
  } else if (event.keyCode == 38) {
    console.log("Rotation");
    piece.rotate(gameScreen);
  } else if (event.keyCode == 39) {
    console.log("Direita");
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
  gameScreen.draw(context);
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
          gameScreen.grade[piece.y + i][piece.x + j] != 0
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
