import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Plus, 
  Search, 
  Filter, 
  Calendar,
  User,
  Flag,
  Clock,
  CheckCircle,
  AlertTriangle,
  MoreHorizontal,
  Eye
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { mockTasks, mockProjects, currentUser } from '@/lib/mockData';
import Layout from '@/components/Layout';

const Tasks = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [assigneeFilter, setAssigneeFilter] = useState('all');

  const filteredTasks = mockTasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
    const matchesAssignee = assigneeFilter === 'all' || 
                           (assigneeFilter === 'me' && task.assignedTo?.id === currentUser.id) ||
                           (assigneeFilter === 'unassigned' && !task.assignedTo);
    
    return matchesSearch && matchesStatus && matchesPriority && matchesAssignee;
  });

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

  const getPriorityIcon = (priority: string) => {
    return <Flag className={`w-4 h-4 ${priority === 'high' ? 'text-destructive' : 
                                        priority === 'medium' ? 'text-warning' : 'text-success'}`} />;
  };

  const getProjectName = (projectId: string) => {
    const project = mockProjects.find(p => p.id === projectId);
    return project?.name || 'Projet inconnu';
  };

  const handleStatusChange = (taskId: string, newStatus: string) => {
    // Mock status change - in real app would update backend
    console.log(`Changing task ${taskId} status to ${newStatus}`);
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Tâches</h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              Gérez toutes vos tâches et suivez leur progression
            </p>
          </div>
          <Button variant="gradient" asChild className="w-full sm:w-auto">
            <Link to="/tasks/new">
              <Plus className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">Nouvelle tâche</span>
            </Link>
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher une tâche..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[100px] sm:w-[140px]">
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="todo">À faire</SelectItem>
                <SelectItem value="in-progress">En cours</SelectItem>
                <SelectItem value="done">Terminé</SelectItem>
              </SelectContent>
            </Select>

            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-[100px] sm:w-[140px]">
                <SelectValue placeholder="Priorité" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes priorités</SelectItem>
                <SelectItem value="high">Haute</SelectItem>
                <SelectItem value="medium">Moyenne</SelectItem>
                <SelectItem value="low">Basse</SelectItem>
              </SelectContent>
            </Select>

            <Select value={assigneeFilter} onValueChange={setAssigneeFilter}>
              <SelectTrigger className="w-[100px] sm:w-[140px]">
                <SelectValue placeholder="Assigné à" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous</SelectItem>
                <SelectItem value="me">Mes tâches</SelectItem>
                <SelectItem value="unassigned">Non assigné</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Task Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-card shadow-taskflow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total</p>
                  <p className="text-2xl font-bold">{mockTasks.length}</p>
                </div>
                <Clock className="w-8 h-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-taskflow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">À faire</p>
                  <p className="text-2xl font-bold text-secondary">
                    {mockTasks.filter(t => t.status === 'todo').length}
                  </p>
                </div>
                <Clock className="w-8 h-8 text-secondary" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-taskflow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">En cours</p>
                  <p className="text-2xl font-bold text-warning">
                    {mockTasks.filter(t => t.status === 'in-progress').length}
                  </p>
                </div>
                <AlertTriangle className="w-8 h-8 text-warning" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-taskflow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Terminées</p>
                  <p className="text-2xl font-bold text-success">
                    {mockTasks.filter(t => t.status === 'done').length}
                  </p>
                </div>
                <CheckCircle className="w-8 h-8 text-success" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tasks List */}
        <div className="space-y-4">
          {filteredTasks.map((task) => (
            <Card key={task.id} className="shadow-taskflow-md hover:shadow-taskflow-lg transition-smooth">
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="flex-1 space-y-3">
                    {/* Task Header */}
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(task.status)}
                        <h3 className="font-semibold text-lg">{task.title}</h3>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={getStatusColor(task.status) as any}>
                          {task.status === 'todo' ? 'À faire' : 
                           task.status === 'in-progress' ? 'En cours' : 'Terminé'}
                        </Badge>
                        <Badge variant={getPriorityColor(task.priority) as any}>
                          {getPriorityIcon(task.priority)}
                          {task.priority === 'high' ? 'Haute' :
                           task.priority === 'medium' ? 'Moyenne' : 'Basse'}
                        </Badge>
                      </div>
                    </div>

                    {/* Task Description */}
                    <p className="text-muted-foreground">{task.description}</p>

                    {/* Task Meta */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Projet: {getProjectName(task.projectId)}
                      </div>
                      
                      {task.assignedTo && (
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
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
                          Échéance: {new Date(task.dueDate).toLocaleDateString('fr-FR')}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 mt-3 sm:mt-0">
                    <Select 
                      value={task.status} 
                      onValueChange={(value) => handleStatusChange(task.id, value)}
                    >
                      <SelectTrigger className="w-[100px] sm:w-[130px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="todo">À faire</SelectItem>
                        <SelectItem value="in-progress">En cours</SelectItem>
                        <SelectItem value="done">Terminé</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" asChild>
                            <Link to={`/projects/${task.projectId}`}>
                              <Eye className="w-4 h-4" />
                            </Link>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Voir le projet</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredTasks.length === 0 && (
          <div className="text-center py-12">
            <CheckCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Aucune tâche trouvée</h3>
            <p className="text-muted-foreground mb-6">
              {searchTerm || statusFilter !== 'all' || priorityFilter !== 'all' || assigneeFilter !== 'all'
                ? 'Essayez de modifier vos filtres'
                : 'Commencez par créer votre première tâche'
              }
            </p>
            <Button variant="gradient" asChild>
              <Link to="/tasks/new">
                <Plus className="w-4 h-4 mr-2" />
                Créer une tâche
              </Link>
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Tasks;