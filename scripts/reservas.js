import { listarReservas } from "./api.js";
import { removerLocatario } from "./api.js";
import { atualizarReserva } from "./api.js";

let dados = await listarReservas();

let listaReservas = document.querySelector(".list-reservas");

function reservaCard(dados) {
  let divCard = document.createElement("div");
  divCard.classList.add("card");
  let divElements = document.createElement("div");
  divElements.classList.add("img-texto");
  let divTextos = document.createElement("div");
  divTextos.classList.add("textos");
  let divTituloStatus = document.createElement("div");
  divTituloStatus.classList.add("titulo-status");
  let divButtons = document.createElement("div");
  divButtons.classList.add("buttons");

  let titulo = document.createElement("h4");
  titulo.innerText = dados.nome;
  let imagem = document.createElement("img");
  imagem.src = dados.imagem;
  let status = document.createElement("p");
  status.innerText = dados.status;

  let buttonDetalhes = document.createElement("button");
  buttonDetalhes.classList.add("btn-detalhes");
  buttonDetalhes.innerText = "Ver Detalhes";

  buttonDetalhes.addEventListener("click", () => {
    window.location = `individual.html?id=${dados.carId}`;
  });

  let buttonCancelar = document.createElement("button");
  buttonCancelar.classList.add("btn-cancelar");
  buttonCancelar.innerText = "Cancelar";

  buttonCancelar.addEventListener("click", async () => {
    buttonDetalhes.classList.add("fechar");
    buttonCancelar.innerText = "cancelado";
    buttonCancelar.disabled = true;
    status.innerText = "cancelado";

    await removerLocatario(dados.id);
    await atualizarReserva(dados.id, "cancelado");
  });

  if (dados.status != "ativo") {
    divButtons.append(buttonDetalhes);
  } else {
    divButtons.append(buttonDetalhes, buttonCancelar);
  }

  divTituloStatus.append(titulo, status);
  divTextos.appendChild(divTituloStatus);
  let info = `${dados.duracao} dias · R$ ${dados.valor_total} · ${dados.local}`;
  let inicioFim = `${dados.data_inicio_aluguel} → ${dados.data_devolucao_prevista}`;
  divTextos.append(info, inicioFim);
  divElements.append(imagem);
  divElements.appendChild(divTextos);
  divCard.appendChild(divElements);
  divCard.appendChild(divButtons);
  return divCard;
}

function renderizarReservas(dados) {
  listaReservas.innerHTML = "";
  dados.forEach(async (reserva) => {
    let hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    let devolucao = new Date(reserva.data_devolucao_prevista);

    if (devolucao < hoje && reserva.status == "ativo") {
      await atualizarReserva(reserva.id, "finalizado");

      await removerLocatario(reserva.carId);
    }
  });

  dados.forEach((dado) => {
    listaReservas.appendChild(reservaCard(dado));
  });
}

renderizarReservas(dados);
