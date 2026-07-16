import { buscarCarro } from "../scripts/api.js";

let parametro = new URLSearchParams(window.location.search);
let id = parametro.get("id");
let carro = await buscarCarro(id);

let divImg = document.querySelector(".car-img");
let divTextContent = document.querySelector(".text-content");

let imagemCarro = document.createElement("img");
imagemCarro.src = carro.url_imagem;

let nomeCarro = document.createElement("h2");
nomeCarro.innerText = carro.nome;

let tituloAnoCarro = document.createElement("p");
tituloAnoCarro.innerText =
  carro.universo_origem + " " + "(" + carro.ano_obra + ")";

let categoriaCarro = document.createElement("p");
categoriaCarro.innerText = carro.categoria;

let valorCarro = document.createElement("p");
valorCarro.innerText = carro.valor_aluguel_dia;

let disponibilidadeCarro = document.createElement("p");
disponibilidadeCarro.innerText = carro.status_disponibilidade;

let porDia = document.createElement("p");
porDia.innerText = "VALOR POR DIA";

divImg.append(imagemCarro);

let divPreco = document.createElement("div");
let divMensagemPreco = document.createElement("div");

divMensagemPreco.append(porDia, disponibilidadeCarro);
divPreco.appendChild(divMensagemPreco);
divPreco.append(valorCarro);
divTextContent.append(nomeCarro, tituloAnoCarro, categoriaCarro);
divTextContent.appendChild(divPreco);

let divButtons = document.createElement("div");

let buttonReservar = document.createElement("button");
buttonReservar.classList.add("btn-reserve");
buttonReservar.innerText = "Reservar Agora";
buttonReservar.addEventListener("click", (evento) => {
  evento.stopPropagation();
  window.location = `Reserva.html?id=${carro.id}`;
});

if (carro.status_disponibilidade != "disponivel") {
  buttonReservar.innerText = "Indisponivel";
  buttonReservar.disabled = true;
} else {
  buttonReservar.innerText = "Reservar Agora";
  buttonReservar.disabled = false;
}

let buttonAgenda = document.createElement("button");
buttonAgenda.classList.add("btn-calendar");
buttonAgenda.innerHTML =
  '<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 1.25V3.75" stroke="#2563EB" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 1.25V3.75" stroke="#2563EB" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/><path d="M11.875 2.5H3.125C2.43464 2.5 1.875 3.05964 1.875 3.75V12.5C1.875 13.1904 2.43464 13.75 3.125 13.75H11.875C12.5654 13.75 13.125 13.1904 13.125 12.5V3.75C13.125 3.05964 12.5654 2.5 11.875 2.5Z" stroke="#2563EB" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/><path d="M1.875 6.25H13.125" stroke="#2563EB" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
  "<p>Ver Agenda</p>";

divButtons.append(buttonReservar, buttonAgenda);

divTextContent.appendChild(divButtons);
