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

    const toolsSection =
        document.getElementById("toolsSection");

    const noResults =
        document.getElementById("noResults");


    /* ========================================
       DROPDOWN — ADMINISTRADORAS
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

                const isActive =
                    portalDropdown.classList.toggle("active");

                portalButton.setAttribute(
                    "aria-expanded",
                    isActive ? "true" : "false"
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
                    !portalDropdown.contains(event.target)
                ) {

                    portalDropdown.classList.remove("active");

                    portalButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }

            }
        );


        /* ====================================
           FECHAR AO ESC
        ==================================== */

        document.addEventListener(
            "keydown",
            function (event) {

                if (event.key === "Escape") {

                    portalDropdown.classList.remove("active");

                    portalButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }

            }
        );


        /* ====================================
           PORTAIS
        ==================================== */

        const portalItems =
            portalList.querySelectorAll(".portal-item");


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

    if (
        toolSearch &&
        toolsSection
    ) {

        const categories =
            toolsSection.querySelectorAll(".category");


        const searchableItems =
            toolsSection.querySelectorAll(
                ".tool-card, .portal-item"
            );


        /* ====================================
           NORMALIZAR TEXTO
           Remove acentos para facilitar busca
        ==================================== */

        function normalizeText(text) {

            return text
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "");

        }


        /* ====================================
           EXECUTAR BUSCA
        ==================================== */

        function performSearch() {

            const searchValue =
                normalizeText(
                    toolSearch.value.trim()
                );


            let foundItems = 0;


            /* =================================
               SEM BUSCA
            ================================= */

            if (!searchValue) {

                searchableItems.forEach(
                    function (item) {

                        item.classList.remove(
                            "search-hidden"
                        );

                    }
                );


                categories.forEach(
                    function (category) {

                        category.classList.remove(
                            "search-hidden"
                        );

                    }
                );


                if (noResults) {

                    noResults.classList.remove(
                        "show"
                    );

                }


                return;

            }


            /* =================================
               BUSCAR CADA ITEM
            ================================= */

            searchableItems.forEach(
                function (item) {

                    const itemText =
                        normalizeText(
                            (
                                item.innerText +
                                " " +
                                (
                                    item.dataset.search || ""
                                )
                            )
                        );


                    const matches =
                        itemText.includes(searchValue);


                    if (matches) {

                        item.classList.remove(
                            "search-hidden"
                        );

                        foundItems++;

                    } else {

                        item.classList.add(
                            "search-hidden"
                        );

                    }

                }
            );


            /* =================================
               OCULTAR CATEGORIAS SEM RESULTADO
            ================================= */

            categories.forEach(
                function (category) {

                    const visibleItems =
                        category.querySelectorAll(
                            ".tool-card:not(.search-hidden), .portal-item:not(.search-hidden)"
                        );


                    const hasVisibleItem =
                        visibleItems.length > 0;


                    if (hasVisibleItem) {

                        category.classList.remove(
                            "search-hidden"
                        );

                    } else {

                        category.classList.add(
                            "search-hidden"
                        );

                    }

                }
            );


            /* =================================
               RESULTADO VAZIO
            ================================= */

            if (noResults) {

                if (foundItems === 0) {

                    noResults.classList.add(
                        "show"
                    );

                } else {

                    noResults.classList.remove(
                        "show"
                    );

                }

            }


            /* =================================
               ABRIR PORTAIS SE ENCONTRAR
               UM PORTAL NA BUSCA
            ================================= */

            const portalResults =
                portalList
                    ? portalList.querySelectorAll(
                        ".portal-item:not(.search-hidden)"
                    )
                    : [];


            if (
                portalDropdown &&
                portalButton &&
                portalResults.length > 0
            ) {

                portalDropdown.classList.add(
                    "active"
                );

                portalButton.setAttribute(
                    "aria-expanded",
                    "true"
                );

            }

        }


        /* ====================================
           EVENTO DE DIGITAÇÃO
        ==================================== */

        toolSearch.addEventListener(
            "input",
            performSearch
        );


        /* ====================================
           TECLA /
           FOCAR BUSCA
        ==================================== */

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
                        activeElement.isContentEditable
                    );


                if (
                    event.key === "/" &&
                    !isTyping
                ) {

                    event.preventDefault();

                    toolSearch.focus();

                }

            }
        );


        /* ====================================
           ESC NA BUSCA
        ==================================== */

        toolSearch.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Escape"
                ) {

                    toolSearch.value = "";

                    performSearch();

                    toolSearch.blur();

                }

            }
        );

    }


    /* ========================================
       LOGO FALLBACK
    ======================================== */

    const logo =
        document.querySelector(".brand-logo img");


    if (logo) {

        logo.addEventListener(
            "error",
            function () {

                this.style.display = "none";

                const parent =
                    this.parentElement;

                if (parent) {

                    parent.classList.add(
                        "logo-error"
                    );

                }

            }
        );

    }


    /* ========================================
       FECHAR DROPDOWN AO ABRIR OUTRA BUSCA
    ======================================== */

    if (
        toolSearch &&
        portalDropdown &&
        portalButton
    ) {

        toolSearch.addEventListener(
            "focus",
            function () {

                /*
                    Não abrimos o dropdown
                    automaticamente apenas
                    ao focar a busca.
                */

            }
        );

    }


});
