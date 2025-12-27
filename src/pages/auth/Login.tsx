import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, Mail, Lock, ArrowRight, GraduationCap, Users, School } from "lucide-react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState<"parent" | "enseignant" | "admin">("parent");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login - redirect based on user type
    navigate(`/${userType}/dashboard`);
  };

  const userTypes = [
    { id: "parent", label: "Parent", icon: Users, description: "Suivez la scolarité de vos enfants" },
    { id: "enseignant", label: "Enseignant", icon: GraduationCap, description: "Gérez vos classes et élèves" },
    { id: "admin", label: "Admin", icon: School, description: "Administrez l'établissement" },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\");" }} />
        
        <div className="relative z-10 flex flex-col justify-center p-12 text-primary-foreground">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-14 h-14 rounded-2xl bg-primary-foreground/20 backdrop-blur flex items-center justify-center">
                <span className="text-primary-foreground font-display font-bold text-3xl">A</span>
              </div>
              <span className="font-display text-4xl font-bold">ARGON</span>
            </div>

            <h1 className="font-display text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              La plateforme qui<br />
              <span className="text-secondary-light">connecte l'école</span><br />
              aux familles
            </h1>

            <p className="text-lg text-primary-foreground/80 max-w-md mb-8">
              Suivez en temps réel la vie scolaire de vos enfants. Notes, présences, 
              devoirs et communication avec les enseignants, tout en un seul endroit.
            </p>

            <div className="flex items-center gap-6">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-primary-foreground/20 border-2 border-primary-foreground/30 flex items-center justify-center"
                  >
                    <span className="text-xs font-medium">{i}</span>
                  </div>
                ))}
              </div>
              <div>
                <p className="font-semibold">+10,000 familles</p>
                <p className="text-sm text-primary-foreground/70">nous font confiance</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
        <div className="absolute top-20 right-20 w-64 h-64 bg-primary-foreground/10 rounded-full blur-2xl" />
      </div>

      {/* Right side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center">
              <span className="text-primary-foreground font-display font-bold text-2xl">A</span>
            </div>
            <span className="font-display text-3xl font-bold text-foreground">ARGON</span>
          </div>

          <Card variant="flat" className="border-0 shadow-none">
            <CardHeader className="space-y-1 px-0">
              <CardTitle className="font-display text-2xl">Connexion</CardTitle>
              <CardDescription>
                Connectez-vous à votre compte pour continuer
              </CardDescription>
            </CardHeader>

            <CardContent className="px-0">
              {/* User type selector */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {userTypes.map((type) => (
                  <motion.button
                    key={type.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setUserType(type.id as typeof userType)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 text-center ${
                      userType === type.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <type.icon className={`w-6 h-6 mx-auto mb-2 ${
                      userType === type.id ? "text-primary" : "text-muted-foreground"
                    }`} />
                    <span className={`text-sm font-medium ${
                      userType === type.id ? "text-primary" : "text-muted-foreground"
                    }`}>
                      {type.label}
                    </span>
                  </motion.button>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="votre@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    icon={<Mail size={18} />}
                    inputSize="lg"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Mot de passe</Label>
                    <Link
                      to="/mot-de-passe-oublie"
                      className="text-sm text-primary hover:underline"
                    >
                      Mot de passe oublié ?
                    </Link>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      icon={<Lock size={18} />}
                      inputSize="lg"
                      className="pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <Button type="submit" variant="gradient" size="lg" className="w-full">
                  Se connecter
                  <ArrowRight size={18} />
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Pas encore de compte ?{" "}
                  <Link to="/inscription" className="text-primary font-medium hover:underline">
                    S'inscrire
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
