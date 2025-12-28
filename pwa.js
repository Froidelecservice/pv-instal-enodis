// Enregistrement du service worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("../../service-worker.js")
      .then(() => console.log("Service worker enregistré"))
      .catch((err) => console.error("Erreur SW:", err));
  });
}

// Gestion installation PWA
let deferredPrompt = null;
const installBtn = document.getElementById("installPWA");

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  if (installBtn) {
    installBtn.style.display = "inline-block";
  }
});

if (installBtn) {
  installBtn.addEventListener("click", async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log("Résultat installation PWA :", outcome);
    deferredPrompt = null;
    installBtn.style.display = "none";
  });
}