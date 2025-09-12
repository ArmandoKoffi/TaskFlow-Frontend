import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Save,
  Camera,
  Bell,
  Shield,
  Key,
  Palette,
  Moon,
  Sun,
  Globe
} from 'lucide-react';
import { currentUser } from '@/lib/mockData';
import Layout from '@/components/Layout';
import { useToast } from '@/hooks/use-toast';

const Profile = () => {
  const { toast } = useToast();
  const [profileData, setProfileData] = useState({
    name: currentUser.name,
    email: currentUser.email,
    phone: '+33 6 12 34 56 78',
    location: 'Paris, France',
    bio: 'Responsable produit passionnée par l\'innovation et la collaboration en équipe.',
    timezone: 'Europe/Paris',
    language: 'fr'
  });

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    pushNotifications: true,
    weeklyDigest: false,
    darkMode: false,
    autoAssign: true
  });

  const handleSaveProfile = () => {
    toast({
      title: "Profil mis à jour",
      description: "Vos informations ont été sauvegardées avec succès",
      variant: "default"
    });
  };

  const handleSavePreferences = () => {
    toast({
      title: "Préférences mises à jour",
      description: "Vos préférences ont été sauvegardées",
      variant: "default"
    });
  };

  const handleChangePassword = () => {
    toast({
      title: "Lien envoyé",
      description: "Un lien de réinitialisation a été envoyé à votre email",
      variant: "default"
    });
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Mon Profil</h1>
          <p className="text-muted-foreground">
            Gérez vos informations personnelles et préférences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Picture & Basic Info */}
          <div className="lg:col-span-1">
            <Card className="shadow-taskflow-md">
              <CardHeader>
                <CardTitle>Photo de profil</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <div className="relative inline-block">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                    <AvatarFallback className="text-2xl">
                      {currentUser.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <Button 
                    size="icon" 
                    variant="secondary" 
                    className="absolute bottom-0 right-0 rounded-full w-8 h-8"
                  >
                    <Camera className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="text-center">
                  <h3 className="font-semibold text-lg">{currentUser.name}</h3>
                  <p className="text-muted-foreground">{currentUser.email}</p>
                  <Badge variant="secondary" className="mt-2">
                    <Shield className="w-3 h-3 mr-1" />
                    {currentUser.role === 'admin' ? 'Administrateur' : 
                     currentUser.role === 'manager' ? 'Manager' : 'Membre'}
                  </Badge>
                </div>

                <Button variant="outline" className="w-full">
                  <Camera className="w-4 h-4 mr-2" />
                  Changer la photo
                </Button>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="shadow-taskflow-md mt-6">
              <CardHeader>
                <CardTitle>Statistiques</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Projets actifs</span>
                  <span className="font-semibold">3</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Tâches assignées</span>
                  <span className="font-semibold">7</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Tâches terminées</span>
                  <span className="font-semibold">24</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Taux de réussite</span>
                  <span className="font-semibold text-success">92%</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <Card className="shadow-taskflow-md">
              <CardHeader>
                <CardTitle>Informations personnelles</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nom complet</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="name"
                        value={profileData.name}
                        onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        value={profileData.phone}
                        onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Localisation</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="location"
                        value={profileData.location}
                        onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Biographie</Label>
                  <Textarea
                    id="bio"
                    placeholder="Parlez-nous de vous..."
                    value={profileData.bio}
                    onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                    rows={3}
                  />
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSaveProfile}>
                    <Save className="w-4 h-4 mr-2" />
                    Sauvegarder
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Preferences */}
            <Card className="shadow-taskflow-md">
              <CardHeader>
                <CardTitle>Préférences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Notifications */}
                <div>
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <Bell className="w-4 h-4" />
                    Notifications
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Notifications email</p>
                        <p className="text-xs text-muted-foreground">Recevez des emails pour les mises à jour importantes</p>
                      </div>
                      <Switch
                        checked={preferences.emailNotifications}
                        onCheckedChange={(checked) => 
                          setPreferences(prev => ({ ...prev, emailNotifications: checked }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Notifications push</p>
                        <p className="text-xs text-muted-foreground">Notifications instantanées dans le navigateur</p>
                      </div>
                      <Switch
                        checked={preferences.pushNotifications}
                        onCheckedChange={(checked) => 
                          setPreferences(prev => ({ ...prev, pushNotifications: checked }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Résumé hebdomadaire</p>
                        <p className="text-xs text-muted-foreground">Recevez un résumé de votre activité chaque lundi</p>
                      </div>
                      <Switch
                        checked={preferences.weeklyDigest}
                        onCheckedChange={(checked) => 
                          setPreferences(prev => ({ ...prev, weeklyDigest: checked }))
                        }
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Workflow */}
                <div>
                  <h4 className="font-medium mb-3">Workflow</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Assignment automatique</p>
                        <p className="text-xs text-muted-foreground">S'assigner automatiquement aux nouvelles tâches créées</p>
                      </div>
                      <Switch
                        checked={preferences.autoAssign}
                        onCheckedChange={(checked) => 
                          setPreferences(prev => ({ ...prev, autoAssign: checked }))
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSavePreferences}>
                    <Save className="w-4 h-4 mr-2" />
                    Sauvegarder les préférences
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Security */}
            <Card className="shadow-taskflow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Sécurité
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div>
                    <p className="text-sm font-medium">Mot de passe</p>
                    <p className="text-xs text-muted-foreground">Dernière modification : Il y a 2 mois</p>
                  </div>
                  <Button variant="outline" onClick={handleChangePassword}>
                    <Key className="w-4 h-4 mr-2" />
                    Changer
                  </Button>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div>
                    <p className="text-sm font-medium">Authentification à deux facteurs</p>
                    <p className="text-xs text-muted-foreground">Renforcez la sécurité de votre compte</p>
                  </div>
                  <Button variant="outline">
                    Configurer
                  </Button>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div>
                    <p className="text-sm font-medium">Sessions actives</p>
                    <p className="text-xs text-muted-foreground">Gérez vos connexions</p>
                  </div>
                  <Button variant="outline">
                    Voir tout
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;