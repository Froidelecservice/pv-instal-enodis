document.querySelectorAll("canvas").forEach(canvas => {

    // Fixe la taille réelle du canvas (important pour tablette)
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const ctx = canvas.getContext("2d");
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.strokeStyle = "black";

    let drawing = false;
    let lastPos = { x: 0, y: 0 };

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
        lastPos = getPos(e);
        e.preventDefault();
    }

    function stop() {
        drawing = false;
    }

    function draw(e) {
        if (!drawing) return;

        const pos = getPos(e);

        ctx.beginPath();
        ctx.moveTo(lastPos.x, lastPos.y);
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();

        lastPos = pos;
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