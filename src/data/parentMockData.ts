// Mock data for Parent role in ARGON

export const parentInfo = {
  id: "1",
  nom: "Diop",
  prenom: "Mamadou",
  email: "mamadou.diop@email.com",
  telephone: "+221 77 123 45 67",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mamadou",
};

export const enfants = [
  {
    id: "1",
    nom: "Diop",
    prenom: "Aminata",
    classe: "6ème A",
    niveau: "6ème",
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aminata",
    dateNaissance: "2012-03-15",
    age: 12,
    enseignantPrincipal: "M. Diallo",
    enseignants: [
      { nom: "M. Diallo", matiere: "Mathématiques", email: "a.diallo@lycee.edu" },
      { nom: "Mme. Koné", matiere: "Français", email: "m.kone@lycee.edu" },
      { nom: "M. Traoré", matiere: "Histoire-Géo", email: "s.traore@lycee.edu" },
      { nom: "Mme. Ba", matiere: "Anglais", email: "a.ba@lycee.edu" },
    ],
    tauxPresence: 96.5,
    moyenneGenerale: 14.8,
  },
  {
    id: "2",
    nom: "Diop",
    prenom: "Moussa",
    classe: "4ème B",
    niveau: "4ème",
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Moussa",
    dateNaissance: "2010-08-22",
    age: 14,
    enseignantPrincipal: "Mme. Sow",
    enseignants: [
      { nom: "Mme. Sow", matiere: "Sciences", email: "s.sow@lycee.edu" },
      { nom: "M. Ndiaye", matiere: "Mathématiques", email: "m.ndiaye@lycee.edu" },
      { nom: "Mme. Fall", matiere: "Français", email: "f.fall@lycee.edu" },
    ],
    tauxPresence: 92.0,
    moyenneGenerale: 12.5,
  },
];

export const presenceData = [
  { date: "2024-01-29", enfantId: "1", matin: "present", apresmidi: "present" },
  { date: "2024-01-28", enfantId: "1", matin: "present", apresmidi: "present" },
  { date: "2024-01-27", enfantId: "1", matin: "present", apresmidi: "retard" },
  { date: "2024-01-26", enfantId: "1", matin: "absent", apresmidi: "absent", justification: "Maladie" },
  { date: "2024-01-25", enfantId: "1", matin: "present", apresmidi: "present" },
  { date: "2024-01-24", enfantId: "1", matin: "present", apresmidi: "present" },
  { date: "2024-01-23", enfantId: "1", matin: "retard", apresmidi: "present" },
  { date: "2024-01-22", enfantId: "1", matin: "present", apresmidi: "present" },
  { date: "2024-01-29", enfantId: "2", matin: "present", apresmidi: "present" },
  { date: "2024-01-28", enfantId: "2", matin: "absent", apresmidi: "absent" },
  { date: "2024-01-27", enfantId: "2", matin: "present", apresmidi: "present" },
  { date: "2024-01-26", enfantId: "2", matin: "present", apresmidi: "retard" },
];

export const devoirsParent = [
  {
    id: "1",
    titre: "Exercices de géométrie",
    matiere: "Mathématiques",
    description: "Faire les exercices 1 à 5 page 42 du manuel",
    dateLimite: "2024-02-05",
    enfantId: "1",
    classe: "6ème A",
    enseignant: "M. Diallo",
    statut: "a_faire",
    fichier: null,
    priorite: "normal",
  },
  {
    id: "2",
    titre: "Rédaction : Mon village",
    matiere: "Français",
    description: "Écrire une rédaction de 200 mots minimum",
    dateLimite: "2024-02-03",
    enfantId: "1",
    classe: "6ème A",
    enseignant: "Mme. Koné",
    statut: "en_cours",
    fichier: "consignes.pdf",
    priorite: "important",
  },
  {
    id: "3",
    titre: "Révision chapitre 3",
    matiere: "Histoire-Géo",
    description: "Réviser le chapitre sur les grandes découvertes",
    dateLimite: "2024-01-28",
    enfantId: "1",
    classe: "6ème A",
    enseignant: "M. Traoré",
    statut: "rendu",
    fichier: null,
    priorite: "normal",
  },
  {
    id: "4",
    titre: "Vocabulaire anglais",
    matiere: "Anglais",
    description: "Apprendre les 20 mots de la leçon 5",
    dateLimite: "2024-01-26",
    enfantId: "1",
    classe: "6ème A",
    enseignant: "Mme. Ba",
    statut: "en_retard",
    fichier: null,
    priorite: "urgent",
  },
  {
    id: "5",
    titre: "Équations du premier degré",
    matiere: "Mathématiques",
    description: "Résoudre les équations page 78",
    dateLimite: "2024-02-06",
    enfantId: "2",
    classe: "4ème B",
    enseignant: "M. Ndiaye",
    statut: "a_faire",
    fichier: "exercices.pdf",
    priorite: "normal",
  },
];

