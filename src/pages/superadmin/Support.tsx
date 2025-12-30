import { motion } from "framer-motion";
import { SuperAdminLayout } from "@/components/layout/SuperAdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { HeadphonesIcon, AlertCircle, Clock, CheckCircle, Eye } from "lucide-react";
import { incidentsList } from "@/data/superAdminMockData";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

const getPriorityBadge = (priorite: string) => {
  switch (priorite) {
    case "haute": return <Badge variant="destructive">Haute</Badge>;
    case "moyenne": return <Badge variant="warning">Moyenne</Badge>;
    default: return <Badge variant="secondary">Basse</Badge>;
  }
};

const getStatusBadge = (statut: string) => {
  switch (statut) {
    case "ouvert": return <Badge className="bg-destructive/20 text-destructive">Ouvert</Badge>;
    case "en_cours": return <Badge className="bg-warning/20 text-warning">En cours</Badge>;
    case "resolu": return <Badge variant="success">Résolu</Badge>;
    default: return <Badge variant="outline">{statut}</Badge>;
  }
};

export default function Support() {
  const openCount = incidentsList.filter(i => i.statut === "ouvert").length;
  const inProgressCount = incidentsList.filter(i => i.statut === "en_cours").length;
  const resolvedCount = incidentsList.filter(i => i.statut === "resolu").length;

  return (
    <SuperAdminLayout>
      <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
        <motion.div variants={item}>
          <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">Support & Incidents</h1>
          <p className="text-muted-foreground mt-1">Gérer les tickets et incidents signalés</p>
        </motion.div>

        <motion.div variants={item} className="grid sm:grid-cols-3 gap-4">
          <Card><CardContent className="pt-6 flex items-center gap-4">
            <div className="p-3 rounded-lg bg-destructive/10"><AlertCircle className="h-6 w-6 text-destructive" /></div>
            <div><p className="text-2xl font-bold">{openCount}</p><p className="text-sm text-muted-foreground">Ouverts</p></div>
          </CardContent></Card>
          <Card><CardContent className="pt-6 flex items-center gap-4">
            <div className="p-3 rounded-lg bg-warning/10"><Clock className="h-6 w-6 text-warning" /></div>
            <div><p className="text-2xl font-bold">{inProgressCount}</p><p className="text-sm text-muted-foreground">En cours</p></div>
          </CardContent></Card>
          <Card><CardContent className="pt-6 flex items-center gap-4">
            <div className="p-3 rounded-lg bg-success/10"><CheckCircle className="h-6 w-6 text-success" /></div>
            <div><p className="text-2xl font-bold">{resolvedCount}</p><p className="text-sm text-muted-foreground">Résolus</p></div>
          </CardContent></Card>
        </motion.div>

        <motion.div variants={item}>
          <Card>
            <CardHeader><CardTitle className="text-lg flex items-center gap-2"><HeadphonesIcon className="h-5 w-5 text-primary" />Incidents ({incidentsList.length})</CardTitle></CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader><TableRow>
                    <TableHead>ID</TableHead><TableHead>Établissement</TableHead><TableHead>Titre</TableHead><TableHead>Type</TableHead><TableHead>Priorité</TableHead><TableHead>Statut</TableHead><TableHead>Date</TableHead><TableHead className="text-right">Actions</TableHead>
                  </TableRow></TableHeader>
                  <TableBody>
                    {incidentsList.map((incident) => (
                      <TableRow key={incident.id}>
                        <TableCell className="font-mono text-sm">{incident.id}</TableCell>
                        <TableCell>{incident.etablissement}</TableCell>
                        <TableCell className="max-w-[200px] truncate">{incident.titre}</TableCell>
                        <TableCell><Badge variant="outline">{incident.type}</Badge></TableCell>
                        <TableCell>{getPriorityBadge(incident.priorite)}</TableCell>
                        <TableCell>{getStatusBadge(incident.statut)}</TableCell>
                        <TableCell>{format(new Date(incident.dateCreation), "dd/MM/yyyy", { locale: fr })}</TableCell>
                        <TableCell className="text-right"><Button variant="ghost" size="sm"><Eye className="h-4 w-4" /></Button></TableCell>
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
