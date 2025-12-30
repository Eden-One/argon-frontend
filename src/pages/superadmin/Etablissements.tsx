import { useState } from "react";
import { motion } from "framer-motion";
import { SuperAdminLayout } from "@/components/layout/SuperAdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Pause,
  Play,
  Trash2,
  Download,
  Building,
} from "lucide-react";
import { etablissementsList } from "@/data/superAdminMockData";
import { Link } from "react-router-dom";

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
    case "en_attente":
      return <Badge variant="warning">En attente</Badge>;
    default:
      return <Badge variant="secondary">{statut}</Badge>;
  }
};

const getPlanBadge = (plan: string) => {
  switch (plan) {
    case "Premium":
      return <Badge className="bg-warning/20 text-warning border-warning/30">Premium</Badge>;
    case "Standard":
      return <Badge className="bg-primary/20 text-primary border-primary/30">Standard</Badge>;
    case "Gratuit":
      return <Badge variant="secondary">Gratuit</Badge>;
    default:
      return <Badge variant="outline">{plan}</Badge>;
  }
};

export default function Etablissements() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPays, setFilterPays] = useState("all");
  const [filterStatut, setFilterStatut] = useState("all");
  const [filterPlan, setFilterPlan] = useState("all");
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const filteredEtablissements = etablissementsList.filter((etab) => {
    const matchesSearch = etab.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      etab.ville.toLowerCase().includes(searchQuery.toLowerCase()) ||
      etab.adminPrincipal.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPays = filterPays === "all" || etab.pays === filterPays;
    const matchesStatut = filterStatut === "all" || etab.statut === filterStatut;
    const matchesPlan = filterPlan === "all" || etab.abonnement === filterPlan;
    return matchesSearch && matchesPays && matchesStatut && matchesPlan;
  });

  const paysUniques = [...new Set(etablissementsList.map(e => e.pays))];

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
            <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">Établissements</h1>
            <p className="text-muted-foreground mt-1">Gérer tous les établissements de la plateforme</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Exporter
            </Button>
            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Créer établissement
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Créer un établissement</DialogTitle>
                  <DialogDescription>
                    Remplissez les informations pour créer un nouvel établissement.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nom">Nom de l'établissement *</Label>
                      <Input id="nom" placeholder="Ex: Lycée Victor Hugo" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="type">Type *</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="public">Public</SelectItem>
                          <SelectItem value="prive">Privé</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="adresse">Adresse *</Label>
                    <Input id="adresse" placeholder="Adresse complète" />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="ville">Ville *</Label>
                      <Input id="ville" placeholder="Ex: Dakar" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pays">Pays *</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="senegal">Sénégal</SelectItem>
                          <SelectItem value="cote-ivoire">Côte d'Ivoire</SelectItem>
                          <SelectItem value="cameroun">Cameroun</SelectItem>
                          <SelectItem value="gabon">Gabon</SelectItem>
                          <SelectItem value="mali">Mali</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email admin *</Label>
                      <Input id="email" type="email" placeholder="admin@ecole.edu" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="telephone">Téléphone *</Label>
                      <Input id="telephone" placeholder="+221 XX XXX XX XX" />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="plan">Plan d'abonnement *</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="gratuit">Gratuit</SelectItem>
                          <SelectItem value="standard">Standard</SelectItem>
                          <SelectItem value="premium">Premium</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="date">Date de démarrage *</Label>
                      <Input id="date" type="date" />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsCreateOpen(false)}>Annuler</Button>
                  <Button onClick={() => setIsCreateOpen(false)}>Créer l'établissement</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div variants={item}>
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Rechercher par nom, ville, admin..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  <Select value={filterPays} onValueChange={setFilterPays}>
                    <SelectTrigger className="w-[150px]">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Pays" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les pays</SelectItem>
                      {paysUniques.map((pays) => (
                        <SelectItem key={pays} value={pays}>{pays}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={filterStatut} onValueChange={setFilterStatut}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Statut" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les statuts</SelectItem>
                      <SelectItem value="actif">Actif</SelectItem>
                      <SelectItem value="suspendu">Suspendu</SelectItem>
                      <SelectItem value="en_attente">En attente</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={filterPlan} onValueChange={setFilterPlan}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Plan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les plans</SelectItem>
                      <SelectItem value="Gratuit">Gratuit</SelectItem>
                      <SelectItem value="Standard">Standard</SelectItem>
                      <SelectItem value="Premium">Premium</SelectItem>
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
                <Building className="h-5 w-5 text-primary" />
                Liste des établissements ({filteredEtablissements.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Établissement</TableHead>
                      <TableHead>Ville / Pays</TableHead>
                      <TableHead className="text-center">Élèves</TableHead>
                      <TableHead>Admin principal</TableHead>
                      <TableHead>Abonnement</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredEtablissements.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                          Aucun établissement trouvé
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredEtablissements.map((etab) => (
                        <TableRow key={etab.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center overflow-hidden">
                                <img src={etab.logo} alt={etab.nom} className="w-full h-full object-cover" />
                              </div>
                              <div>
                                <p className="font-medium">{etab.nom}</p>
                                <p className="text-xs text-muted-foreground">{etab.type}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p>{etab.ville}</p>
                              <p className="text-xs text-muted-foreground">{etab.pays}</p>
                            </div>
                          </TableCell>
                          <TableCell className="text-center">
                            <div>
                              <p className="font-medium">{etab.eleves}</p>
                              <p className="text-xs text-muted-foreground">{etab.enseignants} ens.</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium">{etab.adminPrincipal}</p>
                              <p className="text-xs text-muted-foreground">{etab.adminEmail}</p>
                            </div>
                          </TableCell>
                          <TableCell>{getPlanBadge(etab.abonnement)}</TableCell>
                          <TableCell>{getStatusBadge(etab.statut)}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem asChild>
                                  <Link to={`/superadmin/etablissements/${etab.id}`}>
                                    <Eye className="h-4 w-4 mr-2" />
                                    Voir détails
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Modifier
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                {etab.statut === "actif" ? (
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
