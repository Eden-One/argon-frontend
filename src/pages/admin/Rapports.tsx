import { motion } from "framer-motion";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, FileText, Download, TrendingUp, Users, Calendar, Clock, CheckCircle, PieChart, Activity } from "lucide-react";
import { BarChart as ReBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart as RePieChart, Pie, Cell } from "recharts";
import { classesData, presenceMensuelle, repartitionParNiveau, absencesParClasse } from "@/data/adminMockData";
import { useState } from "react";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

const COLORS = ["hsl(var(--primary))", "hsl(var(--success))", "hsl(var(--warning))", "hsl(var(--destructive))", "hsl(var(--accent))"];

const activiteEnseignantsData = [
  { nom: "M. Diallo", saisiesPresence: 45, notesAjoutees: 120, devoirsCrees: 8 },
  { nom: "Mme Koné", saisiesPresence: 42, notesAjoutees: 95, devoirsCrees: 12 },
  { nom: "M. Traoré", saisiesPresence: 38, notesAjoutees: 110, devoirsCrees: 6 },
  { nom: "Mme Sy", saisiesPresence: 44, notesAjoutees: 88, devoirsCrees: 10 },
  { nom: "M. Camara", saisiesPresence: 40, notesAjoutees: 102, devoirsCrees: 7 },
];

const moyennesParClasseData = [
  { classe: "6ème A", moyenne: 13.5 },
  { classe: "6ème B", moyenne: 12.8 },
  { classe: "5ème A", moyenne: 14.2 },
  { classe: "5ème B", moyenne: 11.9 },
  { classe: "4ème A", moyenne: 13.1 },
  { classe: "4ème B", moyenne: 12.4 },
  { classe: "3ème A", moyenne: 14.8 },
  { classe: "3ème B", moyenne: 13.6 },
];

const rapportsDisponibles = [
  { id: 1, titre: "Rapport de présence mensuel", description: "Taux de présence par classe et par mois", type: "presence", format: "PDF" },
  { id: 2, titre: "Bulletin de notes trimestriel", description: "Moyennes et appréciations par élève", type: "notes", format: "PDF" },
  { id: 3, titre: "Activité des enseignants", description: "Saisies de présence et notes par enseignant", type: "activite", format: "Excel" },
  { id: 4, titre: "Liste des élèves par classe", description: "Export complet des élèves avec coordonnées", type: "eleves", format: "Excel" },
  { id: 5, titre: "Statistiques d'absences", description: "Analyse des absences et retards", type: "presence", format: "PDF" },
  { id: 6, titre: "Rapport annuel établissement", description: "Synthèse complète de l'année scolaire", type: "global", format: "PDF" },
];

