import { ScrollView, Text, View, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenContainer } from '@/components/screen-container';
import { WorkoutCard } from '@/components/workout-card';
import { mockWorkouts } from '@/lib/mock-data';

export default function WorkoutsScreen() {
  const router = useRouter();

  const handleWorkoutPress = (workoutId: string) => {
    router.push({
      pathname: '/workout-detail',
      params: { id: workoutId },
    });
  };

  return (
    <ScreenContainer className="p-6">
      <View className="gap-4 flex-1">
        <View>
          <Text className="text-3xl font-bold text-foreground">
            Treinos
          </Text>
          <Text className="text-base text-muted mt-1">
            Escolha um treino para começar
          </Text>
        </View>

        <FlatList
          data={mockWorkouts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <WorkoutCard
              workout={item}
              onPress={() => handleWorkoutPress(item.id)}
              className="mb-3"
            />
          )}
          scrollEnabled={false}
          contentContainerStyle={{ gap: 12 }}
        />
      </View>
    </ScreenContainer>
  );
}
