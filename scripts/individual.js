import { buscarCarro } from "../scripts/api.js";

let parametro = new URLSearchParams(window.location.search);
let id = parametro.get("id");

let carro = await buscarCarro(id);
console.log(carro);
