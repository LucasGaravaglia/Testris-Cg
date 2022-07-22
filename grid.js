const config = require("../config");

class grid {
  constructor() {
    this.grid = [...Array(config.columns)].map(() => [...Array(config.rows)]);
  }
}
