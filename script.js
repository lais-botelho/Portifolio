/* ==========================================================================
   PORTFÓLIO LAIS BOTELHO - LÓGICA E INTERATIVIDADE (JAVASCRIPT VANILLA)
   ========================================================================== */

// Espera a carga completa do DOM antes de rodar os scripts
document.addEventListener("DOMContentLoaded", () => {
    
    /* 1. SELEÇÃO DE ELEMENTOS DO DOM */
    const elementoCorpo = document.body;
    const botaoAlternarTema = document.getElementById("botao-tema");
    const botaoMenuHamburguer = document.getElementById("botao-menu-hamburguer");
    const menuNavegacao = document.getElementById("navegacao-menu");
    const linksNavegacao = document.querySelectorAll(".link-navegacao");
    const botaoVoltarTopo = document.getElementById("botao-topo");
    const elementoAnoAtual = document.getElementById("ano-atual");
    const elementoTextoMaquina = document.getElementById("texto-maquina-escrever");

    /* 2. FUNCIONALIDADE: ALTERNÂNCIA DE TEMA (DARK / LIGHT MODE) */
    function alternarTema() {
        if (elementoCorpo.classList.contains("tema-escuro")) {
            elementoCorpo.classList.remove("tema-escuro");
            elementoCorpo.classList.add("tema-claro");
            localStorage.setItem("pref-tema", "tema-claro");
        } else {
            elementoCorpo.classList.remove("tema-claro");
            elementoCorpo.classList.add("tema-escuro");
            localStorage.setItem("pref-tema", "tema-escuro");
        }
    }

    // Carrega preferência anterior do usuário
    const temaSalvo = localStorage.getItem("pref-tema");
    if (temaSalvo) {
        elementoCorpo.className = temaSalvo;
    }

    // Evento de clique para o botão de tema
    botaoAlternarTema.addEventListener("click", alternarTema);

    /* 3. FUNCIONALIDADE: MENU MOBILE (HAMBÚRGUER) */
    function alternarMenuMobile() {
        menuNavegacao.classList.toggle("ativo");
        const iconeMenu = botaoMenuHamburguer.querySelector("i");
        iconeMenu.classList.toggle("bi-list");
        iconeMenu.classList.toggle("bi-x-lg");
    }

    botaoMenuHamburguer.addEventListener("click", alternarMenuMobile);

    // Fecha o menu ao clicar em qualquer link de navegação
    linksNavegacao.forEach((link) => {
        link.addEventListener("click", () => {
            if (menuNavegacao.classList.contains("ativo")) {
                alternarMenuMobile();
            }
        });
    });

    /* 4. FUNCIONALIDADE: EFEITO MÁQUINA DE ESCREVER */
    const frasesMaquina = [
        "Estudante de Desenvolvimento Full Stack",
        "Especializando em Front-end Development",
        "Entusiasta de UI/UX e Web Design"
    ];

    let indiceFraseAtual = 0;
    let indiceCaractere = 0;
    let estaDeletando = false;
    const velocidadeDigitacao = 100;
    const velocidadeDeletar = 50;
    const tempoPausa = 2000;

    function animarMaquinaEscrever() {
        const textoCompleto = frasesMaquina[indiceFraseAtual];

        if (estaDeletando) {
            elementoTextoMaquina.textContent = textoCompleto.substring(0, indiceCaractere - 1);
            indiceCaractere--;
        } else {
            elementoTextoMaquina.textContent = textoCompleto.substring(0, indiceCaractere + 1);
            indiceCaractere++;
        }

        let velocidadeAtual = estaDeletando ? velocidadeDeletar : velocidadeDigitacao;

        if (!estaDeletando && indiceCaractere === textoCompleto.length) {
            velocidadeAtual = tempoPausa;
            estaDeletando = true;
        } else if (estaDeletando && indiceCaractere === 0) {
            estaDeletando = false;
            indiceFraseAtual = (indiceFraseAtual + 1) % frasesMaquina.length;
            velocidadeAtual = 500;
        }

        setTimeout(animarMaquinaEscrever, velocidadeAtual);
    }

    // Inicia a animação da máquina de escrever
    animarMaquinaEscrever();

    /* 5. FUNCIONALIDADE: BOTÃO VOLTAR AO TOPO */
    function gerenciarBotaoTopo() {
        if (window.scrollY > 300) {
            botaoVoltarTopo.classList.add("visivel");
        } else {
            botaoVoltarTopo.classList.remove("visivel");
        }
    }

    window.addEventListener("scroll", gerenciarBotaoTopo);

    botaoVoltarTopo.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    /* 6. FUNCIONALIDADE: ANIMAÇÃO DE REVELAÇÃO (FADE-IN-UP AO SCROLL) */
    const elementosRevelacao = document.querySelectorAll(".revelacao-suave");

    function verificarScrollRevelacao() {
        const alturaGatilho = window.innerHeight * 0.85;

        elementosRevelacao.forEach((elemento) => {
            const topoElemento = elemento.getBoundingClientRect().top;
            if (topoElemento < alturaGatilho) {
                elemento.classList.add("ativo");
            }
        });
    }

    window.addEventListener("scroll", verificarScrollRevelacao);
    // Executa uma vez no carregamento para exibir os elementos visíveis
    verificarScrollRevelacao();

    /* 7. FUNCIONALIDADE: ANO DINÂMICO NO RODAPÉ */
    if (elementoAnoAtual) {
        elementoAnoAtual.textContent = new Date().getFullYear();
    }
});
