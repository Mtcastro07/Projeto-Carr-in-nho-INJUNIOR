import { listarCarros } from "../scripts/api.js";
let listaCarros = document.querySelector(".list-cars");
let botoesCategorias = document.querySelectorAll(".btn-category");
let buscar = document.querySelector(".buscador");

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
  return linha;
}

function renderizarLista(vetor) {
  listaCarros.innerHTML = "";
  vetor.forEach((elemento) => {
    listaCarros.appendChild(criarCard(elemento));
  });
}

function filtroCategoria(categoria, array) {
  let arrayCategorizado = array.filter((elemento) => {
    return elemento.categoria == categoria;
  });
  return arrayCategorizado;
  console.log(arrayCategorizado);
}

let carros = await listarCarros();
renderizarLista(carros);

botoesCategorias.forEach((button) => {
  button.addEventListener("click", () => {
    let buttonID = button.id;
    if (
      buttonID != "todos" &&
      buttonID != "indisponivel" &&
      buttonID != "disponivel"
    ) {
      console.log(buttonID);
      let arrayCategorizado = filtroCategoria(buttonID, carros);
      renderizarLista(arrayCategorizado);
    } else if (buttonID == "indisponivel") {
      let arrayIndisponivel = carros.filter((elemento) => {
        return elemento.status_disponibilidade != "disponivel";
      });
      renderizarLista(arrayIndisponivel);
    } else if (buttonID == "disponivel") {
      let arrayDisponivel = carros.filter((elemento) => {
        return elemento.status_disponibilidade == "disponivel";
      });
      renderizarLista(arrayDisponivel);
    } else {
      renderizarLista(carros);
    }
  });
});

buscar.addEventListener("input", () => {
  let arrayBuscado = carros.filter((elemento) => {
    return (
      elemento.nome.toLowerCase().includes(buscar.value.toLowerCase()) ||
      elemento.universo_origem
        .toLowerCase()
        .includes(buscar.value.toLowerCase()) ||
      elemento.categoria.toLowerCase().includes(buscar.value.toLowerCase())
    );
  });
  renderizarLista(arrayBuscado);
});
