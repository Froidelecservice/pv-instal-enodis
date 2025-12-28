/* ============================================================
   MAPPING DES COORDONNÉES DU PDF D’ORIGINE
   ============================================================ */

const PDF_FIELDS = {

    // Champs simples
    date:            { x: 45,  y: 730, size: 10 },
    nomClient:       { x: 102, y: 705, size: 10 },
    adresse:         { x: 65,  y: 680, size: 10 },
    ville:           { x: 120, y: 655, size: 10 },
    representant:    { x: 145, y: 629, size: 10 },

    // Appareils (6 lignes)
    type_0:   { x: 107, y: 567, size: 10 },
    serie_0:  { x: 115, y: 398, size: 10 },
    modele_0: { x: 390, y: 398, size: 10 },

    type_1:   { x: 107, y: 542, size: 10 },
    serie_1:  { x: 115, y: 375, size: 10 },
    modele_1: { x: 390, y: 375, size: 10 },

    type_2:   { x: 107, y: 518, size: 10 },
    serie_2:  { x: 115, y: 345, size: 10 },
    modele_2: { x: 390, y: 345, size: 10 },

    type_3:   { x: 107, y: 489, size: 10 },
    serie_3:  { x: 115, y: 322, size: 10 },
    modele_3: { x: 390, y: 322, size: 10 },

    type_4:   { x: 107, y: 465, size: 10 },
    serie_4:  { x: 115, y: 297, size: 10 },
    modele_4: { x: 390, y: 297, size: 10 },

    type_5:   { x: 107, y: 438, size: 10 },
    serie_5:  { x: 115, y: 267, size: 10 },
    modele_5: { x: 390, y: 267, size: 10 },

    // Autres champs
    tests:          { x: 375, y: 210, size: 10 },
    installation:   { x: 327, y: 182, size: 10 },
    formation:      { x: 318, y: 125, size: 10 },

    nomTech:        { x: 50,  y: 70, size: 10 },
    nomClientSign:  { x: 380, y: 70, size: 10 },

    // Signatures
    signatureTech:   { x: 150, y: 40, width: 120, height: 60 },
    signatureClient: { x: 420, y: 40, width: 120, height: 60 }
};