import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { QuizResult, UserData } from "@/types/quiz";
import { getWhatsAppUrl } from "@/utils/quiz";
import { MessageCircle, Trophy, Target, Lightbulb } from "lucide-react";
import expertPhoto from "@/assets/expert-photo.jpg";
interface ResultPageProps {
  result: QuizResult;
  userData: UserData;
  onRestart: () => void;
}
export const ResultPage = ({
  result,
  userData,
  onRestart
}: ResultPageProps) => {
  const handleGroupClick = () => {
    window.open('https://chat.whatsapp.com/Lv7czJrmdD7JjobU5XQqba', '_blank');
  };
  const getIcon = () => {
    switch (result.level) {
      case 'ready':
        return <Trophy className="w-12 h-12 text-primary" />;
      case 'almost-ready':
        return <Target className="w-12 h-12 text-primary" />;
      default:
        return <Lightbulb className="w-12 h-12 text-primary" />;
    }
  };
  const getScoreColor = () => {
    switch (result.level) {
      case 'ready':
        return 'text-green-600';
      case 'almost-ready':
        return 'text-yellow-600';
      default:
        return 'text-orange-600';
    }
  };
  return <div className="min-h-screen bg-background flex items-center justify-center p-4">
    <div className="max-w-2xl mx-auto w-full">
      <Card className="p-6 md:p-8 text-center">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-6">
            {getIcon()}
          </div>

          <div className="mb-6">
            <div className={`text-4xl font-bold mb-2 ${getScoreColor()}`}>
              {result.score}/14 pontos
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              {result.title}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {result.message}
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-8 p-6 bg-muted/30 rounded-lg">
          <img src={expertPhoto} alt="Prof. Dr. Luã Oliveira" className="w-16 h-16 rounded-full object-cover" />
          <div className="text-center md:text-left">
            <p className="text-sm font-medium text-foreground">
              Prof. Dr. Luã Oliveira
            </p>
            <p className="text-xs text-muted-foreground">
              Especialista em aprovação no mestrado
            </p>
          </div>
        </div>

        <Button onClick={handleGroupClick} size="lg" className="w-full text-base md:text-lg py-6 h-auto font-semibold mb-4 mx-0">
          <MessageCircle className="w-5 h-5 flex-shrink-0 mr-2" />
          <div className="flex flex-col items-center md:items-start text-center md:text-left leading-tight">
            <span>Entre na comunidade VIP para receber</span>
            <span>mais dicas e conteúdos grátis</span>
          </div>
        </Button>

        <Button variant="outline" onClick={onRestart} className="text-sm">
          Refazer o teste
        </Button>

        <div className="mt-6 text-sm text-muted-foreground">
          <p>
            O material será enviado diretamente para o seu e-mail em alguns minutos.
          </p>
        </div>
      </Card>
    </div>
  </div>;
};