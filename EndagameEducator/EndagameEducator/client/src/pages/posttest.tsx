import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { useGameState } from "@/hooks/useGameState";
import { useToast } from "@/hooks/use-toast";
import { QuizComponent } from "@/components/quiz-component";
import { posttestQuestions } from "@/data/questions";
import { apiRequest } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Dna, Clock, BarChart3, ArrowRight, Trophy, TrendingUp } from "lucide-react";
import { BackgroundMusicPlayer } from "@/components/background-music-player";

export default function Posttest() {
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
    const question = posttestQuestions[questionIndex];
    const isCorrect = selectedAnswer === question.correctAnswer;
    
    // Save individual response
    await saveResponseMutation.mutateAsync({
      testType: 'posttest',
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
    if (questionIndex === posttestQuestions.length - 1) {
      const finalScore = Object.values({ ...answers, [questionIndex]: selectedAnswer })
        .reduce((total, answer, idx) => {
          return total + (answer === posttestQuestions[idx].correctAnswer ? 1 : 0);
        }, 0);

      // Calculate achievements
      const newAchievements = [...(gameState?.achievements || [])];
      if (finalScore >= 16) { // 80% or higher
        newAchievements.push('Genome Master');
      }

      // Update game progress
      await updateProgressMutation.mutateAsync({
        ...gameState,
        posttestScore: finalScore,
        totalScore: (gameState?.totalScore || 0) + (finalScore * 10),
        achievements: newAchievements,
        isCompleted: true,
        completedAt: new Date().toISOString(),
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
          <p className="text-muted-foreground">Loading posttest...</p>
        </div>
      </div>
    );
  }

  if (isCompleted) {
    const improvement = score - (gameState?.pretestScore || 0);
    const improvementPercent = ((improvement / 20) * 100).toFixed(1);

    return (
      <div className="min-h-screen bg-background molecule-bg">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <Card className="shadow-lg">
            <CardContent className="p-8 text-center">
              <div className="w-24 h-24 dna-helix rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Trophy className="text-white w-12 h-12" />
              </div>
              
              <h1 className="text-3xl font-bold text-foreground mb-4">Journey Complete! 🎉</h1>
              
              {/* Score Comparison */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-muted rounded-lg p-6">
                  <h3 className="font-semibold text-foreground mb-2">Pretest Score</h3>
                  <div className="text-2xl font-bold text-muted-foreground" data-testid="text-pretest-final">
                    {gameState?.pretestScore || 0}/20
                  </div>
                </div>
                <div className="bg-primary/10 rounded-lg p-6 border border-primary/20">
                  <h3 className="font-semibold text-foreground mb-2">Posttest Score</h3>
                  <div className="text-2xl font-bold text-primary" data-testid="text-posttest-final">
                    {score}/20
                  </div>
                </div>
                <div className={`rounded-lg p-6 ${improvement > 0 ? 'bg-green-50 border border-green-200' : 'bg-yellow-50 border border-yellow-200'}`}>
                  <h3 className="font-semibold text-foreground mb-2">Improvement</h3>
                  <div className={`text-2xl font-bold flex items-center justify-center ${improvement > 0 ? 'text-green-600' : 'text-yellow-600'}`}>
                    <TrendingUp className="w-6 h-6 mr-1" />
                    {improvement > 0 ? '+' : ''}{improvement}
                  </div>
                </div>
              </div>

              {/* Motivational Message */}
              <div className="bg-muted rounded-lg p-6 mb-8">
                <h3 className="font-semibold text-foreground mb-2">
                  {improvement > 0 ? '🎉 Great job! You learned a lot!' : 'Keep exploring!'}
                </h3>
                <p className="text-muted-foreground">
                  {improvement > 0 ? 
                    `You improved by ${improvement} questions (${improvementPercent}% improvement)! Your journey through Dna and genetic engineering has enhanced your understanding significantly.` :
                    'Learning is a process! Consider reviewing the lessons again to reinforce these important concepts.'
                  }
                </p>
              </div>

              <div className="space-y-4">
                <Button
                  onClick={() => navigate('/results')}
                  size="lg"
                  className="bg-primary hover:bg-primary/90 w-full"
                  data-testid="button-view-results"
                >
                  <Trophy className="w-5 h-5 mr-2" />
                  View Detailed Results
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate('/')}
                  className="w-full"
                  data-testid="button-home-final"
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
              <h1 className="text-2xl font-bold text-foreground">Final Assessment</h1>
              <p className="text-muted-foreground">Show what you've learned</p>
            </div>
          </div>
          <Badge variant="secondary">
            <Trophy className="w-3 h-3 mr-1" />
            Posttest
          </Badge>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">
              Question {currentQuestion + 1} of {posttestQuestions.length}
            </span>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span data-testid="text-posttest-timer">
                {Math.floor((Date.now() - timeStarted) / 60000)}:{String(Math.floor(((Date.now() - timeStarted) % 60000) / 1000)).padStart(2, '0')}
              </span>
            </div>
          </div>
          <Progress value={((currentQuestion + 1) / posttestQuestions.length) * 100} />
        </div>

        {/* Quiz */}
        <QuizComponent
          question={posttestQuestions[currentQuestion]}
          questionIndex={currentQuestion}
          onAnswer={handleAnswer}
          showFeedback={true}
          selectedAnswer={answers[currentQuestion]}
        />
        
        {/* Background Music Player */}
        <BackgroundMusicPlayer musicTrack="study" />
      </div>
    </div>
  );
}