export default function Rapports() {
  const [periode, setPeriode] = useState("trimestre1");
  const [classeFilter, setClasseFilter] = useState("all");

  return (
    <AdminLayout>
      <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
        <motion.div variants={item} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">Rapports</h1>
            <p className="text-muted-foreground mt-1">Statistiques et exports de données</p>
          </div>
          <div className="flex gap-2">
            <Select value={periode} onValueChange={setPeriode}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Période" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="trimestre1">Trimestre 1</SelectItem>
                <SelectItem value="trimestre2">Trimestre 2</SelectItem>
                <SelectItem value="trimestre3">Trimestre 3</SelectItem>
                <SelectItem value="annee">Année complète</SelectItem>
              </SelectContent>
            </Select>
            <Select value={classeFilter} onValueChange={setClasseFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Classe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes</SelectItem>
                {classesData.map(c => (
                  <SelectItem key={c.id} value={c.nom}>{c.nom}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        <motion.div variants={item} className="grid sm:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6 flex items-center gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">94.5%</p>
                <p className="text-sm text-muted-foreground">Taux présence</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 flex items-center gap-4">
              <div className="p-3 rounded-lg bg-success/10">
                <TrendingUp className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">13.2</p>
                <p className="text-sm text-muted-foreground">Moyenne générale</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 flex items-center gap-4">
              <div className="p-3 rounded-lg bg-accent/10">
                <Users className="h-6 w-6 text-accent-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold">85</p>
                <p className="text-sm text-muted-foreground">Enseignants actifs</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 flex items-center gap-4">
              <div className="p-3 rounded-lg bg-warning/10">
                <Activity className="h-6 w-6 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold">1 250</p>
                <p className="text-sm text-muted-foreground">Élèves inscrits</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Tabs defaultValue="presence" className="space-y-4">
            <TabsList>
              <TabsTrigger value="presence">Présence</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
              <TabsTrigger value="activite">Activité enseignants</TabsTrigger>
              <TabsTrigger value="exports">Exports</TabsTrigger>
            </TabsList>

            <TabsContent value="presence" className="space-y-4">
              <div className="grid lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Évolution du taux de présence</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={presenceMensuelle}>
                          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                          <XAxis dataKey="mois" className="text-xs" />
                          <YAxis domain={[80, 100]} className="text-xs" />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: "hsl(var(--background))", 
                              border: "1px solid hsl(var(--border))",
                              borderRadius: "8px"
                            }}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="taux" 
                            stroke="hsl(var(--primary))" 
                            strokeWidth={2}
                            dot={{ fill: "hsl(var(--primary))" }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Absences par classe</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <ReBarChart data={absencesParClasse} layout="vertical">
                          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                          <XAxis type="number" className="text-xs" />
                          <YAxis dataKey="classe" type="category" className="text-xs" width={60} />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: "hsl(var(--background))", 
                              border: "1px solid hsl(var(--border))",
                              borderRadius: "8px"
                            }}
                          />
                          <Bar dataKey="absences" fill="hsl(var(--destructive))" radius={[0, 4, 4, 0]} />
                        </ReBarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="notes" className="space-y-4">
              <div className="grid lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Moyennes par classe</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <ReBarChart data={moyennesParClasseData}>
                          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                          <XAxis dataKey="classe" className="text-xs" />
                          <YAxis domain={[0, 20]} className="text-xs" />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: "hsl(var(--background))", 
                              border: "1px solid hsl(var(--border))",
                              borderRadius: "8px"
                            }}
                          />
                          <Bar dataKey="moyenne" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                        </ReBarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Répartition par niveau</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <RePieChart>
                          <Pie
                            data={repartitionParNiveau}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                            paddingAngle={5}
                            dataKey="value"
                            label={({ niveau, value }) => `${niveau}: ${value}`}
                          >
                            {repartitionParNiveau.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: "hsl(var(--background))", 
                              border: "1px solid hsl(var(--border))",
                              borderRadius: "8px"
                            }}
                          />
                        </RePieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="activite" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Activité des enseignants</CardTitle>
                  <CardDescription>Saisies de présence, notes et devoirs créés ce mois</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <ReBarChart data={activiteEnseignantsData}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis dataKey="nom" className="text-xs" />
                        <YAxis className="text-xs" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: "hsl(var(--background))", 
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px"
                          }}
                        />
                        <Bar dataKey="saisiesPresence" name="Saisies présence" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="notesAjoutees" name="Notes ajoutées" fill="hsl(var(--success))" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="devoirsCrees" name="Devoirs créés" fill="hsl(var(--warning))" radius={[4, 4, 0, 0]} />
                      </ReBarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="exports" className="space-y-4">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {rapportsDisponibles.map(rapport => (
                  <Card key={rapport.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-lg bg-primary/10">
                          <FileText className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-sm">{rapport.titre}</h3>
                          <p className="text-xs text-muted-foreground mt-1">{rapport.description}</p>
                          <div className="flex items-center gap-2 mt-3">
                            <Badge variant="outline">{rapport.format}</Badge>
                            <Badge variant="secondary">{rapport.type}</Badge>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" className="w-full mt-4 gap-2">
                        <Download className="h-4 w-4" />
                        Télécharger
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </motion.div>
    </AdminLayout>
  );
}
