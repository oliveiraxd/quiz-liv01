import { Question } from '../types/quiz';

export const questions: Question[] = [
  {
    id: 1,
    text: "Para começarmos direto ao ponto: quantos clientes ativos você tem na sua carteira hoje?",
    options: [
      { text: "Até 50 clientes", points: 50 },
      { text: "Entre 50 e 100 clientes", points: 100 },
      { text: "Entre 100 e 200 clientes", points: 200 },
      { text: "Entre 200 e 300 clientes", points: 300 },
      { text: "Mais de 300 clientes", points: 500 } // using 500 max limit to categorize
    ]
  },
  {
    id: 2,
    text: "Seja sincero: para quantos desses clientes você já ofereceu ativamente um Seguro de Vida?",
    options: [
      { text: "Ainda não ofereci para nenhum (0%)", points: 0 },
      { text: "Para menos de 20% da base", points: 0 },
      { text: "Entre 20% e 50% da carteira", points: 0 },
      { text: "Para mais da metade deles", points: 0 }
    ]
  },
  {
    id: 3,
    text: "E olhando agora para a realidade... hoje, quantos clientes já têm Seguro de Vida fechado com você?",
    options: [
      { text: "Nenhum", points: 0 },
      { text: "Menos de 10 clientes", points: 0 },
      { text: "Entre 10 e 30 clientes", points: 0 },
      { text: "Mais de 30 clientes", points: 0 }
    ]
  },
  {
    id: 4,
    text: "Se hoje você tivesse algo mastigado e uma abordagem garantida nas mãos, quantos desses clientes você acredita que topariam fechar com você?",
    options: [
      { text: "Não tenho certeza, talvez menos de 20%", points: 0 },
      { text: "Entre 20% e 50%", points: 0 },
      { text: "Tenho certeza que mais da metade (50%+)", points: 0 },
      { text: "Pelo menos garantiria um não, quase 100% dariam ouvidos", points: 0 }
    ]
  }
];