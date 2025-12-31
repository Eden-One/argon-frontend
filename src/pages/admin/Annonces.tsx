import { useState } from "react";
import { motion } from "framer-motion";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
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
import { Megaphone, Plus, Bell, Users, AlertTriangle, CheckCircle } from "lucide-react";
import { annoncesData } from "@/data/adminMockData";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { toast } from "sonner";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

const Annonces = () => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const handleCreate = () => {
    toast.success("Annonce publiée avec succès");
    setIsCreateOpen(false);
  };

  return (
    <AdminLayout>
      <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
        <motion.div variants={item} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">Annonces</h1>
            <p className="text-muted-foreground mt-1">Communiquez avec les parents et enseignants</p>
          </div>
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2"><Plus size={18} />Nouvelle annonce</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader><DialogTitle>Créer une annonce</DialogTitle></DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2"><Label>Titre</Label><Input placeholder="Titre de l'annonce" /></div>
                <div className="grid gap-2"><Label>Contenu</Label><Textarea placeholder="Contenu de l'annonce..." rows={4} /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label>Cible</Label>
                    <Select><SelectTrigger><SelectValue placeholder="Destinataires" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tous">Tous</SelectItem>
                        <SelectItem value="parents">Parents</SelectItem>
                        <SelectItem value="enseignants">Enseignants</SelectItem>
                        <SelectItem value="6eme">6ème uniquement</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label>Priorité</Label>
                    <Select><SelectTrigger><SelectValue placeholder="Priorité" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="normal">Normal</SelectItem>
                        <SelectItem value="important">Important</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateOpen(false)}>Annuler</Button>
                <Button onClick={handleCreate}>Publier</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </motion.div>

        <motion.div variants={item} className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card><CardContent className="pt-6"><div className="flex items-center gap-4"><div className="p-3 rounded-xl bg-primary/10"><Megaphone className="h-6 w-6 text-primary" /></div><div><p className="text-sm text-muted-foreground">Total</p><p className="text-2xl font-bold">{annoncesData.length}</p></div></div></CardContent></Card>
          <Card><CardContent className="pt-6"><div className="flex items-center gap-4"><div className="p-3 rounded-xl bg-success/10"><CheckCircle className="h-6 w-6 text-success" /></div><div><p className="text-sm text-muted-foreground">Publiées</p><p className="text-2xl font-bold">{annoncesData.filter(a => a.statut === "publie").length}</p></div></div></CardContent></Card>
          <Card><CardContent className="pt-6"><div className="flex items-center gap-4"><div className="p-3 rounded-xl bg-warning/10"><AlertTriangle className="h-6 w-6 text-warning" /></div><div><p className="text-sm text-muted-foreground">Importantes</p><p className="text-2xl font-bold">{annoncesData.filter(a => a.priorite === "important").length}</p></div></div></CardContent></Card>
          <Card><CardContent className="pt-6"><div className="flex items-center gap-4"><div className="p-3 rounded-xl bg-info/10"><Users className="h-6 w-6 text-info" /></div><div><p className="text-sm text-muted-foreground">Vues</p><p className="text-2xl font-bold">1.2k</p></div></div></CardContent></Card>
        </motion.div>

        <motion.div variants={item} className="space-y-4">
          {annoncesData.map((annonce) => (
            <Card key={annonce.id} className={annonce.priorite === "important" ? "border-warning/50" : ""}>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${annonce.priorite === "important" ? "bg-warning/10" : "bg-primary/10"}`}>
                      {annonce.priorite === "important" ? <AlertTriangle className="h-5 w-5 text-warning" /> : <Bell className="h-5 w-5 text-primary" />}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{annonce.titre}</CardTitle>
                      <p className="text-sm text-muted-foreground">{annonce.auteur} • {format(new Date(annonce.date), "dd MMMM yyyy", { locale: fr })}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant={annonce.priorite === "important" ? "warning" : "outline"}>{annonce.priorite}</Badge>
                    <Badge variant={annonce.statut === "publie" ? "success" : "secondary"}>{annonce.statut === "publie" ? "Publié" : "Brouillon"}</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{annonce.contenu}</p>
                <div className="flex items-center gap-2 mt-3">
                  <Badge variant="outline">Cible: {annonce.cible}</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </motion.div>
    </AdminLayout>
  );
};

export default Annonces;
