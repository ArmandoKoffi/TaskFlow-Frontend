import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Plus, 
  Search, 
  Mail, 
  Phone, 
  MoreHorizontal,
  UserPlus,
  Shield,
  Clock,
  CheckCircle,
  Settings,
  User,
  MessageSquare
} from 'lucide-react';
import { mockUsers, mockTasks, currentUser } from '@/lib/mockData';
import Layout from '@/components/Layout';
import { useToast } from '@/hooks/use-toast';
import UserProfileModal from '@/components/UserProfileModal';
import MessageModal from '@/components/MessageModal';

const Team = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('member');
  const [selectedUserForProfile, setSelectedUserForProfile] = useState<any>(null);
  const [selectedUserForMessage, setSelectedUserForMessage] = useState<any>(null);
  const { toast } = useToast();

  const handleMessageUser = (user: any) => {
    toast({
      title: "Message envoyé",
      description: `Message envoyé à ${user.name}`,
      variant: "default"
    });
  };

  const handleViewProfile = (user: any) => {
    toast({
      title: "Profil consulté",
      description: `Affichage du profil de ${user.name}`,
      variant: "default"
    });
  };

  const handleManageUser = (user: any) => {
    toast({
      title: "Gestion utilisateur",
      description: `Options de gestion pour ${user.name}`,
      variant: "default"
    });
  };

  const filteredUsers = mockUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInviteUser = () => {
    // Mock invite functionality
    toast({
      title: "Invitation envoyée",
      description: `Une invitation a été envoyée à ${inviteEmail}`,
      variant: "default"
    });
    
    setInviteEmail('');
    setInviteRole('member');
    setIsInviteDialogOpen(false);
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'destructive';
      case 'manager': return 'warning';
      case 'member': return 'secondary';
      default: return 'secondary';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return <Shield className="w-4 h-4" />;
      case 'manager': return <Settings className="w-4 h-4" />;
      case 'member': return <CheckCircle className="w-4 h-4" />;
      default: return <CheckCircle className="w-4 h-4" />;
    }
  };

  const getUserStats = (userId: string) => {
    const userTasks = mockTasks.filter(task => task.assignedTo?.id === userId);
    const completedTasks = userTasks.filter(task => task.status === 'done').length;
    const inProgressTasks = userTasks.filter(task => task.status === 'in-progress').length;
    
    return {
      total: userTasks.length,
      completed: completedTasks,
      inProgress: inProgressTasks
    };
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Équipe</h1>
            <p className="text-muted-foreground">
              Gérez les membres de votre équipe et leurs permissions
            </p>
          </div>
          
          <Dialog open={isInviteDialogOpen} onOpenChange={setIsInviteDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="gradient">
                <UserPlus className="w-4 h-4 mr-2" />
                Inviter un membre
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Inviter un nouveau membre</DialogTitle>
                <DialogDescription>
                  Envoyez une invitation à un nouveau membre de l'équipe
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Adresse email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="nom@exemple.com"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Rôle</Label>
                  <Select value={inviteRole} onValueChange={setInviteRole}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un rôle" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="member">Membre</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                      <SelectItem value="admin">Administrateur</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsInviteDialogOpen(false)}>
                  Annuler
                </Button>
                <Button onClick={handleInviteUser} disabled={!inviteEmail}>
                  Envoyer l'invitation
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher un membre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Team Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-card shadow-taskflow-md">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Total des membres</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{mockUsers.length}</div>
              <p className="text-sm text-muted-foreground">membres actifs</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-taskflow-md">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Administrateurs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-warning">
                {mockUsers.filter(u => u.role === 'admin').length}
              </div>
              <p className="text-sm text-muted-foreground">avec accès complet</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-taskflow-md">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Managers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-secondary">
                {mockUsers.filter(u => u.role === 'manager').length}
              </div>
              <p className="text-sm text-muted-foreground">responsables d'équipe</p>
            </CardContent>
          </Card>
        </div>

        {/* Team Members List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((user) => {
            const userStats = getUserStats(user.id);
            const isCurrentUser = user.id === currentUser.id;
            
            return (
              <Card key={user.id} className={`shadow-taskflow-md hover:shadow-taskflow-lg transition-smooth ${isCurrentUser ? 'ring-2 ring-primary' : ''}`}>
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>
                          {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold flex items-center gap-2">
                          {user.name}
                          {isCurrentUser && (
                            <Badge variant="outline" className="text-xs">Vous</Badge>
                          )}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant={getRoleColor(user.role) as any}>
                            {getRoleIcon(user.role)}
                            {user.role === 'admin' ? 'Admin' : 
                             user.role === 'manager' ? 'Manager' : 'Membre'}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => handleManageUser(user)}>
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Contact Info */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="w-4 h-4" />
                      <span className="truncate">{user.email}</span>
                    </div>
                  </div>

                  {/* Task Stats */}
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <div className="text-lg font-semibold">{userStats.total}</div>
                      <div className="text-xs text-muted-foreground">Total</div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-warning">{userStats.inProgress}</div>
                      <div className="text-xs text-muted-foreground">En cours</div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-success">{userStats.completed}</div>
                      <div className="text-xs text-muted-foreground">Terminées</div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2 border-t">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon" className="sm:hidden">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Actions</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setSelectedUserForMessage(user)}>
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Message
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setSelectedUserForProfile(user)}>
                          <User className="w-4 h-4 mr-2" />
                          Profil
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleManageUser(user)}>
                          <Settings className="w-4 h-4 mr-2" />
                          Gérer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    
                    <div className="hidden sm:flex gap-2 flex-1">
                      <Button variant="outline" size="sm" className="flex-1" onClick={() => setSelectedUserForMessage(user)}>
                        <Mail className="w-3 h-3 mr-1" />
                        Message
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1" onClick={() => setSelectedUserForProfile(user)}>
                        Profil
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <UserPlus className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Aucun membre trouvé</h3>
            <p className="text-muted-foreground mb-6">
              {searchTerm ? 'Essayez de modifier votre recherche' : 'Commencez par inviter des membres à votre équipe'}
            </p>
            <Button variant="gradient" onClick={() => setIsInviteDialogOpen(true)}>
              <UserPlus className="w-4 h-4 mr-2" />
              Inviter un membre
            </Button>
          </div>
        )}
      </div>
      
      {/* Modals */}
      <UserProfileModal
        user={selectedUserForProfile}
        isOpen={!!selectedUserForProfile}
        onClose={() => setSelectedUserForProfile(null)}
      />
      <MessageModal
        user={selectedUserForMessage}
        isOpen={!!selectedUserForMessage}
        onClose={() => setSelectedUserForMessage(null)}
      />
    </Layout>
  );
};

export default Team;