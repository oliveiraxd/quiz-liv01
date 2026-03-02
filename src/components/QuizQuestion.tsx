import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Question, Option, QuizAnswer } from "@/types/quiz";
import { ChevronRight, ChevronLeft } from "lucide-react";

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
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
  const [singleSelection, setSingleSelection] = useState<string>("");

  const handleMultipleSelection = (optionIndex: number, checked: boolean) => {
    if (checked) {
      if (selectedOptions.length < (question.maxPoints || 2)) {
        setSelectedOptions([...selectedOptions, optionIndex]);
      }
    } else {
      setSelectedOptions(selectedOptions.filter(index => index !== optionIndex));
    }
  };

  const handleSubmit = () => {
    let totalPoints = 0;
    let selectedAnswers: string[] = [];
    
    if (question.allowMultiple) {
      totalPoints = selectedOptions.reduce((sum, index) => {
        return sum + question.options[index].points;
      }, 0);
      selectedAnswers = selectedOptions.map(index => question.options[index].text);
    } else if (singleSelection) {
      const selectedIndex = parseInt(singleSelection);
      totalPoints = question.options[selectedIndex].points;
      selectedAnswers = [question.options[selectedIndex].text];
    }
    
    const answer: QuizAnswer = {
      questionId: question.id,
      questionText: question.text,
      selectedAnswers,
      points: totalPoints
    };
    
    onAnswer(answer);
  };

  const canProceed = question.allowMultiple 
    ? selectedOptions.length > 0 
    : singleSelection !== "";

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
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
            <span className="text-sm text-muted-foreground">
              Pergunta {currentQuestion} de {totalQuestions}
            </span>
          </div>
          
          <div className="w-full bg-secondary rounded-full h-2 mb-6">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentQuestion / totalQuestions) * 100}%` }}
            />
          </div>
        </div>

        <Card className="p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 leading-tight">
            {question.text}
          </h2>

          {question.allowMultiple ? (
            <div className="space-y-4 mb-8">
              <p className="text-sm text-muted-foreground mb-4">
                Selecione até {question.maxPoints} opções:
              </p>
              {question.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                  <Checkbox
                    id={`option-${index}`}
                    checked={selectedOptions.includes(index)}
                    onCheckedChange={(checked) => 
                      handleMultipleSelection(index, checked as boolean)
                    }
                    disabled={!selectedOptions.includes(index) && selectedOptions.length >= (question.maxPoints || 2)}
                  />
                  <Label 
                    htmlFor={`option-${index}`}
                    className="text-base cursor-pointer flex-1"
                  >
                    {option.text}
                  </Label>
                </div>
              ))}
            </div>
          ) : (
            <RadioGroup 
              value={singleSelection} 
              onValueChange={setSingleSelection}
              className="space-y-4 mb-8"
            >
              {question.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value={index.toString()} id={`radio-${index}`} />
                  <Label 
                    htmlFor={`radio-${index}`}
                    className="text-base cursor-pointer flex-1"
                  >
                    {option.text}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          )}

          <Button 
            onClick={handleSubmit}
            disabled={!canProceed}
            className="w-full text-lg py-6 h-auto font-semibold"
          >
            {currentQuestion === totalQuestions ? "Finalizar" : "Avançar"}
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </Card>
      </div>
    </div>
  );
};