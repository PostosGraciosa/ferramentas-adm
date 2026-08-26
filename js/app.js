/* ============================================
   FERRAMENTAS ADM
   SISTEMA CORPORATIVO
============================================ */


/* ============================================
   INICIALIZAÇÃO
============================================ */

document.addEventListener("DOMContentLoaded", function () {


    /* ========================================
       ELEMENTOS DO DROPDOWN
       ADMINISTRADORAS / PORTAIS
    ======================================== */

    const portalButton =
        document.getElementById("portalButton");

    const portalDropdown =
        document.querySelector(".portal-dropdown");

    const portalList =
        document.getElementById("portalList");


    /* ========================================
       VERIFICAÇÃO
    ======================================== */

    if (
        !portalButton ||
        !portalDropdown ||
        !portalList
    ) {

        console.warn(
            "Dropdown de administradoras não encontrado."
        );

        return;

    }


    /* ========================================
       ABRIR / FECHAR DROPDOWN
    ======================================== */

    portalButton.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            event.stopPropagation();

            portalDropdown.classList.toggle("active");

        }
    );


    /* ========================================
       FECHAR AO CLICAR FORA
    ======================================== */

    document.addEventListener(
        "click",
        function (event) {

            if (
                !portalDropdown.contains(event.target)
            ) {

                portalDropdown.classList.remove(
                    "active"
                );

            }

        }
    );


    /* ========================================
       FECHAR COM ESC
    ======================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape"
            ) {

                portalDropdown.classList.remove(
                    "active"
                );

            }

        }
    );


    /* ========================================
       PORTAIS
    ======================================== */

    const portalItems =
        portalList.querySelectorAll(
            ".portal-item"
        );


    portalItems.forEach(
        function (item) {

            item.addEventListener(
                "click",
                function () {

                    /*
                        Pequeno atraso para permitir
                        que o navegador abra o link
                        normalmente.
                    */

                    setTimeout(
                        function () {

                            portalDropdown.classList.remove(
                                "active"
                            );

                        },
                        100
                    );

                }
            );

        }
    );


});
