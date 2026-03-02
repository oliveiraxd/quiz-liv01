import { QuizResult } from '../types/quiz';

export const calculateResult = (score: number): QuizResult => {
  if (score <= 4) {
    return {
      score,
      level: 'not-ready',
      title: 'Você ainda não está pronto para o mestrado',
      message: 'Calma! Você ainda pode se preparar. Vou te mandar conteúdos básicos para começar agora.',
      ctaText: 'Entrar no Grupo VIP e Receber plano inicial'
    };
  } else if (score <= 8) {
    return {
      score,
      level: 'almost-ready',
      title: 'Você está quase pronto para o mestrado',
      message: 'Ótimo! Você já tem boa base, mas ainda falta organizar sua estratégia. Vou te enviar um plano de 45 dias para acelerar sua preparação.',
      ctaText: 'Entrar no Grupo VIP e Receber meu Plano de 45 dias'
    };
  } else {
    return {
      score,
      level: 'ready',
      title: 'Você está pronto para o mestrado',
      message: 'Parabéns! Você já tem perfil forte e só precisa dos ajustes finais para garantir sua vaga. Vou te mandar um plano de 45 dias focado nos detalhes finais.',
      ctaText: 'Entrar no Grupo VIP e Receber meu Plano de 45 dias'
    };
  }
};

export const getWhatsAppUrl = (userData: any, result: QuizResult) => {
  const message = `Olá! Acabei de fazer o Diagnóstico MasterPro e gostaria de receber meu plano de 45 dias.

Meu resultado: ${result.title}
Nome: ${userData.name}
Email: ${userData.email}`;
  
  return `https://wa.me/5511999999999?text=${encodeURIComponent(message)}`;
};