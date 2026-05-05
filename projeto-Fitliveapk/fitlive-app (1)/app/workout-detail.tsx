import { ScrollView, Text, View, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ScreenContainer } from '@/components/screen-container';
import { mockWorkouts } from '@/lib/mock-data';

export default function WorkoutDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const workout = mockWorkouts.find((w) => w.id === id);

  if (!workout) {
    return (
      <ScreenContainer className="items-center justify-center p-6">
        <Text className="text-lg text-foreground font-semibold">
          Treino não encontrado
        </Text>
      </ScreenContainer>
    );
  }

  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    return `${mins} minutos`;
  };

  const getDifficultyColor = (difficulty: string): string => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-blue-100 text-blue-800';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const difficultyLabel = {
    beginner: 'Iniciante',
    intermediate: 'Intermediário',
    advanced: 'Avançado',
  }[workout.difficulty];

  return (
    <ScreenContainer className="p-0">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="gap-6 p-6">
          {/* Header */}
          <Pressable
            onPress={() => router.back()}
            style={({ pressed }) => [
              {
                opacity: pressed ? 0.6 : 1,
              },
            ]}
            className="flex-row items-center gap-2"
          >
            <Text className="text-2xl">←</Text>
            <Text className="text-base text-primary font-semibold">
              Voltar
            </Text>
          </Pressable>

          {/* Título e Info */}
          <View className="gap-4">
            <View className="gap-2">
              <Text className="text-3xl font-bold text-foreground">
                {workout.name}
              </Text>
              {workout.instructor && (
                <Text className="text-base text-muted">
                  Instrutor: {workout.instructor}
                </Text>
              )}
            </View>

            {/* Dificuldade e Duração */}
            <View className="flex-row gap-3">
              <View className={`rounded-full px-3 py-1 ${getDifficultyColor(workout.difficulty)}`}>
                <Text className="text-xs font-semibold">
                  {difficultyLabel}
                </Text>
              </View>
              <View className="bg-surface rounded-full px-3 py-1 border border-border">
                <Text className="text-xs font-semibold text-foreground">
                  ⏱️ {formatDuration(workout.estimatedDuration)}
                </Text>
              </View>
            </View>
          </View>

          {/* Descrição */}
          {workout.description && (
            <View className="bg-surface rounded-xl p-4 border border-border">
              <Text className="text-base text-foreground leading-relaxed">
                {workout.description}
              </Text>
            </View>
          )}

          {/* Exercícios */}
          <View className="gap-3">
            <Text className="text-lg font-bold text-foreground">
              Exercícios ({workout.exercises.length})
            </Text>
            <View className="gap-2">
              {workout.exercises.map((exercise, index) => (
                <View
                  key={exercise.id}
                  className="bg-surface rounded-lg p-4 border border-border flex-row items-start gap-3"
                >
                  <View className="bg-primary rounded-full w-8 h-8 items-center justify-center">
                    <Text className="text-white font-bold text-sm">
                      {index + 1}
                    </Text>
                  </View>
                  <View className="flex-1 gap-1">
                    <Text className="text-base font-semibold text-foreground">
                      {exercise.name}
                    </Text>
                    {exercise.description && (
                      <Text className="text-sm text-muted">
                        {exercise.description}
                      </Text>
                    )}
                    <View className="flex-row gap-2 mt-2">
                      <Text className="text-xs text-muted">
                        ⏱️ {exercise.duration}s
                      </Text>
                      {exercise.reps && (
                        <Text className="text-xs text-muted">
                          • {exercise.reps} reps
                        </Text>
                      )}
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Botão CTA */}
          <Pressable
            onPress={() => router.push('/live-workout')}
            style={({ pressed }) => [
              {
                transform: [{ scale: pressed ? 0.98 : 1 }],
                opacity: pressed ? 0.9 : 1,
              },
            ]}
            className="bg-primary rounded-lg py-4 items-center mt-4"
          >
            <Text className="text-white font-bold text-lg">
              🎥 Iniciar Treino ao Vivo
            </Text>
          </Pressable>

          <View className="h-8" />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
