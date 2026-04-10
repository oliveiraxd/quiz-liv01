import { QuizResult } from '../types/quiz';

export const calculateResult = (score: number): QuizResult => {
  // score here is actually the selected base size from question 1
  if (score <= 50) {
    return {
      score,
      level: 'ate-50',
      title: 'Alerta vermelho',
      message: 'A sua base pode ser enxuta, mas você está literalmente deixando toda essa grana na mesa nos próximos 2 anos. Dinheiro que poderia estar cobrindo seus custos fixos e sobrou de graça no bolso da seguradora.',
      ctaText: 'Descobrir Como Recuperar Esse Dinheiro',
      financialLoss: 'R$ 25.375,00'
    };
  } else if (score <= 100) {
    return {
      score,
      level: '50-100',
      title: 'Vazamento Severo',
      message: 'Há um dinheiro invisível escorrendo da sua conta agora. A boa notícia? Esse lucro já está na sua base, esperando você buscá-lo.',
      ctaText: 'Descobrir Como Recuperar Esse Dinheiro',
      financialLoss: 'R$ 50.750,00'
    };
  } else if (score <= 200) {
    return {
      score,
      level: '100-200',
      title: 'Choque de realidade',
      message: 'Ter uma carteira incrível não vale de nada se você entra no modo passivo. Você está perdendo a chance de dobrar seu patrimônio líquido simplesmente por não aplicar o método de oferta correta.',
      ctaText: 'Descobrir Como Recuperar Esse Dinheiro',
      financialLoss: 'R$ 101.500,00'
    };
  } else if (score <= 300) {
    return {
      score,
      level: '200-300',
      title: 'Você está sangrando dinheiro',
      message: 'Ter uma base robusta sem vender seguro de vida de forma inteligente custa muito caro. Alguém vai vender vida para esses clientes — a escolha é se será você ou a concorrência.',
      ctaText: 'Descobrir Como Recuperar Esse Dinheiro',
      financialLoss: 'R$ 152.250,00'
    };
  } else {
    return {
      score,
      level: 'mais-300',
      title: 'Uma fortuna sendo ignorada',
      message: 'Com uma carteira desse tamanho, você está desperdiçando essa marca incrível na mesa de forma recorrente e passiva. O seu dinheiro está travado. Nós sabemos como destravar.',
      ctaText: 'Descobrir Como Recuperar Esse Dinheiro',
      financialLoss: 'Mais de R$ 152.250,00'
    };
  }
};

export const getWhatsAppUrl = (userData: any, result: QuizResult) => {
  const message = `Olá! Acabei de calcular meu prejuízo invisível e vi que estou deixando ${result.financialLoss} na mesa. Gostaria de saber como aplicar a estratégia na minha carteira!
Nome: ${userData.name}
Email: ${userData.email}`;
  
  return `https://wa.me/5511999999999?text=${encodeURIComponent(message)}`;
};