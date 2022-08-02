const size = 20;
const n_rows = 10;
const n_columns = 20;
const rows = size * n_rows;
const columns = size * n_columns;
const gravity = 1000;

const randomPeca = () => {
  Math.floor(Math.random() * 9) + 1;
};

class Peca {
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
    } else if (type == 2) {
      this.shape = [
        [1, 1, 1],
        [0, 1, 0],
        [0, 0, 0],
      ];
      this.size = 3;
    } else if (type == 3) {
      this.shape = [
        [1, 0, 0],
        [1, 1, 1],
        [0, 0, 0],
      ];
      this.size = 3;
    } else if (type == 4) {
      this.shape = [
        [1, 1],
        [1, 1],
      ];
      this.size = 2;
    } else if (type == 5) {
      this.shape = [
        [1, 0, 1],
        [1, 1, 1],
        [0, 0, 0],
      ];
      this.size = 3;
    } else if (type == 6) {
      this.shape = [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0],
      ];
      this.size = 3;
    } else if (type == 7) {
      this.shape = [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0],
      ];
      this.size = 3;
    } else if (type == 8) {
      this.shape = [
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ];
      this.size = 4;
    }
  }

  vira(Tela) {
    let copia = [...Array(columns)].map(() => [...Array(rows)]);

    // fez a copia girando a peca
    for (let i = 0; i < this.size; i++)
      for (let j = 0; j < this.size; j++)
        copia[this.size - 1 - j][i] = this.shape[j][i];

    // verificar se copia colide com algo
    for (let i = 0; i < this.size; i++)
      for (let j = 0; j < this.size; j++)
        if (copia[i][j] != 0 && this.y + i < rows) return 0;
    if (copia[i][j] != 0 && Tela.grade[this.y + i][this.x + j] != 0) return 0;

    // copiar a copia para o self.grade
    for (let i = 0; i < this.size; i++)
      for (let j = 0; j < this.size; j++) this.grade[i][j] = copia[i][j];
    return 1;
  }
  desce(Tela) {
    for (let i = 0; i < this.size; i++)
      for (let j = 0; j < this.size; j++) {
        if (
          this.grade[i][j] != 0 &&
          Tela.grade[this.y + i + 1][this.x + j] != 0
        )
          return 0;
        if (this.grade[i][j] != 0 && this.y + i + 1 >= rows) return 0;
      }

    this.y++;
    return 1;
  }
  direita(Tela) {
    for (let i = 0; i < this.size; i++)
      for (let j = 0; j < this.size; j++) {
        if (this.grade[i][j] != 0 && this.x + 1 + j >= columns) return 0;
        if (Tela.grade[this.y][this.x + 1] * this.grade[i][j] != 0) return 0;
      }

    this.x++;
    return 1;
  }
  esquerda(Tela) {
    for (let i = 0; i < this.size; i++)
      for (let j = 0; j < this.size; j++) {
        if (this.grade[i][j] != 0 && this.x - 1 + j < 0) return 0;
        if (Tela.grade[this.y][this.x - 1] * this.grade[i][j] != 0) return 0;
      }

    this.x--;
    return 1;
  }

  desenha(ctx) {
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        if (this.shape[i][j] != 0) {
          ctx.fillStyle = "#000";
          ctx.fillRect(j * 20, i * 20, 20, 20);
        }
      }
    }
  }
}

class Tela {
  constructor() {
    this.grade = [...Array(rows)].map(() => [...Array(columns)]);
  }
  elimina() {
    let l_elimina = [];
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        if (this.grade[i][j] == 0) break;
        if (j == columns - 1) l_elimina.push(i);
      }
    }
    return l_elimina;
  }

  desceLinhas(l_elimina) {
    for (let i = 0; i < l_elimina.length; i++) {
      for (let j = 0; j < columns; j++) {
        this.grade[i][j] = this.grade[i - 1][j];
      }
      for (let j = 0; j < l_elimina.length; j++) {
        l_elimina[j]++;
      }
      for (let j = 0; j < columns; j++) {
        this.grade[0][j] = 0;
      }
    }
  }

  addPeca(peca) {
    for (let i = 0; i < peca.size; i++)
      for (let j = 0; j < peca.size; j++) {
        if (peca.grade[i][j] != 0) {
          this.grade[peca.y + i][peca.x + j] = peca.grade[i][j];
        }
      }
  }
}

export const canvas = document.querySelector("canvas");
export const context = canvas.getContext("2d");
let tela = new Tela();
let peca = new Peca(3, 1, randomPeca());
let nump = 0;

window.addEventListener("keydown", (event) => {
  if (event.keyCode == 37) {
    console.log("esquerda");
    peca.esquerda(tela);
    if (movCol - 1 >= 0) {
      movCol--;
    }
  } else if (event.keyCode == 38) {
    console.log("Rotation");
    peca.vira(tela);
  } else if (event.keyCode == 39) {
    console.log("Direita");
    peca.direita(tela);
  }
  // else if (event.keyCode == 40) currentShape.moveBottom();
});

const desenha = () => {
  tela.desenha(context);
  peca.desenha(context);
};

const run = async () => {
  await sleep(gravity);
  context.clearRect(0, 0, canvas.width, canvas.height);
  let desceu = peca.desce(tela);
  if (desceu == 0) {
    for (let i = 0; i < peca.size; i++)
      for (let j = 0; j < peca.size; j++)
        if (peca.grade[i][j] != 0 && tela.grade[peca.y + i][peca.x + j] != 0) {
          console.log("Game Over");
          return;
        }
  }
  desenha();
  requestAnimationFrame(run);
};
//     def run(self):
//         time = 0

//         while(True):
//             self.canvas.delete('all')

//             if time == 5:
//                 desceu = self.p.desce(self.t)
//                 time = 0
//                 if desceu == 0:
//                     self.t.addPeca(self.p)
//                     l_elimina = self.t.elimina()
//                     if(len(l_elimina)>0):
//                         self.t.desceLinhas(l_elimina)
//                     self.p = Peca( 3, 1, randomPeca())

//                     #condição para morrer
//                     for lin in range(self.p.size):
//                         for col in range(self.p.size):
//                             if self.p.grade[lin][col] != 0 and  self.t.grade[self.p.y+lin][self.p.x+col] != 0:
//                                 print('Game Over')
//                                 quit()
//             else:
//                 time += 1

//             self.desenha()
//             self.canvas.after(50)
//             self.window.update_idletasks()
//             self.window.update()

await run();
