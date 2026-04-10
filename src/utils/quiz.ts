import { QuizResult } from '../types/quiz';

export const calculateResultPhase1 = (points: number): QuizResult => {
  let financialLoss = "";
  if (points <= 50) financialLoss = "R$ 25.375";
  else if (points <= 100) financialLoss = "R$ 50.750";
  else if (points <= 200) financialLoss = "R$ 101.500";
  else if (points <= 300) financialLoss = "R$ 152.250";
  else financialLoss = "a partir de R$ 152.250";

  return {
    score: points,
    level: '',
    title: `Você pode estar deixando ${financialLoss} na mesa nos próximos 2 anos.`,
    message: 'A cada 100 clientes na sua base, você adiciona aproximadamente R$ 50.750 em potencial nos próximos 2 anos.',
    ctaText: 'Continuar',
    financialLoss: financialLoss
  };
};

export const getLeadClassification = (score: number) => {
  if (score >= 45) return 'Quente';
  if (score >= 30) return 'Morno';
  return 'Frio';
};