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
    title: `Você está perdendo ${financialLoss} a cada ano`,
    message: 'A cada 100 clientes da sua carteira, você adiciona aproximadamente R$ 50.750 no financeiro da sua corretora',
    ctaText: 'Continuar',
    financialLoss: financialLoss
  };
};

export const getLeadClassification = (score: number) => {
  if (score >= 45) return 'Quente';
  if (score >= 30) return 'Morno';
  return 'Frio';
};