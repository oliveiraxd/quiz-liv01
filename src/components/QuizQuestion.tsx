import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Question, QuizAnswer } from "@/types/quiz";
import { ChevronLeft } from "lucide-react";

interface QuizQuestionProps {
  question: Question;
  currentQuestion: number;
  totalQuestions: number;
  onAnswer: (answer: QuizAnswer) => void;
  onBack: () => void;
}

export const QuizQuestion = ({ 
  question, 
  currentQuestion, 
  totalQuestions, 
  onAnswer, 
  onBack 
}: QuizQuestionProps) => {

  const handleOptionClick = (index: number) => {
    const selectedOption = question.options[index];
    const answer: QuizAnswer = {
      questionId: question.id,
      questionText: question.text,
      selectedAnswers: [selectedOption.text],
      points: selectedOption.points
    };
    
    // Auto-advance
    setTimeout(() => {
      onAnswer(answer);
    }, 300);
  };

  // Start progress at 25% if it's the first question, then proportionally
  const baseProgress = 25;
  const progressPerQuestion = 75 / totalQuestions;
  const progressWidth = baseProgress + (currentQuestion - 1) * progressPerQuestion;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 transition-all duration-500 animate-in fade-in slide-in-from-bottom-4">
      <div className="max-w-2xl mx-auto w-full">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <Button 
              variant="ghost" 
              onClick={onBack}
              className="p-2"
              disabled={currentQuestion === 1}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <span className="text-sm font-medium text-muted-foreground mr-2">
              Passo {currentQuestion} de {totalQuestions}
            </span>
          </div>
          
          <div className="w-full bg-secondary rounded-full h-2 mb-6 overflow-hidden">
            <div 
              className="bg-primary h-full rounded-full transition-all duration-700 ease-in-out"
              style={{ width: `${progressWidth}%` }}
            />
          </div>
        </div>

        <Card className="p-6 md:p-8 bg-card shadow-lg border-primary/10">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 leading-tight">
            {question.text}
          </h2>

          <div className="space-y-4">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionClick(index)}
                className="w-full flex items-center space-x-3 p-5 rounded-lg border-2 border-transparent bg-muted/50 hover:bg-primary/5 hover:border-primary/50 hover:shadow-sm transition-all duration-200 text-left cursor-pointer group"
              >
                <div className="w-5 h-5 rounded-full border-2 border-muted-foreground group-hover:border-primary flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <span className="text-base md:text-lg font-medium text-foreground group-hover:text-primary transition-colors flex-1">
                  {option.text}
                </span>
              </button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};