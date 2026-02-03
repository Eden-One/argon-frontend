import { useState } from "react";
import ParentLayout from "@/components/layout/ParentLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Bell,
  Shield,
  Mail,
  Phone,
  Camera,
  Save,
  Lock,
  Smartphone,
  MessageSquare,
  GraduationCap,
  Calendar,
} from "lucide-react";
import { parentInfo } from "@/data/parentMockData";

export default function ParentParametres() {
  const [profile, setProfile] = useState({
    prenom: parentInfo.prenom,
    nom: parentInfo.nom,
    email: parentInfo.email,
    telephone: parentInfo.telephone,
  });

  const [notifications, setNotifications] = useState({
    messages: true,
    presences: true,
    notes: true,
    annonces: true,
    devoirs: true,
    emailRecap: false,
    smsUrgent: true,
  });

  return (
    <ParentLayout>
      <div className="space-y-6 pb-20 lg:pb-0">
        {/* Header */}
        <div>
          <h1 className="font-display text-2xl font-bold mb-1">Paramètres</h1>
          <p className="text-muted-foreground">
            Gérez votre compte et vos préférences
          </p>
        </div>

        {/* Profile Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <User className="h-5 w-5 text-amber-600" />
              Mon profil
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Avatar */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <Avatar className="h-20 w-20 border-4 border-amber-200">
                  <AvatarImage src={parentInfo.avatar} />
                  <AvatarFallback className="bg-amber-100 text-amber-700 text-xl">
                    {parentInfo.prenom[0]}{parentInfo.nom[0]}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="icon"
                  className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full bg-amber-500 hover:bg-amber-600"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              <div>
                <h3 className="font-semibold">
                  {profile.prenom} {profile.nom}
                </h3>
                <p className="text-sm text-muted-foreground">Parent</p>
              </div>
            </div>

            <Separator />

            {/* Profile Form */}
            <div className="grid gap-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="prenom">Prénom</Label>
                  <Input
                    id="prenom"
                    value={profile.prenom}
                    onChange={(e) => setProfile({ ...profile, prenom: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="nom">Nom</Label>
                  <Input
                    id="nom"
                    value={profile.nom}
                    onChange={(e) => setProfile({ ...profile, nom: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="telephone" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Téléphone
                </Label>
                <Input
                  id="telephone"
                  value={profile.telephone}
                  onChange={(e) => setProfile({ ...profile, telephone: e.target.value })}
                />
              </div>
            </div>

            <Button className="bg-amber-500 hover:bg-amber-600 gap-2">
              <Save className="h-4 w-4" />
              Enregistrer les modifications
            </Button>
          </CardContent>
        </Card>

        {/* Notifications Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Bell className="h-5 w-5 text-amber-600" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Choisissez les notifications que vous souhaitez recevoir
            </p>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <MessageSquare className="h-5 w-5 text-amber-600" />
                  <div>
                    <p className="font-medium">Messages</p>
                    <p className="text-sm text-muted-foreground">
                      Nouveaux messages des enseignants
                    </p>
                  </div>
                </div>
                <Switch
                  checked={notifications.messages}
                  onCheckedChange={(v) =>
                    setNotifications({ ...notifications, messages: v })
                  }
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-amber-600" />
                  <div>
                    <p className="font-medium">Présences</p>
                    <p className="text-sm text-muted-foreground">
                      Absences et retards
                    </p>
                  </div>
                </div>
                <Switch
                  checked={notifications.presences}
                  onCheckedChange={(v) =>
                    setNotifications({ ...notifications, presences: v })
                  }
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <GraduationCap className="h-5 w-5 text-amber-600" />
                  <div>
                    <p className="font-medium">Notes</p>
                    <p className="text-sm text-muted-foreground">
                      Nouvelles notes et bulletins
                    </p>
                  </div>
                </div>
                <Switch
                  checked={notifications.notes}
                  onCheckedChange={(v) =>
                    setNotifications({ ...notifications, notes: v })
                  }
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <Bell className="h-5 w-5 text-amber-600" />
                  <div>
                    <p className="font-medium">Annonces</p>
                    <p className="text-sm text-muted-foreground">
                      Annonces de l'école
                    </p>
                  </div>
                </div>
                <Switch
                  checked={notifications.annonces}
                  onCheckedChange={(v) =>
                    setNotifications({ ...notifications, annonces: v })
                  }
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Récapitulatif email</p>
                    <p className="text-sm text-muted-foreground">
                      Résumé hebdomadaire par email
                    </p>
                  </div>
                </div>
                <Switch
                  checked={notifications.emailRecap}
                  onCheckedChange={(v) =>
                    setNotifications({ ...notifications, emailRecap: v })
                  }
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <Smartphone className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">SMS urgents</p>
                    <p className="text-sm text-muted-foreground">
                      Alertes urgentes par SMS
                    </p>
                  </div>
                </div>
                <Switch
                  checked={notifications.smsUrgent}
                  onCheckedChange={(v) =>
                    setNotifications({ ...notifications, smsUrgent: v })
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Shield className="h-5 w-5 text-amber-600" />
              Sécurité
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-lg bg-muted/50">
              <div className="flex items-center gap-3 mb-3">
                <Lock className="h-5 w-5 text-amber-600" />
                <div>
                  <p className="font-medium">Mot de passe</p>
                  <p className="text-sm text-muted-foreground">
                    Dernière modification : il y a 3 mois
                  </p>
                </div>
              </div>
              <Button variant="outline">Changer le mot de passe</Button>
            </div>

            <div className="p-4 rounded-lg bg-muted/50">
              <div className="flex items-center gap-3 mb-3">
                <Smartphone className="h-5 w-5 text-amber-600" />
                <div>
                  <p className="font-medium">Vérification en deux étapes</p>
                  <p className="text-sm text-muted-foreground">
                    Sécurisez votre compte avec un code SMS
                  </p>
                </div>
              </div>
              <Button variant="outline">Activer</Button>
            </div>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="border-destructive/50">
          <CardHeader>
            <CardTitle className="text-lg text-destructive">Zone de danger</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Ces actions sont irréversibles. Procédez avec prudence.
            </p>
            <Button variant="destructive">Supprimer mon compte</Button>
          </CardContent>
        </Card>
      </div>
    </ParentLayout>
  );
}
