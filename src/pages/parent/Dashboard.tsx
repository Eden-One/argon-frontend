import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { StatsCard } from "@/components/ui/stats-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Users,
  ClipboardCheck,
  BookOpen,
  GraduationCap,
  Bell,
  Calendar,
  ChevronRight,
  Clock,
  MessageSquare,
} from "lucide-react";
import { eleves, devoirs, annonces, presences, notes, evenements } from "@/data/mockData";
import { Link } from "react-router-dom";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const presenceData = [
  { jour: "Lun", taux: 100 },
  { jour: "Mar", taux: 95 },
  { jour: "Mer", taux: 100 },
  { jour: "Jeu", taux: 90 },
  { jour: "Ven", taux: 100 },
];

const ParentDashboard = () => {
  // Mock: parent's child
  const enfant = eleves[0];
  const enfantNotes = notes.filter((n) => n.eleveId === "1");
  const moyenneGenerale = (enfantNotes.reduce((acc, n) => acc + n.note, 0) / enfantNotes.length).toFixed(1);
  const devoirsEnCours = devoirs.filter((d) => d.statut !== "complete").slice(0, 3);
  const prochainEvenement = evenements[0];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <DashboardLayout userRole="parent">
      <PageHeader
        title="Bienvenue, Mamadou 👋"
        description="Voici un aperçu de la scolarité d'Aminata"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        {/* Stats Grid */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Taux de présence"
            value="94%"
            description="Ce mois-ci"
            icon={<ClipboardCheck size={24} />}
            trend={{ value: 2, positive: true }}
            variant="primary"
          />
          <StatsCard
            title="Moyenne générale"
            value={`${moyenneGenerale}/20`}
            description="1er trimestre"
            icon={<GraduationCap size={24} />}
            trend={{ value: 5, positive: true }}
          />
          <StatsCard
            title="Devoirs en cours"
            value={devoirsEnCours.length}
            description="À rendre cette semaine"
            icon={<BookOpen size={24} />}
            variant="secondary"
          />
          <StatsCard
            title="Messages non lus"
            value="2"
            description="De vos enseignants"
            icon={<MessageSquare size={24} />}
          />
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
            {/* Child Card */}
            <Card variant="gradient">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle>Mon enfant</CardTitle>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/parent/enfants">
                      Voir plus <ChevronRight size={16} />
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <Avatar className="w-16 h-16 border-2 border-primary/20">
                    <AvatarImage src={enfant.photo} />
                    <AvatarFallback>{enfant.prenom[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-display text-lg font-semibold">
                      {enfant.prenom} {enfant.nom}
                    </h3>
                    <p className="text-muted-foreground">{enfant.classe}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="success">Présent aujourd'hui</Badge>
                      <Badge variant="outline">Moyenne: 15/20</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Presence Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Présence cette semaine</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={presenceData}>
                      <defs>
                        <linearGradient id="colorTaux" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="jour" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" domain={[0, 100]} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="taux"
                        stroke="hsl(var(--primary))"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorTaux)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Devoirs */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Devoirs à rendre</CardTitle>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/parent/devoirs">
                      Voir tous <ChevronRight size={16} />
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {devoirsEnCours.map((devoir, index) => (
                  <motion.div
                    key={devoir.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <BookOpen size={20} className="text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">{devoir.titre}</h4>
                        <p className="text-sm text-muted-foreground">{devoir.matiere}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge
                        variant={
                          devoir.statut === "nouveau"
                            ? "info"
                            : devoir.statut === "a_rendre"
                            ? "warning"
                            : "default"
                        }
                      >
                        {devoir.statut === "nouveau" ? "Nouveau" : "À rendre"}
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">
                        <Clock size={12} className="inline mr-1" />
                        {new Date(devoir.dateLimite).toLocaleDateString("fr-FR")}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Right Column */}
          <motion.div variants={itemVariants} className="space-y-6">
            {/* Next Event */}
            <Card variant="gradient" className="bg-gradient-secondary text-secondary-foreground">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Calendar size={24} />
                  <span className="font-medium">Prochain événement</span>
                </div>
                <h3 className="font-display text-xl font-bold mb-2">
                  {prochainEvenement.titre}
                </h3>
                <p className="text-secondary-foreground/80">
                  {new Date(prochainEvenement.date).toLocaleDateString("fr-FR", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                  })}
                </p>
                <Button variant="glass" size="sm" className="mt-4 text-secondary-foreground border-secondary-foreground/30" asChild>
                  <Link to="/parent/calendrier">Voir le calendrier</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Annonces */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Annonces</CardTitle>
                  <Bell size={20} className="text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {annonces.slice(0, 3).map((annonce, index) => (
                  <motion.div
                    key={annonce.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 rounded-xl bg-muted/50 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <Badge
                        variant={annonce.priorite === "important" ? "danger" : "outline"}
                      >
                        {annonce.priorite === "important" ? "Important" : "Info"}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {new Date(annonce.date).toLocaleDateString("fr-FR")}
                      </span>
                    </div>
                    <h4 className="font-medium">{annonce.titre}</h4>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {annonce.contenu}
                    </p>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Actions rapides</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="h-auto flex-col py-4" asChild>
                  <Link to="/parent/messages">
                    <MessageSquare size={24} className="mb-2" />
                    <span className="text-xs">Nouveau message</span>
                  </Link>
                </Button>
                <Button variant="outline" className="h-auto flex-col py-4" asChild>
                  <Link to="/parent/autorisations">
                    <Users size={24} className="mb-2" />
                    <span className="text-xs">Autorisations</span>
                  </Link>
                </Button>
                <Button variant="outline" className="h-auto flex-col py-4" asChild>
                  <Link to="/parent/notes">
                    <GraduationCap size={24} className="mb-2" />
                    <span className="text-xs">Voir les notes</span>
                  </Link>
                </Button>
                <Button variant="outline" className="h-auto flex-col py-4" asChild>
                  <Link to="/parent/galerie">
                    <Calendar size={24} className="mb-2" />
                    <span className="text-xs">Galerie photos</span>
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default ParentDashboard;
