import { rows, columns, colors } from "./config.js";

export default class Piece {
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
        [type, type, type],
        [0, type, 0],
        [0, 0, 0],
      ];
      this.size = 3;
    } else if (type == 3) {
      this.shape = [
        [type, 0, 0],
        [type, type, type],
        [0, 0, 0],
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
        [0, 0, type],
        [type, type, type],
        [0, 0, 0],
      ];
      this.size = 3;
    } else if (type == 6) {
      this.shape = [
        [type, type, 0],
        [0, type, type],
        [0, 0, 0],
      ];
      this.size = 3;
    } else if (type == 7) {
      this.shape = [
        [0, type, type],
        [type, type, 0],
        [0, 0, 0],
      ];
      this.size = 3;
    } else if (type == 8) {
      this.shape = [
        [0, 0, 0, 0],
        [type, type, type, type],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
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
