import React, { useEffect, useState } from 'react';
import { View, Text, Platform, Pressable } from 'react-native';
import { cn } from '@/lib/utils';

interface JitsiMeetViewProps {
  roomName: string;
  displayName: string;
  onConferenceTerminated?: () => void;
  className?: string;
}

/**
 * Componente wrapper para Jitsi Meet
 * 
 * Nota: A integração completa do Jitsi Meet requer configuração nativa adicional
 * Este componente fornece um placeholder e estrutura para integração futura
 */
export function JitsiMeetView({
  roomName,
  displayName,
  onConferenceTerminated,
  className,
}: JitsiMeetViewProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);

  useEffect(() => {
    // Simular conexão com Jitsi
    const timer = setTimeout(() => {
      setIsConnected(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleLeaveConference = () => {
    setIsConnected(false);
    onConferenceTerminated?.();
  };

  // Placeholder para desenvolvimento
  // Em produção, isso seria substituído pela integração real do Jitsi Meet
  if (Platform.OS === 'web') {
    return (
      <View className={cn('bg-surface items-center justify-center gap-4', className)}>
        <Text className="text-4xl">🎥</Text>
        <View className="items-center gap-2">
          <Text className="text-lg font-semibold text-foreground">
            Jitsi Meet
          </Text>
          <Text className="text-sm text-muted">
            Sala: {roomName}
          </Text>
          <Text className="text-sm text-muted">
            Usuário: {displayName}
          </Text>
          {isConnected && (
            <Text className="text-xs text-success font-semibold mt-2">
              ✓ Conectado
            </Text>
          )}
        </View>

        {/* Controles de Vídeo */}
        {isConnected && (
          <View className="flex-row gap-2 mt-4">
            <Pressable
              onPress={() => setIsMuted(!isMuted)}
              style={({ pressed }) => [
                {
                  opacity: pressed ? 0.7 : 1,
                },
              ]}
              className={cn(
                'rounded-full w-12 h-12 items-center justify-center',
                isMuted ? 'bg-error' : 'bg-primary'
              )}
            >
              <Text className="text-xl">
                {isMuted ? '🔇' : '🎤'}
              </Text>
            </Pressable>

            <Pressable
              onPress={() => setIsCameraOff(!isCameraOff)}
              style={({ pressed }) => [
                {
                  opacity: pressed ? 0.7 : 1,
                },
              ]}
              className={cn(
                'rounded-full w-12 h-12 items-center justify-center',
                isCameraOff ? 'bg-error' : 'bg-primary'
              )}
            >
              <Text className="text-xl">
                {isCameraOff ? '📹' : '📷'}
              </Text>
            </Pressable>

            <Pressable
              onPress={handleLeaveConference}
              style={({ pressed }) => [
                {
                  opacity: pressed ? 0.7 : 1,
                },
              ]}
              className="rounded-full w-12 h-12 items-center justify-center bg-error"
            >
              <Text className="text-xl">📞</Text>
            </Pressable>
          </View>
        )}
      </View>
    );
  }

  // Para Android/iOS, seria necessário usar react-native-jitsi-meet
  // com configuração nativa adicional
  return (
    <View className={cn('bg-surface items-center justify-center gap-4', className)}>
      <Text className="text-4xl">🎥</Text>
      <View className="items-center gap-2">
        <Text className="text-lg font-semibold text-foreground">
          Jitsi Meet
        </Text>
        <Text className="text-sm text-muted">
          Sala: {roomName}
        </Text>
        <Text className="text-sm text-muted">
          Usuário: {displayName}
        </Text>
        <Text className="text-xs text-muted mt-4 text-center px-4">
          A integração nativa do Jitsi Meet requer configuração adicional
          no projeto Android/iOS
        </Text>
      </View>
    </View>
  );
}
