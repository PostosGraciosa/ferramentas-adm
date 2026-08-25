// ============================================
// FERRAMENTAS ADM
// ============================================

document.addEventListener("DOMContentLoaded", () => {

    console.log("================================");
    console.log("Ferramentas ADM");
    console.log("Página inicial carregada");
    console.log("================================");


    // ========================================
    // VERIFICA LINKS
    // ========================================

    const ferramentas = document.querySelectorAll(".tool-card");


    ferramentas.forEach((ferramenta) => {

        ferramenta.addEventListener("click", () => {

            console.log(
                "Abrindo ferramenta:",
                ferramenta.querySelector("h4")?.textContent.trim()
            );

        });

    });


});
/* ============================================
   DROPDOWN - ADMINISTRADORAS / PORTAIS
============================================ */

document.addEventListener("DOMContentLoaded", function () {

    const portalButton = document.getElementById("portalButton");
    const portalDropdown = document.querySelector(".portal-dropdown");

    if (!portalButton || !portalDropdown) {
        return;
    }


    /* ========================================
       ABRIR / FECHAR
    ======================================== */

    portalButton.addEventListener("click", function (event) {

        event.stopPropagation();

        portalDropdown.classList.toggle("active");

    });


    /* ========================================
       FECHAR AO CLICAR FORA
    ======================================== */

    document.addEventListener("click", function (event) {

        if (!portalDropdown.contains(event.target)) {

            portalDropdown.classList.remove("active");

        }

    });


    /* ========================================
       FECHAR COM ESC
    ======================================== */

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {

            portalDropdown.classList.remove("active");

        }

    });

});
