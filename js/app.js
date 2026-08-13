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
