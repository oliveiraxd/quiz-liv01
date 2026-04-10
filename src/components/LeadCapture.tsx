import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserData, QuizAnswer } from "@/types/quiz";
import { Gift, Shield, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LeadCaptureProps {
  onSubmit: (userData: UserData) => void;
  quizAnswers: QuizAnswer[];
}

export const LeadCapture = ({ onSubmit, quizAnswers }: LeadCaptureProps) => {
  const [formData, setFormData] = useState<UserData>({
    name: "",
    email: "",
    whatsapp: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const trackMetaPixelLead = () => {
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'Lead', {
        content_name: 'Quiz Lead Capture',
        value: 1,
        currency: 'BRL'
      });
    }
  };

  const sendToMakeWebhook = async (data: UserData) => {
    const WEBHOOK_URL = 'https://hook.us2.make.com/9bpok2ajmtkrl961c2bjrex18bvrlk96';
    const totalScore = quizAnswers.reduce((sum, answer) => sum + answer.points, 0);

    const getAnswer = (idx: number) => {
      const a = quizAnswers[idx];
      if (!a) return "";
      return Array.isArray(a.selectedAnswers) ? a.selectedAnswers.join(", ") : "";
    };

    const payload = {
      nome: data.name,
      email: data.email,
      whatsapp: data.whatsapp,
      pontuacao_potencial_perda: totalScore,
      qtd_clientes_ativos: getAnswer(0),
      ja_ofereceu_seguro: getAnswer(1),
      clientes_com_seguro: getAnswer(2),
      estimativa_conversao: getAnswer(3),
      meta: {
        page_url: typeof window !== 'undefined' ? window.location.href : '',
        sent_at: new Date().toISOString(),
        total_perguntas: quizAnswers.length
      }
    };

    console.log('Payload do webhook:', payload);

    // Tentativa A: POST JSON normal
    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        console.log('✅ Webhook enviado com sucesso (tentativa A)');
        trackMetaPixelLead();
        return true;
      }

      const errorBody = await response.text().catch(() => '');
      console.warn(`⚠️ Tentativa A falhou: ${response.status} ${response.statusText}`, errorBody);
    } catch (error) {
      console.warn('⚠️ Tentativa A erro (provavelmente CORS):', error instanceof Error ? error.message : error);
    }

    // Tentativa B: fallback no-cors (resposta opaca, mas dados chegam)
    try {
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify(payload)
      });
      console.log('✅ Webhook enviado via fallback no-cors (tentativa B)');
      trackMetaPixelLead();
      return true;
    } catch (error) {
      console.error('❌ Ambas tentativas falharam:', error instanceof Error ? error.message : error);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.whatsapp) return;
    setIsLoading(true);
    try {
      const success = await sendToMakeWebhook(formData);
      if (!success) {
        toast({
          title: "Aviso",
          description: "Houve um problema ao enviar os dados, mas você pode continuar.",
          variant: "default"
        });
      }
      onSubmit(formData);
    } catch (error) {
      console.error('Erro geral:', error);
      onSubmit(formData);
    } finally {
      setIsLoading(false);
    }
  };

  const isValid = formData.name && formData.email && formData.whatsapp;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md mx-auto w-full">
        <Card className="p-6 md:p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
              <Gift className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Quase lá!
            </h2>
            <p className="text-muted-foreground">
              Para calcular e revelar o tamanho do seu prejuízo atual e receber as dicas de como recuperar esse dinheiro na sua carteira, precisamos apenas de algumas informações:
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Nome completo *</Label>
              <Input id="name" type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="Digite seu nome completo" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">E-mail *</Label>
              <Input id="email" type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} placeholder="Digite seu melhor e-mail" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="whatsapp">WhatsApp *</Label>
              <Input id="whatsapp" type="tel" value={formData.whatsapp} onChange={e => setFormData({ ...formData, whatsapp: e.target.value })} placeholder="(11) 99999-9999" required />
            </div>

            <Button type="submit" disabled={!isValid || isLoading} className="w-full text-lg py-6 h-auto font-semibold">
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Enviando...
                </>
              ) : "Ver Meu Resultado"}
            </Button>

            <div className="flex items-center justify-center text-sm text-muted-foreground">
              <Shield className="w-4 h-4 mr-2" />
              Seus dados estão 100% seguros conosco
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};
