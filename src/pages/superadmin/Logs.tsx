import { useState } from "react";
import { motion } from "framer-motion";
import { SuperAdminLayout } from "@/components/layout/SuperAdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FileText, Search, Download, Filter } from "lucide-react";
import { logsAudit } from "@/data/superAdminMockData";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

const getResultBadge = (resultat: string) => {
  return resultat === "success" ? <Badge variant="success">Succès</Badge> : <Badge variant="destructive">Erreur</Badge>;
};

export default function Logs() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterAction, setFilterAction] = useState("all");

  const filteredLogs = logsAudit.filter((log) => {
    const matchesSearch = log.utilisateur.toLowerCase().includes(searchQuery.toLowerCase()) || log.action.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAction = filterAction === "all" || log.action === filterAction;
    return matchesSearch && matchesAction;
  });

  return (
    <SuperAdminLayout>
      <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
        <motion.div variants={item} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">Logs & Audit</h1>
            <p className="text-muted-foreground mt-1">Historique des actions sur la plateforme</p>
          </div>
          <Button variant="outline" size="sm"><Download className="h-4 w-4 mr-2" />Exporter logs</Button>
        </motion.div>

        <motion.div variants={item}>
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Rechercher..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
                </div>
                <Select value={filterAction} onValueChange={setFilterAction}>
                  <SelectTrigger className="w-[180px]"><Filter className="h-4 w-4 mr-2" /><SelectValue placeholder="Type action" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les actions</SelectItem>
                    <SelectItem value="USER_LOGIN">Connexion</SelectItem>
                    <SelectItem value="USER_CREATE">Création utilisateur</SelectItem>
                    <SelectItem value="GRADE_UPDATE">Mise à jour notes</SelectItem>
                    <SelectItem value="EXPORT_DATA">Export données</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card>
            <CardHeader><CardTitle className="text-lg flex items-center gap-2"><FileText className="h-5 w-5 text-primary" />Logs système ({filteredLogs.length})</CardTitle></CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Timestamp</TableHead>
                      <TableHead>Action</TableHead>
                      <TableHead>Utilisateur</TableHead>
                      <TableHead>IP</TableHead>
                      <TableHead>Résultat</TableHead>
                      <TableHead>Détails</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredLogs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell className="font-mono text-xs">{format(new Date(log.timestamp), "dd/MM/yyyy HH:mm:ss", { locale: fr })}</TableCell>
                        <TableCell><Badge variant="outline">{log.action}</Badge></TableCell>
                        <TableCell>{log.utilisateur}</TableCell>
                        <TableCell className="font-mono text-sm">{log.ip}</TableCell>
                        <TableCell>{getResultBadge(log.resultat)}</TableCell>
                        <TableCell className="text-muted-foreground text-sm">{log.details}</TableCell>
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
