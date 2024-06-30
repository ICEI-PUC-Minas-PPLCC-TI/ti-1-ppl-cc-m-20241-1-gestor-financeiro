// Trabalho Interdisciplinar 1 - Aplicações Web
//
// Esse módulo realiza as operações de CRUD a partir de uma API baseada no JSONServer
// O servidor JSONServer fica hospedado na seguinte URL
// https://jsonserver.rommelpuc.repl.co/contatos
//
// Para fazer o seu servidor, acesse o projeto do JSONServer no Replit, faça o 
// fork do projeto e altere o arquivo db.json para incluir os dados do seu projeto.
// URL Projeto JSONServer: https://replit.com/@rommelpuc/JSONServer
//
// Autor: Rommel Vieira Carneiro
// Data: 03/10/2023

// URL da API JSONServer - Substitua pela URL correta da sua API
const apiUrl = 'https://1a770c80-41ff-4f19-8cb5-699967f55bcb-00-1395yp0me7mv2.kirk.replit.dev/investimentos';
//const apiUrl = 'https://jsonserver.rommelpuc.repl.co/contatos'; 

function displayMessage(mensagem) {
    msg = document.getElementById('msg');
    msg.innerHTML = '<div class="alert alert-warning">' + mensagem + '</div>';
}

function readContato(processaDados) {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            processaDados(data);
        })
        .catch(error => {
            console.error('Erro ao ler investimentos via API JSONServer:', error);
            displayMessage("Erro ao ler investimentos");
        });
}

function createContato(contato, refreshFunction) {
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(contato),
    })
        .then(response => response.json())
        .then(data => {
            displayMessage("Investimento inserido com sucesso");
            if (refreshFunction)
                refreshFunction();
        })
        .catch(error => {
            console.error('Erro ao inserir investimento via API JSONServer:', error);
            displayMessage("Erro ao inserir investimento");
        });
}

function updateContato(id, contato, refreshFunction) {
    fetch(`${apiUrl}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(contato),
    })
        .then(response => response.json())
        .then(data => {
            displayMessage("Investimento alterado com sucesso");
            if (refreshFunction)
                refreshFunction();
        })
        .catch(error => {
            console.error('Erro ao atualizar investimento via API JSONServer:', error);
            displayMessage("Erro ao atualizar investimento");
        });
}

function deleteContato(id, refreshFunction) {
    fetch(`${apiUrl}/${id}`, {
        method: 'DELETE',
    })
        .then(response => response.json())
        .then(data => {
            displayMessage("Investimento removido com sucesso");
            if (refreshFunction)
                refreshFunction();
        })
        .catch(error => {
            console.error('Erro ao remover investimento via API JSONServer:', error);
            displayMessage("Erro ao remover investimento");
        });
}
