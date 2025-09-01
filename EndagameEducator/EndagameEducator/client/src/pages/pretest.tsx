import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { useGameState } from "@/hooks/useGameState";
import { useToast } from "@/hooks/use-toast";
import { QuizComponent } from "@/components/quiz-component";
import { pretestQuestions } from "@/data/questions";
import { apiRequest } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Dna, Clock, BarChart3, ArrowRight } from "lucide-react";
import { BackgroundMusicPlayer } from "@/components/background-music-player";

export default function Pretest() {
  const [, navigate] = useLocation();
  const { user, isLoading } = useAuth();
  const { gameState, refetch } = useGameState();
  const { toast } = useToast();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [timeStarted] = useState(Date.now());

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

  const saveResponseMutation = useMutation({
    mutationFn: async (responseData: any) => {
      await apiRequest('POST', '/api/test/response', responseData);
    },
  });

  const updateProgressMutation = useMutation({
    mutationFn: async (progressData: any) => {
      await apiRequest('POST', '/api/game/progress', progressData);
    },
    onSuccess: () => {
      refetch();
    },
  });

  const handleAnswer = async (questionIndex: number, selectedAnswer: string) => {
    const question = pretestQuestions[questionIndex];
    const isCorrect = selectedAnswer === question.correctAnswer;
    
    // Save individual response
    await saveResponseMutation.mutateAsync({
      testType: 'pretest',
      questionId: questionIndex,
      selectedAnswer,
      isCorrect,
      timeSpent: Math.floor((Date.now() - timeStarted) / 1000),
    });

    setAnswers(prev => ({ ...prev, [questionIndex]: selectedAnswer }));
    
    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    // Move to next question or complete test
    if (questionIndex === pretestQuestions.length - 1) {
      const finalScore = Object.values({ ...answers, [questionIndex]: selectedAnswer })
        .reduce((total, answer, idx) => {
          return total + (answer === pretestQuestions[idx].correctAnswer ? 1 : 0);
        }, 0);

      // Update game progress
      await updateProgressMutation.mutateAsync({
        ...gameState,
        pretestScore: finalScore,
        totalScore: (gameState?.totalScore || 0) + (finalScore * 10),
        achievements: [...(gameState?.achievements || []), 'Dna Rookie'],
        currentLesson: 1,
      });

      setIsCompleted(true);
    } else {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background molecule-bg flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 dna-helix rounded-full flex items-center justify-center mx-auto mb-4 animate-spin">
            <Dna className="text-white w-8 h-8" />
          </div>
          <p className="text-muted-foreground">Loading pretest...</p>
        </div>
      </div>
    );
  }

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-background molecule-bg">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <Card className="shadow-lg">
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 dna-helix rounded-2xl flex items-center justify-center mx-auto mb-6">
                <BarChart3 className="text-white w-10 h-10" />
              </div>
              
              <h1 className="text-3xl font-bold text-foreground mb-4">Pretest Complete!</h1>
              <p className="text-xl text-muted-foreground mb-6">
                You scored <span className="font-bold text-primary">{score}/20</span> questions correctly
              </p>
              
              <div className="bg-muted rounded-lg p-6 mb-8">
                <h3 className="font-semibold text-foreground mb-2">What this means:</h3>
                <p className="text-sm text-muted-foreground">
                  {score < 9 ? "Don't worry! This baseline helps us tailor the lessons to your current knowledge level." :
                   score < 15 ? "Good foundation! The interactive lessons will build on what you already know." :
                   "Excellent! You have a strong grasp of the basics. The lessons will dive deeper into advanced concepts."}
                </p>
              </div>

              <div className="space-y-4">
                <Button
                  onClick={() => navigate('/lessons')}
                  size="lg"
                  className="bg-primary hover:bg-primary/90 w-full"
                  data-testid="button-start-lessons"
                >
                  <ArrowRight className="w-5 h-5 mr-2" />
                  Start Interactive Lessons
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate('/')}
                  className="w-full"
                  data-testid="button-home"
                >
                  Return to Home
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background molecule-bg">
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 dna-helix rounded-xl flex items-center justify-center">
              <BarChart3 className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Pretest Assessment</h1>
              <p className="text-muted-foreground">Assess your current knowledge</p>
            </div>
          </div>
          <Button 
            variant="outline" 
            onClick={() => navigate('/')}
            data-testid="button-back-home"
          >
            Back to Home
          </Button>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">
              Question {currentQuestion + 1} of {pretestQuestions.length}
            </span>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span data-testid="text-timer">
                {Math.floor((Date.now() - timeStarted) / 60000)}:{String(Math.floor(((Date.now() - timeStarted) % 60000) / 1000)).padStart(2, '0')}
              </span>
            </div>
          </div>
          <Progress value={((currentQuestion + 1) / pretestQuestions.length) * 100} />
        </div>

        {/* Quiz */}
        <QuizComponent
          question={pretestQuestions[currentQuestion]}
          questionIndex={currentQuestion}
          onAnswer={handleAnswer}
          showFeedback={true}
          selectedAnswer={answers[currentQuestion]}
        />
        
        {/* Background Music Player */}
        <BackgroundMusicPlayer musicTrack="focus" />
      </div>
    </div>
  );
}
