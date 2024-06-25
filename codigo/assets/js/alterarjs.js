document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('edit-profile-form');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const nome = document.getElementById('nome').value;
        const idade = document.getElementById('idade').value;
        const foto = document.getElementById('foto').value;
        const bio = document.getElementById('bio').value;

        const profile = JSON.parse(localStorage.getItem('profile')) || {};

        if (nome) profile.nome = nome;
        if (idade) profile.idade = idade;
        if (foto) profile.foto = foto;
        if (bio) profile.bio = bio;

        localStorage.setItem('profile', JSON.stringify(profile));

        window.location.href = 'tela.html';
        
        
    });

    const profile = JSON.parse(localStorage.getItem('profile'));

    if (profile) {
        if (profile.email) document.getElementById('nome').value = profile.nome;
        if (profile.senha) document.getElementById('idade').value = profile.idade;
        if (profile.foto) document.getElementById('foto').value = profile.foto;
        if (profile.bio) document.getElementById('bio').value = profile.bio;
    }
});
