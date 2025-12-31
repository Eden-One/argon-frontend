import { useState } from "react";
import { motion } from "framer-motion";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Users,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  UserX,
  Mail,
  Phone,
  Download,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { enseignantsData, classesData } from "@/data/adminMockData";
import { toast } from "sonner";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const Enseignants = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatut, setFilterStatut] = useState("all");
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const filteredEnseignants = enseignantsData.filter((ens) => {
    const matchesSearch = `${ens.prenom} ${ens.nom}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          ens.matieres.some(m => m.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatut = filterStatut === "all" || ens.statut === filterStatut;
    return matchesSearch && matchesStatut;
  });

  const enseignantsActifs = enseignantsData.filter(e => e.statut === "actif").length;

  const handleCreateEnseignant = () => {
    toast.success("Enseignant ajouté avec succès");
    setIsCreateOpen(false);
  };

  return (
    <AdminLayout>
      <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
        {/* Header */}
        <motion.div variants={item} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">Enseignants</h1>
            <p className="text-muted-foreground mt-1">Gérez les enseignants de votre établissement</p>
          </div>
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus size={18} />
                Ajouter un enseignant
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Ajouter un enseignant</DialogTitle>
                <DialogDescription>Remplissez les informations du nouvel enseignant</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="prenom">Prénom</Label>
                    <Input id="prenom" placeholder="Prénom" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="nom">Nom</Label>
                    <Input id="nom" placeholder="Nom" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="email@lycee.edu" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="telephone">Téléphone</Label>
                  <Input id="telephone" placeholder="+221 77 000 00 00" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="matieres">Matières enseignées</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner les matières" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="maths">Mathématiques</SelectItem>
                      <SelectItem value="francais">Français</SelectItem>
                      <SelectItem value="anglais">Anglais</SelectItem>
                      <SelectItem value="histoire">Histoire-Géographie</SelectItem>
                      <SelectItem value="sciences">Sciences Physiques</SelectItem>
                      <SelectItem value="svt">SVT</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="classes">Classes assignées</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner les classes" />
                    </SelectTrigger>
                    <SelectContent>
                      {classesData.map(c => (
                        <SelectItem key={c.id} value={c.id}>{c.nom}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateOpen(false)}>Annuler</Button>
                <Button onClick={handleCreateEnseignant}>Ajouter</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </motion.div>

        {/* Stats Cards */}
        <motion.div variants={item} className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-primary/10">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total enseignants</p>
                  <p className="text-2xl font-bold">{enseignantsData.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-success/10">
                  <CheckCircle className="h-6 w-6 text-success" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Actifs</p>
                  <p className="text-2xl font-bold">{enseignantsActifs}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-warning/10">
                  <XCircle className="h-6 w-6 text-warning" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Inactifs</p>
                  <p className="text-2xl font-bold">{enseignantsData.length - enseignantsActifs}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-info/10">
                  <Mail className="h-6 w-6 text-info" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Connectés aujourd'hui</p>
                  <p className="text-2xl font-bold">4</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Filters */}
        <motion.div variants={item}>
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Rechercher par nom ou matière..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={filterStatut} onValueChange={setFilterStatut}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les statuts</SelectItem>
                    <SelectItem value="actif">Actif</SelectItem>
                    <SelectItem value="inactif">Inactif</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" className="gap-2">
                  <Download size={16} />
                  Exporter
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Enseignants Table */}
        <motion.div variants={item}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Liste des enseignants ({filteredEnseignants.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Enseignant</TableHead>
                      <TableHead>Matières</TableHead>
                      <TableHead>Classes</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Dernière connexion</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredEnseignants.map((ens) => (
                      <TableRow key={ens.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={ens.avatar} />
                              <AvatarFallback>{ens.prenom[0]}{ens.nom[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{ens.prenom} {ens.nom}</p>
                              <p className="text-xs text-muted-foreground">{ens.email}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {ens.matieres.map((m, i) => (
                              <Badge key={i} variant="outline" className="text-xs">{m}</Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {ens.classes.slice(0, 2).map((c, i) => (
                              <Badge key={i} variant="secondary" className="text-xs">{c}</Badge>
                            ))}
                            {ens.classes.length > 2 && (
                              <Badge variant="secondary" className="text-xs">+{ens.classes.length - 2}</Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-1">
                            <span className="text-xs flex items-center gap-1">
                              <Mail size={12} className="text-muted-foreground" />
                              {ens.email}
                            </span>
                            <span className="text-xs flex items-center gap-1">
                              <Phone size={12} className="text-muted-foreground" />
                              {ens.telephone}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm text-muted-foreground">
                            {format(new Date(ens.derniereConnexion), "dd MMM yyyy HH:mm", { locale: fr })}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Badge variant={ens.statut === "actif" ? "success" : "secondary"}>
                            {ens.statut === "actif" ? "Actif" : "Inactif"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal size={16} />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                Voir profil
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Modifier
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Mail className="mr-2 h-4 w-4" />
                                Envoyer email
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">
                                <UserX className="mr-2 h-4 w-4" />
                                Désactiver
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </AdminLayout>
  );
};

export default Enseignants;
