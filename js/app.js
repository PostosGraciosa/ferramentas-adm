/* ============================================
   FERRAMENTAS ADM
   POSTOS GRACIOSA
   js/app.js
============================================ */

(function () {

    'use strict';


    /* =========================================
       ELEMENTOS
    ========================================== */

    var searchInput =
        document.getElementById('searchInput');

    var toolsGrid =
        document.getElementById('toolsGrid');

    var emptyState =
        document.getElementById('emptyState');

    var portaisToggle =
        document.getElementById('portaisToggle');

    var dropdownCard =
        document.querySelector('.dropdown');

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


    /* =========================================
       TEMPLATES — ASSISTENTE LOCAL
    ========================================== */

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
                (info || 'informadas') +
                '. Pedimos, por gentileza, que verifique os dados ' +
                'e nos retorne com as informações corretas.'
            );

        },


        'Aguardando retorno': function (info) {

            return (
                'Olá! Estamos aguardando o retorno referente a ' +
                (info || 'sua solicitação') +
                '. Assim que tivermos novidades, entraremos em contato.'
            );

        },


        'Encaminhamento ao setor responsável': function (info) {

            return (
                'Olá! Sua solicitação foi encaminhada ao setor responsável' +
                (info ? ' para tratar ' + info : '') +
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


    /* =========================================
       BUSCA
    ========================================== */

    function realizarBusca() {

        if (!searchInput || !toolsGrid) {
            return;
        }


        var termo =
            searchInput.value
                .toLowerCase()
                .trim();


        var cards =
            toolsGrid.querySelectorAll('.card');


        var encontrados = 0;


        cards.forEach(function (card) {

            var texto =
                (
                    card.getAttribute('data-search') || ''
                ).toLowerCase();


            var titulo =
                card.querySelector('h3');


            if (titulo) {

                texto += ' ' +
                    titulo.textContent.toLowerCase();

            }


            var mostrar =
                !termo ||
                texto.indexOf(termo) !== -1;


            if (mostrar) {

                card.classList.remove('search-hidden');

                encontrados++;

            } else {

                card.classList.add('search-hidden');

            }

        });


        if (emptyState) {

            if (encontrados === 0) {

                emptyState.classList.remove('hidden');

            } else {

                emptyState.classList.add('hidden');

            }

        }

    }


    if (searchInput) {

        searchInput.addEventListener(
            'input',
            realizarBusca
        );

    }


    /* =========================================
       TECLA /
    ========================================== */

    document.addEventListener(
        'keydown',
        function (event) {

            if (
                event.key === '/' &&
                document.activeElement !== searchInput &&
                document.activeElement.tagName !== 'INPUT' &&
                document.activeElement.tagName !== 'TEXTAREA' &&
                document.activeElement.tagName !== 'SELECT'
            ) {

                event.preventDefault();

                searchInput.focus();

            }

        }
    );


    /* =========================================
       DROPDOWN PORTAIS
    ========================================== */

    if (
        portaisToggle &&
        dropdownCard
    ) {

        portaisToggle.addEventListener(
            'click',
            function (event) {

                event.preventDefault();

                event.stopPropagation();


                var aberto =
                    dropdownCard.classList.toggle('open');


                portaisToggle.setAttribute(
                    'aria-expanded',
                    aberto ? 'true' : 'false'
                );


                portaisToggle.innerHTML =
                    aberto
                        ? 'Ocultar portais ▴'
                        : 'Ver portais ▾';

            }
        );

    }


    /* =========================================
       FECHAR DROPDOWN AO CLICAR FORA
    ========================================== */

    document.addEventListener(
        'click',
        function (event) {

            if (
                dropdownCard &&
                !dropdownCard.contains(event.target)
            ) {

                dropdownCard.classList.remove('open');


                if (portaisToggle) {

                    portaisToggle.setAttribute(
                        'aria-expanded',
                        'false'
                    );

                    portaisToggle.innerHTML =
                        'Ver portais ▾';

                }

            }

        }
    );


    /* =========================================
       GERAR RESPOSTA LOCAL
    ========================================== */

    if (btnGerar) {

        btnGerar.addEventListener(
            'click',
            function () {

                var tipo =
                    tipoResposta
                        ? tipoResposta.value
                        : 'Resposta personalizada';


                var info =
                    infoExtra
                        ? infoExtra.value.trim()
                        : '';


                if (
                    templates[tipo]
                ) {

                    resultado.textContent =
                        templates[tipo](info);

                }


                resultado.classList.add(
                    'result-active'
                );

            }
        );

    }


    /* =========================================
       LIMPAR ASSISTENTE
    ========================================== */

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
                        'result-active'
                    );

                }

            }
        );

    }


    /* =========================================
       COPIAR RESPOSTA
    ========================================== */

    if (btnCopiar) {

        btnCopiar.addEventListener(
            'click',
            function () {

                var texto =
                    resultado
                        ? resultado.textContent.trim()
                        : '';


                if (
                    !texto ||
                    texto === PLACEHOLDER
                ) {

                    if (infoExtra) {

                        infoExtra.focus();

                    }

                    return;

                }


                copiarTexto(
                    texto,
                    btnCopiar,
                    '✓ Copiado'
                );

            }
        );

    }


    /* =========================================
       SUGESTÕES CHATGPT
    ========================================== */

    promptSuggestions.forEach(
        function (button) {

            button.addEventListener(
                'click',
                function () {

                    var prompt =
                        button.getAttribute(
                            'data-prompt'
                        );


                    if (!prompt || !chatgptPrompt) {

                        return;

                    }


                    chatgptPrompt.value =
                        prompt;


                    chatgptPrompt.focus();


                    chatgptPrompt.setSelectionRange(
                        chatgptPrompt.value.length,
                        chatgptPrompt.value.length
                    );

                }
            );

        }
    );


    /* =========================================
       COPIAR PROMPT
    ========================================== */

    if (btnCopiarPrompt) {

        btnCopiarPrompt.addEventListener(
            'click',
            function () {

                var texto =
                    chatgptPrompt
                        ? chatgptPrompt.value.trim()
                        : '';


                if (!texto) {

                    if (chatgptPrompt) {

                        chatgptPrompt.focus();

                    }

                    return;

                }


                copiarTexto(
                    texto,
                    btnCopiarPrompt,
                    '✓ Prompt copiado'
                );

            }
        );

    }


    /* =========================================
       ABRIR CHATGPT
    ========================================== */

    if (btnAbrirChatGPT) {

        btnAbrirChatGPT.addEventListener(
            'click',
            function () {

                var texto =
                    chatgptPrompt
                        ? chatgptPrompt.value.trim()
                        : '';


                /*
                 * Não existe API aqui.
                 *
                 * O prompt é copiado automaticamente
                 * e o ChatGPT é aberto em nova aba.
                 */

                if (texto) {

                    copiarTextoSilencioso(
                        texto
                    );

                }


                window.open(
                    'https://chatgpt.com/',
                    '_blank',
                    'noopener,noreferrer'
                );

            }
        );

    }


    /* =========================================
       FUNÇÃO DE CÓPIA
    ========================================== */

    function copiarTexto(
        texto,
        botao,
        mensagem
    ) {

        if (
            navigator.clipboard &&
            window.isSecureContext
        ) {

            navigator.clipboard
                .writeText(texto)
                .then(function () {

                    mostrarFeedback(
                        botao,
                        mensagem
                    );

                })
                .catch(function () {

                    copiarFallback(
                        texto,
                        botao,
                        mensagem
                    );

                });

        } else {

            copiarFallback(
                texto,
                botao,
                mensagem
            );

        }

    }


    /* =========================================
       CÓPIA SILENCIOSA
    ========================================== */

    function copiarTextoSilencioso(
        texto
    ) {

        if (
            navigator.clipboard &&
            window.isSecureContext
        ) {

            navigator.clipboard
                .writeText(texto)
                .catch(function () {

                    copiarFallbackSilencioso(
                        texto
                    );

                });

        } else {

            copiarFallbackSilencioso(
                texto
            );

        }

    }


    /* =========================================
       FALLBACK DE CÓPIA
    ========================================== */

    function copiarFallback(
        texto,
        botao,
        mensagem
    ) {

        var area =
            document.createElement('textarea');


        area.value =
            texto;


        area.style.position =
            'fixed';

        area.style.left =
            '-9999px';


        document.body.appendChild(
            area
        );


        area.select();


        try {

            document.execCommand(
                'copy'
            );


            mostrarFeedback(
                botao,
                mensagem
            );

        } catch (e) {

            /* nada */

        }


        document.body.removeChild(
            area
        );

    }


    function copiarFallbackSilencioso(
        texto
    ) {

        var area =
            document.createElement('textarea');


        area.value =
            texto;


        area.style.position =
            'fixed';

        area.style.left =
            '-9999px';


        document.body.appendChild(
            area
        );


        area.select();


        try {

            document.execCommand(
                'copy'
            );

        } catch (e) {

            /* nada */

        }


        document.body.removeChild(
            area
        );

    }


    /* =========================================
       FEEDBACK DOS BOTÕES
    ========================================== */

    function mostrarFeedback(
        botao,
        mensagem
    ) {

        if (!botao) {
            return;
        }


        var original =
            botao.innerHTML;


        botao.innerHTML =
            mensagem;


        botao.classList.add(
            'button-success'
        );


        setTimeout(
            function () {

                botao.innerHTML =
                    original;

                botao.classList.remove(
                    'button-success'
                );

            },
            1800
        );

    }


    /* =========================================
       PERSISTÊNCIA
    ========================================== */

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

            /* localStorage indisponível */

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


            if (
                buscaSalva &&
                searchInput
            ) {

                searchInput.value =
                    buscaSalva;

                realizarBusca();

            }

        } catch (e) {

            /* localStorage indisponível */

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
            'change',
            salvarPreferencias
        );

    }


    /* =========================================
       INICIALIZAÇÃO
    ========================================== */

    carregarPreferencias();


})();
