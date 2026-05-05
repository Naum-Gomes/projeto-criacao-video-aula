import { useState, useCallback } from 'react';
import type { WorkoutSession, ExerciseSession } from '@/lib/types';

export interface WorkoutState {
  currentExerciseIndex: number;
  repsCompleted: number;
  timeElapsed: number;
  isRunning: boolean;
  sessionStarted: boolean;
}

export function useWorkoutState() {
  const [state, setState] = useState<WorkoutState>({
    currentExerciseIndex: 0,
    repsCompleted: 0,
    timeElapsed: 0,
    isRunning: false,
    sessionStarted: false,
  });

  const startSession = useCallback(() => {
    setState((prev) => ({
      ...prev,
      sessionStarted: true,
      isRunning: true,
    }));
  }, []);

  const pauseSession = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isRunning: false,
    }));
  }, []);

  const resumeSession = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isRunning: true,
    }));
  }, []);

  const incrementReps = useCallback(() => {
    setState((prev) => ({
      ...prev,
      repsCompleted: prev.repsCompleted + 1,
    }));
  }, []);

  const decrementReps = useCallback(() => {
    setState((prev) => ({
      ...prev,
      repsCompleted: Math.max(0, prev.repsCompleted - 1),
    }));
  }, []);

  const resetReps = useCallback(() => {
    setState((prev) => ({
      ...prev,
      repsCompleted: 0,
    }));
  }, []);

  const nextExercise = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentExerciseIndex: prev.currentExerciseIndex + 1,
      repsCompleted: 0,
      timeElapsed: 0,
    }));
  }, []);

  const resetTimer = useCallback(() => {
    setState((prev) => ({
      ...prev,
      timeElapsed: 0,
    }));
  }, []);

  const incrementTime = useCallback(() => {
    setState((prev) => ({
      ...prev,
      timeElapsed: prev.timeElapsed + 1,
    }));
  }, []);

  const endSession = useCallback(() => {
    setState({
      currentExerciseIndex: 0,
      repsCompleted: 0,
      timeElapsed: 0,
      isRunning: false,
      sessionStarted: false,
    });
  }, []);

  return {
    state,
    startSession,
    pauseSession,
    resumeSession,
    incrementReps,
    decrementReps,
    resetReps,
    nextExercise,
    resetTimer,
    incrementTime,
    endSession,
  };
}
