document.querySelectorAll("canvas").forEach(canvas => {

    // Fixe la taille réelle du canvas (important pour tablette)
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const ctx = canvas.getContext("2d");
    let drawing = false;

    function getPos(e) {
        if (e.touches) {
            const rect = canvas.getBoundingClientRect();
            return {
                x: e.touches[0].clientX - rect.left,
                y: e.touches[0].clientY - rect.top
            };
        }
        return { x: e.offsetX, y: e.offsetY };
    }

    function start(e) {
        drawing = true;
        e.preventDefault();
    }

    function stop() {
        drawing = false;
    }

    function draw(e) {
        if (!drawing) return;
        const pos = getPos(e);
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 2, 0, Math.PI * 2);
        ctx.fill();
        e.preventDefault();
    }

    // Souris
    canvas.addEventListener("mousedown", start);
    canvas.addEventListener("mouseup", stop);
    canvas.addEventListener("mouseleave", stop);
    canvas.addEventListener("mousemove", draw);

    // Tactile
    canvas.addEventListener("touchstart", start);
    canvas.addEventListener("touchend", stop);
    canvas.addEventListener("touchcancel", stop);
    canvas.addEventListener("touchmove", draw);
});

// Effacement
document.querySelectorAll(".btn-clear").forEach(btn => {
    btn.addEventListener("click", () => {
        const id = btn.dataset.clear;
        const canvas = document.getElementById(id);
        canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
    });
});

function dataURLFromCanvas(id) {
    return document.getElementById(id).toDataURL("image/png");
}