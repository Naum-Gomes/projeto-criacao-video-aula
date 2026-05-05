import { ScrollView, Text, View } from 'react-native';
import { ScreenContainer } from '@/components/screen-container';

export default function HistoryScreen() {
  return (
    <ScreenContainer className="p-6">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="gap-4 flex-1">
          <View>
            <Text className="text-3xl font-bold text-foreground">
              Histórico
            </Text>
            <Text className="text-base text-muted mt-1">
              Acompanhe suas sessões de treino
            </Text>
          </View>

          {/* Placeholder */}
          <View className="flex-1 items-center justify-center gap-4">
            <Text className="text-4xl">📊</Text>
            <View className="items-center gap-2">
              <Text className="text-lg font-semibold text-foreground">
                Nenhuma sessão ainda
              </Text>
              <Text className="text-sm text-muted text-center">
                Comece um treino para ver seu histórico aqui
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
