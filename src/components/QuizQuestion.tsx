import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Question, QuizAnswer } from "@/types/quiz";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
  const [openText, setOpenText] = useState("");

  const handleRadioClick = (index: number) => {
    const selectedOption = question.options[index];
    const answer: QuizAnswer = {
      questionId: question.id,
      questionText: question.text,
      selectedAnswers: [selectedOption.text],
      points: selectedOption.points
    };
    
    setTimeout(() => {
      onAnswer(answer);
      setSelectedOptions([]);
      setOpenText("");
    }, 300);
  };

  const handleCheckboxChange = (index: number, checked: boolean) => {
    if (checked) {
      setSelectedOptions(prev => [...prev, index]);
    } else {
      setSelectedOptions(prev => prev.filter(i => i !== index));
    }
  };

  const handleSubmitManual = () => {
    let answerObj: QuizAnswer;

    if (question.type === 'text') {
      answerObj = {
        questionId: question.id,
        questionText: question.text,
        selectedAnswers: [],
        points: 0,
        openText: openText
      };
    } else {
      // Checkbox case
      const points = selectedOptions.reduce((sum, idx) => sum + question.options[idx].points, 0);
      const texts = selectedOptions.map(idx => question.options[idx].text);
      // Cap at maxPoints if specified, though rule says "máximo sugerido: 10", we cap it if needed
      const finalPoints = question.maxPoints ? Math.min(points, question.maxPoints) : points;
      
      answerObj = {
        questionId: question.id,
        questionText: question.text,
        selectedAnswers: texts,
        points: finalPoints
      };
    }
    onAnswer(answerObj);
    setSelectedOptions([]);
    setOpenText("");
  };

  const baseProgress = 25;
  const progressPerQuestion = 75 / totalQuestions;
  const progressWidth = baseProgress + (currentQuestion - 1) * progressPerQuestion;

  const isRadio = !question.type || question.type === 'radio';
  const isCheckbox = question.type === 'checkbox';
  const isText = question.type === 'text';

  const canProceed = isText ? openText.trim().length > 0 : selectedOptions.length > 0;

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 transition-all duration-500 animate-in fade-in slide-in-from-bottom-4">
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
            {isRadio && question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleRadioClick(index)}
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

            {isCheckbox && question.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                <Checkbox
                  id={`option-${index}`}
                  checked={selectedOptions.includes(index)}
                  onCheckedChange={(checked) => handleCheckboxChange(index, checked as boolean)}
                />
                <Label htmlFor={`option-${index}`} className="text-base cursor-pointer flex-1">
                  {option.text}
                </Label>
              </div>
            ))}

            {isText && (
              <div className="mb-8">
                <Textarea 
                  placeholder="Sua resposta aqui..." 
                  className="w-full min-h-[150px] p-4 text-base"
                  value={openText}
                  onChange={(e) => setOpenText(e.target.value)}
                />
              </div>
            )}

            {!isRadio && (
              <Button 
                onClick={handleSubmitManual}
                disabled={!canProceed}
                className="w-full text-lg py-6 mt-6 h-auto font-semibold"
              >
                Avançar
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};