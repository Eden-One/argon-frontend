import { motion } from "framer-motion";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { BookOpen, Plus, Search, Calendar, Clock, Paperclip, Eye, Edit, Bell, CheckCircle, AlertCircle } from "lucide-react";
import { devoirsData, classesData } from "@/data/adminMockData";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { useState } from "react";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

const getStatutBadge = (statut: string) => {
  switch (statut) {
    case "actif": return <Badge className="bg-success/20 text-success">Actif</Badge>;
    case "termine": return <Badge variant="secondary">Terminé</Badge>;
    case "brouillon": return <Badge variant="outline">Brouillon</Badge>;
    default: return <Badge variant="outline">{statut}</Badge>;
  }
};

export default function Devoirs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [classeFilter, setClasseFilter] = useState("all");

  const filteredDevoirs = devoirsData.filter(devoir => {
    const matchesSearch = devoir.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         devoir.matiere.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClasse = classeFilter === "all" || devoir.classe === classeFilter;
    return matchesSearch && matchesClasse;
  });

  const actifs = devoirsData.filter(d => d.statut === "actif").length;
  const termines = devoirsData.filter(d => d.statut === "termine").length;

  return (
    <AdminLayout>
      <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
        <motion.div variants={item} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">Devoirs</h1>
            <p className="text-muted-foreground mt-1">Gestion des devoirs et travaux</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Nouveau devoir
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Créer un devoir</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label>Titre</Label>
                  <Input placeholder="Ex: Exercices de mathématiques" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label>Classe</Label>
                    <Select>
                      <SelectTrigger><SelectValue placeholder="Sélectionner" /></SelectTrigger>
                      <SelectContent>
                        {classesData.map(c => (
                          <SelectItem key={c.id} value={c.nom}>{c.nom}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label>Matière</Label>
                    <Select>
                      <SelectTrigger><SelectValue placeholder="Sélectionner" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mathematiques">Mathématiques</SelectItem>
                        <SelectItem value="francais">Français</SelectItem>
                        <SelectItem value="sciences">Sciences</SelectItem>
                        <SelectItem value="histoire">Histoire-Géo</SelectItem>
                        <SelectItem value="anglais">Anglais</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label>Description</Label>
                  <Textarea placeholder="Décrivez le devoir..." rows={3} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label>Date limite</Label>
                    <Input type="date" />
                  </div>
                  <div className="grid gap-2">
                    <Label>Pièce jointe</Label>
                    <Input type="file" />
                  </div>
                </div>
                <Button className="w-full mt-2">Créer le devoir</Button>
              </div>
            </DialogContent>
          </Dialog>
        </motion.div>

        <motion.div variants={item} className="grid sm:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6 flex items-center gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{devoirsData.length}</p>
                <p className="text-sm text-muted-foreground">Total devoirs</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 flex items-center gap-4">
              <div className="p-3 rounded-lg bg-success/10">
                <CheckCircle className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">{actifs}</p>
                <p className="text-sm text-muted-foreground">Actifs</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 flex items-center gap-4">
              <div className="p-3 rounded-lg bg-muted">
                <AlertCircle className="h-6 w-6 text-muted-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold">{termines}</p>
                <p className="text-sm text-muted-foreground">Terminés</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item} className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher un devoir..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={classeFilter} onValueChange={setClasseFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Classe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les classes</SelectItem>
              {classesData.map(c => (
                <SelectItem key={c.id} value={c.nom}>{c.nom}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </motion.div>

        <motion.div variants={item} className="grid gap-4">
          {filteredDevoirs.map((devoir) => (
            <Card key={devoir.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-primary/10 mt-1">
                        <BookOpen className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{devoir.titre}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{devoir.description}</p>
                        <div className="flex flex-wrap items-center gap-3 mt-3">
                          <Badge variant="outline">{devoir.classe}</Badge>
                          <Badge variant="secondary">{devoir.matiere}</Badge>
                          <span className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Calendar className="h-3.5 w-3.5" />
                            {format(new Date(devoir.dateLimite), "dd MMMM yyyy", { locale: fr })}
                          </span>
                          {devoir.fichierJoint && (
                            <span className="flex items-center gap-1 text-sm text-primary">
                              <Paperclip className="h-3.5 w-3.5" />
                              Fichier joint
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {getStatutBadge(devoir.statut)}
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" title="Voir">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" title="Modifier">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" title="Notifier">
                        <Bell className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </motion.div>
    </AdminLayout>
  );
}
