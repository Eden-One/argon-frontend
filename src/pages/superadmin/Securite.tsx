import { motion } from "framer-motion";
import { SuperAdminLayout } from "@/components/layout/SuperAdminLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Shield,
  AlertTriangle,
  Lock,
  Unlock,
  Key,
  Globe,
} from "lucide-react";
import { tentativesConnexionEchouees, comptesVerrouilles } from "@/data/superAdminMockData";
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

export default function Securite() {
  return (
    <SuperAdminLayout>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-6"
      >
        {/* Header */}
        <motion.div variants={item}>
          <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">Sécurité & Accès</h1>
          <p className="text-muted-foreground mt-1">Gérer la sécurité et les accès de la plateforme</p>
        </motion.div>

        {/* Stats */}
        <motion.div variants={item} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-destructive/10">
                  <AlertTriangle className="h-6 w-6 text-destructive" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{tentativesConnexionEchouees.length}</p>
                  <p className="text-sm text-muted-foreground">Tentatives échouées</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-warning/10">
                  <Lock className="h-6 w-6 text-warning" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{comptesVerrouilles.length}</p>
                  <p className="text-sm text-muted-foreground">Comptes verrouillés</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-success/10">
                  <Key className="h-6 w-6 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold">78%</p>
                  <p className="text-sm text-muted-foreground">2FA activé</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">100/min</p>
                  <p className="text-sm text-muted-foreground">Rate limit API</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Security Settings */}
        <motion.div variants={item} className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Paramètres de sécurité
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Authentification 2FA obligatoire</Label>
                  <p className="text-sm text-muted-foreground">Exiger 2FA pour tous les admins</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Verrouillage automatique</Label>
                  <p className="text-sm text-muted-foreground">Après 5 tentatives échouées</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Expiration session</Label>
                  <p className="text-sm text-muted-foreground">Déconnexion après inactivité</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="space-y-2">
                <Label>Durée session (minutes)</Label>
                <Input type="number" defaultValue="60" className="w-32" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary" />
                Limites API & Rate Limiting
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Requêtes par minute (par utilisateur)</Label>
                <Input type="number" defaultValue="100" className="w-32" />
              </div>
              <div className="space-y-2">
                <Label>Requêtes par heure (global)</Label>
                <Input type="number" defaultValue="10000" className="w-32" />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Bloquer IP suspectes</Label>
                  <p className="text-sm text-muted-foreground">Bloquer automatiquement les IP malveillantes</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Protection DDOS</Label>
                  <p className="text-sm text-muted-foreground">Protection Cloudflare activée</p>
                </div>
                <Badge variant="success">Actif</Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Failed Login Attempts */}
        <motion.div variants={item}>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                Tentatives de connexion échouées
              </CardTitle>
              <CardDescription>Dernières 24 heures</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Email</TableHead>
                      <TableHead>Adresse IP</TableHead>
                      <TableHead>Pays</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-center">Tentatives</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tentativesConnexionEchouees.map((tentative) => (
                      <TableRow key={tentative.id}>
                        <TableCell className="font-medium">{tentative.email}</TableCell>
                        <TableCell className="font-mono text-sm">{tentative.ip}</TableCell>
                        <TableCell>{tentative.pays}</TableCell>
                        <TableCell>
                          {format(new Date(tentative.date), "dd/MM HH:mm", { locale: fr })}
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge variant={tentative.tentatives >= 5 ? "destructive" : "warning"}>
                            {tentative.tentatives}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="destructive" size="sm">
                            Bloquer IP
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

        {/* Locked Accounts */}
        <motion.div variants={item}>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Lock className="h-5 w-5 text-warning" />
                Comptes verrouillés
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Utilisateur</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Date verrouillage</TableHead>
                      <TableHead>Raison</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {comptesVerrouilles.map((compte) => (
                      <TableRow key={compte.id}>
                        <TableCell className="font-medium">{compte.nom}</TableCell>
                        <TableCell>{compte.email}</TableCell>
                        <TableCell>
                          {format(new Date(compte.dateVerrouillage), "dd MMM yyyy HH:mm", { locale: fr })}
                        </TableCell>
                        <TableCell>{compte.raison}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm">
                            <Unlock className="h-4 w-4 mr-2" />
                            Déverrouiller
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
    </SuperAdminLayout>
  );
}
