import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Plus, 
  Calendar, 
  Users, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  TrendingUp,
  Target,
  Activity
} from 'lucide-react';
import { mockProjects, mockTasks, currentUser } from '@/lib/mockData';
import Layout from '@/components/Layout';

const Dashboard = () => {
  const myTasks = mockTasks.filter(task => task.assignedTo?.id === currentUser.id);
  const todoTasks = myTasks.filter(task => task.status === 'todo');
  const inProgressTasks = myTasks.filter(task => task.status === 'in-progress');
  const completedTasks = myTasks.filter(task => task.status === 'done');

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

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Bonjour, {currentUser.name} 👋
            </h1>
            <p className="text-muted-foreground">
              Voici un aperçu de vos projets et tâches
            </p>
          </div>
          <Button variant="gradient" asChild>
            <Link to="/projects/new">
              <Plus className="w-4 h-4 mr-2" />
              Nouveau projet
            </Link>
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-card shadow-taskflow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Projets actifs</CardTitle>
              <Target className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockProjects.length}</div>
              <p className="text-xs text-muted-foreground">
                +2 ce mois-ci
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-taskflow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tâches à faire</CardTitle>
              <Clock className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{todoTasks.length}</div>
              <p className="text-xs text-muted-foreground">
                {inProgressTasks.length} en cours
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-taskflow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tâches terminées</CardTitle>
              <CheckCircle className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedTasks.length}</div>
              <p className="text-xs text-muted-foreground">
                Cette semaine
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-taskflow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Productivité</CardTitle>
              <TrendingUp className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">85%</div>
              <p className="text-xs text-muted-foreground">
                +12% vs la semaine dernière
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Projects */}
          <Card className="shadow-taskflow-md">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-primary" />
                  Projets récents
                </CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/projects">Voir tout</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockProjects.slice(0, 3).map((project) => (
                <div key={project.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: project.color }}
                    />
                    <div>
                      <h4 className="font-medium">{project.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {project.members.length} membres
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">
                      {project.completedTasks}/{project.tasksCount}
                    </div>
                    <Progress 
                      value={(project.completedTasks / project.tasksCount) * 100} 
                      className="w-16 h-2"
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* My Tasks */}
          <Card className="shadow-taskflow-md">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  Mes tâches
                </CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/tasks">Voir tout</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {myTasks.slice(0, 4).map((task) => (
                <div key={task.id} className="flex items-start justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex-1">
                    <h4 className="font-medium mb-1">{task.title}</h4>
                    <div className="flex items-center gap-2">
                      <Badge variant={getStatusColor(task.status) as any}>
                        {task.status === 'todo' ? 'À faire' : 
                         task.status === 'in-progress' ? 'En cours' : 'Terminé'}
                      </Badge>
                      <Badge variant={getPriorityColor(task.priority) as any}>
                        {task.priority === 'high' ? 'Haute' :
                         task.priority === 'medium' ? 'Moyenne' : 'Basse'}
                      </Badge>
                    </div>
                  </div>
                  {task.dueDate && (
                    <div className="text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3 inline mr-1" />
                      {new Date(task.dueDate).toLocaleDateString('fr-FR')}
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="shadow-taskflow-md">
          <CardHeader>
            <CardTitle>Actions rapides</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-20 flex-col" asChild>
                <Link to="/projects/new">
                  <Plus className="w-6 h-6 mb-2" />
                  Créer un projet
                </Link>
              </Button>
              <Button variant="outline" className="h-20 flex-col" asChild>
                <Link to="/tasks/new">
                  <Clock className="w-6 h-6 mb-2" />
                  Ajouter une tâche
                </Link>
              </Button>
              <Button variant="outline" className="h-20 flex-col" asChild>
                <Link to="/team">
                  <Users className="w-6 h-6 mb-2" />
                  Inviter l'équipe
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Dashboard;