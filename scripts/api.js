export async function listarCarros(opcoes) {
  try {
    let url = "http://localhost:3001/carros";

    let params = new URLSearchParams();

    params.append("_page", opcoes.pagina);
    params.append("_limit", opcoes.limite);
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
      throw new Error("Erro na requisição do catalogo");
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
      throw new error("Falha na requisição da busca");
    }
    let dados = await response.json();
    return dados;
  } catch (error) {
    throw new error();
  }
}

export async function salvarAluguel(dados) {
  try {
    let response = await fetch("http://localhost:3001/reservas", {
      method: "POST",

      headers: {
        "Content-type": "application/json",
      },

      body: JSON.stringify(dados),
    });

    if (!response.ok) {
      throw new Error("Falha na requisição de reservas");
    }

    return await response.json();
  } catch (error) {
    throw new Error(error);
  }
}

export async function reservarLocatario(id, informacoes) {
  console.log(informacoes);
  try {
    let response = await fetch(`http://localhost:3001/carros/${id}`, {
      method: "PATCH",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        status_disponibilidade: "alugado",
        locatario: {
          nome: informacoes.nome,
          documento: informacoes.documento,
          email: informacoes.email,
          data_inicio_aluguel: informacoes.data_inicio_aluguel,
          data_devolucao_prevista: informacoes.data_devolucao_prevista,
          telefone: informacoes.telefone,
        },
      }),
    });

    if (!response.ok) {
      throw new Error("Erro na requisição do Locatario");
    }
  } catch (error) {
    throw new Error(error);
  }
}

export async function removerLocatario(id) {
  try {
    let response = await fetch(`http://localhost:3001/carros/${id}`, {
      method: "PATCH",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status_disponibilidade: "disponivel",
        locatario: null,
      }),
    });
    if (!response.ok) {
      throw new Error("Falha na requisição de removerLocatario");
    }
  } catch (error) {
    throw new Error(error);
  }
}

export async function listarReservas() {
  try {
    let response = await fetch("http://localhost:3001/reservas");

    if (!response.ok) {
      throw new Error("Falha na requisição de listarReservas");
    }

    let dados = await response.json();
    return dados;
  } catch (error) {
    throw new Error(error);
  }
}

export async function atualizarReserva(id, estado) {
  console.log(id, "id do card");
  console.log(estado, "estado do card");

  const response = await fetch(`http://localhost:3001/reservas/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      status: estado,
    }),
  });
  if (!response.ok) {
    console.error("Error em atualizarReserva");
    throw Error("Erro na requisição atualizarReserva");
  }
}
