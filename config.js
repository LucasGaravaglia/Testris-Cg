export const size = 20;
export const rows = 20;
export const columns = 10;
export const height = size * rows;
export const width = size * columns;
export var gravity = 400;
export const canvas = document.querySelector("canvas");
export const context = canvas.getContext("2d");
export const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const colors = [
  "#00f",
  "#f00",
  "#0f0",
  "#0ff",
  "#f51",
  "#25f",
  "#f25",
  "#453123",
];
