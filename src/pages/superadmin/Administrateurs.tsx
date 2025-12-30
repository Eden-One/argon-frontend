import { useState } from "react";
import { motion } from "framer-motion";
import { SuperAdminLayout } from "@/components/layout/SuperAdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Plus,
  Search,
  MoreHorizontal,
  Eye,
  Edit,
  KeyRound,
  Trash2,
  UserCog,
  Mail,
} from "lucide-react";
import { administrateursList, etablissementsList } from "@/data/superAdminMockData";
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
    case "suspendu":
      return <Badge variant="destructive">Suspendu</Badge>;
    default:
      return <Badge variant="secondary">{statut}</Badge>;
  }
};

const permissions = [
  { id: "users", label: "Gestion utilisateurs" },
  { id: "classes", label: "Gestion classes" },
  { id: "grades", label: "Gestion notes" },
  { id: "attendance", label: "Gestion présences" },
  { id: "messages", label: "Messagerie" },
  { id: "reports", label: "Rapports" },
  { id: "settings", label: "Paramètres" },
];

export default function Administrateurs() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterEtablissement, setFilterEtablissement] = useState("all");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  const filteredAdmins = administrateursList.filter((admin) => {
    const matchesSearch = 
      admin.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      admin.prenom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesEtab = filterEtablissement === "all" || admin.etablissementId === filterEtablissement;
    return matchesSearch && matchesEtab;
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
            <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">Administrateurs</h1>
            <p className="text-muted-foreground mt-1">Gérer les administrateurs des établissements</p>
          </div>
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Ajouter un administrateur
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Ajouter un administrateur</DialogTitle>
                <DialogDescription>
                  Un email d'invitation sera envoyé à l'administrateur.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="prenom">Prénom *</Label>
                    <Input id="prenom" placeholder="Ex: Jean" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nom">Nom *</Label>
                    <Input id="nom" placeholder="Ex: Dupont" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input id="email" type="email" placeholder="admin@ecole.edu" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="etablissement">Établissement *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un établissement" />
                    </SelectTrigger>
                    <SelectContent>
                      {etablissementsList.map((etab) => (
                        <SelectItem key={etab.id} value={etab.id}>{etab.nom}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-3">
                  <Label>Permissions</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {permissions.map((perm) => (
                      <div key={perm.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={perm.id}
                          checked={selectedPermissions.includes(perm.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedPermissions([...selectedPermissions, perm.id]);
                            } else {
                              setSelectedPermissions(selectedPermissions.filter(p => p !== perm.id));
                            }
                          }}
                        />
                        <label
                          htmlFor={perm.id}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {perm.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateOpen(false)}>Annuler</Button>
                <Button onClick={() => setIsCreateOpen(false)}>
                  <Mail className="h-4 w-4 mr-2" />
                  Envoyer l'invitation
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </motion.div>

        {/* Filters */}
        <motion.div variants={item}>
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Rechercher par nom, email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={filterEtablissement} onValueChange={setFilterEtablissement}>
                  <SelectTrigger className="w-full md:w-[250px]">
                    <SelectValue placeholder="Tous les établissements" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les établissements</SelectItem>
                    {etablissementsList.map((etab) => (
                      <SelectItem key={etab.id} value={etab.id}>{etab.nom}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Table */}
        <motion.div variants={item}>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <UserCog className="h-5 w-5 text-primary" />
                Liste des administrateurs ({filteredAdmins.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Administrateur</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Établissement</TableHead>
                      <TableHead>Dernière connexion</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAdmins.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                          Aucun administrateur trouvé
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredAdmins.map((admin) => (
                        <TableRow key={admin.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarImage src={admin.avatar} />
                                <AvatarFallback>{admin.prenom[0]}{admin.nom[0]}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{admin.prenom} {admin.nom}</p>
                                <p className="text-xs text-muted-foreground">{admin.telephone}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{admin.email}</TableCell>
                          <TableCell>{admin.etablissement}</TableCell>
                          <TableCell>
                            <span className="text-muted-foreground">
                              {formatDistanceToNow(new Date(admin.derniereConnexion), { addSuffix: true, locale: fr })}
                            </span>
                          </TableCell>
                          <TableCell>{getStatusBadge(admin.statut)}</TableCell>
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
                                <DropdownMenuItem>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Modifier
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <KeyRound className="h-4 w-4 mr-2" />
                                  Réinitialiser mot de passe
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive">
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Supprimer
                                </DropdownMenuItem>
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
