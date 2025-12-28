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