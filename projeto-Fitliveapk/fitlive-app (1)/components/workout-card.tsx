import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { cn } from '@/lib/utils';
import type { Workout } from '@/lib/types';

interface WorkoutCardProps {
  workout: Workout;
  onPress: () => void;
  className?: string;
}

export function WorkoutCard({ workout, onPress, className }: WorkoutCardProps) {
  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    return `${mins} min`;
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
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          transform: [{ scale: pressed ? 0.98 : 1 }],
          opacity: pressed ? 0.9 : 1,
        },
      ]}
      className={cn(
        'bg-surface rounded-2xl p-4 border border-border',
        className
      )}
    >
      <View className="gap-3">
        {/* Header */}
        <View className="flex-row justify-between items-start">
          <View className="flex-1 gap-1">
            <Text className="text-lg font-bold text-foreground">
              {workout.name}
            </Text>
            {workout.instructor && (
              <Text className="text-sm text-muted">
                com {workout.instructor}
              </Text>
            )}
          </View>
          {workout.isFavorite && (
            <Text className="text-xl">❤️</Text>
          )}
        </View>

        {/* Description */}
        {workout.description && (
          <Text className="text-sm text-muted line-clamp-2">
            {workout.description}
          </Text>
        )}

        {/* Footer Info */}
        <View className="flex-row justify-between items-center pt-2 border-t border-border">
          <View className="flex-row gap-2 items-center">
            <Text className="text-xs font-semibold text-muted">
              ⏱️ {formatDuration(workout.estimatedDuration)}
            </Text>
            <Text className="text-xs font-semibold text-muted">
              • {workout.exercises.length} exercícios
            </Text>
          </View>
          <View className={cn('rounded-full px-2 py-1', getDifficultyColor(workout.difficulty))}>
            <Text className="text-xs font-semibold">
              {difficultyLabel}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}
