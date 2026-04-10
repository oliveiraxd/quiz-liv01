import { Question } from '../types/quiz';

export const questionsFase1: Question[] = [
  {
    id: 1,
    text: "Para começarmos direto ao ponto: quantos clientes ativos você tem na sua carteira hoje?",
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

export const questionsFase2: Question[] = [
  {
    id: 5,
    text: "Hoje, como você puxa o assunto \"seguro de vida\" com clientes de Auto ou Residencial?",
    options: [
      { text: "Não costumo puxar esse assunto", points: 0 },
      { text: "Mando mensagem fria (tipo panfleto digital)", points: 1 },
      { text: "Aproveito a janela de renovação", points: 2 }
    ]
  },
  {
    id: 6,
    text: "Você tem alguma cadência automática/fluxo pronto ou oferece no \"feeling\"?",
    options: [
      { text: "Tenho tudo automatizado no meu funil", points: 2 },
      { text: "Faço manualmente quando lembro/consigo", points: 1 },
      { text: "Ainda não faço esse tipo de controle", points: 0 }
    ]
  },
  {
    id: 7,
    text: "Seu time de vendas (ou você) se sente 100% confortável lidando com objeções difíceis sobre morte e invalidez?",
    options: [
      { text: "Sim, rebatemos no automático", points: 2 },
      { text: "Parcialmente (as vezes trava um pouco na venda)", points: 1 },
      { text: "Tenho/Temos dificuldade para lidar de forma natural", points: 0 }
    ]
  },
  {
    id: 8,
    text: "Quantas propostas de Vida você perde pura e simplesmente por argumentação de preço do cliente?",
    options: [
      { text: "Quase todas as que eu oferto esbarram em preço", points: 0 },
      { text: "Mais ou menos metade das negociações", points: 1 },
      { text: "Raramente, sei vender valor", points: 2 }
    ]
  },
  {
    id: 9,
    text: "Com qual frequência vocês abordam cada cliente antigo da base sobre o assunto Vida?",
    options: [
      { text: "Nunca os abordei sobre isso", points: 0 },
      { text: "Talvez tenha acontecido uma vez na vida", points: 1 },
      { text: "Ao menos uma vez por ano", points: 2 }
    ]
  },
  {
    id: 10,
    text: "O seu sistema de gestão de corretora (CRM) te avisa automaticamente quem são os clientes ideais para você vender Vida hoje?",
    options: [
      { text: "Sim, tenho os números mastigadinhos", points: 2 },
      { text: "Não, costumo garimpar a ouro para achar eles", points: 1 },
      { text: "Tenho meus dados totalmente desorganizados", points: 0 }
    ]
  }
];

// Mantenha questions retrocompatível por segurança, se precisar
export const questions = [...questionsFase1, ...questionsFase2];