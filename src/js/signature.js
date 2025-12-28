/* ============================================================
   SIGNATURE ENODIS – TECHNICIEN & CLIENT
   Compatible tablette / smartphone / desktop
   ============================================================ */

function initSignatureCanvas(canvasId) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext("2d");

    // Ajuste la taille réelle du canvas
    function resize() {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
    }

    resize();
    window.addEventListener("resize", resize);

    let drawing = false;

    const getPos = (e) => {
        const rect = canvas.getBoundingClientRect();
        const touch = e.touches ? e.touches[0] : null;
        const clientX = touch ? touch.clientX : e.clientX;
        const clientY = touch ? touch.clientY : e.clientY;
        return {
            x: clientX - rect.left,
            y: clientY - rect.top
        };
    };

    const startDraw = (e) => {
        drawing = true;
        const pos = getPos(e);
        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y);
    };

    const draw = (e) => {
        if (!drawing) return;
        const pos = getPos(e);
        ctx.lineTo(pos.x, pos.y);
        ctx.strokeStyle = "#000";
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.stroke();
    };

    const endDraw = () => drawing = false;

    // Souris
    canvas.addEventListener("mousedown", startDraw);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", endDraw);

    // Touch
    canvas.addEventListener("touchstart", (e) => { e.preventDefault(); startDraw(e); });
    canvas.addEventListener("touchmove", (e) => { e.preventDefault(); draw(e); });
    canvas.addEventListener("touchend", (e) => { e.preventDefault(); endDraw(); });

    // Fonction effacer
    return () => ctx.clearRect(0, 0, canvas.width, canvas.height);
}

/* ============================================================
   UTILITAIRES SIGNATURE
   ============================================================ */

function dataURLFromCanvas(id) {
    return document.getElementById(id).toDataURL("image/png");
}

function emptyCanvas(id) {
    const canvas = document.getElementById(id);
    const tmp = document.createElement("canvas");
    tmp.width = canvas.width;
    tmp.height = canvas.height;
    return tmp.toDataURL();
}

/* ============================================================
   INITIALISATION DES SIGNATURES
   ============================================================ */

window.addEventListener("load", () => {

    const clearTech = initSignatureCanvas("signatureTech");
    const clearClient = initSignatureCanvas("signatureClient");

    document.querySelector('button[data-clear="signatureTech"]').onclick = clearTech;
    document.querySelector('button[data-clear="signatureClient"]').onclick = clearClient;

    // Le bouton PDF est géré dans pdf-export.js
});