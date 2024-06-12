async function converterMoeda() {
    var moedaDestino = $('#moedaDestino').val();
    var simbolo;

    if (moedaDestino === 'MOEDA DESTINO') {
        $('.gastos').hide();
        $('.lista-gastos h1').hide();
        $('.categorias').hide();
        return;
    }

    if (moedaDestino == 'real') {
        simbolo = 'R$';
    } else if (moedaDestino == 'dolar') {
        simbolo = '$';
    } else if (moedaDestino == 'euro') {
        simbolo = '€';
    }

    $('.gastos').show();
    $('.lista-gastos h1').show();
    $('.categorias').show();

    const response = await fetch('https://1a770c80-41ff-4f19-8cb5-699967f55bcb-00-1395yp0me7mv2.kirk.replit.dev/extrato');
    const data = await response.json();

    var taxaRealParaDolar = 0.19;
    var taxaRealParaEuro = 0.15;

    var extratoHTML = '';
    var labels = [];
    var graphData = [];

    data.forEach(item => {
        var valorOrigem = parseFloat(item.valor);
        var resultado = valorOrigem;

        if (item.moeda === 'real' && moedaDestino === 'dolar') {
            resultado = valorOrigem * taxaRealParaDolar;
        } else if (item.moeda === 'real' && moedaDestino === 'euro') {
            resultado = valorOrigem * taxaRealParaEuro;
        }

        if (!isNaN(resultado)) {
            var tipo = item.tipo === "Gasto" ? "gasto" : "ganho";
            extratoHTML += `<li class="${tipo}">${simbolo} ${resultado.toFixed(2)} (${item.descricao})</li>`;
            labels.push(item.descricao);
            graphData.push(parseFloat(resultado.toFixed(2))); // Corrige para ser um número em vez de string
        }
    });

    $('.extrato').html(extratoHTML);

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

$(document).ready(function() {
    // Inicialmente esconde os elementos de gastos e ganhos
    $('.gastos').hide();
    $('.lista-gastos h1').hide();
    $('.categorias').hide();

    $('#moedaDestino').on('change', function() {
        converterMoeda();
    });

    $('.btn-todos').on('click', function() {
        filtrarCategoria('todos');
    });
});

function filtrarCategoria(categoria) {
    $('li').show();
    if (categoria !== 'todos') {
        $('li').not('.' + categoria).hide();
    }
}
