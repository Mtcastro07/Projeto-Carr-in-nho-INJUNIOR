export async function listarCarros() {
  try {
    let resposta = await fetch("http://localhost:3001/carros");
    if (!resposta.ok) {
      throw new Error("Erro na requisição da API");
    }

    let dados = await resposta.json();
    return dados;
  } catch (error) {
    throw new Error("Erro ao rodar a requisição");
  }
}
