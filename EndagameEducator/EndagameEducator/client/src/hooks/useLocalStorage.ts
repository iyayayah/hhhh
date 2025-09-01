import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  // Get value from localStorage or use initial value
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that persists the new value to localStorage
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  };

  // Remove item from localStorage
  const removeValue = () => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue, removeValue] as const;
}

// Hook for managing game progress in localStorage as backup
export function useLocalGameProgress() {
  const [localProgress, setLocalProgress, removeLocalProgress] = useLocalStorage('endagame_progress', {
    pretestScore: 0,
    posttestScore: 0,
    totalScore: 0,
    completedLessons: [],
    achievements: [],
    currentLesson: 1,
    lessonScores: {},
    isCompleted: false,
    lastSync: Date.now(),
  });

  // Sync with server when connection is available
  const syncWithServer = async () => {
    try {
      // This would be called when the user goes online
      // Implementation would sync local data with server
      console.log('Syncing local progress with server...');
    } catch (error) {
      console.warn('Failed to sync with server:', error);
    }
  };

  // Update progress and sync
  const updateProgress = (updates: Partial<typeof localProgress>) => {
    const newProgress = {
      ...localProgress,
      ...updates,
      lastSync: Date.now(),
    };
    setLocalProgress(newProgress);
    
    // Attempt to sync with server in background
    syncWithServer();
  };

  return {
    localProgress,
    updateProgress,
    removeLocalProgress,
    syncWithServer,
  };
}

// Hook for managing user preferences
export function useUserPreferences() {
  const [preferences, setPreferences] = useLocalStorage('endagame_preferences', {
    soundEnabled: true,
    animationsEnabled: true,
    theme: 'light' as 'light' | 'dark',
    difficulty: 'normal' as 'easy' | 'normal' | 'hard',
    showHints: true,
    autoSave: true,
  });

  const updatePreference = <K extends keyof typeof preferences>(
    key: K,
    value: typeof preferences[K]
  ) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
  };

  return {
    preferences,
    updatePreference,
    setPreferences,
  };
}

// Hook for caching quiz responses
export function useQuizCache() {
  const [cachedResponses, setCachedResponses] = useLocalStorage<Record<string, any>>('endagame_quiz_cache', {});

  const cacheResponse = (testType: string, questionId: number, response: any) => {
    const key = `${testType}_${questionId}`;
    setCachedResponses(prev => ({ ...prev, [key]: response }));
  };

  const getCachedResponse = (testType: string, questionId: number) => {
    const key = `${testType}_${questionId}`;
    return cachedResponses[key];
  };

  const clearCache = (testType?: string) => {
    if (testType) {
      setCachedResponses(prev => {
        const filtered = Object.keys(prev).reduce((acc, key) => {
          if (!key.startsWith(`${testType}_`)) {
            acc[key] = prev[key];
          }
          return acc;
        }, {} as Record<string, any>);
        return filtered;
      });
    } else {
      setCachedResponses({});
    }
  };

  return {
    cacheResponse,
    getCachedResponse,
    clearCache,
    cachedResponses,
  };
}
