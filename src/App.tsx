import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ParentDashboard from "./pages/parent/Dashboard";
import TeacherDashboard from "./pages/teacher/Dashboard";

// Admin pages
import AdminDashboard from "./pages/admin/Dashboard";
import AdminClasses from "./pages/admin/Classes";
import AdminEnseignants from "./pages/admin/Enseignants";
import AdminParents from "./pages/admin/Parents";
import AdminEleves from "./pages/admin/Eleves";
import AdminPresence from "./pages/admin/Presence";
import AdminDevoirs from "./pages/admin/Devoirs";
import AdminNotes from "./pages/admin/Notes";
import AdminAnnonces from "./pages/admin/Annonces";
import AdminGalerie from "./pages/admin/Galerie";
import AdminAutorisations from "./pages/admin/Autorisations";
import AdminCalendrier from "./pages/admin/Calendrier";
import AdminRapports from "./pages/admin/Rapports";
import AdminParametres from "./pages/admin/Parametres";

// SuperAdmin pages
import SuperAdminDashboard from "./pages/superadmin/Dashboard";
import Etablissements from "./pages/superadmin/Etablissements";
import Administrateurs from "./pages/superadmin/Administrateurs";
import Utilisateurs from "./pages/superadmin/Utilisateurs";
import Licences from "./pages/superadmin/Licences";
import Analytics from "./pages/superadmin/Analytics";
import Notifications from "./pages/superadmin/Notifications";
import Securite from "./pages/superadmin/Securite";
import Logs from "./pages/superadmin/Logs";
import Parametres from "./pages/superadmin/Parametres";
import Support from "./pages/superadmin/Support";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/connexion" element={<Login />} />
            <Route path="/inscription" element={<Register />} />
            
            {/* Parent routes */}
            <Route path="/parent/dashboard" element={<ParentDashboard />} />
            <Route path="/parent/*" element={<ParentDashboard />} />
            
            {/* Teacher routes */}
            <Route path="/enseignant/dashboard" element={<TeacherDashboard />} />
            <Route path="/enseignant/*" element={<TeacherDashboard />} />
            
            {/* Admin routes */}
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/classes" element={<AdminClasses />} />
            <Route path="/admin/enseignants" element={<AdminEnseignants />} />
            <Route path="/admin/parents" element={<AdminParents />} />
            <Route path="/admin/eleves" element={<AdminEleves />} />
            <Route path="/admin/presence" element={<AdminPresence />} />
            <Route path="/admin/devoirs" element={<AdminDevoirs />} />
            <Route path="/admin/notes" element={<AdminNotes />} />
            <Route path="/admin/annonces" element={<AdminAnnonces />} />
            <Route path="/admin/galerie" element={<AdminGalerie />} />
            <Route path="/admin/autorisations" element={<AdminAutorisations />} />
            <Route path="/admin/calendrier" element={<AdminCalendrier />} />
            <Route path="/admin/rapports" element={<AdminRapports />} />
            <Route path="/admin/parametres" element={<AdminParametres />} />
            <Route path="/admin/*" element={<AdminDashboard />} />
            
            {/* SuperAdmin routes */}
            <Route path="/superadmin/dashboard" element={<SuperAdminDashboard />} />
            <Route path="/superadmin/etablissements" element={<Etablissements />} />
            <Route path="/superadmin/administrateurs" element={<Administrateurs />} />
            <Route path="/superadmin/utilisateurs" element={<Utilisateurs />} />
            <Route path="/superadmin/licences" element={<Licences />} />
            <Route path="/superadmin/analytics" element={<Analytics />} />
            <Route path="/superadmin/notifications" element={<Notifications />} />
            <Route path="/superadmin/securite" element={<Securite />} />
            <Route path="/superadmin/logs" element={<Logs />} />
            <Route path="/superadmin/parametres" element={<Parametres />} />
            <Route path="/superadmin/support" element={<Support />} />
            <Route path="/superadmin/*" element={<SuperAdminDashboard />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
