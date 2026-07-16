import { listarCarros } from "../scripts/api.js";
let listaCarros = document.querySelector(".list-cars");
let botoesCategorias = document.querySelectorAll(".btn-category");
let buscar = document.querySelector(".buscador");
let quantidade = document.querySelector(".quantidade");
let paginacao = document.querySelectorAll(".page");

//Função utilizada para criar os card
function criarCard(carro) {
  let linha = document.createElement("li");
  linha.classList.add("card");

  let divImg = document.createElement("div");
  divImg.classList.add("card-img");

  let divInfos = document.createElement("div");
  divInfos.classList.add("card-infos");

  let category = document.createElement("p");
  category.innerText = carro.categoria;

  let disponibilidade = document.createElement("p");
  disponibilidade.innerText = carro.status_disponibilidade;

  let name = document.createElement("p");
  name.innerText = carro.nome;

  let filme = document.createElement("p");
  filme.innerText = carro.universo_origem;

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

  if (disponibilidade.innerText != "disponivel") {
    buttonAlugar.innerText = "Indisponivel";
  } else {
    buttonAlugar.innerText = "Alugar";
  }

  divImg.append(imagem, category, disponibilidade);
  divInfos.append(name, filme, porDia, valor, buttonAlugar);
  linha.appendChild(divImg);
  linha.appendChild(divInfos);
  linha.appendChild(divButtons);

  linha.addEventListener("click", () => {
    window.location = `individual.html?id=${carro.id}`;
  });

  return linha;
}

function renderizarLista(vetor) {
  listaCarros.innerHTML = "";
  vetor.forEach((elemento) => {
    listaCarros.appendChild(criarCard(elemento));
  });
}

let opcoes = {
  pagina: 1,
  nome: "",
  disponibilidade: "",
  filme: "",
  categoria: "",
};

let carros = await listarCarros(opcoes);
quantidade.innerText = carros.length;
renderizarLista(carros);

botoesCategorias.forEach((button) => {
  button.addEventListener("click", async () => {
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

paginacao.forEach((page) => {
  page.addEventListener("click", async () => {
    opcoes.pagina = page.innerText;
    carros = await listarCarros(opcoes);
    quantidade.innerText = carros.length;
    renderizarLista(carros);
  });
});
