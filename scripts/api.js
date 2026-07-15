export async function listarCarros(opcoes) {
  try {
    let url = "http://localhost:3001/carros";

    let params = new URLSearchParams();

    params.append("_page", opcoes.pagina);
    params.append("_limit", 8);
    if (opcoes.disponibilidade != "") {
      if (opcoes.disponibilidade == "disponivel") {
        params.append("status_disponibilidade", opcoes.disponibilidade);
      } else {
        params.append("status_disponibilidade_ne", "disponivel");
      }
    }
    if (opcoes.categoria != "") {
      params.append("categoria_like", opcoes.categoria);
    }
    if (opcoes.nome != "") {
      params.append("nome_like", opcoes.nome);
    }
    if (opcoes.filme != "") {
      params.append("universo_origem_like", opcoes.filme);
    }

    params = params.toString();

    let response = await fetch(url + "?" + params);
    if (!response.ok) {
      throw new Error("Erro na requisição");
    }
    let dados = await response.json();
    return dados;
  } catch (error) {
    throw error;
  }
}

export async function buscarCarro(id) {
  try {
    let response = await fetch(`http://localhost:3001/carros/${id}`);
    if (!response.ok) {
      throw new error("Falha na requisição");
    }
    let dados = await response.json();
    return dados;
  } catch (error) {
    throw new error();
  }
}
