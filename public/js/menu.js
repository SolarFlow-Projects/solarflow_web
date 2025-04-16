document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const menu = document.getElementById('menu');
    const hamburgerLines = document.querySelectorAll('.hamburger-line');
    
    // Função para alternar o menu
    function toggleMenu() {
        // Alterna a classe para mostrar/esconder o menu
        menu.classList.toggle('hidden');
        menu.classList.toggle('flex');
        menu.classList.toggle('flex-col');
        
        // Anima as linhas do hambúrguer para formar um X
        if (!menu.classList.contains('hidden')) {
            // Transformar em X
            hamburgerLines[0].classList.add('rotate-45', 'translate-y-[8.5px]');
            hamburgerLines[1].classList.add('opacity-0');
            hamburgerLines[2].classList.add('-rotate-45', '-translate-y-[8.5px]');
        } else {
            // Voltar ao normal
            hamburgerLines[0].classList.remove('rotate-45', 'translate-y-[8.5px]');
            hamburgerLines[1].classList.remove('opacity-0');
            hamburgerLines[2].classList.remove('-rotate-45', '-translate-y-[8.5px]');
        }
    }
    
    // Adiciona evento de clique ao botão hambúrguer
    hamburger.addEventListener('click', toggleMenu);
    
    // Fecha o menu ao clicar em um link (só em mobile)
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth < 768) {
                toggleMenu();
            }
        });
    });
    
    // Ajusta o menu ao redimensionar a janela
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 768) {
            menu.classList.remove('hidden', 'flex', 'flex-col');
            menu.classList.add('flex', 'flex-row');
            
            // Reset das linhas do hambúrguer
            hamburgerLines[0].classList.remove('rotate-45', 'translate-y-[8.5px]');
            hamburgerLines[1].classList.remove('opacity-0');
            hamburgerLines[2].classList.remove('-rotate-45', '-translate-y-[8.5px]');
        } else if (!hamburger.classList.contains('active')) {
            menu.classList.add('hidden');
            menu.classList.remove('flex', 'flex-col');
        }
    });
});