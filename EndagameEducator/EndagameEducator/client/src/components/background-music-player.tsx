import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent } from '@/components/ui/card';
import { Play, Pause, Volume2, VolumeX, Music, Settings } from 'lucide-react';
import { useBackgroundMusic } from '@/hooks/useBackgroundMusic';

interface BackgroundMusicPlayerProps {
  musicTrack?: 'peaceful' | 'focus' | 'ambient' | 'study';
  className?: string;
}

const MUSIC_TRACKS = {
  peaceful: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav', // Placeholder - would use actual music URLs
  focus: 'https://www.soundjay.com/misc/sounds/wind-chimes-01.wav',
  ambient: 'https://www.soundjay.com/misc/sounds/rain-01.wav',
  study: 'https://www.soundjay.com/misc/sounds/nature-sounds-01.wav'
};

export function BackgroundMusicPlayer({ 
  musicTrack = 'peaceful', 
  className = '' 
}: BackgroundMusicPlayerProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState(musicTrack);
  
  const { 
    isPlaying, 
    isMuted, 
    volume, 
    toggle, 
    setVolume, 
    toggleMute 
  } = useBackgroundMusic({ 
    src: MUSIC_TRACKS[selectedTrack] || '',
    volume: 0.2,
    autoplay: false 
  });

  // For now, create a simple placeholder audio data URL for demonstration
  // In production, you would host actual background music files
  const createSilentAudio = () => {
    // Create a very short silent audio data URL for demonstration
    return 'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=';
  };

  return (
    <div className={`fixed bottom-4 right-4 z-50 ${className}`}>
      <Card className="shadow-lg border-2 bg-card/95 backdrop-blur-sm">
        <CardContent className="p-3">
          {!isExpanded ? (
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggle}
                className="h-8 w-8 p-0"
                data-testid="music-toggle"
              >
                {isPlaying ? (
                  <Pause className="h-4 w-4 text-primary" />
                ) : (
                  <Play className="h-4 w-4 text-muted-foreground" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(true)}
                className="h-8 w-8 p-0"
                data-testid="music-expand"
              >
                <Music className="h-4 w-4 text-muted-foreground" />
              </Button>
            </div>
          ) : (
            <div className="space-y-3 min-w-[200px]">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Music className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">Background Music</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsExpanded(false)}
                  className="h-6 w-6 p-0"
                >
                  <Settings className="h-3 w-3" />
                </Button>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggle}
                  className="h-8 w-8 p-0"
                  data-testid="music-play-pause"
                >
                  {isPlaying ? (
                    <Pause className="h-4 w-4" />
                  ) : (
                    <Play className="h-4 w-4" />
                  )}
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleMute}
                  className="h-8 w-8 p-0"
                  data-testid="music-mute"
                >
                  {isMuted ? (
                    <VolumeX className="h-4 w-4" />
                  ) : (
                    <Volume2 className="h-4 w-4" />
                  )}
                </Button>
                
                <div className="flex-1 px-2">
                  <Slider
                    value={[isMuted ? 0 : volume]}
                    onValueChange={(value) => setVolume(value[0])}
                    max={1}
                    step={0.1}
                    className="w-full"
                    data-testid="volume-slider"
                  />
                </div>
              </div>
              
              <div className="space-y-1">
                <label className="text-xs text-muted-foreground">Music Style:</label>
                <select
                  value={selectedTrack}
                  onChange={(e) => setSelectedTrack(e.target.value as keyof typeof MUSIC_TRACKS)}
                  className="w-full text-xs bg-background border border-border rounded px-2 py-1"
                  data-testid="music-track-select"
                >
                  <option value="peaceful">🌿 Peaceful Nature</option>
                  <option value="focus">🎯 Focus & Concentration</option>
                  <option value="ambient">🌙 Ambient Calm</option>
                  <option value="study">📚 Study Atmosphere</option>
                </select>
              </div>
              
              {isPlaying && (
                <div className="text-xs text-muted-foreground text-center">
                  ♪ Playing soft background music
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}