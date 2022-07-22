export const rows = 20;
export const columns = 10;
export const squareSize = 24;

export const width = columns * squareSize;
export const height = rows * squareSize;

export const canvas = document.querySelector("canvas");
export const context = canvas.getContext("2d");
