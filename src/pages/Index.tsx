import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  GraduationCap, Users, ClipboardCheck, MessageSquare, 
  Calendar, Shield, BookOpen, Bell, ArrowRight, Check, Star
} from "lucide-react";

const features = [
  { icon: ClipboardCheck, title: "Suivi de présence", description: "Pointage en temps réel et notifications d'absence" },
  { icon: GraduationCap, title: "Notes & Bulletins", description: "Accès aux notes et bulletins en ligne" },
  { icon: BookOpen, title: "Devoirs", description: "Gestion et suivi des devoirs assignés" },
  { icon: MessageSquare, title: "Messagerie", description: "Communication directe parent-enseignant" },
  { icon: Calendar, title: "Calendrier", description: "Événements et dates importantes" },
  { icon: Shield, title: "Autorisations", description: "Gestion sécurisée des retraits d'enfants" },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
              <span className="text-primary-foreground font-display font-bold text-xl">A</span>
            </div>
            <span className="font-display text-2xl font-bold">ARGON</span>
          </Link>
          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild><Link to="/connexion">Connexion</Link></Button>
            <Button variant="gradient" asChild><Link to="/inscription">S'inscrire</Link></Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-5" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Badge variant="gradient" className="mb-6 px-4 py-2">
              <Star size={14} className="mr-2" /> Plateforme de gestion scolaire n°1 en Afrique
            </Badge>
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Connectez <span className="text-gradient">l'école</span> aux <span className="text-gradient-secondary">familles</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              ARGON modernise la communication scolaire. Suivez en temps réel les présences, 
              notes, devoirs et communiquez facilement avec les enseignants.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="gradient" size="xl" asChild>
                <Link to="/inscription">Commencer gratuitement <ArrowRight size={20} /></Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/connexion">Se connecter</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Tout-en-un pour l'éducation</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Une plateforme complète pour les établissements, enseignants et parents
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card variant="interactive" className="h-full">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-display text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-hero text-primary-foreground overflow-hidden">
            <CardContent className="p-12 text-center">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                Prêt à moderniser votre établissement ?
              </h2>
              <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
                Rejoignez les milliers d'établissements qui font confiance à ARGON
              </p>
              <Button variant="glass" size="xl" className="border-primary-foreground/30" asChild>
                <Link to="/inscription">Démarrer maintenant <ArrowRight size={20} /></Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2024 ARGON. Plateforme de gestion scolaire.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
