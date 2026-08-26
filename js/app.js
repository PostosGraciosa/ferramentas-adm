/* ============================================
   FERRAMENTAS ADM | POSTOS GRACIOSA
   js/app.js
   Sistema administrativo interno
============================================ */

(function () {

    'use strict';


    /* ============================================
       TEMPLATES — ASSISTENTE DE RESPOSTAS LOCAL
    ============================================ */

    var templates = {

        'Confirmação de pagamento': function (info) {

            return (
                'Olá! Confirmamos o recebimento do seu pagamento.' +
                (info ? ' ' + info : '') +
                ' Qualquer dúvida, estamos à disposição.'
            );

        },


        'Solicitação de documento': function (info) {

            return (
                'Olá! Para darmos continuidade à sua solicitação, ' +
                'pedimos o envio do seguinte documento: ' +
                (info || 'documento pendente') +
                '. Assim que recebermos, daremos sequência ao atendimento.'
            );

        },


        'Divergência de informação': function (info) {

            return (
                'Olá! Identificamos uma divergência nas informações ' +
                (info ? 'referente a ' + info : 'informadas') +
                '. Pedimos, por gentileza, que verifique os dados ' +
                'e nos retorne com as informações corretas.'
            );

        },


        'Aguardando retorno': function (info) {

            return (
                'Olá! Estamos aguardando o seu retorno referente a ' +
                (info || 'sua solicitação') +
                '. Assim que recebermos as informações, ' +
                'daremos continuidade ao atendimento.'
            );

        },


        'Encaminhamento ao setor responsável': function (info) {

            return (
                'Olá! Sua solicitação foi encaminhada ao setor responsável' +
                (info ? ' (' + info + ')' : '') +
                '. Em breve retornaremos com um posicionamento.'
            );

        },


        'Agradecimento': function (info) {

            return (
                'Olá! Agradecemos o seu contato.' +
                (info ? ' ' + info : '') +
                ' Permanecemos à disposição para qualquer dúvida.'
            );

        },


        'Resposta personalizada': function (info) {

            return (
                'Olá! ' +
                (
                    info ||
                    'Informe os detalhes da resposta que deseja elaborar.'
                )
            );

        }

    };


    /* ============================================
       ELEMENTOS DO SISTEMA
    ============================================ */

    var tipoResposta =
        document.getElementById('tipoResposta');

    var infoExtra =
        document.getElementById('infoExtra');

    var resultado =
        document.getElementById('resultado');

    var btnGerar =
        document.getElementById('btnGerar');

    var btnLimpar =
        document.getElementById('btnLimpar');

    var btnCopiar =
        document.getElementById('btnCopiar');

    var searchInput =
        document.getElementById('searchInput');

    var emptyState =
        document.getElementById('emptyState');

    var dropdownCard =
        document.querySelector('.dropdown');

    var portaisToggle =
        document.getElementById('portaisToggle');

    var portaisMenu =
        document.getElementById('portaisMenu');


    /* ============================================
       CHATGPT
    ============================================ */

    var chatgptPrompt =
        document.getElementById('chatgptPrompt');

    var btnCopiarPrompt =
        document.getElementById('btnCopiarPrompt');

    var btnAbrirChatGPT =
        document.getElementById('btnAbrirChatGPT');

    var promptSuggestions =
        document.querySelectorAll('.prompt-suggestion');


    var PLACEHOLDER =
        'A resposta gerada aparecerá aqui.';


    /* ============================================
       FUNÇÃO — MOSTRAR AVISO
    ============================================ */

    function mostrarAviso(elemento, mensagem) {

        if (!elemento) return;

        var original =
            elemento.innerHTML;

        elemento.innerHTML =
            mensagem;

        setTimeout(function () {

            elemento.innerHTML =
                original;

        }, 1800);

    }


    /* ============================================
       ASSISTENTE DE RESPOSTAS
    ============================================ */

    if (btnGerar) {

        btnGerar.addEventListener(
            'click',
            function () {

                if (!tipoResposta || !resultado) {
                    return;
                }

                var tipo =
                    tipoResposta.value;

                var info =
                    infoExtra ?
                    infoExtra.value.trim() :
                    '';

                if (templates[tipo]) {

                    resultado.textContent =
                        templates[tipo](info);

                    resultado.classList.add(
                        'result-filled'
                    );

                }

            }
        );

    }


    /* ============================================
       LIMPAR ASSISTENTE
    ============================================ */

    if (btnLimpar) {

        btnLimpar.addEventListener(
            'click',
            function () {

                if (infoExtra) {
                    infoExtra.value = '';
                }

                if (resultado) {

                    resultado.textContent =
                        PLACEHOLDER;

                    resultado.classList.remove(
                        'result-filled'
                    );

                }

                if (tipoResposta) {

                    tipoResposta.selectedIndex =
                        0;

                }

            }
        );

    }


    /* ============================================
       COPIAR RESPOSTA
    ============================================ */

    if (btnCopiar) {

        btnCopiar.addEventListener(
            'click',
            function () {

                if (!resultado) return;

                var texto =
                    resultado.textContent.trim();

                if (
                    !texto ||
                    texto === PLACEHOLDER
                ) {

                    return;

                }


                copiarTexto(
                    texto,
                    function () {

                        var textoOriginal =
                            btnCopiar.innerHTML;

                        btnCopiar.innerHTML =
                            '✓ Copiado';

                        setTimeout(
                            function () {

                                btnCopiar.innerHTML =
                                    textoOriginal;

                            },
                            1800
                        );

                    }
                );

            }
        );

    }


    /* ============================================
       FUNÇÃO UNIVERSAL DE CÓPIA
    ============================================ */

    function copiarTexto(texto, sucesso) {

        if (
            navigator.clipboard &&
            window.isSecureContext
        ) {

            navigator.clipboard
                .writeText(texto)
                .then(function () {

                    if (sucesso) {
                        sucesso();
                    }

                })
                .catch(function () {

                    copiarTextoFallback(
                        texto,
                        sucesso
                    );

                });

        } else {

            copiarTextoFallback(
                texto,
                sucesso
            );

        }

    }


    function copiarTextoFallback(
        texto,
        sucesso
    ) {

        var textarea =
            document.createElement(
                'textarea'
            );

        textarea.value =
            texto;

        textarea.style.position =
            'fixed';

        textarea.style.left =
            '-9999px';

        textarea.style.top =
            '0';

        document.body.appendChild(
            textarea
        );

        textarea.focus();

        textarea.select();

        try {

            document.execCommand(
                'copy'
            );

            if (sucesso) {
                sucesso();
            }

        } catch (e) {

            console.error(
                'Não foi possível copiar:',
                e
            );

        }

        document.body.removeChild(
            textarea
        );

    }


    /* ============================================
       DROPDOWN — ADMINISTRADORAS
    ============================================ */

    if (
        dropdownCard &&
        portaisToggle
    ) {

        portaisToggle.addEventListener(
            'click',
            function (event) {

                event.stopPropagation();

                var aberto =
                    dropdownCard.classList.contains(
                        'open'
                    );

                dropdownCard.classList.toggle(
                    'open'
                );

                portaisToggle.setAttribute(
                    'aria-expanded',
                    String(!aberto)
                );

            }
        );

    }


    /* ============================================
       FECHAR DROPDOWN AO CLICAR FORA
    ============================================ */

    document.addEventListener(
        'click',
        function (event) {

            if (
                dropdownCard &&
                !dropdownCard.contains(
                    event.target
                )
            ) {

                dropdownCard.classList.remove(
                    'open'
                );

                if (portaisToggle) {

                    portaisToggle.setAttribute(
                        'aria-expanded',
                        'false'
                    );

                }

            }

        }
    );


    /* ============================================
       NÃO FECHAR AO CLICAR DENTRO DO MENU
    ============================================ */

    if (portaisMenu) {

        portaisMenu.addEventListener(
            'click',
            function (event) {

                event.stopPropagation();

            }
        );

    }


    /* ============================================
       BUSCA DAS FERRAMENTAS
    ============================================ */

    function executarBusca() {

        if (!searchInput) {
            return;
        }

        var termo =
            searchInput.value
                .toLowerCase()
                .trim();

        var cards =
            document.querySelectorAll(
                '.grid .card'
            );

        var encontrados =
            0;


        cards.forEach(
            function (card) {

                var texto =
                    (
                        card.getAttribute(
                            'data-search'
                        ) || ''
                    )
                    .toLowerCase();

                var titulo =
                    card.querySelector('h3');

                if (titulo) {

                    texto +=
                        ' ' +
                        titulo.textContent
                            .toLowerCase();

                }


                if (
                    !termo ||
                    texto.indexOf(
                        termo
                    ) !== -1
                ) {

                    card.classList.remove(
                        'search-hidden'
                    );

                    card.style.display =
                        '';

                    encontrados++;

                } else {

                    card.classList.add(
                        'search-hidden'
                    );

                    card.style.display =
                        'none';

                }

            }
        );


        /* ========================================
           ESTADO SEM RESULTADOS
        ======================================== */

        if (emptyState) {

            if (
                termo &&
                encontrados === 0
            ) {

                emptyState.classList.remove(
                    'hidden'
                );

            } else {

                emptyState.classList.add(
                    'hidden'
                );

            }

        }


        /* ========================================
           FILTRAR SEÇÕES VAZIAS
        ======================================== */

        var secoes =
            document.querySelectorAll(
                '.category'
            );

        secoes.forEach(
            function (secao) {

                var cardsVisiveis =
                    secao.querySelectorAll(
                        '.card:not([style*="display: none"])'
                    );

                if (
                    cardsVisiveis.length === 0 &&
                    termo
                ) {

                    secao.classList.add(
                        'search-empty'
                    );

                } else {

                    secao.classList.remove(
                        'search-empty'
                    );

                }

            }
        );

    }


    if (searchInput) {

        searchInput.addEventListener(
            'input',
            executarBusca
        );

    }


    /* ============================================
       ATALHO "/" PARA PESQUISA
    ============================================ */

    document.addEventListener(
        'keydown',
        function (event) {

            var elemento =
                document.activeElement;

            var digitando =
                elemento &&
                (
                    elemento.tagName ===
                        'INPUT' ||
                    elemento.tagName ===
                        'TEXTAREA' ||
                    elemento.tagName ===
                        'SELECT'
                );


            if (
                event.key === '/' &&
                !digitando &&
                searchInput
            ) {

                event.preventDefault();

                searchInput.focus();

            }


            /* ESC LIMPA A BUSCA */

            if (
                event.key === 'Escape' &&
                searchInput &&
                document.activeElement ===
                    searchInput
            ) {

                searchInput.value = '';

                executarBusca();

                searchInput.blur();

            }

        }
    );


    /* ============================================
       PROMPTS DO CHATGPT
    ============================================ */

    if (promptSuggestions.length) {

        promptSuggestions.forEach(
            function (button) {

                button.addEventListener(
                    'click',
                    function () {

                        if (!chatgptPrompt) {
                            return;
                        }

                        var prompt =
                            button.getAttribute(
                                'data-prompt'
                            );


                        if (!prompt) {
                            return;
                        }


                        chatgptPrompt.value =
                            prompt;


                        chatgptPrompt.focus();


                        /* Cursor no final */

                        try {

                            chatgptPrompt.setSelectionRange(
                                chatgptPrompt.value.length,
                                chatgptPrompt.value.length
                            );

                        } catch (e) {}

                    }
                );

            }
        );

    }


    /* ============================================
       COPIAR PROMPT DO CHATGPT
    ============================================ */

    if (btnCopiarPrompt) {

        btnCopiarPrompt.addEventListener(
            'click',
            function () {

                if (!chatgptPrompt) {
                    return;
                }

                var texto =
                    chatgptPrompt.value.trim();


                if (!texto) {

                    chatgptPrompt.focus();

                    return;

                }


                copiarTexto(
                    texto,
                    function () {

                        var original =
                            btnCopiarPrompt.innerHTML;

                        btnCopiarPrompt.innerHTML =
                            '✓ Prompt copiado';

                        setTimeout(
                            function () {

                                btnCopiarPrompt.innerHTML =
                                    original;

                            },
                            1800
                        );

                    }
                );

            }
        );

    }


    /* ============================================
       ABRIR CHATGPT
    ============================================ */

    if (btnAbrirChatGPT) {

        btnAbrirChatGPT.addEventListener(
            'click',
            function () {

                var texto = '';

                if (chatgptPrompt) {

                    texto =
                        chatgptPrompt.value.trim();

                }


                /*
                 * SEM API
                 *
                 * Se houver um prompt:
                 * 1. copia para área de transferência
                 * 2. abre o ChatGPT
                 *
                 * O usuário pode usar CTRL + V.
                 */


                if (texto) {

                    copiarTexto(
                        texto,
                        function () {

                            abrirChatGPT();

                        }
                    );

                } else {

                    abrirChatGPT();

                }

            }
        );

    }


    function abrirChatGPT() {

        window.open(
            'https://chatgpt.com/',
            '_blank',
            'noopener,noreferrer'
        );

    }


    /* ============================================
       ENTER NO CHATGPT
       CTRL + ENTER = COPIAR PROMPT
    ============================================ */

    if (chatgptPrompt) {

        chatgptPrompt.addEventListener(
            'keydown',
            function (event) {

                /*
                 * CTRL + ENTER
                 * copia o prompt
                 */

                if (
                    event.ctrlKey &&
                    event.key === 'Enter'
                ) {

                    event.preventDefault();

                    if (btnCopiarPrompt) {

                        btnCopiarPrompt.click();

                    }

                }

            }
        );

    }


    /* ============================================
       LOCAL STORAGE
    ============================================ */

    function salvarPreferencias() {

        try {

            if (tipoResposta) {

                localStorage.setItem(
                    'ferramentasAdm.tipo',
                    tipoResposta.value
                );

            }


            if (searchInput) {

                localStorage.setItem(
                    'ferramentasAdm.busca',
                    searchInput.value
                );

            }

        } catch (e) {

            console.warn(
                'Não foi possível salvar preferências.'
            );

        }

    }


    function carregarPreferencias() {

        try {

            var tipoSalvo =
                localStorage.getItem(
                    'ferramentasAdm.tipo'
                );

            var buscaSalva =
                localStorage.getItem(
                    'ferramentasAdm.busca'
                );


            if (
                tipoSalvo &&
                templates[tipoSalvo] &&
                tipoResposta
            ) {

                tipoResposta.value =
                    tipoSalvo;

            }


            /*
             * Não recuperamos automaticamente
             * a busca para não esconder ferramentas
             * quando o usuário abre a página.
             */

        } catch (e) {

            console.warn(
                'Não foi possível carregar preferências.'
            );

        }

    }


    if (tipoResposta) {

        tipoResposta.addEventListener(
            'change',
            salvarPreferencias
        );

    }


    if (searchInput) {

        searchInput.addEventListener(
            'input',
            salvarPreferencias
        );

    }


    /* ============================================
       INICIALIZAÇÃO
    ============================================ */

    carregarPreferencias();


    /* ============================================
       GARANTIR ESTADO INICIAL
    ============================================ */

    if (resultado) {

        resultado.textContent =
            PLACEHOLDER;

    }


    console.log(
        'Ferramentas ADM carregado com sucesso.'
    );


})();
