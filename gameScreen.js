import { rows, columns, colors, sleep } from "./config.js";

export default class GameScreen {
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
      for (let z = removeLines[i]; z > 0; z--) {
        for (let j = 0; j < columns; j++) {
          if (z > 0) this.grid[z][j] = this.grid[z - 1][j];
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
        ctx.fillStyle = "#333";
        ctx.font = "18px Arial";
        ctx.fillText(this.grid[i][j], j * 20, (i + 1) * 20);
      }
    }
  }
}
