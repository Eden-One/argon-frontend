import { useState } from "react";
import ParentLayout from "@/components/layout/ParentLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Image, Calendar, X, ChevronLeft, ChevronRight, Download } from "lucide-react";
import { enfants, galerieParent } from "@/data/parentMockData";

export default function ParentGalerie() {
  const [selectedEnfant, setSelectedEnfant] = useState(enfants[0]);
  const [selectedAlbum, setSelectedAlbum] = useState<typeof galerieParent[0] | null>(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [showPhotoViewer, setShowPhotoViewer] = useState(false);

  const childGalerie = galerieParent.filter((g) => g.classe === selectedEnfant.classe);

  const openPhotoViewer = (album: typeof galerieParent[0], index: number) => {
    setSelectedAlbum(album);
    setCurrentPhotoIndex(index);
    setShowPhotoViewer(true);
  };

  const nextPhoto = () => {
    if (selectedAlbum) {
      setCurrentPhotoIndex((prev) =>
        prev < selectedAlbum.photos.length - 1 ? prev + 1 : 0
      );
    }
  };

  const prevPhoto = () => {
    if (selectedAlbum) {
      setCurrentPhotoIndex((prev) =>
        prev > 0 ? prev - 1 : selectedAlbum.photos.length - 1
      );
    }
  };

  return (
    <ParentLayout>
      <div className="space-y-6 pb-20 lg:pb-0">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-bold mb-1">Galerie</h1>
            <p className="text-muted-foreground">
              Photos et activités de la classe
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

        {/* Albums */}
        {childGalerie.length > 0 ? (
          <div className="grid gap-6">
            {childGalerie.map((album) => (
              <Card key={album.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Image className="h-5 w-5 text-amber-600" />
                      {album.titre}
                    </CardTitle>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      {new Date(album.date).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "long",
                      })}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{album.description}</p>
                  <div className="flex gap-2">
                    <Badge variant="secondary">{album.classe}</Badge>
                    <Badge variant="outline">{album.enseignant}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {album.photos.map((photo, index) => (
                      <div
                        key={index}
                        className="aspect-square rounded-xl overflow-hidden cursor-pointer group relative"
                        onClick={() => openPhotoViewer(album, index)}
                      >
                        <img
                          src={photo}
                          alt={`${album.titre} - Photo ${index + 1}`}
                          className="w-full h-full object-cover transition-transform group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="p-2 rounded-full bg-white/90">
                              <Image className="h-5 w-5 text-amber-600" />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-8 text-center">
              <Image className="h-12 w-12 mx-auto mb-3 text-muted-foreground/50" />
              <p className="text-muted-foreground">Aucune photo disponible</p>
              <p className="text-sm text-muted-foreground">
                Les photos seront partagées par les enseignants
              </p>
            </CardContent>
          </Card>
        )}

        {/* Photo Viewer Modal */}
        <Dialog open={showPhotoViewer} onOpenChange={setShowPhotoViewer}>
          <DialogContent className="max-w-4xl p-0 overflow-hidden bg-black">
            <DialogHeader className="absolute top-0 left-0 right-0 z-10 p-4 bg-gradient-to-b from-black/50 to-transparent">
              <div className="flex items-center justify-between text-white">
                <DialogTitle>{selectedAlbum?.titre}</DialogTitle>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/20"
                  >
                    <Download className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/20"
                    onClick={() => setShowPhotoViewer(false)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </DialogHeader>
            <div className="relative flex items-center justify-center min-h-[60vh]">
              {selectedAlbum && (
                <>
                  <img
                    src={selectedAlbum.photos[currentPhotoIndex]}
                    alt={`Photo ${currentPhotoIndex + 1}`}
                    className="max-w-full max-h-[70vh] object-contain"
                  />
                  {selectedAlbum.photos.length > 1 && (
                    <>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute left-4 text-white hover:bg-white/20"
                        onClick={prevPhoto}
                      >
                        <ChevronLeft className="h-8 w-8" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-4 text-white hover:bg-white/20"
                        onClick={nextPhoto}
                      >
                        <ChevronRight className="h-8 w-8" />
                      </Button>
                    </>
                  )}
                </>
              )}
            </div>
            {selectedAlbum && selectedAlbum.photos.length > 1 && (
              <div className="p-4 bg-black/50">
                <div className="flex justify-center gap-2">
                  {selectedAlbum.photos.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPhotoIndex(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        currentPhotoIndex === index
                          ? "bg-amber-500"
                          : "bg-white/50 hover:bg-white/80"
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </ParentLayout>
  );
}
