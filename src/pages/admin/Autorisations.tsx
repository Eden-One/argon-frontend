import { motion } from "framer-motion";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserCheck, Plus, Search, QrCode, Shield, Clock, CheckCircle, History, Eye, Edit, Trash2, Scan } from "lucide-react";
import { autorisationsData, historiqueRetraitsData, classesData } from "@/data/adminMockData";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

const getTypeBadge = (type: string) => {
  switch (type) {
    case "permanent": return <Badge className="bg-primary/20 text-primary">Permanent</Badge>;
    case "temporaire": return <Badge variant="warning">Temporaire</Badge>;
    case "ponctuel": return <Badge variant="secondary">Ponctuel</Badge>;
    default: return <Badge variant="outline">{type}</Badge>;
  }
};

const getStatutBadge = (statut: string) => {
  switch (statut) {
    case "valide": return <Badge className="bg-success/20 text-success">Valide</Badge>;
    case "expire": return <Badge variant="destructive">Expiré</Badge>;
    case "revoque": return <Badge variant="outline">Révoqué</Badge>;
    default: return <Badge variant="outline">{statut}</Badge>;
  }
};

export default function Autorisations() {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [showQRModal, setShowQRModal] = useState(false);
  const [selectedAutorisation, setSelectedAutorisation] = useState<typeof autorisationsData[0] | null>(null);

  const filteredAutorisations = autorisationsData.filter(auth => {
    const matchesSearch = auth.eleve.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         auth.personneAutorisee.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "all" || auth.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const valides = autorisationsData.filter(a => a.statut === "valide").length;
  const retraitsAujourdhui = historiqueRetraitsData.filter(r => 
    format(new Date(r.date), "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd")
  ).length;

  const openQRModal = (auth: typeof autorisationsData[0]) => {
    setSelectedAutorisation(auth);
    setShowQRModal(true);
  };

  return (
    <AdminLayout>
      <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
        <motion.div variants={item} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">Autorisations de retrait</h1>
            <p className="text-muted-foreground mt-1">Gérer les personnes autorisées à récupérer les élèves</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Scan className="h-4 w-4" />
              Scanner QR
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Nouvelle autorisation
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle>Créer une autorisation</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label>Élève</Label>
                    <Select>
                      <SelectTrigger><SelectValue placeholder="Sélectionner un élève" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="eleve1">Aminata Diallo - 6ème A</SelectItem>
                        <SelectItem value="eleve2">Moussa Koné - 5ème B</SelectItem>
                        <SelectItem value="eleve3">Fatou Sy - 4ème A</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label>Personne autorisée</Label>
                    <Input placeholder="Nom complet" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label>Relation</Label>
                      <Select>
                        <SelectTrigger><SelectValue placeholder="Sélectionner" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="parent">Parent</SelectItem>
                          <SelectItem value="grand-parent">Grand-parent</SelectItem>
                          <SelectItem value="oncle-tante">Oncle/Tante</SelectItem>
                          <SelectItem value="tuteur">Tuteur légal</SelectItem>
                          <SelectItem value="autre">Autre</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label>Type</Label>
                      <Select>
                        <SelectTrigger><SelectValue placeholder="Sélectionner" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="permanent">Permanent</SelectItem>
                          <SelectItem value="temporaire">Temporaire</SelectItem>
                          <SelectItem value="ponctuel">Ponctuel</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label>Date début</Label>
                      <Input type="date" />
                    </div>
                    <div className="grid gap-2">
                      <Label>Date fin</Label>
                      <Input type="date" />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label>Photo (optionnel)</Label>
                    <Input type="file" accept="image/*" />
                  </div>
                  <Button className="w-full mt-2">Créer l'autorisation</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </motion.div>

        <motion.div variants={item} className="grid sm:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6 flex items-center gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{autorisationsData.length}</p>
                <p className="text-sm text-muted-foreground">Autorisations</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 flex items-center gap-4">
              <div className="p-3 rounded-lg bg-success/10">
                <CheckCircle className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">{valides}</p>
                <p className="text-sm text-muted-foreground">Valides</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 flex items-center gap-4">
              <div className="p-3 rounded-lg bg-accent/10">
                <UserCheck className="h-6 w-6 text-accent-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold">{retraitsAujourdhui}</p>
                <p className="text-sm text-muted-foreground">Retraits aujourd'hui</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 flex items-center gap-4">
              <div className="p-3 rounded-lg bg-warning/10">
                <Clock className="h-6 w-6 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold">{autorisationsData.filter(a => a.type === "temporaire").length}</p>
                <p className="text-sm text-muted-foreground">Temporaires</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Tabs defaultValue="autorisations" className="space-y-4">
            <TabsList>
              <TabsTrigger value="autorisations">Autorisations</TabsTrigger>
              <TabsTrigger value="historique">Historique retraits</TabsTrigger>
            </TabsList>

            <TabsContent value="autorisations" className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Rechercher..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les types</SelectItem>
                    <SelectItem value="permanent">Permanent</SelectItem>
                    <SelectItem value="temporaire">Temporaire</SelectItem>
                    <SelectItem value="ponctuel">Ponctuel</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Élève</TableHead>
                          <TableHead>Personne autorisée</TableHead>
                          <TableHead>Relation</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Validité</TableHead>
                          <TableHead>Statut</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredAutorisations.map((auth) => (
                          <TableRow key={auth.id}>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <Avatar className="h-8 w-8">
                                  <AvatarFallback>{auth.eleve.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium">{auth.eleve}</p>
                                  <p className="text-xs text-muted-foreground">{auth.classe}</p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <Avatar className="h-8 w-8">
                                  <AvatarFallback>{auth.personneAutorisee.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                </Avatar>
                                <span>{auth.personneAutorisee}</span>
                              </div>
                            </TableCell>
                            <TableCell>{auth.relation}</TableCell>
                            <TableCell>{getTypeBadge(auth.type)}</TableCell>
                            <TableCell>
                              <span className="text-sm">
                                {format(new Date(auth.dateDebut), "dd/MM/yy", { locale: fr })} - {format(new Date(auth.dateFin), "dd/MM/yy", { locale: fr })}
                              </span>
                            </TableCell>
                            <TableCell>{getStatutBadge(auth.statut)}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-1">
                                <Button variant="ghost" size="icon" onClick={() => openQRModal(auth)} title="QR Code">
                                  <QrCode className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" title="Modifier">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" title="Révoquer">
                                  <Trash2 className="h-4 w-4" />
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
            </TabsContent>

            <TabsContent value="historique" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <History className="h-5 w-5 text-primary" />
                    Historique des retraits
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date & Heure</TableHead>
                          <TableHead>Élève</TableHead>
                          <TableHead>Retiré par</TableHead>
                          <TableHead>Relation</TableHead>
                          <TableHead>Validé par</TableHead>
                          <TableHead>Méthode</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {historiqueRetraitsData.map((retrait) => (
                          <TableRow key={retrait.id}>
                            <TableCell>
                              <div>
                                <p className="font-medium">{format(new Date(retrait.date), "dd/MM/yyyy", { locale: fr })}</p>
                                <p className="text-xs text-muted-foreground">{retrait.heure}</p>
                              </div>
                            </TableCell>
                            <TableCell>{retrait.eleve}</TableCell>
                            <TableCell>{retrait.retirePar}</TableCell>
                            <TableCell>{retrait.relation}</TableCell>
                            <TableCell>{retrait.validePar}</TableCell>
                            <TableCell>
                              <Badge variant="outline" className="gap-1">
                                {retrait.methode === "qr" ? <QrCode className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                                {retrait.methode === "qr" ? "QR Code" : "Visuel"}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>

        <Dialog open={showQRModal} onOpenChange={setShowQRModal}>
          <DialogContent className="max-w-sm">
            <DialogHeader>
              <DialogTitle>QR Code d'autorisation</DialogTitle>
            </DialogHeader>
            {selectedAutorisation && (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="p-4 bg-white rounded-lg">
                  <QRCodeSVG 
                    value={`ARGON-AUTH-${selectedAutorisation.id}-${selectedAutorisation.eleve}-${selectedAutorisation.personneAutorisee}`} 
                    size={200}
                  />
                </div>
                <div className="text-center">
                  <p className="font-semibold">{selectedAutorisation.personneAutorisee}</p>
                  <p className="text-sm text-muted-foreground">Autorisé(e) à récupérer</p>
                  <p className="font-medium text-primary">{selectedAutorisation.eleve}</p>
                </div>
                <Button className="w-full">Imprimer</Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </motion.div>
    </AdminLayout>
  );
}
