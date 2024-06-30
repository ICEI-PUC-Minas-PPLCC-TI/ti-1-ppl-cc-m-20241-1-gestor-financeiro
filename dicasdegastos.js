const formulario = document.querySelector(".formulario")
const paragrafo = document.querySelector(".dica")
const paragrafo2 = document.querySelector(".dica2")
const paragrafo3 = document.querySelector(".dica3")
const saibamais = document.querySelector(".botao_saibamais")

const metas = document.querySelector(".metas")


function formatarDinheiro(number) {
    const formatado = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
        number
    )

    return formatado
}

function calcularMesesAteData(data) {
    const dataAtual = new Date()

    const partesData = data.split("-")
    const dataFornecida = new Date(partesData[0], partesData[1] - 1, partesData[2]); // O mês começa de 0 em JavaScript

    const diferenca = dataFornecida - dataAtual;

    // Converta a diferença para meses
    let meses = diferenca / (1000 * 60 * 60 * 24 * 30); // Aproximadamente 30 dias por mês

    // Arredonde para baixo para obter o número inteiro de meses
    meses = Math.floor(meses);

    return meses;
}

function loadMetas() {
    metas.innerHTML = ""
    fetch("https://919bc929-e976-4aa9-ab2e-9a7b546edc63-00-3020e41s7rhrs.picard.replit.dev/metas")
        .then(res => {
            return res.json()
        })
        .then(data => {
            data.forEach(meta => {
                metas.innerHTML += `
                    <div class="meta">
                        <p>Meta de ${formatarDinheiro(meta.meta)}</p>
                        <a href="oquevocepodegastar.html?id=${meta.id}"><button class="botao_saibamais">Saiba Mais</button></a>
                    </div>
                `
            })
        })
        .catch(err => {
            console.error(err)
        })
}

formulario.onsubmit = function(event) {
    event.preventDefault()

    const ganhoInput = formulario.querySelector("#ganhos")
    const gastosInput = formulario.querySelector("#gastos")
    const metaInput = formulario.querySelector("#meta")
    const dataInput = formulario.querySelector("#data")

    fetch("https://919bc929-e976-4aa9-ab2e-9a7b546edc63-00-3020e41s7rhrs.picard.replit.dev/metas", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ganho: +ganhoInput.value,
            gasto: +gastosInput.value,
            meta: +metaInput.value,
            disponivel: ganhoInput.value - gastosInput.value,
            data: dataInput.value
        })
    })
        .then(res => {
            loadMetas()
        })
        .catch(err => {
            console.error(err)
        })

    const disponivelPraGasto = ganhoInput.value - gastosInput.value
    const valorParaMeta = metaInput.value/calcularMesesAteData(dataInput.value)

    if(valorParaMeta < disponivelPraGasto) {
        paragrafo.textContent = `Sua meta será atingida se você investir ${formatarDinheiro(valorParaMeta)} por mês e você poderá gastar ${formatarDinheiro(disponivelPraGasto - valorParaMeta)}`
        paragrafo2.textContent = `Voce pode gastar ${formatarDinheiro(disponivelPraGasto - valorParaMeta)} no mês.`
        paragrafo3.textContent = `Voce não pode gastar ${formatarDinheiro(valorParaMeta)} no mês.`
        localStorage.setItem("valorDisponivel", disponivelPraGasto - valorParaMeta)
    } else {
        paragrafo.textContent = `Sua meta só podera ser atingida se você gastar ${formatarDinheiro(valorParaMeta - disponivelPraGasto)} a menos na suas despesas fixas`
        paragrafo2.textContent = `Voce pode gastar ${formatarDinheiro(disponivelPraGasto - valorParaMeta)} no mês.`
        paragrafo3.textContent = `Voce não pode gastar ${formatarDinheiro(valorParaMeta)} no mês.`
        localStorage.setItem("valorDisponivel", 0)
    }

}

loadMetas()

