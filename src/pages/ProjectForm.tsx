import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  ArrowLeft,
  Save,
  X,
  Plus,
  Trash2,
  Users,
  Palette
} from 'lucide-react';
import { mockProjects, mockUsers } from '@/lib/mockData';
import Layout from '@/components/Layout';
import { useToast } from '@/hooks/use-toast';

const ProjectForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isEdit = Boolean(id);
  
  const existingProject = isEdit ? mockProjects.find(p => p.id === id) : null;
  
  const [formData, setFormData] = useState({
    name: existingProject?.name || '',
    description: existingProject?.description || '',
    color: existingProject?.color || '#6366f1',
    members: existingProject?.members || []
  });

  const [selectedMembers, setSelectedMembers] = useState<string[]>(
    existingProject?.members.map(m => m.id) || []
  );

  const availableColors = [
    '#6366f1', '#8b5cf6', '#10b981', '#f59e0b', 
    '#ef4444', '#06b6d4', '#84cc16', '#f97316'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast({
        title: "Erreur",
        description: "Le nom du projet est requis",
        variant: "destructive"
      });
      return;
    }

    const action = isEdit ? 'modifié' : 'créé';
    toast({
      title: `Projet ${action}`,
      description: `Le projet "${formData.name}" a été ${action} avec succès`,
      variant: "default"
    });

    if (isEdit) {
      navigate(`/projects/${id}`);
    } else {
      navigate('/projects');
    }
  };

  const handleMemberToggle = (memberId: string) => {
    setSelectedMembers(prev => 
      prev.includes(memberId) 
        ? prev.filter(id => id !== memberId)
        : [...prev, memberId]
    );
  };

  const getSelectedMembersData = () => {
    return mockUsers.filter(user => selectedMembers.includes(user.id));
  };

  return (
    <Layout>
      <div className="max-w-full px-4 sm:max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-2 sm:gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div className="min-w-0 flex-1">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground truncate">
              {isEdit ? 'Modifier le projet' : 'Nouveau projet'}
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              {isEdit ? 'Modifiez les détails de votre projet' : 'Créez un nouveau projet pour votre équipe'}
            </p>
          </div>
        </div>

        {/* Form */}
        <Card className="shadow-taskflow-lg">
          <CardHeader>
            <CardTitle>Informations du projet</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Project Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Nom du projet *</Label>
                <Input
                  id="name"
                  placeholder="Ex: Refonte du site web"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  required
                />
              </div>

              {/* Project Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Décrivez les objectifs et le scope de votre projet..."
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={4}
                />
              </div>

              {/* Project Color */}
              <div className="space-y-3">
                <Label>Couleur du projet</Label>
                <div className="flex items-center gap-3">
                  <div 
                    className="w-8 h-8 rounded-full border-2 border-gray-200" 
                    style={{ backgroundColor: formData.color }}
                  />
                  <div className="flex gap-2">
                    {availableColors.map((color) => (
                      <button
                        key={color}
                        type="button"
                        className={`w-6 h-6 rounded-full border-2 transition-smooth ${
                          formData.color === color 
                            ? 'border-foreground scale-110' 
                            : 'border-gray-200 hover:scale-105'
                        }`}
                        style={{ backgroundColor: color }}
                        onClick={() => setFormData(prev => ({ ...prev, color }))}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Team Members */}
              <div className="space-y-3">
                <Label>Membres de l'équipe</Label>
                
                {/* Selected Members */}
                {getSelectedMembersData().length > 0 && (
                  <div className="flex flex-wrap gap-2 p-3 bg-muted rounded-md">
                    {getSelectedMembersData().map((member) => (
                      <Badge key={member.id} variant="secondary" className="flex items-center gap-2">
                        <Avatar className="w-4 h-4">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback className="text-xs">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <span>{member.name}</span>
                        <button
                          type="button"
                          onClick={() => handleMemberToggle(member.id)}
                          className="ml-1 hover:text-destructive"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Available Members */}
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">Ajouter des membres</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {mockUsers.filter(user => !selectedMembers.includes(user.id)).map((user) => (
                      <div
                        key={user.id}
                        className="flex items-center gap-3 p-2 rounded-md border border-input hover:bg-accent cursor-pointer transition-smooth"
                        onClick={() => handleMemberToggle(user.id)}
                      >
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback className="text-xs">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{user.name}</p>
                          <p className="text-xs text-muted-foreground">{user.email}</p>
                        </div>
                        <Plus className="w-4 h-4 text-muted-foreground" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-6 border-t">
                <Button type="submit" variant="gradient" className="w-full sm:flex-1">
                  <Save className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">{isEdit ? 'Enregistrer les modifications' : 'Créer le projet'}</span>
                  <span className="sm:hidden">{isEdit ? 'Enregistrer' : 'Créer'}</span>
                </Button>
                <Button type="button" variant="outline" onClick={() => navigate(-1)} className="w-full sm:w-auto">
                  Annuler
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Preview Card */}
        <Card className="shadow-taskflow-md">
          <CardHeader>
            <CardTitle className="text-lg">Aperçu</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <div 
                className="w-4 h-4 rounded-full" 
                style={{ backgroundColor: formData.color }}
              />
              <div className="flex-1">
                <h3 className="font-semibold">
                  {formData.name || 'Nom du projet'}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {formData.description || 'Description du projet'}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {getSelectedMembersData().length} membre{getSelectedMembersData().length !== 1 ? 's' : ''}
                  </span>
                  <div className="flex -space-x-1">
                    {getSelectedMembersData().slice(0, 3).map((member) => (
                      <Avatar key={member.id} className="w-5 h-5 border border-background">
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback className="text-xs">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                    {getSelectedMembersData().length > 3 && (
                      <div className="w-5 h-5 bg-muted rounded-full border border-background flex items-center justify-center">
                        <span className="text-xs text-muted-foreground">
                          +{getSelectedMembersData().length - 3}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default ProjectForm;