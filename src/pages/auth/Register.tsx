import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowRight, ArrowLeft, Check } from "lucide-react";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    password: "",
    confirmPassword: "",
    codeEtablissement: "",
  });
  const navigate = useNavigate();

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Simulate registration
      navigate("/connexion");
    }
  };

  const steps = [
    { number: 1, label: "Informations" },
    { number: 2, label: "Coordonnées" },
    { number: 3, label: "Sécurité" },
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
              Rejoignez la<br />
              <span className="text-secondary-light">communauté ARGON</span>
            </h1>

            <p className="text-lg text-primary-foreground/80 max-w-md mb-8">
              Créez votre compte parent en quelques minutes et commencez à suivre 
              la scolarité de vos enfants en temps réel.
            </p>

            <div className="space-y-4">
              {[
                "Suivi de présence en temps réel",
                "Notes et bulletins accessibles",
                "Communication directe avec les enseignants",
                "Notifications instantanées",
              ].map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-success flex items-center justify-center">
                    <Check size={14} className="text-success-foreground" />
                  </div>
                  <span className="text-primary-foreground/90">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
      </div>

      {/* Right side - Registration Form */}
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

          {/* Progress steps */}
          <div className="flex items-center justify-between mb-8">
            {steps.map((s, index) => (
              <div key={s.number} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-medium transition-all ${
                      step >= s.number
                        ? "bg-gradient-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {step > s.number ? <Check size={18} /> : s.number}
                  </div>
                  <span className="text-xs mt-2 text-muted-foreground">{s.label}</span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-16 lg:w-24 h-1 mx-2 rounded transition-all ${
                      step > s.number ? "bg-primary" : "bg-muted"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <Card variant="flat" className="border-0 shadow-none">
            <CardHeader className="space-y-1 px-0">
              <CardTitle className="font-display text-2xl">
                {step === 1 && "Informations personnelles"}
                {step === 2 && "Coordonnées"}
                {step === 3 && "Sécurité"}
              </CardTitle>
              <CardDescription>
                {step === 1 && "Renseignez vos informations de base"}
                {step === 2 && "Comment pouvons-nous vous contacter ?"}
                {step === 3 && "Créez un mot de passe sécurisé"}
              </CardDescription>
            </CardHeader>

            <CardContent className="px-0">
              <form onSubmit={handleSubmit} className="space-y-4">
                {step === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4"
                  >
                    <div className="space-y-2">
                      <Label htmlFor="prenom">Prénom</Label>
                      <Input
                        id="prenom"
                        placeholder="Votre prénom"
                        value={formData.prenom}
                        onChange={(e) => updateFormData("prenom", e.target.value)}
                        icon={<User size={18} />}
                        inputSize="lg"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="nom">Nom</Label>
                      <Input
                        id="nom"
                        placeholder="Votre nom"
                        value={formData.nom}
                        onChange={(e) => updateFormData("nom", e.target.value)}
                        icon={<User size={18} />}
                        inputSize="lg"
                        required
                      />
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4"
                  >
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="votre@email.com"
                        value={formData.email}
                        onChange={(e) => updateFormData("email", e.target.value)}
                        icon={<Mail size={18} />}
                        inputSize="lg"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="telephone">Téléphone</Label>
                      <Input
                        id="telephone"
                        type="tel"
                        placeholder="+221 77 123 45 67"
                        value={formData.telephone}
                        onChange={(e) => updateFormData("telephone", e.target.value)}
                        icon={<Phone size={18} />}
                        inputSize="lg"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="code">Code établissement</Label>
                      <Input
                        id="code"
                        placeholder="Ex: LVH2024"
                        value={formData.codeEtablissement}
                        onChange={(e) => updateFormData("codeEtablissement", e.target.value)}
                        inputSize="lg"
                        required
                      />
                      <p className="text-xs text-muted-foreground">
                        Ce code vous a été fourni par l'établissement
                      </p>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4"
                  >
                    <div className="space-y-2">
                      <Label htmlFor="password">Mot de passe</Label>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={formData.password}
                          onChange={(e) => updateFormData("password", e.target.value)}
                          icon={<Lock size={18} />}
                          inputSize="lg"
                          className="pr-12"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Min. 8 caractères, 1 majuscule, 1 chiffre, 1 caractère spécial
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="••••••••"
                        value={formData.confirmPassword}
                        onChange={(e) => updateFormData("confirmPassword", e.target.value)}
                        icon={<Lock size={18} />}
                        inputSize="lg"
                        required
                      />
                    </div>
                  </motion.div>
                )}

                <div className="flex gap-3 pt-4">
                  {step > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="lg"
                      onClick={() => setStep(step - 1)}
                    >
                      <ArrowLeft size={18} />
                      Retour
                    </Button>
                  )}
                  <Button type="submit" variant="gradient" size="lg" className="flex-1">
                    {step < 3 ? "Continuer" : "Créer mon compte"}
                    <ArrowRight size={18} />
                  </Button>
                </div>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Déjà un compte ?{" "}
                  <Link to="/connexion" className="text-primary font-medium hover:underline">
                    Se connecter
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

export default Register;
