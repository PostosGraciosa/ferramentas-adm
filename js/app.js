/* ============================================
   FERRAMENTAS ADM
   POSTOS GRACIOSA

   js/app.js
   ============================================ */

(function () {

    'use strict';



    /* =========================================
       TEMPLATES DO ASSISTENTE LOCAL
    ========================================= */

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
                '. Assim que recebermos, daremos continuidade ao atendimento.'
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
                'Olá! Estamos aguardando o retorno referente a ' +
                (info || 'sua solicitação') +
                '. Assim que tivermos novidades, entraremos em contato.'
            );

        },


        'Encaminhamento ao setor responsável': function (info) {

            return (
                'Olá! Sua solicitação foi encaminhada ao setor responsável' +
                (info ? ' para análise de ' + info : '') +
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
                    'Informe os detalhes que deseja incluir na resposta.'
                )
            );

        }

    };



    /* =========================================
       ELEMENTOS
    ========================================== */

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

    var portaisToggle =
        document.getElementById('portaisToggle');

    var dropdown =
        document.querySelector('.dropdown');

    var aiPanel =
        document.getElementById('aiPanel');



    var PLACEHOLDER =
        'A resposta gerada aparecerá aqui.';



    /* =========================================
       PREFERÊNCIAS
    ========================================== */

    function salvarPreferencias() {

        try {

            localStorage.setItem(
                'ferramentasAdm.tipo',
                tipoResposta.value
            );

        } catch (e) {}

    }



    function carregarPreferencias() {

        try {

            var tipoSalvo =
                localStorage.getItem(
                    'ferramentasAdm.tipo'
                );


            if (
                tipoSalvo &&
                templates[tipoSalvo]
            ) {

                tipoResposta.value =
                    tipoSalvo;

            }

        } catch (e) {}

    }



    /* =========================================
       GERAR RESPOSTA
    ========================================== */

    function gerarResposta() {

        var tipo =
            tipoResposta.value;

        var info =
            infoExtra.value.trim();

        if (
            typeof templates[tipo] !==
            'function'
        ) {

            resultado.textContent =
                PLACEHOLDER;

            return;

        }


        var resposta =
            templates[tipo](info);


        resultado.textContent =
            resposta;


        resultado.classList.add(
            'result-active'
        );

    }



    /* =========================================
       LIMPAR
    ========================================== */

    function limparAssistente() {

        infoExtra.value = '';

        resultado.textContent =
            PLACEHOLDER;

        resultado.classList.remove(
            'result-active'
        );

    }



    /* =========================================
       COPIAR
    ========================================== */

    function copiarResposta() {

        var texto =
            resultado.textContent.trim();


        if (
            !texto ||
            texto === PLACEHOLDER
        ) {

            return;

        }


        if (
            navigator.clipboard &&
            navigator.clipboard.writeText
        ) {

            navigator.clipboard.writeText(
                texto
            ).then(function () {

                mostrarCopiado();

            }).catch(function () {

                copiarFallback(texto);

            });

        } else {

            copiarFallback(texto);

        }

    }



    /* =========================================
       FALLBACK DE CÓPIA
    ========================================== */

    function copiarFallback(texto) {

        var area =
            document.createElement(
                'textarea'
            );


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

            mostrarCopiado();

        } catch (e) {}



        document.body.removeChild(
            area
        );

    }



    /* =========================================
       FEEDBACK COPIADO
    ========================================== */

    function mostrarCopiado() {

        var textoOriginal =
            btnCopiar.innerHTML;


        btnCopiar.innerHTML =
            '✓ Copiado!';


        btnCopiar.classList.add(
            'copied'
        );


        setTimeout(
            function () {

                btnCopiar.innerHTML =
                    textoOriginal;

                btnCopiar.classList.remove(
                    'copied'
                );

            },
            1800
        );

    }



    /* =========================================
       BUSCA
    ========================================== */

    function executarBusca() {

        var termo =
            searchInput.value
                .trim()
                .toLowerCase();


        var cards =
            document.querySelectorAll(
                '.card'
            );


        var encontrados = 0;


        cards.forEach(function (card) {

            var texto =
                (
                    card.getAttribute(
                        'data-search'
                    ) || ''
                ).toLowerCase();


            var titulo =
                (
                    card.querySelector(
                        'h3'
                    )?.textContent || ''
                ).toLowerCase();


            var combinado =
                texto + ' ' + titulo;


            var mostrar =
                !termo ||
                combinado.includes(
                    termo
                );


            card.classList.toggle(
                'search-hidden',
                !mostrar
            );


            if (mostrar) {

                encontrados++;

            }

        });


        emptyState.classList.toggle(
            'hidden',
            encontrados !== 0
        );

    }



    /* =========================================
       ABRIR ASSISTENTE
    ========================================== */

    function abrirAssistente() {

        if (!aiPanel) {
            return;
        }


        aiPanel.classList.add(
            'ai-highlight'
        );


        aiPanel.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });


        setTimeout(
            function () {

                aiPanel.classList.remove(
                    'ai-highlight'
                );

            },
            1300
        );

    }



    /* =========================================
       DROPDOWN
    ========================================== */

    function alternarPortais() {

        if (!dropdown) {
            return;
        }


        var aberto =
            dropdown.classList.toggle(
                'open'
            );


        portaisToggle.setAttribute(
            'aria-expanded',
            aberto
                ? 'true'
                : 'false'
        );


        portaisToggle.querySelector(
            'span'
        ).textContent =
            aberto
                ? '▴'
                : '▾';

    }



    /* =========================================
       FECHAR DROPDOWN AO CLICAR FORA
    ========================================== */

    document.addEventListener(
        'click',
        function (event) {

            if (!dropdown) {
                return;
            }


            if (
                !dropdown.contains(
                    event.target
                )
            ) {

                dropdown.classList.remove(
                    'open'
                );


                portaisToggle.setAttribute(
                    'aria-expanded',
                    'false'
                );


                portaisToggle.querySelector(
                    'span'
                ).textContent =
                    '▾';

            }

        }
    );



    /* =========================================
       ATALHO /
    ========================================== */

    document.addEventListener(
        'keydown',
        function (event) {

            if (
                event.key === '/' &&
                document.activeElement !==
                searchInput &&
                document.activeElement !==
                infoExtra
            ) {

                event.preventDefault();

                searchInput.focus();

            }


            if (
                event.key === 'Escape'
            ) {

                searchInput.value =
                    '';

                executarBusca();

                searchInput.blur();

            }

        }
    );



    /* =========================================
       EVENTOS
    ========================================== */

    if (btnGerar) {

        btnGerar.addEventListener(
            'click',
            gerarResposta
        );

    }


    if (btnLimpar) {

        btnLimpar.addEventListener(
            'click',
            limparAssistente
        );

    }


    if (btnCopiar) {

        btnCopiar.addEventListener(
            'click',
            copiarResposta
        );

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
            executarBusca
        );

    }


    if (portaisToggle) {

        portaisToggle.addEventListener(
            'click',
            function (event) {

                event.stopPropagation();

                alternarPortais();

            }
        );

    }



    /* =========================================
       CLIQUE NOS CARDS
    ========================================== */

    document.querySelectorAll(
        '.card'
    ).forEach(function (card) {

        card.addEventListener(
            'click',
            function (event) {

                if (
                    event.target.closest(
                        'a'
                    ) ||
                    event.target.closest(
                        'button'
                    ) ||
                    event.target.closest(
                        '.dropdown-menu'
                    )
                ) {

                    return;

                }


                var target =
                    card.getAttribute(
                        'data-target'
                    );


                if (
                    target ===
                    'aiPanel'
                ) {

                    abrirAssistente();

                }

            }
        );

    });



    /* =========================================
       ENTER NO TEXTAREA
    ========================================== */

    if (infoExtra) {

        infoExtra.addEventListener(
            'keydown',
            function (event) {

                if (
                    event.ctrlKey &&
                    event.key === 'Enter'
                ) {

                    event.preventDefault();

                    gerarResposta();

                }

            }
        );

    }



    /* =========================================
       INICIALIZAÇÃO
    ========================================== */

    carregarPreferencias();

    executarBusca();


})();
