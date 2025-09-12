import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  ArrowLeft,
  Calendar,
  User,
  Flag,
  FolderOpen,
  Clock,
  CheckCircle,
  AlertTriangle,
  MessageSquare,
  Edit,
  Trash2,
  Send,
  MoreHorizontal
} from 'lucide-react';
import { mockTasks, mockProjects, mockUsers, currentUser } from '@/lib/mockData';
import Layout from '@/components/Layout';
import { useToast } from '@/hooks/use-toast';

const TaskDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [newComment, setNewComment] = useState('');
  
  const task = mockTasks.find(t => t.id === id);
  const project = task ? mockProjects.find(p => p.id === task.projectId) : null;
  
  if (!task || !project) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Tâche introuvable</h1>
          <Button asChild>
            <Link to="/tasks">Retour aux tâches</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'todo': return <Clock className="w-5 h-5 text-secondary" />;
      case 'in-progress': return <AlertTriangle className="w-5 h-5 text-warning" />;
      case 'done': return <CheckCircle className="w-5 h-5 text-success" />;
      default: return <Clock className="w-5 h-5" />;
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

  const handleStatusChange = (newStatus: string) => {
    toast({
      title: "Statut mis à jour",
      description: `La tâche a été marquée comme ${newStatus === 'todo' ? 'à faire' : newStatus === 'in-progress' ? 'en cours' : 'terminée'}`,
      variant: "default"
    });
  };

  const handleDeleteTask = () => {
    toast({
      title: "Tâche supprimée",
      description: "La tâche a été supprimée avec succès",
      variant: "default"
    });
    navigate('/tasks');
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    
    toast({
      title: "Commentaire ajouté",
      description: "Votre commentaire a été ajouté avec succès",
      variant: "default"
    });
    setNewComment('');
  };

  const mockComments = [
    {
      id: '1',
      author: mockUsers[1],
      content: 'J\'ai commencé le travail sur cette tâche. Je devrais avoir terminé d\'ici vendredi.',
      createdAt: '2024-03-01T10:30:00Z'
    },
    {
      id: '2',
      author: mockUsers[0],
      content: 'Parfait ! N\'hésitez pas si vous avez besoin d\'aide.',
      createdAt: '2024-03-01T14:20:00Z'
    }
  ];

  const mockSubtasks = [
    { id: '1', title: 'Analyser les besoins', completed: true },
    { id: '2', title: 'Créer les wireframes', completed: true },
    { id: '3', title: 'Designer l\'interface', completed: false },
    { id: '4', title: 'Valider avec l\'équipe', completed: false }
  ];

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/tasks">
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </Button>
            <div className="flex items-center gap-3">
              {getStatusIcon(task.status)}
              <div>
                <h1 className="text-3xl font-bold text-foreground">{task.title}</h1>
                <div className="flex items-center gap-2 mt-1">
                  <Link 
                    to={`/projects/${project.id}`}
                    className="text-muted-foreground hover:text-primary transition-smooth flex items-center gap-1"
                  >
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: project.color }}
                    />
                    {project.name}
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" asChild>
              <Link to={`/tasks/${task.id}/edit`}>
                <Edit className="w-4 h-4 mr-2" />
                Modifier
              </Link>
            </Button>
            <Button variant="destructive" onClick={handleDeleteTask}>
              <Trash2 className="w-4 h-4 mr-2" />
              Supprimer
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Task Details */}
            <Card className="shadow-taskflow-md">
              <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {task.description || 'Aucune description fournie pour cette tâche.'}
                </p>
              </CardContent>
            </Card>

            {/* Subtasks */}
            <Card className="shadow-taskflow-md">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Sous-tâches</CardTitle>
                  <Button variant="outline" size="sm">
                    <Clock className="w-4 h-4 mr-2" />
                    Ajouter
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockSubtasks.map((subtask) => (
                  <div key={subtask.id} className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/50 transition-smooth">
                    <button className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                      subtask.completed 
                        ? 'bg-success border-success text-success-foreground' 
                        : 'border-muted-foreground hover:border-primary'
                    }`}>
                      {subtask.completed && <CheckCircle className="w-3 h-3" />}
                    </button>
                    <span className={`flex-1 ${subtask.completed ? 'line-through text-muted-foreground' : ''}`}>
                      {subtask.title}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Comments */}
            <Card className="shadow-taskflow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Commentaires ({mockComments.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Existing Comments */}
                {mockComments.map((comment) => (
                  <div key={comment.id} className="flex gap-3 p-3 rounded-md bg-muted/50">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
                      <AvatarFallback className="text-sm">
                        {comment.author.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm">{comment.author.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(comment.createdAt).toLocaleDateString('fr-FR')}
                        </span>
                      </div>
                      <p className="text-sm">{comment.content}</p>
                    </div>
                  </div>
                ))}

                {/* Add Comment */}
                <div className="border-t pt-4">
                  <div className="flex gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                      <AvatarFallback className="text-sm">
                        {currentUser.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-3">
                      <Textarea
                        placeholder="Ajouter un commentaire..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        rows={3}
                      />
                      <div className="flex justify-end">
                        <Button 
                          onClick={handleAddComment}
                          disabled={!newComment.trim()}
                          size="sm"
                        >
                          <Send className="w-4 h-4 mr-2" />
                          Commenter
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Task Status */}
            <Card className="shadow-taskflow-md">
              <CardHeader>
                <CardTitle className="text-lg">Statut</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Select value={task.status} onValueChange={handleStatusChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todo">À faire</SelectItem>
                      <SelectItem value="in-progress">En cours</SelectItem>
                      <SelectItem value="done">Terminé</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Badge variant={getStatusColor(task.status) as any} className="w-full justify-center">
                    {getStatusIcon(task.status)}
                    <span className="ml-2">
                      {task.status === 'todo' ? 'À faire' : 
                       task.status === 'in-progress' ? 'En cours' : 'Terminé'}
                    </span>
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Task Info */}
            <Card className="shadow-taskflow-md">
              <CardHeader>
                <CardTitle className="text-lg">Informations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Priority */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Priorité</span>
                  <Badge variant={getPriorityColor(task.priority) as any}>
                    <Flag className="w-3 h-3 mr-1" />
                    {task.priority === 'high' ? 'Haute' :
                     task.priority === 'medium' ? 'Moyenne' : 'Basse'}
                  </Badge>
                </div>

                {/* Assignee */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Assigné à</span>
                  {task.assignedTo ? (
                    <div className="flex items-center gap-2">
                      <Avatar className="w-6 h-6">
                        <AvatarImage src={task.assignedTo.avatar} alt={task.assignedTo.name} />
                        <AvatarFallback className="text-xs">
                          {task.assignedTo.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{task.assignedTo.name}</span>
                    </div>
                  ) : (
                    <span className="text-sm text-muted-foreground">Non assigné</span>
                  )}
                </div>

                {/* Due Date */}
                {task.dueDate && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Échéance</span>
                    <div className="flex items-center gap-1 text-sm">
                      <Calendar className="w-4 h-4" />
                      {new Date(task.dueDate).toLocaleDateString('fr-FR')}
                    </div>
                  </div>
                )}

                {/* Created */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Créée le</span>
                  <span className="text-sm">
                    {new Date(task.createdAt).toLocaleDateString('fr-FR')}
                  </span>
                </div>

                {/* Updated */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Modifiée le</span>
                  <span className="text-sm">
                    {new Date(task.updatedAt).toLocaleDateString('fr-FR')}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="shadow-taskflow-md">
              <CardHeader>
                <CardTitle className="text-lg">Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to={`/tasks/${task.id}/edit`}>
                    <Edit className="w-4 h-4 mr-2" />
                    Modifier la tâche
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to={`/projects/${project.id}`}>
                    <FolderOpen className="w-4 h-4 mr-2" />
                    Voir le projet
                  </Link>
                </Button>
                <Button variant="destructive" className="w-full justify-start" onClick={handleDeleteTask}>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Supprimer
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TaskDetail;
