import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { useGameState } from "@/hooks/useGameState";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Dna, 
  Trophy, 
  ArrowLeft, 
  Download, 
  TrendingUp,
  Award,
  Users,
  Target,
  BarChart3
} from "lucide-react";

interface LeaderboardEntry {
  user: {
    id: string;
    firstName?: string;
    lastName?: string;
    email?: string;
  };
  progress: {
    totalScore: number;
    pretestScore: number;
    posttestScore: number;
    completedLessons: number[];
    achievements: string[];
  };
}

export default function Results() {
  const [, navigate] = useLocation();
  const { user, isLoading } = useAuth();
  const { gameState } = useGameState();
  const { toast } = useToast();

  const { data: leaderboard, isLoading: leaderboardLoading } = useQuery<LeaderboardEntry[]>({
    queryKey: ['/api/leaderboard'],
    enabled: !!user,
  });

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

  if (isLoading || leaderboardLoading) {
    return (
      <div className="min-h-screen bg-background molecule-bg flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 dna-helix rounded-full flex items-center justify-center mx-auto mb-4 animate-spin">
            <Dna className="text-white w-8 h-8" />
          </div>
          <p className="text-muted-foreground">Loading results...</p>
        </div>
      </div>
    );
  }

  const improvement = (gameState?.posttestScore || 0) - (gameState?.pretestScore || 0);
  const userRank = leaderboard && user 
    ? leaderboard.findIndex(entry => entry.user.id === user.id) + 1 
    : 0;

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
                <h1 className="text-lg font-bold text-foreground">Results & Analysis</h1>
                <p className="text-xs text-muted-foreground">Your learning journey summary</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              data-testid="button-export"
            >
              <Download className="w-4 h-4 mr-2" />
              Export Results
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Performance Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-primary/20 text-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">Pretest Score</h3>
              <div className="text-2xl font-bold text-foreground" data-testid="text-pretest-overview">
                {gameState?.pretestScore || 0}/20
              </div>
              <p className="text-xs text-muted-foreground">
                {Math.round(((gameState?.pretestScore || 0) / 20) * 100)}%
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-secondary/20 text-secondary rounded-xl flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">Posttest Score</h3>
              <div className="text-2xl font-bold text-foreground" data-testid="text-posttest-overview">
                {gameState?.posttestScore || 0}/20
              </div>
              <p className="text-xs text-muted-foreground">
                {Math.round(((gameState?.posttestScore || 0) / 20) * 100)}%
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardContent className="p-6 text-center">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 ${
                improvement > 0 ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
              }`}>
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">Improvement</h3>
              <div className={`text-2xl font-bold ${improvement > 0 ? 'text-green-600' : 'text-yellow-600'}`} data-testid="text-improvement">
                {improvement > 0 ? '+' : ''}{improvement}
              </div>
              <p className="text-xs text-muted-foreground">
                {improvement > 0 ? `+${((improvement / 20) * 100).toFixed(1)}%` : 'No change'}
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-accent/20 text-accent rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">Class Rank</h3>
              <div className="text-2xl font-bold text-foreground" data-testid="text-rank">
                #{userRank || '?'}
              </div>
              <p className="text-xs text-muted-foreground">
                of {leaderboard?.length || 0} students
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Score Breakdown */}
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold text-foreground mb-6">Score Breakdown</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <span className="font-medium text-foreground">Pretest Performance</span>
                  <Badge variant="outline" data-testid="badge-pretest">
                    {gameState?.pretestScore || 0} pts
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <span className="font-medium text-foreground">Lesson Activities</span>
                  <Badge variant="outline" data-testid="badge-lessons">
                    {Object.values(gameState?.lessonScores || {}).reduce((sum: number, score: any) => sum + score, 0)} pts
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <span className="font-medium text-foreground">Posttest Performance</span>
                  <Badge variant="outline" data-testid="badge-posttest">
                    {(gameState?.posttestScore || 0) * 10} pts
                  </Badge>
                </div>
                <div className="border-t border-border pt-4">
                  <div className="flex items-center justify-between text-lg font-bold">
                    <span className="text-foreground">Total Score</span>
                    <span className="text-primary" data-testid="text-total-final">
                      {gameState?.totalScore || 0} pts
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold text-foreground mb-6">Achievements Earned</h2>
              <div className="space-y-4">
                {(gameState?.achievements || []).map((achievement, index) => (
                  <div key={index} className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="w-10 h-10 bg-green-500 text-white rounded-lg flex items-center justify-center">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-green-800">{achievement}</p>
                      <p className="text-xs text-green-600">
                        {achievement === 'Dna Rookie' && 'Completed the pretest assessment'}
                        {achievement === 'Gene Explorer' && 'Finished 3 or more interactive lessons'}
                        {achievement === 'Genome Master' && 'Scored 80% or higher on the posttest'}
                      </p>
                    </div>
                  </div>
                ))}
                
                {(!gameState?.achievements || gameState.achievements.length === 0) && (
                  <div className="text-center py-8 text-muted-foreground">
                    <Award className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No achievements earned yet</p>
                    <p className="text-sm">Complete more activities to earn badges!</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Leaderboard */}
        <Card className="shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-foreground">Class Leaderboard</h2>
              <Badge variant="outline">
                <Users className="w-3 h-3 mr-1" />
                {leaderboard?.length || 0} students
              </Badge>
            </div>

            <div className="space-y-3">
              {leaderboard?.slice(0, 10).map((entry, index) => (
                <div 
                  key={entry.user.id}
                  className={`flex items-center justify-between p-4 rounded-lg border transition-all ${
                    entry.user.id === user?.id 
                      ? 'bg-primary/10 border-primary/30 shadow-md' 
                      : 'bg-muted border-border hover:shadow-sm'
                  }`}
                  data-testid={`leaderboard-rank-${index + 1}`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                      index === 0 ? 'bg-yellow-500 text-white' :
                      index === 1 ? 'bg-gray-400 text-white' :
                      index === 2 ? 'bg-orange-500 text-white' :
                      'bg-muted-foreground text-white'
                    }`}>
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">
                        {entry.user.firstName ? 
                          `${entry.user.firstName} ${entry.user.lastName?.[0] || ''}.` :
                          entry.user.email?.split('@')[0] || 'Student'
                        }
                        {entry.user.id === user?.id && ' (You)'}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Completed {entry.progress.completedLessons?.length || 0}/5 lessons • 
                        {entry.progress.achievements?.length || 0} achievements
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg text-foreground">
                      {entry.progress.totalScore || 0}
                    </p>
                    <p className="text-xs text-muted-foreground">points</p>
                  </div>
                </div>
              ))}

              {(!leaderboard || leaderboard.length === 0) && (
                <div className="text-center py-12 text-muted-foreground">
                  <Trophy className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium mb-2">No leaderboard data yet</p>
                  <p className="text-sm">Be the first to complete the game!</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Knowledge Gain Analysis */}
        {gameState?.posttestScore !== undefined && (
          <Card className="shadow-lg mt-6">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold text-foreground mb-6">Knowledge Gain Analysis</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Target className="w-8 h-8" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Dna Structure</h3>
                  <p className="text-sm text-muted-foreground">
                    Strong understanding of nucleotides and base pairing
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Dna className="w-8 h-8" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Central Dogma</h3>
                  <p className="text-sm text-muted-foreground">
                    Good grasp of transcription and translation processes
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Award className="w-8 h-8" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Genetic Engineering</h3>
                  <p className="text-sm text-muted-foreground">
                    Developing understanding of GMO concepts and ethics
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="flex justify-center mt-8 space-x-4">
          <Button
            onClick={() => navigate('/lessons')}
            variant="outline"
            data-testid="button-review-lessons"
          >
            Review Lessons
          </Button>
          <Button
            onClick={() => navigate('/gene-editor')}
            variant="outline"
            data-testid="button-gene-editor-return"
          >
            <Dna className="w-4 h-4 mr-2" />
            Gene Editor
          </Button>
          {improvement <= 0 && (
            <Button
              onClick={() => navigate('/posttest')}
              className="bg-primary hover:bg-primary/90"
              data-testid="button-retake-posttest"
            >
              Retake Posttest
            </Button>
          )}
        </div>
      </main>
    </div>
  );
}
