$(function() {
    $('.custom4').maskMoney();
})

const novoGanho = document.querySelector(".novoGanho")
const novoGasto = document.querySelector(".novoGasto")



novoGanho.addEventListener("submit", async function(event) {
  event.preventDefault()
  const valorGanho = document.querySelector("#valorGanho")
  event.preventDefault()
  const tituloGanho = document.querySelector("#tituloGanho")
  event.preventDefault()
  const descricaoGanho = document.querySelector("#descricaoGanho")
  await fetch("https://1a770c80-41ff-4f19-8cb5-699967f55bcb-00-1395yp0me7mv2.kirk.replit.dev/extrato", {
    method:"POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      tipo: "Ganho",
      valor: valorGanho.value,
      descricao: descricaoGanho.value,
      titulo: tituloGanho.value
    })
  })
  
  valorGanho.value = ''
  tituloGanho.value = ''
  descricaoGanho.value = ''
})

novoGasto.addEventListener("submit", async function(event) {
  event.preventDefault()
  const valorGasto = document.querySelector("#valorGasto")
  event.preventDefault()
  const tituloGasto = document.querySelector("#tituloGasto")
  event.preventDefault()
  const descricaoGasto = document.querySelector("#descricaoGasto")
  await fetch("https://1a770c80-41ff-4f19-8cb5-699967f55bcb-00-1395yp0me7mv2.kirk.replit.dev/extrato", {
    method:"POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
    tipo: "Gasto",
    valor: valorGasto.value,
    descricao: descricaoGasto.value,
    titulo: tituloGasto.value
    })
  })
  valorGasto.value = ''
  tituloGasto.value = ''
  descricaoGasto.value = ''
})