export const notesParent = [
  { id: "1", enfantId: "1", matiere: "Mathématiques", note: 15, sur: 20, coefficient: 3, date: "2024-01-25", type: "Contrôle", commentaire: "Très bon travail" },
  { id: "2", enfantId: "1", matiere: "Français", note: 14, sur: 20, coefficient: 3, date: "2024-01-22", type: "Dissertation", commentaire: "Bonne rédaction" },
  { id: "3", enfantId: "1", matiere: "Anglais", note: 16, sur: 20, coefficient: 2, date: "2024-01-20", type: "Oral", commentaire: "Excellente prononciation" },
  { id: "4", enfantId: "1", matiere: "Histoire-Géo", note: 13, sur: 20, coefficient: 2, date: "2024-01-18", type: "Contrôle", commentaire: "" },
  { id: "5", enfantId: "1", matiere: "Sciences", note: 17, sur: 20, coefficient: 3, date: "2024-01-15", type: "TP", commentaire: "Très bonne manipulation" },
  { id: "6", enfantId: "2", matiere: "Mathématiques", note: 12, sur: 20, coefficient: 3, date: "2024-01-24", type: "Contrôle", commentaire: "Peut mieux faire" },
  { id: "7", enfantId: "2", matiere: "Français", note: 11, sur: 20, coefficient: 3, date: "2024-01-21", type: "Dissertation", commentaire: "Manque de développement" },
  { id: "8", enfantId: "2", matiere: "Sciences", note: 14, sur: 20, coefficient: 2, date: "2024-01-19", type: "TP", commentaire: "" },
];

export const bulletins = [
  { id: "1", enfantId: "1", trimestre: 1, annee: "2023-2024", moyenne: 14.8, rang: 5, effectif: 32, appreciation: "Excellent trimestre. Élève sérieuse et appliquée.", datePublication: "2024-01-15", telecharge: false },
  { id: "2", enfantId: "2", trimestre: 1, annee: "2023-2024", moyenne: 12.5, rang: 12, effectif: 28, appreciation: "Trimestre satisfaisant. Des efforts à fournir en français.", datePublication: "2024-01-15", telecharge: true },
];

export const messagesParent = [
  {
    id: "1",
    correspondant: "M. Diallo",
    correspondantType: "enseignant",
    matiere: "Mathématiques",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Diallo",
    dernierMessage: "Aminata fait d'excellents progrès en mathématiques.",
    date: "2024-01-29T10:30:00",
    nonLu: true,
    messages: [
      { id: "1", expediteur: "enseignant", contenu: "Bonjour M. Diop, je tenais à vous informer qu'Aminata fait d'excellents progrès en mathématiques.", date: "2024-01-29T10:30:00" },
    ],
  },
  {
    id: "2",
    correspondant: "Mme. Koné",
    correspondantType: "enseignant",
    matiere: "Français",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=MariamKone",
    dernierMessage: "Merci pour votre réponse. Je reste disponible.",
    date: "2024-01-28T14:15:00",
    nonLu: false,
    messages: [
      { id: "1", expediteur: "enseignant", contenu: "Bonjour, la rédaction d'Aminata est très bien écrite.", date: "2024-01-28T09:00:00" },
      { id: "2", expediteur: "parent", contenu: "Merci beaucoup pour ce retour encourageant !", date: "2024-01-28T12:30:00" },
      { id: "3", expediteur: "enseignant", contenu: "Merci pour votre réponse. Je reste disponible.", date: "2024-01-28T14:15:00" },
    ],
  },
  {
    id: "3",
    correspondant: "Administration",
    correspondantType: "admin",
    matiere: null,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin",
    dernierMessage: "Rappel : réunion parents-professeurs le 27 janvier.",
    date: "2024-01-25T08:00:00",
    nonLu: false,
    messages: [
      { id: "1", expediteur: "admin", contenu: "Rappel : réunion parents-professeurs le 27 janvier à 9h.", date: "2024-01-25T08:00:00" },
    ],
  },
];

