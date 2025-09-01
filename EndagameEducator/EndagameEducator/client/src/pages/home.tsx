import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useGameState } from "@/hooks/useGameState";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { LessonCard } from "@/components/lesson-card";
import { ScoreDisplay } from "@/components/score-display";
import { 
  Dna, 
  Trophy, 
  Play, 
  BarChart3, 
  Microscope, 
  Crown,
  Settings,
  LogOut,
  Download,
  Clock,
  Users,
  Gamepad2
} from "lucide-react";
import { useLocation } from "wouter";
import { BackgroundMusicPlayer } from "@/components/background-music-player";

const lessons = [
  {
    id: 1,
    title: "Dna Structure",
    description: "Learn about nucleotides, base pairing, and the double helix structure.",
    duration: "25 min",
    icon: Dna,
    gradient: "from-primary to-accent",
    color: "primary"
  },
  {
    id: 2,
    title: "Dna to Protein",
    description: "Explore transcription, translation, and the codon table.",
    duration: "30 min",
    icon: Settings,
    gradient: "from-secondary to-purple-400",
    color: "secondary"
  },
  {
    id: 3,
    title: "Genes & Mutations",
    description: "Understand heredity, genetic variation, and mutation effects.",
    duration: "28 min",
    icon: Settings,
    gradient: "from-accent to-cyan-400",
    color: "accent"
  },
  {
    id: 4,
    title: "Genetic Engineering",
    description: "Learn about CRISPR, plasmids, and recombinant Dna.",
    duration: "35 min",
    icon: Settings,
    gradient: "from-orange-400 to-red-400",
    color: "orange"
  },
  {
    id: 5,
    title: "GMO Applications",
    description: "Explore real-world applications and ethical considerations.",
    duration: "30 min",
    icon: Settings,
    gradient: "from-green-400 to-emerald-500",
    color: "green"
  }
];

