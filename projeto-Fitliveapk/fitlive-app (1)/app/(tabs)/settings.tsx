import { ScrollView, Text, View, Pressable } from 'react-native';
import { ScreenContainer } from '@/components/screen-container';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { mockUser } from '@/lib/mock-data';

export default function SettingsScreen() {
  const colorScheme = useColorScheme();

  return (
    <ScreenContainer className="p-6">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="gap-6 flex-1">
          <View>
            <Text className="text-3xl font-bold text-foreground">
              Configurações
            </Text>
            <Text className="text-base text-muted mt-1">
              Personalize sua experiência
            </Text>
          </View>

          {/* Perfil */}
          <View className="gap-3">
            <Text className="text-lg font-bold text-foreground">
              Perfil
            </Text>
            <View className="bg-surface rounded-xl p-4 border border-border gap-3">
              <View className="gap-1">
                <Text className="text-xs text-muted font-semibold uppercase">
                  Nome
                </Text>
                <Text className="text-base text-foreground font-semibold">
                  {mockUser.name}
                </Text>
              </View>
              {mockUser.email && (
                <View className="gap-1 pt-3 border-t border-border">
                  <Text className="text-xs text-muted font-semibold uppercase">
                    Email
                  </Text>
                  <Text className="text-base text-foreground">
                    {mockUser.email}
                  </Text>
                </View>
              )}
            </View>
          </View>

          {/* Preferências */}
          <View className="gap-3">
            <Text className="text-lg font-bold text-foreground">
              Preferências
            </Text>
            <View className="bg-surface rounded-xl p-4 border border-border gap-3">
              <View className="flex-row justify-between items-center">
                <Text className="text-base text-foreground">
                  Modo Escuro
                </Text>
                <Text className="text-sm text-muted">
                  {colorScheme === 'dark' ? 'Ativado' : 'Desativado'}
                </Text>
              </View>
              <View className="flex-row justify-between items-center pt-3 border-t border-border">
                <Text className="text-base text-foreground">
                  Notificações
                </Text>
                <Text className="text-sm text-muted">
                  Ativadas
                </Text>
              </View>
            </View>
          </View>

          {/* Sobre */}
          <View className="gap-3">
            <Text className="text-lg font-bold text-foreground">
              Sobre
            </Text>
            <View className="bg-surface rounded-xl p-4 border border-border gap-3">
              <View className="gap-1">
                <Text className="text-xs text-muted font-semibold uppercase">
                  Versão
                </Text>
                <Text className="text-base text-foreground font-semibold">
                  1.0.0
                </Text>
              </View>
              <View className="gap-1 pt-3 border-t border-border">
                <Text className="text-xs text-muted font-semibold uppercase">
                  Desenvolvido com
                </Text>
                <Text className="text-base text-foreground">
                  React Native + Expo
                </Text>
              </View>
            </View>
          </View>

          {/* Botão de Sair */}
          <Pressable
            style={({ pressed }) => [
              {
                transform: [{ scale: pressed ? 0.98 : 1 }],
                opacity: pressed ? 0.8 : 1,
              },
            ]}
            className="bg-error rounded-lg py-3 items-center mt-4"
          >
            <Text className="text-white font-semibold">
              Sair
            </Text>
          </Pressable>

          <View className="h-8" />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
