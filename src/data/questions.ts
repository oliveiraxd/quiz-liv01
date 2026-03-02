import { Question } from '../types/quiz';

export const questions: Question[] = [
  {
    id: 1,
    text: "Quando você pretende tentar o processo seletivo?",
    options: [
      { text: "Nos próximos 3 meses", points: 3 },
      { text: "De 3 a 6 meses", points: 2 },
      { text: "De 6 a 12 meses", points: 1 },
      { text: "Sem prazo definido", points: 0 }
    ]
  },
  {
    id: 2,
    text: "Você já tentou algum processo seletivo antes?",
    options: [
      { text: "Sim", points: 2 },
      { text: "Não", points: 0 }
    ]
  },
  {
    id: 3,
    text: "Você já tem um tema ou ideia de projeto definido?",
    options: [
      { text: "Sim, definido", points: 2 },
      { text: "Tenho ideias, mas não organizei", points: 1 },
      { text: "Não tenho", points: 0 }
    ]
  },
  {
    id: 4,
    text: "Você já entrou em contato com possíveis orientadores?",
    options: [
      { text: "Sim", points: 2 },
      { text: "Não", points: 0 }
    ]
  },
  {
    id: 5,
    text: "Qual etapa do processo mais te preocupa?",
    allowMultiple: true,
    maxPoints: 2,
    options: [
      { text: "Prova escrita", points: 1 },
      { text: "Projeto de pesquisa", points: 1 },
      { text: "Entrevista", points: 1 },
      { text: "Edital/documentos", points: 1 }
    ]
  },
  {
    id: 6,
    text: "Quantas horas por semana você consegue dedicar aos estudos?",
    options: [
      { text: "Até 3h", points: 0 },
      { text: "4 a 6h", points: 1 },
      { text: "7 a 10h", points: 2 },
      { text: "Mais de 10h", points: 2 }
    ]
  },
  {
    id: 7,
    text: "Qual sua prioridade pessoal para entrar no mestrado agora?",
    options: [
      { text: "Baixa", points: 0 },
      { text: "Média", points: 1 },
      { text: "Alta", points: 2 }
    ]
  }
];