import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { cn } from '@/lib/utils';

interface TimerDisplayProps {
  timeElapsed: number; // in seconds
  duration?: number; // in seconds
  isRunning: boolean;
  onPlayPause: () => void;
  onReset: () => void;
  className?: string;
}

export function TimerDisplay({
  timeElapsed,
  duration,
  isRunning,
  onPlayPause,
  onReset,
  className,
}: TimerDisplayProps) {
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const displayTime = formatTime(timeElapsed);
  const durationTime = duration ? formatTime(duration) : null;
  const isTimeUp = duration && timeElapsed >= duration;

  return (
    <View className={cn('items-center gap-4', className)}>
      {/* Timer Display */}
      <View className="items-center gap-2">
        <Text className="text-6xl font-bold text-primary">
          {displayTime}
        </Text>
        {durationTime && (
          <Text className="text-lg text-muted">
            de {durationTime}
          </Text>
        )}
      </View>

      {/* Status Indicator */}
      {isTimeUp && (
        <View className="bg-success rounded-full px-4 py-2">
          <Text className="text-white font-semibold text-sm">
            Tempo Completo! ✓
          </Text>
        </View>
      )}

      {/* Controls */}
      <View className="flex-row gap-3">
        <Pressable
          onPress={onPlayPause}
          style={({ pressed }) => [
            {
              transform: [{ scale: pressed ? 0.95 : 1 }],
              opacity: pressed ? 0.8 : 1,
            },
          ]}
          className="bg-primary rounded-full px-8 py-3"
        >
          <Text className="text-white font-semibold text-base">
            {isRunning ? 'Pausar' : 'Iniciar'}
          </Text>
        </Pressable>

        <Pressable
          onPress={onReset}
          style={({ pressed }) => [
            {
              transform: [{ scale: pressed ? 0.95 : 1 }],
              opacity: pressed ? 0.8 : 1,
            },
          ]}
          className="bg-surface rounded-full px-6 py-3 border border-border"
        >
          <Text className="text-foreground font-semibold text-base">
            Reset
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
