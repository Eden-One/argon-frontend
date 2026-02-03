import { useState } from "react";
import ParentLayout from "@/components/layout/ParentLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  QrCode,
  Plus,
  Phone,
  Calendar,
  Edit,
  Trash2,
  CheckCircle2,
  Clock,
  Users,
  Shield,
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { enfants, personnesAutoriseesParent } from "@/data/parentMockData";

export default function ParentAutorisations() {
  const [selectedEnfant, setSelectedEnfant] = useState(enfants[0]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<typeof personnesAutoriseesParent[0] | null>(null);

  const childAuths = personnesAutoriseesParent.filter(
    (p) => p.enfantId === selectedEnfant.id
  );
  const activeAuths = childAuths.filter((p) => p.actif);
  const permanentAuths = childAuths.filter((p) => p.permanent);

  const openQRCode = (person: typeof personnesAutoriseesParent[0]) => {
    setSelectedPerson(person);
    setShowQRModal(true);
  };

  return (
    <ParentLayout>
      <div className="space-y-6 pb-20 lg:pb-0">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-bold mb-1">
              Autorisations de retrait
            </h1>
            <p className="text-muted-foreground">
              Gérez les personnes autorisées à récupérer votre enfant
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
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
            <CardContent className="p-4 text-center">
              <Users className="h-8 w-8 mx-auto mb-2 text-amber-600" />
              <p className="text-2xl font-bold text-amber-600">{activeAuths.length}</p>
              <p className="text-sm text-amber-700">Personnes autorisées</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <CardContent className="p-4 text-center">
              <Shield className="h-8 w-8 mx-auto mb-2 text-green-600" />
              <p className="text-2xl font-bold text-green-600">{permanentAuths.length}</p>
              <p className="text-sm text-green-700">Autorisations permanentes</p>
            </CardContent>
          </Card>
        </div>

        {/* Add Person Button */}
        <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
          <DialogTrigger asChild>
            <Button className="w-full bg-amber-500 hover:bg-amber-600 gap-2">
              <Plus className="h-5 w-5" />
              Ajouter une personne autorisée
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Ajouter une personne autorisée</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Nom</Label>
                  <Input placeholder="Nom de famille" />
                </div>
                <div>
                  <Label>Prénom</Label>
                  <Input placeholder="Prénom" />
                </div>
              </div>
              <div>
                <Label>Lien avec l'enfant</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="grand-parent">Grand-parent</SelectItem>
                    <SelectItem value="oncle-tante">Oncle/Tante</SelectItem>
                    <SelectItem value="frere-soeur">Frère/Sœur</SelectItem>
                    <SelectItem value="nounou">Nounou</SelectItem>
                    <SelectItem value="autre">Autre</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Téléphone</Label>
                <Input placeholder="+221 XX XXX XX XX" />
              </div>
              <div>
                <Label>Photo (optionnel)</Label>
                <Input type="file" accept="image/*" />
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
                <div>
                  <Label>Autorisation permanente</Label>
                  <p className="text-xs text-muted-foreground">
                    Sinon, définir des dates de validité
                  </p>
                </div>
                <Switch />
              </div>
              <div className="flex gap-2 pt-4">
                <Button variant="outline" className="flex-1" onClick={() => setShowAddModal(false)}>
                  Annuler
                </Button>
                <Button className="flex-1 bg-amber-500 hover:bg-amber-600">
                  Ajouter
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Authorized Persons List */}
        <div className="space-y-4">
          {childAuths.map((person) => (
            <Card key={person.id} className={!person.actif ? "opacity-60" : ""}>
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16 border-4 border-white shadow-lg">
                    <AvatarImage src={person.photo} />
                    <AvatarFallback className="bg-amber-100 text-amber-700 text-lg">
                      {person.prenom[0]}{person.nom[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">
                        {person.prenom} {person.nom}
                      </h3>
                      {person.actif ? (
                        <Badge className="bg-green-100 text-green-700">
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          Actif
                        </Badge>
                      ) : (
                        <Badge variant="secondary">Inactif</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{person.lien}</p>
                    <div className="flex flex-wrap gap-2 text-sm">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Phone className="h-3 w-3" />
                        {person.telephone}
                      </div>
                      {person.permanent ? (
                        <Badge variant="outline" className="text-green-600 border-green-200">
                          Permanent
                        </Badge>
                      ) : (
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {new Date(person.dateDebut!).toLocaleDateString("fr-FR")} -{" "}
                          {new Date(person.dateFin!).toLocaleDateString("fr-FR")}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 mt-4 pt-4 border-t">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => openQRCode(person)}
                  >
                    <QrCode className="h-4 w-4 mr-2" />
                    Voir QR Code
                  </Button>
                  <Button variant="outline" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="text-destructive hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          {childAuths.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <Users className="h-12 w-12 mx-auto mb-3 text-muted-foreground/50" />
                <p className="text-muted-foreground">
                  Aucune personne autorisée pour le moment
                </p>
                <p className="text-sm text-muted-foreground">
                  Ajoutez des personnes qui peuvent récupérer {selectedEnfant.prenom}
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* QR Code Modal */}
        <Dialog open={showQRModal} onOpenChange={setShowQRModal}>
          <DialogContent className="max-w-sm">
            <DialogHeader>
              <DialogTitle className="text-center">QR Code d'autorisation</DialogTitle>
            </DialogHeader>
            {selectedPerson && (
              <div className="text-center space-y-4">
                <div className="flex justify-center">
                  <Avatar className="h-20 w-20 border-4 border-amber-200">
                    <AvatarImage src={selectedPerson.photo} />
                    <AvatarFallback className="bg-amber-100 text-amber-700 text-xl">
                      {selectedPerson.prenom[0]}{selectedPerson.nom[0]}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">
                    {selectedPerson.prenom} {selectedPerson.nom}
                  </h3>
                  <p className="text-muted-foreground">{selectedPerson.lien}</p>
                </div>
                <div className="p-6 bg-white rounded-2xl border shadow-sm inline-block">
                  <QRCodeSVG
                    value={`ARGON-AUTH:${selectedPerson.id}:${selectedEnfant.id}:${Date.now()}`}
                    size={200}
                    level="H"
                    includeMargin
                  />
                </div>
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
                  <p className="text-sm text-amber-800">
                    <strong>Pour {selectedEnfant.prenom} {selectedEnfant.nom}</strong>
                    <br />
                    {selectedEnfant.classe}
                  </p>
                  {!selectedPerson.permanent && (
                    <p className="text-xs text-amber-600 mt-2">
                      Valide du {new Date(selectedPerson.dateDebut!).toLocaleDateString("fr-FR")} au{" "}
                      {new Date(selectedPerson.dateFin!).toLocaleDateString("fr-FR")}
                    </p>
                  )}
                </div>
                <Button className="w-full bg-amber-500 hover:bg-amber-600">
                  Partager le QR Code
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </ParentLayout>
  );
}
