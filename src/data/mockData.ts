// Mock data for the ARGON school management platform

// Établissements
export const etablissements = [
  { id: "1", nom: "Lycée Victor Hugo", ville: "Dakar", pays: "Sénégal", eleves: 1250, enseignants: 85 },
  { id: "2", nom: "École Sainte-Marie", ville: "Abidjan", pays: "Côte d'Ivoire", eleves: 890, enseignants: 52 },
  { id: "3", nom: "Collège Albert Camus", ville: "Libreville", pays: "Gabon", eleves: 650, enseignants: 42 },
];

// Classes
export const classes = [
  { id: "1", nom: "6ème A", niveau: "6ème", effectif: 32, enseignantPrincipal: "M. Diallo" },
  { id: "2", nom: "6ème B", niveau: "6ème", effectif: 30, enseignantPrincipal: "Mme. Koné" },
  { id: "3", nom: "5ème A", niveau: "5ème", effectif: 28, enseignantPrincipal: "M. Traoré" },
  { id: "4", nom: "4ème A", niveau: "4ème", effectif: 35, enseignantPrincipal: "Mme. Ba" },
  { id: "5", nom: "3ème A", niveau: "3ème", effectif: 33, enseignantPrincipal: "M. Ndiaye" },
];

// Élèves
export const eleves = [
  { id: "1", nom: "Diop", prenom: "Aminata", classe: "6ème A", photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aminata", dateNaissance: "2012-03-15", parent: "1" },
  { id: "2", nom: "Koné", prenom: "Ibrahim", classe: "6ème A", photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ibrahim", dateNaissance: "2012-07-22", parent: "2" },
  { id: "3", nom: "Traoré", prenom: "Fatou", classe: "6ème B", photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fatou", dateNaissance: "2012-01-08", parent: "3" },
  { id: "4", nom: "Ba", prenom: "Moussa", classe: "5ème A", photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Moussa", dateNaissance: "2011-11-30", parent: "4" },
  { id: "5", nom: "Ndiaye", prenom: "Aïssatou", classe: "4ème A", photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aissatou", dateNaissance: "2010-05-12", parent: "5" },
];

// Parents
export const parents = [
  { id: "1", nom: "Diop", prenom: "Mamadou", email: "mamadou.diop@email.com", telephone: "+221 77 123 45 67", enfants: ["1"] },
  { id: "2", nom: "Koné", prenom: "Fatoumata", email: "fatoumata.kone@email.com", telephone: "+225 07 234 56 78", enfants: ["2"] },
  { id: "3", nom: "Traoré", prenom: "Oumar", email: "oumar.traore@email.com", telephone: "+221 78 345 67 89", enfants: ["3"] },
  { id: "4", nom: "Ba", prenom: "Mariama", email: "mariama.ba@email.com", telephone: "+241 06 456 78 90", enfants: ["4"] },
  { id: "5", nom: "Ndiaye", prenom: "Cheikh", email: "cheikh.ndiaye@email.com", telephone: "+221 70 567 89 01", enfants: ["5"] },
];

// Enseignants
export const enseignants = [
  { id: "1", nom: "Diallo", prenom: "Abdoulaye", matiere: "Mathématiques", email: "a.diallo@lycee.edu", photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Diallo", classes: ["6ème A", "5ème A"] },
  { id: "2", nom: "Koné", prenom: "Mariam", matiere: "Français", email: "m.kone@lycee.edu", photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=MariamKone", classes: ["6ème B", "4ème A"] },
  { id: "3", nom: "Traoré", prenom: "Seydou", matiere: "Histoire-Géographie", email: "s.traore@lycee.edu", photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Seydou", classes: ["5ème A", "3ème A"] },
  { id: "4", nom: "Ba", prenom: "Aminata", matiere: "Anglais", email: "a.ba@lycee.edu", photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=AminataBa", classes: ["4ème A", "6ème A"] },
  { id: "5", nom: "Ndiaye", prenom: "Moustapha", matiere: "Sciences", email: "m.ndiaye@lycee.edu", photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Moustapha", classes: ["3ème A", "6ème B"] },
];

// Présences (dernière semaine)
export const presences = [
  { id: "1", eleveId: "1", date: "2024-01-15", matin: "present", apresmidi: "present" },
  { id: "2", eleveId: "1", date: "2024-01-16", matin: "present", apresmidi: "retard" },
  { id: "3", eleveId: "1", date: "2024-01-17", matin: "absent", apresmidi: "absent" },
  { id: "4", eleveId: "2", date: "2024-01-15", matin: "present", apresmidi: "present" },
  { id: "5", eleveId: "2", date: "2024-01-16", matin: "present", apresmidi: "present" },
];

// Devoirs
export const devoirs = [
  { 
    id: "1", 
    titre: "Exercices de géométrie", 
    matiere: "Mathématiques", 
    description: "Faire les exercices 1 à 5 page 42 du manuel",
    dateLimite: "2024-01-20", 
    classe: "6ème A",
    enseignant: "M. Diallo",
    statut: "en_cours",
    fichier: null
  },
  { 
    id: "2", 
    titre: "Rédaction : Mon village", 
    matiere: "Français", 
    description: "Écrire une rédaction de 200 mots minimum décrivant votre village ou quartier",
    dateLimite: "2024-01-18", 
    classe: "6ème B",
    enseignant: "Mme. Koné",
    statut: "a_rendre",
    fichier: "consignes.pdf"
  },
  { 
    id: "3", 
    titre: "Révision chapitre 3", 
    matiere: "Histoire-Géographie", 
    description: "Réviser le chapitre sur les grandes découvertes",
    dateLimite: "2024-01-22", 
    classe: "5ème A",
    enseignant: "M. Traoré",
    statut: "nouveau",
    fichier: null
  },
];

// Notes
export const notes = [
  { id: "1", eleveId: "1", matiere: "Mathématiques", note: 15, coefficient: 3, trimestre: 1, type: "Contrôle" },
  { id: "2", eleveId: "1", matiere: "Français", note: 14, coefficient: 3, trimestre: 1, type: "Dissertation" },
  { id: "3", eleveId: "1", matiere: "Anglais", note: 16, coefficient: 2, trimestre: 1, type: "Oral" },
  { id: "4", eleveId: "1", matiere: "Histoire-Géo", note: 13, coefficient: 2, trimestre: 1, type: "Contrôle" },
  { id: "5", eleveId: "1", matiere: "Sciences", note: 17, coefficient: 3, trimestre: 1, type: "TP" },
  { id: "6", eleveId: "2", matiere: "Mathématiques", note: 12, coefficient: 3, trimestre: 1, type: "Contrôle" },
  { id: "7", eleveId: "2", matiere: "Français", note: 16, coefficient: 3, trimestre: 1, type: "Dissertation" },
];

// Messages
export const messages = [
  { 
    id: "1", 
    expediteur: "M. Diallo", 
    expediteurType: "enseignant",
    destinataire: "M. Diop (parent)",
    destinataireType: "parent",
    sujet: "Progrès en mathématiques",
    contenu: "Bonjour M. Diop, je tenais à vous informer qu'Aminata fait d'excellents progrès en mathématiques. Elle participe activement en classe.",
    date: "2024-01-15T10:30:00",
    lu: true
  },
  { 
    id: "2", 
    expediteur: "Mme. Koné", 
    expediteurType: "enseignant",
    destinataire: "Mme. Koné (parent)",
    destinataireType: "parent",
    sujet: "Devoir non rendu",
    contenu: "Bonjour, je vous informe qu'Ibrahim n'a pas rendu son devoir de français. Merci de vérifier avec lui.",
    date: "2024-01-16T14:15:00",
    lu: false
  },
];

// Annonces
export const annonces = [
  { 
    id: "1", 
    titre: "Réunion parents-professeurs", 
    contenu: "La réunion parents-professeurs du 1er trimestre aura lieu le samedi 27 janvier 2024 de 9h à 12h.",
    date: "2024-01-10",
    priorite: "important",
    auteur: "Direction",
    cible: "tous"
  },
  { 
    id: "2", 
    titre: "Sortie pédagogique", 
    contenu: "Les élèves de 6ème participeront à une sortie au Musée des Civilisations le 25 janvier. Autorisation parentale requise.",
    date: "2024-01-12",
    priorite: "normal",
    auteur: "M. Traoré",
    cible: "6eme"
  },
  { 
    id: "3", 
    titre: "Vacances de février", 
    contenu: "Les vacances de février auront lieu du 17 au 25 février 2024. Bonnes vacances à tous !",
    date: "2024-01-15",
    priorite: "normal",
    auteur: "Direction",
    cible: "tous"
  },
];

// Événements calendrier
export const evenements = [
  { id: "1", titre: "Examen de mathématiques", date: "2024-01-25", type: "examen", classe: "6ème A" },
  { id: "2", titre: "Réunion parents-professeurs", date: "2024-01-27", type: "reunion", classe: "tous" },
  { id: "3", titre: "Sortie Musée", date: "2024-01-25", type: "sortie", classe: "6eme" },
  { id: "4", titre: "Début vacances février", date: "2024-02-17", type: "vacances", classe: "tous" },
  { id: "5", titre: "Fin vacances février", date: "2024-02-25", type: "vacances", classe: "tous" },
  { id: "6", titre: "Conseil de classe T1", date: "2024-02-02", type: "reunion", classe: "6ème A" },
];

// Personnes autorisées (retrait enfants)
export const personnesAutorisees = [
  { 
    id: "1", 
    parentId: "1",
    eleveId: "1",
    nom: "Diop", 
    prenom: "Fatou", 
    lien: "Tante",
    telephone: "+221 77 888 99 00",
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fatou",
    permanent: true,
    dateDebut: null,
    dateFin: null,
    urgence: true
  },
  { 
    id: "2", 
    parentId: "1",
    eleveId: "1",
    nom: "Diop", 
    prenom: "Ousmane", 
    lien: "Oncle",
    telephone: "+221 76 777 88 99",
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ousmane",
    permanent: false,
    dateDebut: "2024-01-15",
    dateFin: "2024-01-20",
    urgence: false
  },
];

// Historique des retraits
export const historiqueRetraits = [
  { 
    id: "1", 
    eleveId: "1", 
    personneId: "1", 
    date: "2024-01-14T16:30:00", 
    verifiePar: "M. Diallo",
    signature: true
  },
  { 
    id: "2", 
    eleveId: "1", 
    personneId: "2", 
    date: "2024-01-16T17:00:00", 
    verifiePar: "Mme. Ba",
    signature: true
  },
];

// Galerie photos
export const galeriePhotos = [
  { 
    id: "1", 
    titre: "Cours de sciences", 
    description: "Expérience de chimie en classe",
    url: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400",
    date: "2024-01-12",
    classe: "6ème A",
    album: "Sciences"
  },
  { 
    id: "2", 
    titre: "Match de football", 
    description: "Tournoi inter-classes",
    url: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400",
    date: "2024-01-10",
    classe: "6ème A",
    album: "Sport"
  },
  { 
    id: "3", 
    titre: "Atelier d'art", 
    description: "Création de masques africains",
    url: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400",
    date: "2024-01-08",
    classe: "6ème A",
    album: "Arts"
  },
];

// Statistiques globales (pour admin)
export const statsGlobales = {
  totalEleves: 1250,
  totalEnseignants: 85,
  totalParents: 1180,
  tauxPresence: 94.5,
  moyenneGenerale: 13.2,
  messagesEnvoyes: 450,
  evenementsAVenir: 12,
};

// Statistiques présence par mois
export const statsPresenceMensuelle = [
  { mois: "Sept", taux: 96 },
  { mois: "Oct", taux: 94 },
  { mois: "Nov", taux: 92 },
  { mois: "Déc", taux: 88 },
  { mois: "Jan", taux: 95 },
];

// Notes moyennes par matière
export const moyennesParMatiere = [
  { matiere: "Mathématiques", moyenne: 12.5 },
  { matiere: "Français", moyenne: 13.8 },
  { matiere: "Anglais", moyenne: 14.2 },
  { matiere: "Histoire-Géo", moyenne: 13.0 },
  { matiere: "Sciences", moyenne: 14.5 },
];