export const annoncesParent = [
  {
    id: "1",
    titre: "Réunion parents-professeurs",
    contenu: "La réunion parents-professeurs du 1er trimestre aura lieu le samedi 27 janvier 2024 de 9h à 12h. Votre présence est vivement souhaitée.",
    date: "2024-01-20",
    priorite: "important",
    auteur: "Direction",
    lu: false,
    cible: "tous",
  },
  {
    id: "2",
    titre: "Sortie pédagogique - Musée",
    contenu: "Les élèves de 6ème participeront à une sortie au Musée des Civilisations le 25 janvier. Autorisation parentale à retourner avant le 23 janvier.",
    date: "2024-01-18",
    priorite: "normal",
    auteur: "M. Traoré",
    lu: true,
    cible: "6eme",
    fichier: "autorisation.pdf",
  },
  {
    id: "3",
    titre: "Vacances de février",
    contenu: "Les vacances de février auront lieu du 17 au 25 février 2024. Bonnes vacances à tous !",
    date: "2024-01-15",
    priorite: "normal",
    auteur: "Direction",
    lu: true,
    cible: "tous",
  },
  {
    id: "4",
    titre: "Journée sportive",
    contenu: "Une journée sportive inter-classes est prévue le 10 février. Prévoir une tenue de sport.",
    date: "2024-01-12",
    priorite: "normal",
    auteur: "Professeur EPS",
    lu: true,
    cible: "tous",
  },
];

export const galerieParent = [
  {
    id: "1",
    titre: "Cours de sciences",
    description: "Expérience de chimie en classe de 6ème A",
    photos: [
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400",
      "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=400",
    ],
    date: "2024-01-22",
    classe: "6ème A",
    enseignant: "M. Ndiaye",
  },
  {
    id: "2",
    titre: "Match de football",
    description: "Tournoi inter-classes",
    photos: [
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400",
      "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=400",
    ],
    date: "2024-01-18",
    classe: "6ème A",
    enseignant: "Prof. EPS",
  },
  {
    id: "3",
    titre: "Atelier d'art",
    description: "Création de masques africains traditionnels",
    photos: [
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400",
    ],
    date: "2024-01-15",
    classe: "6ème A",
    enseignant: "Mme. Diallo",
  },
];

export const personnesAutoriseesParent = [
  {
    id: "1",
    nom: "Diop",
    prenom: "Fatou",
    lien: "Tante",
    telephone: "+221 77 888 99 00",
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=FatouDiop",
    permanent: true,
    dateDebut: null,
    dateFin: null,
    enfantId: "1",
    actif: true,
  },
  {
    id: "2",
    nom: "Diop",
    prenom: "Ousmane",
    lien: "Oncle",
    telephone: "+221 76 777 88 99",
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ousmane",
    permanent: false,
    dateDebut: "2024-01-25",
    dateFin: "2024-02-05",
    enfantId: "1",
    actif: true,
  },
  {
    id: "3",
    nom: "Sow",
    prenom: "Mariama",
    lien: "Grand-mère",
    telephone: "+221 70 666 77 88",
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mariama",
    permanent: true,
    dateDebut: null,
    dateFin: null,
    enfantId: "1",
    actif: true,
  },
];

export const calendrierParent = [
  { id: "1", titre: "Examen de mathématiques", date: "2024-02-05", type: "examen", classe: "6ème A", enfantId: "1" },
  { id: "2", titre: "Réunion parents-professeurs", date: "2024-01-27", type: "reunion", classe: "tous", enfantId: null },
  { id: "3", titre: "Sortie Musée", date: "2024-01-25", type: "sortie", classe: "6ème A", enfantId: "1" },
  { id: "4", titre: "Début vacances février", date: "2024-02-17", type: "vacances", classe: "tous", enfantId: null },
  { id: "5", titre: "Fin vacances février", date: "2024-02-25", type: "vacances", classe: "tous", enfantId: null },
  { id: "6", titre: "Contrôle de français", date: "2024-02-02", type: "examen", classe: "6ème A", enfantId: "1" },
  { id: "7", titre: "Journée sportive", date: "2024-02-10", type: "evenement", classe: "tous", enfantId: null },
  { id: "8", titre: "Examen de sciences", date: "2024-02-08", type: "examen", classe: "4ème B", enfantId: "2" },
];

export const alertesParent = [
  { id: "1", type: "absence", message: "Moussa était absent le 28 janvier", date: "2024-01-28", enfantId: "2", lu: false },
  { id: "2", type: "devoir", message: "Devoir de vocabulaire anglais en retard", date: "2024-01-27", enfantId: "1", lu: false },
  { id: "3", type: "note", message: "Nouvelle note en Sciences : 17/20", date: "2024-01-15", enfantId: "1", lu: true },
];

export const progressionNotes = [
  { mois: "Sept", enfant1: 13.5, enfant2: 11.0 },
  { mois: "Oct", enfant1: 14.0, enfant2: 11.5 },
  { mois: "Nov", enfant1: 14.2, enfant2: 12.0 },
  { mois: "Déc", enfant1: 14.5, enfant2: 12.2 },
  { mois: "Jan", enfant1: 14.8, enfant2: 12.5 },
];
