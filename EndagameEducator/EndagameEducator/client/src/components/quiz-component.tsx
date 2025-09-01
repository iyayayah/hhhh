import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, ArrowRight } from "lucide-react";

interface Question {
  id: number;
  question: string;
  options: { label: string; value: string }[];
  correctAnswer: string;
  explanation?: string;
}

interface QuizComponentProps {
  question: Question;
  questionIndex: number;
  onAnswer: (questionIndex: number, selectedAnswer: string) => void;
  showFeedback?: boolean;
  selectedAnswer?: string;
}

export function QuizComponent({ 
  question, 
  questionIndex, 
  onAnswer, 
  showFeedback = true,
  selectedAnswer 
}: QuizComponentProps) {
  const [answered, setAnswered] = useState(false);
  const [showContinue, setShowContinue] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState<string>("");
  const [feedback, setFeedback] = useState<{ show: boolean; isCorrect: boolean; message: string }>({
    show: false,
    isCorrect: false,
    message: ""
  });

  const handleAnswer = (selected: string) => {
    if (answered) return;

    const isCorrect = selected === question.correctAnswer;
    setAnswered(true);
    setSelectedChoice(selected);
    
    if (showFeedback) {
      setFeedback({
        show: true,
        isCorrect,
        message: isCorrect 
          ? "✅ Correct! Well done!" 
          : `❌ Not quite right. The correct answer is ${question.correctAnswer}.`
      });
      
      // Show continue button after feedback
      setTimeout(() => {
        setShowContinue(true);
      }, 1000);
    } else {
      // Immediate proceed if no feedback
      proceedToNext(selected);
    }
  };

  const proceedToNext = (selected: string) => {
    onAnswer(questionIndex, selected);
    // Reset state for next question
    setAnswered(false);
    setShowContinue(false);
    setSelectedChoice("");
    setFeedback({ show: false, isCorrect: false, message: "" });
  };

  return (
    <Card className="shadow-lg">
      <CardContent className="p-8">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-foreground mb-4" data-testid={`question-${questionIndex}`}>
            {question.question}
          </h3>
          
          <div className="space-y-3">
            {question.options.map((option) => (
              <label 
                key={option.value}
                className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all duration-200 transform ${
                  selectedAnswer === option.value 
                    ? 'border-primary bg-primary/5 scale-105' 
                    : 'border-border hover:bg-muted/50 hover:scale-102'
                } ${answered ? 'pointer-events-none' : ''}`}
                data-testid={`option-${questionIndex}-${option.value}`}
              >
                <input 
                  type="radio" 
                  name={`question-${questionIndex}`} 
                  value={option.value}
                  checked={selectedAnswer === option.value}
                  onChange={() => handleAnswer(option.value)}
                  className="mr-3 text-primary"
                />
                <span className="font-medium mr-2">{option.value}.</span>
                <span>{option.label}</span>
                
                {answered && selectedAnswer === option.value && (
                  <div className="ml-auto">
                    {option.value === question.correctAnswer ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-600" />
                    )}
                  </div>
                )}
              </label>
            ))}
          </div>
        </div>

        {/* Feedback */}
        {feedback.show && (
          <div className={`p-6 rounded-lg mb-4 transition-all duration-300 transform ${
            feedback.isCorrect 
              ? 'bg-green-50 border border-green-200 text-green-800' 
              : 'bg-red-50 border border-red-200 text-red-800'
          }`} data-testid={`feedback-${questionIndex}`}>
            <div className="flex items-center gap-2 mb-3">
              {feedback.isCorrect ? (
                <CheckCircle className="w-6 h-6 text-green-600" />
              ) : (
                <XCircle className="w-6 h-6 text-red-600" />
              )}
              <span className="font-semibold text-lg">{feedback.message}</span>
            </div>
            {question.explanation && !feedback.isCorrect && (
              <div className="mb-4">
                <p className="font-medium mb-2">Explanation:</p>
                <p className="text-sm leading-relaxed">{question.explanation}</p>
              </div>
            )}
            {showContinue && (
              <Button
                onClick={() => proceedToNext(selectedChoice)}
                className="mt-4 bg-primary hover:bg-primary/90"
                data-testid={`continue-${questionIndex}`}
              >
                <ArrowRight className="w-4 h-4 mr-2" />
                Continue to Next Question
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
