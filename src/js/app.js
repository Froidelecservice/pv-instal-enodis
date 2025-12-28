/* ============================================================
   APP.JS – INITIALISATION GLOBALE
   ============================================================ */

window.addEventListener("load", () => {

    console.log("PV Instal Enodis – Application chargée.");

    // Le bouton PDF est géré dans pdf-export.js
    const btn = document.getElementById("genererPdf");
    if (btn) {
        btn.addEventListener("click", genererPdf);
    }
});