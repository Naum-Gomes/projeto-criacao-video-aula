import { ScrollView, Text, View, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ScreenContainer } from '@/components/screen-container';
import { mockWorkouts } from '@/lib/mock-data';

export default function WorkoutCompleteScreen() {
  const { workoutId, duration } = useLocalSearchParams<{
    workoutId?: string;
    duration?: string;
  }>();
  const router = useRouter();

  const workout = workoutId
    ? mockWorkouts.find((w) => w.id === workoutId)
    : mockWorkouts[0];
  const durationSeconds = parseInt(duration || '0', 10);

  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const handleBackHome = () => {
    router.push('/(tabs)');
  };

  return (
    <ScreenContainer className="p-0">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 items-center justify-center gap-6 p-6">
          {/* Celebração */}
          <View className="items-center gap-2">
            <Text className="text-7xl">🎉</Text>
            <Text className="text-3xl font-bold text-foreground">
              Parabéns!
            </Text>
            <Text className="text-lg text-muted text-center">
              Você completou o treino
            </Text>
          </View>

          {/* Resumo */}
          <View className="w-full bg-surface rounded-2xl p-6 border border-border gap-4">
            <View className="gap-2">
              <Text className="text-xs text-muted font-semibold uppercase">
                Treino
              </Text>
              <Text className="text-xl font-bold text-foreground">
                {workout?.name}
              </Text>
            </View>

            <View className="gap-2 pt-4 border-t border-border">
              <Text className="text-xs text-muted font-semibold uppercase">
                Duração
              </Text>
              <Text className="text-2xl font-bold text-primary">
                {formatDuration(durationSeconds)}
              </Text>
            </View>

            {workout && (
              <>
                <View className="gap-2 pt-4 border-t border-border">
                  <Text className="text-xs text-muted font-semibold uppercase">
                    Exercícios Completados
                  </Text>
                  <Text className="text-2xl font-bold text-foreground">
                    {workout.exercises.length}
                  </Text>
                </View>

                <View className="gap-2 pt-4 border-t border-border">
                  <Text className="text-xs text-muted font-semibold uppercase">
                    Dificuldade
                  </Text>
                  <Text className="text-base font-semibold text-foreground capitalize">
                    {workout.difficulty === 'beginner'
                      ? 'Iniciante'
                      : workout.difficulty === 'intermediate'
                        ? 'Intermediário'
                        : 'Avançado'}
                  </Text>
                </View>
              </>
            )}
          </View>

          {/* Estatísticas */}
          <View className="w-full flex-row gap-3">
            <View className="flex-1 bg-success bg-opacity-10 rounded-xl p-4 border border-success border-opacity-20 items-center gap-1">
              <Text className="text-2xl">✓</Text>
              <Text className="text-xs text-muted font-semibold">
                Concluído
              </Text>
            </View>
            <View className="flex-1 bg-primary bg-opacity-10 rounded-xl p-4 border border-primary border-opacity-20 items-center gap-1">
              <Text className="text-2xl">⏱️</Text>
              <Text className="text-xs text-muted font-semibold">
                {Math.floor(durationSeconds / 60)} min
              </Text>
            </View>
          </View>

          {/* Botões */}
          <View className="w-full gap-3 pt-4">
            <Pressable
              onPress={handleBackHome}
              style={({ pressed }) => [
                {
                  transform: [{ scale: pressed ? 0.98 : 1 }],
                  opacity: pressed ? 0.9 : 1,
                },
              ]}
              className="bg-primary rounded-lg py-4 items-center"
            >
              <Text className="text-white font-bold text-lg">
                Voltar ao Home
              </Text>
            </Pressable>

            <Pressable
              onPress={() => router.push('/(tabs)/workouts')}
              style={({ pressed }) => [
                {
                  transform: [{ scale: pressed ? 0.98 : 1 }],
                  opacity: pressed ? 0.8 : 1,
                },
              ]}
              className="bg-surface rounded-lg py-4 items-center border border-border"
            >
              <Text className="text-foreground font-semibold text-lg">
                Escolher Outro Treino
              </Text>
            </Pressable>
          </View>

          <View className="h-8" />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
