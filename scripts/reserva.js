import { buscarCarro } from "../scripts/api.js";
import { salvarAluguel } from "../scripts/api.js";
import { reservarLocatario } from "../scripts/api.js";

let dataRetiradaValue = document.querySelector("#retirada");
let dataDevolucaoValue = document.querySelector("#devolucao");
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
let dadosCarro = document.querySelectorAll(".inputs");
let imagemCarro = document.querySelector(".img");
imagemCarro.src = carro.url_imagem;

let nomeVeiculo = document.querySelector(".name");
let nomeInputVeiculo = document.querySelector("#veiculo");
nomeVeiculo.innerText = carro.nome;
nomeInputVeiculo.placeholder = carro.nome;

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

botaoReservar.addEventListener("click", async (event) => {
  event.preventDefault();
  let dadosLocatario = {
    nome: document.querySelector("#nome").value,
    documento: document.querySelector("#CPF").value,
    email: document.querySelector("#email").value,
    data_inicio_aluguel: document.querySelector("#retirada").value,
    data_devolucao_prevista: document.querySelector("#devolucao").value,
    telefone: document.querySelector("#telefone").value,
  };

  let dadosReserva = {
    carId: carro.id,
    nome: carro.nome,
    imagem: carro.url_imagem,
    local: document.querySelector("#local").value,
    status: "ativo",
    duracao: contagemDias.innerText,
    valor_total: valorTotal.innerText,
    data_inicio_aluguel: document.querySelector("#retirada").value,
    data_devolucao_prevista: document.querySelector("#devolucao").value,
  };

  await reservarLocatario(id, dadosLocatario);
  await salvarAluguel(dadosReserva);
  window.location = "Reservas.html";
});
