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

                if (event.key === "Escape") {

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
        document.querySelectorAll(".category");

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

                        const categoryText =
                            (
                                category.dataset.category ||
                                ""
                            ).toLowerCase();


                        const items =
                            category.querySelectorAll(
                                ".tool-card, .portal-item"
                            );


                        let categoryResults = 0;


                        items.forEach(
                            function (item) {

                                const itemText =
                                    (
                                        item.dataset.search ||
                                        item.textContent ||
                                        ""
                                    ).toLowerCase();


                                const match =
                                    !search ||
                                    itemText.includes(search);


                                item.style.display =
                                    match
                                        ? ""
                                        : "none";


                                if (match) {

                                    categoryResults++;

                                    totalResults++;

                                }

                            }
                        );


                        /*
                            Se pesquisar pelo nome
                            da categoria, mantém
                            seus itens visíveis.
                        */

                        if (
                            search &&
                            categoryText.includes(search)
                        ) {

                            items.forEach(
                                function (item) {

                                    item.style.display =
                                        "";

                                }
                            );

                            categoryResults =
                                items.length;

                        }


                        /*
                            Dropdown de portais
                        */

                        const isPortal =
                            category.classList.contains(
                                "category-portals"
                            );


                        if (isPortal) {

                            const portalItems =
                                category.querySelectorAll(
                                    ".portal-item"
                                );


                            if (
                                search &&
                                categoryText.includes(search)
                            ) {

                                portalItems.forEach(
                                    function (item) {

                                        item.style.display =
                                            "flex";

                                    }
                                );

                            }


                            const visiblePortals =
                                Array.from(
                                    portalItems
                                ).filter(
                                    function (item) {

                                        return (
                                            item.style.display !==
                                            "none"
                                        );

                                    }
                                );


                            categoryResults =
                                search
                                    ? visiblePortals.length
                                    : portalItems.length;

                        }


                        category.style.display =
                            categoryResults > 0
                                ? ""
                                : "none";

                    }
                );


                /*
                    Sem resultados
                */

                if (noResults) {

                    noResults.classList.toggle(
                        "show",
                        totalResults === 0 &&
                        search !== ""
                    );

                }

            }
        );

    }



    /* ========================================
       ATALHO "/" PARA BUSCA
    ======================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "/" &&
                !event.ctrlKey &&
                !event.altKey &&
                !event.metaKey
            ) {

                const active =
                    document.activeElement;

                const isTyping =
                    active &&
                    (
                        active.tagName === "INPUT" ||
                        active.tagName === "TEXTAREA"
                    );


                if (!isTyping && searchInput) {

                    event.preventDefault();

                    searchInput.focus();

                }

            }

        }
    );



    /* ========================================
       CHATGPT — RESPOSTA RÁPIDA
       SEM API
    ======================================== */

    const aiQuestion =
        document.getElementById("aiQuestion");

    const aiAskButton =
        document.getElementById("aiAskButton");

    const aiSuggestions =
        document.querySelectorAll(
            ".ai-suggestion"
        );


    /*
        Abre o ChatGPT com a pergunta
        preenchida na URL.

        Não utiliza API.
        Não utiliza chave.
        Não gera custo de API.
    */

    function abrirChatGPT() {

        if (!aiQuestion) {
            return;
        }


        const question =
            aiQuestion.value.trim();


        if (!question) {

            aiQuestion.focus();

            aiQuestion.classList.add(
                "ai-input-error"
            );


            setTimeout(
                function () {

                    aiQuestion.classList.remove(
                        "ai-input-error"
                    );

                },
                800
            );

            return;

        }


        const url =
            "https://chatgpt.com/?q=" +
            encodeURIComponent(question);


        window.open(
            url,
            "_blank",
            "noopener,noreferrer"
        );

    }


    if (aiAskButton) {

        aiAskButton.addEventListener(
            "click",
            abrirChatGPT
        );

    }


    /*
        Ctrl + Enter também envia
    */

    if (aiQuestion) {

        aiQuestion.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Enter" &&
                    event.ctrlKey
                ) {

                    event.preventDefault();

                    abrirChatGPT();

                }

            }
        );

    }


    /*
        Sugestões rápidas
    */

    aiSuggestions.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const question =
                        this.dataset.question || "";


                    if (aiQuestion) {

                        aiQuestion.value =
                            question;

                        aiQuestion.focus();

                    }

                }
            );

        }
    );



    /* ========================================
       FALLBACK DOS ÍCONES
       ADMINISTRADORAS
    ======================================== */

    const portalImages =
        document.querySelectorAll(
            ".portal-item-icon img"
        );


    portalImages.forEach(
        function (img) {

            img.addEventListener(
                "error",
                function () {

                    this.style.display =
                        "none";

                    const fallback =
                        this.parentElement.querySelector(
                            ".portal-fallback"
                        );


                    if (fallback) {

                        fallback.style.display =
                            "flex";

                    }

                }
            );


            /*
                Caso a imagem já esteja
                indisponível no carregamento.
            */

            if (
                img.complete &&
                img.naturalWidth === 0
            ) {

                img.style.display =
                    "none";


                const fallback =
                    img.parentElement.querySelector(
                        ".portal-fallback"
                    );


                if (fallback) {

                    fallback.style.display =
                        "flex";

                }

            }

        }
    );

});
