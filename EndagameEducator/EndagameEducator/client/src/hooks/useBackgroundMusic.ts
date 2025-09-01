import { useState, useEffect, useRef } from 'react';

interface UseBackgroundMusicProps {
  src: string;
  volume?: number;
  autoplay?: boolean;
}

export function useBackgroundMusic({ src, volume = 0.3, autoplay = false }: UseBackgroundMusicProps) {
  const [isPlaying, setIsPlaying] = useState(autoplay);
  const [isMuted, setIsMuted] = useState(false);
  const [currentVolume, setCurrentVolume] = useState(volume);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio(src);
    audioRef.current.loop = true;
    audioRef.current.volume = isMuted ? 0 : currentVolume;
    
    // Clean up on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [src]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : currentVolume;
    }
  }, [currentVolume, isMuted]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(() => {
          // Handle autoplay restrictions
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const play = () => {
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        setIsPlaying(false);
      });
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggle = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  const setVolume = (newVolume: number) => {
    const clampedVolume = Math.max(0, Math.min(1, newVolume));
    setCurrentVolume(clampedVolume);
  };

  const toggleMute = () => {
    setIsMuted(prev => !prev);
  };

  return {
    isPlaying,
    isMuted,
    volume: currentVolume,
    play,
    pause,
    toggle,
    setVolume,
    toggleMute,
  };
}