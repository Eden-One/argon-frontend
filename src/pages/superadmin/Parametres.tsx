import { motion } from "framer-motion";
import { SuperAdminLayout } from "@/components/layout/SuperAdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Settings, Palette, Mail, Database, Globe, Save } from "lucide-react";
import { parametresPlateforme } from "@/data/superAdminMockData";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

export default function Parametres() {
  return (
    <SuperAdminLayout>
      <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
        <motion.div variants={item} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">Paramètres Plateforme</h1>
            <p className="text-muted-foreground mt-1">Configuration globale d'ARGON</p>
          </div>
          <Button><Save className="h-4 w-4 mr-2" />Sauvegarder</Button>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
          <motion.div variants={item}>
            <Card>
              <CardHeader><CardTitle className="text-lg flex items-center gap-2"><Palette className="h-5 w-5 text-primary" />Branding</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2"><Label>Nom de la plateforme</Label><Input defaultValue={parametresPlateforme.branding.nomPlateforme} /></div>
                <div className="space-y-2"><Label>Tagline</Label><Input defaultValue={parametresPlateforme.branding.tagline} /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2"><Label>Couleur primaire</Label><Input type="color" defaultValue={parametresPlateforme.branding.couleurPrimaire} className="h-10 w-full" /></div>
                  <div className="space-y-2"><Label>Couleur secondaire</Label><Input type="color" defaultValue={parametresPlateforme.branding.couleurSecondaire} className="h-10 w-full" /></div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card>
              <CardHeader><CardTitle className="text-lg flex items-center gap-2"><Mail className="h-5 w-5 text-primary" />Emails système</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2"><Label>Email expéditeur</Label><Input defaultValue={parametresPlateforme.emails.expediteur} /></div>
                <div className="space-y-2"><Label>Nom expéditeur</Label><Input defaultValue={parametresPlateforme.emails.nomExpediteur} /></div>
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between"><Label>Template bienvenue</Label><Switch defaultChecked={parametresPlateforme.emails.templateBienvenue} /></div>
                  <div className="flex items-center justify-between"><Label>Template reset password</Label><Switch defaultChecked={parametresPlateforme.emails.templateResetPassword} /></div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card>
              <CardHeader><CardTitle className="text-lg flex items-center gap-2"><Database className="h-5 w-5 text-primary" />Limites</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2"><Label>Stockage max par établissement</Label><Input defaultValue={parametresPlateforme.limites.stockageMaxParEtablissement} /></div>
                <div className="space-y-2"><Label>Taille max fichier</Label><Input defaultValue={parametresPlateforme.limites.tailleMaxFichier} /></div>
                <div className="space-y-2"><Label>Messages par heure</Label><Input type="number" defaultValue={parametresPlateforme.limites.messagesParHeure} /></div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card>
              <CardHeader><CardTitle className="text-lg flex items-center gap-2"><Settings className="h-5 w-5 text-primary" />Mode maintenance</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div><Label>Activer maintenance</Label><p className="text-sm text-muted-foreground">Rend la plateforme inaccessible</p></div>
                  <Switch defaultChecked={parametresPlateforme.maintenance.modeActif} />
                </div>
                <div className="space-y-2"><Label>Message maintenance</Label><Textarea defaultValue={parametresPlateforme.maintenance.messageMaintenance} rows={3} /></div>
                <div className="space-y-2"><Label>Langue par défaut</Label>
                  <Select defaultValue={parametresPlateforme.langueDefaut}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent><SelectItem value="fr">Français</SelectItem><SelectItem value="en">English</SelectItem></SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </SuperAdminLayout>
  );
}
