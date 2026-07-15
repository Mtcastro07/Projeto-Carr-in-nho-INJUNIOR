import { listarCarros } from "../scripts/api.js";
let listaCarros = document.querySelector(".list-cars");
let botoesCategorias = document.querySelectorAll(".btn-category");
let buscar = document.querySelector(".buscador");
let quantidade = document.querySelector(".quantidade");
let paginacao = document.querySelectorAll(".page");

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

  buttonAlugar.addEventListener("click", () => {});

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
