import { Button } from "@/components/ui/button";
import { Calculator } from "lucide-react";
import expertPhoto from "@/assets/expert-photo.jpg";

interface HeroSectionProps {
  onStartQuiz: () => void;
}

export const HeroSection = ({
  onStartQuiz
}: HeroSectionProps) => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-6">
            <Calculator className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
            Descubra exatamente o tamanho do <span className="text-primary">vazamento financeiro</span> na sua carteira de clientes hoje.
          </h1>
          <h2 className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Você não precisa de novos clientes.<br />
            Responda a 4 perguntas simples e calcule em menos de 1 minuto quanto dinheiro você está deixando na mesa todo mês por ignorar o Seguro de Vida na sua corretora.
          </h2>
        </div>

        <Button onClick={onStartQuiz} size="lg" className="text-lg px-8 py-4 h-auto font-semibold mb-8">
          Calcular minha perda financeira
        </Button>

        <div className="text-center mt-6">
          <div className="flex justify-center items-center gap-2 text-sm text-muted-foreground mt-4">
            <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Leva menos de 1 minuto
          </div>
        </div>
      </div>
    </div>
  );
};