/* ============================================
   FERRAMENTAS ADM
   SISTEMA CORPORATIVO
   JAVASCRIPT PRINCIPAL
============================================ */

document.addEventListener("DOMContentLoaded", function () {


    /* ========================================
       ELEMENTOS
    ======================================== */

    const portalButton =
        document.getElementById("portalButton");

    const portalDropdown =
        document.querySelector(".portal-dropdown");

    const portalList =
        document.getElementById("portalList");

    const toolSearch =
        document.getElementById("toolSearch");

    const noResults =
        document.getElementById("noResults");

    const aiQuestion =
        document.getElementById("aiQuestion");

    const aiButton =
        document.getElementById("aiButton");

    const suggestions =
        document.querySelectorAll(".suggestion");


    /* ========================================
       DROPDOWN
    ======================================== */

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

                const isOpen =
                    portalDropdown.classList.toggle("active");

                portalButton.setAttribute(
                    "aria-expanded",
                    isOpen ? "true" : "false"
                );

            }
        );


        /* ====================================
           FECHAR AO CLICAR FORA
        ==================================== */

        document.addEventListener(
            "click",
            function (event) {

                if (
                    !portalDropdown.contains(
                        event.target
                    )
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


        /* ====================================
           ESC
        ==================================== */

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


        /* ====================================
           PORTAL CLICADO
        ==================================== */

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
       BUSCA
    ======================================== */

    function normalizeText(text) {

        return text
            .toLowerCase()
            .normalize("NFD")
            .replace(
                /[\u0300-\u036f]/g,
                ""
            )
            .trim();

    }


    function performSearch() {


        if (!toolSearch) {
            return;
        }


        const search =
            normalizeText(
                toolSearch.value
            );


        const categories =
            document.querySelectorAll(
                ".category"
            );


        let totalVisible = 0;


        categories.forEach(
            function (category) {


                const categoryText =
                    normalizeText(
                        category.innerText +
                        " " +
                        (
                            category.dataset.category ||
                            ""
                        )
                    );


                const cards =
                    category.querySelectorAll(
                        ".tool-card"
                    );


                const portals =
                    category.querySelectorAll(
                        ".portal-item"
                    );


                let visibleItems = 0;


                /* ==============================
                   CARDS
                ============================== */

                cards.forEach(
                    function (card) {

                        const text =
                            normalizeText(
                                (
                                    card.innerText ||
                                    ""
                                ) +
                                " " +
                                (
                                    card.dataset.search ||
                                    ""
                                )
                            );


                        const match =
                            !search ||
                            text.includes(search);


                        card.style.display =
                            match
                                ? ""
                                : "none";


                        if (match) {
                            visibleItems++;
                            totalVisible++;
                        }

                    }
                );



                /* ==============================
                   PORTAIS
                ============================== */

                portals.forEach(
                    function (portal) {

                        const text =
                            normalizeText(
                                (
                                    portal.innerText ||
                                    ""
                                ) +
                                " " +
                                (
                                    portal.dataset.search ||
                                    ""
                                )
                            );


                        const match =
                            !search ||
                            text.includes(search);


                        portal.style.display =
                            match
                                ? ""
                                : "none";


                        if (match) {
                            visibleItems++;
                            totalVisible++;
                        }

                    }
                );



                /* ==============================
                   DROPDOWN
                ============================== */

                const portalDropdownElement =
                    category.querySelector(
                        ".portal-dropdown"
                    );


                if (
                    portalDropdownElement &&
                    search
                ) {

                    const portalMatches =
                        Array.from(
                            portals
                        ).some(
                            function (portal) {

                                return (
                                    portal.style.display !==
                                    "none"
                                );

                            }
                        );


                    const categoryMatches =
                        categoryText.includes(
                            search
                        );


                    if (
                        portalMatches ||
                        categoryMatches
                    ) {

                        category.style.display =
                            "";

                    }
                    else {

                        category.style.display =
                            "none";

                    }

                }
                else {

                    category.style.display =
                        visibleItems > 0 ||
                        !search;

                }

            }
        );



        /* ====================================
           RESULTADO VAZIO
        ==================================== */

        if (noResults) {

            noResults.style.display =
                totalVisible === 0 && search
                    ? "flex"
                    : "none";

        }

    }


    if (toolSearch) {

        toolSearch.addEventListener(
            "input",
            performSearch
        );

    }



    /* ========================================
       ATALHO /
    ======================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            const activeElement =
                document.activeElement;


            const isTyping =
                activeElement &&
                (
                    activeElement.tagName === "INPUT" ||
                    activeElement.tagName === "TEXTAREA"
                );


            if (
                event.key === "/" &&
                !isTyping &&
                toolSearch
            ) {

                event.preventDefault();

                toolSearch.focus();

            }

        }
    );



    /* ========================================
       ASSISTENTE CHATGPT
    ======================================== */

    function openChatGPT(question) {


        const cleanQuestion =
            (question || "").trim();


        /*
         * Sem API.
         *
         * A pergunta é enviada para a página
         * do ChatGPT através do parâmetro q.
         *
         * Não existe chave de API no código.
         */


        let url =
            "https://chatgpt.com/";


        if (cleanQuestion) {

            url +=
                "?q=" +
                encodeURIComponent(
                    cleanQuestion
                );

        }


        window.open(
            url,
            "_blank",
            "noopener,noreferrer"
        );

    }



    /* ========================================
       BOTÃO CHATGPT
    ======================================== */

    if (aiButton) {

        aiButton.addEventListener(
            "click",
            function () {

                const question =
                    aiQuestion
                        ? aiQuestion.value
                        : "";


                openChatGPT(
                    question
                );

            }
        );

    }



    /* ========================================
       ENTER NA CAIXA DA IA
    ======================================== */

    if (aiQuestion) {

        aiQuestion.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Enter"
                ) {

                    event.preventDefault();

                    openChatGPT(
                        aiQuestion.value
                    );

                }

            }
        );

    }



    /* ========================================
       SUGESTÕES RÁPIDAS
    ======================================== */

    suggestions.forEach(
        function (suggestion) {

            suggestion.addEventListener(
                "click",
                function () {

                    const question =
                        suggestion.dataset.question ||
                        "";


                    if (aiQuestion) {

                        aiQuestion.value =
                            question;

                    }


                    openChatGPT(
                        question
                    );

                }
            );

        }
    );



    /* ========================================
       FALLBACK DOS FAVICONS
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

                    const container =
                        image.parentElement;


                    if (
                        container &&
                        !container.classList.contains(
                            "favicon-error"
                        )
                    ) {

                        container.classList.add(
                            "favicon-error"
                        );

                        image.style.display =
                            "none";

                    }

                }
            );

        }
    );


});
