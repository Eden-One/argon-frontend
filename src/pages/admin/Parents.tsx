import { useState } from "react";
import { motion } from "framer-motion";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
  UserCheck,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Mail,
  Phone,
  Download,
  CheckCircle,
  XCircle,
  Users,
  MessageSquare,
} from "lucide-react";
import { parentsData } from "@/data/adminMockData";
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

const Parents = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatut, setFilterStatut] = useState("all");

  const filteredParents = parentsData.filter((parent) => {
    const matchesSearch = `${parent.prenom} ${parent.nom}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          parent.enfants.some(e => e.nom.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatut = filterStatut === "all" || parent.statut === filterStatut;
    return matchesSearch && matchesStatut;
  });

  const parentsActifs = parentsData.filter(p => p.statut === "actif").length;

  return (
    <AdminLayout>
      <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
        {/* Header */}
        <motion.div variants={item} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">Parents</h1>
            <p className="text-muted-foreground mt-1">Gérez les comptes parents de votre établissement</p>
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
                  <UserCheck className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total parents</p>
                  <p className="text-2xl font-bold">{parentsData.length}</p>
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
                  <p className="text-2xl font-bold">{parentsActifs}</p>
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
                  <p className="text-2xl font-bold">{parentsData.length - parentsActifs}</p>
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
                  <p className="text-sm text-muted-foreground">Enfants liés</p>
                  <p className="text-2xl font-bold">{parentsData.reduce((acc, p) => acc + p.enfants.length, 0)}</p>
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
                    placeholder="Rechercher par nom de parent ou d'enfant..." 
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
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Parents Table */}
        <motion.div variants={item}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCheck className="h-5 w-5 text-primary" />
                Liste des parents ({filteredParents.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Parent</TableHead>
                      <TableHead>Enfant(s)</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Dernière connexion</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredParents.map((parent) => (
                      <TableRow key={parent.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{parent.prenom} {parent.nom}</p>
                            <p className="text-xs text-muted-foreground">{parent.email}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-1">
                            {parent.enfants.map((enfant, i) => (
                              <div key={i} className="flex items-center gap-2">
                                <span className="text-sm">{enfant.nom}</span>
                                <Badge variant="outline" className="text-xs">{enfant.classe}</Badge>
                              </div>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-1">
                            <span className="text-xs flex items-center gap-1">
                              <Mail size={12} className="text-muted-foreground" />
                              {parent.email}
                            </span>
                            <span className="text-xs flex items-center gap-1">
                              <Phone size={12} className="text-muted-foreground" />
                              {parent.telephone}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm text-muted-foreground">
                            {format(new Date(parent.derniereConnexion), "dd MMM yyyy HH:mm", { locale: fr })}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Badge variant={parent.statut === "actif" ? "success" : "secondary"}>
                            {parent.statut === "actif" ? "Actif" : "Inactif"}
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
                                <MessageSquare className="mr-2 h-4 w-4" />
                                Envoyer message
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Mail className="mr-2 h-4 w-4" />
                                Envoyer email
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

export default Parents;
