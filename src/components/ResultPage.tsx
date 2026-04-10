import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { QuizResult, UserData } from "@/types/quiz";
import { getWhatsAppUrl } from "@/utils/quiz";
import { ArrowDownRight, AlertTriangle, MessageCircle, Wallet } from "lucide-react";

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
    window.open(getWhatsAppUrl(userData, result), '_blank');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl mx-auto w-full space-y-6">
        
        {/* Banking Extract Style Card */}
        <Card className="p-0 overflow-hidden border-2 border-red-500/20 shadow-2xl bg-card">
          <div className="bg-red-500/10 p-6 flex items-center justify-center border-b border-red-500/20">
            <AlertTriangle className="w-8 h-8 text-red-500 mr-3" />
            <h2 className="text-xl md:text-2xl font-bold text-red-500 uppercase tracking-wider">
              Diagnóstico de Prejuízo
            </h2>
          </div>
          
          <div className="p-6 md:p-8">
            <div className="text-center mb-8">
              <p className="text-sm font-medium text-muted-foreground mb-2 uppercase tracking-wide">
                Potencial Financeiro Perdido
              </p>
              <div className="relative inline-block">
                <span className="absolute -left-6 top-1 md:top-2 text-2xl text-red-500/70">-</span>
                <span className="text-5xl md:text-6xl font-black text-red-600 tracking-tighter">
                  {result.financialLoss}
                </span>
                <ArrowDownRight className="absolute -right-10 bottom-2 w-8 h-8 text-red-500 animate-bounce" />
              </div>
            </div>

            <div className="bg-muted/50 rounded-lg p-5 border border-border mb-8">
              <div className="flex items-center gap-3 mb-3">
                <Wallet className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-bold text-foreground">
                  {result.title}
                </h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {result.message}
              </p>
            </div>

            <div className="bg-primary/5 rounded-lg p-5 border border-primary/20 mb-8">
              <p className="text-sm font-medium text-primary text-center">
                Dica fria: A cada 100 clientes encostados que você possui na sua base, existe R$ 50.750,00 de puro faturamento inexplorado nos próximos 2 anos.
              </p>
            </div>

            <Button 
              onClick={handleGroupClick} 
              size="lg" 
              className="w-full text-base md:text-lg py-6 h-auto font-bold shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 bg-green-600 hover:bg-green-700 text-white"
            >
              <MessageCircle className="w-6 h-6 mr-3" />
              Mandar Mensagem Pelo WhatsApp
            </Button>
          </div>
        </Card>

        <div className="text-center">
          <Button variant="ghost" onClick={onRestart} className="text-sm text-muted-foreground hover:text-foreground">
            Refazer o teste
          </Button>
        </div>
      </div>
    </div>
  );
};