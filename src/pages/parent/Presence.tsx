import { useState } from "react";
import ParentLayout from "@/components/layout/ParentLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Calendar as CalendarIcon,
  CheckCircle2,
  XCircle,
  Clock,
  AlertCircle,
  TrendingUp,
} from "lucide-react";
import { enfants, presenceData } from "@/data/parentMockData";
import { fr } from "date-fns/locale";

export default function ParentPresence() {
  const [selectedEnfant, setSelectedEnfant] = useState(enfants[0]);
  const [date, setDate] = useState<Date | undefined>(new Date());

  const childPresence = presenceData.filter((p) => p.enfantId === selectedEnfant.id);

  // Calculate stats
  const totalDays = childPresence.length;
  const presentDays = childPresence.filter(
    (p) => p.matin === "present" && p.apresmidi === "present"
  ).length;
  const absentDays = childPresence.filter(
    (p) => p.matin === "absent" || p.apresmidi === "absent"
  ).length;
  const lateDays = childPresence.filter(
    (p) => p.matin === "retard" || p.apresmidi === "retard"
  ).length;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "present":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case "absent":
        return <XCircle className="h-4 w-4 text-red-500" />;
      case "retard":
        return <Clock className="h-4 w-4 text-amber-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "present":
        return "Présent(e)";
      case "absent":
        return "Absent(e)";
      case "retard":
        return "En retard";
      default:
        return "Non renseigné";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "present":
        return "bg-green-100 text-green-700";
      case "absent":
        return "bg-red-100 text-red-700";
      case "retard":
        return "bg-amber-100 text-amber-700";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  // Get presence for selected date
  const selectedDateStr = date?.toISOString().split("T")[0];
  const selectedPresence = childPresence.find((p) => p.date === selectedDateStr);

  return (
    <ParentLayout>
      <div className="space-y-6 pb-20 lg:pb-0">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-bold mb-1">Présence</h1>
            <p className="text-muted-foreground">
              Suivi des présences de votre enfant
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
          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <CardContent className="p-4 text-center">
              <div className="p-2 rounded-full bg-green-100 w-fit mx-auto mb-2">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-green-600">{presentDays}</p>
              <p className="text-xs text-green-700">Jours présent</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-red-50 to-rose-50 border-red-200">
            <CardContent className="p-4 text-center">
              <div className="p-2 rounded-full bg-red-100 w-fit mx-auto mb-2">
                <XCircle className="h-5 w-5 text-red-600" />
              </div>
              <p className="text-2xl font-bold text-red-600">{absentDays}</p>
              <p className="text-xs text-red-700">Absences</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
            <CardContent className="p-4 text-center">
              <div className="p-2 rounded-full bg-amber-100 w-fit mx-auto mb-2">
                <Clock className="h-5 w-5 text-amber-600" />
              </div>
              <p className="text-2xl font-bold text-amber-600">{lateDays}</p>
              <p className="text-xs text-amber-700">Retards</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
            <CardContent className="p-4 text-center">
              <div className="p-2 rounded-full bg-blue-100 w-fit mx-auto mb-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-blue-600">
                {selectedEnfant.tauxPresence}%
              </p>
              <p className="text-xs text-blue-700">Taux présence</p>
            </CardContent>
          </Card>
        </div>

        {/* Calendar and Details */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Calendar */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <CalendarIcon className="h-5 w-5 text-amber-600" />
                Calendrier des présences
              </CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                locale={fr}
                className="rounded-md border"
                modifiers={{
                  present: childPresence
                    .filter((p) => p.matin === "present" && p.apresmidi === "present")
                    .map((p) => new Date(p.date)),
                  absent: childPresence
                    .filter((p) => p.matin === "absent" || p.apresmidi === "absent")
                    .map((p) => new Date(p.date)),
                  late: childPresence
                    .filter((p) => p.matin === "retard" || p.apresmidi === "retard")
                    .map((p) => new Date(p.date)),
                }}
                modifiersStyles={{
                  present: { backgroundColor: "#dcfce7", color: "#166534" },
                  absent: { backgroundColor: "#fee2e2", color: "#991b1b" },
                  late: { backgroundColor: "#fef3c7", color: "#92400e" },
                }}
              />
            </CardContent>
          </Card>

          {/* Selected Day Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                {date
                  ? date.toLocaleDateString("fr-FR", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                    })
                  : "Sélectionnez une date"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedPresence ? (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-muted/50">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium">Matin</span>
                      <Badge className={getStatusColor(selectedPresence.matin)}>
                        {getStatusIcon(selectedPresence.matin)}
                        <span className="ml-1">{getStatusLabel(selectedPresence.matin)}</span>
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Après-midi</span>
                      <Badge className={getStatusColor(selectedPresence.apresmidi)}>
                        {getStatusIcon(selectedPresence.apresmidi)}
                        <span className="ml-1">
                          {getStatusLabel(selectedPresence.apresmidi)}
                        </span>
                      </Badge>
                    </div>
                  </div>
                  {selectedPresence.justification && (
                    <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
                      <p className="text-sm font-medium text-amber-800 mb-1">
                        Justification
                      </p>
                      <p className="text-sm text-amber-700">
                        {selectedPresence.justification}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <CalendarIcon className="h-12 w-12 mx-auto mb-3 text-muted-foreground/50" />
                  <p>Aucune donnée pour cette date</p>
                  <p className="text-sm">
                    Sélectionnez un jour pour voir les détails
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Legend */}
        <Card>
          <CardContent className="p-4">
            <p className="text-sm font-medium mb-3">Légende</p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-green-200" />
                <span className="text-sm">Présent(e)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-red-200" />
                <span className="text-sm">Absent(e)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-amber-200" />
                <span className="text-sm">En retard</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent History */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Historique récent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {childPresence.slice(0, 5).map((presence, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                >
                  <div>
                    <p className="font-medium">
                      {new Date(presence.date).toLocaleDateString("fr-FR", {
                        weekday: "long",
                        day: "numeric",
                        month: "short",
                      })}
                    </p>
                    {presence.justification && (
                      <p className="text-xs text-muted-foreground">
                        {presence.justification}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Badge className={getStatusColor(presence.matin)} variant="secondary">
                      AM: {getStatusLabel(presence.matin).substring(0, 3)}
                    </Badge>
                    <Badge className={getStatusColor(presence.apresmidi)} variant="secondary">
                      PM: {getStatusLabel(presence.apresmidi).substring(0, 3)}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </ParentLayout>
  );
}
