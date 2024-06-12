const apiurl = "https://47d06eaa-f1fe-4648-8251-cba0cc5fc02e-00-3q998qhp44u0k.picard.replit.dev/extrato"
const extratoElemento = document.querySelector(".extrato")
const categoriasElemento = document.querySelector(".categorias ul")
const categoriasBotao = document.querySelectorAll(".btn-categoria")

const db = []
const labels = []
const graphData = []

function atualizarExtrato(categoria) {
    extratoElemento.innerHTML = ""

    if (categoria == "Geral") {
        db.forEach(transacao => {
            extratoElemento.innerHTML += `
            <li class="${transacao.tipo === "Gasto" ? "gasto" : "ganho"}">${transacao.valor}</li>
            `
        })
    } else {
        const transacao = db.find(transacao => transacao.descricao === categoria)
        extratoElemento.innerHTML += `
            <li class="${transacao.tipo === "Gasto" ? "gasto" : "ganho"}">${transacao.valor}</li>
        `
    }
}


async function carregar_dados() {
    const response = await fetch(apiurl)
    const data = await response.json()
    data.forEach(transacao => {
        extratoElemento.innerHTML += `
            <li class="${transacao.tipo === "Gasto" ? "gasto" : "ganho"}">${transacao.valor}</li>
        `
        
        db.push(transacao)
        labels.push(transacao.descricao)
        graphData.push(+transacao.valor)
    })


    const ctx = document.getElementById('grafico');

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels,
            datasets: [{
                data: graphData,
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)',
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)',
                ],
                hoverOffset: 4
            }]
        },
    });
}

window.addEventListener("load", carregar_dados)