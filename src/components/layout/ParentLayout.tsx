import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Home,
  Users,
  Calendar,
  BookOpen,
  GraduationCap,
  MessageSquare,
  Megaphone,
  Image,
  QrCode,
  CalendarDays,
  Settings,
  Menu,
  X,
  LogOut,
  Bell,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { enfants, parentInfo, alertesParent } from "@/data/parentMockData";

interface ParentLayoutProps {
  children: React.ReactNode;
}

const menuItems = [
  { icon: Home, label: "Accueil", path: "/parent/dashboard" },
  { icon: Users, label: "Mes Enfants", path: "/parent/enfants" },
  { icon: Calendar, label: "Présence", path: "/parent/presence" },
  { icon: BookOpen, label: "Devoirs", path: "/parent/devoirs" },
  { icon: GraduationCap, label: "Notes & Bulletins", path: "/parent/notes" },
  { icon: MessageSquare, label: "Messagerie", path: "/parent/messagerie", badge: 1 },
  { icon: Megaphone, label: "Annonces", path: "/parent/annonces", badge: 1 },
  { icon: Image, label: "Galerie", path: "/parent/galerie" },
  { icon: QrCode, label: "Autorisations", path: "/parent/autorisations" },
  { icon: CalendarDays, label: "Calendrier", path: "/parent/calendrier" },
  { icon: Settings, label: "Paramètres", path: "/parent/parametres" },
];

export default function ParentLayout({ children }: ParentLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedEnfant, setSelectedEnfant] = useState(enfants[0]);
  const navigate = useNavigate();
  const unreadAlerts = alertesParent.filter((a) => !a.lu).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50/30 via-background to-orange-50/20">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-background/95 backdrop-blur-sm border-b z-50 px-4 flex items-center justify-between">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarOpen(true)}
          className="text-muted-foreground"
        >
          <Menu className="h-6 w-6" />
        </Button>

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">A</span>
          </div>
          <span className="font-display font-bold text-lg">ARGON</span>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            {unreadAlerts > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-amber-500">
                {unreadAlerts}
              </Badge>
            )}
          </Button>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-50"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-full bg-background border-r z-50 transition-transform duration-300 w-72",
          "lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Sidebar Header */}
        <div className="h-16 px-4 flex items-center justify-between border-b bg-gradient-to-r from-amber-500/10 to-orange-500/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <div>
              <h1 className="font-display font-bold text-lg">ARGON</h1>
              <p className="text-xs text-muted-foreground">Espace Parent</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Child Selector */}
        <div className="p-4 border-b">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-between h-auto py-3 bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200 hover:from-amber-100 hover:to-orange-100"
              >
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 border-2 border-amber-300">
                    <AvatarImage src={selectedEnfant.photo} />
                    <AvatarFallback className="bg-amber-100 text-amber-700">
                      {selectedEnfant.prenom[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-left">
                    <p className="font-medium text-sm">{selectedEnfant.prenom}</p>
                    <p className="text-xs text-muted-foreground">{selectedEnfant.classe}</p>
                  </div>
                </div>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64">
              {enfants.map((enfant) => (
                <DropdownMenuItem
                  key={enfant.id}
                  onClick={() => setSelectedEnfant(enfant)}
                  className="py-3"
                >
                  <Avatar className="h-8 w-8 mr-3">
                    <AvatarImage src={enfant.photo} />
                    <AvatarFallback>{enfant.prenom[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{enfant.prenom} {enfant.nom}</p>
                    <p className="text-xs text-muted-foreground">{enfant.classe}</p>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                  isActive
                    ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md"
                    : "text-muted-foreground hover:bg-amber-50 hover:text-amber-700"
                )
              }
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
              {item.badge && (
                <Badge className="ml-auto bg-amber-500 hover:bg-amber-600">
                  {item.badge}
                </Badge>
              )}
            </NavLink>
          ))}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
            <Avatar className="h-10 w-10 border-2 border-amber-200">
              <AvatarImage src={parentInfo.avatar} />
              <AvatarFallback className="bg-amber-100 text-amber-700">
                {parentInfo.prenom[0]}{parentInfo.nom[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">
                {parentInfo.prenom} {parentInfo.nom}
              </p>
              <p className="text-xs text-muted-foreground truncate">Parent</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/connexion")}
              className="text-muted-foreground hover:text-destructive"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:pl-72 pt-16 lg:pt-0 min-h-screen">
        <div className="p-4 lg:p-8">{children}</div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-background border-t z-40 px-2 py-2">
        <div className="flex justify-around">
          {[menuItems[0], menuItems[1], menuItems[3], menuItems[5], menuItems[8]].map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors relative",
                  isActive
                    ? "text-amber-600"
                    : "text-muted-foreground"
                )
              }
            >
              <item.icon className="h-5 w-5" />
              <span className="text-[10px] font-medium">{item.label.split(" ")[0]}</span>
              {item.badge && (
                <Badge className="absolute -top-1 right-0 h-4 w-4 p-0 flex items-center justify-center text-[10px] bg-amber-500">
                  {item.badge}
                </Badge>
              )}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
}
