import { useState } from "react";
import ParentLayout from "@/components/layout/ParentLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BookOpen,
  Calendar,
  Download,
  Search,
  AlertCircle,
  CheckCircle2,
  Clock,
  FileText,
} from "lucide-react";
import { enfants, devoirsParent } from "@/data/parentMockData";

export default function ParentDevoirs() {
  const [selectedEnfant, setSelectedEnfant] = useState(enfants[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("tous");

  const childDevoirs = devoirsParent.filter((d) => d.enfantId === selectedEnfant.id);

  const filteredDevoirs = childDevoirs.filter((d) => {
    const matchesSearch =
      d.titre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.matiere.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === "tous") return matchesSearch;
    return matchesSearch && d.statut === activeTab;
  });

  // Stats
  const stats = {
    total: childDevoirs.length,
    aFaire: childDevoirs.filter((d) => d.statut === "a_faire" || d.statut === "en_cours").length,
    enRetard: childDevoirs.filter((d) => d.statut === "en_retard").length,
    rendus: childDevoirs.filter((d) => d.statut === "rendu").length,
  };

  const getStatutBadge = (statut: string) => {
    switch (statut) {
      case "a_faire":
        return (
          <Badge variant="secondary" className="bg-blue-100 text-blue-700">
            <Clock className="h-3 w-3 mr-1" />
            À faire
          </Badge>
        );
      case "en_cours":
        return (
          <Badge className="bg-amber-100 text-amber-700">
            <BookOpen className="h-3 w-3 mr-1" />
            En cours
          </Badge>
        );
      case "en_retard":
        return (
          <Badge variant="destructive">
            <AlertCircle className="h-3 w-3 mr-1" />
            En retard
          </Badge>
        );
      case "rendu":
        return (
          <Badge className="bg-green-100 text-green-700">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Rendu
          </Badge>
        );
      default:
        return null;
    }
  };

  const getPriorityBadge = (priorite: string) => {
    switch (priorite) {
      case "urgent":
        return <Badge variant="destructive">Urgent</Badge>;
      case "important":
        return <Badge className="bg-amber-500">Important</Badge>;
      default:
        return null;
    }
  };

  const getDaysRemaining = (dateLimite: string) => {
    const today = new Date();
    const deadline = new Date(dateLimite);
    const diffTime = deadline.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <ParentLayout>
      <div className="space-y-6 pb-20 lg:pb-0">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-bold mb-1">Devoirs</h1>
            <p className="text-muted-foreground">
              Suivez les devoirs de votre enfant
            </p>
          </div>
          <Select
            value={selectedEnfant.id}
            onValueChange={(v) =>
              setSelectedEnfant(enfants.find((e) => e.id === v) || enfants[0])
            }
          >
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Sélectionner un enfant" />
            </SelectTrigger>
            <SelectContent>
              {enfants.map((enfant) => (
                <SelectItem key={enfant.id} value={enfant.id}>
                  {enfant.prenom} - {enfant.classe}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-blue-600">{stats.total}</p>
              <p className="text-xs text-blue-700">Total devoirs</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-amber-600">{stats.aFaire}</p>
              <p className="text-xs text-amber-700">À faire</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-red-50 to-rose-50 border-red-200">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-red-600">{stats.enRetard}</p>
              <p className="text-xs text-red-700">En retard</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-green-600">{stats.rendus}</p>
              <p className="text-xs text-green-700">Rendus</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher un devoir..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="tous">Tous</TabsTrigger>
            <TabsTrigger value="a_faire">À faire</TabsTrigger>
            <TabsTrigger value="en_retard">En retard</TabsTrigger>
            <TabsTrigger value="rendu">Rendus</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-4 space-y-4">
            {filteredDevoirs.length > 0 ? (
              filteredDevoirs.map((devoir) => {
                const daysRemaining = getDaysRemaining(devoir.dateLimite);
                return (
                  <Card
                    key={devoir.id}
                    className={`${
                      devoir.statut === "en_retard"
                        ? "border-red-200 bg-red-50/30"
                        : devoir.priorite === "urgent"
                        ? "border-amber-200 bg-amber-50/30"
                        : ""
                    }`}
                  >
                    <CardContent className="p-4">
                      <div className="flex flex-col gap-3">
                        {/* Header */}
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-amber-100">
                              <BookOpen className="h-5 w-5 text-amber-600" />
                            </div>
                            <div>
                              <h3 className="font-semibold">{devoir.titre}</h3>
                              <p className="text-sm text-muted-foreground">
                                {devoir.matiere} • {devoir.enseignant}
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-1">
                            {getStatutBadge(devoir.statut)}
                            {getPriorityBadge(devoir.priorite)}
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-sm text-muted-foreground">
                          {devoir.description}
                        </p>

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-2 border-t">
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>
                              Pour le{" "}
                              {new Date(devoir.dateLimite).toLocaleDateString("fr-FR", {
                                day: "numeric",
                                month: "long",
                              })}
                            </span>
                            {daysRemaining > 0 && devoir.statut !== "rendu" && (
                              <Badge variant="outline" className="ml-2">
                                {daysRemaining} jour{daysRemaining > 1 ? "s" : ""}
                              </Badge>
                            )}
                          </div>
                          {devoir.fichier && (
                            <Button variant="outline" size="sm" className="gap-2">
                              <Download className="h-4 w-4" />
                              Télécharger
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <FileText className="h-12 w-12 mx-auto mb-3 text-muted-foreground/50" />
                  <p className="text-muted-foreground">Aucun devoir trouvé</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </ParentLayout>
  );
}
