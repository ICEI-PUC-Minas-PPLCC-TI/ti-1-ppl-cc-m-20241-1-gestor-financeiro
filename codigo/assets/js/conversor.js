let myChart;

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

    atualizarExtratoEChart(data, simbolo, moedaDestino, 'todos');
}

function atualizarExtratoEChart(data, simbolo, moedaDestino, categoria) {
    var extratoHTML = '';
    var labels = [];
    var graphData = [];
    var totalGastos = 0;
    var totalGanhos = 0;
    var taxaRealParaDolar = 0.19;
    var taxaRealParaEuro = 0.15;

    data.forEach(item => {
        var valorOrigem = parseFloat(item.valor);
        var resultado = valorOrigem;

        if (moedaDestino === 'dolar') {
            resultado = valorOrigem * taxaRealParaDolar;
        } else if (moedaDestino === 'euro') {
            resultado = valorOrigem * taxaRealParaEuro;
        }

        if (!isNaN(resultado)) {
            var tipo = item.tipo === "Gasto" ? "gasto" : "ganho";
            if (categoria === 'todos' || item.tipo.toLowerCase() === categoria) {
                extratoHTML += `<li class="${tipo}">${simbolo} ${resultado.toFixed(2)} (${item.descricao})</li>`;
                labels.push(item.descricao);
                graphData.push(parseFloat(resultado.toFixed(2)));
            }

            if (item.tipo.toLowerCase() === 'gasto') {
                totalGastos += resultado;
            } else {
                totalGanhos += resultado;
            }
        }
    });

    $('.extrato').html(extratoHTML);

    if (categoria === 'todos') {
        labels = ['Gastos', 'Ganhos'];
        graphData = [totalGastos, totalGanhos];
    }

    atualizarGrafico(labels, graphData, simbolo);
}

function atualizarGrafico(labels, graphData, simbolo) {
    const ctx = document.getElementById('grafico').getContext('2d');
    if (myChart) {
        myChart.destroy();
    }
    myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: graphData,
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(153, 102, 255)',
                    'rgb(255, 159, 64)',
                ],
                hoverOffset: 4
            }]
        },
        options: {
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let total = context.dataset.data.reduce((a, b) => a + b, 0);
                            let value = context.raw;
                            let percentage = ((value / total) * 100).toFixed(2) + '%';
                            return `${context.label}: ${simbolo} ${value.toFixed(2)} (${percentage})`;
                        }
                    }
                }
            }
        }
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
        var moedaDestino = $('#moedaDestino').val();
        var simbolo;

        if (moedaDestino == 'real') {
            simbolo = 'R$';
        } else if (moedaDestino == 'dolar') {
            simbolo = '$';
        } else if (moedaDestino == 'euro') {
            simbolo = '€';
        }

        fetch('https://1a770c80-41ff-4f19-8cb5-699967f55bcb-00-1395yp0me7mv2.kirk.replit.dev/extrato')
            .then(response => response.json())
            .then(data => atualizarExtratoEChart(data, simbolo, moedaDestino, 'todos'));
    });

    $('.btn-gastos').on('click', function() {
        var moedaDestino = $('#moedaDestino').val();
        var simbolo;

        if (moedaDestino == 'real') {
            simbolo = 'R$';
        } else if (moedaDestino == 'dolar') {
            simbolo = '$';
        } else if (moedaDestino == 'euro') {
            simbolo = '€';
        }

        fetch('https://1a770c80-41ff-4f19-8cb5-699967f55bcb-00-1395yp0me7mv2.kirk.replit.dev/extrato')
            .then(response => response.json())
            .then(data => atualizarExtratoEChart(data, simbolo, moedaDestino, 'gasto'));
    });

    $('.btn-ganhos').on('click', function() {
        var moedaDestino = $('#moedaDestino').val();
        var simbolo;

        if (moedaDestino == 'real') {
            simbolo = 'R$';
        } else if (moedaDestino == 'dolar') {
            simbolo = '$';
        } else if (moedaDestino == 'euro') {
            simbolo = '€';
        }

        fetch('https://1a770c80-41ff-4f19-8cb5-699967f55bcb-00-1395yp0me7mv2.kirk.replit.dev/extrato')
            .then(response => response.json())
            .then(data => atualizarExtratoEChart(data, simbolo, moedaDestino, 'ganho'));
    });
});
    