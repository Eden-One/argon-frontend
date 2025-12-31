// Mock data for Admin Établissement

export const adminStats = {
  totalClasses: 24,
  totalEleves: 1250,
  totalEnseignants: 85,
  totalParents: 1180,
  tauxPresenceMois: 94.5,
  presencesNonValidees: 12,
  autorisationsJour: 5,
};

export const classesData = [
  { id: "1", nom: "6ème A", niveau: "6ème", effectif: 32, professeurPrincipal: "M. Diallo Abdoulaye", tauxPresence: 96.5, moyenneGenerale: 13.2 },
  { id: "2", nom: "6ème B", niveau: "6ème", effectif: 30, professeurPrincipal: "Mme. Koné Mariam", tauxPresence: 94.8, moyenneGenerale: 12.8 },
  { id: "3", nom: "6ème C", niveau: "6ème", effectif: 28, professeurPrincipal: "M. Traoré Seydou", tauxPresence: 95.2, moyenneGenerale: 14.1 },
  { id: "4", nom: "5ème A", niveau: "5ème", effectif: 35, professeurPrincipal: "Mme. Ba Aminata", tauxPresence: 93.5, moyenneGenerale: 12.5 },
  { id: "5", nom: "5ème B", niveau: "5ème", effectif: 33, professeurPrincipal: "M. Ndiaye Moustapha", tauxPresence: 95.0, moyenneGenerale: 13.8 },
  { id: "6", nom: "4ème A", niveau: "4ème", effectif: 36, professeurPrincipal: "M. Sow Ibrahima", tauxPresence: 92.8, moyenneGenerale: 11.9 },
  { id: "7", nom: "4ème B", niveau: "4ème", effectif: 34, professeurPrincipal: "Mme. Diop Aïssatou", tauxPresence: 94.2, moyenneGenerale: 13.5 },
  { id: "8", nom: "3ème A", niveau: "3ème", effectif: 38, professeurPrincipal: "M. Fall Cheikh", tauxPresence: 95.8, moyenneGenerale: 14.0 },
];

