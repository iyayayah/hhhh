import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { useGameState } from "@/hooks/useGameState";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { ThreeDNAHelix } from "@/components/three-dna-helix";
import { apiRequest } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";
import { 
  Dna, 
  ArrowLeft, 
  Zap, 
  TestTube, 
  Target, 
  Award,
  BarChart3,
  Eye,
  Shuffle
} from "lucide-react";

interface EditorTask {
  id: string;
  title: string;
  description: string;
  icon: typeof Dna;
  points: number;
  completed: boolean;
}

export default function GeneEditor() {
  const [, navigate] = useLocation();
  const { user, isLoading } = useAuth();
  const { gameState, refetch } = useGameState();
  const { toast } = useToast();
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [expressionLevel, setExpressionLevel] = useState([50]);
  const [selectedPromoter, setSelectedPromoter] = useState<'weak' | 'strong'>('weak');

  const tasks: EditorTask[] = [
    {
      id: 'promoter-swap',
      title: 'Promoter Swap Puzzle',
      description: 'Choose between weak/strong promoter modules to see changes in expression level',
      icon: Shuffle,
      points: 75,
      completed: completedTasks.includes('promoter-swap')
    },
    {
      id: 'reporter-insert',
      title: 'Reporter Insert',
      description: 'Insert a reporter gene to visualize expression location',
      icon: Eye,
      points: 100,
      completed: completedTasks.includes('reporter-insert')
    },
    {
      id: 'fix-mutation',
      title: 'Fix a Mutation',
      description: 'Identify and correct a mutation that affects protein function',
      icon: Target,
      points: 125,
      completed: completedTasks.includes('fix-mutation')
    }
  ];

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

  const updateProgressMutation = useMutation({
    mutationFn: async (progressData: any) => {
      await apiRequest('POST', '/api/game/progress', progressData);
    },
    onSuccess: () => {
      refetch();
    },
  });

  const completeTask = async (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task || completedTasks.includes(taskId)) return;

    setCompletedTasks(prev => [...prev, taskId]);
    
    // Update progress
    await updateProgressMutation.mutateAsync({
      ...gameState,
      totalScore: (gameState?.totalScore || 0) + task.points,
    });

    toast({
      title: "Task Completed!",
      description: `You earned ${task.points} points for completing ${task.title}!`,
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background molecule-bg flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 dna-helix rounded-full flex items-center justify-center mx-auto mb-4 animate-spin">
            <Dna className="text-white w-8 h-8" />
          </div>
          <p className="text-muted-foreground">Loading Gene Editor...</p>
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
                <h1 className="text-lg font-bold text-foreground">3D Gene Editor</h1>
                <p className="text-xs text-muted-foreground">Conceptual Sandbox</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary">
                <TestTube className="w-3 h-3 mr-1" />
                Simulation Mode
              </Badge>
              <div className="text-sm font-semibold text-primary" data-testid="text-editor-score">
                {completedTasks.reduce((total, taskId) => total + (tasks.find(t => t.id === taskId)?.points || 0), 0)} pts
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Safety Notice */}
        <Card className="mb-8 border-yellow-200 bg-yellow-50">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-yellow-800 mb-2">Educational Simulation</h3>
                <p className="text-sm text-yellow-700">
                  This is a conceptual learning tool using fictional Dna sequences. 
                  Real genetic engineering requires specialized training, regulated environments, and ethical oversight.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Task Panel */}
          <div className="space-y-6">
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-foreground mb-4">Guided Tasks</h2>
                <div className="space-y-3">
                  {tasks.map((task) => (
                    <div
                      key={task.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        selectedTask === task.id ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                      } ${task.completed ? 'bg-green-50 border-green-200' : ''}`}
                      onClick={() => setSelectedTask(task.id)}
                      data-testid={`task-${task.id}`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <task.icon className={`w-5 h-5 ${task.completed ? 'text-green-600' : 'text-primary'}`} />
                          <div>
                            <h3 className="font-semibold text-foreground text-sm">{task.title}</h3>
                            <p className="text-xs text-muted-foreground">{task.description}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          {task.completed ? (
                            <Badge variant="secondary" className="bg-green-100 text-green-700">
                              <Award className="w-3 h-3 mr-1" />
                              Done
                            </Badge>
                          ) : (
                            <span className="text-sm font-semibold text-primary">{task.points} pts</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Task Controls */}
            {selectedTask && (
              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-4">
                    {tasks.find(t => t.id === selectedTask)?.title}
                  </h3>
                  
                  {selectedTask === 'promoter-swap' && (
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">
                          Select Promoter Strength
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          <Button
                            variant={selectedPromoter === 'weak' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => {
                              setSelectedPromoter('weak');
                              setExpressionLevel([25]);
                            }}
                            data-testid="button-weak-promoter"
                          >
                            Weak Promoter
                          </Button>
                          <Button
                            variant={selectedPromoter === 'strong' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => {
                              setSelectedPromoter('strong');
                              setExpressionLevel([85]);
                            }}
                            data-testid="button-strong-promoter"
                          >
                            Strong Promoter
                          </Button>
                        </div>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">
                          Expression Level: {expressionLevel[0]}%
                        </label>
                        <div className="bg-muted rounded-lg p-4">
                          <div 
                            className="bg-primary rounded-full h-4 transition-all duration-500"
                            style={{ width: `${expressionLevel[0]}%` }}
                          />
                        </div>
                      </div>

                      <Button
                        onClick={() => completeTask('promoter-swap')}
                        disabled={completedTasks.includes('promoter-swap')}
                        className="w-full"
                        data-testid="button-complete-promoter-swap"
                      >
                        Apply Changes
                      </Button>
                    </div>
                  )}

                  {selectedTask === 'reporter-insert' && (
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Insert a GFP (Green Fluorescent Protein) reporter to visualize gene expression.
                      </p>
                      <div className="bg-muted rounded-lg p-4 text-center">
                        <div className="w-16 h-16 bg-green-500 rounded-full mx-auto mb-2 animate-pulse"></div>
                        <p className="text-sm text-foreground">GFP Expression Visualization</p>
                      </div>
                      <Button
                        onClick={() => completeTask('reporter-insert')}
                        disabled={completedTasks.includes('reporter-insert')}
                        className="w-full"
                        data-testid="button-complete-reporter"
                      >
                        Insert Reporter
                      </Button>
                    </div>
                  )}

                  {selectedTask === 'fix-mutation' && (
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        A point mutation has disrupted protein function. Identify and correct it.
                      </p>
                      <div className="bg-muted rounded-lg p-4">
                        <div className="font-mono text-sm">
                          <div className="text-foreground">Original: ATGCGTAAC</div>
                          <div className="text-red-600">Mutated:  ATGC<span className="bg-red-100 px-1">C</span>TAAC</div>
                        </div>
                      </div>
                      <Button
                        onClick={() => completeTask('fix-mutation')}
                        disabled={completedTasks.includes('fix-mutation')}
                        className="w-full"
                        data-testid="button-fix-mutation"
                      >
                        Fix Mutation
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* 3D Visualization */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg h-[600px]">
              <CardContent className="p-6 h-full">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-foreground">3D Dna Helix Viewer</h2>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">
                      <BarChart3 className="w-3 h-3 mr-1" />
                      Expression: {expressionLevel[0]}%
                    </Badge>
                  </div>
                </div>
                
                <div className="h-full bg-slate-50 rounded-lg border-2 border-dashed border-slate-300 flex items-center justify-center">
                  <ThreeDNAHelix 
                    expressionLevel={expressionLevel[0]}
                    promoterType={selectedPromoter}
                    hasReporter={completedTasks.includes('reporter-insert')}
                    isMutationFixed={completedTasks.includes('fix-mutation')}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Continue Button */}
        <div className="mt-8 text-center">
          <Card className="inline-block shadow-lg">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-2">Ready to continue?</h3>
              <p className="text-muted-foreground mb-4">
                Complete tasks to earn points, then move on to explore real-world applications.
              </p>
              <Button
                onClick={() => navigate('/posttest')}
                size="lg"
                className="bg-primary hover:bg-primary/90"
                data-testid="button-continue-posttest"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Continue to Final Assessment
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
