export default class piece {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    if (type == 1) {
      this.shape = [
        [0, 1, 0],
        [0, 1, 1],
        [0, 0, 1],
      ];
      this.size = 3;
    }
  }

  rotate() {}
  right() {}
  left() {}
  down(grid) {
    for (let i = 0; i < this.size; i++)
      for (let j = 0; j < this.size; j++)
        if (grid.grid[y + 1][x] * this.shape[i][j] != 0) return 0;

    this.y++;
    return 1;
  }
}
