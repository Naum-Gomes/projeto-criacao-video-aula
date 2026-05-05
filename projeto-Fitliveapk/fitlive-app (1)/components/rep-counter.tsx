import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { cn } from '@/lib/utils';

interface RepCounterProps {
  repsCompleted: number;
  targetReps?: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onReset: () => void;
  className?: string;
}

export function RepCounter({
  repsCompleted,
  targetReps,
  onIncrement,
  onDecrement,
  onReset,
  className,
}: RepCounterProps) {
  const isTargetReached = targetReps && repsCompleted >= targetReps;

  return (
    <View className={cn('items-center gap-4', className)}>
      {/* Rep Display */}
      <View className="items-center gap-2">
        <Text className="text-6xl font-bold text-primary">
          {repsCompleted}
        </Text>
        {targetReps && (
          <Text className="text-lg text-muted">
            de {targetReps} repetições
          </Text>
        )}
      </View>

      {/* Status Indicator */}
      {isTargetReached && (
        <View className="bg-success rounded-full px-4 py-2">
          <Text className="text-white font-semibold text-sm">
            Meta Atingida! ✓
          </Text>
        </View>
      )}

      {/* Increment/Decrement Buttons */}
      <View className="flex-row gap-4 items-center">
        <Pressable
          onPress={onDecrement}
          disabled={repsCompleted === 0}
          style={({ pressed }) => [
            {
              transform: [{ scale: pressed ? 0.95 : 1 }],
              opacity: repsCompleted === 0 ? 0.5 : pressed ? 0.8 : 1,
            },
          ]}
          className="bg-surface rounded-full w-14 h-14 items-center justify-center border border-border"
        >
          <Text className="text-2xl font-bold text-foreground">−</Text>
        </Pressable>

        <Pressable
          onPress={onIncrement}
          style={({ pressed }) => [
            {
              transform: [{ scale: pressed ? 0.95 : 1 }],
              opacity: pressed ? 0.8 : 1,
            },
          ]}
          className="bg-primary rounded-full w-16 h-16 items-center justify-center"
        >
          <Text className="text-3xl font-bold text-white">+</Text>
        </Pressable>

        <Pressable
          onPress={onReset}
          style={({ pressed }) => [
            {
              transform: [{ scale: pressed ? 0.95 : 1 }],
              opacity: pressed ? 0.8 : 1,
            },
          ]}
          className="bg-surface rounded-full w-14 h-14 items-center justify-center border border-border"
        >
          <Text className="text-xs font-bold text-foreground">Reset</Text>
        </Pressable>
      </View>
    </View>
  );
}
