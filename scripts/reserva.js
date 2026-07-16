import { buscarCarro } from "../scripts/api.js";

let dataRetiradaValue = document.querySelector(".retirada");
let dataDevolucaoValue = document.querySelector(".devolucao");
dataRetiradaValue.value = "2026-07-19";
dataDevolucaoValue.value = "2026-07-19";

let parametro = new URLSearchParams(window.location.search);
let id = parametro.get("id");
let carro = await buscarCarro(id);

let valorTotal = document.querySelector(".total-value");
let valorDiario = document.querySelector(".value");
valorDiario.innerText = carro.valor_aluguel_dia;
let contagemDias = document.querySelector(".days-count");
let botaoReservar = document.querySelector(".btn-reservar");

function validarReserva(dias) {
  if (dias < 0) {
    botaoReservar.innerText = "Indisponivel";
    botaoReservar.disabled = true;
    valorTotal.innerText = 0;
    contagemDias.innerText = 0;
  } else {
    botaoReservar.disabled = false;
    botaoReservar.innerText = "Confirmar Reserva";
    valorTotal.innerText = parseInt(carro.valor_aluguel_dia) * dias;
    contagemDias.innerText = dias;
  }
}

dataRetiradaValue.addEventListener("change", () => {
  let inicio = new Date(dataRetiradaValue.value);
  let fim = new Date(dataDevolucaoValue.value);

  let dias = Math.round((fim - inicio) / (1000 * 60 * 60 * 24));

  validarReserva(dias);
});

dataDevolucaoValue.addEventListener("change", () => {
  let inicio = new Date(dataRetiradaValue.value);
  let fim = new Date(dataDevolucaoValue.value);

  let dias = Math.round((fim - inicio) / (1000 * 60 * 60 * 24));

  validarReserva(dias);
});

let imagemCarro = document.querySelector(".img");
imagemCarro.src = carro.url_imagem;

let nomeVeiculo = document.querySelector(".name");
nomeVeiculo.innerText = carro.nome;
