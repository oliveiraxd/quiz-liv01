import { Question } from '../types/quiz';

export const questionsFase1: Question[] = [
  {
    id: 1,
    text: "Quantos clientes ativos você tem na sua carteira?",
    options: [
      { text: "Até 50 clientes", points: 50 },
      { text: "Entre 50 e 100 clientes", points: 100 },
      { text: "Entre 100 e 200 clientes", points: 200 },
      { text: "Entre 200 e 300 clientes", points: 300 },
      { text: "Mais de 300 clientes", points: 500 }
    ]
  },
  {
    id: 2,
    text: "Quantos desses clientes você já abordou sobre seguro de vida?",
    options: [
      { text: "Nenhum", points: 0 },
      { text: "Menos de 20%", points: 0 },
      { text: "Entre 20% e 50%", points: 0 },
      { text: "Mais de 50%", points: 0 }
    ]
  },
  {
    id: 3,
    text: "Hoje, quantos clientes da sua base têm seguro de vida com você?",
    options: [
      { text: "Nenhum", points: 0 },
      { text: "Menos de 10 clientes", points: 0 },
      { text: "Entre 10 e 30 clientes", points: 0 },
      { text: "Mais de 30 clientes", points: 0 }
    ]
  },
  {
    id: 4,
    text: "Se você tivesse um processo estruturado, quantos clientes da sua base você acredita que contratariam seguro de vida?",
    options: [
      { text: "Nenhum", points: 0 },
      { text: "Menos de 20%", points: 0 },
      { text: "Entre 20% e 50%", points: 0 },
      { text: "Mais de 50%", points: 0 }
    ]
  }
];

export const questionsFase2: Question[] = [
  {
    id: 5,
    text: "Hoje, qual dessas frases mais descreve sua realidade com seguro de vida?",
    options: [
      { text: "Tenho carteira, mas não vendo vida como poderia", points: 10 },
      { text: "Já vendo alguma coisa, mas sem previsibilidade", points: 8 },
      { text: "Sei que deveria vender mais, mas adio esse movimento", points: 7 },
      { text: "Ainda não tratei isso como prioridade", points: 3 }
    ]
  },
  {
    id: 6,
    text: "Você já oferece seguro de vida para seus clientes?",
    options: [
      { text: "Sim, com frequência", points: 10 },
      { text: "Sim, mas sem consistência", points: 7 },
      { text: "Já tentei, mas não consegui manter", points: 5 },
      { text: "Nunca ofereci", points: 2 }
    ]
  },
  {
    id: 7,
    text: "Quais são suas maiores dificuldades hoje para vender seguro de vida?",
    type: 'checkbox',
    allowMultiple: true,
    maxPoints: 10,
    options: [
      { text: "Não consigo agendar reuniões", points: 4 },
      { text: "Travo nas objeções dos clientes", points: 3 },
      { text: "Não sei conduzir bem a conversa", points: 3 },
      { text: "Não sei montar ou apresentar a proposta", points: 2 },
      { text: "Falta rotina / organização comercial", points: 2 },
      { text: "Falta tempo", points: 1 },
      { text: "Não vejo muito potencial na minha base", points: 0 }
    ]
  },
  {
    id: 8,
    text: "Você tem um processo estruturado para vender seguro de vida?",
    options: [
      { text: "Sim, tenho processo, rotina e etapas definidas", points: 10 },
      { text: "Tenho parcialmente, mas não consigo executar sempre", points: 6 },
      { text: "Não, hoje faço tudo no improviso", points: 2 }
    ]
  },
  {
    id: 9,
    text: "Em quanto tempo você quer começar a aumentar sua comissão com seguro de vida?",
    options: [
      { text: "Nos próximos 30 dias", points: 10 },
      { text: "Nos próximos 2 a 3 meses", points: 7 },
      { text: "Ainda este ano", points: 5 },
      { text: "Sem pressa, estou só entendendo melhor", points: 2 }
    ]
  },
  {
    id: 10,
    text: "Você teria disponibilidade para participar de uma reunião estratégica de 30 minutos nos próximos 3 dias?",
    options: [
      { text: "Sim", points: 10 },
      { text: "Talvez", points: 5 },
      { text: "Não", points: 0 }
    ]
  },
  {
    id: 11,
    text: "Se eu puder te ajudar a destravar a venda de seguro de vida, o que mais faria diferença pra você hoje?",
    type: 'text',
    options: []
  }
];

export const questions = [...questionsFase1, ...questionsFase2];