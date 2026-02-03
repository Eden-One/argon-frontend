import { useState } from "react";
import ParentLayout from "@/components/layout/ParentLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  User,
  GraduationCap,
  Calendar,
  Mail,
  Phone,
  ChevronRight,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";
import { enfants } from "@/data/parentMockData";

export default function ParentEnfants() {
  const [selectedEnfant, setSelectedEnfant] = useState(enfants[0]);

  return (
    <ParentLayout>
      <div className="space-y-6 pb-20 lg:pb-0">
        {/* Header */}
        <div>
          <h1 className="font-display text-2xl font-bold mb-1">Mes Enfants</h1>
          <p className="text-muted-foreground">
            Informations sur vos enfants scolarisés
          </p>
        </div>

        {/* Child Selector Cards */}
        <div className="grid gap-4">
          {enfants.map((enfant) => (
            <Card
              key={enfant.id}
              className={`cursor-pointer transition-all ${
                selectedEnfant.id === enfant.id
                  ? "ring-2 ring-amber-500 bg-amber-50/50"
                  : "hover:bg-muted/50"
              }`}
              onClick={() => setSelectedEnfant(enfant)}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16 border-4 border-white shadow-lg">
                    <AvatarImage src={enfant.photo} />
                    <AvatarFallback className="text-xl bg-amber-100 text-amber-700">
                      {enfant.prenom[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">
                      {enfant.prenom} {enfant.nom}
                    </h3>
                    <p className="text-muted-foreground">{enfant.classe}</p>
                    <div className="flex gap-2 mt-2">
                      <Badge variant="secondary" className="bg-amber-100 text-amber-700">
                        {enfant.age} ans
                      </Badge>
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        {enfant.tauxPresence}% présence
                      </Badge>
                    </div>
                  </div>
                  {selectedEnfant.id === enfant.id && (
                    <CheckCircle2 className="h-6 w-6 text-amber-500" />
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Selected Child Details */}
        <Tabs defaultValue="infos" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="infos">Informations</TabsTrigger>
            <TabsTrigger value="enseignants">Enseignants</TabsTrigger>
          </TabsList>

          <TabsContent value="infos" className="space-y-4">
            {/* Personal Info Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <User className="h-5 w-5 text-amber-600" />
                  Informations personnelles
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50">
                  <Avatar className="h-20 w-20 border-4 border-white shadow-lg">
                    <AvatarImage src={selectedEnfant.photo} />
                    <AvatarFallback className="text-2xl bg-amber-100 text-amber-700">
                      {selectedEnfant.prenom[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-display text-xl font-bold">
                      {selectedEnfant.prenom} {selectedEnfant.nom}
                    </h3>
                    <p className="text-muted-foreground">{selectedEnfant.niveau}</p>
                  </div>
                </div>

                <div className="grid gap-3">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <GraduationCap className="h-5 w-5 text-amber-600" />
                    <div>
                      <p className="text-sm text-muted-foreground">Classe</p>
                      <p className="font-medium">{selectedEnfant.classe}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <Calendar className="h-5 w-5 text-amber-600" />
                    <div>
                      <p className="text-sm text-muted-foreground">Date de naissance</p>
                      <p className="font-medium">
                        {new Date(selectedEnfant.dateNaissance).toLocaleDateString("fr-FR", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <User className="h-5 w-5 text-amber-600" />
                    <div>
                      <p className="text-sm text-muted-foreground">Professeur principal</p>
                      <p className="font-medium">{selectedEnfant.enseignantPrincipal}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stats Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-amber-600" />
                  Statistiques
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50">
                    <p className="text-3xl font-bold text-green-600">
                      {selectedEnfant.tauxPresence}%
                    </p>
                    <p className="text-sm text-muted-foreground">Taux de présence</p>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50">
                    <p className="text-3xl font-bold text-amber-600">
                      {selectedEnfant.moyenneGenerale}/20
                    </p>
                    <p className="text-sm text-muted-foreground">Moyenne générale</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="enseignants" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-amber-600" />
                  Équipe enseignante
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {selectedEnfant.enseignants.map((enseignant, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <Avatar className="h-12 w-12">
                      <AvatarImage
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${enseignant.nom}`}
                      />
                      <AvatarFallback className="bg-amber-100 text-amber-700">
                        {enseignant.nom[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium">{enseignant.nom}</p>
                      <p className="text-sm text-muted-foreground">{enseignant.matiere}</p>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Mail className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ParentLayout>
  );
}
