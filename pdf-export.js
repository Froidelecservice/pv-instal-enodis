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
       3. Vérification signatures (méthode robuste)
       ------------------------------------------------------------ */
    if (isCanvasEmpty("signatureTech") || isCanvasEmpty("signatureClient")) {
        alert("Merci de compléter les signatures avant de générer le PDF.");
        return;
    }

    function isCanvasEmpty(id) {
        const canvas = document.getElementById(id);
        const ctx = canvas.getContext("2d");
        const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

        // Si tous les pixels sont transparents → signature vide
        return !pixels.some(v => v !== 0);
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
            if (input) {
                write(input.value, PDF_FIELDS[key]);
            } else {
                console.warn("Champ non trouvé dans le HTML :", key);
            }
        }
    }

    /* ------------------------------------------------------------
       6. Signatures (version optimisée sans fetch)
       ------------------------------------------------------------ */
    function dataURLToUint8Array(dataURL) {
        const base64 = dataURL.split(",")[1];
        const binary = atob(base64);
        const len = binary.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) bytes[i] = binary.charCodeAt(i);
        return bytes;
    }

    const techPngBytes = dataURLToUint8Array(dataURLFromCanvas("signatureTech"));
    const clientPngBytes = dataURLToUint8Array(dataURLFromCanvas("signatureClient"));

    const techPng = await pdfDoc.embedPng(techPngBytes);
    const clientPng = await pdfDoc.embedPng(clientPngBytes);

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