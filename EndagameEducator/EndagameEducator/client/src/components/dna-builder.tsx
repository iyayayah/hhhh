import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dna, RotateCcw, Check, Sparkles, Trash2 } from "lucide-react";

interface Nucleotide {
  base: 'A' | 'T' | 'G' | 'C';
  paired?: boolean;
  position?: number;
}

interface DNABuilderProps {
  onScoreUpdate: (score: number) => void;
  onComplete?: () => void;
}

const BASE_PAIRS = {
  'A': 'T',
  'T': 'A',
  'G': 'C',
  'C': 'G'
} as const;

const BASE_COLORS = {
  'A': 'bg-blue-500 text-white border-blue-600',
  'T': 'bg-red-500 text-white border-red-600',
  'G': 'bg-green-500 text-white border-green-600',
  'C': 'bg-yellow-500 text-white border-yellow-600'
} as const;

export function DNABuilder({ onScoreUpdate, onComplete }: DNABuilderProps) {
  const [strand1, setStrand1] = useState<(Nucleotide | null)[]>([null, null, null, null, null, null]);
  const [strand2, setStrand2] = useState<(Nucleotide | null)[]>([null, null, null, null, null, null]);
  const [selectedBase, setSelectedBase] = useState<'A' | 'T' | 'G' | 'C' | null>(null);
  const [score, setScore] = useState(0);
  const [completedPairs, setCompletedPairs] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    onScoreUpdate(score);
  }, [score, onScoreUpdate]);

  useEffect(() => {
    if (completedPairs === 6) {
      setShowSuccess(true);
      onComplete?.();
      setTimeout(() => setShowSuccess(false), 3000);
    }
  }, [completedPairs, onComplete]);

  const handleBaseSelect = (base: 'A' | 'T' | 'G' | 'C') => {
    setSelectedBase(selectedBase === base ? null : base);
  };

  const handleStrandClick = (strandIndex: 0 | 1, position: number) => {
    const currentStrand = strandIndex === 0 ? strand1 : strand2;
    const otherStrand = strandIndex === 0 ? strand2 : strand1;
    
    // If position is filled and no base is selected, remove the nucleotide
    if (currentStrand[position] && !selectedBase) {
      handleRemoveNucleotide(strandIndex, position);
      return;
    }
    
    // If no base selected, return
    if (!selectedBase) return;

    // If position already filled, replace it
    if (currentStrand[position]) {
      handleRemoveNucleotide(strandIndex, position);
    }

    const newStrand = [...currentStrand];
    newStrand[position] = { base: selectedBase, position };

    if (strandIndex === 0) {
      setStrand1(newStrand);
    } else {
      setStrand2(newStrand);
    }

    // Check for correct base pairing
    if (otherStrand[position]) {
      const pairedBase = otherStrand[position]!.base;
      if (BASE_PAIRS[selectedBase] === pairedBase) {
        // Correct pairing!
        const newScore = score + 15;
        setScore(newScore);
        setCompletedPairs(prev => prev + 1);
        
        // Mark both bases as paired
        const updatedStrand1 = strandIndex === 0 ? 
          newStrand.map((n, i) => i === position ? { ...n!, paired: true } : n) :
          strand1.map((n, i) => i === position ? (n ? { ...n, paired: true } : n) : n);
        
        const updatedStrand2 = strandIndex === 1 ? 
          newStrand.map((n, i) => i === position ? { ...n!, paired: true } : n) :
          strand2.map((n, i) => i === position ? (n ? { ...n, paired: true } : n) : n);

        setStrand1(updatedStrand1);
        setStrand2(updatedStrand2);
      }
    }

    setSelectedBase(null);
  };

  const handleRemoveNucleotide = (strandIndex: 0 | 1, position: number) => {
    const currentStrand = strandIndex === 0 ? strand1 : strand2;
    const otherStrand = strandIndex === 0 ? strand2 : strand1;
    
    if (!currentStrand[position]) return;
    
    // Check if this was a correctly paired nucleotide
    const wasPaired = currentStrand[position]?.paired;
    if (wasPaired) {
      setScore(prev => Math.max(0, prev - 15));
      setCompletedPairs(prev => Math.max(0, prev - 1));
      
      // Remove pairing status from the opposite strand
      if (otherStrand[position]) {
        const updatedOtherStrand = otherStrand.map((n, i) => 
          i === position && n ? { ...n, paired: false } : n
        );
        
        if (strandIndex === 0) {
          setStrand2(updatedOtherStrand);
        } else {
          setStrand1(updatedOtherStrand);
        }
      }
    }
    
    // Remove the nucleotide
    const newStrand = [...currentStrand];
    newStrand[position] = null;
    
    if (strandIndex === 0) {
      setStrand1(newStrand);
    } else {
      setStrand2(newStrand);
    }
  };

  const handleReset = () => {
    setStrand1([null, null, null, null, null, null]);
    setStrand2([null, null, null, null, null, null]);
    setScore(0);
    setCompletedPairs(0);
    setSelectedBase(null);
    setShowSuccess(false);
  };

  const checkPairing = () => {
    let correctPairs = 0;
    for (let i = 0; i < 6; i++) {
      const base1 = strand1[i];
      const base2 = strand2[i];
      if (base1 && base2 && BASE_PAIRS[base1.base] === base2.base) {
        correctPairs++;
      }
    }
    
    const newScore = correctPairs * 15;
    setScore(newScore);
    setCompletedPairs(correctPairs);
    
    // Mark correct pairs
    const updatedStrand1 = strand1.map((n, i) => {
      if (n && strand2[i] && BASE_PAIRS[n.base] === strand2[i]!.base) {
        return { ...n, paired: true };
      }
      return n;
    });
    
    const updatedStrand2 = strand2.map((n, i) => {
      if (n && strand1[i] && BASE_PAIRS[n.base] === strand1[i]!.base) {
        return { ...n, paired: true };
      }
      return n;
    });

    setStrand1(updatedStrand1);
    setStrand2(updatedStrand2);
  };

  return (
    <div className="space-y-6">
      {/* Score and Success Animation */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Badge variant="outline" className="text-lg px-4 py-2">
            <Dna className="w-4 h-4 mr-2" />
            Score: {score} pts
          </Badge>
          <Badge variant="outline" className="text-lg px-4 py-2">
            <Check className="w-4 h-4 mr-2" />
            Pairs: {completedPairs}/6
          </Badge>
        </div>
        {showSuccess && (
          <div className="flex items-center space-x-2 animate-pulse-gentle text-green-600">
            <Sparkles className="w-5 h-5" />
            <span className="font-semibold">Perfect Double Helix!</span>
          </div>
        )}
      </div>

      {/* Nucleotide Palette */}
      <Card className="shadow-lg">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Nucleotide Palette</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {(['A', 'T', 'G', 'C'] as const).map((base) => (
              <button
                key={base}
                onClick={() => handleBaseSelect(base)}
                className={`
                  p-4 rounded-xl border-2 text-center cursor-pointer transition-all duration-200 
                  nucleotide-draggable ${BASE_COLORS[base]}
                  ${selectedBase === base ? 'ring-4 ring-primary/50 scale-105' : ''}
                `}
                data-testid={`nucleotide-${base}`}
              >
                <div className="text-2xl font-mono font-bold mb-2">{base}</div>
                <div className="text-xs opacity-90">
                  {base === 'A' ? 'Adenine' : 
                   base === 'T' ? 'Thymine' : 
                   base === 'G' ? 'Guanine' : 'Cytosine'}
                </div>
              </button>
            ))}
          </div>
          
          <div className="mt-4 p-4 bg-muted rounded-lg">
            <h4 className="font-semibold text-sm text-foreground mb-2">Base Pairing Rules</h4>
            <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
              <div className="flex items-center space-x-2">
                <span className="w-4 h-4 bg-blue-500 rounded-full"></span>
                <span>A ↔ T (2 bonds)</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-4 h-4 bg-green-500 rounded-full"></span>
                <span>G ↔ C (3 bonds)</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dna Double Helix Builder */}
      <Card className="shadow-lg">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Build Your Dna Double Helix</h3>
          
          <div className="space-y-4">
            {/* Strand 1 */}
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-foreground w-16">5' → 3'</span>
              <div className="flex space-x-2">
                {strand1.map((nucleotide, index) => (
                  <button
                    key={`strand1-${index}`}
                    onClick={() => handleStrandClick(0, index)}
                    className={`
                      w-12 h-12 rounded-lg border-2 flex items-center justify-center font-mono font-bold
                      transition-all duration-200 hover:scale-105
                      ${nucleotide ? 
                        `${BASE_COLORS[nucleotide.base]} ${nucleotide.paired ? 'ring-2 ring-green-400' : ''}` : 
                        'border-dashed border-muted-foreground/50 bg-muted hover:bg-muted/80 drop-zone'
                      }
                      ${selectedBase && !nucleotide ? 'drop-zone active' : ''}
                    `}
                    data-testid={`strand1-position-${index}`}
                  >
                    {nucleotide ? nucleotide.base : '?'}
                  </button>
                ))}
              </div>
            </div>

            {/* Hydrogen Bonds Visualization */}
            <div className="flex items-center space-x-2 pl-20">
              {strand1.map((nucleotide, index) => {
                const otherNucleotide = strand2[index];
                const isPaired = nucleotide && otherNucleotide && 
                                nucleotide.paired && otherNucleotide.paired;
                return (
                  <div key={`bond-${index}`} className="w-12 flex justify-center">
                    <div className={`h-6 border-l-2 ${
                      isPaired ? 'border-green-400 animate-pulse-gentle' : 'border-muted-foreground/30'
                    }`} />
                  </div>
                );
              })}
            </div>

            {/* Strand 2 */}
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-foreground w-16">3' ← 5'</span>
              <div className="flex space-x-2">
                {strand2.map((nucleotide, index) => (
                  <button
                    key={`strand2-${index}`}
                    onClick={() => handleStrandClick(1, index)}
                    className={`
                      w-12 h-12 rounded-lg border-2 flex items-center justify-center font-mono font-bold
                      transition-all duration-200 hover:scale-105
                      ${nucleotide ? 
                        `${BASE_COLORS[nucleotide.base]} ${nucleotide.paired ? 'ring-2 ring-green-400' : ''}` : 
                        'border-dashed border-muted-foreground/50 bg-muted hover:bg-muted/80 drop-zone'
                      }
                      ${selectedBase && !nucleotide ? 'drop-zone active' : ''}
                    `}
                    data-testid={`strand2-position-${index}`}
                  >
                    {nucleotide ? nucleotide.base : '?'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex space-x-4 mt-6">
            <Button
              onClick={checkPairing}
              className="bg-primary hover:bg-primary/90"
              data-testid="button-check-pairing"
            >
              <Check className="w-4 h-4 mr-2" />
              Check Base Pairing
            </Button>
            <Button
              onClick={handleReset}
              variant="outline"
              data-testid="button-reset-dna"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>

          <div className="mt-4 space-y-3">
            {selectedBase && (
              <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
                <p className="text-sm text-primary">
                  Selected: <span className="font-mono font-bold">{selectedBase}</span> - 
                  Click on an empty position to place this nucleotide
                </p>
              </div>
            )}
            
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-semibold text-sm text-foreground mb-2">How to Use:</h4>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Select a nucleotide (A, T, G, C) from the palette above</li>
                <li>• Click on empty positions to place nucleotides</li>
                <li>• Click on placed nucleotides to remove them</li>
                <li>• Build complementary base pairs: A-T and G-C</li>
                <li>• Green rings show correctly paired nucleotides</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
