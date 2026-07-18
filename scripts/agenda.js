import { buscarCarro } from './api.js';

const nomeMeses = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

let dataAtual = new Date();
let anoAtual = dataAtual.getFullYear();
let mesAtual = dataAtual.getMonth(); 
let datasReservadas = []; 
let idVeiculoAtual = null;

document.addEventListener('DOMContentLoaded', () => {

    const parametrosUrl = new URLSearchParams(window.location.search);
    
    idVeiculoAtual = parametrosUrl.get('id');

    if (!idVeiculoAtual) {
        console.error("Nenhum ID de veículo encontrado na URL.");
        alert("Veículo não identificado. Por favor, acesse através do catálogo.");
        return;
    }

    document.getElementById('btn-prev').addEventListener('click', () => mudarMes(-1));
    document.getElementById('btn-next').addEventListener('click', () => mudarMes(1));

    const formVerificacao = document.getElementById('form-verificacao');
    if (formVerificacao) {

        formVerificacao.addEventListener('submit', (evento) => {
            
            evento.preventDefault(); // Impede a página de recarregar

            verificarDisponibilidadeInputs();
        });
    }

    carregarDisponibilidade(idVeiculoAtual);
});

function extrairDiasDoPeriodo(dataInicio, dataFim) {
    
    const datas = [];
    
    let atual = new Date(`${dataInicio}T00:00:00`); 
    const final = new Date(`${dataFim}T00:00:00`);

    while (atual <= final) {

        const ano = atual.getFullYear();
        const mes = String(atual.getMonth() + 1).padStart(2, '0');
        const dia = String(atual.getDate()).padStart(2, '0');
        
        datas.push(`${ano}-${mes}-${dia}`);
        
        atual.setDate(atual.getDate() + 1);
    }
    
    return datas;
}

async function carregarDisponibilidade(idCarro) {
    atualizarCabecalho();
    
    try {
        datasReservadas = []; 
        
        const carro = await buscarCarro(idCarro);
        
        if (carro.status_disponibilidade === "alugado" && carro.locatario) {
            const dataInicio = carro.locatario.data_inicio_aluguel;
            const dataFim = carro.locatario.data_devolucao_prevista;
            
            const diasBloqueados = extrairDiasDoPeriodo(dataInicio, dataFim);
            
            datasReservadas = diasBloqueados;
        }

        let linkRetorno = document.querySelector('#voltarIndividual');

        if (linkRetorno) {
            linkRetorno.innerHTML = `< Voltar para ${carro.nome}`;
        
            linkRetorno.href = `Individual.html?id=${carro.id}`;

            let nomeDoVeiculo = document.querySelector('.veiculo-nome');

            nomeDoVeiculo.innerHTML=`${carro.nome}`
        }

        gerarCalendario();

    } catch (erro) {
        console.error("Erro ao buscar as informações da agenda:", erro);
    }
}

function mudarMes(direcao) {
    mesAtual += direcao;
    
    if (mesAtual < 0) {
        mesAtual = 11;
        anoAtual--;
    } else if (mesAtual > 11) {
        mesAtual = 0;
        anoAtual++;
    }
    
    gerarCalendario();
    atualizarCabecalho();
}


function atualizarCabecalho() {
    const cabecalho = document.getElementById('mes-ano');
    if (cabecalho) {
        cabecalho.innerText = `${nomeMeses[mesAtual]} ${anoAtual}`;
    }
}


function gerarCalendario() {
    const grid = document.getElementById('dias-grid');

    if (!grid) {
        return;
    };
    
    grid.innerHTML = ""; 

    const primeiroDia = new Date(anoAtual, mesAtual, 1).getDay();
    
    const totalDias = new Date(anoAtual, mesAtual + 1, 0).getDate();

    for (let i = 0; i < primeiroDia; i++) {

        const divVazia = document.createElement('div');

        divVazia.classList.add('dia', 'vazio');
        grid.appendChild(divVazia);

    }

    for (let dia = 1; dia <= totalDias; dia++) {

        const divDia = document.createElement('div');

        divDia.classList.add('dia');
        divDia.innerText = dia;

        const mesFormatado = String(mesAtual + 1).padStart(2, '0');
        const diaFormatado = String(dia).padStart(2, '0');
        const dataAtualLoop = `${anoAtual}-${mesFormatado}-${diaFormatado}`;

        if (datasReservadas.includes(dataAtualLoop)) {

            divDia.classList.add('reservado');
            divDia.title = "Dia já reservado";

        } else {

            divDia.classList.add('disponivel');

            divDia.title = "Disponível para aluguel";
            
            divDia.addEventListener('click', () => {
                console.log(`Data selecionada: ${dataAtualLoop}`);
            });
        }

        grid.appendChild(divDia);
    }
}

function verificarDisponibilidadeInputs() {
    const inputRetirada = document.getElementById('data-retirada').value;
    const inputDevolucao = document.getElementById('data-devolucao').value;

    if (!inputRetirada || !inputDevolucao) {
        alert("Por favor, selecione as datas de retirada e devolução para verificar.");
        return;
    }

    if (new Date(inputRetirada) > new Date(inputDevolucao)) {
        alert("A data de devolução não pode ser anterior à data de retirada.");
        return;
    }

    const diasDesejados = extrairDiasDoPeriodo(inputRetirada, inputDevolucao);

    let temConflito = false;

    for (const dia of diasDesejados) {
        if (datasReservadas.includes(dia)) {
            temConflito = true;
            break; 
        }
    }   
    
    if (temConflito) {
        alert("Infelizmente, o veículo já possui reservas durante o período selecionado. Tente outras datas.");
    } else {
        alert("Período totalmente disponível! Você pode prosseguir com a reserva.");
    }
}

