import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle, Users, BarChart3, Shield, ArrowRight } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b border-border/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center shadow-taskflow-sm">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                TaskFlow
              </span>
            </div>

            {/* Navigation */}
            <div className="flex items-center gap-4">
              <Button variant="ghost" asChild>
                <Link to="/login">Se connecter</Link>
              </Button>
              <Button variant="gradient" asChild>
                <Link to="/login" className="flex items-center gap-2">
                  Commencer
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  TaskFlow
                </span>
                <br />
                Organisez, collaborez et réussissez
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                La plateforme collaborative ultime pour gérer vos projets, organiser vos tâches 
                et faire progresser votre équipe vers le succès.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="gradient" size="lg" asChild className="text-lg px-8">
                <Link to="/login" className="flex items-center gap-2">
                  Commencer gratuitement
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="text-lg px-8">
                <Link to="/login">
                  Essayer la démo
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              Tout ce dont vous avez besoin
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Des fonctionnalités puissantes conçues pour optimiser votre productivité
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto shadow-taskflow-md">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Gestion de tâches</h3>
              <p className="text-muted-foreground">
                Créez, organisez et suivez vos tâches avec des statuts personnalisables
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center mx-auto shadow-taskflow-md">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Collaboration</h3>
              <p className="text-muted-foreground">
                Travaillez ensemble en temps réel avec votre équipe
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto shadow-taskflow-md">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Suivi avancé</h3>
              <p className="text-muted-foreground">
                Analysez la performance et les progrès avec des rapports détaillés
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center mx-auto shadow-taskflow-md">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Sécurisé</h3>
              <p className="text-muted-foreground">
                Vos données sont protégées avec les plus hauts standards de sécurité
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-card rounded-3xl p-12 shadow-taskflow-lg border border-border/50">
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
                Prêt à transformer votre productivité ?
              </h2>
              <p className="text-xl text-muted-foreground">
                Rejoignez des milliers d'équipes qui utilisent TaskFlow pour réussir leurs projets
              </p>
              <Button variant="gradient" size="lg" asChild className="text-lg px-8">
                <Link to="/login" className="flex items-center gap-2">
                  Commencer maintenant
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-primary rounded-md flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold bg-gradient-primary bg-clip-text text-transparent">
                TaskFlow
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 TaskFlow. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
