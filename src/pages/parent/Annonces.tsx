import { useState } from "react";
import ParentLayout from "@/components/layout/ParentLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Megaphone,
  Search,
  AlertCircle,
  Calendar,
  Download,
  Check,
  Bell,
} from "lucide-react";
import { annoncesParent } from "@/data/parentMockData";

export default function ParentAnnonces() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("toutes");
  const [annonces, setAnnonces] = useState(annoncesParent);

  const unreadCount = annonces.filter((a) => !a.lu).length;

  const filteredAnnonces = annonces.filter((a) => {
    const matchesSearch =
      a.titre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.contenu.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeTab === "toutes") return matchesSearch;
    if (activeTab === "non_lues") return matchesSearch && !a.lu;
    if (activeTab === "importantes") return matchesSearch && a.priorite === "important";
    return matchesSearch;
  });

  const markAsRead = (id: string) => {
    setAnnonces(annonces.map((a) => (a.id === id ? { ...a, lu: true } : a)));
  };

  const markAllAsRead = () => {
    setAnnonces(annonces.map((a) => ({ ...a, lu: true })));
  };

  return (
    <ParentLayout>
      <div className="space-y-6 pb-20 lg:pb-0">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-bold mb-1">Annonces</h1>
            <p className="text-muted-foreground">
              {unreadCount > 0
                ? `${unreadCount} annonce${unreadCount > 1 ? "s" : ""} non lue${unreadCount > 1 ? "s" : ""}`
                : "Toutes les annonces sont lues"}
            </p>
          </div>
          {unreadCount > 0 && (
            <Button variant="outline" onClick={markAllAsRead}>
              <Check className="h-4 w-4 mr-2" />
              Tout marquer comme lu
            </Button>
          )}
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher une annonce..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="toutes">Toutes</TabsTrigger>
            <TabsTrigger value="non_lues" className="relative">
              Non lues
              {unreadCount > 0 && (
                <Badge className="ml-2 bg-amber-500 h-5 w-5 p-0 flex items-center justify-center">
                  {unreadCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="importantes">Importantes</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-4 space-y-4">
            {filteredAnnonces.length > 0 ? (
              filteredAnnonces.map((annonce) => (
                <Card
                  key={annonce.id}
                  className={`transition-all ${
                    !annonce.lu
                      ? "border-amber-200 bg-amber-50/50"
                      : annonce.priorite === "important"
                      ? "border-red-200"
                      : ""
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div
                        className={`p-3 rounded-xl ${
                          annonce.priorite === "important"
                            ? "bg-red-100"
                            : "bg-amber-100"
                        }`}
                      >
                        {annonce.priorite === "important" ? (
                          <AlertCircle
                            className={`h-6 w-6 ${
                              annonce.priorite === "important"
                                ? "text-red-600"
                                : "text-amber-600"
                            }`}
                          />
                        ) : (
                          <Megaphone className="h-6 w-6 text-amber-600" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold">{annonce.titre}</h3>
                              {!annonce.lu && (
                                <Badge className="bg-amber-500">Nouveau</Badge>
                              )}
                              {annonce.priorite === "important" && (
                                <Badge variant="destructive">Important</Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {annonce.auteur} •{" "}
                              {new Date(annonce.date).toLocaleDateString("fr-FR", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              })}
                            </p>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          {annonce.contenu}
                        </p>
                        <div className="flex items-center gap-2">
                          {annonce.fichier && (
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4 mr-2" />
                              {annonce.fichier}
                            </Button>
                          )}
                          {!annonce.lu && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => markAsRead(annonce.id)}
                            >
                              <Check className="h-4 w-4 mr-2" />
                              Marquer comme lu
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <Bell className="h-12 w-12 mx-auto mb-3 text-muted-foreground/50" />
                  <p className="text-muted-foreground">Aucune annonce trouvée</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </ParentLayout>
  );
}
