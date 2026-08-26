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
       TEMPLATES — ASSISTENTE DE RESPOSTAS
    ========================================== */

    var templates = {


        /* =====================================
           💳 CONFIRMAÇÃO DE PAGAMENTO
        ====================================== */

        'Confirmação de pagamento': function (info) {

            return (
                'Olá! Confirmamos o recebimento do seu pagamento.' +
                (info ? ' ' + info : '') +
                ' Agradecemos pelo contato e permanecemos à disposição.'
            );

        },


        /* =====================================
           💰 PAGAMENTO NÃO LOCALIZADO
        ====================================== */

        'Pagamento não localizado': function (info) {

            return (
                'Olá! Até o momento não localizamos o pagamento informado em nosso sistema.' +
                (info ? ' ' + info : '') +
                ' Pedimos, por gentileza, que verifique os dados da transação e, se possível, nos envie o comprovante para que possamos realizar uma nova conferência.'
            );

        },


        /* =====================================
           🔄 ESTORNO
        ====================================== */

        'Estorno': function (info) {

            return (
                'Olá! Sobre a solicitação de estorno, estamos verificando as informações necessárias para dar continuidade ao atendimento.' +
                (info ? ' ' + info : '') +
                ' Assim que tivermos uma atualização, retornaremos com um posicionamento.'
            );

        },


        /* =====================================
           ⚠️ DIVERGÊNCIA DE VALOR
        ====================================== */

        'Divergência de valor': function (info) {

            return (
                'Olá! Identificamos uma divergência em relação ao valor informado.' +
                (info ? ' ' + info : '') +
                ' Pedimos, por gentileza, que confirme os dados da transação para que possamos realizar a conferência.'
            );

        },


        /* =====================================
           📄 SOLICITAÇÃO DE DOCUMENTO
        ====================================== */

        'Solicitação de documento': function (info) {

            return (
                'Olá! Para darmos continuidade à sua solicitação, pedimos, por gentileza, o envio do seguinte documento: ' +
                (info || 'documento necessário') +
                '. Assim que recebermos, daremos sequência ao atendimento.'
            );

        },


        /* =====================================
           🧾 SOLICITAÇÃO DE COMPROVANTE
        ====================================== */

        'Solicitação de comprovante': function (info) {

            return (
                'Olá! Para podermos verificar a situação informada, pedimos, por gentileza, o envio do comprovante da transação.' +
                (info ? ' ' + info : '') +
                ' Assim que recebermos o comprovante, realizaremos a conferência.'
            );

        },


        /* =====================================
           ⏳ AGUARDANDO RETORNO
        ====================================== */

        'Aguardando retorno': function (info) {

            return (
                'Olá! Estamos aguardando o retorno referente à sua solicitação.' +
                (info ? ' ' + info : '') +
                ' Assim que tivermos novas informações, entraremos em contato.'
            );

        },


        /* =====================================
           📞 RETORNO AO CLIENTE
        ====================================== */

        'Retorno ao cliente': function (info) {

            return (
                'Olá! Estamos entrando em contato para dar um retorno referente à sua solicitação.' +
                (info ? ' ' + info : '') +
                ' Permanecemos à disposição caso tenha alguma dúvida.'
            );

        },


        /* =====================================
           🏦 PROBLEMA COM CARTÃO
        ====================================== */

        'Problema com cartão': function (info) {

            return (
                'Olá! Identificamos uma situação relacionada ao cartão utilizado.' +
                (info ? ' ' + info : '') +
                ' Pedimos, por gentileza, que nos informe os detalhes da ocorrência para que possamos verificar a situação.'
            );

        },


        /* =====================================
           💳 CARTÃO RECUSADO
        ====================================== */

        'Cartão recusado': function (info) {

            return (
                'Olá! Verificamos que a transação com o cartão não foi aprovada.' +
                (info ? ' ' + info : '') +
                ' Recomendamos verificar os dados do cartão ou entrar em contato com a instituição responsável pelo cartão para obter mais informações.'
            );

        },


        /* =====================================
           🎫 TICKET / BENEFÍCIO
        ====================================== */

        'Ticket / benefício': function (info) {

            return (
                'Olá! Sobre a utilização do benefício informado, estamos verificando a situação.' +
                (info ? ' ' + info : '') +
                ' Caso necessário, pedimos que nos envie mais detalhes para que possamos realizar a conferência.'
            );

        },


        /* =====================================
           🚗 ABASTECIMENTO
        ====================================== */

        'Abastecimento': function (info) {

            return (
                'Olá! Sobre o abastecimento informado, estamos verificando os dados da operação.' +
                (info ? ' ' + info : '') +
                ' Pedimos, se possível, que nos informe a data, horário, valor e demais detalhes para facilitar a conferência.'
            );

        },


        /* =====================================
           🛒 LOJA / CONVENIÊNCIA
        ====================================== */

        'Loja / conveniência': function (info) {

            return (
                'Olá! Sobre a situação relacionada à loja/conveniência, estamos verificando as informações.' +
                (info ? ' ' + info : '') +
                ' Em breve retornaremos com um posicionamento.'
            );

        },


        /* =====================================
           📦 PRODUTO INDISPONÍVEL
        ====================================== */

        'Produto indisponível': function (info) {

            return (
                'Olá! No momento, o produto informado encontra-se indisponível.' +
                (info ? ' ' + info : '') +
                ' Pedimos desculpas pelo inconveniente e agradecemos pela compreensão.'
            );

        },


        /* =====================================
           🧑‍💼 ENCAMINHAMENTO
        ====================================== */

        'Encaminhamento ao setor responsável': function (info) {

            return (
                'Olá! Sua solicitação foi encaminhada ao setor responsável para análise.' +
                (info ? ' ' + info : '') +
                ' Assim que tivermos um posicionamento, retornaremos com as informações.'
            );

        },


        /* =====================================
           🙏 AGRADECIMENTO
        ====================================== */

        'Agradecimento': function (info) {

            return (
                'Olá! Agradecemos pelo seu contato.' +
                (info ? ' ' + info : '') +
                ' Permanecemos à disposição para qualquer dúvida ou necessidade.'
            );

        },


        /* =====================================
           ❌ RECLAMAÇÃO
        ====================================== */

        'Reclamação': function (info) {

            return (
                'Olá! Lamentamos pela situação relatada e agradecemos por nos informar sobre o ocorrido.' +
                (info ? ' ' + info : '') +
                ' Vamos encaminhar as informações para análise e buscar a melhor solução possível.'
            );

        },


        /* =====================================
           📝 RESPOSTA PERSONALIZADA
        ====================================== */

        'Resposta personalizada': function (info) {

            return (
                'Olá! ' +
                (
                    info ||
                    'Informe os detalhes da situação para elaborar uma resposta personalizada.'
                )
            );

        }

    };



    /* =========================================
       BUSCA DAS FERRAMENTAS
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

                card.classList.remove(
                    'search-hidden'
                );

                encontrados++;

            } else {

                card.classList.add(
                    'search-hidden'
                );

            }

        });


        if (emptyState) {

            if (encontrados === 0) {

                emptyState.classList.remove(
                    'hidden'
                );

            } else {

                emptyState.classList.add(
                    'hidden'
                );

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


                if (searchInput) {

                    searchInput.focus();

                }

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
                    dropdownCard.classList.toggle(
                        'open'
                    );


                portaisToggle.setAttribute(
                    'aria-expanded',
                    aberto
                        ? 'true'
                        : 'false'
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
                    templates[tipo] &&
                    resultado
                ) {

                    resultado.textContent =
                        templates[tipo](info);

                }


                if (resultado) {

                    resultado.classList.add(
                        'result-active'
                    );

                }

            }
        );

    }



    /* =========================================
       LIMPAR ASSISTENTE LOCAL
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
       SUGESTÕES DO CHATGPT
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


                    if (
                        !prompt ||
                        !chatgptPrompt
                    ) {

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

                    mostrarFeedback(
                        btnCopiarPrompt,
                        'Digite um prompt primeiro'
                    );

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
       
       O TEXTO DIGITADO É ENVIADO PELA URL
       PARA O CAMPO DO CHATGPT.
    ========================================== */

    if (btnAbrirChatGPT) {

        btnAbrirChatGPT.addEventListener(
            'click',
            function () {

                var texto =
                    chatgptPrompt
                        ? chatgptPrompt.value.trim()
                        : '';


                /* =================================
                   CAMPO VAZIO
                ================================== */

                if (!texto) {

                    if (chatgptPrompt) {

                        chatgptPrompt.focus();

                    }


                    mostrarFeedback(
                        btnAbrirChatGPT,
                        'Digite um prompt primeiro'
                    );


                    return;

                }


                /* =================================
                   MONTAR URL
                ================================== */

                var urlChatGPT =
                    'https://chatgpt.com/?q=' +
                    encodeURIComponent(texto);


                /* =================================
                   ABRIR NOVA ABA
                ================================== */

                window.open(
                    urlChatGPT,
                    '_blank'
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
            document.createElement(
                'textarea'
            );


        area.value =
            texto;


        area.style.position =
            'fixed';


        area.style.left =
            '-9999px';


        area.style.top =
            '0';


        document.body.appendChild(
            area
        );


        area.focus();

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



    /* =========================================
       FALLBACK CÓPIA SILENCIOSA
    ========================================== */

    function copiarFallbackSilencioso(
        texto
    ) {

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


        area.style.top =
            '0';


        document.body.appendChild(
            area
        );


        area.focus();

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



    /* =========================================
       CARREGAR PREFERÊNCIAS
    ========================================== */

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



    /* =========================================
       EVENTOS DE PREFERÊNCIAS
    ========================================== */

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
