import { useState } from "react";
import { motion } from "framer-motion";
import { SuperAdminLayout } from "@/components/layout/SuperAdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Pause,
  Play,
  Users,
  Download,
} from "lucide-react";
import { utilisateursList, etablissementsList } from "@/data/superAdminMockData";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const getStatusBadge = (statut: string) => {
  switch (statut) {
    case "actif":
      return <Badge variant="success">Actif</Badge>;
    case "inactif":
      return <Badge variant="secondary">Inactif</Badge>;
    case "suspendu":
      return <Badge variant="destructive">Suspendu</Badge>;
    default:
      return <Badge variant="outline">{statut}</Badge>;
  }
};

const getRoleBadge = (role: string) => {
  switch (role) {
    case "parent":
      return <Badge className="bg-primary/20 text-primary border-primary/30">Parent</Badge>;
    case "enseignant":
      return <Badge className="bg-info/20 text-info border-info/30">Enseignant</Badge>;
    case "admin":
      return <Badge className="bg-warning/20 text-warning border-warning/30">Admin</Badge>;
    default:
      return <Badge variant="outline">{role}</Badge>;
  }
};

export default function Utilisateurs() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [filterEtablissement, setFilterEtablissement] = useState("all");
  const [filterStatut, setFilterStatut] = useState("all");

  const filteredUsers = utilisateursList.filter((user) => {
    const matchesSearch = 
      user.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.prenom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = filterRole === "all" || user.role === filterRole;
    const matchesEtab = filterEtablissement === "all" || user.etablissement === etablissementsList.find(e => e.id === filterEtablissement)?.nom;
    const matchesStatut = filterStatut === "all" || user.statut === filterStatut;
    return matchesSearch && matchesRole && matchesEtab && matchesStatut;
  });

  return (
    <SuperAdminLayout>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-6"
      >
        {/* Header */}
        <motion.div variants={item} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">Utilisateurs</h1>
            <p className="text-muted-foreground mt-1">Tous les utilisateurs de la plateforme</p>
          </div>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exporter
          </Button>
        </motion.div>

        {/* Filters */}
        <motion.div variants={item}>
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Rechercher par nom, email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  <Select value={filterRole} onValueChange={setFilterRole}>
                    <SelectTrigger className="w-[140px]">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Rôle" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les rôles</SelectItem>
                      <SelectItem value="parent">Parent</SelectItem>
                      <SelectItem value="enseignant">Enseignant</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={filterEtablissement} onValueChange={setFilterEtablissement}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Établissement" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les établissements</SelectItem>
                      {etablissementsList.map((etab) => (
                        <SelectItem key={etab.id} value={etab.id}>{etab.nom}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={filterStatut} onValueChange={setFilterStatut}>
                    <SelectTrigger className="w-[130px]">
                      <SelectValue placeholder="Statut" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous</SelectItem>
                      <SelectItem value="actif">Actif</SelectItem>
                      <SelectItem value="inactif">Inactif</SelectItem>
                      <SelectItem value="suspendu">Suspendu</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Table */}
        <motion.div variants={item}>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Liste des utilisateurs ({filteredUsers.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Utilisateur</TableHead>
                      <TableHead>Rôle</TableHead>
                      <TableHead>Email / Téléphone</TableHead>
                      <TableHead>Établissement</TableHead>
                      <TableHead>Dernière activité</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                          Aucun utilisateur trouvé
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarImage src={user.avatar} />
                                <AvatarFallback>{user.prenom[0]}{user.nom[0]}</AvatarFallback>
                              </Avatar>
                              <span className="font-medium">{user.prenom} {user.nom}</span>
                            </div>
                          </TableCell>
                          <TableCell>{getRoleBadge(user.role)}</TableCell>
                          <TableCell>
                            <div>
                              <p className="text-sm">{user.email}</p>
                              <p className="text-xs text-muted-foreground">{user.telephone}</p>
                            </div>
                          </TableCell>
                          <TableCell>{user.etablissement}</TableCell>
                          <TableCell>
                            <span className="text-muted-foreground">
                              {formatDistanceToNow(new Date(user.derniereActivite), { addSuffix: true, locale: fr })}
                            </span>
                          </TableCell>
                          <TableCell>{getStatusBadge(user.statut)}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Eye className="h-4 w-4 mr-2" />
                                  Voir profil
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                {user.statut === "actif" ? (
                                  <DropdownMenuItem className="text-warning">
                                    <Pause className="h-4 w-4 mr-2" />
                                    Suspendre
                                  </DropdownMenuItem>
                                ) : (
                                  <DropdownMenuItem className="text-success">
                                    <Play className="h-4 w-4 mr-2" />
                                    Réactiver
                                  </DropdownMenuItem>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </SuperAdminLayout>
  );
}
