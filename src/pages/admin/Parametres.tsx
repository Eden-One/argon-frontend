import { motion } from "framer-motion";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Settings, Building, Upload, Bell, Calendar, Shield, Database, Save } from "lucide-react";
import { useState } from "react";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

export default function Parametres() {
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  return (
    <AdminLayout>
      <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
        <motion.div variants={item}>
          <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">Paramètres</h1>
          <p className="text-muted-foreground mt-1">Configuration de l'établissement</p>
        </motion.div>

        <motion.div variants={item}>
          <Tabs defaultValue="general" className="space-y-6">
            <TabsList className="flex-wrap h-auto gap-2">
              <TabsTrigger value="general" className="gap-2">
                <Building className="h-4 w-4" />
                Général
              </TabsTrigger>
              <TabsTrigger value="annee" className="gap-2">
                <Calendar className="h-4 w-4" />
                Année scolaire
              </TabsTrigger>
              <TabsTrigger value="notifications" className="gap-2">
                <Bell className="h-4 w-4" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="securite" className="gap-2">
                <Shield className="h-4 w-4" />
                Sécurité
              </TabsTrigger>
              <TabsTrigger value="sauvegarde" className="gap-2">
                <Database className="h-4 w-4" />
                Sauvegarde
              </TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Informations de l'établissement</CardTitle>
                  <CardDescription>Informations générales affichées sur la plateforme</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col sm:flex-row gap-6">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-32 h-32 rounded-xl bg-muted flex items-center justify-center overflow-hidden border-2 border-dashed border-border">
                        {logoPreview ? (
                          <img src={logoPreview} alt="Logo" className="w-full h-full object-cover" />
                        ) : (
                          <Building className="h-12 w-12 text-muted-foreground" />
                        )}
                      </div>
                      <Button variant="outline" size="sm" className="gap-2">
                        <Upload className="h-4 w-4" />
                        Changer le logo
                      </Button>
                    </div>
                    <div className="flex-1 grid gap-4">
                      <div className="grid gap-2">
                        <Label>Nom de l'établissement</Label>
                        <Input defaultValue="Lycée Excellence Dakar" />
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label>Type</Label>
                          <Select defaultValue="prive">
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="public">Public</SelectItem>
                              <SelectItem value="prive">Privé</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-2">
                          <Label>Niveau</Label>
                          <Select defaultValue="secondaire">
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="primaire">Primaire</SelectItem>
                              <SelectItem value="secondaire">Secondaire</SelectItem>
                              <SelectItem value="mixte">Mixte</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label>Adresse</Label>
                      <Input defaultValue="Avenue Cheikh Anta Diop" />
                    </div>
                    <div className="grid gap-2">
                      <Label>Ville</Label>
                      <Input defaultValue="Dakar" />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="grid gap-2">
                      <Label>Téléphone</Label>
                      <Input defaultValue="+221 33 123 45 67" />
                    </div>
                    <div className="grid gap-2">
                      <Label>Email</Label>
                      <Input type="email" defaultValue="contact@lycee-excellence.sn" />
                    </div>
                    <div className="grid gap-2">
                      <Label>Site web</Label>
                      <Input defaultValue="www.lycee-excellence.sn" />
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label>Description</Label>
                    <Textarea 
                      defaultValue="Le Lycée Excellence de Dakar est un établissement d'enseignement secondaire privé, reconnu pour la qualité de son enseignement et ses résultats au baccalauréat." 
                      rows={3}
                    />
                  </div>

                  <Button className="gap-2">
                    <Save className="h-4 w-4" />
                    Enregistrer les modifications
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="annee" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Année scolaire en cours</CardTitle>
                  <CardDescription>Configuration de l'année académique</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="grid gap-2">
                      <Label>Année scolaire</Label>
                      <Select defaultValue="2024-2025">
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2024-2025">2024-2025</SelectItem>
                          <SelectItem value="2025-2026">2025-2026</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label>Date de début</Label>
                      <Input type="date" defaultValue="2024-09-02" />
                    </div>
                    <div className="grid gap-2">
                      <Label>Date de fin</Label>
                      <Input type="date" defaultValue="2025-06-30" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">Trimestres</h4>
                    <div className="grid gap-4">
                      {[
                        { nom: "Trimestre 1", debut: "2024-09-02", fin: "2024-12-20" },
                        { nom: "Trimestre 2", debut: "2025-01-06", fin: "2025-03-28" },
                        { nom: "Trimestre 3", debut: "2025-04-14", fin: "2025-06-30" },
                      ].map((trimestre, index) => (
                        <div key={index} className="grid sm:grid-cols-3 gap-4 p-4 rounded-lg bg-muted/50">
                          <div className="grid gap-2">
                            <Label>{trimestre.nom}</Label>
                          </div>
                          <div className="grid gap-2">
                            <Label className="text-xs text-muted-foreground">Début</Label>
                            <Input type="date" defaultValue={trimestre.debut} />
                          </div>
                          <div className="grid gap-2">
                            <Label className="text-xs text-muted-foreground">Fin</Label>
                            <Input type="date" defaultValue={trimestre.fin} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button className="gap-2">
                    <Save className="h-4 w-4" />
                    Enregistrer
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Paramètres de notifications</CardTitle>
                  <CardDescription>Configurez les notifications envoyées aux utilisateurs</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    {[
                      { label: "Absence d'un élève", description: "Notifier les parents en cas d'absence", defaultChecked: true },
                      { label: "Retard", description: "Notifier en cas de retard", defaultChecked: true },
                      { label: "Nouvelles notes", description: "Informer les parents des nouvelles notes", defaultChecked: true },
                      { label: "Devoirs à rendre", description: "Rappel des devoirs à venir", defaultChecked: false },
                      { label: "Événements du calendrier", description: "Notifications pour les événements scolaires", defaultChecked: true },
                      { label: "Annonces importantes", description: "Alertes pour les annonces urgentes", defaultChecked: true },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                        <div>
                          <p className="font-medium">{item.label}</p>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                        <Switch defaultChecked={item.defaultChecked} />
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">Canaux de notification</h4>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                        <span>Notifications push</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                        <span>SMS</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                        <span>Email</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                        <span>WhatsApp</span>
                        <Switch />
                      </div>
                    </div>
                  </div>

                  <Button className="gap-2">
                    <Save className="h-4 w-4" />
                    Enregistrer
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="securite" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Sécurité</CardTitle>
                  <CardDescription>Paramètres de sécurité de l'établissement</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                      <div>
                        <p className="font-medium">Authentification à deux facteurs</p>
                        <p className="text-sm text-muted-foreground">Exiger 2FA pour les administrateurs</p>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                      <div>
                        <p className="font-medium">Expiration de session</p>
                        <p className="text-sm text-muted-foreground">Déconnecter après inactivité</p>
                      </div>
                      <Select defaultValue="30">
                        <SelectTrigger className="w-[140px]"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="15">15 minutes</SelectItem>
                          <SelectItem value="30">30 minutes</SelectItem>
                          <SelectItem value="60">1 heure</SelectItem>
                          <SelectItem value="120">2 heures</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                      <div>
                        <p className="font-medium">Complexité mot de passe</p>
                        <p className="text-sm text-muted-foreground">Niveau de sécurité requis</p>
                      </div>
                      <Select defaultValue="medium">
                        <SelectTrigger className="w-[140px]"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Faible</SelectItem>
                          <SelectItem value="medium">Moyen</SelectItem>
                          <SelectItem value="high">Élevé</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button className="gap-2">
                    <Save className="h-4 w-4" />
                    Enregistrer
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="sauvegarde" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Sauvegarde des données</CardTitle>
                  <CardDescription>Gérez les sauvegardes de votre établissement</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="p-4 rounded-lg bg-success/10 border border-success/20">
                    <div className="flex items-center gap-3">
                      <Database className="h-5 w-5 text-success" />
                      <div>
                        <p className="font-medium text-success">Dernière sauvegarde réussie</p>
                        <p className="text-sm text-muted-foreground">08 janvier 2026 à 03:00</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                      <div>
                        <p className="font-medium">Sauvegarde automatique</p>
                        <p className="text-sm text-muted-foreground">Effectuer des sauvegardes régulières</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                      <div>
                        <p className="font-medium">Fréquence</p>
                        <p className="text-sm text-muted-foreground">Intervalle entre les sauvegardes</p>
                      </div>
                      <Select defaultValue="daily">
                        <SelectTrigger className="w-[140px]"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">Quotidienne</SelectItem>
                          <SelectItem value="weekly">Hebdomadaire</SelectItem>
                          <SelectItem value="monthly">Mensuelle</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button variant="outline" className="gap-2">
                      <Database className="h-4 w-4" />
                      Sauvegarder maintenant
                    </Button>
                    <Button variant="outline" className="gap-2">
                      Restaurer une sauvegarde
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </motion.div>
    </AdminLayout>
  );
}
