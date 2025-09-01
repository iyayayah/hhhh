import { Badge } from "@/components/ui/badge";
import { Trophy, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";

interface ScoreDisplayProps {
  score: number;
  showAnimation?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'trophy' | 'minimal';
}

export function ScoreDisplay({ 
  score, 
  showAnimation = false, 
  size = 'md',
  variant = 'default' 
}: ScoreDisplayProps) {
  const [displayScore, setDisplayScore] = useState(score);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (showAnimation && score !== displayScore) {
      setIsAnimating(true);
      
      // Animate score counting up
      const difference = score - displayScore;
      const increment = Math.ceil(Math.abs(difference) / 10);
      const direction = difference > 0 ? 1 : -1;
      
      const interval = setInterval(() => {
        setDisplayScore(prev => {
          const next = prev + (increment * direction);
          
          if (direction > 0 && next >= score) {
            clearInterval(interval);
            setIsAnimating(false);
            return score;
          } else if (direction < 0 && next <= score) {
            clearInterval(interval);
            setIsAnimating(false);
            return score;
          }
          
          return next;
        });
      }, 50);

      return () => clearInterval(interval);
    } else {
      setDisplayScore(score);
    }
  }, [score, showAnimation, displayScore]);

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'text-sm px-2 py-1';
      case 'lg':
        return 'text-lg px-4 py-2';
      default:
        return 'text-base px-3 py-1.5';
    }
  };

  const getIcon = () => {
    if (variant === 'trophy') {
      return <Trophy className="w-4 h-4 mr-2 text-secondary" />;
    }
    if (variant === 'default') {
      return <TrendingUp className="w-4 h-4 mr-2" />;
    }
    return null;
  };

  if (variant === 'minimal') {
    return (
      <span 
        className={`font-semibold text-primary ${isAnimating ? 'animate-pulse' : ''}`}
        data-testid="score-minimal"
      >
        {displayScore.toLocaleString()}
      </span>
    );
  }

  return (
    <Badge 
      variant="outline" 
      className={`
        ${getSizeClasses()} 
        bg-muted border-border
        ${isAnimating ? 'animate-pulse ring-2 ring-primary/30' : ''}
        transition-all duration-300
      `}
      data-testid="score-display"
    >
      {getIcon()}
      <span className="font-semibold">{displayScore.toLocaleString()}</span>
      <span className="text-xs text-muted-foreground ml-1">pts</span>
    </Badge>
  );
}

// Floating score notification component
interface ScoreNotificationProps {
  points: number;
  message?: string;
  onClose: () => void;
}

export function ScoreNotification({ points, message, onClose }: ScoreNotificationProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-20 right-4 z-50 score-notification">
      <div className={`
        px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2
        ${points > 0 ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}
      `}>
        <Trophy className="w-4 h-4" />
        <span className="font-semibold">
          {points > 0 ? '+' : ''}{points} points!
        </span>
        {message && (
          <span className="text-xs opacity-90 ml-2">
            {message}
          </span>
        )}
      </div>
    </div>
  );
}
