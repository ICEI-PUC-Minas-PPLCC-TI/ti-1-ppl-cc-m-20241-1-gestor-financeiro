function mascara(valor) {
    var valorAtual = valor.value.replace(/[^\d]/g, ""); // Remove todos os não dígitos

    if (valorAtual.length === 1 && valorAtual === '0') {
        // Se o valor digitado for apenas '0', limpa o campo
        valor.value = '0000';
        return;
    }

    // Remove zeros à esquerda
    valorAtual = valorAtual.replace(/^0+/, '');

    if (valorAtual === '') {
        valorAtual = '0000'; // Se o campo estiver vazio, define '0' como valor padrão
    }

    var valorFormatado = 'R$' + valorAtual.substring(0, valorAtual.length - 2) + ',' + valorAtual.substring(valorAtual.length - 2);
    valorFormatado = valorFormatado.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    valor.value = valorFormatado;
}

function mascara2(valor) {
    var valorAtual = valor.value.replace(/[^\d]/g, ""); // Remove todos os não dígitos

    if (valorAtual.length === 1 && valorAtual === '0') {
        // Se o valor digitado for apenas '0', limpa o campo, ja que o primeiro valor deve necessariamente ser um numero maior que 0
        valor.value = '0000';
        return;
    }

    // Remove zeros à esquerda
    valorAtual = valorAtual.replace(/^0+/, '');

    if (valorAtual === '') {
        valorAtual = '0000'; // Se o campo estiver vazio, define '0000' como valor padrão
    }

    var valorFormatado = 'R$' + valorAtual.substring(0, valorAtual.length - 2) + ',' + valorAtual.substring(valorAtual.length - 2);
    valorFormatado = valorFormatado.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1."); // Adiciona pontos a cada três dígitos
    valor.value = valorFormatado;
}


function moveCursorToEnd(el) {
    if (typeof el.selectionStart == "number") {
        el.selectionStart = el.selectionEnd = el.value.length;
    } else if (typeof el.createTextRange != "undefined") {
        el.focus();
        var range = el.createTextRange();
        range.collapse(false);
        range.select();
    }
}

document.addEventListener("DOMContentLoaded", function() {
    var inputs = document.querySelectorAll('input[type="text"]');
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener("click", function() {
            moveCursorToEnd(this);
        });
    }
});
