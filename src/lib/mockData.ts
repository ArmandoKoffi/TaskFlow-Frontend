// Mock data for TaskFlow application

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'admin' | 'manager' | 'member';
}

export interface Project {
  id: string;
  name: string;
  description: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  members: User[];
  tasksCount: number;
  completedTasks: number;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  assignedTo?: User;
  projectId: string;
  createdAt: string;
  updatedAt: string;
  dueDate?: string;
}

export interface Notification {
  id: string;
  type: 'task_assigned' | 'task_completed' | 'project_update' | 'mention';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  userId: string;
}

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Marie Dubois',
    email: 'marie.dubois@taskflow.com',
    avatar: '/api/placeholder/40/40',
    role: 'admin'
  },
  {
    id: '2',
    name: 'Pierre Martin',
    email: 'pierre.martin@taskflow.com',
    avatar: '/api/placeholder/40/40',
    role: 'manager'
  },
  {
    id: '3',
    name: 'Sophie Laurent',
    email: 'sophie.laurent@taskflow.com',
    avatar: '/api/placeholder/40/40',
    role: 'member'
  },
  {
    id: '4',
    name: 'Jean Moreau',
    email: 'jean.moreau@taskflow.com',
    avatar: '/api/placeholder/40/40',
    role: 'member'
  }
];

// Mock Projects
export const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Refonte Site Web',
    description: 'Modernisation complète du site web de l\'entreprise',
    color: '#6366f1',
    createdAt: '2024-01-15T09:00:00Z',
    updatedAt: '2024-03-01T14:30:00Z',
    members: [mockUsers[0], mockUsers[1], mockUsers[2]],
    tasksCount: 12,
    completedTasks: 8
  },
  {
    id: '2',
    name: 'Application Mobile',
    description: 'Développement de l\'application mobile iOS et Android',
    color: '#8b5cf6',
    createdAt: '2024-02-01T10:00:00Z',
    updatedAt: '2024-03-05T16:45:00Z',
    members: [mockUsers[1], mockUsers[2], mockUsers[3]],
    tasksCount: 18,
    completedTasks: 5
  },
  {
    id: '3',
    name: 'Campagne Marketing',
    description: 'Lancement de la nouvelle campagne publicitaire',
    color: '#10b981',
    createdAt: '2024-02-15T08:30:00Z',
    updatedAt: '2024-03-03T11:20:00Z',
    members: [mockUsers[0], mockUsers[3]],
    tasksCount: 9,
    completedTasks: 9
  }
];

// Mock Tasks
export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Conception de la maquette homepage',
    description: 'Créer les wireframes et maquettes haute fidélité pour la nouvelle homepage',
    status: 'done',
    priority: 'high',
    assignedTo: mockUsers[2],
    projectId: '1',
    createdAt: '2024-02-20T09:00:00Z',
    updatedAt: '2024-02-28T15:30:00Z',
    dueDate: '2024-03-05T23:59:59Z'
  },
  {
    id: '2',
    title: 'Développement API utilisateurs',
    description: 'Implémenter les endpoints pour la gestion des utilisateurs',
    status: 'in-progress',
    priority: 'high',
    assignedTo: mockUsers[1],
    projectId: '2',
    createdAt: '2024-02-25T10:30:00Z',
    updatedAt: '2024-03-01T14:20:00Z',
    dueDate: '2024-03-10T23:59:59Z'
  },
  {
    id: '3',
    title: 'Intégration des styles CSS',
    description: 'Appliquer les nouveaux styles selon la charte graphique',
    status: 'todo',
    priority: 'medium',
    assignedTo: mockUsers[2],
    projectId: '1',
    createdAt: '2024-03-01T11:00:00Z',
    updatedAt: '2024-03-01T11:00:00Z',
    dueDate: '2024-03-08T23:59:59Z'
  },
  {
    id: '4',
    title: 'Tests de l\'interface mobile',
    description: 'Effectuer les tests sur différents appareils et navigateurs',
    status: 'todo',
    priority: 'medium',
    assignedTo: mockUsers[3],
    projectId: '2',
    createdAt: '2024-03-02T14:15:00Z',
    updatedAt: '2024-03-02T14:15:00Z',
    dueDate: '2024-03-12T23:59:59Z'
  },
  {
    id: '5',
    title: 'Rédaction des contenus',
    description: 'Écrire les textes pour les nouvelles pages',
    status: 'done',
    priority: 'low',
    assignedTo: mockUsers[0],
    projectId: '3',
    createdAt: '2024-02-18T08:45:00Z',
    updatedAt: '2024-02-26T16:30:00Z'
  }
];

// Mock Notifications
export const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'task_assigned',
    title: 'Nouvelle tâche assignée',
    message: 'Pierre Martin vous a assigné la tâche "Tests de l\'interface mobile"',
    read: false,
    createdAt: '2024-03-02T14:15:00Z',
    userId: '3'
  },
  {
    id: '2',
    type: 'task_completed',
    title: 'Tâche terminée',
    message: 'Sophie Laurent a terminé la tâche "Conception de la maquette homepage"',
    read: false,
    createdAt: '2024-02-28T15:30:00Z',
    userId: '1'
  },
  {
    id: '3',
    type: 'project_update',
    title: 'Mise à jour du projet',
    message: 'Le projet "Campagne Marketing" a été marqué comme terminé',
    read: true,
    createdAt: '2024-03-01T10:00:00Z',
    userId: '1'
  }
];

// Current logged in user
export const currentUser = mockUsers[0];