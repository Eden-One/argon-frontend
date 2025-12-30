import { motion } from "framer-motion";
import { SuperAdminLayout } from "@/components/layout/SuperAdminLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatsCard } from "@/components/ui/stats-card";
import {
  School,
  Users,
  GraduationCap,
  UserCheck,
  TrendingUp,
  AlertTriangle,
  Plus,
  Eye,
  FileText,
  ArrowUpRight,
  AlertCircle,
  CreditCard,
  Ban,
  Server,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "react-router-dom";
import {
  superAdminStats,
  etablissementsEvolution,
  inscriptionsParPays,
  repartitionUtilisateurs,
  etablissementsList,
  alertesSysteme,
} from "@/data/superAdminMockData";

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

const getStatusBadge = (statut: string) => {
  switch (statut) {
    case "actif":
      return <Badge variant="success">Actif</Badge>;
    case "suspendu":
      return <Badge variant="destructive">Suspendu</Badge>;
    case "en_attente":
      return <Badge variant="warning">En attente</Badge>;
    default:
      return <Badge variant="secondary">{statut}</Badge>;
  }
};

const getAlertIcon = (type: string) => {
  switch (type) {
    case "paiement":
      return <CreditCard className="h-4 w-4" />;
    case "suspension":
      return <Ban className="h-4 w-4" />;
    case "serveur":
      return <Server className="h-4 w-4" />;
    case "securite":
      return <AlertTriangle className="h-4 w-4" />;
    default:
      return <AlertCircle className="h-4 w-4" />;
  }
};

const getAlertColor = (priorite: string) => {
  switch (priorite) {
    case "haute":
      return "text-destructive bg-destructive/10";
    case "moyenne":
      return "text-warning bg-warning/10";
    default:
      return "text-muted-foreground bg-muted";
  }
};

export default function SuperAdminDashboard() {
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
            <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">Dashboard Global</h1>
            <p className="text-muted-foreground mt-1">Vue d'ensemble de la plateforme ARGON</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <FileText className="h-4 w-4 mr-2" />
              Exporter
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Créer établissement
            </Button>
          </div>
        </motion.div>

        {/* KPI Cards */}
        <motion.div variants={item} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <StatsCard
            title="Établissements"
            value={superAdminStats.totalEtablissements}
            icon={<School className="h-5 w-5" />}
            variant="primary"
            trend={{ value: 12, isPositive: true }}
          />
          <StatsCard
            title="Élèves actifs"
            value={superAdminStats.elevesActifs.toLocaleString()}
            icon={<GraduationCap className="h-5 w-5" />}
            variant="info"
            trend={{ value: 8.5, isPositive: true }}
          />
          <StatsCard
            title="Enseignants"
            value={superAdminStats.enseignants.toLocaleString()}
            icon={<UserCheck className="h-5 w-5" />}
            variant="success"
            trend={{ value: 5.2, isPositive: true }}
          />
          <StatsCard
            title="Parents"
            value={superAdminStats.parents.toLocaleString()}
            icon={<Users className="h-5 w-5" />}
            variant="secondary"
            trend={{ value: 10.3, isPositive: true }}
          />
          <StatsCard
            title="Taux de présence"
            value={`${superAdminStats.tauxPresenceMoyen}%`}
            icon={<TrendingUp className="h-5 w-5" />}
            variant="success"
            trend={{ value: 1.2, isPositive: true }}
          />
          <StatsCard
            title="Incidents"
            value={superAdminStats.incidentsEnCours}
            icon={<AlertTriangle className="h-5 w-5" />}
            variant="danger"
            trend={{ value: 2, isPositive: false }}
          />
        </motion.div>

        {/* Charts Row 1 */}
        <motion.div variants={item} className="grid lg:grid-cols-2 gap-6">
          {/* Evolution des établissements */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Évolution des établissements</CardTitle>
              <CardDescription>12 derniers mois</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={etablissementsEvolution}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="mois" className="text-xs" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                    <YAxis className="text-xs" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="count" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={2.5}
                      dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, fill: 'hsl(var(--primary))' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Inscriptions par pays */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Inscriptions par pays</CardTitle>
              <CardDescription>Répartition géographique des élèves</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={inscriptionsParPays} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis type="number" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                    <YAxis dataKey="pays" type="category" width={100} tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                      formatter={(value: number) => [value.toLocaleString(), "Élèves"]}
                    />
                    <Bar dataKey="count" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Charts Row 2 + Alerts */}
        <motion.div variants={item} className="grid lg:grid-cols-3 gap-6">
          {/* Répartition utilisateurs */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Répartition utilisateurs</CardTitle>
              <CardDescription>Par type de compte</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={repartitionUtilisateurs}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {repartitionUtilisateurs.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                      formatter={(value: number) => [value.toLocaleString(), ""]}
                    />
                    <Legend 
                      verticalAlign="bottom" 
                      height={36}
                      formatter={(value) => <span className="text-sm text-foreground">{value}</span>}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Alertes système */}
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg">Alertes système</CardTitle>
                <CardDescription>Notifications importantes</CardDescription>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/superadmin/support">
                  Voir tout
                  <ArrowUpRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {alertesSysteme.map((alerte) => (
                  <div
                    key={alerte.id}
                    className={`flex items-center gap-4 p-3 rounded-lg ${getAlertColor(alerte.priorite)}`}
                  >
                    <div className="shrink-0">
                      {getAlertIcon(alerte.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{alerte.message}</p>
                      <p className="text-xs opacity-70">{alerte.date}</p>
                    </div>
                    <Badge variant={alerte.priorite === "haute" ? "destructive" : "outline"} className="shrink-0">
                      {alerte.priorite}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Establishments Table */}
        <motion.div variants={item}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg">Derniers établissements créés</CardTitle>
                <CardDescription>5 derniers établissements</CardDescription>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/superadmin/etablissements">
                  Voir tout
                  <ArrowUpRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Établissement</TableHead>
                      <TableHead>Ville</TableHead>
                      <TableHead>Pays</TableHead>
                      <TableHead>Admin principal</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Date création</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {etablissementsList.slice(0, 5).map((etab) => (
                      <TableRow key={etab.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center overflow-hidden">
                              <img src={etab.logo} alt={etab.nom} className="w-full h-full object-cover" />
                            </div>
                            <span className="font-medium">{etab.nom}</span>
                          </div>
                        </TableCell>
                        <TableCell>{etab.ville}</TableCell>
                        <TableCell>{etab.pays}</TableCell>
                        <TableCell>{etab.adminPrincipal}</TableCell>
                        <TableCell>{getStatusBadge(etab.statut)}</TableCell>
                        <TableCell>{new Date(etab.dateCreation).toLocaleDateString("fr-FR")}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" asChild>
                            <Link to={`/superadmin/etablissements/${etab.id}`}>
                              <Eye className="h-4 w-4" />
                            </Link>
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

        {/* Quick Actions */}
        <motion.div variants={item}>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Actions rapides</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-3 gap-4">
                <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2" asChild>
                  <Link to="/superadmin/etablissements/nouveau">
                    <Plus className="h-6 w-6 text-primary" />
                    <span>Créer un établissement</span>
                  </Link>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2" asChild>
                  <Link to="/superadmin/support">
                    <AlertTriangle className="h-6 w-6 text-warning" />
                    <span>Voir les incidents</span>
                  </Link>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2" asChild>
                  <Link to="/superadmin/logs">
                    <FileText className="h-6 w-6 text-info" />
                    <span>Accéder aux logs</span>
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </SuperAdminLayout>
  );
}
