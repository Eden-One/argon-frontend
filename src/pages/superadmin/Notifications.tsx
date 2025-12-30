import { useState } from "react";
import { motion } from "framer-motion";
import { SuperAdminLayout } from "@/components/layout/SuperAdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Plus,
  Bell,
  Send,
  Eye,
  Calendar,
} from "lucide-react";
import { notificationsSysteme } from "@/data/superAdminMockData";
import { format } from "date-fns";
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

const getPriorityBadge = (priorite: string) => {
  switch (priorite) {
    case "urgent":
      return <Badge variant="destructive">Urgent</Badge>;
    case "important":
      return <Badge variant="warning">Important</Badge>;
    case "normal":
      return <Badge variant="secondary">Normal</Badge>;
    default:
      return <Badge variant="outline">{priorite}</Badge>;
  }
};

const getStatusBadge = (statut: string) => {
  switch (statut) {
    case "envoyé":
      return <Badge variant="success">Envoyé</Badge>;
    case "programmé":
      return <Badge className="bg-info/20 text-info border-info/30">Programmé</Badge>;
    case "brouillon":
      return <Badge variant="secondary">Brouillon</Badge>;
    default:
      return <Badge variant="outline">{statut}</Badge>;
  }
};

export default function Notifications() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);

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
            <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">Notifications Système</h1>
            <p className="text-muted-foreground mt-1">Envoyer des notifications à tous les utilisateurs</p>
          </div>
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Nouvelle notification
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Créer une notification</DialogTitle>
                <DialogDescription>
                  Envoyez une notification à tous les utilisateurs ou à un groupe spécifique.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="titre">Titre *</Label>
                  <Input id="titre" placeholder="Ex: Maintenance planifiée" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Rédigez votre message..."
                    rows={4}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cible">Cible *</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tous">Tous les utilisateurs</SelectItem>
                        <SelectItem value="admins">Administrateurs</SelectItem>
                        <SelectItem value="enseignants">Enseignants</SelectItem>
                        <SelectItem value="parents">Parents</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="priorite">Priorité *</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="normal">Normal</SelectItem>
                        <SelectItem value="important">Important</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateEnvoi">Date d'envoi</Label>
                  <Input id="dateEnvoi" type="datetime-local" />
                  <p className="text-xs text-muted-foreground">Laissez vide pour envoyer immédiatement</p>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateOpen(false)}>Annuler</Button>
                <Button onClick={() => setIsCreateOpen(false)}>
                  <Send className="h-4 w-4 mr-2" />
                  Envoyer
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </motion.div>

        {/* Stats */}
        <motion.div variants={item} className="grid sm:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Bell className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{notificationsSysteme.length}</p>
                  <p className="text-sm text-muted-foreground">Total notifications</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-success/10">
                  <Send className="h-6 w-6 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{notificationsSysteme.filter(n => n.statut === "envoyé").length}</p>
                  <p className="text-sm text-muted-foreground">Envoyées</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-info/10">
                  <Calendar className="h-6 w-6 text-info" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{notificationsSysteme.filter(n => n.statut === "programmé").length}</p>
                  <p className="text-sm text-muted-foreground">Programmées</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Notifications Table */}
        <motion.div variants={item}>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                Historique des notifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Titre</TableHead>
                      <TableHead>Cible</TableHead>
                      <TableHead>Priorité</TableHead>
                      <TableHead>Date d'envoi</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead className="text-right">Vues</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {notificationsSysteme.map((notif) => (
                      <TableRow key={notif.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{notif.titre}</p>
                            <p className="text-xs text-muted-foreground line-clamp-1">{notif.message}</p>
                          </div>
                        </TableCell>
                        <TableCell className="capitalize">{notif.cible}</TableCell>
                        <TableCell>{getPriorityBadge(notif.priorite)}</TableCell>
                        <TableCell>
                          {format(new Date(notif.dateEnvoi), "dd MMM yyyy HH:mm", { locale: fr })}
                        </TableCell>
                        <TableCell>{getStatusBadge(notif.statut)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Eye className="h-4 w-4 text-muted-foreground" />
                            <span>{notif.vues.toLocaleString()}</span>
                          </div>
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
    </SuperAdminLayout>
  );
}
