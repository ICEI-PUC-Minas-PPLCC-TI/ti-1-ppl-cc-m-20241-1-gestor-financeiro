document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('cadastro-form');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const nome = document.getElementById('nome').value;
        const idade = document.getElementById('idade').value;
        const genero = document.getElementById('genero').value;
        const bio = document.getElementById('bio').value;
        const foto = document.getElementById('foto').value;
        const email = document.getElementById('email').value;
        const senha = document.getElementById('senha').value;

        const profile = {
            nome,
            idade,
            genero,
            bio,
            foto,
            email,
            senha
        };

        localStorage.setItem('profile', JSON.stringify(profile));

        window.location.href = 'tela.html';
        
        
    });
});