export default function Home() {
  const { user, isLoading } = useAuth();
  const { gameState, isLoading: gameLoading } = useGameState();
  const { toast } = useToast();
  const [, navigate] = useLocation();

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

  if (isLoading || gameLoading) {
    return (
      <div className="min-h-screen bg-background molecule-bg flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 dna-helix rounded-full flex items-center justify-center mx-auto mb-4 animate-spin">
            <Dna className="text-white w-8 h-8" />
          </div>
          <p className="text-muted-foreground">Loading your genetic journey...</p>
        </div>
      </div>
    );
  }

  const overallProgress = ((gameState?.completedLessons?.length || 0) / 5) * 100;
  const hasStartedPretest = gameState?.pretestScore !== undefined && gameState.pretestScore > 0;
  const hasCompletedPretest = hasStartedPretest;
  const canStartLessons = hasCompletedPretest;
  const canStartPosttest = (gameState?.completedLessons?.length || 0) === 5;

  return (
    <div className="min-h-screen bg-background molecule-bg">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 dna-helix rounded-lg flex items-center justify-center">
                <Dna className="text-white w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">ENDAGAME</h1>
                <p className="text-xs text-muted-foreground">Dna & Genetic Engineering</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium" data-testid="text-username">
                    {user?.firstName || user?.email || 'Student'}
                  </p>
                  <p className="text-xs text-muted-foreground">Biology Student</p>
                </div>
                <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                  {(user?.firstName?.[0] || user?.email?.[0] || 'S').toUpperCase()}
                </div>
              </div>
              <ScoreDisplay score={gameState?.totalScore || 0} />
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => window.location.href = "/api/logout"}
                data-testid="button-logout"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-1 bg-muted p-1 rounded-xl">
            <button className="flex-1 flex items-center justify-center px-4 py-2.5 text-sm font-medium rounded-lg bg-card text-foreground shadow-sm transition-all hover:shadow-md">
              <Play className="w-4 h-4 mr-2" />
              Home
            </button>
            <button 
              className="flex-1 flex items-center justify-center px-4 py-2.5 text-sm font-medium rounded-lg text-muted-foreground transition-all hover:text-foreground hover:bg-card/50"
              onClick={() => navigate('/pretest')}
              data-testid="tab-pretest"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Pretest
            </button>
            <button 
              className="flex-1 flex items-center justify-center px-4 py-2.5 text-sm font-medium rounded-lg text-muted-foreground transition-all hover:text-foreground hover:bg-card/50"
              onClick={() => navigate('/lessons')}
              disabled={!canStartLessons}
              data-testid="tab-lessons"
            >
              <Microscope className="w-4 h-4 mr-2" />
              Lessons
            </button>
            <button 
              className="flex-1 flex items-center justify-center px-4 py-2.5 text-sm font-medium rounded-lg text-muted-foreground transition-all hover:text-foreground hover:bg-card/50"
              onClick={() => navigate('/gene-editor')}
              disabled={!canStartLessons}
              data-testid="tab-gene-editor"
            >
              <Dna className="w-4 h-4 mr-2" />
              Gene Editor
            </button>
            <button 
              className="flex-1 flex items-center justify-center px-4 py-2.5 text-sm font-medium rounded-lg text-muted-foreground transition-all hover:text-foreground hover:bg-card/50"
              onClick={() => navigate('/results')}
              data-testid="tab-results"
            >
              <Trophy className="w-4 h-4 mr-2" />
              Results
            </button>
          </nav>
        </div>

        {/* Welcome Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Main Welcome Card */}
          <div className="lg:col-span-2 bg-card rounded-xl p-6 shadow-lg border border-border">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Welcome to ENDAGAME</h2>
                <p className="text-muted-foreground mb-4">
                  Explore the fascinating world of Dna, genetics, and genetic engineering through 
                  interactive 3D experiences and engaging mini-games.
                </p>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <span className="flex items-center"><Clock className="w-4 h-4 mr-1" /> 45-90 min</span>
                  <span className="flex items-center"><Users className="w-4 h-4 mr-1" /> Grades 9-12</span>
                  <span className="flex items-center"><Gamepad2 className="w-4 h-4 mr-1" /> Interactive</span>
                </div>
              </div>
              <div className="w-20 h-20 dna-helix rounded-xl flex items-center justify-center animate-float">
                <Dna className="text-white w-10 h-10" />
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">Overall Progress</span>
                <span className="text-sm text-muted-foreground" data-testid="text-progress">
                  {gameState?.completedLessons?.length || 0} of 7 completed
                </span>
              </div>
              <Progress value={overallProgress} className="w-full" />
              <div className="grid grid-cols-2 gap-4 mt-6">
                <Button
                  onClick={() => {
                    if (!hasStartedPretest) {
                      navigate('/pretest');
                    } else if (!canStartPosttest) {
                      navigate('/lessons');
                    } else {
                      navigate('/posttest');
                    }
                  }}
                  className="bg-primary text-primary-foreground transition-all duration-200 hover:shadow-lg hover:scale-105"
                  data-testid="button-continue"
                >
                  <Play className="w-4 h-4 mr-2" />
                  {!hasStartedPretest ? 'Start Pretest' : !canStartPosttest ? 'Continue Lessons' : 'Take Posttest'}
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => navigate('/results')}
                  className="transition-all duration-200 hover:shadow-lg hover:scale-105"
                  data-testid="button-leaderboard"
                >
                  <Trophy className="w-4 h-4 mr-2" />
                  View Leaderboard
                </Button>
              </div>
            </div>
          </div>

          {/* Stats Card */}
          <div className="space-y-6">
            {/* Score Card */}
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Your Progress</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Pretest Score</span>
                    <span className="font-semibold text-foreground" data-testid="text-pretest-score">
                      {gameState?.pretestScore || 0}/20
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Lessons Completed</span>
                    <span className="font-semibold text-foreground" data-testid="text-lessons-completed">
                      {gameState?.completedLessons?.length || 0}/5
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Total Points</span>
                    <span className="font-semibold text-primary" data-testid="text-total-score">
                      {gameState?.totalScore || 0} pts
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Achievements</h3>
                <div className="space-y-3">
                  <div className={`flex items-center space-x-3 ${gameState?.achievements?.includes('Dna Rookie') ? '' : 'opacity-50'}`}>
                    <div className="w-8 h-8 bg-primary/20 text-primary rounded-lg flex items-center justify-center">
                      <Dna className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Dna Rookie</p>
                      <p className="text-xs text-muted-foreground">Completed pretest</p>
                    </div>
                  </div>
                  <div className={`flex items-center space-x-3 ${gameState?.achievements?.includes('Gene Explorer') ? '' : 'opacity-50'}`}>
                    <div className="w-8 h-8 bg-secondary/20 text-secondary rounded-lg flex items-center justify-center">
                      <Microscope className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Gene Explorer</p>
                      <p className="text-xs text-muted-foreground">Completed 3 lessons</p>
                    </div>
                  </div>
                  <div className={`flex items-center space-x-3 ${gameState?.achievements?.includes('Genome Master') ? '' : 'opacity-50'}`}>
                    <div className="w-8 h-8 bg-muted text-muted-foreground rounded-lg flex items-center justify-center">
                      <Crown className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Genome Master</p>
                      <p className="text-xs text-muted-foreground">Score {'>'} 80% in posttest</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Lesson Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {lessons.map((lesson) => (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              isCompleted={gameState?.completedLessons?.includes(lesson.id) || false}
              isCurrent={gameState?.currentLesson === lesson.id}
              isLocked={lesson.id > (gameState?.currentLesson || 1)}
              score={gameState?.lessonScores?.[lesson.id] || 0}
              onStart={() => navigate('/lessons')}
            />
          ))}

          {/* Gene Editor Card */}
          <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="h-32 bg-gradient-to-br from-indigo-500 to-purple-600 relative animate-glow">
              <div className="absolute inset-0 flex items-center justify-center">
                <Dna className="text-white w-10 h-10 opacity-80" />
              </div>
              <Badge className="absolute top-4 right-4 bg-white/20 text-white border-white/20">
                3D Tool
              </Badge>
            </div>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-2">3D Gene Editor</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Interactive sandbox for conceptual gene editing experiments.
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                  <span className="text-xs text-muted-foreground">Sandbox</span>
                </div>
                <Button 
                  size="sm" 
                  variant="secondary"
                  onClick={() => navigate('/gene-editor')}
                  disabled={!canStartLessons}
                  data-testid="button-gene-editor"
                >
                  Launch Editor
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      {/* Background Music Player */}
      <BackgroundMusicPlayer musicTrack="peaceful" />
    </div>
  );
}
