```javascript
/* ============================================
   FERRAMENTAS ADM
   SISTEMA CORPORATIVO
============================================ */


/* ============================================
   DROPDOWN
   ADMINISTRADORAS / PORTAIS
============================================ */

document.addEventListener(
    "DOMContentLoaded",
    function () {


        const portalButton =
            document.getElementById(
                "portalButton"
            );


        const portalDropdown =
            document.querySelector(
                ".portal-dropdown"
            );


        /* ========================================
           VERIFICAR ELEMENTOS
        ======================================== */

        if (
            !portalButton ||
            !portalDropdown
        ) {

            return;

        }


        /* ========================================
           ABRIR / FECHAR
        ======================================== */

        portalButton.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

                portalDropdown.classList.toggle(
                    "active"
                );

            }
        );


        /* ========================================
           FECHAR AO CLICAR FORA
        ======================================== */

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
           FECHAR AO ABRIR UM PORTAL
        ======================================== */

        const portalItems =
            document.querySelectorAll(
                ".portal-item"
            );


        portalItems.forEach(
            function (item) {

                item.addEventListener(
                    "click",
                    function () {

                        portalDropdown.classList.remove(
                            "active"
                        );

                    }
                );

            }
        );


    }
);
```
