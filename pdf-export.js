/* ============================================================
   EXPORT PDF – VERSION INSTITUTIONNELLE ENODIS
   Chargement automatique du PDF modèle depuis /pdf/pv_modele.pdf
   Utilise PDF_FIELDS (mapping-coordonnées.js)
   ============================================================ */

async function genererPdf() {

    /* ------------------------------------------------------------
       1. Chargement automatique du PDF modèle
       ------------------------------------------------------------ */
    const pdfUrl = "pdf/pv_modele.pdf";   // PDF institutionnel
    const pdfBytes = await fetch(pdfUrl).then(res => res.arrayBuffer());
    const pdfDoc = await PDFLib.PDFDocument.load(pdfBytes);
    const page = pdfDoc.getPages()[0];
    const { rgb } = PDFLib;

    /* ------------------------------------------------------------
       2. Vérification des champs obligatoires
       ------------------------------------------------------------ */
    const requiredFields = [
        "date", "nomClient", "adresse", "ville", "representant",
        "nomTech", "nomClientSign"
    ];

    for (const id of requiredFields) {
        const el = document.getElementById(id);
        if (!el || !el.value.trim()) {
            alert("Merci de compléter tous les champs obligatoires avant de générer le PDF.");
            return;
        }
    }

    /* ------------------------------------------------------------
       3. Vérification signatures
       ------------------------------------------------------------ */
    const techEmpty = document.getElementById("signatureTech").toDataURL() === emptyCanvas("signatureTech");
    const clientEmpty = document.getElementById("signatureClient").toDataURL() === emptyCanvas("signatureClient");

    if (techEmpty || clientEmpty) {
        alert("Merci de compléter les signatures avant de générer le PDF.");
        return;
    }

    /* ------------------------------------------------------------
       4. Fonction d’écriture générique
       ------------------------------------------------------------ */
    const write = (txt, field) => {
        page.drawText(txt || "", {
            x: field.x,
            y: field.y,
            size: field.size || 10,
            color: rgb(0, 0, 0)
        });
    };

    /* ------------------------------------------------------------
       5. Écriture automatique de tous les champs texte
       ------------------------------------------------------------ */
    for (const key in PDF_FIELDS) {
        if (!key.startsWith("signature")) {
            const input = document.getElementById(key);
            if (input) write(input.value, PDF_FIELDS[key]);
        }
    }

    /* ------------------------------------------------------------
       6. Signatures
       ------------------------------------------------------------ */
    const techPng = await pdfDoc.embedPng(
        await (await fetch(dataURLFromCanvas("signatureTech"))).arrayBuffer()
    );

    const clientPng = await pdfDoc.embedPng(
        await (await fetch(dataURLFromCanvas("signatureClient"))).arrayBuffer()
    );

    page.drawImage(techPng, PDF_FIELDS.signatureTech);
    page.drawImage(clientPng, PDF_FIELDS.signatureClient);

    /* ------------------------------------------------------------
       7. Export du PDF final
       ------------------------------------------------------------ */
    const pdfFinal = await pdfDoc.save();
    const blob = new Blob([pdfFinal], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `PV_installation_${document.getElementById("nomClient").value}.pdf`;
    a.click();

    URL.revokeObjectURL(url);
}