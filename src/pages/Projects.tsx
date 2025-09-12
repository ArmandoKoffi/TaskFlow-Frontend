import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Users, 
  Calendar,
  CheckCircle,
  AlertCircle,
  Settings
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockProjects } from '@/lib/mockData';
import Layout from '@/components/Layout';

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const filteredProjects = mockProjects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterStatus === 'all') return matchesSearch;
    
    const completionRate = (project.completedTasks / project.tasksCount) * 100;
    const status = completionRate === 100 ? 'completed' : 
                  completionRate >= 50 ? 'in-progress' : 'started';
    
    return matchesSearch && status === filterStatus;
  });

  const getProjectStatus = (project: any) => {
    const completionRate = (project.completedTasks / project.tasksCount) * 100;
    if (completionRate === 100) return { status: 'Terminé', color: 'success' };
    if (completionRate >= 50) return { status: 'En cours', color: 'warning' };
    return { status: 'Démarré', color: 'secondary' };
  };

  const handleStatusChange = (projectId: string, newStatus: string) => {
    // Mock status change - in real app would update backend
    console.log(`Changing project ${projectId} status to ${newStatus}`);
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Projets</h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              Gérez tous vos projets en cours
            </p>
          </div>
          <Button variant="gradient" asChild className="w-full sm:w-auto">
            <Link to="/projects/new">
              <Plus className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">Nouveau projet</span>
            </Link>
          </Button>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher un projet..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 sm:mr-2" />
                  <span className="hidden sm:inline">Filtres</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => setFilterStatus('all')}>
                  Tous les projets
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterStatus('started')}>
                  Démarrés
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterStatus('in-progress')}>
                  En cours
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterStatus('completed')}>
                  Terminés
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => {
            const projectStatus = getProjectStatus(project);
            const completionRate = (project.completedTasks / project.tasksCount) * 100;
            
            return (
              <Card key={project.id} className="shadow-taskflow-md hover:shadow-taskflow-lg transition-smooth group">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: project.color }}
                    />
                    <CardTitle className="text-lg group-hover:text-primary transition-smooth">
                      <Link to={`/projects/${project.id}`}>
                        {project.name}
                      </Link>
                    </CardTitle>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {project.description}
                  </p>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Progress */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progression</span>
                      <span className="font-medium">{Math.round(completionRate)}%</span>
                    </div>
                    <Progress value={completionRate} className="h-2" />
                  </div>

                  {/* Stats */}
                  <div className="flex justify-between text-sm">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <CheckCircle className="w-4 h-4" />
                      {project.completedTasks}/{project.tasksCount} tâches
                    </div>
                    <Badge variant={projectStatus.color as any}>
                      {projectStatus.status}
                    </Badge>
                  </div>

                  {/* Team Members */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Équipe</span>
                    </div>
                    <div className="flex -space-x-2">
                      {project.members.slice(0, 3).map((member) => (
                        <Avatar key={member.id} className="w-6 h-6 border-2 border-background">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback className="text-xs">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                      {project.members.length > 3 && (
                        <div className="w-6 h-6 bg-muted rounded-full border-2 border-background flex items-center justify-center">
                          <span className="text-xs text-muted-foreground">
                            +{project.members.length - 3}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Date */}
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    Mis à jour le {new Date(project.updatedAt).toLocaleDateString('fr-FR')}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Aucun projet trouvé</h3>
            <p className="text-muted-foreground mb-6">
              {searchTerm ? 'Essayez de modifier votre recherche' : 'Commencez par créer votre premier projet'}
            </p>
            <Button variant="gradient" asChild>
              <Link to="/projects/new">
                <Plus className="w-4 h-4 mr-2" />
                Créer un projet
              </Link>
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Projects;