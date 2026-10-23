/* ==========================================================================
   SCRIPT PRINCIPAL - PORTFÓLIO LAIS BOTELHO
   Focus: Manipulação DOM, Dark/Light Mode, Animações e Responsividade
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* ----------------------------------------------------------------------
       1. CONTROLE DO TEMA (DARK MODE / LIGHT MODE)
       ---------------------------------------------------------------------- */
    const botaoTema = document.getElementById('botao-tema');
    const iconeTema = document.getElementById('icone-tema');
    
    // Verifica a preferência salva no LocalStorage ou do sistema
    const temaSalvo = localStorage.getItem('tema');
    if (temaSalvo) {
        document.documentElement.setAttribute('data-tema', temaSalvo);
        atualizarIconeTema(temaSalvo === 'dark');
    }

    function alternarTema() {
        const temaAtual = document.documentElement.getAttribute('data-tema');
        const novoTema = temaAtual === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-tema', novoTema);
        localStorage.setItem('tema', novoTema);
        
        atualizarIconeTema(novoTema === 'dark');
    }

    function atualizarIconeTema(isDark) {
        if (isDark) {
            iconeTema.classList.remove('bi-moon-stars-fill');
            iconeTema.classList.add('bi-sun-fill');
        } else {
            iconeTema.classList.remove('bi-sun-fill');
            iconeTema.classList.add('bi-moon-stars-fill');
        }
    }

    botaoTema.addEventListener('click', alternarTema);


    /* ----------------------------------------------------------------------
       2. MENU HAMBÚRGUER (MOBILE)
       ---------------------------------------------------------------------- */
    const botaoHamburguer = document.getElementById('botao-hamburguer');
    const menuNavegacao = document.getElementById('menu-navegacao');
    const linksMenu = document.querySelectorAll('.link-menu');

    function alternarMenuMobile() {
        menuNavegacao.classList.toggle('ativo');
        const estaAberto = menuNavegacao.classList.contains('ativo');
        botaoHamburguer.innerHTML = estaAberto ? '<i class="bi bi-x-lg"></i>' : '<i class="bi bi-list"></i>';
    }

    botaoHamburguer.addEventListener('click', alternarMenuMobile);

    // Fecha o menu mobile ao clicar em qualquer link
    linksMenu.forEach(link => {
        link.addEventListener('click', () => {
            if (menuNavegacao.classList.contains('ativo')) {
                alternarMenuMobile();
            }
        });
    });


    /* ----------------------------------------------------------------------
       3. EFEITO MÁQUINA DE ESCREVER (TYPING EFFECT)
       ---------------------------------------------------------------------- */
    const elementoTexto = document.getElementById('texto-maquina-escrever');
    const textoParaEscrever = 'Estudante de Desenvolvimento Full Stack';
    let indiceCaractere = 0;

    function efeitoMaquinaEscrever() {
        if (indiceCaractere < textoParaEscrever.length) {
            elementoTexto.textContent += textoParaEscrever.charAt(indiceCaractere);
            indiceCaractere++;
            setTimeout(efeitoMaquinaEscrever, 80);
        }
    }

    // Inicia a animação de escrita
    efeitoMaquinaEscrever();


    /* ----------------------------------------------------------------------
       4. ANIMAÇÃO AO ROLAR A PÁGINA (SCROLL REVEAL)
       ---------------------------------------------------------------------- */
    const elementosParaAnimar = document.querySelectorAll('.animar-scroll');

    function verificarScroll() {
        const alturaGatilho = window.innerHeight * 0.85;

        elementosParaAnimar.forEach(elemento => {
            const topoElemento = elemento.getBoundingClientRect().top;

            if (topoElemento < alturaGatilho) {
                elemento.classList.add('visivel');
            }
        });
    }

    window.addEventListener('scroll', verificarScroll);
    verificarScroll(); // Executa uma vez no carregamento inicial


    /* ----------------------------------------------------------------------
       5. BOTÃO VOLTAR AO TOPO
       ---------------------------------------------------------------------- */
    const botaoTopo = document.getElementById('botao-topo');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            botaoTopo.classList.add('visivel');
        } else {
            botaoTopo.classList.remove('visivel');
        }
    });

    botaoTopo.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });


    /* ----------------------------------------------------------------------
       6. ANO ATUAL DINÂMICO NO RODAPÉ
       ---------------------------------------------------------------------- */
    const elementoAno = document.getElementById('ano-atual');
    if (elementoAno) {
        elementoAno.textContent = new Date().getFullYear();
    }

});
