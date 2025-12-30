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
import AdminDashboard from "./pages/admin/Dashboard";
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
            <Route path="/parent/dashboard" element={<ParentDashboard />} />
            <Route path="/parent/*" element={<ParentDashboard />} />
            <Route path="/enseignant/dashboard" element={<TeacherDashboard />} />
            <Route path="/enseignant/*" element={<TeacherDashboard />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/*" element={<AdminDashboard />} />
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
