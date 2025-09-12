import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { PasswordStrengthIndicator, getPasswordStrength } from '@/components/ui/password-strength-indicator';
import { CheckCircle, User, Lock, ArrowRight, Eye, EyeOff, ArrowLeft } from 'lucide-react';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const {
    login,
    isLoading
  } = useAuth();
  const navigate = useNavigate();
  const {
    toast
  } = useToast();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isRegister) {
      // Vérifier la force du mot de passe
      const passwordStrength = getPasswordStrength(password);
      if (!passwordStrength.isValid) {
        toast({
          title: "Mot de passe trop faible",
          description: "Le mot de passe doit contenir au moins 8 caractères, une minuscule, une majuscule et un chiffre",
          variant: "destructive"
        });
        return;
      }

      // Simulate registration
      toast({
        title: "Compte créé avec succès",
        description: "Vous pouvez maintenant vous connecter",
        variant: "default"
      });
      setIsRegister(false);
      setPassword('');
      return;
    }
    const success = await login(email, password);
    if (success) {
      toast({
        title: "Connexion réussie",
        description: "Bienvenue dans TaskFlow !",
        variant: "default"
      });
      navigate('/dashboard');
    } else {
      toast({
        title: "Erreur de connexion",
        description: "Email ou mot de passe incorrect",
        variant: "destructive"
      });
    }
  };
  const demoLogin = async () => {
    await login('marie.dubois@taskflow.com', 'demo');
    navigate('/dashboard');
  };
  return <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
      {/* Bouton retour vers la landing page */}
      
      
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left side - Branding */}
        <div className="text-center lg:text-left space-y-6">
          <div>
            <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
              TaskFlow
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Organisez, collaborez et réussissez ensemble
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-success" />
              <span className="text-foreground">Gestion de projets intuitive</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-success" />
              <span className="text-foreground">Collaboration en temps réel</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-success" />
              <span className="text-foreground">Suivi de progression avancé</span>
            </div>
          </div>
        </div>

        {/* Right side - Login form */}
        <Card className="w-full max-w-md mx-auto shadow-taskflow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">
              {isRegister ? 'Créer un compte' : 'Se connecter'}
            </CardTitle>
            <CardDescription>
              {isRegister ? 'Rejoignez TaskFlow pour commencer' : 'Connectez-vous à votre espace TaskFlow'}
            </CardDescription>
          </CardHeader>
          
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Adresse email</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input id="email" type="email" placeholder="votre@email.com" value={email} onChange={e => setEmail(e.target.value)} className="pl-10" required />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input id="password" type={showPassword ? "text" : "password"} placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} className="pl-10 pr-10" required />
                  <Button type="button" variant="ghost" size="icon" className="absolute right-1 top-1 h-8 w-8" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff className="w-4 h-4 text-muted-foreground" /> : <Eye className="w-4 h-4 text-muted-foreground" />}
                  </Button>
                </div>
                
                {/* Indicateur de force du mot de passe pour l'inscription */}
                {isRegister && password && <PasswordStrengthIndicator password={password} className="mt-2" />}
              </div>
            </CardContent>
            
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full" disabled={isLoading} variant="gradient">
                {isLoading ? 'Connexion...' : isRegister ? 'Créer le compte' : 'Se connecter'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              
              {!isRegister && <Button type="button" variant="outline" className="w-full" onClick={demoLogin} disabled={isLoading}>
                  Essai avec le compte démo
                </Button>}
              
              <div className="text-center">
                <button type="button" onClick={() => setIsRegister(!isRegister)} className="text-sm text-primary hover:underline">
                  {isRegister ? 'Déjà un compte ? Se connecter' : 'Pas de compte ? S\'inscrire'}
                </button>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>;
};
export default Login;