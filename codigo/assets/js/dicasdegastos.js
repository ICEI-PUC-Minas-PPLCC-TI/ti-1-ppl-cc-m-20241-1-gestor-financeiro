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
    fetch("https://1a770c80-41ff-4f19-8cb5-699967f55bcb-00-1395yp0me7mv2.kirk.replit.dev/metas")
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

loadMetas()

