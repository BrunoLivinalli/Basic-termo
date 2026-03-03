let palavraCorreta = "";
let linhaAtual = 0;
let colunaAtual = 0;

const totalLinhas = 6;
const totalColunas = 5;

// =======================
// BUSCAR PALAVRA DO SERVIDOR
// =======================
async function carregarPalavra() {
    const resposta = await fetch("/palavra");
    palavraCorreta = (await resposta.text()).trim().toUpperCase();
    console.log("Palavra sorteada:", palavraCorreta);
}

carregarPalavra();

// =======================
// CRIAR TABULEIRO
// =======================
const board = document.getElementById("board");

for (let i = 0; i < totalLinhas * totalColunas; i++) {
    let tile = document.createElement("div");
    tile.classList.add("tile");
    tile.id = "tile-" + i;
    board.appendChild(tile);
}

// =======================
// FUNÇÃO: INSERIR LETRA
// =======================
function inserirLetra(letra) {
    if (colunaAtual < totalColunas && linhaAtual < totalLinhas) {
        const index = linhaAtual * totalColunas + colunaAtual;
        const tile = document.getElementById("tile-" + index);
        tile.textContent = letra;
        colunaAtual++;
    }
}

// =======================
// FUNÇÃO: APAGAR LETRA
// =======================
function apagarLetra() {
    if (colunaAtual > 0) {
        colunaAtual--;
        const index = linhaAtual * totalColunas + colunaAtual;
        const tile = document.getElementById("tile-" + index);
        tile.textContent = "";
    }
}

// =======================
// FUNÇÃO: CONTROLE DE CORES (LÓGICA CERTA DO WORDLE)
// =======================
function contarLetras(palavra) {
    const mapa = {};
    for (let letra of palavra) {
        mapa[letra] = (mapa[letra] || 0) + 1;
    }
    return mapa;
}

function verificarPalavra(chute) {
    const resultado = Array(5).fill("absent");
    const contagem = contarLetras(palavraCorreta);

    // 1° PASSO — MARCAR VERDES
    for (let i = 0; i < 5; i++) {
        if (chute[i] === palavraCorreta[i]) {
            resultado[i] = "correct";
            contagem[chute[i]]--;
        }
    }

    // 2° PASSO — MARCAR AMARELOS
    for (let i = 0; i < 5; i++) {
        if (resultado[i] !== "correct") {
            const letra = chute[i];

            if (contagem[letra] > 0) {
                resultado[i] = "present";
                contagem[letra]--;
            }
        }
    }

    return resultado;
}

// =======================
// FUNÇÃO: ENVIAR PALAVRA
// =======================
function enviar() {
    if (colunaAtual < totalColunas) {
        alert("Termine a palavra!");
        return;
    }

    // Montar palavra digitada
    let chute = "";
    for (let i = 0; i < totalColunas; i++) {
        const index = linhaAtual * totalColunas + i;
        chute += document.getElementById("tile-" + index).textContent;
    }

    chute = chute.toUpperCase();

    const resultado = verificarPalavra(chute);

    // Aplicar cores
    for (let i = 0; i < totalColunas; i++) {
        const index = linhaAtual * totalColunas + i;
        const tile = document.getElementById("tile-" + index);
        tile.classList.add(resultado[i]);
    }

    // Vitória
    if (chute === palavraCorreta) {
        setTimeout(() => alert("Parabéns! Você acertou!"), 200);
        return;
    }

    // Última linha
    if (linhaAtual === totalLinhas - 1) {
        setTimeout(() => alert("Fim de jogo! A palavra era: " + palavraCorreta), 200);
        return;
    }

    // Avança linha
    linhaAtual++;
    colunaAtual = 0;
}

// =======================
// EVENTOS DO TECLADO VIRTUAL
// =======================
document.querySelectorAll(".key").forEach(key => {
    key.addEventListener("click", () => {
        const letra = key.textContent;

        if (letra === "ENTER") {
            enviar();
        } else if (letra === "⌫") {
            apagarLetra();
        } else {
            inserirLetra(letra);
        }
    });
});

// =======================
// EVENTOS DO TECLADO FÍSICO
// =======================
document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        enviar();
    } else if (event.key === "Backspace") {
        apagarLetra();
    } else if (/^[a-zA-Z]$/.test(event.key)) {
        inserirLetra(event.key.toUpperCase());
    }
});