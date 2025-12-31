import { useState } from "react";
import { motion } from "framer-motion";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
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
  GraduationCap,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Users,
  TrendingUp,
  Download,
} from "lucide-react";
import { classesData, enseignantsData } from "@/data/adminMockData";
import { toast } from "sonner";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const Classes = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterNiveau, setFilterNiveau] = useState("all");
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const filteredClasses = classesData.filter((classe) => {
    const matchesSearch = classe.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          classe.professeurPrincipal.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesNiveau = filterNiveau === "all" || classe.niveau === filterNiveau;
    return matchesSearch && matchesNiveau;
  });

  const niveaux = [...new Set(classesData.map(c => c.niveau))];
  const totalEleves = classesData.reduce((acc, c) => acc + c.effectif, 0);

  const handleCreateClass = () => {
    toast.success("Classe créée avec succès");
    setIsCreateOpen(false);
  };

  return (
    <AdminLayout>
      <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
        {/* Header */}
        <motion.div variants={item} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">Classes</h1>
            <p className="text-muted-foreground mt-1">Gérez les classes de votre établissement</p>
          </div>
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus size={18} />
                Créer une classe
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Créer une nouvelle classe</DialogTitle>
                <DialogDescription>Remplissez les informations de la nouvelle classe</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="nom">Nom de la classe</Label>
                  <Input id="nom" placeholder="ex: 6ème D" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="niveau">Niveau</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                      <SelectContent>
                        {niveaux.map(n => (
                          <SelectItem key={n} value={n}>{n}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="annee">Année scolaire</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2023-2024">2023-2024</SelectItem>
                        <SelectItem value="2024-2025">2024-2025</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="prof">Professeur principal</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un enseignant" />
                    </SelectTrigger>
                    <SelectContent>
                      {enseignantsData.map(e => (
                        <SelectItem key={e.id} value={e.id}>
                          {e.prenom} {e.nom} - {e.matieres.join(", ")}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateOpen(false)}>Annuler</Button>
                <Button onClick={handleCreateClass}>Créer la classe</Button>
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
                  <GraduationCap className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total classes</p>
                  <p className="text-2xl font-bold">{classesData.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-info/10">
                  <Users className="h-6 w-6 text-info" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total élèves</p>
                  <p className="text-2xl font-bold">{totalEleves}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-success/10">
                  <TrendingUp className="h-6 w-6 text-success" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Moy. présence</p>
                  <p className="text-2xl font-bold">94.7%</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-warning/10">
                  <GraduationCap className="h-6 w-6 text-warning" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Moy. générale</p>
                  <p className="text-2xl font-bold">13.4</p>
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
                    placeholder="Rechercher une classe ou un enseignant..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={filterNiveau} onValueChange={setFilterNiveau}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Niveau" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les niveaux</SelectItem>
                    {niveaux.map(n => (
                      <SelectItem key={n} value={n}>{n}</SelectItem>
                    ))}
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

        {/* Classes Table */}
        <motion.div variants={item}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-primary" />
                Liste des classes ({filteredClasses.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Classe</TableHead>
                      <TableHead>Niveau</TableHead>
                      <TableHead className="text-center">Effectif</TableHead>
                      <TableHead>Professeur principal</TableHead>
                      <TableHead className="text-center">Présence</TableHead>
                      <TableHead className="text-center">Moyenne</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredClasses.map((classe) => (
                      <TableRow key={classe.id}>
                        <TableCell className="font-medium">{classe.nom}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{classe.niveau}</Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center gap-1">
                            <Users size={14} className="text-muted-foreground" />
                            {classe.effectif}
                          </div>
                        </TableCell>
                        <TableCell>{classe.professeurPrincipal}</TableCell>
                        <TableCell className="text-center">
                          <Badge variant={classe.tauxPresence >= 95 ? "success" : classe.tauxPresence >= 90 ? "warning" : "destructive"}>
                            {classe.tauxPresence}%
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <span className={`font-medium ${classe.moyenneGenerale >= 14 ? "text-success" : classe.moyenneGenerale >= 10 ? "text-warning" : "text-destructive"}`}>
                            {classe.moyenneGenerale.toFixed(1)}
                          </span>
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
                                Voir détails
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Modifier
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Download className="mr-2 h-4 w-4" />
                                Exporter liste
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Supprimer
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

export default Classes;
