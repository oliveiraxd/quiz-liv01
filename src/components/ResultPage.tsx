import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { QuizResult } from "@/types/quiz";
import { ArrowDownRight, AlertTriangle, ArrowRight, Activity } from "lucide-react";

interface ResultPageProps {
  result: QuizResult;
  onContinue: () => void;
}

export const ResultPage = ({
  result,
  onContinue
}: ResultPageProps) => {

  // Number Ticker animation for financial loss effect
  const [displayValue, setDisplayValue] = useState(0);
  const targetValue = parseFloat(result.financialLoss?.replace(/[^\d.,]/g, '').replace(/\./g, '').replace(',', '.') || "0");
  
  useEffect(() => {
    let start = 0;
    const end = targetValue;
    if (start === end) return;
    const duration = 1500;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setDisplayValue(end);
        clearInterval(timer);
      } else {
        setDisplayValue(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [targetValue]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
  };

  const isMoreThan = result.financialLoss?.includes("Mais de") ? "Mais de " : "";

  return (
    <div className="min-h-screen bg-background transition-colors duration-1000 flex flex-col items-center justify-center p-4">
      {/* Dynamic dark red tinted background for "loss aversion" psychological effect */}
      <div className="fixed inset-0 bg-red-950/20 mix-blend-multiply pointer-events-none transition-opacity duration-1000 opacity-100 z-0"></div>

      <div className="max-w-2xl mx-auto w-full space-y-6 relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        {/* Banking Extract Style Card */}
        <Card className="p-0 overflow-hidden border-2 border-red-500/30 shadow-2xl bg-card">
          <div className="bg-red-500/10 p-6 flex items-center justify-center border-b border-red-500/20">
            <AlertTriangle className="w-8 h-8 text-red-500 mr-3 animate-pulse" />
            <h2 className="text-xl md:text-2xl font-bold text-red-500 uppercase tracking-wider">
              Diagnóstico de Prejuízo
            </h2>
          </div>
          
          <div className="p-6 md:p-8">
            <div className="text-center mb-10">
              <p className="text-sm font-medium text-muted-foreground mb-2 uppercase tracking-wide">
                Sangramento Financeiro nos Próximos 2 Anos
              </p>
              <div className="relative inline-block mt-2">
                <span className="absolute -left-6 top-1 md:top-2 text-2xl text-red-500/70">-</span>
                <span className="text-5xl md:text-6xl font-black text-red-600 tracking-tighter">
                  {isMoreThan}{formatCurrency(displayValue)}
                </span>
                <ArrowDownRight className="absolute -right-10 bottom-2 w-8 h-8 text-red-500 animate-bounce" />
              </div>
            </div>

            <div className="bg-red-500/5 rounded-lg p-6 border border-red-500/10 mb-8 text-center">
              <h3 className="text-xl font-bold text-foreground mb-2 uppercase tracking-tight">
                {result.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Esse é o dinheiro que você está literalmente entregando de graça para a concorrência toda semana por não possuir um método maduro na sua corretora.
              </p>
            </div>

            <div className="bg-primary/5 rounded-lg p-5 border border-primary/20 mb-10">
              <p className="text-sm font-medium text-primary text-center">
                Dica técnica: A cada 100 clientes encostados que você possui na sua base hoje, existe R$ 50.750,00 de puro faturamento inexplorado em Seguros de Vida.
              </p>
            </div>

            {/* Transition CTA Section */}
            <div className="border-t border-border pt-8 mt-4">
              <p className="text-center text-foreground mb-6 text-lg font-medium">
                Agora que você viu o tamanho desse problema, eu preciso entender com <span className="text-primary font-bold">precisão cirúrgica</span> onde esse dinheiro está vazando na sua operação de vendas.
              </p>
              
              <Button 
                onClick={onContinue} 
                size="lg" 
                className="w-full text-lg py-7 h-auto font-bold shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] bg-primary hover:bg-primary/90 group"
              >
                <Activity className="w-6 h-6 mr-3 group-hover:animate-pulse" />
                Descobrir o Gargalo da Operação
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <p className="text-center text-sm text-muted-foreground mt-4 font-medium animate-pulse">
                Leva apenas mais 30 segundos (são 6 cliques restantes)
              </p>
            </div>

          </div>
        </Card>
      </div>
    </div>
  );
};