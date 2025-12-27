import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  ClipboardCheck,
  MessageSquare,
  Calendar,
  Image,
  Shield,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  ChevronDown,
  School,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const SidebarLink = ({ to, icon, label, active, onClick }: SidebarLinkProps) => (
  <Link to={to} onClick={onClick}>
    <motion.div
      whileHover={{ x: 4 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
        active
          ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-lg"
          : "text-sidebar-foreground hover:bg-sidebar-accent"
      )}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </motion.div>
  </Link>
);

interface DashboardLayoutProps {
  children: React.ReactNode;
  userRole: "parent" | "enseignant" | "admin";
}

const menuItems = {
  parent: [
    { to: "/parent/dashboard", icon: <LayoutDashboard size={20} />, label: "Tableau de bord" },
    { to: "/parent/enfants", icon: <Users size={20} />, label: "Mes enfants" },
    { to: "/parent/presence", icon: <ClipboardCheck size={20} />, label: "Présences" },
    { to: "/parent/devoirs", icon: <BookOpen size={20} />, label: "Devoirs" },
    { to: "/parent/notes", icon: <GraduationCap size={20} />, label: "Notes & Bulletins" },
    { to: "/parent/messages", icon: <MessageSquare size={20} />, label: "Messages" },
    { to: "/parent/calendrier", icon: <Calendar size={20} />, label: "Calendrier" },
    { to: "/parent/galerie", icon: <Image size={20} />, label: "Galerie" },
    { to: "/parent/autorisations", icon: <Shield size={20} />, label: "Autorisations" },
  ],
  enseignant: [
    { to: "/enseignant/dashboard", icon: <LayoutDashboard size={20} />, label: "Tableau de bord" },
    { to: "/enseignant/classes", icon: <School size={20} />, label: "Mes classes" },
    { to: "/enseignant/presence", icon: <ClipboardCheck size={20} />, label: "Pointage" },
    { to: "/enseignant/devoirs", icon: <BookOpen size={20} />, label: "Devoirs" },
    { to: "/enseignant/notes", icon: <GraduationCap size={20} />, label: "Notes" },
    { to: "/enseignant/messages", icon: <MessageSquare size={20} />, label: "Messages" },
    { to: "/enseignant/calendrier", icon: <Calendar size={20} />, label: "Calendrier" },
    { to: "/enseignant/galerie", icon: <Image size={20} />, label: "Galerie" },
  ],
  admin: [
    { to: "/admin/dashboard", icon: <LayoutDashboard size={20} />, label: "Tableau de bord" },
    { to: "/admin/etablissements", icon: <School size={20} />, label: "Établissements" },
    { to: "/admin/utilisateurs", icon: <Users size={20} />, label: "Utilisateurs" },
    { to: "/admin/classes", icon: <GraduationCap size={20} />, label: "Classes" },
    { to: "/admin/annonces", icon: <MessageSquare size={20} />, label: "Annonces" },
    { to: "/admin/calendrier", icon: <Calendar size={20} />, label: "Calendrier" },
    { to: "/admin/rapports", icon: <BookOpen size={20} />, label: "Rapports" },
    { to: "/admin/parametres", icon: <Settings size={20} />, label: "Paramètres" },
  ],
};

const userInfo = {
  parent: { name: "Mamadou Diop", role: "Parent", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mamadou" },
  enseignant: { name: "Abdoulaye Diallo", role: "Enseignant", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Diallo" },
  admin: { name: "Fatou Sow", role: "Administrateur", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fatou" },
};

export const DashboardLayout = ({ children, userRole }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const user = userInfo[userRole];
  const items = menuItems[userRole];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col w-72 bg-sidebar border-r border-sidebar-border fixed h-full">
        {/* Logo */}
        <div className="p-6 border-b border-sidebar-border">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
              <span className="text-primary-foreground font-display font-bold text-xl">A</span>
            </div>
            <span className="font-display text-2xl font-bold text-sidebar-foreground">ARGON</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto scrollbar-thin">
          {items.map((item) => (
            <SidebarLink
              key={item.to}
              {...item}
              active={location.pathname === item.to}
            />
          ))}
        </nav>

        {/* User section */}
        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-sidebar-accent">
            <Avatar>
              <AvatarImage src={user.avatar} />
              <AvatarFallback>{user.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">{user.name}</p>
              <p className="text-xs text-sidebar-foreground/60">{user.role}</p>
            </div>
            <Button variant="ghost" size="icon-sm" className="text-sidebar-foreground/60 hover:text-sidebar-foreground">
              <LogOut size={18} />
            </Button>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-foreground/50 z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed left-0 top-0 bottom-0 w-72 bg-sidebar z-50 lg:hidden flex flex-col"
            >
              {/* Logo */}
              <div className="p-6 border-b border-sidebar-border flex items-center justify-between">
                <Link to="/" className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
                    <span className="text-primary-foreground font-display font-bold text-xl">A</span>
                  </div>
                  <span className="font-display text-2xl font-bold text-sidebar-foreground">ARGON</span>
                </Link>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => setSidebarOpen(false)}
                  className="text-sidebar-foreground"
                >
                  <X size={20} />
                </Button>
              </div>

              {/* Navigation */}
              <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                {items.map((item) => (
                  <SidebarLink
                    key={item.to}
                    {...item}
                    active={location.pathname === item.to}
                    onClick={() => setSidebarOpen(false)}
                  />
                ))}
              </nav>

              {/* User section */}
              <div className="p-4 border-t border-sidebar-border">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-sidebar-accent">
                  <Avatar>
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-sidebar-foreground truncate">{user.name}</p>
                    <p className="text-xs text-sidebar-foreground/60">{user.role}</p>
                  </div>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 lg:ml-72">
        {/* Top Header */}
        <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-lg border-b border-border">
          <div className="flex items-center justify-between h-16 px-4 md:px-6">
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={24} />
            </Button>

            {/* Search - Desktop */}
            <div className="hidden md:block flex-1 max-w-md">
              {/* Search could go here */}
            </div>

            {/* Right side actions */}
            <div className="flex items-center gap-3">
              {/* Notifications */}
              <Button variant="ghost" size="icon" className="relative">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-danger rounded-full" />
              </Button>

              {/* User dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2 px-2">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar>
                    <span className="hidden md:block font-medium">{user.name}</span>
                    <ChevronDown size={16} className="text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    Paramètres
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    Déconnexion
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};
