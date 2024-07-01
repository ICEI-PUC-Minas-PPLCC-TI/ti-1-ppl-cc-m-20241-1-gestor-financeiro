document.addEventListener('DOMContentLoaded', (event) => {
    // Carregar informações salvas
    carregarInformacoes();
});

function carregarInformacoes() {
    const senhaSalva = localStorage.getItem('senha');
    const emailSalvo = localStorage.getItem('email');

    // Verificar se há informações salvas
    if (senhaSalva !== null) {
        document.getElementById('senha-atual').textContent = senhaSalva;
    } else {
        document.getElementById('senha-atual').textContent = 'Nenhuma senha salva';
    }

    if (emailSalvo !== null) {
        document.getElementById('email-atual').textContent = emailSalvo;
    } else {
        document.getElementById('email-atual').textContent = 'Nenhum email salvo';
    }
}

// Eventos para alteração de senha e e-mail (opcional)

document.getElementById('altsenha').addEventListener('click', () => {
    const novaSenha = prompt("Digite a nova senha:");
    if (novaSenha) {
        localStorage.setItem('senha', novaSenha);
        document.getElementById('senha-atual').textContent = novaSenha;
    }
});

document.getElementById('altemail').addEventListener('click', () => {
    const novoEmail = prompt("Digite o novo email:");
    if (novoEmail) {
        localStorage.setItem('email', novoEmail);
        document.getElementById('email-atual').textContent = novoEmail;
    }
});

