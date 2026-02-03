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
  CalendarDays,
  GraduationCap,
  Users,
  MapPin,
  PartyPopper,
  Sun,
  Clock,
} from "lucide-react";
import { enfants, calendrierParent } from "@/data/parentMockData";
import { fr } from "date-fns/locale";

export default function ParentCalendrier() {
  const [selectedEnfant, setSelectedEnfant] = useState(enfants[0]);
  const [date, setDate] = useState<Date | undefined>(new Date());

  // Filter events for selected child or all children
  const childEvents = calendrierParent.filter(
    (e) => e.enfantId === selectedEnfant.id || e.enfantId === null
  );

  // Get events for selected date
  const selectedDateStr = date?.toISOString().split("T")[0];
  const selectedEvents = childEvents.filter((e) => e.date === selectedDateStr);

  // Get upcoming events
  const today = new Date().toISOString().split("T")[0];
  const upcomingEvents = childEvents
    .filter((e) => e.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 5);

  const getEventIcon = (type: string) => {
    switch (type) {
      case "examen":
        return <GraduationCap className="h-4 w-4" />;
      case "reunion":
        return <Users className="h-4 w-4" />;
      case "sortie":
        return <MapPin className="h-4 w-4" />;
      case "evenement":
        return <PartyPopper className="h-4 w-4" />;
      case "vacances":
        return <Sun className="h-4 w-4" />;
      default:
        return <CalendarDays className="h-4 w-4" />;
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case "examen":
        return "bg-red-100 text-red-700 border-red-200";
      case "reunion":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "sortie":
        return "bg-green-100 text-green-700 border-green-200";
      case "evenement":
        return "bg-purple-100 text-purple-700 border-purple-200";
      case "vacances":
        return "bg-amber-100 text-amber-700 border-amber-200";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getEventLabel = (type: string) => {
    switch (type) {
      case "examen":
        return "Examen";
      case "reunion":
        return "Réunion";
      case "sortie":
        return "Sortie";
      case "evenement":
        return "Événement";
      case "vacances":
        return "Vacances";
      default:
        return type;
    }
  };

  // Prepare calendar modifiers
  const eventDates = childEvents.reduce((acc, event) => {
    const type = event.type;
    if (!acc[type]) acc[type] = [];
    acc[type].push(new Date(event.date));
    return acc;
  }, {} as Record<string, Date[]>);

  return (
    <ParentLayout>
      <div className="space-y-6 pb-20 lg:pb-0">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-bold mb-1">Calendrier</h1>
            <p className="text-muted-foreground">
              Événements et dates importantes
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

        {/* Calendar and Events */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Calendar */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <CalendarDays className="h-5 w-5 text-amber-600" />
                Calendrier
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
                  examen: eventDates.examen || [],
                  reunion: eventDates.reunion || [],
                  sortie: eventDates.sortie || [],
                  evenement: eventDates.evenement || [],
                  vacances: eventDates.vacances || [],
                }}
                modifiersStyles={{
                  examen: { backgroundColor: "#fee2e2", color: "#991b1b" },
                  reunion: { backgroundColor: "#dbeafe", color: "#1e40af" },
                  sortie: { backgroundColor: "#dcfce7", color: "#166534" },
                  evenement: { backgroundColor: "#f3e8ff", color: "#6b21a8" },
                  vacances: { backgroundColor: "#fef3c7", color: "#92400e" },
                }}
              />
            </CardContent>
          </Card>

          {/* Selected Day Events */}
          <div className="space-y-6">
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
                {selectedEvents.length > 0 ? (
                  <div className="space-y-3">
                    {selectedEvents.map((event) => (
                      <div
                        key={event.id}
                        className={`p-4 rounded-xl border ${getEventColor(event.type)}`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-white/50">
                            {getEventIcon(event.type)}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">{event.titre}</h4>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="secondary" className="text-xs">
                                {getEventLabel(event.type)}
                              </Badge>
                              {event.classe !== "tous" && (
                                <span className="text-xs">{event.classe}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 text-muted-foreground">
                    <CalendarDays className="h-10 w-10 mx-auto mb-2 text-muted-foreground/50" />
                    <p>Aucun événement ce jour</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Clock className="h-5 w-5 text-amber-600" />
                  Prochains événements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {upcomingEvents.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-center gap-3 p-3 rounded-lg bg-muted/50"
                  >
                    <div className={`p-2 rounded-lg ${getEventColor(event.type)}`}>
                      {getEventIcon(event.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{event.titre}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(event.date).toLocaleDateString("fr-FR", {
                          weekday: "short",
                          day: "numeric",
                          month: "short",
                        })}
                      </p>
                    </div>
                    <Badge variant="outline" className={getEventColor(event.type)}>
                      {getEventLabel(event.type)}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Legend */}
        <Card>
          <CardContent className="p-4">
            <p className="text-sm font-medium mb-3">Légende</p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-red-200" />
                <span className="text-sm">Examen</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-blue-200" />
                <span className="text-sm">Réunion</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-green-200" />
                <span className="text-sm">Sortie</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-purple-200" />
                <span className="text-sm">Événement</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-amber-200" />
                <span className="text-sm">Vacances</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ParentLayout>
  );
}
