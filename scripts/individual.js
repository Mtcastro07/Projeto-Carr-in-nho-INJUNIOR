import { buscarCarro } from "../scripts/api.js";

let parametro = new URLSearchParams(window.location.search);
let id = parametro.get("id");
let carro = await buscarCarro(id);

let main = document.querySelector("main");
let sectionPages = document.querySelector(".all-pages");

let divPage = document.createElement("div");
divPage.classList.add("page");

let divImg = document.querySelector(".car-img");
let divTextContent = document.querySelector(".text-content");

let imagemCarro = document.createElement("img");
imagemCarro.src = carro.url_imagem;

let nomePagina = document.querySelector(".nomePagina");
let nomeCarro = document.createElement("h2");
nomeCarro.innerText = carro.nome;
nomePagina.innerText = carro.nome;

let tituloAnoCarro = document.createElement("p");
tituloAnoCarro.innerText =
  carro.universo_origem + " " + "(" + carro.ano_obra + ")";

let DivStatusCat = document.createElement("div");
DivStatusCat.classList.add("status-cat");

let categoriaCarro = document.createElement("div");
categoriaCarro.classList.add("categoria");
if (carro.categoria == "desenho") {
  const estrela =
    '<svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_3_661)"><path d="M4.32188 0.860616C4.33831 0.827413 4.3637 0.799465 4.39517 0.779925C4.42665 0.760385 4.46296 0.750031 4.5 0.750031C4.53705 0.750031 4.57336 0.760385 4.60483 0.779925C4.63631 0.799465 4.66169 0.827413 4.67813 0.860616L5.54438 2.61524C5.60144 2.73073 5.68568 2.83064 5.78986 2.90641C5.89404 2.98218 6.01505 3.03153 6.1425 3.05024L8.07975 3.33374C8.11646 3.33906 8.15095 3.35454 8.17931 3.37844C8.20768 3.40234 8.22879 3.4337 8.24026 3.46897C8.25173 3.50424 8.2531 3.54202 8.24422 3.57803C8.23534 3.61404 8.21656 3.64685 8.19 3.67274L6.789 5.03699C6.69661 5.12703 6.62748 5.23817 6.58757 5.36085C6.54765 5.48353 6.53815 5.61407 6.55988 5.74124L6.89063 7.66874C6.89711 7.70543 6.89314 7.7432 6.87919 7.77775C6.86524 7.81229 6.84185 7.84222 6.81171 7.86411C6.78156 7.88601 6.74587 7.89899 6.7087 7.90158C6.67154 7.90416 6.63439 7.89625 6.6015 7.87874L4.86975 6.96824C4.75565 6.90833 4.6287 6.87702 4.49982 6.87702C4.37094 6.87702 4.24398 6.90833 4.12988 6.96824L2.3985 7.87874C2.36563 7.89614 2.32853 7.90397 2.29142 7.90134C2.25432 7.8987 2.2187 7.8857 2.18861 7.86382C2.15853 7.84194 2.13519 7.81206 2.12125 7.77757C2.10731 7.74309 2.10333 7.70538 2.10975 7.66874L2.44013 5.74162C2.46195 5.61439 2.4525 5.48376 2.41258 5.36101C2.37266 5.23825 2.30348 5.12705 2.211 5.03699L0.810004 3.67312C0.783226 3.64725 0.764251 3.61439 0.755239 3.57827C0.746228 3.54215 0.747542 3.50422 0.759033 3.46881C0.770524 3.4334 0.791729 3.40193 0.820232 3.37798C0.848736 3.35404 0.883392 3.33858 0.920253 3.33337L2.85713 3.05024C2.98472 3.03168 3.1059 2.98239 3.21022 2.90661C3.31455 2.83083 3.39889 2.73084 3.456 2.61524L4.32188 0.860616Z" stroke="#FFB900" stroke-width="0.75" stroke-linecap="round" stroke-linejoin="round"/></g><defs><clipPath id="clip0_3_661"><rect width="9" height="9" fill="white"/></clipPath></defs></svg>';
  categoriaCarro.innerHTML = estrela + "<p>Desenho</p>";
  categoriaCarro.classList.add("estrela");
} else if (carro.categoria == "filme") {
  const filme =
    '<svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.125 1.125H1.875C1.46079 1.125 1.125 1.46079 1.125 1.875V7.125C1.125 7.53921 1.46079 7.875 1.875 7.875H7.125C7.53921 7.875 7.875 7.53921 7.875 7.125V1.875C7.875 1.46079 7.53921 1.125 7.125 1.125Z" stroke="#51A2FF" stroke-width="0.75" stroke-linecap="round" stroke-linejoin="round"/><path d="M2.625 1.125V7.875" stroke="#51A2FF" stroke-width="0.75" stroke-linecap="round" stroke-linejoin="round"/><path d="M1.125 2.8125H2.625" stroke="#51A2FF" stroke-width="0.75" stroke-linecap="round" stroke-linejoin="round"/><path d="M1.125 4.5H7.875" stroke="#51A2FF" stroke-width="0.75" stroke-linecap="round" stroke-linejoin="round"/><path d="M1.125 6.1875H2.625" stroke="#51A2FF" stroke-width="0.75" stroke-linecap="round" stroke-linejoin="round"/><path d="M6.375 1.125V7.875" stroke="#51A2FF" stroke-width="0.75" stroke-linecap="round" stroke-linejoin="round"/><path d="M6.375 2.8125H7.875" stroke="#51A2FF" stroke-width="0.75" stroke-linecap="round" stroke-linejoin="round"/><path d="M6.375 6.1875H7.875" stroke="#51A2FF" stroke-width="0.75" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  categoriaCarro.innerHTML = filme + "<p>Filme</p>";
  categoriaCarro.classList.add("filme");
} else {
  const serie =
    '<svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_3_833)"><path d="M7.5 2.625H1.5C1.08579 2.625 0.75 2.96079 0.75 3.375V7.5C0.75 7.91421 1.08579 8.25 1.5 8.25H7.5C7.91421 8.25 8.25 7.91421 8.25 7.5V3.375C8.25 2.96079 7.91421 2.625 7.5 2.625Z" stroke="#C27AFF" stroke-width="0.75" stroke-linecap="round" stroke-linejoin="round"/><path d="M6.375 0.75L4.5 2.625L2.625 0.75" stroke="#C27AFF" stroke-width="0.75" stroke-linecap="round" stroke-linejoin="round"/></g><defs><clipPath id="clip0_3_833"><rect width="9" height="9" fill="white"/></clipPath></defs></svg>';
  categoriaCarro.innerHTML = serie + "<p>Série</p>";
  categoriaCarro.classList.add("serie");
}

