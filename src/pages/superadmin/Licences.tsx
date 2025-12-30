import { motion } from "framer-motion";
import { SuperAdminLayout } from "@/components/layout/SuperAdminLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
  CreditCard,
  Check,
  ArrowRight,
  RefreshCw,
  Download,
  TrendingUp,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { abonnementPlans, licencesEtablissements, revenusMensuels } from "@/data/superAdminMockData";

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

const getPaymentBadge = (statut: string) => {
  switch (statut) {
    case "payé":
      return <Badge variant="success">Payé</Badge>;
    case "en_attente":
      return <Badge variant="warning">En attente</Badge>;
    case "expiré":
      return <Badge variant="destructive">Expiré</Badge>;
    case "N/A":
      return <Badge variant="secondary">N/A</Badge>;
    default:
      return <Badge variant="outline">{statut}</Badge>;
  }
};

const getPlanColor = (plan: string) => {
  switch (plan) {
    case "Premium":
      return "border-warning bg-warning/5";
    case "Standard":
      return "border-primary bg-primary/5";
    default:
      return "border-muted bg-muted/5";
  }
};

export default function Licences() {
  const totalRevenu = revenusMensuels.reduce((acc, m) => acc + m.montant, 0);
  
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
            <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">Licences & Abonnements</h1>
            <p className="text-muted-foreground mt-1">Gérer les plans et les abonnements des établissements</p>
          </div>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exporter rapport
          </Button>
        </motion.div>

        {/* Plans Cards */}
        <motion.div variants={item} className="grid md:grid-cols-3 gap-6">
          {abonnementPlans.map((plan) => (
            <Card key={plan.id} className={`relative overflow-hidden border-2 ${getPlanColor(plan.nom)}`}>
              {plan.populaire && (
                <div className="absolute top-4 right-4">
                  <Badge className="bg-primary text-primary-foreground">Populaire</Badge>
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-xl">{plan.nom}</CardTitle>
                <div className="flex items-baseline gap-1 mt-2">
                  <span className="text-3xl font-bold">{plan.prix.toLocaleString()}</span>
                  <span className="text-muted-foreground">{plan.devise}/{plan.periode}</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium">
                      {plan.limiteEleves === -1 ? "Élèves illimités" : `Jusqu'à ${plan.limiteEleves} élèves`}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium">
                      {plan.limiteEnseignants === -1 ? "Enseignants illimités" : `Jusqu'à ${plan.limiteEnseignants} enseignants`}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium">Stockage: {plan.stockage}</span>
                  </div>
                </div>
                <div className="space-y-2 border-t pt-4">
                  {plan.fonctionnalites.map((feat, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-success shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Revenue Chart */}
        <motion.div variants={item}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Revenus mensuels
                </CardTitle>
                <CardDescription>
                  Total annuel: {totalRevenu.toLocaleString()} FCFA
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenusMensuels}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="mois" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                    <YAxis 
                      tick={{ fill: 'hsl(var(--muted-foreground))' }}
                      tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                      formatter={(value: number) => [`${value.toLocaleString()} FCFA`, "Revenus"]}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="montant" 
                      stroke="hsl(var(--success))" 
                      strokeWidth={2.5}
                      dot={{ fill: 'hsl(var(--success))', strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Subscriptions Table */}
        <motion.div variants={item}>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-primary" />
                Abonnements établissements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Établissement</TableHead>
                      <TableHead>Plan</TableHead>
                      <TableHead>Date expiration</TableHead>
                      <TableHead>Montant</TableHead>
                      <TableHead>Statut paiement</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {licencesEtablissements.map((licence) => (
                      <TableRow key={licence.id}>
                        <TableCell className="font-medium">{licence.etablissement}</TableCell>
                        <TableCell>
                          <Badge variant={licence.plan === "Premium" ? "default" : licence.plan === "Standard" ? "secondary" : "outline"}>
                            {licence.plan}
                          </Badge>
                        </TableCell>
                        <TableCell>{licence.dateExpiration}</TableCell>
                        <TableCell>{licence.montant > 0 ? `${licence.montant.toLocaleString()} FCFA` : "-"}</TableCell>
                        <TableCell>{getPaymentBadge(licence.statutPaiement)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button variant="ghost" size="sm">
                              <RefreshCw className="h-4 w-4 mr-1" />
                              Renouveler
                            </Button>
                            <Button variant="ghost" size="sm">
                              <ArrowRight className="h-4 w-4 mr-1" />
                              Changer plan
                            </Button>
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
