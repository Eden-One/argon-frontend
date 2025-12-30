import { motion } from "framer-motion";
import { SuperAdminLayout } from "@/components/layout/SuperAdminLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart3,
  Download,
  FileSpreadsheet,
  FileText,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { analyticsPresenceParPays, croissanceUtilisateurs, etablissementsEvolution } from "@/data/superAdminMockData";

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

// Activity by day data
const activiteJournaliere = [
  { jour: "Lun", connexions: 12500, actions: 45000 },
  { jour: "Mar", connexions: 13200, actions: 48000 },
  { jour: "Mer", connexions: 12800, actions: 46500 },
  { jour: "Jeu", connexions: 13500, actions: 49000 },
  { jour: "Ven", connexions: 11800, actions: 42000 },
  { jour: "Sam", connexions: 4500, actions: 12000 },
  { jour: "Dim", connexions: 3200, actions: 8000 },
];

// Parent adoption rate
const tauxAdoptionParents = [
  { mois: "Jan", taux: 72 },
  { mois: "Fév", taux: 75 },
  { mois: "Mar", taux: 78 },
  { mois: "Avr", taux: 80 },
  { mois: "Mai", taux: 82 },
  { mois: "Juin", taux: 84 },
  { mois: "Juil", taux: 83 },
  { mois: "Août", taux: 79 },
  { mois: "Sept", taux: 88 },
];

export default function Analytics() {
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
            <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">Analytics & Rapports</h1>
            <p className="text-muted-foreground mt-1">Statistiques détaillées de la plateforme</p>
          </div>
          <div className="flex items-center gap-3">
            <Select defaultValue="30">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Période" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">7 derniers jours</SelectItem>
                <SelectItem value="30">30 derniers jours</SelectItem>
                <SelectItem value="90">90 derniers jours</SelectItem>
                <SelectItem value="365">Cette année</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <FileText className="h-4 w-4 mr-2" />
                PDF
              </Button>
              <Button variant="outline" size="sm">
                <FileSpreadsheet className="h-4 w-4 mr-2" />
                Excel
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Charts Row 1 */}
        <motion.div variants={item} className="grid lg:grid-cols-2 gap-6">
          {/* Présence par pays */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Présence moyenne par pays</CardTitle>
              <CardDescription>Taux de présence des élèves</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={analyticsPresenceParPays} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis type="number" domain={[80, 100]} tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                    <YAxis dataKey="pays" type="category" width={100} tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                      formatter={(value: number) => [`${value}%`, "Taux présence"]}
                    />
                    <Bar dataKey="taux" fill="hsl(var(--success))" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Croissance utilisateurs */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Croissance utilisateurs</CardTitle>
              <CardDescription>Évolution par type d'utilisateur</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={croissanceUtilisateurs}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="mois" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                    <YAxis tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="parents" stroke="hsl(var(--primary))" strokeWidth={2} name="Parents" />
                    <Line type="monotone" dataKey="enseignants" stroke="hsl(var(--info))" strokeWidth={2} name="Enseignants" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Charts Row 2 */}
        <motion.div variants={item} className="grid lg:grid-cols-2 gap-6">
          {/* Activité journalière */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Activité journalière</CardTitle>
              <CardDescription>Connexions et actions par jour de la semaine</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={activiteJournaliere}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="jour" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                    <YAxis tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Legend />
                    <Bar dataKey="connexions" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Connexions" />
                    <Bar dataKey="actions" fill="hsl(var(--info))" radius={[4, 4, 0, 0]} name="Actions" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Taux adoption parents */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Taux d'adoption parents</CardTitle>
              <CardDescription>Pourcentage de parents utilisant l'application</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={tauxAdoptionParents}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="mois" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                    <YAxis domain={[60, 100]} tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                      formatter={(value: number) => [`${value}%`, "Taux adoption"]}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="taux" 
                      stroke="hsl(var(--warning))" 
                      strokeWidth={2.5}
                      dot={{ fill: 'hsl(var(--warning))', strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Export Section */}
        <motion.div variants={item}>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Download className="h-5 w-5 text-primary" />
                Exports disponibles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2">
                  <BarChart3 className="h-8 w-8 text-primary" />
                  <span className="font-medium">Rapport global</span>
                  <span className="text-xs text-muted-foreground">PDF complet</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2">
                  <FileSpreadsheet className="h-8 w-8 text-success" />
                  <span className="font-medium">Données brutes</span>
                  <span className="text-xs text-muted-foreground">Excel / CSV</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2">
                  <FileText className="h-8 w-8 text-info" />
                  <span className="font-medium">Rapport financier</span>
                  <span className="text-xs text-muted-foreground">PDF revenus</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2">
                  <BarChart3 className="h-8 w-8 text-warning" />
                  <span className="font-medium">Rapport présence</span>
                  <span className="text-xs text-muted-foreground">Par établissement</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </SuperAdminLayout>
  );
}
