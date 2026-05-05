/**
 * Domain types for FitLive application
 */

export interface Exercise {
  id: string;
  name: string;
  description?: string;
  duration: number; // in seconds
  reps?: number;
  icon?: string;
}

export interface Workout {
  id: string;
  name: string;
  description?: string;
  instructor?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedDuration: number; // in seconds
  exercises: Exercise[];
  isFavorite?: boolean;
}

export interface WorkoutSession {
  id: string;
  workoutId: string;
  startTime: Date;
  endTime?: Date;
  exercises: ExerciseSession[];
  totalDuration?: number; // in seconds
  completed: boolean;
}

export interface ExerciseSession {
  id: string;
  exerciseId: string;
  exerciseName: string;
  repsCompleted: number;
  targetReps?: number;
  duration: number; // in seconds
  completed: boolean;
}

export interface User {
  id: string;
  name: string;
  email?: string;
  avatar?: string;
  totalSessions: number;
  totalDuration: number; // in seconds
}

export interface JitsiMeetConfig {
  roomName: string;
  displayName: string;
  userInfo?: {
    displayName: string;
    email?: string;
    avatar?: string;
  };
}