let valorCarro = document.createElement("p");
valorCarro.classList.add("valor");
valorCarro.innerText = `R$ ${carro.valor_aluguel_dia}`;

let disponibilidadeImg = document.createElement("div");
let disponibilidadePreco = document.createElement("div");

if (carro.status_disponibilidade === "disponivel") {
  disponibilidadeImg.classList.add("disponivelImg");
  disponibilidadePreco.classList.add("disponivel");

  disponibilidadeImg.innerHTML = `
    <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="3" cy="3" r="3" fill="#00D492"/>
    </svg>
    <p>Disponível</p>
  `;

  disponibilidadePreco.innerHTML = `
    <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="3" cy="3" r="3" fill="#00D492"/>
    </svg>
    <p>Disponível</p>
  `;
} else {
  disponibilidadeImg.classList.add("indisponivelImg");
  disponibilidadePreco.classList.add("indisponivel");

  disponibilidadeImg.innerHTML = `
    <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="3" cy="3" r="3" fill="#FF6467"/>
    </svg>
    <p>Indisponível</p>
  `;

  disponibilidadePreco.innerHTML = `
    <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="3" cy="3" r="3" fill="#FF6467"/>
    </svg>
    <p>Indisponível</p>
  `;
}

DivStatusCat.append(categoriaCarro, disponibilidadeImg);

let porDia = document.createElement("p");
porDia.innerText = "VALOR POR DIA";

divImg.append(imagemCarro, DivStatusCat);

let divPreco = document.createElement("div");
divPreco.classList.add("data-valor-status");
let divMensagemPreco = document.createElement("div");
divMensagemPreco.classList.add("dispo-preco");

divMensagemPreco.append(porDia, disponibilidadePreco);
divPreco.appendChild(divMensagemPreco);
divPreco.append(valorCarro);
divTextContent.append(nomeCarro, tituloAnoCarro);
divTextContent.appendChild(divPreco);

let divButtons = document.createElement("div");
divButtons.classList.add("btns");

let buttonReservar = document.createElement("button");
buttonReservar.classList.add("btn-reserve");
buttonReservar.innerHTML = "<p>Reservar Agora</p>";
buttonReservar.addEventListener("click", (evento) => {
  evento.stopPropagation();
  window.location = `Reserva.html?id=${carro.id}`;
});

if (carro.status_disponibilidade != "disponivel") {
  buttonReservar.classList.add("fechado");
  buttonReservar.innerHTML = "<p>Indisponivel</p>";
  buttonReservar.disabled = true;
} else {
  buttonReservar.classList.remove("fechado");
  buttonReservar.innerHTML = "<p>Reservar Agora</p>";
  buttonReservar.disabled = false;
}

let buttonAgenda = document.createElement("button");
buttonAgenda.classList.add("btn-calendar");
buttonAgenda.innerHTML =
  '<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 1.25V3.75" stroke="#2563EB" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 1.25V3.75" stroke="#2563EB" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/><path d="M11.875 2.5H3.125C2.43464 2.5 1.875 3.05964 1.875 3.75V12.5C1.875 13.1904 2.43464 13.75 3.125 13.75H11.875C12.5654 13.75 13.125 13.1904 13.125 12.5V3.75C13.125 3.05964 12.5654 2.5 11.875 2.5Z" stroke="#2563EB" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/><path d="M1.875 6.25H13.125" stroke="#2563EB" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
  "<p>Ver Agenda</p>";

  
  divButtons.append(buttonReservar, buttonAgenda);
  
  divTextContent.appendChild(divButtons);
  
  divPage.appendChild(divImg);
  divPage.appendChild(divTextContent);
  sectionPages.append(divPage);

const btnVerAgenda = document.querySelector('.btn-calendar');    
btnVerAgenda.addEventListener('click',()=> window.location = `Agenda.html?id=${carro.id}`);
