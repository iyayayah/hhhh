import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dna, Play, Trophy, Users, Clock, Gamepad2 } from "lucide-react";

export default function Landing() {
  const handleLogin = () => {
    window.location.href = "/api/login";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/50 to-accent/20 molecule-bg">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b border-border shadow-sm">
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
            <Button onClick={handleLogin} className="bg-primary hover:bg-primary/90" data-testid="button-login">
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <div className="w-24 h-24 dna-helix rounded-2xl flex items-center justify-center mx-auto mb-8 animate-float">
            <Dna className="text-white w-12 h-12" />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Explore Dna &<br />
            <span className="text-primary">Genetic Engineering</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Journey through the fascinating world of genetics with interactive 3D experiences, 
            engaging mini-games, and hands-on Dna manipulation tools.
          </p>

          <div className="flex flex-wrap justify-center items-center gap-6 mb-8 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>45-90 minutes</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              <span>Grades 9-12</span>
            </div>
            <div className="flex items-center gap-2">
              <Gamepad2 className="w-5 h-5" />
              <span>Interactive Learning</span>
            </div>
          </div>

          <Button 
            onClick={handleLogin} 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            data-testid="button-start-game"
          >
            <Play className="w-6 h-6 mr-3" />
            Start Your Dna Journey
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="bg-card/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-primary/20 text-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                <Dna className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">3D Dna Builder</h3>
              <p className="text-sm text-muted-foreground">Build and manipulate Dna structures in stunning 3D</p>
            </CardContent>
          </Card>

          <Card className="bg-card/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-secondary/20 text-secondary rounded-xl flex items-center justify-center mx-auto mb-4">
                <Play className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Interactive Lessons</h3>
              <p className="text-sm text-muted-foreground">5 engaging lessons with hands-on activities</p>
            </CardContent>
          </Card>

          <Card className="bg-card/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-accent/20 text-accent rounded-xl flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Achievements</h3>
              <p className="text-sm text-muted-foreground">Earn badges and compete on leaderboards</p>
            </CardContent>
          </Card>

          <Card className="bg-card/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-orange-400/20 text-orange-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Classroom Ready</h3>
              <p className="text-sm text-muted-foreground">Perfect for group learning and teacher oversight</p>
            </CardContent>
          </Card>
        </div>

        {/* Learning Objectives */}
        <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-border">
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center">What You'll Learn</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs text-white font-bold">1</span>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Dna Structure & Components</h3>
                  <p className="text-sm text-muted-foreground">Understand nucleotides, base pairing, and the double helix</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs text-white font-bold">2</span>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Central Dogma</h3>
                  <p className="text-sm text-muted-foreground">Learn transcription, translation, and protein synthesis</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs text-white font-bold">3</span>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Genes & Heredity</h3>
                  <p className="text-sm text-muted-foreground">Explore genetic variation, mutations, and inheritance</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs text-white font-bold">4</span>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Genetic Engineering</h3>
                  <p className="text-sm text-muted-foreground">Discover CRISPR, plasmids, and recombinant Dna concepts</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs text-white font-bold">5</span>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">GMO Applications</h3>
                  <p className="text-sm text-muted-foreground">Examine real-world uses and ethical considerations</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs text-white font-bold">6</span>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">3D Gene Editor</h3>
                  <p className="text-sm text-muted-foreground">Use conceptual tools to explore gene editing safely</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
