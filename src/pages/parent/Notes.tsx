import { useState } from "react";
import ParentLayout from "@/components/layout/ParentLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  GraduationCap,
  TrendingUp,
  Download,
  FileText,
  Award,
  BookOpen,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { enfants, notesParent, bulletins, progressionNotes } from "@/data/parentMockData";

export default function ParentNotes() {
  const [selectedEnfant, setSelectedEnfant] = useState(enfants[0]);

  const childNotes = notesParent.filter((n) => n.enfantId === selectedEnfant.id);
  const childBulletins = bulletins.filter((b) => b.enfantId === selectedEnfant.id);

  // Calculate average
  const moyenneGenerale =
    childNotes.reduce((acc, n) => acc + n.note * n.coefficient, 0) /
    childNotes.reduce((acc, n) => acc + n.coefficient, 0);

  // Group notes by subject
  const notesByMatiere = childNotes.reduce((acc, note) => {
    if (!acc[note.matiere]) {
      acc[note.matiere] = [];
    }
    acc[note.matiere].push(note);
    return acc;
  }, {} as Record<string, typeof childNotes>);

  const getNoteColor = (note: number) => {
    if (note >= 16) return "text-green-600 bg-green-100";
    if (note >= 14) return "text-blue-600 bg-blue-100";
    if (note >= 12) return "text-amber-600 bg-amber-100";
    if (note >= 10) return "text-orange-600 bg-orange-100";
    return "text-red-600 bg-red-100";
  };

  return (
    <ParentLayout>
      <div className="space-y-6 pb-20 lg:pb-0">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-bold mb-1">Notes & Bulletins</h1>
            <p className="text-muted-foreground">
              Résultats scolaires de votre enfant
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

        {/* Stats Overview */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
            <CardContent className="p-6 text-center">
              <Award className="h-8 w-8 mx-auto mb-2 text-amber-600" />
              <p className="text-3xl font-bold text-amber-600">
                {moyenneGenerale.toFixed(1)}/20
              </p>
              <p className="text-sm text-amber-700">Moyenne générale</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
            <CardContent className="p-6 text-center">
              <BookOpen className="h-8 w-8 mx-auto mb-2 text-blue-600" />
              <p className="text-3xl font-bold text-blue-600">{childNotes.length}</p>
              <p className="text-sm text-blue-700">Évaluations</p>
            </CardContent>
          </Card>
        </div>

        {/* Progression Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-amber-600" />
              Progression des notes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={progressionNotes}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mois" tick={{ fontSize: 12 }} />
                  <YAxis domain={[8, 20]} tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="enfant1"
                    stroke="#f59e0b"
                    strokeWidth={2}
                    dot={{ fill: "#f59e0b" }}
                    name={enfants[0].prenom}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="notes">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="notes">Notes récentes</TabsTrigger>
            <TabsTrigger value="bulletins">Bulletins</TabsTrigger>
          </TabsList>

          <TabsContent value="notes" className="mt-4 space-y-4">
            {/* Notes by Subject */}
            {Object.entries(notesByMatiere).map(([matiere, notes]) => (
              <Card key={matiere}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base flex items-center gap-2">
                      <GraduationCap className="h-4 w-4 text-amber-600" />
                      {matiere}
                    </CardTitle>
                    <Badge variant="secondary">
                      Moy:{" "}
                      {(notes.reduce((a, n) => a + n.note, 0) / notes.length).toFixed(1)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  {notes.map((note) => (
                    <div
                      key={note.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                    >
                      <div className="flex-1">
                        <p className="font-medium text-sm">{note.type}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(note.date).toLocaleDateString("fr-FR")} •
                          Coef. {note.coefficient}
                        </p>
                        {note.commentaire && (
                          <p className="text-xs text-muted-foreground mt-1 italic">
                            "{note.commentaire}"
                          </p>
                        )}
                      </div>
                      <Badge className={`text-lg font-bold ${getNoteColor(note.note)}`}>
                        {note.note}/{note.sur}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="bulletins" className="mt-4 space-y-4">
            {childBulletins.length > 0 ? (
              childBulletins.map((bulletin) => (
                <Card key={bulletin.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-amber-100 to-orange-100">
                        <FileText className="h-8 w-8 text-amber-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">
                          Bulletin - Trimestre {bulletin.trimestre}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Année {bulletin.annee}
                        </p>
                        <div className="flex gap-2 mt-2">
                          <Badge className="bg-amber-100 text-amber-700">
                            Moyenne: {bulletin.moyenne}/20
                          </Badge>
                          <Badge variant="secondary">
                            Rang: {bulletin.rang}/{bulletin.effectif}
                          </Badge>
                        </div>
                      </div>
                      <Button className="bg-amber-500 hover:bg-amber-600">
                        <Download className="h-4 w-4 mr-2" />
                        PDF
                      </Button>
                    </div>
                    {bulletin.appreciation && (
                      <div className="mt-4 p-3 rounded-lg bg-muted/50">
                        <p className="text-sm font-medium mb-1">Appréciation générale</p>
                        <p className="text-sm text-muted-foreground italic">
                          "{bulletin.appreciation}"
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <FileText className="h-12 w-12 mx-auto mb-3 text-muted-foreground/50" />
                  <p className="text-muted-foreground">Aucun bulletin disponible</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </ParentLayout>
  );
}
