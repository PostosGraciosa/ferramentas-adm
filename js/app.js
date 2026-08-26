/* ============================================
   FERRAMENTAS ADM
   SISTEMA CORPORATIVO
   APP.JS
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

    const searchInput =
        document.getElementById("toolSearch");

    const noResults =
        document.getElementById("noResults");

    const categories =
        document.querySelectorAll(".category");


    /* ========================================
       DROPDOWN
       ADMINISTRADORAS / PORTAIS
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

                    portalButton.focus();

                }

            }
        );


        /* ====================================
           FECHAR AO SELECIONAR PORTAL
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
       BUSCA DE FERRAMENTAS
    ======================================== */

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            function () {

                const search =
                    searchInput.value
                        .toLowerCase()
                        .normalize("NFD")
                        .replace(
                            /[\u0300-\u036f]/g,
                            ""
                        )
                        .trim();


                let totalResults = 0;


                /* =================================
                   CADA CATEGORIA
                ================================= */

                categories.forEach(
                    function (category) {

                        const categoryText =
                            category
                                .innerText
                                .toLowerCase()
                                .normalize("NFD")
                                .replace(
                                    /[\u0300-\u036f]/g,
                                    ""
                                );


                        const items =
                            category.querySelectorAll(
                                ".tool-card, .portal-item"
                            );


                        let categoryResults = 0;


                        /* =============================
                           SEM BUSCA
                        ============================= */

                        if (!search) {

                            items.forEach(
                                function (item) {

                                    item.style.display = "";

                                }
                            );

                            category.style.display = "";

                            return;

                        }


                        /* =============================
                           BUSCAR ITENS
                        ============================= */

                        items.forEach(
                            function (item) {

                                const itemText =
                                    (
                                        item.dataset.search ||
                                        item.innerText ||
                                        ""
                                    )
                                    .toLowerCase()
                                    .normalize("NFD")
                                    .replace(
                                        /[\u0300-\u036f]/g,
                                        ""
                                    );


                                const matches =
                                    itemText.includes(search) ||
                                    categoryText.includes(search);


                                if (matches) {

                                    item.style.display = "";
                                    categoryResults++;
                                    totalResults++;

                                } else {

                                    item.style.display = "none";

                                }

                            }
                        );


                        /* =============================
                           CATEGORIA
                        ============================= */

                        if (categoryResults > 0) {

                            category.style.display = "";

                        } else {

                            category.style.display = "none";

                        }

                    }
                );


                /* =================================
                   RESULTADO
                ================================= */

                if (noResults) {

                    if (
                        search &&
                        totalResults === 0
                    ) {

                        noResults.classList.add(
                            "visible"
                        );

                    } else {

                        noResults.classList.remove(
                            "visible"
                        );

                    }

                }

            }
        );


        /* ====================================
           ATALHO /
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

                    searchInput.focus();

                }

            }
        );

    }


    /* ========================================
       FALLBACK DOS ÍCONES DOS PORTAIS
    ======================================== */

    const portalIcons =
        document.querySelectorAll(
            ".portal-item-icon img"
        );


    portalIcons.forEach(
        function (img) {

            img.addEventListener(
                "error",
                function () {

                    this.style.display = "none";

                    const fallback =
                        this.parentElement.querySelector(
                            ".portal-fallback"
                        );

                    if (fallback) {

                        fallback.style.display = "flex";

                    }

                }
            );

        }
    );


});
