import { useState } from "react";
import { motion } from "framer-motion";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
  BookOpen,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Download,
  GraduationCap,
  TrendingUp,
  Users,
  FileText,
} from "lucide-react";
import { elevesData, classesData } from "@/data/adminMockData";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const Eleves = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterClasse, setFilterClasse] = useState("all");

  const filteredEleves = elevesData.filter((eleve) => {
    const matchesSearch = `${eleve.prenom} ${eleve.nom}`.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesClasse = filterClasse === "all" || eleve.classe === filterClasse;
    return matchesSearch && matchesClasse;
  });

  const classes = [...new Set(elevesData.map(e => e.classe))];
  const moyenneGenerale = elevesData.reduce((acc, e) => acc + e.moyenneGenerale, 0) / elevesData.length;
  const tauxPresenceMoyen = elevesData.reduce((acc, e) => acc + e.tauxPresence, 0) / elevesData.length;

  return (
    <AdminLayout>
      <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
        {/* Header */}
        <motion.div variants={item} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">Élèves</h1>
            <p className="text-muted-foreground mt-1">Gérez les élèves de votre établissement</p>
          </div>
          <Button variant="outline" className="gap-2">
            <Download size={16} />
            Exporter la liste
          </Button>
        </motion.div>

        {/* Stats Cards */}
        <motion.div variants={item} className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-primary/10">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total élèves</p>
                  <p className="text-2xl font-bold">{elevesData.length}</p>
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
                  <p className="text-2xl font-bold">{tauxPresenceMoyen.toFixed(1)}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-info/10">
                  <GraduationCap className="h-6 w-6 text-info" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Moy. générale</p>
                  <p className="text-2xl font-bold">{moyenneGenerale.toFixed(1)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-warning/10">
                  <Users className="h-6 w-6 text-warning" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Classes</p>
                  <p className="text-2xl font-bold">{classes.length}</p>
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
                    placeholder="Rechercher un élève..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={filterClasse} onValueChange={setFilterClasse}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Classe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les classes</SelectItem>
                    {classes.map(c => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Eleves Table */}
        <motion.div variants={item}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                Liste des élèves ({filteredEleves.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Élève</TableHead>
                      <TableHead>Classe</TableHead>
                      <TableHead>Parent</TableHead>
                      <TableHead className="text-center">Présence</TableHead>
                      <TableHead className="text-center">Moyenne</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredEleves.map((eleve) => (
                      <TableRow key={eleve.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={eleve.photo} />
                              <AvatarFallback>{eleve.prenom[0]}{eleve.nom[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{eleve.prenom} {eleve.nom}</p>
                              <p className="text-xs text-muted-foreground">
                                Né(e) le {new Date(eleve.dateNaissance).toLocaleDateString("fr-FR")}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{eleve.classe}</Badge>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm">{eleve.parent}</span>
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge variant={eleve.tauxPresence >= 95 ? "success" : eleve.tauxPresence >= 90 ? "warning" : "destructive"}>
                            {eleve.tauxPresence}%
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <span className={`font-semibold ${eleve.moyenneGenerale >= 14 ? "text-success" : eleve.moyenneGenerale >= 10 ? "text-foreground" : "text-destructive"}`}>
                            {eleve.moyenneGenerale.toFixed(1)}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Badge variant={eleve.statut === "actif" ? "success" : "secondary"}>
                            {eleve.statut === "actif" ? "Actif" : "Inactif"}
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
                                <FileText className="mr-2 h-4 w-4" />
                                Voir bulletin
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Download className="mr-2 h-4 w-4" />
                                Exporter fiche
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

export default Eleves;
