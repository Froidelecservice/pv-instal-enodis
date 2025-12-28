document.addEventListener("DOMContentLoaded", () => {
    const pdfViewer = document.getElementById("pdfViewer");

    // Charge automatiquement le PDF modèle institutionnel
    pdfViewer.src = "pdf/pv_modele.pdf";

    // Bouton export
    document.getElementById("genererPdf").addEventListener("click", genererPdf);
});