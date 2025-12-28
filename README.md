# PV d’Installation – Enodis  
Froidelec Service – Application terrain

Cette application permet de générer un Procès-Verbal d’installation Enodis conforme au modèle institutionnel, incluant :

- Saisie des informations client  
- Saisie des appareils installés (6 lignes institutionnelles)  
- Contrôles et vérifications  
- Signatures technicien + client  
- Injection automatique dans le PDF modèle Enodis  
- Export PDF final conforme  
- Interface optimisée pour tablette (usage terrain)

---

## 📁 Structure du projet

---

## 🧩 Fonctionnement

1. L’utilisateur remplit les champs du PV.  
2. Les signatures technicien + client sont capturées via canvas.  
3. Le mapping PDF (`mapping-coordonnees.js`) positionne chaque champ.  
4. Le module `pdf-export.js` injecte automatiquement les données dans le PDF modèle.  
5. Le PDF final est téléchargé.

---

## 🏛 Exigences institutionnelles

- Respect strict du modèle PDF Enodis  
- Typographie sobre (Arial)  
- Interface claire, sans éléments décoratifs  
- Export PDF archivable  
- Compatibilité tablette / smartphone  
- Signatures lisibles  
- Traçabilité des cycles dans `/docs/cycles/`

---

## 🛠 Technologies utilisées

- HTML5 / CSS3  
- JavaScript pur  
- PDF-LIB (injection PDF)  
- Canvas API (signature)  

---

## 📦 Installation

Aucune installation serveur nécessaire.

Ouvrir simplement :

Pour un usage tablette optimal, utiliser un petit serveur local (ex : Live Server VSCode).

---

## 📝 Contribution interne

Chaque modification doit être documentée dans :

- `/docs/cycles/`  
- `/docs/changelog.md`  

---

## 📚 Documentation incluse

- **architecture.md** → structure technique  
- **exigences-institutionnelles.md** → règles Enodis  
- **changelog.md** → historique des versions  
- **cycles/** → suivi des corrections et validations  

---

## © Froidelec Service – Usage interne Enodis
