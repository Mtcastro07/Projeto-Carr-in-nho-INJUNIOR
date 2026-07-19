import { receberMensagem } from "./api.js";

let buttonEnviar = document.querySelector("#enviar");
let nome = document.querySelector("#nome");
let email = document.querySelector("#email");
let assunto = document.querySelector("#assunto");
let mensagem = document.querySelector("#mensagem");

buttonEnviar.addEventListener("click", async () => {
  let Mensagem = {
    Nome: nome.value,
    Email: email.value,
    Assunto: assunto.value,
    Mensagem: mensagem.value,
  };

  nome.value = "";
  email.value = "";
  assunto.value = "";
  mensagem.value = "";

  console.log("enviando");
  try {
    await receberMensagem(Mensagem);
    console.log("Mensagem enviada");
  } catch (erro) {
    console.error(erro);
    console.log("Erro ao enviar a mensagem");
  }
});
