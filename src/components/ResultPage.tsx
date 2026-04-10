import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { QuizResult } from "@/types/quiz";
import { ChevronRight } from "lucide-react";

interface ResultPageProps {
  result: QuizResult;
  onContinue: () => void;
}

export const ResultPage = ({
  result,
  onContinue
}: ResultPageProps) => {

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl mx-auto w-full space-y-6">
        
        <Card className="p-8 md:p-12 text-center border-border shadow-lg">
          <div className="mb-8 space-y-6">
             <h2 className="text-2xl md:text-3xl font-bold text-foreground">
               {result.title}
             </h2>

             <p className="text-lg text-muted-foreground">
               {result.message}
             </p>
          </div>

          <Button 
            onClick={onContinue} 
            size="lg" 
            className="w-full text-lg py-6 h-auto font-semibold mt-4"
          >
            Continuar
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </Card>
      </div>
    </div>
  );
};