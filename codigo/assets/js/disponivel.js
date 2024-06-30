const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('id');

function formatarDinheiro(number) {
    const formatado = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
        number
    )

    return formatado
}
const disponiveltexto = document.querySelector(".disponivel")
const valordisponivel = localStorage.getItem("valorDisponivel")
window.onload = () => {
  fetch(`https://919bc929-e976-4aa9-ab2e-9a7b546edc63-00-3020e41s7rhrs.picard.replit.dev/metas/${myParam}`)
        .then(res => {
            return res.json()
        })
        .then(data => {
            console.log(data)
            disponiveltexto.textContent += formatarDinheiro(data.disponivel)
        })
} 