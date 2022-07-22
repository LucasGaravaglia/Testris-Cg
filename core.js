let gravity = 500;
let movRow = 0;
let movCol = parseInt(columns / 2);

const gameLoop = async () => {
  drawGrid();
  drawBorder();
  await sleep(gravity);
  requestAnimationFrame(gameLoop);
};

gameLoop();

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
