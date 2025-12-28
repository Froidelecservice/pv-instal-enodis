document.addEventListener("DOMContentLoaded", () => {

    /* ------------------------------------------------------------
       1. Sauvegarde automatique des champs
       ------------------------------------------------------------ */
    const fields = document.querySelectorAll("input, textarea");

    fields.forEach(field => {
        const saved = localStorage.getItem(field.id);
        if (saved) field.value = saved;

        field.addEventListener("input", () => {
            localStorage.setItem(field.id, field.value);
        });
    });

    /* ------------------------------------------------------------
       2. Bouton d’export PDF
       ------------------------------------------------------------ */
    document.getElementById("genererPdf").addEventListener("click", genererPdf);
});