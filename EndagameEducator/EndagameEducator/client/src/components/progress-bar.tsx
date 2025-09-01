import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Circle, Lock } from "lucide-react";

interface ProgressStep {
  id: string;
  label: string;
  completed: boolean;
  current: boolean;
  locked: boolean;
}

interface ProgressBarProps {
  steps: ProgressStep[];
  currentProgress: number;
  showLabels?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function ProgressBar({ 
  steps, 
  currentProgress, 
  showLabels = true, 
  size = 'md' 
}: ProgressBarProps) {
  const completedSteps = steps.filter(step => step.completed).length;
  const progressPercentage = (completedSteps / steps.length) * 100;

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return { bar: 'h-2', step: 'w-6 h-6', text: 'text-xs' };
      case 'lg':
        return { bar: 'h-4', step: 'w-10 h-10', text: 'text-base' };
      default:
        return { bar: 'h-3', step: 'w-8 h-8', text: 'text-sm' };
    }
  };

  const sizeClasses = getSizeClasses();

  return (
    <div className="space-y-4">
      {/* Main Progress Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className={`font-medium text-foreground ${sizeClasses.text}`}>
            Overall Progress
          </span>
          <Badge variant="outline" className={sizeClasses.text}>
            {completedSteps}/{steps.length} completed
          </Badge>
        </div>
        <Progress 
          value={progressPercentage} 
          className={`w-full progress-fill ${sizeClasses.bar}`}
          data-testid="overall-progress"
        />
        <div className={`text-right ${sizeClasses.text} text-muted-foreground`}>
          {Math.round(progressPercentage)}% complete
        </div>
      </div>

      {/* Step Indicators */}
      {showLabels && (
        <div className="space-y-3">
          {steps.map((step, index) => (
            <div 
              key={step.id} 
              className={`
                flex items-center space-x-3 p-3 rounded-lg transition-all duration-200
                ${step.current ? 'bg-primary/5 border border-primary/20' : ''}
                ${step.completed ? 'bg-green-50 border border-green-200' : ''}
                ${step.locked ? 'opacity-50' : ''}
              `}
              data-testid={`progress-step-${step.id}`}
            >
              <div className={`
                ${sizeClasses.step} rounded-full flex items-center justify-center flex-shrink-0
                ${step.completed ? 'bg-green-500 text-white' : 
                  step.current ? 'bg-primary text-primary-foreground' : 
                  step.locked ? 'bg-muted text-muted-foreground' : 'bg-muted text-foreground'}
              `}>
                {step.completed ? (
                  <CheckCircle className="w-4 h-4" />
                ) : step.locked ? (
                  <Lock className="w-4 h-4" />
                ) : (
                  <Circle className="w-4 h-4" />
                )}
              </div>
              
              <div className="flex-1">
                <div className={`
                  font-medium
                  ${step.completed ? 'text-green-700' : 
                    step.current ? 'text-primary' : 
                    step.locked ? 'text-muted-foreground' : 'text-foreground'}
                  ${sizeClasses.text}
                `}>
                  {step.label}
                </div>
                
                {step.current && (
                  <div className="text-xs text-primary/70 mt-1">
                    Currently working on this step
                  </div>
                )}
                
                {step.completed && (
                  <div className="text-xs text-green-600 mt-1">
                    ✓ Completed successfully
                  </div>
                )}
                
                {step.locked && (
                  <div className="text-xs text-muted-foreground mt-1">
                    Complete previous steps to unlock
                  </div>
                )}
              </div>

              {step.current && (
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                  Active
                </Badge>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Simple linear progress bar for quizzes and tests
interface LinearProgressProps {
  current: number;
  total: number;
  label?: string;
  showPercentage?: boolean;
  color?: 'primary' | 'secondary' | 'success' | 'warning';
}

export function LinearProgress({ 
  current, 
  total, 
  label, 
  showPercentage = true,
  color = 'primary' 
}: LinearProgressProps) {
  const percentage = Math.round((current / total) * 100);
  
  const getColorClasses = () => {
    switch (color) {
      case 'secondary':
        return 'bg-secondary';
      case 'success':
        return 'bg-green-500';
      case 'warning':
        return 'bg-yellow-500';
      default:
        return 'bg-primary';
    }
  };

  return (
    <div className="space-y-2">
      {(label || showPercentage) && (
        <div className="flex items-center justify-between text-sm">
          {label && (
            <span className="font-medium text-foreground">{label}</span>
          )}
          {showPercentage && (
            <span className="text-muted-foreground">
              {current}/{total} ({percentage}%)
            </span>
          )}
        </div>
      )}
      
      <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
        <div 
          className={`h-full ${getColorClasses()} transition-all duration-500 ease-out`}
          style={{ width: `${percentage}%` }}
          data-testid="linear-progress-bar"
        />
      </div>
    </div>
  );
}
