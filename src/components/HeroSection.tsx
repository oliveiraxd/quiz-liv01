import { Button } from "@/components/ui/button";
import { GraduationCap } from "lucide-react";
import expertPhoto from "@/assets/expert-photo.jpg";
interface HeroSectionProps {
  onStartQuiz: () => void;
}
export const HeroSection = ({
  onStartQuiz
}: HeroSectionProps) => {
  return <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-6">
            <GraduationCap className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
            Você está pronto para o <span className="text-primary">mestrado</span>?
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Descubra em 2 minutos o quanto você está preparado e receba um 
            <strong className="text-primary"> plano de 45 dias gratuito</strong>
          </p>
        </div>

        <Button onClick={onStartQuiz} size="lg" className="text-lg px-8 py-4 h-auto font-semibold mb-8">
          Começar Teste Gratuito
        </Button>

        <div className="text-center">
          <div className="flex justify-center mb-4">
            <img src={expertPhoto} alt="Luã Oliveira - Expert em Mestrado" className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover border-4 border-primary/20" />
          </div>
          <p className="text-sm text-foreground leading-relaxed max-w-2xl mx-auto">Sou Luã Oliveira, professor da Engenharia de Alimentos e doutor pela UFPA. Já ajudei dezenas de alunos a conquistar vagas em programas de mestrado pelo Brasil.</p>
          <p className="text-sm text-muted-foreground mt-4">
            ⏱️ Leva apenas 2 minutos • 100% gratuito
          </p>
        </div>
      </div>
    </div>;
};