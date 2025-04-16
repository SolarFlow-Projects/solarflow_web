document.addEventListener('DOMContentLoaded', function () {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const featureCards = document.querySelectorAll('.feature-card');
    let currentCategory = 'all'; // Categoria inicial
    let swipers = {}; // Objeto para armazenar as instâncias do Swiper
    const categories = ['all', 'automation', 'analytics', 'monitoring'];

    // Verificar se estamos em modo mobile
    const isMobile = window.innerWidth < 1024;

    // Inicializar a visualização desktop
    if (!isMobile) {
        showDesktopCards(currentCategory);
    } else {
        // Inicializar os Swipers para todas as categorias
        initAllSwipers();

        // Mostrar o Swiper da categoria atual
        showSwiper(currentCategory);
    }

    // Adicionar eventos de clique aos botões de filtro
    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Atualizar estado dos botões
            filterButtons.forEach(btn => {
                btn.classList.remove('active', 'dark-shadow-button');
                btn.classList.add('bg-white', 'text-secondary');
                btn.classList.remove('bg-secondary', 'text-white');
            });

            this.classList.add('active', 'dark-shadow-button');
            this.classList.remove('bg-white', 'text-secondary');
            this.classList.add('bg-secondary', 'text-white');

            // Obter categoria selecionada
            currentCategory = this.getAttribute('data-filter');

            if (isMobile) {
                // Mostrar o Swiper da categoria selecionada
                showSwiper(currentCategory);
            } else {
                // Mostrar cards da categoria selecionada em modo desktop
                showDesktopCards(currentCategory);
            }
        });
    });

    // Detectar redimensionamento da janela para alternar entre modos
    window.addEventListener('resize', function () {
        const newIsMobile = window.innerWidth < 1024;

        // Se houve mudança no modo de visualização
        if (newIsMobile !== isMobile) {
            window.location.reload(); // Recarregar para reinicializar adequadamente
        }
    });

    // Função para mostrar cards no modo desktop
    function showDesktopCards(category) {
        // Ocultar todos os cards primeiro
        featureCards.forEach(card => {
            card.classList.add('hidden');
        });

        // Mostrar cards da categoria selecionada
        const categoryCards = document.querySelectorAll(`.feature-card[data-category="${category}"]`);
        categoryCards.forEach(card => {
            card.classList.remove('hidden');
        });
    }

    // Função para inicializar todos os Swipers
    function initAllSwipers() {
        // Para cada categoria, inicializar um Swiper
        categories.forEach(category => {
            // Selecionar o container para esta categoria
            const container = document.getElementById(`swiper-${category}`);

            if (!container) return;

            // Limpar quaisquer slides anteriores
            const wrapper = container.querySelector('.swiper-wrapper');
            wrapper.innerHTML = '';

            // Adicionar slides da categoria atual
            const categoryCards = Array.from(document.querySelectorAll(`.feature-card[data-category="${category}"]`));

            categoryCards.forEach(card => {
                // Clonar o card para o Swiper
                const slide = document.createElement('div');
                slide.className = 'swiper-slide';
                const cardClone = card.cloneNode(true);

                // Garantir que o clone seja visível
                cardClone.classList.remove('hidden');

                slide.appendChild(cardClone);
                wrapper.appendChild(slide);
            });

            // Inicializar o Swiper para esta categoria
            swipers[category] = new Swiper(`#swiper-${category}`, {
                slidesPerView: 1,
                spaceBetween: 30,
                autoHeight: true,
                loop: true, // Ativar loop para melhor experiência
                effect: 'slide', // Usar efeito de deslizamento
                speed: 600, // Velocidade da animação
                grabCursor: true, // Cursor de "agarrar" quando passar sobre o carrossel
                pagination: {
                    el: `#swiper-${category} .swiper-pagination`,
                    clickable: true,
                    dynamicBullets: true
                },
                // Adicionar navegação por botões
                navigation: {
                    nextEl: `#swiper-${category} .swiper-button-next`,
                    prevEl: `#swiper-${category} .swiper-button-prev`,
                },
                // Habilitar efeitos de toque
                touchEventsTarget: 'container',
                touchRatio: 1,
                touchAngle: 45,
                simulateTouch: true,
                // Adicionar efeito de deslizamento natural
                resistance: true,
                resistanceRatio: 0.85,
                // Transição suave
                cubeEffect: {
                    slideShadows: true,
                }
            });
        });
    }

    // Função para mostrar o Swiper da categoria selecionada
    function showSwiper(category) {
        // Ocultar todos os Swipers primeiro
        categories.forEach(cat => {
            const swiperContainer = document.getElementById(`swiper-${cat}`);
            if (swiperContainer) {
                swiperContainer.classList.add('hidden');
            }
        });

        // Mostrar o Swiper da categoria selecionada
        const activeSwiper = document.getElementById(`swiper-${category}`);
        if (activeSwiper) {
            activeSwiper.classList.remove('hidden');

            // Atualizar o Swiper para garantir que ele renda corretamente
            if (swipers[category]) {
                swipers[category].update();
            }
        }
    }
});