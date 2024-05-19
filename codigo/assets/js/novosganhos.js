$(function() {
    $('.custom4').maskMoney();
})

const novoGanho = document.querySelector(".novoGanho")
const novoGasto = document.querySelector(".novoGasto")

let extrato = []

function salvarLocalStorage(extrato) {
  localStorage.removeItem("extrato")
  localStorage.setItem("extrato", JSON.stringify(extrato))
}

novoGanho.addEventListener("submit", function(event) {
  event.preventDefault()
  const valorGanho = document.querySelector("#valorGanho")
  event.preventDefault()
  const tituloGanho = document.querySelector("#tituloGanho")
  event.preventDefault()
  const descricaoGanho = document.querySelector("#descricaoGanho")
  let transacao = {
    tipo: "ganho",
    valor: valorGanho.value,
    descrição: descricaoGanho.value,
    titulo: tituloGanho.value
  }
  extrato.push(transacao)
  salvarLocalStorage(extrato)
  valorGanho.value = ''
  tituloGanho.value = ''
  descricaoGanho.value = ''
})

novoGasto.addEventListener("submit", function(event) {
  event.preventDefault()
  const valorGasto = document.querySelector("#valorGasto")
  event.preventDefault()
  const tituloGasto = document.querySelector("#tituloGasto")
  event.preventDefault()
  const descricaoGasto = document.querySelector("#descricaoGasto")
  let transacao = {
    tipo: "gasto",
    valor: valorGasto.value,
    descrição: descricaoGasto.value,
    titulo: tituloGasto.value
  }
  extrato.push(transacao)
  salvarLocalStorage(extrato)
  valorGasto.value = ''
  tituloGasto.value = ''
  descricaoGasto.value = ''
})