export const enseignantsData = [
  { id: "1", nom: "Diallo", prenom: "Abdoulaye", email: "a.diallo@lycee.edu", telephone: "+221 77 123 45 67", matieres: ["Mathématiques"], classes: ["6ème A", "5ème A", "4ème A"], statut: "actif", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Diallo", derniereConnexion: "2024-01-17T08:30:00" },
  { id: "2", nom: "Koné", prenom: "Mariam", email: "m.kone@lycee.edu", telephone: "+221 77 234 56 78", matieres: ["Français", "Littérature"], classes: ["6ème B", "5ème B", "4ème B"], statut: "actif", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=MariamKone", derniereConnexion: "2024-01-17T09:15:00" },
  { id: "3", nom: "Traoré", prenom: "Seydou", email: "s.traore@lycee.edu", telephone: "+221 77 345 67 89", matieres: ["Histoire-Géographie"], classes: ["6ème C", "5ème A", "3ème A"], statut: "actif", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Seydou", derniereConnexion: "2024-01-16T14:20:00" },
  { id: "4", nom: "Ba", prenom: "Aminata", email: "a.ba@lycee.edu", telephone: "+221 77 456 78 90", matieres: ["Anglais"], classes: ["5ème A", "4ème A", "3ème A"], statut: "actif", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=AminataBa", derniereConnexion: "2024-01-17T07:45:00" },
  { id: "5", nom: "Ndiaye", prenom: "Moustapha", email: "m.ndiaye@lycee.edu", telephone: "+221 77 567 89 01", matieres: ["Sciences Physiques", "Chimie"], classes: ["5ème B", "4ème B", "3ème A"], statut: "inactif", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Moustapha", derniereConnexion: "2024-01-10T11:30:00" },
  { id: "6", nom: "Sow", prenom: "Ibrahima", email: "i.sow@lycee.edu", telephone: "+221 77 678 90 12", matieres: ["SVT", "Biologie"], classes: ["4ème A", "4ème B", "3ème A"], statut: "actif", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ibrahima", derniereConnexion: "2024-01-17T08:00:00" },
];

export const parentsData = [
  { id: "1", nom: "Diop", prenom: "Mamadou", email: "mamadou.diop@email.com", telephone: "+221 77 123 45 67", enfants: [{ id: "e1", nom: "Aminata Diop", classe: "6ème A" }], statut: "actif", derniereConnexion: "2024-01-17T19:30:00" },
  { id: "2", nom: "Koné", prenom: "Fatoumata", email: "fatoumata.kone@email.com", telephone: "+225 07 234 56 78", enfants: [{ id: "e2", nom: "Ibrahim Koné", classe: "6ème A" }, { id: "e3", nom: "Aïcha Koné", classe: "4ème B" }], statut: "actif", derniereConnexion: "2024-01-16T20:15:00" },
  { id: "3", nom: "Traoré", prenom: "Oumar", email: "oumar.traore@email.com", telephone: "+221 78 345 67 89", enfants: [{ id: "e4", nom: "Fatou Traoré", classe: "6ème B" }], statut: "actif", derniereConnexion: "2024-01-17T07:45:00" },
  { id: "4", nom: "Ba", prenom: "Mariama", email: "mariama.ba@email.com", telephone: "+241 06 456 78 90", enfants: [{ id: "e5", nom: "Moussa Ba", classe: "5ème A" }], statut: "inactif", derniereConnexion: "2024-01-05T12:00:00" },
  { id: "5", nom: "Ndiaye", prenom: "Cheikh", email: "cheikh.ndiaye@email.com", telephone: "+221 70 567 89 01", enfants: [{ id: "e6", nom: "Aïssatou Ndiaye", classe: "4ème A" }], statut: "actif", derniereConnexion: "2024-01-17T06:30:00" },
];

export const elevesData = [
  { id: "e1", nom: "Diop", prenom: "Aminata", classe: "6ème A", dateNaissance: "2012-03-15", parent: "Mamadou Diop", statut: "actif", photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aminata", tauxPresence: 98, moyenneGenerale: 15.2 },
  { id: "e2", nom: "Koné", prenom: "Ibrahim", classe: "6ème A", dateNaissance: "2012-07-22", parent: "Fatoumata Koné", statut: "actif", photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ibrahim", tauxPresence: 95, moyenneGenerale: 13.8 },
  { id: "e3", nom: "Koné", prenom: "Aïcha", classe: "4ème B", dateNaissance: "2010-11-10", parent: "Fatoumata Koné", statut: "actif", photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aicha", tauxPresence: 92, moyenneGenerale: 12.5 },
  { id: "e4", nom: "Traoré", prenom: "Fatou", classe: "6ème B", dateNaissance: "2012-01-08", parent: "Oumar Traoré", statut: "actif", photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fatou", tauxPresence: 97, moyenneGenerale: 14.2 },
  { id: "e5", nom: "Ba", prenom: "Moussa", classe: "5ème A", dateNaissance: "2011-11-30", parent: "Mariama Ba", statut: "actif", photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Moussa", tauxPresence: 88, moyenneGenerale: 11.9 },
  { id: "e6", nom: "Ndiaye", prenom: "Aïssatou", classe: "4ème A", dateNaissance: "2010-05-12", parent: "Cheikh Ndiaye", statut: "actif", photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aissatou", tauxPresence: 96, moyenneGenerale: 16.1 },
  { id: "e7", nom: "Fall", prenom: "Omar", classe: "3ème A", dateNaissance: "2009-08-25", parent: "Abdou Fall", statut: "actif", photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Omar", tauxPresence: 94, moyenneGenerale: 13.5 },
  { id: "e8", nom: "Seck", prenom: "Mariama", classe: "5ème B", dateNaissance: "2011-04-18", parent: "Ibrahima Seck", statut: "actif", photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mariama", tauxPresence: 99, moyenneGenerale: 17.2 },
];

export const presenceData = [
  { id: "p1", eleveId: "e1", eleveName: "Aminata Diop", classe: "6ème A", date: "2024-01-17", matin: "present", apresmidi: "present" },
  { id: "p2", eleveId: "e2", eleveName: "Ibrahim Koné", classe: "6ème A", date: "2024-01-17", matin: "present", apresmidi: "retard" },
  { id: "p3", eleveId: "e3", eleveName: "Aïcha Koné", classe: "4ème B", date: "2024-01-17", matin: "absent", apresmidi: "absent" },
  { id: "p4", eleveId: "e4", eleveName: "Fatou Traoré", classe: "6ème B", date: "2024-01-17", matin: "present", apresmidi: "present" },
  { id: "p5", eleveId: "e5", eleveName: "Moussa Ba", classe: "5ème A", date: "2024-01-17", matin: "retard", apresmidi: "present" },
  { id: "p6", eleveId: "e6", eleveName: "Aïssatou Ndiaye", classe: "4ème A", date: "2024-01-17", matin: "present", apresmidi: "present" },
];

export const presenceParClasse = [
  { classe: "6ème A", taux: 96.5, presents: 30, absents: 2 },
  { classe: "6ème B", taux: 94.8, presents: 28, absents: 2 },
  { classe: "6ème C", taux: 95.2, presents: 26, absents: 2 },
  { classe: "5ème A", taux: 93.5, presents: 32, absents: 3 },
  { classe: "5ème B", taux: 95.0, presents: 31, absents: 2 },
  { classe: "4ème A", taux: 92.8, presents: 33, absents: 3 },
  { classe: "4ème B", taux: 94.2, presents: 32, absents: 2 },
  { classe: "3ème A", taux: 95.8, presents: 36, absents: 2 },
];

export const devoirsData = [
  { id: "d1", titre: "Exercices de géométrie", classe: "6ème A", matiere: "Mathématiques", enseignant: "M. Diallo", dateLimite: "2024-01-20", statut: "en_cours", description: "Faire les exercices 1 à 5 page 42 du manuel", fichier: null },
  { id: "d2", titre: "Rédaction : Mon village", classe: "6ème B", matiere: "Français", enseignant: "Mme. Koné", dateLimite: "2024-01-18", statut: "termine", description: "Écrire une rédaction de 200 mots minimum", fichier: "consignes.pdf" },
  { id: "d3", titre: "Révision chapitre 3", classe: "5ème A", matiere: "Histoire-Géographie", enseignant: "M. Traoré", dateLimite: "2024-01-22", statut: "nouveau", description: "Réviser le chapitre sur les grandes découvertes", fichier: null },
  { id: "d4", titre: "Vocabulary Unit 5", classe: "4ème A", matiere: "Anglais", enseignant: "Mme. Ba", dateLimite: "2024-01-19", statut: "en_cours", description: "Learn vocabulary words from unit 5", fichier: "vocab_list.pdf" },
  { id: "d5", titre: "TP Chimie", classe: "3ème A", matiere: "Sciences Physiques", enseignant: "M. Ndiaye", dateLimite: "2024-01-25", statut: "nouveau", description: "Préparer le compte rendu du TP", fichier: null },
];

export const notesData = [
  { eleveId: "e1", eleveName: "Aminata Diop", classe: "6ème A", matieres: { "Mathématiques": 16, "Français": 15, "Anglais": 17, "Histoire-Géo": 14, "Sciences": 15 }, moyenne: 15.4 },
  { eleveId: "e2", eleveName: "Ibrahim Koné", classe: "6ème A", matieres: { "Mathématiques": 12, "Français": 14, "Anglais": 13, "Histoire-Géo": 15, "Sciences": 14 }, moyenne: 13.6 },
  { eleveId: "e4", eleveName: "Fatou Traoré", classe: "6ème B", matieres: { "Mathématiques": 14, "Français": 16, "Anglais": 15, "Histoire-Géo": 13, "Sciences": 13 }, moyenne: 14.2 },
  { eleveId: "e6", eleveName: "Aïssatou Ndiaye", classe: "4ème A", matieres: { "Mathématiques": 17, "Français": 16, "Anglais": 18, "Histoire-Géo": 15, "Sciences": 16 }, moyenne: 16.4 },
  { eleveId: "e7", eleveName: "Omar Fall", classe: "3ème A", matieres: { "Mathématiques": 13, "Français": 14, "Anglais": 12, "Histoire-Géo": 15, "Sciences": 14 }, moyenne: 13.6 },
  { eleveId: "e8", eleveName: "Mariama Seck", classe: "5ème B", matieres: { "Mathématiques": 18, "Français": 17, "Anglais": 17, "Histoire-Géo": 16, "Sciences": 18 }, moyenne: 17.2 },
];

export const annoncesData = [
  { id: "a1", titre: "Réunion parents-professeurs", contenu: "La réunion parents-professeurs du 1er trimestre aura lieu le samedi 27 janvier 2024 de 9h à 12h.", date: "2024-01-10", priorite: "important", auteur: "Direction", cible: "tous", statut: "publie" },
  { id: "a2", titre: "Sortie pédagogique", contenu: "Les élèves de 6ème participeront à une sortie au Musée des Civilisations le 25 janvier.", date: "2024-01-12", priorite: "normal", auteur: "M. Traoré", cible: "6eme", statut: "publie" },
  { id: "a3", titre: "Vacances de février", contenu: "Les vacances de février auront lieu du 17 au 25 février 2024. Bonnes vacances à tous !", date: "2024-01-15", priorite: "normal", auteur: "Direction", cible: "tous", statut: "publie" },
  { id: "a4", titre: "Compétition sportive", contenu: "Le tournoi inter-classes de football aura lieu le 30 janvier. Inscriptions ouvertes.", date: "2024-01-16", priorite: "normal", auteur: "Prof. EPS", cible: "tous", statut: "brouillon" },
];

export const galerieData = [
  { id: "g1", titre: "Cours de sciences", description: "Expérience de chimie en classe", url: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400", date: "2024-01-12", classe: "6ème A", album: "Sciences" },
  { id: "g2", titre: "Match de football", description: "Tournoi inter-classes", url: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400", date: "2024-01-10", classe: "Tous", album: "Sport" },
  { id: "g3", titre: "Atelier d'art", description: "Création de masques africains", url: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400", date: "2024-01-08", classe: "6ème A", album: "Arts" },
  { id: "g4", titre: "Cérémonie de remise des prix", description: "Prix d'excellence T1", url: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=400", date: "2024-01-05", classe: "Tous", album: "Événements" },
  { id: "g5", titre: "Club de lecture", description: "Session hebdomadaire", url: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400", date: "2024-01-14", classe: "5ème A", album: "Club" },
  { id: "g6", titre: "Cours de musique", description: "Apprentissage du djembé", url: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400", date: "2024-01-13", classe: "4ème B", album: "Arts" },
];

export const autorisationsData = [
  { id: "au1", eleveId: "e1", eleveName: "Aminata Diop", classe: "6ème A", personneAutorisee: "Fatou Diop", lien: "Tante", telephone: "+221 77 888 99 00", photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=FatouD", type: "permanent", validite: "Permanente", statut: "actif" },
  { id: "au2", eleveId: "e1", eleveName: "Aminata Diop", classe: "6ème A", personneAutorisee: "Ousmane Diop", lien: "Oncle", telephone: "+221 76 777 88 99", photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ousmane", type: "temporaire", validite: "15-20 Jan 2024", statut: "actif" },
  { id: "au3", eleveId: "e2", eleveName: "Ibrahim Koné", classe: "6ème A", personneAutorisee: "Mariam Koné", lien: "Grand-mère", telephone: "+225 07 111 22 33", photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=MariamK", type: "permanent", validite: "Permanente", statut: "actif" },
  { id: "au4", eleveId: "e5", eleveName: "Moussa Ba", classe: "5ème A", personneAutorisee: "Samba Ba", lien: "Grand-père", telephone: "+241 06 222 33 44", photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=SambaB", type: "permanent", validite: "Permanente", statut: "inactif" },
];

export const historiqueRetraitsData = [
  { id: "hr1", eleveId: "e1", eleveName: "Aminata Diop", personneAutorisee: "Fatou Diop", lien: "Tante", date: "2024-01-17T16:30:00", verifiePar: "M. Diallo", methode: "QR Code" },
  { id: "hr2", eleveId: "e2", eleveName: "Ibrahim Koné", personneAutorisee: "Mariam Koné", lien: "Grand-mère", date: "2024-01-17T16:45:00", verifiePar: "Mme. Koné", methode: "Photo ID" },
  { id: "hr3", eleveId: "e1", eleveName: "Aminata Diop", personneAutorisee: "Ousmane Diop", lien: "Oncle", date: "2024-01-16T17:00:00", verifiePar: "Mme. Ba", methode: "QR Code" },
];

export const calendrierData = [
  { id: "c1", titre: "Examen de mathématiques", date: "2024-01-25", type: "examen", classe: "6ème A", couleur: "#EF4444" },
  { id: "c2", titre: "Réunion parents-professeurs", date: "2024-01-27", type: "reunion", classe: "tous", couleur: "#3B82F6" },
  { id: "c3", titre: "Sortie Musée", date: "2024-01-25", type: "sortie", classe: "6eme", couleur: "#10B981" },
  { id: "c4", titre: "Début vacances février", date: "2024-02-17", type: "vacances", classe: "tous", couleur: "#F59E0B" },
  { id: "c5", titre: "Fin vacances février", date: "2024-02-25", type: "vacances", classe: "tous", couleur: "#F59E0B" },
  { id: "c6", titre: "Conseil de classe T1", date: "2024-02-02", type: "reunion", classe: "6ème A", couleur: "#3B82F6" },
  { id: "c7", titre: "Compétition sportive", date: "2024-01-30", type: "evenement", classe: "tous", couleur: "#8B5CF6" },
  { id: "c8", titre: "Fête de l'école", date: "2024-03-15", type: "evenement", classe: "tous", couleur: "#8B5CF6" },
];

export const repartitionParNiveau = [
  { niveau: "6ème", effectif: 90, pourcentage: 28 },
  { niveau: "5ème", effectif: 68, pourcentage: 22 },
  { niveau: "4ème", effectif: 70, pourcentage: 22 },
  { niveau: "3ème", effectif: 38, pourcentage: 12 },
  { niveau: "2nde", effectif: 25, pourcentage: 8 },
  { niveau: "1ère", effectif: 15, pourcentage: 5 },
  { niveau: "Tle", effectif: 10, pourcentage: 3 },
];

export const absencesParClasse = [
  { classe: "6ème A", absences: 5 },
  { classe: "6ème B", absences: 8 },
  { classe: "6ème C", absences: 6 },
  { classe: "5ème A", absences: 12 },
  { classe: "5ème B", absences: 7 },
  { classe: "4ème A", absences: 15 },
  { classe: "4ème B", absences: 9 },
  { classe: "3ème A", absences: 4 },
];

export const presenceMensuelle = [
  { mois: "Sept", taux: 96 },
  { mois: "Oct", taux: 94 },
  { mois: "Nov", taux: 92 },
  { mois: "Déc", taux: 88 },
  { mois: "Jan", taux: 95 },
];
