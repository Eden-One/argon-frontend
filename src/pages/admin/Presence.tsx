import { useState } from "react";
import { motion } from "framer-motion";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
  CalendarCheck,
  Filter,
  Download,
  Users,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";
import { presenceData, presenceParClasse, classesData, presenceMensuelle } from "@/data/adminMockData";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const getPresenceIcon = (statut: string) => {
  switch (statut) {
    case "present":
      return <CheckCircle className="h-4 w-4 text-success" />;
    case "absent":
      return <XCircle className="h-4 w-4 text-destructive" />;
    case "retard":
      return <Clock className="h-4 w-4 text-warning" />;
    default:
      return null;
  }
};

const getPresenceBadge = (statut: string) => {
  switch (statut) {
    case "present":
      return <Badge variant="success">Présent</Badge>;
    case "absent":
      return <Badge variant="destructive">Absent</Badge>;
    case "retard":
      return <Badge variant="warning">Retard</Badge>;
    default:
      return <Badge variant="outline">{statut}</Badge>;
  }
};

const Presence = () => {
  const [filterClasse, setFilterClasse] = useState("all");
  const [filterDate, setFilterDate] = useState("2024-01-17");

  const classes = [...new Set(presenceData.map(p => p.classe))];
  
  const filteredPresence = presenceData.filter((p) => {
    const matchesClasse = filterClasse === "all" || p.classe === filterClasse;
    const matchesDate = p.date === filterDate;
    return matchesClasse && matchesDate;
  });

  const totalPresents = presenceData.filter(p => p.matin === "present" && p.apresmidi === "present").length;
  const totalAbsents = presenceData.filter(p => p.matin === "absent" || p.apresmidi === "absent").length;
  const totalRetards = presenceData.filter(p => p.matin === "retard" || p.apresmidi === "retard").length;

  return (
    <AdminLayout>
      <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
        {/* Header */}
        <motion.div variants={item} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">Présence</h1>
            <p className="text-muted-foreground mt-1">Suivi des présences de votre établissement</p>
          </div>
          <Button variant="outline" className="gap-2">
            <Download size={16} />
            Exporter rapport
          </Button>
        </motion.div>

        {/* Stats Cards */}
        <motion.div variants={item} className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-success/10">
                  <CheckCircle className="h-6 w-6 text-success" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Présents</p>
                  <p className="text-2xl font-bold">{totalPresents}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-destructive/10">
                  <XCircle className="h-6 w-6 text-destructive" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Absents</p>
                  <p className="text-2xl font-bold">{totalAbsents}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-warning/10">
                  <Clock className="h-6 w-6 text-warning" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Retards</p>
                  <p className="text-2xl font-bold">{totalRetards}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-primary/10">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Taux global</p>
                  <p className="text-2xl font-bold">94.5%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Charts */}
        <motion.div variants={item} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Trend */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Évolution du taux de présence
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={presenceMensuelle}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="mois" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" domain={[80, 100]} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--popover))", 
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="taux" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3}
                    dot={{ fill: "hsl(var(--primary))", strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* By Class */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Présence par classe
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={presenceParClasse}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="classe" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" domain={[85, 100]} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--popover))", 
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }} 
                  />
                  <Bar dataKey="taux" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Filters */}
        <motion.div variants={item}>
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4">
                <Select value={filterClasse} onValueChange={setFilterClasse}>
                  <SelectTrigger className="w-full md:w-[200px]">
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
                <input 
                  type="date" 
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                  className="flex h-10 w-full md:w-[200px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Presence Table */}
        <motion.div variants={item}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarCheck className="h-5 w-5 text-primary" />
                Détail des présences
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Élève</TableHead>
                      <TableHead>Classe</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-center">Matin</TableHead>
                      <TableHead className="text-center">Après-midi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPresence.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                          Aucune donnée de présence pour cette sélection
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredPresence.map((p) => (
                        <TableRow key={p.id}>
                          <TableCell className="font-medium">{p.eleveName}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{p.classe}</Badge>
                          </TableCell>
                          <TableCell>{new Date(p.date).toLocaleDateString("fr-FR")}</TableCell>
                          <TableCell className="text-center">
                            <div className="flex items-center justify-center gap-2">
                              {getPresenceIcon(p.matin)}
                              {getPresenceBadge(p.matin)}
                            </div>
                          </TableCell>
                          <TableCell className="text-center">
                            <div className="flex items-center justify-center gap-2">
                              {getPresenceIcon(p.apresmidi)}
                              {getPresenceBadge(p.apresmidi)}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Alerts */}
        <motion.div variants={item}>
          <Card className="border-warning/50 bg-warning/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-warning">
                <AlertTriangle className="h-5 w-5" />
                Alertes absences répétées
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-background">
                  <div>
                    <p className="font-medium">Moussa Ba</p>
                    <p className="text-sm text-muted-foreground">5ème A - 5 absences ce mois</p>
                  </div>
                  <Button size="sm" variant="outline">Contacter parent</Button>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-background">
                  <div>
                    <p className="font-medium">Aïcha Koné</p>
                    <p className="text-sm text-muted-foreground">4ème B - 4 absences ce mois</p>
                  </div>
                  <Button size="sm" variant="outline">Contacter parent</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </AdminLayout>
  );
};

export default Presence;
