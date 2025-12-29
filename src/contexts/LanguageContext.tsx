import { createContext, useContext, useState, ReactNode } from "react";

type Language = "fr" | "en";

interface Translations {
  [key: string]: {
    fr: string;
    en: string;
  };
}

const translations: Translations = {
  // Common
  dashboard: { fr: "Tableau de bord", en: "Dashboard" },
  settings: { fr: "Paramètres", en: "Settings" },
  logout: { fr: "Déconnexion", en: "Logout" },
  myAccount: { fr: "Mon compte", en: "My Account" },
  search: { fr: "Rechercher...", en: "Search..." },
  save: { fr: "Enregistrer", en: "Save" },
  cancel: { fr: "Annuler", en: "Cancel" },
  delete: { fr: "Supprimer", en: "Delete" },
  edit: { fr: "Modifier", en: "Edit" },
  add: { fr: "Ajouter", en: "Add" },
  view: { fr: "Voir", en: "View" },
  download: { fr: "Télécharger", en: "Download" },
  today: { fr: "Aujourd'hui", en: "Today" },
  yesterday: { fr: "Hier", en: "Yesterday" },
  thisWeek: { fr: "Cette semaine", en: "This week" },
  thisMonth: { fr: "Ce mois", en: "This month" },

  // Navigation - Parent
  myChildren: { fr: "Mes enfants", en: "My Children" },
  attendance: { fr: "Présences", en: "Attendance" },
  homework: { fr: "Devoirs", en: "Homework" },
  gradesReports: { fr: "Notes & Bulletins", en: "Grades & Reports" },
  messages: { fr: "Messages", en: "Messages" },
  calendar: { fr: "Calendrier", en: "Calendar" },
  gallery: { fr: "Galerie", en: "Gallery" },
  authorizations: { fr: "Autorisations", en: "Authorizations" },

  // Navigation - Teacher
  myClasses: { fr: "Mes classes", en: "My Classes" },
  rollCall: { fr: "Pointage", en: "Roll Call" },
  grades: { fr: "Notes", en: "Grades" },

  // Navigation - Admin
  establishments: { fr: "Établissements", en: "Establishments" },
  users: { fr: "Utilisateurs", en: "Users" },
  classes: { fr: "Classes", en: "Classes" },
  announcements: { fr: "Annonces", en: "Announcements" },
  reports: { fr: "Rapports", en: "Reports" },

  // Roles
  parent: { fr: "Parent", en: "Parent" },
  teacher: { fr: "Enseignant", en: "Teacher" },
  admin: { fr: "Administrateur", en: "Administrator" },

  // Stats
  students: { fr: "Élèves", en: "Students" },
  teachers: { fr: "Enseignants", en: "Teachers" },
  parents: { fr: "Parents", en: "Parents" },
  attendanceRate: { fr: "Taux de présence", en: "Attendance Rate" },
  generalAverage: { fr: "Moyenne générale", en: "General Average" },
  upcomingEvents: { fr: "Événements à venir", en: "Upcoming Events" },
  sentMessages: { fr: "Messages envoyés", en: "Sent Messages" },

  // Parent Dashboard
  childInfo: { fr: "Informations enfant", en: "Child Information" },
  class: { fr: "Classe", en: "Class" },
  monthlyAttendance: { fr: "Présence mensuelle", en: "Monthly Attendance" },
  upcomingHomework: { fr: "Devoirs à venir", en: "Upcoming Homework" },
  latestAnnouncements: { fr: "Dernières annonces", en: "Latest Announcements" },
  quickActions: { fr: "Actions rapides", en: "Quick Actions" },
  contactTeacher: { fr: "Contacter l'enseignant", en: "Contact Teacher" },
  viewGrades: { fr: "Voir les notes", en: "View Grades" },
  manageAuthorizations: { fr: "Gérer autorisations", en: "Manage Authorizations" },
  dueDate: { fr: "Date limite", en: "Due date" },
  present: { fr: "Présent", en: "Present" },
  absent: { fr: "Absent", en: "Absent" },
  late: { fr: "Retard", en: "Late" },
  justified: { fr: "Justifié", en: "Justified" },

  // Teacher Dashboard
  todayRollCall: { fr: "Pointage du jour", en: "Today's Roll Call" },
  selectClass: { fr: "Sélectionner une classe", en: "Select a class" },
  markAllPresent: { fr: "Tous présents", en: "Mark All Present" },
  validateRollCall: { fr: "Valider le pointage", en: "Validate Roll Call" },
  morning: { fr: "Matin", en: "Morning" },
  afternoon: { fr: "Après-midi", en: "Afternoon" },
  studentsPresent: { fr: "Élèves présents", en: "Students present" },
  homeworkAssigned: { fr: "Devoirs assignés", en: "Homework assigned" },
  pendingGrades: { fr: "Notes en attente", en: "Pending grades" },
  unreadMessages: { fr: "Messages non lus", en: "Unread messages" },
  recentActivity: { fr: "Activité récente", en: "Recent Activity" },
  createHomework: { fr: "Créer un devoir", en: "Create Homework" },
  enterGrades: { fr: "Saisir des notes", en: "Enter Grades" },
  sendMessage: { fr: "Envoyer un message", en: "Send Message" },
  publishContent: { fr: "Publier du contenu", en: "Publish Content" },
  comment: { fr: "Commentaire", en: "Comment" },

  // Admin Dashboard
  overview: { fr: "Vue d'ensemble", en: "Overview" },
  systemStats: { fr: "Statistiques système", en: "System Statistics" },
  recentUsers: { fr: "Utilisateurs récents", en: "Recent Users" },
  pendingApprovals: { fr: "Approbations en attente", en: "Pending Approvals" },
  approve: { fr: "Approuver", en: "Approve" },
  reject: { fr: "Rejeter", en: "Reject" },
  addUser: { fr: "Ajouter un utilisateur", en: "Add User" },
  addEstablishment: { fr: "Ajouter un établissement", en: "Add Establishment" },
  generateReport: { fr: "Générer un rapport", en: "Generate Report" },
  manageClasses: { fr: "Gérer les classes", en: "Manage Classes" },
  city: { fr: "Ville", en: "City" },
  country: { fr: "Pays", en: "Country" },
  email: { fr: "Email", en: "Email" },
  phone: { fr: "Téléphone", en: "Phone" },
  role: { fr: "Rôle", en: "Role" },
  status: { fr: "Statut", en: "Status" },
  active: { fr: "Actif", en: "Active" },
  pending: { fr: "En attente", en: "Pending" },
  inactive: { fr: "Inactif", en: "Inactive" },

  // Auth
  login: { fr: "Connexion", en: "Login" },
  register: { fr: "Inscription", en: "Register" },
  password: { fr: "Mot de passe", en: "Password" },
  confirmPassword: { fr: "Confirmer le mot de passe", en: "Confirm Password" },
  forgotPassword: { fr: "Mot de passe oublié ?", en: "Forgot Password?" },
  rememberMe: { fr: "Se souvenir de moi", en: "Remember me" },
  noAccount: { fr: "Pas encore de compte ?", en: "Don't have an account?" },
  hasAccount: { fr: "Déjà un compte ?", en: "Already have an account?" },
  signUp: { fr: "S'inscrire", en: "Sign Up" },
  signIn: { fr: "Se connecter", en: "Sign In" },

  // Misc
  welcome: { fr: "Bienvenue", en: "Welcome" },
  loading: { fr: "Chargement...", en: "Loading..." },
  noData: { fr: "Aucune donnée", en: "No data" },
  seeAll: { fr: "Voir tout", en: "See All" },
  back: { fr: "Retour", en: "Back" },
  next: { fr: "Suivant", en: "Next" },
  previous: { fr: "Précédent", en: "Previous" },
  subject: { fr: "Matière", en: "Subject" },
  title: { fr: "Titre", en: "Title" },
  description: { fr: "Description", en: "Description" },
  date: { fr: "Date", en: "Date" },
  actions: { fr: "Actions", en: "Actions" },
  priority: { fr: "Priorité", en: "Priority" },
  important: { fr: "Important", en: "Important" },
  urgent: { fr: "Urgent", en: "Urgent" },
  normal: { fr: "Normal", en: "Normal" },
  new: { fr: "Nouveau", en: "New" },
  inProgress: { fr: "En cours", en: "In Progress" },
  completed: { fr: "Terminé", en: "Completed" },
  overdue: { fr: "En retard", en: "Overdue" },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("argon-language");
    return (saved as Language) || "fr";
  });

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("argon-language", lang);
  };

  const t = (key: string): string => {
    const translation = translations[key];
    if (!translation) {
      console.warn(`Translation missing for key: ${key}`);
      return key;
    }
    return translation[language];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
