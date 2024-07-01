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

formulario.onsubmit = function(event) {
    event.preventDefault()

    const ganhoInput = formulario.querySelector("#ganhos")
    const gastosInput = formulario.querySelector("#gastos")
    const metaInput = formulario.querySelector("#meta")
    const dataInput = formulario.querySelector("#data")

    fetch("https://1a770c80-41ff-4f19-8cb5-699967f55bcb-00-1395yp0me7mv2.kirk.replit.dev/metas", {
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
    ganhoInput.value = ''
    gastosInput.value = ''
    metaInput.value = ''
    dataInput.value = ''
}


