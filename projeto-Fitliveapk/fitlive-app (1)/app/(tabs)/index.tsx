import { ScrollView, Text, View, Pressable, RefreshControl } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { ScreenContainer } from '@/components/screen-container';
import { WorkoutCard } from '@/components/workout-card';
import { mockUser, mockWorkouts } from '@/lib/mock-data';

export default function HomeScreen() {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    // Simular carregamento
    setTimeout(() => setRefreshing(false), 1000);
  };

  const handleWorkoutPress = (workoutId: string) => {
    router.push({
      pathname: '/workout-detail',
      params: { id: workoutId },
    });
  };

  const handleStartWorkout = () => {
    // Navegar para a tela de treino ao vivo
    router.push('/live-workout');
  };

  const favoriteWorkouts = mockWorkouts.filter((w) => w.isFavorite);

  return (
    <ScreenContainer className="p-0">
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View className="gap-6 p-6">
          {/* Header com Saudação */}
          <View className="gap-2">
            <Text className="text-3xl font-bold text-foreground">
              Olá, {mockUser.name}! 👋
            </Text>
            <Text className="text-base text-muted">
              Pronto para treinar?
            </Text>
          </View>

          {/* Card Principal - Treino Agora */}
          <Pressable
            onPress={handleStartWorkout}
            style={({ pressed }) => [
              {
                transform: [{ scale: pressed ? 0.98 : 1 }],
                opacity: pressed ? 0.9 : 1,
              },
            ]}
            className="bg-gradient-to-r from-primary to-orange-600 rounded-2xl p-6 gap-4"
          >
            <View>
              <Text className="text-2xl font-bold text-white">
                Comece um Treino Agora
              </Text>
              <Text className="text-sm text-white opacity-90 mt-1">
                Conecte-se com seu instrutor ao vivo
              </Text>
            </View>
            <View className="flex-row items-center justify-between">
              <Text className="text-4xl">🎥</Text>
              <View className="bg-white bg-opacity-20 rounded-full px-4 py-2">
                <Text className="text-white font-semibold">Iniciar →</Text>
              </View>
            </View>
          </Pressable>

          {/* Estatísticas Rápidas */}
          <View className="flex-row gap-3">
            <View className="flex-1 bg-surface rounded-xl p-4 border border-border">
              <Text className="text-xs text-muted font-semibold uppercase">
                Sessões
              </Text>
              <Text className="text-2xl font-bold text-foreground mt-1">
                {mockUser.totalSessions}
              </Text>
            </View>
            <View className="flex-1 bg-surface rounded-xl p-4 border border-border">
              <Text className="text-xs text-muted font-semibold uppercase">
                Tempo Total
              </Text>
              <Text className="text-2xl font-bold text-foreground mt-1">
                {Math.floor(mockUser.totalDuration / 3600)}h
              </Text>
            </View>
          </View>

          {/* Treinos Favoritos */}
          {favoriteWorkouts.length > 0 && (
            <View className="gap-3">
              <Text className="text-lg font-bold text-foreground">
                Meus Favoritos ❤️
              </Text>
              {favoriteWorkouts.map((workout) => (
                <WorkoutCard
                  key={workout.id}
                  workout={workout}
                  onPress={() => handleWorkoutPress(workout.id)}
                />
              ))}
            </View>
          )}

          {/* Treinos Recomendados */}
          <View className="gap-3">
            <View className="flex-row justify-between items-center">
              <Text className="text-lg font-bold text-foreground">
                Treinos Disponíveis
              </Text>
              <Pressable
                onPress={() => router.push('/workouts')}
                style={({ pressed }) => [
                  {
                    opacity: pressed ? 0.6 : 1,
                  },
                ]}
              >
                <Text className="text-primary font-semibold">Ver Todos</Text>
              </Pressable>
            </View>
            {mockWorkouts.slice(0, 2).map((workout) => (
              <WorkoutCard
                key={workout.id}
                workout={workout}
                onPress={() => handleWorkoutPress(workout.id)}
              />
            ))}
          </View>

          {/* Espaço para Tab Bar */}
          <View className="h-8" />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
