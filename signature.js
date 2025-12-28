document.querySelectorAll("canvas").forEach(canvas => {
    const ctx = canvas.getContext("2d");
    let drawing = false;

    canvas.addEventListener("mousedown", () => drawing = true);
    canvas.addEventListener("mouseup", () => drawing = false);
    canvas.addEventListener("mouseleave", () => drawing = false);

    canvas.addEventListener("mousemove", e => {
        if (!drawing) return;
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.arc(e.offsetX, e.offsetY, 2, 0, Math.PI * 2);
        ctx.fill();
    });
});

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