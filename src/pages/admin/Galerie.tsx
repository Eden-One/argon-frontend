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
import { Image, Plus, Search, Calendar, FolderOpen, Eye, Trash2, Upload, Video, CheckCircle, XCircle } from "lucide-react";
import { galerieData, classesData } from "@/data/adminMockData";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { useState } from "react";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

export default function Galerie() {
  const [searchTerm, setSearchTerm] = useState("");
  const [classeFilter, setClasseFilter] = useState("all");

  const filteredAlbums = galerieData.filter(album => {
    const matchesSearch = album.titre.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClasse = classeFilter === "all" || album.classe === classeFilter;
    return matchesSearch && matchesClasse;
  });

  const totalPhotos = galerieData.reduce((sum, a) => sum + a.nombrePhotos, 0);
  const totalVideos = galerieData.reduce((sum, a) => sum + a.nombreVideos, 0);
  const enAttente = galerieData.filter(a => a.statut === "en_attente").length;

  return (
    <AdminLayout>
      <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
        <motion.div variants={item} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">Galerie & Activités</h1>
            <p className="text-muted-foreground mt-1">Albums photos et vidéos des classes</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Créer un album
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Créer un album</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label>Titre de l'album</Label>
                  <Input placeholder="Ex: Sortie au musée" />
                </div>
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
                  <Label>Description</Label>
                  <Textarea placeholder="Décrivez l'événement..." rows={3} />
                </div>
                <div className="grid gap-2">
                  <Label>Date de l'événement</Label>
                  <Input type="date" />
                </div>
                <div className="grid gap-2">
                  <Label>Médias</Label>
                  <div className="border-2 border-dashed rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">Glissez vos fichiers ici ou cliquez pour sélectionner</p>
                    <Input type="file" multiple className="mt-2" />
                  </div>
                </div>
                <Button className="w-full mt-2">Créer l'album</Button>
              </div>
            </DialogContent>
          </Dialog>
        </motion.div>

        <motion.div variants={item} className="grid sm:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6 flex items-center gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <FolderOpen className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{galerieData.length}</p>
                <p className="text-sm text-muted-foreground">Albums</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 flex items-center gap-4">
              <div className="p-3 rounded-lg bg-success/10">
                <Image className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalPhotos}</p>
                <p className="text-sm text-muted-foreground">Photos</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 flex items-center gap-4">
              <div className="p-3 rounded-lg bg-accent/10">
                <Video className="h-6 w-6 text-accent-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalVideos}</p>
                <p className="text-sm text-muted-foreground">Vidéos</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 flex items-center gap-4">
              <div className="p-3 rounded-lg bg-warning/10">
                <CheckCircle className="h-6 w-6 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold">{enAttente}</p>
                <p className="text-sm text-muted-foreground">En attente</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item} className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher un album..."
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

        <motion.div variants={item} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAlbums.map((album) => (
            <Card key={album.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 relative flex items-center justify-center">
                <FolderOpen className="h-16 w-16 text-primary/40" />
                <div className="absolute top-3 right-3">
                  {album.statut === "publie" ? (
                    <Badge className="bg-success/20 text-success">Publié</Badge>
                  ) : (
                    <Badge variant="warning">En attente</Badge>
                  )}
                </div>
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <Button size="sm" variant="secondary" className="gap-1">
                    <Eye className="h-4 w-4" />
                    Voir
                  </Button>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-foreground">{album.titre}</h3>
                <p className="text-sm text-muted-foreground mt-1">{album.description}</p>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Image className="h-3.5 w-3.5" />
                      {album.nombrePhotos}
                    </span>
                    <span className="flex items-center gap-1">
                      <Video className="h-3.5 w-3.5" />
                      {album.nombreVideos}
                    </span>
                  </div>
                  <Badge variant="outline">{album.classe}</Badge>
                </div>
                <div className="flex items-center justify-between mt-3 pt-3 border-t">
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {format(new Date(album.date), "dd MMM yyyy", { locale: fr })}
                  </span>
                  <div className="flex gap-1">
                    {album.statut === "en_attente" && (
                      <>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-success" title="Approuver">
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" title="Rejeter">
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                    <Button variant="ghost" size="icon" className="h-8 w-8" title="Supprimer">
                      <Trash2 className="h-4 w-4" />
                    </Button>
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
