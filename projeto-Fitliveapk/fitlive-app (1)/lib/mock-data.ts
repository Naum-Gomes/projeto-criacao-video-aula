import type { Workout, User } from './types';

export const mockUser: User = {
  id: '1',
  name: 'João Silva',
  email: 'joao@example.com',
  totalSessions: 12,
  totalDuration: 3600, // 1 hour
};

export const mockWorkouts: Workout[] = [
  {
    id: '1',
    name: 'Treino de Força - Peito e Costas',
    description: 'Sessão completa focada em força para peito e costas',
    instructor: 'Carlos Personal',
    difficulty: 'intermediate',
    estimatedDuration: 1800, // 30 minutes
    isFavorite: true,
    exercises: [
      {
        id: 'ex1',
        name: 'Flexão',
        description: 'Flexões no chão',
        duration: 60,
        reps: 12,
      },
      {
        id: 'ex2',
        name: 'Rosca Direta',
        description: 'Rosca com halteres',
        duration: 60,
        reps: 10,
      },
      {
        id: 'ex3',
        name: 'Agachamento',
        description: 'Agachamento livre',
        duration: 60,
        reps: 15,
      },
      {
        id: 'ex4',
        name: 'Prancha',
        description: 'Prancha frontal',
        duration: 45,
      },
    ],
  },
  {
    id: '2',
    name: 'HIIT - Queima de Calorias',
    description: 'Treino intervalado de alta intensidade',
    instructor: 'Marina Coach',
    difficulty: 'advanced',
    estimatedDuration: 1200, // 20 minutes
    isFavorite: false,
    exercises: [
      {
        id: 'ex5',
        name: 'Burpee',
        description: 'Burpee completo',
        duration: 30,
        reps: 10,
      },
      {
        id: 'ex6',
        name: 'Mountain Climber',
        description: 'Mountain climber rápido',
        duration: 30,
        reps: 20,
      },
      {
        id: 'ex7',
        name: 'Jump Squat',
        description: 'Agachamento com salto',
        duration: 30,
        reps: 12,
      },
      {
        id: 'ex8',
        name: 'Descanso',
        description: 'Intervalo de recuperação',
        duration: 60,
      },
    ],
  },
  {
    id: '3',
    name: 'Yoga Matinal',
    description: 'Sessão relaxante de yoga para começar o dia',
    instructor: 'Ana Yoga',
    difficulty: 'beginner',
    estimatedDuration: 900, // 15 minutes
    isFavorite: false,
    exercises: [
      {
        id: 'ex9',
        name: 'Alongamento',
        description: 'Alongamento geral',
        duration: 120,
      },
      {
        id: 'ex10',
        name: 'Postura do Gato',
        description: 'Cat pose',
        duration: 60,
      },
      {
        id: 'ex11',
        name: 'Postura da Cobra',
        description: 'Cobra pose',
        duration: 60,
      },
      {
        id: 'ex12',
        name: 'Meditação',
        description: 'Meditação final',
        duration: 300,
      },
    ],
  },
];
