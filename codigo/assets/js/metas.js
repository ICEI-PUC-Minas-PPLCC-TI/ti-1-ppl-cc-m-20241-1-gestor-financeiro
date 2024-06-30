document.addEventListener("DOMContentLoaded", (event) => {
    const form = document.getElementById("form");
    form.addEventListener("submit", function (event) {
      event.preventDefault(); // Evita o recarregamento da página
  
      // Obtém os valores dos campos do formulário
      const meta = document.getElementById("meta").value;
      const dataFinal = document.getElementById("dataF").value;
      const valorDesejado = document.getElementById("valorD").value;
      const valorInicial = document.getElementById("valorI").value;
  
      // Pega data atual
      const data = new Date();
      const diaAtual = data.getDate();
      let mesAtual = data.getMonth() + 1; // o +1 é pq janeiro é 0
      const anoAtual = data.getFullYear();
  
      // Formata o mês e o dia com dois dígitos
      mesAtual = mesAtual.toString().padStart(2, "0");
      const diaAtualFormatado = diaAtual.toString().padStart(2, "0");
  
      // Cria a data atual no formato YYYYMMDD
      const diaHoje = `${anoAtual}${mesAtual}${diaAtualFormatado}`;
      console.log(diaHoje);
  
      // Verifica se todos os campos estão preenchidos
      if (!meta || !dataFinal || !valorDesejado || !valorInicial) {
        alert("Por favor, preencha todos os campos.");
        return;
      }
  
      // Remove os hifens da data final
      const diaFinal = dataFinal.split("-").join("");
      console.log(diaFinal);
      // Cria um novo elemento para a meta
      const metaDiv = document.createElement("div");
      const metaDivC = document.createElement("div");
      const metaDivP = document.createElement("div");
  
      const metaAcont = document.querySelectorAll(".metaA").length;
      const metaCcont = document.querySelectorAll(".metaC").length;
      const metaPcont = document.querySelectorAll(".metaP").length;
  
      metaDiv.classList.add("metaA");
      metaDiv.innerHTML = `
        <h5>${meta}</h5>
        <p>Data Final: ${dataFinal}</p>
        <p>Valor Desejado: R$${valorDesejado}</p>
        <p>Valor Inicial: R$${valorInicial}</p>
      `;
  
      metaDivC.classList.add("metaC");
      metaDivC.innerHTML = `
        <h5>${meta}</h5>
        <p>Data Final: ${dataFinal}</p>
        <p>Valor Desejado: R$${valorDesejado}</p>
        <p>Valor Inicial: R$${valorInicial}</p>
      `;
  
      metaDivP.classList.add("metaP");
      metaDivP.innerHTML = `
        <h5>${meta}</h5>
        <p>Data Final: ${dataFinal}</p>
        <p>Valor Desejado: R$${valorDesejado}</p>
        <p>Valor Inicial: R$${valorInicial}</p>
      `;
      if (metaPcont <= 3 && diaFinal < diaHoje) {
        alert("Meta vencida.");
        const metasPerdidas = document.querySelector(".col-md-3 .metaP");
        metasPerdidas.parentNode.insertBefore(metaDivP, metasPerdidas);
      } else if (metaCcont <= 3 && valorInicial >= valorDesejado) {
        alert("Você já atingiu a meta.");
        const metasConcluidas = document.querySelector(".col-md-3 .metaC");
        metasConcluidas.parentNode.insertBefore(metaDivC, metasConcluidas);
      } else if (metaAcont <= 3 && valorInicial < valorDesejado) {
        alert("Meta adicionada com sucesso.");
        const metasAtuais = document.querySelector(".col-md-3 .metaA");
        metasAtuais.parentNode.insertBefore(metaDiv, metasAtuais);
      } else {
        alert("Você já atingiu o limite de metas");
      }
    });
  });
  