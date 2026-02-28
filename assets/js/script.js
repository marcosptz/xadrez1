// Função para criar o tabuleiro de xadrez
const tabuleiro = () => {
  const board = document.getElementById('board');
  const letras = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const numeros = ['8', '7', '6', '5', '4', '3', '2', '1'];
  const imagensPecas = {
    // Peças Pretas (Dark)
    '♜': 'assets/img/rook.png',  // Torre preta
    '♞': 'assets/img/knight.png',  // Cavalo preto
    '♝': 'assets/img/bishop.png',  // Bispo preto
    '♛': 'assets/img/queen.png',  // Rainha preta
    '♚': 'assets/img/king.png',  // Rei preto
    '♟': 'assets/img/pawn.png',  // Peão preto

    // Peças Brancas (Light)
    '♖': 'assets/img/rook-white.png',  // Torre branca
    '♘': 'assets/img/knight-white.png',  // Cavalo branco
    '♗': 'assets/img/bishop-white.png',  // Bispo branco
    '♕': 'assets/img/queen-white.png',  // Rainha branca
    '♔': 'assets/img/king-white.png',  // Rei branco
    '♙': 'assets/img/pawn-white.png'  // Peão branco
  };

  const pecasIniciais = {
    // Linha 0 (Pretas)
    0: '♜', 1: '♞', 2: '♝', 3: '♛', 4: '♚', 5: '♝', 6: '♞', 7: '♜',
    8: '♟', 9: '♟', 10: '♟', 11: '♟', 12: '♟', 13: '♟', 14: '♟', 15: '♟',
    // Linha 6 e 7 (Brancas)
    48: '♙', 49: '♙', 50: '♙', 51: '♙', 52: '♙', 53: '♙', 54: '♙', 55: '♙',
    56: '♖', 57: '♘', 58: '♗', 59: '♕', 60: '♔', 61: '♗', 62: '♘', 63: '♖'
  };

  // console.log(imagensPecas['♜']); // Exemplo de acesso à URL da imagem da torre preta


  for (let i = 0; i < 64; i++) {
    const casa = document.createElement('div');
    casa.classList.add('casa');
    
    // Adicionar os eventos de drop diretamente na criação da casa
    casa.addEventListener('dragover', allowDrop);
    casa.addEventListener('drop', drop);
    
    // Calcula linha e coluna para alternar a cor
    const row = Math.floor(i / 8);
    const col = i % 8;
    
    if ((row + col) % 2 === 0) {
      casa.classList.add('branca');
    } else {
      casa.classList.add('preta');
    }

    // Adiciona número apenas na primeira coluna (coluna 0)
    if (col === 0) {
      casa.setAttribute('data-numero', numeros[row]);
    }
    
    // Adiciona letra apenas na última linha (linha 7)
    if (row === 7) {
      casa.setAttribute('data-letra', letras[col]);
    }

    if (pecasIniciais[i]) {
      const divPeca = document.createElement('div');
      divPeca.classList.add('peca');
      divPeca.draggable = true;
      divPeca.id = 'peca-' + i;

      // Adicionar o listener de dragstart na peça
      divPeca.addEventListener('dragstart', drag);

      const img = document.createElement('img');
      // Aqui você usa a URL do objeto acima baseada no símbolo unicode
      img.src = imagensPecas[pecasIniciais[i]] || '';
      
      // Impedir que a imagem em si seja arrastada (evita bugs no Firefox/Chrome)
      img.draggable = false;
      
      divPeca.appendChild(img);
      casa.appendChild(divPeca);
    }
    
    board.appendChild(casa);
  }
}

// Função chamada ao iniciar o arrasto
function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

// Função para permitir soltar o elemento (necessário)
function allowDrop(ev) {
  ev.preventDefault();
}

// Função chamada quando a div é solta
function drop(ev) {
  ev.preventDefault();
  const data = ev.dataTransfer.getData("text");
  const pecaArrastada = document.getElementById(data);
  
  // CORREÇÃO 3: Garantir que a peça caia na casa, mesmo se soltar em cima de outra peça
  let alvo = ev.target;

  // Se o alvo não for a casa (ex: for a div da peça ou a imagem), suba até encontrar a .casa
  while (alvo && !alvo.classList.contains('casa')) {
    alvo = alvo.parentElement;
  }

  if (alvo) {
    // Se já existe uma peça na casa, você pode implementar a lógica de captura aqui
    // Por enquanto, vamos apenas remover a peça antiga para simplificar:
    if (alvo.firstChild && alvo.firstChild !== pecaArrastada) {
       alvo.innerHTML = ''; 
    }
    alvo.appendChild(pecaArrastada);
  }
}

// function drop(ev) {
//   ev.preventDefault();
//   var data = ev.dataTransfer.getData("text");
//   ev.target.appendChild(document.getElementById(data));
// }

// document.querySelectorAll('.casa').forEach(casa => {
//   casa.addEventListener('dragover', function(ev) { allowDrop(ev); });
//   casa.addEventListener('drop', function(ev) { drop(ev); });
// });
