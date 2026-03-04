// Função para criar o tabuleiro de xadrez
const tabuleiro = () => {
  const board = document.getElementById('board');
  const letras = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const numeros = ['8', '7', '6', '5', '4', '3', '2', '1'];
  const imagensPecas = {
    // Peças Pretas (Dark)
    '♜': 'assets/img/rook.png',  // Torre preta
    '♞': 'assets/img/horse.png',  // Cavalo preto
    '♝': 'assets/img/bishop.png',  // Bispo preto
    '♛': 'assets/img/queen.png',  // Rainha preta
    '♚': 'assets/img/king.png',  // Rei preto
    '♟': 'assets/img/pawn.png',  // Peão preto

    // Peças Brancas (Light)
    '♖': 'assets/img/rook-white.png',  // Torre branca
    '♘': 'assets/img/horse-white.png',  // Cavalo branco
    '♗': 'assets/img/bishop-white.png',  // Bispo branco
    '♕': 'assets/img/queen-white.png',  // Rainha branca
    '♔': 'assets/img/king-white.png',  // Rei branco
    '♙': 'assets/img/pawn-white.png'  // Peão branco
  };
  const valoresPecas = {
    // Peças Pretas (Dark)
    '♜': 7,  // Torre preta
    '♞': 3,  // Cavalo preto
    '♝': 5,  // Bispo preto
    '♛': 10,  // Rainha preta
    '♚': 100,  // Rei preto
    '♟': 1,  // Peão preto

    // Peças Brancas (Light)
    '♖': 7,  // Torre branca
    '♘': 3,  // Cavalo branco
    '♗': 5,  // Bispo branco
    '♕': 10,  // Rainha branca
    '♔': 100,  // Rei branco
    '♙': 1  // Peão branco
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

    // casa.setAttribute('data-numero', i);

    // Adiciona número apenas na primeira coluna (coluna 0)
    if (col === 0) {
      casa.setAttribute('data-numero', numeros[row]);
    }
    
    // Adiciona letra apenas na última linha (linha 7)
    if (row === 7) {
      casa.setAttribute('data-letra', letras[col]);
    }

    // Adicionando um atributo data-casa para facilitar a identificação da casa (ex: A1, B2, etc.)
    casa.setAttribute('data-casa', `${letras[col]}${numeros[row]}`);
    casa.setAttribute('letra', letras[col]);
    casa.setAttribute('numero', numeros[row]);
    casa.id = `${letras[col]}${numeros[row]}`; // Atribuindo um ID único para cada casa (ex: A1, B2, etc.)

    // Passando o valor da peça como um atributo data-valor para facilitar a lógica de captura
    casa.setAttribute('data-valor', valoresPecas[pecasIniciais[i]] || 0);

    // Passando o índice da casa como um atributo data-index para facilitar a identificação durante o drop
    casa.setAttribute('data-index', i);

    if (pecasIniciais[i]) {
      const divPeca = document.createElement('div');
      divPeca.classList.add('peca');
      divPeca.draggable = true;
      divPeca.id = 'peca-' + i;

      // Adicionar o listener de dragstart na peça
      divPeca.addEventListener('dragstart', drag);

      // Passando o valor da peça como um atributo data-valor para facilitar a lógica de captura
      divPeca.setAttribute('data-valor', valoresPecas[pecasIniciais[i]] || 0);

      // Criando a imagem da peça com base no símbolo unicode e associando a URL correta
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

// Função para iniciar o jogo
const play2 = () => {
  const casas = document.querySelectorAll('.casa');
  const obj = [];
  let count = 0;
  let letra = '';
  let numero = '';
  
  // Montando o obj do tabuleira com suas casas
  casas.forEach((casa, i) => {
    letra = casa.getAttribute('data-letra');
    numero = casa.getAttribute('data-numero');

    obj.push({
      casa: casa.getAttribute('data-casa'),
      peca: casa.querySelector('.peca') ? casa.querySelector('.peca').id : null,
      valor: parseInt(casa.getAttribute('data-valor')),
      index: parseInt(casa.getAttribute('data-index')),
    });
  });

  return obj;
}

const play = () => {
  const casas = document.querySelectorAll('.casa');
  const obj = [];
  
  casas.forEach((casa) => {
    const pecaElement = casa.querySelector('.peca');
    const pecaId = pecaElement ? pecaElement.id : null;
    
    // Identifica o time com base no ID numérico da peça
    let time = null;
    if (pecaId) {
      const idNum = parseInt(pecaId.replace('peca-', ''));
      time = idNum < 32 ? 'preta' : 'branca'; 
    }

    obj.push({
      casa: casa.getAttribute('data-casa'),
      peca: pecaId,
      valor: parseInt(casa.getAttribute('data-valor')) || 0,
      index: parseInt(casa.getAttribute('data-index')),
      time: time // Agora sabemos de quem é a peça
    });
  });

  return obj;
}

const autoMove = (pecasJogo='p') => {
  const estadoInicial = play();
  const pecasPretas = [];
  const pecasBrancas = [];
  const casasIniciaisPeaoPreto = [];
  const casasIniciaisPeaoBranco = [];
  let pecas = [];
  let casasIniciaisPeao = [];
  let pontos = 0;
  let letra = '';
  let numero = '';
  let pecaMove = '';
  let casaDestino = '';

  estadoInicial.forEach((casa, i) => {
    if(i < 16) {
      pecasPretas.push(`peca-${i}`);
      if(i >= 8 && i < 16) casasIniciaisPeaoPreto.push(casa.casa);
    }
    if(i > 47 && i < 64) {
      pecasBrancas.push(`peca-${i}`);
      if(i > 47 && i <= 55) casasIniciaisPeaoBranco.push(casa.casa);
    }
  });

  pecas = pecasJogo == 'p' ? pecasPretas : pecasBrancas;
  casasIniciaisPeao = pecasJogo == 'p' ? casasIniciaisPeaoPreto : casasIniciaisPeaoBranco;

  pecas.forEach(peca => {
    letra = document.getElementById(peca).parentNode.getAttribute('letra');
    numero = parseInt(document.getElementById(peca).parentNode.getAttribute('numero'));

    if(casasIniciaisPeao.includes(estadoInicial.find(e => e.peca == peca)?.casa)) {
      pecaMove = peca;
      casaDestino = `${letra}${numero - 2}`;
    } else {
      pecaMove = peca;
      casaDestino = `${letra}${numero - 1}`;
    }
  });

  // console.log('Peças selecionadas para mover:', pecaMove, 'Casas iniciais dos peões:', casaDestino);
  // console.log('teste: ', estadoInicial.find(e => e.casa == casaDestino)?.valor)

  if(estadoInicial.find(e => e.casa == casaDestino)?.valor == 0) {
    moverPeca(pecaMove, casaDestino);
  }

  // console.log('Peças pretas do tabuleiro:', pecasPretas);
  // console.log('Peças brancas do tabuleiro:', pecasBrancas);
  // console.log('Estado inicial do tabuleiro:', estadoInicial);
}

// Movimentos possíveis do cavalo (em termos de índice no tabuleiro linearizado)
// horseMove = () => {
//   const estadoInicial = play();
//   const idHorses = ['peca-1', 'peca-6']; // IDs dos cavalos no estado inicial
//   const positionHorse = estadoInicial.find(e => e.peca == idHorses[0]); // Índice do cavalo no tabuleiro linearizado
//   const moving = [15, 17, -15, -17, 10, -10, 6, -6];
//   const possibleMoves = moving.map(m => positionHorse.index + m).filter(i => i >= 0 && i < 64); // Filtra movimentos válidos dentro do tabuleiro
//   let val = 0;

//   possibleMoves.forEach(m => {
//     // val = estadoInicial.find(e => e.index == m)?.valor || 0;
//     val = Math.max(...estadoInicial.map(e => e.valor == estadoInicial.find(e => e.index == m)?.valor ? e.valor : 0));
//     move = m;
//     console.log(`Maior valor: ${val}`);
//   });

//   moverPeca(positionHorse.peca, estadoInicial.find(e => e.index == possibleMoves[val])?.casa);
//   // console.log('positionHorse:', positionHorse);
//   console.log('possibleMoves:', possibleMoves, val);
// }

const moveKnight = (knightId) => {
  const boardState = play(); //
  const knight = boardState.find(p => p.peca === knightId);
  if (!knight) return;

  const knightValue = knight.valor; // Geralmente 3
  const startX = knight.index % 8;
  const startY = Math.floor(knight.index / 8);

  const offsets = [
    { x: 2, y: 1 }, { x: 2, y: -1 }, { x: -2, y: 1 }, { x: -2, y: -1 },
    { x: 1, y: 2 }, { x: 1, y: -2 }, { x: -1, y: 2 }, { x: -1, y: -2 }
  ];

  // 1. Mapear movimentos possíveis e calcular segurança
  const moveEvaluations = offsets
    .map(off => ({ x: startX + off.x, y: startY + off.y }))
    .filter(pos => pos.x >= 0 && pos.x < 8 && pos.y >= 0 && pos.y < 8)
    .map(pos => {
      const targetIdx = pos.y * 8 + pos.x;
      const target = boardState.find(e => e.index === targetIdx);
      
      // Verifica se a casa destino está sob ataque do inimigo
      const sobAtaque = estaAmeacada(targetIdx, knight.time, boardState);
      
      return {
        ...target,
        sobAtaque: sobAtaque,
        lucro: target.valor - (sobAtaque ? knightValue : 0) 
      };
    })
    .filter(move => move.time !== knight.time); //

  // 2. Filtrar pela sua regra: 
  // Se houver risco, a peça capturada deve valer >= que o cavalo (3)
  const safeOrWorthItMoves = moveEvaluations.filter(move => {
    if (!move.sobAtaque) return true; // Sem risco, pode mover
    return move.valor >= knightValue; // Com risco, só se a captura valer a pena
  });

  if (safeOrWorthItMoves.length === 0) {
    console.log("Nenhum movimento seguro ou vantajoso encontrado.");
    return;
  }

  // 3. Escolher o melhor entre os permitidos (maior valor de captura)
  const bestMove = safeOrWorthItMoves.reduce((prev, curr) => 
    (curr.valor > prev.valor) ? curr : prev
  );

  moverPeca(knightId, bestMove.casa); //
};

const estaAmeacada = (indexAlvo, meuTime, boardState) => {
  const inimigoTime = meuTime === 'branca' ? 'preta' : 'branca';
  const pecasInimigas = boardState.filter(p => p.time === inimigoTime);

  const targetX = indexAlvo % 8;
  const targetY = Math.floor(indexAlvo / 8);

  for (const inimigo of pecasInimigas) {
    const ix = inimigo.index % 8;
    const iy = Math.floor(inimigo.index / 8);

    // Exemplo: Se o inimigo for um Cavalo
    if (inimigo.peca.includes('peca-1') || inimigo.peca.includes('peca-6') || 
        inimigo.peca.includes('peca-57') || inimigo.peca.includes('peca-62')) {
      const dx = Math.abs(ix - targetX);
      const dy = Math.abs(iy - targetY);
      if ((dx === 2 && dy === 1) || (dx === 1 && dy === 2)) return true;
    }

    // Exemplo: Se o inimigo for um Peão (ataque diagonal)
    if (inimigo.peca.includes('peca-8') || inimigo.peca.includes('peca-48')) { // Simplificado
      const direcao = inimigoTime === 'preta' ? 1 : -1;
      if (iy + direcao === targetY && Math.abs(ix - targetX) === 1) return true;
    }
  }
  return false;
};

// Função chamada ao iniciar o arrasto
function drag(ev) {
  const valorPeca = ev.target.getAttribute("data-valor");

  // ev.target.setAttribute("data-valor", 0); // Resetar o valor para 0 da peça na casa de origem para evitar problemas de captura
  ev.dataTransfer.setData("text", ev.target.id);
  ev.dataTransfer.setData("valor", valorPeca);
  // Salva o ID da casa de onde a peça está saindo (o elemento pai)
  ev.dataTransfer.setData("id_casa_origem", ev.target.parentNode.id);

  // console.log('ev.target.id:', ev.target.parentNode.id)
}

// Função para permitir soltar o elemento (necessário)
function allowDrop(ev) {
  ev.preventDefault();
  // console.log('Permitir soltar aqui', ev);
}

// Função chamada quando a div é solta
function drop(ev) {
  ev.preventDefault();
  const data = ev.dataTransfer.getData("text");
  const valor = ev.dataTransfer.getData("valor");
  const id_casa_origem = ev.dataTransfer.getData("id_casa_origem");
  const index = ev.dataTransfer.getData("data-index");
  const pecaArrastada = document.getElementById(data);
  const casaOrigem = document.getElementById(id_casa_origem);

  casaOrigem.setAttribute('data-valor', 0); // Resetar o valor para 0 da peça na casa de origem para evitar problemas de captura

  ev.target.setAttribute('data-valor', valor);

  // console.log('casaOrigem:', casaOrigem)
  // console.log('Soltou a peça com ID:', data, 'no elemento:', ev.target, 'com valor:', valor);
  
  // Garantir que a peça caia na casa, mesmo se soltar em cima de outra peça
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

function moverPeca(idPeca, idCasaDestino) {
  const peca = document.getElementById(idPeca);
  const casaDestino = document.getElementById(idCasaDestino);
  const casaOrigem = peca.parentNode;

  if (!peca || !casaDestino) return;

  const valorPeca = peca.getAttribute("data-valor");

  // 1. Lógica de Captura: se houver uma peça inimiga no destino, remova-a
  if (casaDestino.hasChildNodes()) {
    casaDestino.innerHTML = ''; 
  }

  // 2. Atualiza os dados nos atributos HTML
  casaOrigem.setAttribute("data-valor", "0");
  casaDestino.setAttribute("data-valor", valorPeca);

  // 3. Move o elemento visualmente preservando a instância da peça
  casaDestino.appendChild(peca);
}
