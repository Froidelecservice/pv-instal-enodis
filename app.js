document.addEventListener("DOMContentLoaded", () => {

    /* ------------------------------------------------------------
       1. Champs vides au démarrage
       ------------------------------------------------------------ */
    const fields = document.querySelectorAll("input, textarea");

    fields.forEach(field => {
        field.value = ""; // Toujours vide au chargement

        field.addEventListener("input", () => {
            localStorage.setItem(field.id, field.value);
        });
    });

    /* ------------------------------------------------------------
       2. Bouton d’export PDF
       ------------------------------------------------------------ */
    document.getElementById("genererPdf").addEventListener("click", genererPdf);
});
/* ------------------------------------------------------------
   Bouton "Installer l'application"
------------------------------------------------------------ */
let deferredPrompt;
const installBtn = document.getElementById("installBtn");

window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installBtn.style.display = "block"; // Affiche le bouton
});

installBtn.addEventListener("click", async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const result = await deferredPrompt.userChoice;

    deferredPrompt = null;
    installBtn.style.display = "none";
});