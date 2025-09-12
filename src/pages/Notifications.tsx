import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Bell, 
  CheckCircle, 
  Clock, 
  Users, 
  MessageSquare,
  Settings,
  Trash2
} from 'lucide-react';
import { mockNotifications, mockUsers, currentUser } from '@/lib/mockData';
import Layout from '@/components/Layout';
import { useToast } from '@/hooks/use-toast';

const Notifications = () => {
  const [notifications, setNotifications] = useState(mockNotifications);
  const { toast } = useToast();

  const handleNotificationSettings = () => {
    toast({
      title: "Paramètres de notification",
      description: "Ouverture des paramètres de notification",
      variant: "default"
    });
  };

  const handleMarkAsRead = (notificationId: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
    
    toast({
      title: "Notification marquée comme lue",
      variant: "default"
    });
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, read: true }))
    );
    
    toast({
      title: "Toutes les notifications marquées comme lues",
      variant: "default"
    });
  };

  const handleDeleteNotification = (notificationId: string) => {
    setNotifications(prev =>
      prev.filter(notif => notif.id !== notificationId)
    );
    
    toast({
      title: "Notification supprimée",
      variant: "default"
    });
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'task_assigned': return <Clock className="w-5 h-5 text-warning" />;
      case 'task_completed': return <CheckCircle className="w-5 h-5 text-success" />;
      case 'project_update': return <Users className="w-5 h-5 text-primary" />;
      case 'mention': return <MessageSquare className="w-5 h-5 text-secondary" />;
      default: return <Bell className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getNotificationTypeLabel = (type: string) => {
    switch (type) {
      case 'task_assigned': return 'Tâche assignée';
      case 'task_completed': return 'Tâche terminée';
      case 'project_update': return 'Mise à jour projet';
      case 'mention': return 'Mention';
      default: return 'Notification';
    }
  };

  const formatNotificationDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'À l\'instant';
    if (diffInHours < 24) return `Il y a ${diffInHours}h`;
    if (diffInHours < 48) return 'Hier';
    return date.toLocaleDateString('fr-FR');
  };

  const unreadCount = notifications.filter(n => !n.read).length;
  const readNotifications = notifications.filter(n => n.read);
  const unreadNotifications = notifications.filter(n => !n.read);

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
              <Bell className="w-8 h-8 text-primary" />
              Notifications
              {unreadCount > 0 && (
                <Badge variant="destructive">{unreadCount}</Badge>
              )}
            </h1>
            <p className="text-muted-foreground">
              Restez informé de toute l'activité de vos projets
            </p>
          </div>
          
          {unreadCount > 0 && (
            <Button variant="outline" onClick={handleMarkAllAsRead}>
              <CheckCircle className="w-4 h-4 mr-2" />
              Tout marquer comme lu
            </Button>
          )}
        </div>

        {/* Notification Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-card shadow-taskflow-md">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Total</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{notifications.length}</div>
              <p className="text-sm text-muted-foreground">notifications</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-taskflow-md">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Non lues</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-warning">{unreadCount}</div>
              <p className="text-sm text-muted-foreground">à traiter</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-taskflow-md">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Lues</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-success">{readNotifications.length}</div>
              <p className="text-sm text-muted-foreground">traitées</p>
            </CardContent>
          </Card>
        </div>

        {/* Notifications List */}
        <div className="space-y-6">
          {/* Unread Notifications */}
          {unreadNotifications.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4 text-foreground">
                Non lues ({unreadNotifications.length})
              </h2>
              <div className="space-y-3">
                {unreadNotifications.map((notification) => (
                  <Card 
                    key={notification.id} 
                    className="shadow-taskflow-md border-l-4 border-l-primary bg-primary-light/20"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3 flex-1">
                          {getNotificationIcon(notification.type)}
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold text-sm">{notification.title}</h4>
                              <Badge variant="secondary" className="text-xs">
                                {getNotificationTypeLabel(notification.type)}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {notification.message}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {formatNotificationDate(notification.createdAt)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleMarkAsRead(notification.id)}
                          >
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleDeleteNotification(notification.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Read Notifications */}
          {readNotifications.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4 text-foreground">
                Lues ({readNotifications.length})
              </h2>
              <div className="space-y-3">
                {readNotifications.map((notification) => (
                  <Card 
                    key={notification.id} 
                    className="shadow-taskflow-sm opacity-75 hover:opacity-100 transition-smooth"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3 flex-1">
                          {getNotificationIcon(notification.type)}
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium text-sm text-muted-foreground">
                                {notification.title}
                              </h4>
                              <Badge variant="outline" className="text-xs">
                                {getNotificationTypeLabel(notification.type)}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {notification.message}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {formatNotificationDate(notification.createdAt)}
                            </p>
                          </div>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDeleteNotification(notification.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Empty State */}
        {notifications.length === 0 && (
          <div className="text-center py-12">
            <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Aucune notification</h3>
            <p className="text-muted-foreground mb-6">
              Vous êtes à jour ! Toutes vos notifications apparaîtront ici.
            </p>
            <Button variant="outline" onClick={handleNotificationSettings}>
              <Settings className="w-4 h-4 mr-2" />
              Paramètres de notification
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Notifications;