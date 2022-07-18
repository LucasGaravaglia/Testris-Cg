//Imagens retiradas de: https://pt.wikipedia.org/wiki/Tetris#/media/Ficheiro:Tetrominoes_IJLO_STZ_Worlds.svg

const tetraminos = new Image();
tetraminos.src = "./tetraminos.png";

const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

// function loop() {
//   requestAnimationFrame(loop);
// }

// loop();

context.drawImage(tetraminos, 0, 0);

// context.fillRect(0, 0, 1, 1);
