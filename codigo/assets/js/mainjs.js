document.addEventListener('DOMContentLoaded', () => {
    const nomeElem = document.getElementById('nome');
    const idadeElem = document.getElementById('idade');
    const generoElem = document.getElementById('genero');
    const bioElem = document.getElementById('bio');
    const fotoElem = document.getElementById('ft-perfil');

    const profile = JSON.parse(localStorage.getItem('profile'));

    if (profile) {
        nomeElem.textContent = profile.nome || 'Nome do Usuário';
        idadeElem.textContent = profile.idade || 'Idade do Usuário';
        generoElem.textContent = profile.genero || 'Genero do usuário';
        bioElem.textContent = profile.bio || 'Biografia do usuário';
        fotoElem.src = profile.foto || 'profile.jpeg';
    }
});
