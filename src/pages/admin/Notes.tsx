import { motion } from "framer-motion";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileSpreadsheet, Download, TrendingUp, Award, AlertTriangle } from "lucide-react";
import { notesData } from "@/data/adminMockData";
import { toast } from "sonner";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

const getNoteColor = (note: number) => {
  if (note >= 16) return "text-success font-bold";
  if (note >= 14) return "text-primary font-medium";
  if (note >= 10) return "text-foreground";
  return "text-destructive font-medium";
};

const Notes = () => {
  const matieres = ["Mathématiques", "Français", "Anglais", "Histoire-Géo", "Sciences"];

  return (
    <AdminLayout>
      <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
        <motion.div variants={item} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">Notes & Bulletins</h1>
            <p className="text-muted-foreground mt-1">Suivi des notes et génération des bulletins</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2"><Download size={16} />Exporter notes</Button>
            <Button className="gap-2" onClick={() => toast.success("Bulletins générés")}><FileSpreadsheet size={16} />Générer bulletins</Button>
          </div>
        </motion.div>

        <motion.div variants={item} className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card><CardContent className="pt-6"><div className="flex items-center gap-4"><div className="p-3 rounded-xl bg-primary/10"><TrendingUp className="h-6 w-6 text-primary" /></div><div><p className="text-sm text-muted-foreground">Moy. générale</p><p className="text-2xl font-bold">13.8</p></div></div></CardContent></Card>
          <Card><CardContent className="pt-6"><div className="flex items-center gap-4"><div className="p-3 rounded-xl bg-success/10"><Award className="h-6 w-6 text-success" /></div><div><p className="text-sm text-muted-foreground">Excellents (≥16)</p><p className="text-2xl font-bold">{notesData.filter(n => n.moyenne >= 16).length}</p></div></div></CardContent></Card>
          <Card><CardContent className="pt-6"><div className="flex items-center gap-4"><div className="p-3 rounded-xl bg-warning/10"><AlertTriangle className="h-6 w-6 text-warning" /></div><div><p className="text-sm text-muted-foreground">En difficulté (&lt;10)</p><p className="text-2xl font-bold">{notesData.filter(n => n.moyenne < 10).length}</p></div></div></CardContent></Card>
          <Card><CardContent className="pt-6"><div className="flex items-center gap-4"><div className="p-3 rounded-xl bg-info/10"><FileSpreadsheet className="h-6 w-6 text-info" /></div><div><p className="text-sm text-muted-foreground">Bulletins générés</p><p className="text-2xl font-bold">0</p></div></div></CardContent></Card>
        </motion.div>

        <motion.div variants={item}>
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><FileSpreadsheet className="h-5 w-5 text-primary" />Tableau des notes - Trimestre 1</CardTitle></CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Élève</TableHead>
                      <TableHead>Classe</TableHead>
                      {matieres.map(m => <TableHead key={m} className="text-center">{m}</TableHead>)}
                      <TableHead className="text-center">Moyenne</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {notesData.map((note) => (
                      <TableRow key={note.eleveId}>
                        <TableCell className="font-medium">{note.eleveName}</TableCell>
                        <TableCell><Badge variant="outline">{note.classe}</Badge></TableCell>
                        {matieres.map(m => (
                          <TableCell key={m} className={`text-center ${getNoteColor(note.matieres[m] || 0)}`}>
                            {note.matieres[m] || "-"}
                          </TableCell>
                        ))}
                        <TableCell className={`text-center ${getNoteColor(note.moyenne)}`}>
                          <Badge variant={note.moyenne >= 14 ? "success" : note.moyenne >= 10 ? "outline" : "destructive"}>
                            {note.moyenne.toFixed(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button size="sm" variant="ghost" onClick={() => toast.success("Bulletin téléchargé")}>
                            <Download size={14} />
                          </Button>
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

export default Notes;
