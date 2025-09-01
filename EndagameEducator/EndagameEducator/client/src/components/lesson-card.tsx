import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LucideIcon, Lock, CheckCircle, Play } from "lucide-react";

interface Lesson {
  id: number;
  title: string;
  description: string;
  duration: string;
  icon: LucideIcon;
  gradient: string;
  color: string;
}

interface LessonCardProps {
  lesson: Lesson;
  isCompleted: boolean;
  isCurrent: boolean;
  isLocked: boolean;
  score: number;
  onStart: () => void;
}

export function LessonCard({ 
  lesson, 
  isCompleted, 
  isCurrent, 
  isLocked, 
  score, 
  onStart 
}: LessonCardProps) {
  const getStatusBadge = () => {
    if (isCompleted) {
      return (
        <Badge className="bg-green-100 text-green-700 border-green-200">
          <CheckCircle className="w-3 h-3 mr-1" />
          Completed ✓
        </Badge>
      );
    }
    
    if (isCurrent) {
      return (
        <Badge className="bg-primary text-primary-foreground animate-pulse-gentle">
          Current
        </Badge>
      );
    }
    
    if (isLocked) {
      return (
        <Badge variant="outline" className="bg-muted text-muted-foreground">
          <Lock className="w-3 h-3 mr-1" />
          Locked
        </Badge>
      );
    }
    
    return null;
  };

  const getActionButton = () => {
    if (isLocked) {
      return (
        <span className="text-xs text-muted-foreground">
          Complete previous lesson
        </span>
      );
    }
    
    if (isCompleted) {
      return (
        <Button 
          variant="outline" 
          size="sm"
          onClick={onStart}
          data-testid={`button-review-lesson-${lesson.id}`}
        >
          Review
        </Button>
      );
    }
    
    return (
      <Button 
        size="sm"
        onClick={onStart}
        className={isCurrent ? "bg-primary hover:bg-primary/90" : ""}
        data-testid={`button-start-lesson-${lesson.id}`}
      >
        <Play className="w-3 h-3 mr-1" />
        {isCurrent ? 'Continue' : 'Start'}
      </Button>
    );
  };

  return (
    <Card 
      className={`
        shadow-lg hover:shadow-xl transition-all duration-300 lesson-card
        ${isLocked ? 'opacity-75' : ''}
        ${isCurrent ? 'ring-2 ring-primary/30' : ''}
        ${isCompleted ? 'bg-green-50/50' : ''}
      `}
      data-testid={`lesson-card-${lesson.id}`}
    >
      <div className={`h-32 bg-gradient-to-br ${lesson.gradient} relative`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <lesson.icon className="text-white w-10 h-10 opacity-80" />
        </div>
        <div className="absolute top-4 right-4">
          {getStatusBadge()}
        </div>
      </div>
      
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Lesson {lesson.id}: {lesson.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          {lesson.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${
              isCompleted ? 'bg-green-500' : 
              isCurrent ? 'bg-primary animate-pulse' : 
              'bg-muted'
            }`} />
            <span className="text-xs text-muted-foreground">{lesson.duration}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            {isCompleted && (
              <span className="text-sm font-semibold text-green-600" data-testid={`lesson-score-${lesson.id}`}>
                {score}/100 pts
              </span>
            )}
            {getActionButton()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
