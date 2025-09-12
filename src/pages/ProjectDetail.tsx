import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  ArrowLeft,
  Plus, 
  Calendar, 
  Users, 
  Settings,
  MoreHorizontal,
  CheckCircle,
  Clock,
  AlertTriangle,
  Flag,
  User,
  Edit,
  Trash2,
  Filter,
  Search
} from 'lucide-react';
import { mockProjects, mockTasks, mockUsers } from '@/lib/mockData';
import Layout from '@/components/Layout';
import { useToast } from '@/hooks/use-toast';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const project = mockProjects.find(p => p.id === id);
  const projectTasks = mockTasks.filter(task => task.projectId === id);
  
  if (!project) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Projet introuvable</h1>
          <Button asChild>
            <Link to="/projects">Retour aux projets</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const filteredTasks = projectTasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const completionRate = (project.completedTasks / project.tasksCount) * 100;
  const todoTasks = projectTasks.filter(t => t.status === 'todo');
  const inProgressTasks = projectTasks.filter(t => t.status === 'in-progress');
  const doneTasks = projectTasks.filter(t => t.status === 'done');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'todo': return <Clock className="w-4 h-4" />;
      case 'in-progress': return <AlertTriangle className="w-4 h-4" />;
      case 'done': return <CheckCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'todo': return 'secondary';
      case 'in-progress': return 'warning';
      case 'done': return 'success';
      default: return 'secondary';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'secondary';
    }
  };

  const handleTaskStatusChange = (taskId: string, newStatus: string) => {
    toast({
      title: "Statut mis à jour",
      description: `La tâche a été marquée comme ${newStatus === 'todo' ? 'à faire' : newStatus === 'in-progress' ? 'en cours' : 'terminée'}`,
      variant: "default"
    });
  };

  const handleDeleteTask = (taskId: string) => {
    toast({
      title: "Tâche supprimée",
      description: "La tâche a été supprimée avec succès",
      variant: "default"
    });
  };

  const handleDeleteProject = () => {
    toast({
      title: "Projet supprimé",
      description: "Le projet a été supprimé avec succès",
      variant: "default"
    });
    navigate('/projects');
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/projects">
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </Button>
            <div className="flex items-center gap-3">
              <div 
                className="w-6 h-6 rounded-full" 
                style={{ backgroundColor: project.color }}
              />
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground">{project.name}</h1>
                <p className="text-muted-foreground text-sm sm:text-base">{project.description}</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" asChild className="flex-1 sm:flex-none">
              <Link to={`/projects/${project.id}/edit`}>
                <Edit className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Modifier</span>
              </Link>
            </Button>
            <Button variant="destructive" onClick={handleDeleteProject} className="flex-1 sm:flex-none">
              <Trash2 className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">Supprimer</span>
            </Button>
          </div>
        </div>

        {/* Project Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-card shadow-taskflow-md">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Progression</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-2">{Math.round(completionRate)}%</div>
              <Progress value={completionRate} className="h-2" />
              <p className="text-xs text-muted-foreground mt-2">
                {project.completedTasks}/{project.tasksCount} tâches
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-taskflow-md">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">À faire</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-secondary">{todoTasks.length}</div>
              <p className="text-xs text-muted-foreground">tâches en attente</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-taskflow-md">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">En cours</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">{inProgressTasks.length}</div>
              <p className="text-xs text-muted-foreground">tâches actives</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-taskflow-md">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Terminées</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">{doneTasks.length}</div>
              <p className="text-xs text-muted-foreground">tâches finies</p>
            </CardContent>
          </Card>
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue="tasks" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="tasks">Tâches</TabsTrigger>
            <TabsTrigger value="team">Équipe</TabsTrigger>
            <TabsTrigger value="activity">Activité</TabsTrigger>
          </TabsList>

          {/* Tasks Tab */}
          <TabsContent value="tasks" className="space-y-6">
            {/* Task Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher une tâche..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les statuts</SelectItem>
                    <SelectItem value="todo">À faire</SelectItem>
                    <SelectItem value="in-progress">En cours</SelectItem>
                    <SelectItem value="done">Terminé</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="gradient" asChild>
                  <Link to={`/projects/${project.id}/tasks/new`}>
                    <Plus className="w-4 h-4 mr-2" />
                    Nouvelle tâche
                  </Link>
                </Button>
              </div>
            </div>

            {/* Tasks List */}
            <div className="space-y-4">
              {filteredTasks.map((task) => (
                <Card key={task.id} className="shadow-taskflow-md hover:shadow-taskflow-lg transition-smooth">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center gap-3">
                          {getStatusIcon(task.status)}
                          <Link to={`/tasks/${task.id}`} className="font-semibold hover:text-primary transition-smooth">
                            {task.title}
                          </Link>
                          <div className="flex items-center gap-2">
                            <Badge variant={getStatusColor(task.status) as any}>
                              {task.status === 'todo' ? 'À faire' : 
                               task.status === 'in-progress' ? 'En cours' : 'Terminé'}
                            </Badge>
                            <Badge variant={getPriorityColor(task.priority) as any}>
                              <Flag className="w-3 h-3 mr-1" />
                              {task.priority === 'high' ? 'Haute' :
                               task.priority === 'medium' ? 'Moyenne' : 'Basse'}
                            </Badge>
                          </div>
                        </div>

                        <p className="text-sm text-muted-foreground">{task.description}</p>

                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          {task.assignedTo && (
                            <div className="flex items-center gap-2">
                              <Avatar className="w-5 h-5">
                                <AvatarImage src={task.assignedTo.avatar} alt={task.assignedTo.name} />
                                <AvatarFallback className="text-xs">
                                  {task.assignedTo.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <span>{task.assignedTo.name}</span>
                            </div>
                          )}
                          {task.dueDate && (
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {new Date(task.dueDate).toLocaleDateString('fr-FR')}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Select 
                          value={task.status} 
                          onValueChange={(value) => handleTaskStatusChange(task.id, value)}
                        >
                          <SelectTrigger className="w-[130px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="todo">À faire</SelectItem>
                            <SelectItem value="in-progress">En cours</SelectItem>
                            <SelectItem value="done">Terminé</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteTask(task.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {filteredTasks.length === 0 && (
                <div className="text-center py-12">
                  <CheckCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Aucune tâche trouvée</h3>
                  <p className="text-muted-foreground mb-6">
                    {searchTerm || statusFilter !== 'all'
                      ? 'Essayez de modifier vos filtres'
                      : 'Commencez par créer des tâches pour ce projet'
                    }
                  </p>
                  <Button variant="gradient" asChild>
                    <Link to={`/projects/${project.id}/tasks/new`}>
                      <Plus className="w-4 h-4 mr-2" />
                      Créer une tâche
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Team Tab */}
          <TabsContent value="team" className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h3 className="text-lg font-semibold">Membres de l'équipe</h3>
              <Button variant="outline" onClick={() => toast({ title: "Membre ajouté", description: "Fonctionnalité d'ajout de membre simulée" })}>
                <Plus className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Ajouter un membre</span>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {project.members.map((member) => (
                <Card key={member.id} className="shadow-taskflow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback>
                          {member.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h4 className="font-medium">{member.name}</h4>
                        <p className="text-sm text-muted-foreground">{member.email}</p>
                        <Badge variant="outline" className="text-xs mt-1">
                          {member.role === 'admin' ? 'Admin' : 
                           member.role === 'manager' ? 'Manager' : 'Membre'}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity" className="space-y-6">
            <h3 className="text-lg font-semibold">Activité récente</h3>
            
            <div className="space-y-4">
              <Card className="shadow-taskflow-sm">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-success mt-0.5" />
                    <div>
                      <p className="text-sm">
                        <span className="font-medium">Sophie Laurent</span> a terminé la tâche "Conception de la maquette homepage"
                      </p>
                      <p className="text-xs text-muted-foreground">Il y a 2 heures</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-taskflow-sm">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Plus className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm">
                        <span className="font-medium">Pierre Martin</span> a ajouté une nouvelle tâche "Tests d'intégration"
                      </p>
                      <p className="text-xs text-muted-foreground">Il y a 5 heures</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-taskflow-sm">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-secondary mt-0.5" />
                    <div>
                      <p className="text-sm">
                        <span className="font-medium">Jean Moreau</span> a rejoint le projet
                      </p>
                      <p className="text-xs text-muted-foreground">Hier</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default ProjectDetail;