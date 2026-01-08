import { motion } from "framer-motion";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Calendar, Plus, GraduationCap, PartyPopper, Palmtree, Clock, ChevronLeft, ChevronRight, Bell } from "lucide-react";
import { calendrierData, classesData } from "@/data/adminMockData";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from "date-fns";
import { fr } from "date-fns/locale";
import { useState } from "react";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

const getTypeIcon = (type: string) => {
  switch (type) {
    case "examen": return <GraduationCap className="h-4 w-4" />;
    case "evenement": return <PartyPopper className="h-4 w-4" />;
    case "vacances": return <Palmtree className="h-4 w-4" />;
    default: return <Calendar className="h-4 w-4" />;
  }
};

const getTypeBadge = (type: string) => {
  switch (type) {
    case "examen": return <Badge className="bg-destructive/20 text-destructive">Examen</Badge>;
    case "evenement": return <Badge className="bg-primary/20 text-primary">Événement</Badge>;
    case "vacances": return <Badge className="bg-success/20 text-success">Vacances</Badge>;
    default: return <Badge variant="outline">{type}</Badge>;
  }
};

export default function Calendrier() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const startDayOfWeek = monthStart.getDay();
  const paddingDays = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1;

  const getEventsForDate = (date: Date) => {
    return calendrierData.filter(event => {
      const eventStart = new Date(event.dateDebut);
      const eventEnd = new Date(event.dateFin);
      return date >= eventStart && date <= eventEnd;
    });
  };

  const examens = calendrierData.filter(e => e.type === "examen").length;
  const evenements = calendrierData.filter(e => e.type === "evenement").length;
  const vacances = calendrierData.filter(e => e.type === "vacances").length;

  const upcomingEvents = calendrierData
    .filter(e => new Date(e.dateDebut) >= new Date())
    .sort((a, b) => new Date(a.dateDebut).getTime() - new Date(b.dateDebut).getTime())
    .slice(0, 5);

  return (
    <AdminLayout>
      <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
        <motion.div variants={item} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">Calendrier scolaire</h1>
            <p className="text-muted-foreground mt-1">Gérer les événements et le calendrier</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Nouvel événement
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Créer un événement</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label>Titre</Label>
                  <Input placeholder="Ex: Conseil de classe" />
                </div>
                <div className="grid gap-2">
                  <Label>Type</Label>
                  <Select>
                    <SelectTrigger><SelectValue placeholder="Sélectionner" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="examen">Examen</SelectItem>
                      <SelectItem value="evenement">Événement</SelectItem>
                      <SelectItem value="vacances">Vacances</SelectItem>
                    </SelectContent>
                  </Select>
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
                  <Label>Classes concernées</Label>
                  <Select>
                    <SelectTrigger><SelectValue placeholder="Sélectionner" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toutes les classes</SelectItem>
                      {classesData.map(c => (
                        <SelectItem key={c.id} value={c.nom}>{c.nom}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Description (optionnel)</Label>
                  <Textarea placeholder="Détails de l'événement..." rows={2} />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Envoyer une notification</Label>
                  <Switch defaultChecked />
                </div>
                <Button className="w-full mt-2">Créer l'événement</Button>
              </div>
            </DialogContent>
          </Dialog>
        </motion.div>

        <motion.div variants={item} className="grid sm:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6 flex items-center gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{calendrierData.length}</p>
                <p className="text-sm text-muted-foreground">Événements</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 flex items-center gap-4">
              <div className="p-3 rounded-lg bg-destructive/10">
                <GraduationCap className="h-6 w-6 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold">{examens}</p>
                <p className="text-sm text-muted-foreground">Examens</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 flex items-center gap-4">
              <div className="p-3 rounded-lg bg-accent/10">
                <PartyPopper className="h-6 w-6 text-accent-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold">{evenements}</p>
                <p className="text-sm text-muted-foreground">Événements</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 flex items-center gap-4">
              <div className="p-3 rounded-lg bg-success/10">
                <Palmtree className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">{vacances}</p>
                <p className="text-sm text-muted-foreground">Vacances</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          <motion.div variants={item} className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-lg">
                  {format(currentDate, "MMMM yyyy", { locale: fr })}
                </CardTitle>
                <div className="flex gap-1">
                  <Button variant="outline" size="icon" onClick={() => setCurrentDate(subMonths(currentDate, 1))}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => setCurrentDate(addMonths(currentDate, 1))}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map(day => (
                    <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
                      {day}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {Array.from({ length: paddingDays }).map((_, i) => (
                    <div key={`padding-${i}`} className="aspect-square" />
                  ))}
                  {daysInMonth.map(day => {
                    const events = getEventsForDate(day);
                    const isToday = isSameDay(day, new Date());
                    const isSelected = selectedDate && isSameDay(day, selectedDate);
                    
                    return (
                      <button
                        key={day.toISOString()}
                        onClick={() => setSelectedDate(day)}
                        className={`
                          aspect-square p-1 rounded-lg text-sm relative transition-colors
                          ${isToday ? "bg-primary text-primary-foreground font-bold" : ""}
                          ${isSelected && !isToday ? "bg-primary/20 ring-2 ring-primary" : ""}
                          ${!isToday && !isSelected ? "hover:bg-muted" : ""}
                        `}
                      >
                        <span>{format(day, "d")}</span>
                        {events.length > 0 && (
                          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-0.5">
                            {events.slice(0, 3).map((event, i) => (
                              <div 
                                key={i}
                                className={`w-1.5 h-1.5 rounded-full ${
                                  event.type === "examen" ? "bg-destructive" :
                                  event.type === "vacances" ? "bg-success" : "bg-primary"
                                }`}
                              />
                            ))}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>

                {selectedDate && (
                  <div className="mt-4 pt-4 border-t">
                    <h4 className="font-medium mb-2">
                      {format(selectedDate, "EEEE d MMMM", { locale: fr })}
                    </h4>
                    {getEventsForDate(selectedDate).length > 0 ? (
                      <div className="space-y-2">
                        {getEventsForDate(selectedDate).map(event => (
                          <div key={event.id} className="flex items-center gap-3 p-2 rounded-lg bg-muted/50">
                            {getTypeIcon(event.type)}
                            <div className="flex-1">
                              <p className="font-medium text-sm">{event.titre}</p>
                              <p className="text-xs text-muted-foreground">{event.classe}</p>
                            </div>
                            {getTypeBadge(event.type)}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">Aucun événement ce jour</p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Prochains événements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingEvents.map(event => (
                  <div key={event.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                    <div className={`p-2 rounded-lg ${
                      event.type === "examen" ? "bg-destructive/10" :
                      event.type === "vacances" ? "bg-success/10" : "bg-primary/10"
                    }`}>
                      {getTypeIcon(event.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{event.titre}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {format(new Date(event.dateDebut), "dd MMM", { locale: fr })}
                        {event.dateDebut !== event.dateFin && (
                          <> - {format(new Date(event.dateFin), "dd MMM", { locale: fr })}</>
                        )}
                      </p>
                      <Badge variant="outline" className="mt-1 text-xs">{event.classe}</Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="mt-4">
              <CardHeader>
                <CardTitle className="text-lg">Légende</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-destructive" />
                  <span className="text-sm">Examens</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                  <span className="text-sm">Événements</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-success" />
                  <span className="text-sm">Vacances</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </AdminLayout>
  );
}
