import { listarCarros } from "../scripts/api.js";
let listaCarros = document.querySelector(".list-cars");
let botoesCategorias = document.querySelectorAll(".btn-category");
let buscar = document.querySelector(".buscador");
let quantidade = document.querySelector(".quantidade");
let paginacao = document.querySelectorAll(".page");
let botaoPaginaAnterior = document.querySelector("#pagina-anterior");
let botaoPaginaProxima = document.querySelector("#pagina-proxima");

function criarCard(carro, posicaoRanking = null) {
  let linha = document.createElement("li");
  linha.classList.add("card");

  let divImg = document.createElement("div");
  divImg.classList.add("card-img");

  let divInfos = document.createElement("div");
  divInfos.classList.add("card-infos");

  let category = document.createElement("p");
  category.classList.add("card-tag");
  category.innerText = carro.categoria;

  let disponibilidade = document.createElement("p");
  disponibilidade.classList.add("card-status");
  disponibilidade.classList.add(
    carro.status_disponibilidade === "disponivel" ? "disponivel" : "indisponivel"
  );
  disponibilidade.innerText =
    carro.status_disponibilidade === "disponivel" ? "Disponivel" : "Indisponivel";

  let name = document.createElement("p");
  name.innerText = carro.nome;

  let filme = document.createElement("p");
  filme.innerText = `${carro.universo_origem} (${carro.ano_obra})`;

  let valor = document.createElement("p");
  valor.innerText = "R$ " + parseInt(carro.valor_aluguel_dia);

  let porDia = document.createElement("p");
  porDia.innerText = "por dia";

  let buttonAlugar = document.createElement("button");
  buttonAlugar.classList.add("btn-alugar");
  buttonAlugar.addEventListener("click", (evento) => {
    evento.stopPropagation();
    window.location = `Reserva.html?id=${carro.id}`;
  });

  let buttonAgenda = document.createElement("button");
  buttonAgenda.classList.add("btn-agenda");
  buttonAgenda.innerHTML =
    '<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 1.25V3.75" stroke="#2563EB" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 1.25V3.75" stroke="#2563EB" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/><path d="M11.875 2.5H3.125C2.43464 2.5 1.875 3.05964 1.875 3.75V12.5C1.875 13.1904 2.43464 13.75 3.125 13.75H11.875C12.5654 13.75 13.125 13.1904 13.125 12.5V3.75C13.125 3.05964 12.5654 2.5 11.875 2.5Z" stroke="#2563EB" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/><path d="M1.875 6.25H13.125" stroke="#2563EB" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  let divButtons = document.createElement("div");
  divButtons.append(buttonAlugar, buttonAgenda);

  let imagem = document.createElement("img");
  imagem.src = carro.url_imagem;

  if (carro.status_disponibilidade != "disponivel") {
    buttonAlugar.innerText = "Indisponivel";
    buttonAlugar.disabled = true;
  } else {
    buttonAlugar.innerText = "Alugar";
    buttonAlugar.disabled = false;
  }

  divImg.style.position = "relative";
  divImg.style.overflow = "hidden";

  divImg.append(imagem, category, disponibilidade);

  if (posicaoRanking) {
    let badgeRanking = document.createElement("p");
    badgeRanking.classList.add("card-ranking-badge");
    badgeRanking.innerText = `★ #${posicaoRanking} da semana`;
    badgeRanking.style.position = "absolute";
    badgeRanking.style.bottom = "12px";
    badgeRanking.style.left = "12px";
    badgeRanking.style.right = "auto";
    badgeRanking.style.top = "auto";
    badgeRanking.style.margin = "0";
    badgeRanking.style.zIndex = "2";
    badgeRanking.style.background = "rgba(234, 179, 8, 0.18)";
    badgeRanking.style.color = "#facc15";
    badgeRanking.style.border = "1px solid rgba(250, 204, 21, 0.35)";
    badgeRanking.style.fontSize = "11px";
    badgeRanking.style.fontWeight = "600";
    badgeRanking.style.padding = "4px 10px";
    badgeRanking.style.borderRadius = "999px";
    badgeRanking.style.backdropFilter = "blur(4px)";
    badgeRanking.style.whiteSpace = "nowrap";
    divImg.append(badgeRanking);
  }

  divInfos.append(name, filme, porDia, valor);
  linha.appendChild(divImg);
  linha.appendChild(divInfos);
  linha.appendChild(divButtons);

  linha.addEventListener("click", () => {
    window.location = `individual.html?id=${carro.id}`;
  });

  return linha;
}

function sortearTop5(vetor) {
  let indices = vetor.map((_, indice) => indice);
  for (let i = indices.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }

  let quantidadeSorteada = Math.min(5, vetor.length);
  let mapaPosicoes = {};
  for (let posicao = 0; posicao < quantidadeSorteada; posicao++) {
    mapaPosicoes[indices[posicao]] = posicao + 1;
  }
  return mapaPosicoes;
}

function renderizarLista(vetor) {
  listaCarros.innerHTML = "";
  let mapaPosicoes = opcoes.pagina === 1 ? sortearTop5(vetor) : {};
  vetor.forEach((elemento, indice) => {
    let posicaoRanking = mapaPosicoes[indice] || null;
    listaCarros.appendChild(criarCard(elemento, posicaoRanking));
  });
}

let opcoes = {
  pagina: 1,
  limite: 8,
  nome: "",
  disponibilidade: "",
  filme: "",
  categoria: "",
};

let carros = await listarCarros(opcoes);
quantidade.innerText = carros.length;
renderizarLista(carros);

botoesCategorias[0].classList.add("active");

botoesCategorias.forEach((button) => {
  button.addEventListener("click", async () => {
    botoesCategorias.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    if (
      button.id != "filme" &&
      button.id != "série" &&
      button.id != "desenho"
    ) {
      opcoes.disponibilidade = button.id;
      opcoes.categoria = "";
      opcoes.filme = "";
      opcoes.nome = "";
      opcoes.pagina = 1;
    } else {
      opcoes.categoria = button.id;
      opcoes.filme = "";
      opcoes.pagina = 1;
      opcoes.nome = "";
      opcoes.disponibilidade = "";
    }
    carros = await listarCarros(opcoes);
    quantidade.innerText = carros.length;
    renderizarLista(carros);
  });
});

buscar.addEventListener("input", async () => {
  opcoes.nome = buscar.value;
  carros = await listarCarros(opcoes);
  quantidade.innerText = carros.length;
  renderizarLista(carros);
});

function marcarPaginaAtiva(numeroPagina) {
  paginacao.forEach((p) => {
    p.classList.toggle("active", p.innerText == String(numeroPagina));
  });
}

async function irParaPagina(numeroPagina) {
  opcoes.pagina = numeroPagina;
  marcarPaginaAtiva(numeroPagina);
  carros = await listarCarros(opcoes);
  quantidade.innerText = carros.length;
  renderizarLista(carros);
}

paginacao[0].classList.add("active");

paginacao.forEach((page) => {
  page.addEventListener("click", () => {
    irParaPagina(Number(page.innerText));
  });
});

botaoPaginaAnterior.addEventListener("click", () => {
  let atual = Number(opcoes.pagina);
  if (atual > 1) {
    irParaPagina(atual - 1);
  }
});

botaoPaginaProxima.addEventListener("click", () => {
  let atual = Number(opcoes.pagina);
  let ultimaPagina = paginacao.length;
  if (atual < ultimaPagina) {
    irParaPagina(atual + 1);
  }
});