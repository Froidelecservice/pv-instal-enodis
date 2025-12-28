# Architecture du projet – PV Instal Enodis

## 1. Frontend
- HTML institutionnel (structure Enodis)
- CSS sobre (bleu #003366)
- JavaScript modulaire

## 2. Modules JS
- signature.js → capture des signatures
- mapping-coordonnees.js → coordonnées exactes du PDF
- pdf-export.js → injection PDF via PDF-LIB
- app.js → initialisation globale

## 3. PDF
- PDF modèle Enodis dans /pdf
- Mapping centralisé pour éviter les coordonnées en dur

## 4. Documentation
- Cycles de développement
- Exigences institutionnelles
- Changelog