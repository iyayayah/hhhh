import { useQuery } from "@tanstack/react-query";
import { useAuth } from "./useAuth";

export interface GameState {
  userId: string;
  pretestScore: number;
  posttestScore: number;
  totalScore: number;
  completedLessons: number[];
  achievements: string[];
  currentLesson: number;
  lessonScores: Record<number, number>;
  isCompleted: boolean;
  startedAt?: string;
  completedAt?: string;
  updatedAt?: string;
}

export function useGameState() {
  const { user, isAuthenticated } = useAuth();

  const { data: gameState, isLoading, error, refetch } = useQuery<GameState>({
    queryKey: ['/api/game/progress'],
    enabled: isAuthenticated && !!user,
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return {
    gameState,
    isLoading,
    error,
    refetch,
    isAuthenticated,
  };
}
