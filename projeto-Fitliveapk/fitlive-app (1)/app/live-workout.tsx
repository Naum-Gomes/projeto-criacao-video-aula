import { View, Text, Pressable, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { useKeepAwake } from 'expo-keep-awake';
import { ScreenContainer } from '@/components/screen-container';
import { TimerDisplay } from '@/components/timer-display';
import { RepCounter } from '@/components/rep-counter';
import { JitsiAdvanced } from '@/components/jitsi-advanced';
import { useWorkoutState } from '@/hooks/use-workout-state';
import { mockWorkouts, mockUser } from '@/lib/mock-data';

export default function LiveWorkoutScreen() {
  const router = useRouter();
  useKeepAwake(); // Manter tela ativa durante treino

  const workout = mockWorkouts[0]; // Usar primeiro treino como exemplo
  const {
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
  } = useWorkoutState();

  const currentExercise = workout.exercises[state.currentExerciseIndex];
  const isLastExercise = state.currentExerciseIndex === workout.exercises.length - 1;

  // Simular timer
  useEffect(() => {
    if (!state.isRunning || !currentExercise) return;

    const interval = setInterval(() => {
      incrementTime();
    }, 1000);

    return () => clearInterval(interval);
  }, [state.isRunning, currentExercise, incrementTime]);

  const handleEndWorkout = () => {
    endSession();
    router.push({
      pathname: '/workout-complete',
      params: {
        workoutId: workout.id,
        duration: state.timeElapsed,
      },
    });
  };

  const handleNextExercise = () => {
    if (isLastExercise) {
      handleEndWorkout();
    } else {
      nextExercise();
      resetTimer();
    }
  };

  if (!currentExercise) {
    return (
      <ScreenContainer className="items-center justify-center p-6">
        <Text className="text-lg text-foreground font-semibold">
          Treino finalizado!
        </Text>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer className="p-0">
      <View className="flex-1 bg-background">
        {/* Video Area - Jitsi Meet */}
        <View className="bg-black border-b border-border h-1/2">
          <JitsiAdvanced
            roomName={`fitlive-treino-${workout.id}`}
            displayName={mockUser.name}
            onConferenceTerminated={handleEndWorkout}
            onConferenceJoined={() => console.log('Conectado ao Jitsi Meet')}
            className="flex-1"
          />
        </View>

        {/* Controls Area */}
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <View className="gap-6 p-6">
            {/* Exercício Atual */}
            <View className="bg-surface rounded-xl p-4 border border-border gap-2">
              <Text className="text-xs text-muted font-semibold uppercase">
                Exercício {state.currentExerciseIndex + 1} de {workout.exercises.length}
              </Text>
              <Text className="text-2xl font-bold text-foreground">
                {currentExercise.name}
              </Text>
              {currentExercise.description && (
                <Text className="text-sm text-muted">
                  {currentExercise.description}
                </Text>
              )}
            </View>

            {/* Timer */}
            <View className="bg-surface rounded-xl p-4 border border-border">
              <TimerDisplay
                timeElapsed={state.timeElapsed}
                duration={currentExercise.duration}
                isRunning={state.isRunning}
                onPlayPause={() => {
                  if (!state.sessionStarted) {
                    startSession();
                  } else if (state.isRunning) {
                    pauseSession();
                  } else {
                    resumeSession();
                  }
                }}
                onReset={resetTimer}
              />
            </View>

            {/* Rep Counter */}
            {currentExercise.reps && (
              <View className="bg-surface rounded-xl p-4 border border-border">
                <RepCounter
                  repsCompleted={state.repsCompleted}
                  targetReps={currentExercise.reps}
                  onIncrement={incrementReps}
                  onDecrement={decrementReps}
                  onReset={resetReps}
                />
              </View>
            )}

            {/* Próximo Exercício */}
            <Pressable
              onPress={handleNextExercise}
              style={({ pressed }) => [
                {
                  transform: [{ scale: pressed ? 0.98 : 1 }],
                  opacity: pressed ? 0.9 : 1,
                },
              ]}
              className="bg-primary rounded-lg py-4 items-center"
            >
              <Text className="text-white font-bold text-lg">
                {isLastExercise ? '✓ Finalizar Treino' : 'Próximo Exercício →'}
              </Text>
            </Pressable>

            {/* Encerrar Treino */}
            <Pressable
              onPress={handleEndWorkout}
              style={({ pressed }) => [
                {
                  transform: [{ scale: pressed ? 0.98 : 1 }],
                  opacity: pressed ? 0.8 : 1,
                },
              ]}
              className="bg-error rounded-lg py-3 items-center"
            >
              <Text className="text-white font-semibold">
                Encerrar Treino
              </Text>
            </Pressable>

            <View className="h-4" />
          </View>
        </ScrollView>
      </View>
    </ScreenContainer>
  );
}
