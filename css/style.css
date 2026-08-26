/* ============================================
   FERRAMENTAS ADM
   SISTEMA CORPORATIVO
   JAVASCRIPT PRINCIPAL
============================================ */

document.addEventListener("DOMContentLoaded", function () {


    /* ========================================
       DROPDOWN
       ADMINISTRADORAS / PORTAIS
    ======================================== */

    const portalButton =
        document.getElementById("portalButton");

    const portalDropdown =
        document.querySelector(".portal-dropdown");

    const portalList =
        document.getElementById("portalList");


    if (
        portalButton &&
        portalDropdown &&
        portalList
    ) {


        portalButton.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                event.stopPropagation();

                const isActive =
                    portalDropdown.classList.toggle("active");

                portalButton.setAttribute(
                    "aria-expanded",
                    isActive ? "true" : "false"
                );

            }
        );


        document.addEventListener(
            "click",
            function (event) {

                if (
                    !portalDropdown.contains(event.target)
                ) {

                    portalDropdown.classList.remove(
                        "active"
                    );

                    portalButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }

            }
        );


        document.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Escape"
                ) {

                    portalDropdown.classList.remove(
                        "active"
                    );

                    portalButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }

            }
        );


        const portalItems =
            portalList.querySelectorAll(
                ".portal-item"
            );


        portalItems.forEach(
            function (item) {

                item.addEventListener(
                    "click",
                    function () {

                        setTimeout(
                            function () {

                                portalDropdown.classList.remove(
                                    "active"
                                );

                                portalButton.setAttribute(
                                    "aria-expanded",
                                    "false"
                                );

                            },
                            100
                        );

                    }
                );

            }
        );

    }



    /* ========================================
       BUSCA DE FERRAMENTAS
    ======================================== */

    const searchInput =
        document.getElementById("toolSearch");

    const categories =
        document.querySelectorAll(
            ".category"
        );

    const noResults =
        document.getElementById("noResults");


    if (searchInput) {


        searchInput.addEventListener(
            "input",
            function () {

                const search =
                    this.value
                        .toLowerCase()
                        .trim();


                let totalResults = 0;


                categories.forEach(
                    function (category) {

                        const searchableCategory =
                            (
                                category.dataset.category ||
                                ""
                            ).toLowerCase();


                        const cards =
                            category.querySelectorAll(
                                ".tool-card, .portal-item"
                            );


                        let categoryMatches = 0;


                        /*
                           Caso seja uma categoria especial,
                           como Resposta Rápida.
                        */

                        if (
                            category.classList.contains(
                                "ai-category"
                            )
                        ) {

                            const categoryMatch =
                                searchableCategory.includes(
                                    search
                                );

                            if (
                                search === "" ||
                                categoryMatch
                            ) {

                                category.style.display =
                                    "";

                                totalResults++;

                            } else {

                                category.style.display =
                                    "none";

                            }

                            return;

                        }


                        /*
                           Categorias sem cards.
                        */

                        if (
                            cards.length === 0
                        ) {

                            if (
                                search === "" ||
                                searchableCategory.includes(search)
                            ) {

                                category.style.display =
                                    "";

                                totalResults++;

                            } else {

                                category.style.display =
                                    "none";

                            }

                            return;

                        }


                        /*
                           Verificação dos cards.
                        */

                        cards.forEach(
                            function (card) {

                                const searchableText =
                                    (
                                        card.dataset.search ||
                                        card.textContent ||
                                        ""
                                    ).toLowerCase();


                                const match =
                                    search === "" ||
                                    searchableText.includes(
                                        search
                                    );


                                card.style.display =
                                    match ? "" : "none";


                                if (match) {

                                    categoryMatches++;

                                    totalResults++;

                                }

                            }
                        );


                        /*
                           Mostrar / esconder categoria.
                        */

                        if (
                            categoryMatches > 0
                        ) {

                            category.style.display =
                                "";

                        } else {

                            /*
                               Pesquisa também no nome
                               da categoria.
                            */

                            if (
                                search !== "" &&
                                searchableCategory.includes(
                                    search
                                )
                            ) {

                                category.style.display =
                                    "";

                                cards.forEach(
                                    function (card) {

                                        card.style.display =
                                            "";

                                    }
                                );

                                totalResults +=
                                    cards.length;

                            } else {

                                category.style.display =
                                    "none";

                            }

                        }

                    }
                );


                /*
                   Resultado da pesquisa.
                */

                if (
                    noResults
                ) {

                    noResults.classList.toggle(
                        "visible",
                        search !== "" &&
                        totalResults === 0
                    );

                }

            }
        );


        /*
           Atalho "/" para pesquisa.
        */

        document.addEventListener(
            "keydown",
            function (event) {

                const activeElement =
                    document.activeElement;

                const isTyping =
                    activeElement &&
                    (
                        activeElement.tagName === "INPUT" ||
                        activeElement.tagName === "TEXTAREA" ||
                        activeElement.tagName === "SELECT"
                    );


                if (
                    event.key === "/" &&
                    !isTyping
                ) {

                    event.preventDefault();

                    searchInput.focus();

                }

            }
        );

    }



    /* ========================================
       FAVICONS
       FALLBACK
    ======================================== */

    const portalImages =
        document.querySelectorAll(
            ".portal-item-icon img"
        );


    portalImages.forEach(
        function (image) {

            image.addEventListener(
                "error",
                function () {

                    const parent =
                        image.parentElement;

                    image.style.display =
                        "none";


                    parent.classList.add(
                        "favicon-error"
                    );


                    const fallback =
                        document.createElement(
                            "span"
                        );


                    fallback.textContent =
                        (
                            image.alt ||
                            "ADM"
                        ).substring(
                            0,
                            2
                        ).toUpperCase();


                    fallback.className =
                        "favicon-fallback";


                    parent.appendChild(
                        fallback
                    );

                }
            );

        }
    );



    /* ========================================
       RESPOSTA RÁPIDA
       SISTEMA LOCAL — SEM API
    ======================================== */

    const aiSituation =
        document.getElementById(
            "aiSituation"
        );

    const aiContext =
        document.getElementById(
            "aiContext"
        );

    const generateResponse =
        document.getElementById(
            "generateResponse"
        );

    const clearResponse =
        document.getElementById(
            "clearResponse"
        );

    const aiResult =
        document.getElementById(
            "aiResult"
        );

    const aiResultActions =
        document.getElementById(
            "aiResultActions"
        );

    const copyResponse =
        document.getElementById(
            "copyResponse"
        );


    let currentResponse = "";



    /* ========================================
       MODELOS DE RESPOSTA
    ======================================== */

    const responseTemplates = {


        pagamento: function (context) {

            return (
                "Olá! " +
                "Confirmamos o recebimento da informação referente ao pagamento." +
                (context
                    ? "\n\n" + context
                    : "") +
                "\n\n" +
                "Caso seja necessário algum procedimento adicional, " +
                "permanecemos à disposição.\n\n" +
                "Atenciosamente,\n" +
                "Postos Graciosa"
            );

        },


        documento: function (context) {

            return (
                "Olá!\n\n" +
                "Para darmos continuidade ao atendimento, " +
                "precisamos do documento ou das informações solicitadas." +
                (context
                    ? "\n\nInformações adicionais:\n" + context
                    : "") +
                "\n\n" +
                "Assim que recebermos os dados, daremos sequência ao atendimento.\n\n" +
                "Atenciosamente,\n" +
                "Postos Graciosa"
            );

        },


        divergencia: function (context) {

            return (
                "Olá!\n\n" +
                "Identificamos uma divergência nas informações apresentadas " +
                "e estamos realizando a verificação necessária." +
                (context
                    ? "\n\nDetalhes:\n" + context
                    : "") +
                "\n\n" +
                "Assim que tivermos a confirmação, retornaremos com as informações corretas.\n\n" +
                "Atenciosamente,\n" +
                "Postos Graciosa"
            );

        },


        retorno: function (context) {

            return (
                "Olá!\n\n" +
                "Estamos aguardando o retorno das informações necessárias " +
                "para dar continuidade ao atendimento." +
                (context
                    ? "\n\nReferente a:\n" + context
                    : "") +
                "\n\n" +
                "Assim que recebermos o retorno, prosseguiremos com a solicitação.\n\n" +
                "Atenciosamente,\n" +
                "Postos Graciosa"
            );

        },


        encaminhamento: function (context) {

            return (
                "Olá!\n\n" +
                "Sua solicitação foi encaminhada ao setor responsável " +
                "para análise e providências." +
                (context
                    ? "\n\nDetalhes da solicitação:\n" + context
                    : "") +
                "\n\n" +
                "Assim que tivermos um retorno, entraremos em contato.\n\n" +
                "Atenciosamente,\n" +
                "Postos Graciosa"
            );

        },


        agradecimento: function (context) {

            return (
                "Olá!\n\n" +
                "Agradecemos pelo contato e pelas informações encaminhadas." +
                (context
                    ? "\n\n" + context
                    : "") +
                "\n\n" +
                "Permanecemos à disposição caso seja necessário algum auxílio adicional.\n\n" +
                "Atenciosamente,\n" +
                "Postos Graciosa"
            );

        },


        personalizada: function (context) {

            if (!context) {

                return (
                    "Olá!\n\n" +
                    "Por favor, informe os detalhes que deverão constar na resposta."
                );

            }


            return (
                "Olá!\n\n" +
                context +
                "\n\n" +
                "Permanecemos à disposição para quaisquer esclarecimentos.\n\n" +
                "Atenciosamente,\n" +
                "Postos Graciosa"
            );

        }

    };



    /* ========================================
       GERAR RESPOSTA
    ======================================== */

    if (
        generateResponse &&
        aiSituation &&
        aiContext &&
        aiResult
    ) {


        generateResponse.addEventListener(
            "click",
            function () {

                const situation =
                    aiSituation.value;

                const context =
                    aiContext.value.trim();


                if (!situation) {

                    showAIMessage(
                        "Selecione o tipo de resposta."
                    );

                    aiSituation.focus();

                    return;

                }


                const template =
                    responseTemplates[
                        situation
                    ];


                if (
                    typeof template !== "function"
                ) {

                    return;

                }


                currentResponse =
                    template(context);


                aiResult.innerHTML = "";


                const responseText =
                    document.createElement(
                        "div"
                    );


                responseText.className =
                    "ai-generated-text";


                responseText.textContent =
                    currentResponse;


                aiResult.appendChild(
                    responseText
                );


                if (
                    aiResultActions
                ) {

                    aiResultActions.classList.add(
                        "visible"
                    );

                }


                aiResult.classList.add(
                    "has-result"
                );

            }
        );

    }



    /* ========================================
       MENSAGEM DE ERRO / AVISO
    ======================================== */

    function showAIMessage(message) {

        if (!aiResult) {
            return;
        }


        aiResult.innerHTML = "";


        const messageElement =
            document.createElement(
                "div"
            );


        messageElement.className =
            "ai-message";


        messageElement.textContent =
            message;


        aiResult.appendChild(
            messageElement
        );


        aiResult.classList.remove(
            "has-result"
        );


        if (aiResultActions) {

            aiResultActions.classList.remove(
                "visible"
            );

        }

    }



    /* ========================================
       LIMPAR RESPOSTA
    ======================================== */

    if (
        clearResponse
    ) {

        clearResponse.addEventListener(
            "click",
            function () {

                if (aiSituation) {

                    aiSituation.value =
                        "";

                }


                if (aiContext) {

                    aiContext.value =
                        "";

                }


                currentResponse =
                    "";


                if (aiResult) {

                    aiResult.innerHTML = `

                        <div class="ai-result-placeholder">

                            <svg
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >

                                <path d="M5 5h14v14H5z" />

                                <path d="M8 9h8" />

                                <path d="M8 13h5" />

                            </svg>

                            <span>
                                A resposta gerada aparecerá aqui.
                            </span>

                        </div>

                    `;


                    aiResult.classList.remove(
                        "has-result"
                    );

                }


                if (aiResultActions) {

                    aiResultActions.classList.remove(
                        "visible"
                    );

                }

            }
        );

    }



    /* ========================================
       COPIAR RESPOSTA
    ======================================== */

    if (
        copyResponse
    ) {

        copyResponse.addEventListener(
            "click",
            async function () {

                if (!currentResponse) {
                    return;
                }


                try {

                    await navigator.clipboard.writeText(
                        currentResponse
                    );


                    const original =
                        copyResponse.innerHTML;


                    copyResponse.innerHTML =
                        "✓ Resposta copiada";


                    copyResponse.classList.add(
                        "copied"
                    );


                    setTimeout(
                        function () {

                            copyResponse.innerHTML =
                                original;

                            copyResponse.classList.remove(
                                "copied"
                            );

                        },
                        1800
                    );


                } catch (error) {

                    /*
                       Fallback para navegadores
                       que bloqueiam Clipboard API.
                    */

                    const temporary =
                        document.createElement(
                            "textarea"
                        );


                    temporary.value =
                        currentResponse;


                    document.body.appendChild(
                        temporary
                    );


                    temporary.select();


                    try {

                        document.execCommand(
                            "copy"
                        );

                    } catch (e) {

                        console.warn(
                            "Não foi possível copiar a resposta."
                        );

                    }


                    temporary.remove();

                }

            }
        );

    }



    /* ========================================
       ANIMAÇÃO DOS CARDS
    ======================================== */

    const toolCards =
        document.querySelectorAll(
            ".tool-card"
        );


    toolCards.forEach(
        function (card) {

            card.addEventListener(
                "mouseenter",
                function () {

                    card.classList.add(
                        "is-hovered"
                    );

                }
            );


            card.addEventListener(
                "mouseleave",
                function () {

                    card.classList.remove(
                        "is-hovered"
                    );

                }
            );

        }
    );

});
