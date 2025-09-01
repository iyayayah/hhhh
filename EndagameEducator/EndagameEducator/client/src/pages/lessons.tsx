import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { useGameState } from "@/hooks/useGameState";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { DNABuilder } from "@/components/dna-builder";
import { QuizComponent } from "@/components/quiz-component";
import { lessonsData } from "@/data/lessons";
import { apiRequest } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";
import { 
  Dna, 
  ArrowLeft, 
  ArrowRight, 
  Play, 
  CheckCircle,
  Settings,
  Clock 
} from "lucide-react";

export default function Lessons() {
  const [, navigate] = useLocation();
  const { user, isLoading } = useAuth();
  const { gameState, refetch } = useGameState();
  const { toast } = useToast();
  const [currentLesson, setCurrentLesson] = useState(1);
  const [lessonStep, setLessonStep] = useState<'content' | 'drill' | 'quiz'>('content');
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});
  const [drillScore, setDrillScore] = useState(0);

  useEffect(() => {
    if (!isLoading && !user) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }
  }, [user, isLoading, toast]);

  useEffect(() => {
    if (gameState?.currentLesson) {
      setCurrentLesson(gameState.currentLesson);
    }
  }, [gameState]);

  const updateProgressMutation = useMutation({
    mutationFn: async (progressData: any) => {
      await apiRequest('POST', '/api/game/progress', progressData);
    },
    onSuccess: () => {
      refetch();
    },
  });

  const lesson = lessonsData[currentLesson - 1];

  const handleNextStep = () => {
    if (lessonStep === 'content') {
      setLessonStep('drill');
    } else if (lessonStep === 'drill') {
      setLessonStep('quiz');
    } else {
      // Complete lesson
      completeLesson();
    }
  };

  const completeLesson = async () => {
    const lessonScore = drillScore + Object.keys(quizAnswers).length * 5; // Base score + quiz points
    const completedLessons = [...(gameState?.completedLessons || []), currentLesson];
    const newLessonScores = { ...gameState?.lessonScores, [currentLesson]: lessonScore };
    
    await updateProgressMutation.mutateAsync({
      ...gameState,
      completedLessons,
      lessonScores: newLessonScores,
      totalScore: (gameState?.totalScore || 0) + lessonScore,
      currentLesson: currentLesson + 1,
      achievements: completedLessons.length >= 3 ? 
        [...(gameState?.achievements || []), 'Gene Explorer'] : 
        gameState?.achievements || [],
    });

    if (currentLesson < 5) {
      setCurrentLesson(currentLesson + 1);
      setLessonStep('content');
      setQuizAnswers({});
      setDrillScore(0);
    } else {
      navigate('/gene-editor');
    }
  };

  if (isLoading || !lesson) {
    return (
      <div className="min-h-screen bg-background molecule-bg flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 dna-helix rounded-full flex items-center justify-center mx-auto mb-4 animate-spin">
            <Dna className="text-white w-8 h-8" />
          </div>
          <p className="text-muted-foreground">Loading lesson...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background molecule-bg">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/')}
                data-testid="button-back"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Home
              </Button>
              <div>
                <h1 className="text-lg font-bold text-foreground">Lesson {currentLesson}</h1>
                <p className="text-xs text-muted-foreground">{lesson.title}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-muted-foreground">
                <Clock className="w-4 h-4 inline mr-1" />
                {lesson.duration}
              </div>
              <div className="text-sm font-semibold text-primary" data-testid="text-lesson-score">
                {gameState?.lessonScores?.[currentLesson] || drillScore} pts
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">
              {lessonStep === 'content' ? 'Reading' : lessonStep === 'drill' ? 'Interactive Activity' : 'Quick Quiz'}
            </span>
            <span className="text-sm text-muted-foreground">
              Step {lessonStep === 'content' ? '1' : lessonStep === 'drill' ? '2' : '3'} of 3
            </span>
          </div>
          <Progress value={lessonStep === 'content' ? 33 : lessonStep === 'drill' ? 66 : 100} />
        </div>

        {/* Content Step */}
        {lessonStep === 'content' && (
          <Card className="shadow-lg mb-8">
            <CardContent className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${lesson.gradient} bg-gradient-to-br`}>
                  <lesson.icon className="text-white w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">{lesson.title}</h2>
                  <p className="text-muted-foreground">{lesson.subtitle}</p>
                </div>
              </div>
              
              <div className="prose prose-lg max-w-none text-foreground">
                <div dangerouslySetInnerHTML={{ __html: lesson.content }} />
              </div>

              <Button 
                onClick={handleNextStep}
                className="mt-8 bg-primary hover:bg-primary/90"
                data-testid="button-next-step"
              >
                <ArrowRight className="w-4 h-4 mr-2" />
                Start Interactive Activity
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Drill Step */}
        {lessonStep === 'drill' && (
          <div className="mb-8">
            <Card className="shadow-lg">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">{lesson.drillTitle}</h2>
                
                {currentLesson === 1 && (
                  <DNABuilder
                    onScoreUpdate={setDrillScore}
                    onComplete={() => {
                      toast({
                        title: "Great job!",
                        description: `You earned ${drillScore} points from the Dna building activity!`,
                      });
                    }}
                  />
                )}

                {currentLesson !== 1 && (
                  <div className="text-center py-16">
                    <div className="w-20 h-20 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Settings className="w-10 h-10 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{lesson.drillTitle}</h3>
                    <p className="text-muted-foreground mb-6">{lesson.drillDescription}</p>
                    <Button 
                      onClick={() => {
                        setDrillScore(75); // Simulate completion
                        toast({
                          title: "Activity completed!",
                          description: "You earned 75 points!",
                        });
                      }}
                      data-testid="button-complete-drill"
                    >
                      Complete Activity
                    </Button>
                  </div>
                )}

                <Button 
                  onClick={handleNextStep}
                  disabled={drillScore === 0}
                  className="mt-6 bg-primary hover:bg-primary/90"
                  data-testid="button-next-quiz"
                >
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Take Mini Quiz
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Quiz Step */}
        {lessonStep === 'quiz' && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">Quick Quiz: {lesson.title}</h2>
            
            {lesson.quizQuestions.map((question, index) => (
              <div key={index} className="mb-6">
                <QuizComponent
                  question={question}
                  questionIndex={index}
                  onAnswer={(idx, answer) => {
                    setQuizAnswers(prev => ({ ...prev, [idx]: answer }));
                  }}
                  showFeedback={true}
                  selectedAnswer={quizAnswers[index]}
                />
              </div>
            ))}

            <div className="flex justify-center mt-8">
              <Button 
                onClick={handleNextStep}
                disabled={Object.keys(quizAnswers).length < lesson.quizQuestions.length}
                size="lg"
                className="bg-primary hover:bg-primary/90"
                data-testid="button-complete-lesson"
              >
                <CheckCircle className="w-5 h-5 mr-2" />
                Complete Lesson {currentLesson}
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
