/* ============================================
   FERRAMENTAS ADM
   SISTEMA CORPORATIVO
============================================ */


/* ============================================
   INICIALIZAÇÃO
============================================ */

document.addEventListener(
    "DOMContentLoaded",
    function () {


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
        ======================================== */

        if (
            portalButton &&
            portalDropdown &&
            portalList
        ) {


            /* ====================================
               ABRIR / FECHAR
            ==================================== */

            portalButton.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    event.stopPropagation();


                    const isOpen =
                        portalDropdown.classList.toggle(
                            "active"
                        );


                    portalButton.setAttribute(
                        "aria-expanded",
                        String(isOpen)
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

                        portalButton.focus();

                    }

                }
            );


            /* ====================================
               CLICAR NO PORTAL
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
           FAVICONS
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
                            image.closest(
                                ".portal-item-icon"
                            );

                        if (parent) {

                            parent.classList.add(
                                "icon-error"
                            );

                        }

                    }
                );


                /*
                    Se a imagem já tiver falhado
                    antes do listener ser registrado.
                */

                if (
                    image.complete &&
                    image.naturalWidth === 0
                ) {

                    const parent =
                        image.closest(
                            ".portal-item-icon"
                        );

                    if (parent) {

                        parent.classList.add(
                            "icon-error"
                        );

                    }

                }

            }
        );


        /* ========================================
           BUSCA
        ======================================== */

        if (searchInput) {


            searchInput.addEventListener(
                "input",
                function () {

                    const term =
                        normalizeText(
                            searchInput.value
                        );


                    let visibleCount = 0;


                    categories.forEach(
                        function (category) {


                            /*
                                A categoria dos portais
                                possui itens próprios.
                            */

                            const categoryText =
                                normalizeText(
                                    category.innerText
                                );


                            const categoryData =
                                normalizeText(
                                    category.dataset.category || ""
                                );


                            const searchableText =
                                categoryText +
                                " " +
                                categoryData;


                            let itemMatches = 0;


                            /*
                                CARDS
                            */

                            const cards =
                                category.querySelectorAll(
                                    ".tool-card"
                                );


                            cards.forEach(
                                function (card) {

                                    const text =
                                        normalizeText(
                                            card.innerText +
                                            " " +
                                            (
                                                card.dataset.search ||
                                                ""
                                            )
                                        );


                                    const match =
                                        term === "" ||
                                        text.includes(term);


                                    card.style.display =
                                        match
                                            ? ""
                                            : "none";


                                    if (match) {

                                        itemMatches++;

                                    }

                                }
                            );


                            /*
                                PORTAIS
                            */

                            const portals =
                                category.querySelectorAll(
                                    ".portal-item"
                                );


                            portals.forEach(
                                function (portal) {

                                    const text =
                                        normalizeText(
                                            portal.innerText +
                                            " " +
                                            (
                                                portal.dataset.search ||
                                                ""
                                            )
                                        );


                                    const match =
                                        term === "" ||
                                        text.includes(term);


                                    portal.style.display =
                                        match
                                            ? ""
                                            : "none";


                                    if (match) {

                                        itemMatches++;

                                    }

                                }
                            );


                            /*
                                QUANDO NÃO HÁ BUSCA
                                MOSTRA TUDO
                            */

                            if (term === "") {

                                category.style.display =
                                    "";

                                return;

                            }


                            /*
                                Se o termo estiver no
                                título da categoria ou
                                houver item encontrado.
                            */

                            const categoryMatch =
                                searchableText.includes(
                                    term
                                );


                            if (
                                itemMatches > 0 ||
                                categoryMatch
                            ) {

                                category.style.display =
                                    "";

                                visibleCount++;

                            } else {

                                category.style.display =
                                    "none";

                            }

                        }
                    );


                    /*
                        Verifica se há algum
                        resultado real.
                    */

                    const visibleCards =
                        document.querySelectorAll(
                            ".tool-card:not([style*='display: none'])"
                        );


                    const visiblePortals =
                        document.querySelectorAll(
                            ".portal-item:not([style*='display: none'])"
                        );


                    const hasResults =
                        term === "" ||
                        visibleCards.length > 0 ||
                        visiblePortals.length > 0;


                    if (noResults) {

                        noResults.classList.toggle(
                            "visible",
                            !hasResults
                        );

                    }


                    /*
                        Ao pesquisar uma administradora,
                        abre automaticamente o dropdown.
                    */

                    const portalCategory =
                        document.querySelector(
                            ".category-portals"
                        );


                    if (
                        portalCategory &&
                        portalDropdown
                    ) {

                        const visiblePortal =
                            portalCategory.querySelector(
                                ".portal-item:not([style*='display: none'])"
                            );


                        const portalSearchMatch =
                            term !== "" &&
                            visiblePortal;


                        if (
                            portalSearchMatch
                        ) {

                            portalDropdown.classList.add(
                                "active"
                            );

                            if (portalButton) {

                                portalButton.setAttribute(
                                    "aria-expanded",
                                    "true"
                                );

                            }

                        }

                    }

                }
            );


            /* ====================================
               TECLA /
            ==================================== */

            document.addEventListener(
                "keydown",
                function (event) {

                    const activeElement =
                        document.activeElement;


                    const isTyping =
                        activeElement &&
                        (
                            activeElement.tagName ===
                                "INPUT" ||
                            activeElement.tagName ===
                                "TEXTAREA"
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
           FUNÇÃO DE NORMALIZAÇÃO
        ======================================== */

        function normalizeText(text) {

            return String(text || "")
                .toLowerCase()
                .normalize("NFD")
                .replace(
                    /[\u0300-\u036f]/g,
                    ""
                )
                .trim();

        }


        /* ========================================
           LOG
        ======================================== */

        console.log(
            "Ferramentas ADM carregado com sucesso."
        );

    }
);
