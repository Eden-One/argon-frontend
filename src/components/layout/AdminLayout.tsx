import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LanguageSwitch } from "@/components/LanguageSwitch";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  LayoutDashboard,
  GraduationCap,
  Users,
  UserCheck,
  BookOpen,
  CalendarCheck,
  ClipboardList,
  FileSpreadsheet,
  Megaphone,
  Image,
  ShieldCheck,
  Calendar,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  Search,
  ChevronDown,
  Bell,
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
  badge?: number;
  onClick?: () => void;
}

const SidebarLink = ({ to, icon, label, active, badge, onClick }: SidebarLinkProps) => (
  <Link to={to} onClick={onClick}>
    <motion.div
      whileHover={{ x: 4 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "flex items-center justify-between gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 group",
        active
          ? "bg-primary text-primary-foreground shadow-md"
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      )}
    >
      <div className="flex items-center gap-3">
        <span className={cn("transition-colors", active ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground")}>
          {icon}
        </span>
        <span className="font-medium text-sm">{label}</span>
      </div>
      {badge !== undefined && badge > 0 && (
        <Badge variant={active ? "secondary" : "destructive"} className="h-5 min-w-5 px-1.5 text-xs">
          {badge}
        </Badge>
      )}
    </motion.div>
  </Link>
);

interface AdminLayoutProps {
  children: React.ReactNode;
}

const menuItems = [
  { to: "/admin/dashboard", icon: <LayoutDashboard size={18} />, label: "Dashboard" },
  { to: "/admin/classes", icon: <GraduationCap size={18} />, label: "Classes" },
  { to: "/admin/enseignants", icon: <Users size={18} />, label: "Enseignants" },
  { to: "/admin/parents", icon: <UserCheck size={18} />, label: "Parents" },
  { to: "/admin/eleves", icon: <BookOpen size={18} />, label: "Élèves" },
  { to: "/admin/presence", icon: <CalendarCheck size={18} />, label: "Présence" },
  { to: "/admin/devoirs", icon: <ClipboardList size={18} />, label: "Devoirs" },
  { to: "/admin/notes", icon: <FileSpreadsheet size={18} />, label: "Notes & Bulletins" },
  { to: "/admin/annonces", icon: <Megaphone size={18} />, label: "Annonces", badge: 2 },
  { to: "/admin/galerie", icon: <Image size={18} />, label: "Galerie & Activités" },
  { to: "/admin/autorisations", icon: <ShieldCheck size={18} />, label: "Autorisations de retrait" },
  { to: "/admin/calendrier", icon: <Calendar size={18} />, label: "Calendrier scolaire" },
  { to: "/admin/rapports", icon: <BarChart3 size={18} />, label: "Rapports" },
  { to: "/admin/parametres", icon: <Settings size={18} />, label: "Paramètres" },
];

const adminUser = {
  name: "Mme. Fatou Diallo",
  email: "f.diallo@lycee-victor-hugo.edu",
  role: "Administrateur",
  etablissement: "Lycée Victor Hugo",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=FatouDiallo",
};

export const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-card border-r border-border fixed h-full">
        {/* Logo */}
        <div className="h-16 px-6 flex items-center border-b border-border">
          <Link to="/admin/dashboard" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg">
              <School className="text-primary-foreground" size={18} />
            </div>
            <div>
              <span className="font-display text-lg font-bold text-foreground">ARGON</span>
              <span className="text-[10px] text-muted-foreground ml-1.5 font-medium">ÉTABLISSEMENT</span>
            </div>
          </Link>
        </div>

        {/* Établissement info */}
        <div className="px-4 py-3 border-b border-border">
          <p className="text-xs text-muted-foreground">Établissement</p>
          <p className="text-sm font-medium text-foreground truncate">{adminUser.etablissement}</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto scrollbar-thin">
          <div className="mb-4">
            <span className="px-4 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
              Navigation
            </span>
          </div>
          {menuItems.map((item) => (
            <SidebarLink
              key={item.to}
              {...item}
              active={location.pathname === item.to || location.pathname.startsWith(item.to + "/")}
            />
          ))}
        </nav>

        {/* User section */}
        <div className="p-3 border-t border-border">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
            <Avatar className="h-9 w-9">
              <AvatarImage src={adminUser.avatar} />
              <AvatarFallback>FD</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{adminUser.name}</p>
              <p className="text-xs text-muted-foreground truncate">{adminUser.role}</p>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
              <LogOut size={16} />
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
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed left-0 top-0 bottom-0 w-72 bg-card z-50 lg:hidden flex flex-col shadow-2xl"
            >
              {/* Logo */}
              <div className="h-16 px-6 flex items-center justify-between border-b border-border">
                <Link to="/admin/dashboard" className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
                    <School className="text-primary-foreground" size={18} />
                  </div>
                  <span className="font-display text-lg font-bold text-foreground">ARGON</span>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSidebarOpen(false)}
                  className="text-muted-foreground"
                >
                  <X size={20} />
                </Button>
              </div>

              {/* Établissement info */}
              <div className="px-4 py-3 border-b border-border">
                <p className="text-xs text-muted-foreground">Établissement</p>
                <p className="text-sm font-medium text-foreground truncate">{adminUser.etablissement}</p>
              </div>

              {/* Navigation */}
              <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
                {menuItems.map((item) => (
                  <SidebarLink
                    key={item.to}
                    {...item}
                    active={location.pathname === item.to}
                    onClick={() => setSidebarOpen(false)}
                  />
                ))}
              </nav>

              {/* User section */}
              <div className="p-3 border-t border-border">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={adminUser.avatar} />
                    <AvatarFallback>FD</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{adminUser.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{adminUser.role}</p>
                  </div>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 lg:ml-64">
        {/* Top Header */}
        <header className="sticky top-0 z-30 bg-background/95 backdrop-blur-md border-b border-border">
          <div className="flex items-center justify-between h-16 px-4 md:px-6">
            {/* Left side */}
            <div className="flex items-center gap-4">
              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu size={22} />
              </Button>

              {/* Search */}
              <div className="hidden md:flex items-center gap-2 bg-muted/50 rounded-lg px-3 py-1.5 w-72 border border-border/50">
                <Search size={16} className="text-muted-foreground" />
                <Input
                  placeholder="Rechercher élève, enseignant, classe..."
                  className="border-0 bg-transparent h-7 p-0 focus-visible:ring-0 placeholder:text-muted-foreground/60"
                />
                <kbd className="hidden sm:inline-flex h-5 items-center gap-1 rounded bg-muted px-1.5 font-mono text-[10px] text-muted-foreground">
                  ⌘K
                </kbd>
              </div>
            </div>

            {/* Right side actions */}
            <div className="flex items-center gap-2">
              {/* Mobile search */}
              <Button variant="ghost" size="icon" className="md:hidden">
                <Search size={20} />
              </Button>

              {/* Language Switch */}
              <LanguageSwitch />

              {/* Notifications */}
              <Button variant="ghost" size="icon" className="relative">
                <Bell size={20} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full animate-pulse" />
              </Button>

              {/* User dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2 px-2 ml-2">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={adminUser.avatar} />
                      <AvatarFallback>FD</AvatarFallback>
                    </Avatar>
                    <div className="hidden md:block text-left">
                      <p className="text-sm font-medium">{adminUser.name}</p>
                    </div>
                    <ChevronDown size={16} className="text-muted-foreground hidden md:block" />
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
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Rapports
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    Déconnexion
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};
