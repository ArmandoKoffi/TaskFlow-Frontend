import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft,
  Save,
  Calendar,
  User,
  Flag,
  FolderOpen
} from 'lucide-react';
import { mockTasks, mockProjects, mockUsers, currentUser } from '@/lib/mockData';
import Layout from '@/components/Layout';
import { useToast } from '@/hooks/use-toast';

const TaskForm = () => {
  const { id, projectId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isEdit = Boolean(id);
  
  const existingTask = isEdit ? mockTasks.find(t => t.id === id) : null;
  const selectedProject = projectId ? mockProjects.find(p => p.id === projectId) : null;
  
  const [formData, setFormData] = useState({
    title: existingTask?.title || '',
    description: existingTask?.description || '',
    status: existingTask?.status || 'todo',
    priority: existingTask?.priority || 'medium',
    assignedTo: existingTask?.assignedTo?.id || 'unassigned',
    projectId: existingTask?.projectId || projectId || '',
    dueDate: existingTask?.dueDate ? existingTask.dueDate.split('T')[0] : ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      toast({
        title: "Erreur",
        description: "Le titre de la tâche est requis",
        variant: "destructive"
      });
      return;
    }

    if (!formData.projectId) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner un projet",
        variant: "destructive"
      });
      return;
    }

    const action = isEdit ? 'modifiée' : 'créée';
    toast({
      title: `Tâche ${action}`,
      description: `La tâche "${formData.title}" a été ${action} avec succès`,
      variant: "default"
    });

    if (projectId) {
      navigate(`/projects/${projectId}`);
    } else {
      navigate('/tasks');
    }
  };

  const getAssignedUser = () => {
    return formData.assignedTo !== 'unassigned' ? mockUsers.find(user => user.id === formData.assignedTo) : undefined;
  };

  const getProjectMembers = () => {
    const project = mockProjects.find(p => p.id === formData.projectId);
    return project?.members || [];
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
              {isEdit ? 'Modifier la tâche' : 'Nouvelle tâche'}
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              {isEdit ? 'Modifiez les détails de votre tâche' : 'Créez une nouvelle tâche'}
            </p>
          </div>
        </div>

        {/* Form */}
        <Card className="shadow-taskflow-lg">
          <CardHeader>
            <CardTitle>Détails de la tâche</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Task Title */}
              <div className="space-y-2">
                <Label htmlFor="title">Titre de la tâche *</Label>
                <Input
                  id="title"
                  placeholder="Ex: Créer la page d'accueil"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  required
                />
              </div>

              {/* Task Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Décrivez ce qui doit être fait..."
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={4}
                />
              </div>

              {/* Project Selection */}
              <div className="space-y-2">
                <Label>Projet *</Label>
                <Select 
                  value={formData.projectId} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, projectId: value }))}
                  disabled={Boolean(projectId)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un projet" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockProjects.map((project) => (
                      <SelectItem key={project.id} value={project.id}>
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: project.color }}
                          />
                          {project.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {selectedProject && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <FolderOpen className="w-4 h-4" />
                    Projet: {selectedProject.name}
                  </div>
                )}
              </div>

              {/* Status and Priority Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Status */}
                <div className="space-y-2">
                  <Label>Statut</Label>
                <Select 
                  value={formData.status} 
                  onValueChange={(value: 'todo' | 'in-progress' | 'done') => setFormData(prev => ({ ...prev, status: value }))}
                >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todo">À faire</SelectItem>
                      <SelectItem value="in-progress">En cours</SelectItem>
                      <SelectItem value="done">Terminé</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Priority */}
                <div className="space-y-2">
                  <Label>Priorité</Label>
                <Select 
                  value={formData.priority} 
                  onValueChange={(value: 'low' | 'medium' | 'high') => setFormData(prev => ({ ...prev, priority: value }))}
                >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">
                        <div className="flex items-center gap-2">
                          <Flag className="w-4 h-4 text-success" />
                          Basse
                        </div>
                      </SelectItem>
                      <SelectItem value="medium">
                        <div className="flex items-center gap-2">
                          <Flag className="w-4 h-4 text-warning" />
                          Moyenne
                        </div>
                      </SelectItem>
                      <SelectItem value="high">
                        <div className="flex items-center gap-2">
                          <Flag className="w-4 h-4 text-destructive" />
                          Haute
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Assignee and Due Date Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Assignee */}
                <div className="space-y-2">
                  <Label>Assigné à</Label>
                  <Select 
                    value={formData.assignedTo} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, assignedTo: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner une personne" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="unassigned">Non assigné</SelectItem>
                      {formData.projectId ? getProjectMembers().map((user) => (
                        <SelectItem key={user.id} value={user.id}>
                          <div className="flex items-center gap-2">
                            <Avatar className="w-5 h-5">
                              <AvatarImage src={user.avatar} alt={user.name} />
                              <AvatarFallback className="text-xs">
                                {user.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            {user.name}
                          </div>
                        </SelectItem>
                      )) : mockUsers.map((user) => (
                        <SelectItem key={user.id} value={user.id}>
                          <div className="flex items-center gap-2">
                            <Avatar className="w-5 h-5">
                              <AvatarImage src={user.avatar} alt={user.name} />
                              <AvatarFallback className="text-xs">
                                {user.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            {user.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {getAssignedUser() && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <User className="w-4 h-4" />
                      Assigné à: {getAssignedUser()?.name}
                    </div>
                  )}
                </div>

                {/* Due Date */}
                <div className="space-y-2">
                  <Label htmlFor="dueDate">Date d'échéance</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
                  />
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-6 border-t">
                <Button type="submit" variant="gradient" className="w-full sm:flex-1">
                  <Save className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">{isEdit ? 'Enregistrer les modifications' : 'Créer la tâche'}</span>
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
          <CardContent className="space-y-3">
            <div>
              <h3 className="font-semibold">
                {formData.title || 'Titre de la tâche'}
              </h3>
              <p className="text-sm text-muted-foreground">
                {formData.description || 'Description de la tâche'}
              </p>
            </div>
            
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant={
                formData.status === 'todo' ? 'secondary' :
                formData.status === 'in-progress' ? 'outline' : 'secondary'
              }>
                {formData.status === 'todo' ? 'À faire' :
                 formData.status === 'in-progress' ? 'En cours' : 'Terminé'}
              </Badge>
              
              <Badge variant={
                formData.priority === 'low' ? 'secondary' :
                formData.priority === 'medium' ? 'outline' : 'destructive'
              }>
                <Flag className="w-3 h-3 mr-1" />
                {formData.priority === 'low' ? 'Basse' :
                 formData.priority === 'medium' ? 'Moyenne' : 'Haute'}
              </Badge>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              {formData.projectId && (
                <div className="flex items-center gap-1">
                  <FolderOpen className="w-4 h-4" />
                  {mockProjects.find(p => p.id === formData.projectId)?.name}
                </div>
              )}
              
              {getAssignedUser() && (
                <div className="flex items-center gap-2">
                  <Avatar className="w-4 h-4">
                    <AvatarImage src={getAssignedUser()?.avatar} alt={getAssignedUser()?.name} />
                    <AvatarFallback className="text-xs">
                      {getAssignedUser()?.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  {getAssignedUser()?.name}
                </div>
              )}
              
              {formData.dueDate && (
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(formData.dueDate).toLocaleDateString('fr-FR')}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default TaskForm;