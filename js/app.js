/* ============================================
   FERRAMENTAS ADM
   POSTOS GRACIOSA
   SISTEMA CORPORATIVO
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

        /* ------------------------------------
           ABRIR / FECHAR
        ------------------------------------ */

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


        /* ------------------------------------
           FECHAR AO CLICAR FORA
        ------------------------------------ */

        document.addEventListener(
            "click",
            function (event) {

                if (
                    !portalDropdown.contains(event.target)
                ) {

                    fecharPortal();

                }

            }
        );


        /* ------------------------------------
           ESC
        ------------------------------------ */

        document.addEventListener(
            "keydown",
            function (event) {

                if (event.key === "Escape") {

                    fecharPortal();

                }

            }
        );


        /* ------------------------------------
           FECHAR FUNÇÃO
        ------------------------------------ */

        function fecharPortal() {

            portalDropdown.classList.remove("active");

            portalButton.setAttribute(
                "aria-expanded",
                "false"
            );

        }


        /* ------------------------------------
           LINKS DOS PORTAIS
        ------------------------------------ */

        const portalItems =
            portalList.querySelectorAll(".portal-item");


        portalItems.forEach(
            function (item) {

                item.addEventListener(
                    "click",
                    function () {

                        setTimeout(
                            fecharPortal,
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

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            function () {

                filtrarFerramentas(
                    this.value
                );

            }
        );


        /* ------------------------------------
           ATALHO /
        ------------------------------------ */

        document.addEventListener(
            "keydown",
            function (event) {

                /*
                    Não ativa o atalho quando
                    o usuário já está digitando
                    em outro campo.
                */

                const elemento =
                    document.activeElement;

                const estaDigitando =
                    elemento &&
                    (
                        elemento.tagName === "INPUT" ||
                        elemento.tagName === "TEXTAREA" ||
                        elemento.tagName === "SELECT"
                    );


                if (
                    event.key === "/" &&
                    !estaDigitando
                ) {

                    event.preventDefault();

                    searchInput.focus();

                }

            }
        );


        /* ------------------------------------
           ESC LIMPA BUSCA
        ------------------------------------ */

        searchInput.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Escape" &&
                    this.value
                ) {

                    this.value = "";

                    filtrarFerramentas("");

                    this.focus();

                }

            }
        );

    }


    /* ========================================
       FUNÇÃO DE FILTRAGEM
    ======================================== */

    function filtrarFerramentas(termo) {

        const busca =
            normalizar(termo);


        let encontrouResultado = false;


        categories.forEach(
            function (category) {

                const categoriaTexto =
                    normalizar(
                        category.dataset.category || ""
                    );


                const items =
                    category.querySelectorAll(
                        ".tool-card, .portal-item"
                    );


                let encontrouNaCategoria =
                    false;


                /* --------------------------------
                   CATEGORIA SEM ITENS
                -------------------------------- */

                if (!items.length) {

                    if (
                        !busca ||
                        categoriaTexto.includes(busca)
                    ) {

                        category.style.display = "";

                        encontrouResultado = true;

                    } else {

                        category.style.display = "none";

                    }

                    return;

                }


                /* --------------------------------
                   FILTRAR ITENS
                -------------------------------- */

                items.forEach(
                    function (item) {

                        const texto =
                            normalizar(
                                item.innerText +
                                " " +
                                (item.dataset.search || "")
                            );


                        const corresponde =
                            !busca ||
                            texto.includes(busca);


                        if (corresponde) {

                            item.style.display = "";

                            encontrouNaCategoria =
                                true;

                            encontrouResultado =
                                true;

                        } else {

                            item.style.display = "none";

                        }

                    }
                );


                /* --------------------------------
                   MOSTRAR / ESCONDER CATEGORIA
                -------------------------------- */

                if (encontrouNaCategoria) {

                    category.style.display = "";

                } else {

                    category.style.display = "none";

                }

            }
        );


        /* =====================================
           NENHUM RESULTADO
        ===================================== */

        if (noResults) {

            noResults.classList.toggle(
                "active",
                !encontrouResultado
            );

        }

    }


    /* ========================================
       NORMALIZA TEXTO
    ======================================== */

    function normalizar(texto) {

        return String(texto)
            .toLowerCase()
            .normalize("NFD")
            .replace(
                /[\u0300-\u036f]/g,
                ""
            )
            .trim();

    }


    /* ========================================
       ANIMAÇÃO DE ENTRADA
    ======================================== */

    const cards =
        document.querySelectorAll(
            ".tool-card, .portal-dropdown"
        );


    cards.forEach(
        function (elemento, index) {

            elemento.style.setProperty(
                "--animation-delay",
                `${index * 35}ms`
            );

        }
    );


    /* ========================================
       LOGO
    ======================================== */

    const logo =
        document.querySelector(".brand-logo img");


    if (logo) {

        logo.addEventListener(
            "error",
            function () {

                this.style.display = "none";

                this.parentElement.classList.add(
                    "logo-error"
                );

            }
        );

    }


});
