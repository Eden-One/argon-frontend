import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, ArrowLeft, CheckCircle2, AlertCircle } from "lucide-react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
      setIsLoading(false);
    }, 1000);
  };

  const handleBackToLogin = () => {
    navigate("/connexion");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex">
      {/* Left side - Branding & Benefits */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 relative overflow-hidden flex-col justify-between p-12">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-10 w-40 h-40 bg-blue-400 rounded-full blur-3xl opacity-20 animate-pulse" />
          <div className="absolute bottom-10 right-20 w-64 h-64 bg-purple-400 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: "1s" }} />
          <div className="absolute top-1/2 -right-32 w-96 h-96 bg-indigo-400 rounded-full blur-3xl opacity-10" />
        </div>

        <div className="relative z-10">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-16"
          >
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center border border-white/30">
              <span className="text-white font-display font-bold text-2xl">A</span>
            </div>
            <span className="font-display text-3xl font-bold text-white">ARGON</span>
          </motion.div>

          {/* Main heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h1 className="font-display text-5xl font-bold text-white mb-6 leading-tight">
              Retrouvez l'accès <br />
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">à votre compte</span>
            </h1>
            <p className="text-lg text-blue-100 max-w-md mb-12">
              Nous vous aiderons à réinitialiser votre mot de passe en quelques minutes seulement.
            </p>
          </motion.div>

          {/* Features list */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            {[
              { title: "Processus sécurisé", desc: "Vérification en deux étapes pour votre sécurité" },
              { title: "Email de confirmation", desc: "Vous recevrez un lien de réinitialisation" },
              { title: "Accès immédiat", desc: "Retrouvez l'accès à votre compte rapidement" },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + idx * 0.1 }}
                className="flex items-start gap-3 text-white group"
              >
                <div className="w-6 h-6 rounded-full bg-green-400 flex items-center justify-center flex-shrink-0 mt-1 group-hover:scale-110 transition-transform">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-white">{feature.title}</p>
                  <p className="text-sm text-blue-100">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Footer info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative z-10 pt-8 border-t border-white/20"
        >
          <p className="text-white font-semibold mb-2">Sécurité garantie</p>
          <p className="text-blue-100 text-sm">Votre compte est protégé par les meilleures normes de sécurité du secteur</p>
        </motion.div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 lg:p-12">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-sm"
        >
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 mb-10">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
              <span className="text-white font-display font-bold text-2xl">A</span>
            </div>
            <span className="font-display text-3xl font-bold text-foreground">ARGON</span>
          </div>

          {/* Form Container */}
          <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-10 border border-gray-100">
            {/* Back Button */}
            <motion.button
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              onClick={handleBackToLogin}
              className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium mb-6 transition-colors"
            >
              <ArrowLeft size={18} />
              Retour à la connexion
            </motion.button>

            {!isSubmitted ? (
              <>
                {/* Header */}
                <div className="mb-8">
                  <h2 className="text-3xl font-display font-bold text-gray-900 mb-2">Mot de passe oublié ?</h2>
                  <p className="text-gray-600 text-sm">
                    Entrez votre adresse email et nous vous enverrons des instructions pour réinitialiser votre mot de passe.
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Email Field */}
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-2"
                  >
                    <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                      Adresse email
                    </Label>
                    <div className="relative group">
                      <Input
                        id="email"
                        type="email"
                        placeholder="exemple@ecole.fr"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="pl-10 h-11 bg-gray-50 border-gray-200 focus:bg-white focus:border-indigo-500 transition-colors"
                      />
                      <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
                    </div>
                    <p className="text-xs text-gray-500">
                      Nous enverrons un lien de réinitialisation à cette adresse
                    </p>
                  </motion.div>

                  {/* Submit Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full h-11 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {isLoading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Envoi en cours...
                        </>
                      ) : (
                        "Envoyer les instructions"
                      )}
                    </Button>
                  </motion.div>
                </form>

                {/* Info Box */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200 flex gap-3"
                >
                  <AlertCircle size={18} className="text-blue-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-blue-700">
                    Vérifiez votre dossier spam si vous ne recevez pas l'email dans quelques minutes.
                  </p>
                </motion.div>
              </>
            ) : (
              <>
                {/* Success State */}
                <div className="text-center py-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6"
                  >
                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h3 className="text-2xl font-display font-bold text-gray-900 mb-2">Vérifiez votre email</h3>
                    <p className="text-gray-600 mb-6">
                      Nous avons envoyé des instructions de réinitialisation à <br />
                      <span className="font-semibold text-gray-900">{email}</span>
                    </p>
                    <p className="text-sm text-gray-500 mb-8">
                      Cliquez sur le lien dans l'email pour réinitialiser votre mot de passe. Le lien expire dans 24 heures.
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-3"
                  >
                    <Button
                      onClick={handleBackToLogin}
                      className="w-full h-11 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg transition-all duration-200"
                    >
                      Retour à la connexion
                    </Button>
                  </motion.div>
                </div>

                {/* Info Box */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200 text-center"
                >
                  <p className="text-sm text-green-700 flex items-center justify-center gap-2">
                    <CheckCircle2 size={16} />
                    Email sécurisé avec chiffrement SSL/TLS
                  </p>
                </motion.div>
              </>
            )}
          </div>

          {/* Footer */}
          {!isSubmitted && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center text-sm text-gray-600 mt-6"
            >
              Vous souvenez-vous de votre mot de passe ?{" "}
              <Link to="/connexion" className="text-indigo-600 hover:text-indigo-700 font-medium">
                Se connecter
              </Link>
            </motion.p>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ForgotPassword;
