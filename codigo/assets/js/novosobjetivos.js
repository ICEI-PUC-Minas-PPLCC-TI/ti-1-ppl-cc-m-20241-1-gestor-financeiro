$(function() {
    $('.custom4').maskMoney();
})

const novoObjetivo = document.querySelector(".novoObjetivo")



novoObjetivo.addEventListener("submit", async function(event) {
  event.preventDefault()
  const valorObjetivo = document.querySelector("#valorObjetivo")
  event.preventDefault()
  const tituloObjetivo = document.querySelector("#tituloObjetivo")
  event.preventDefault()
  const descricaoObjetivo = document.querySelector("#descricaoObjetivo")
  await fetch("https://1a770c80-41ff-4f19-8cb5-699967f55bcb-00-1395yp0me7mv2.kirk.replit.dev/objetivos", {
    method:"POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        titulo: tituloObjetivo.value,
        valor: valorObjetivo.value,
        descricao: descricaoObjetivo.value,
    })
  })
  
  valorObjetivo.value = ''
  tituloObjetivo.value = ''
  descricaoObjetivo.value = ''
})