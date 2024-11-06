export const fetchMemberDonationsData = (username) => {
  const member = {
    memberName: 'Alex Johnson',
    memberUsername: 'alexjohnson',
    memberImage: '../../src/Assets/photo-people-00.jpg',
    donations: [
      {
        donationId: 1,
        donationTitle: "Aulas de Reforço Escolar",
        donationBanner: "../../src/Assets/banner-service-11.jpg",
        donationTags: ["Educação", "Gratuito", "Crianças"],
        donationQuantityAvailability: 20,
        donationAvailability: {
          Seg: ["14:00", "16:00", "18:00"],
          Ter: ["15:00", "17:00", "19:00"],
          Qua: ["14:00", "16:00", "18:00"],
          Qui: ["15:00", "17:00", "19:00"],
          Sex: ["14:00", "16:00", "18:00"],
          Sáb: ["09:00", "11:00", "13:00"],
          Dom: ["10:00", "12:00", "14:00"],
        },
        donationTimeCreated: "09:00",
        donationDate: "Junho 15",
        donationDescription: "Oferecemos aulas de reforço escolar para crianças do ensino fundamental, com foco em matemática e português, para ajudar nos estudos e melhorar o desempenho escolar.",
        donationAddress: "Rua Esperança, 150, Bairro Nova Esperança, SP",
        donationStatus: 0, // em andamento
      },
      {
        donationId: 4,
        donationTitle: "Aulas de Inglês para Crianças",
        donationBanner: "../../src/Assets/banner-service-12.jpg",
        donationTags: ["Educação", "Crianças", "Gratuito"],
        donationQuantityAvailability: 15,
        donationAvailability: {
          Seg: ["10:00", "14:00", "16:00"],
          Ter: ["09:00", "12:00", "18:00"],
          Qua: ["11:00", "13:00", "17:00"],
          Qui: ["08:00", "15:00", "19:00"],
          Sex: ["07:00", "10:00", "20:00"],
          Sáb: ["06:00", "14:00", "16:00"],
          Dom: ["09:00", "13:00", "15:00"],
        },
        donationTimeCreated: "14:00",
        donationDate: "Julho 12",
        donationDescription: "Oferecemos aulas de inglês gratuitas para crianças da comunidade. As aulas são interativas e visam melhorar as habilidades de comunicação dos pequenos de forma divertida e envolvente.",
        donationAddress: "Avenida Central, 300, São Paulo, SP",
        donationStatus: 0, // em andamento
      },
      {
        donationId: 5,
        donationTitle: "Distribuição de Cestas Básicas",
        donationBanner: "../../src/Assets/banner-service-13.jpg",
        donationTags: ["Alimentação", "Gratuito", "Necessidades Básicas"],
        donationQuantityAvailability: 50,
        donationAvailability: {
          Seg: ["09:00", "11:00", "14:00"],
          Ter: ["08:00", "12:00", "16:00"],
          Qua: ["10:00", "13:00", "17:00"],
          Qui: ["07:00", "15:00", "19:00"],
          Sex: ["06:00", "14:00", "18:00"],
          Sáb: ["05:00", "12:00", "20:00"],
          Dom: ["08:00", "11:00", "13:00"],
        },
        donationTimeCreated: "11:00",
        donationDate: "Junho 30",
        donationDescription: "Distribuímos cestas básicas contendo alimentos essenciais para famílias em situação de vulnerabilidade. Cada cesta contém itens como arroz, feijão, óleo, açúcar, entre outros.",
        donationAddress: "Rua das Flores, 500, Rio de Janeiro, RJ",
        donationStatus: 0, // em andamento
      },
      // Doações concluídas
      {
        donationId: 2,
        donationTitle: "Distribuição de Roupas Usadas",
        donationBanner: "../../src/Assets/banner-service-09.png",
        donationTags: ["Roupas", "Gratuito", "Necessidades Básicas"],
        donationQuantityAvailability: 100,
        donationAvailability: {
          Seg: ["09:00", "11:00", "14:00"],
          Ter: ["10:00", "12:00", "15:00"],
          Qua: ["08:00", "11:00", "13:00"],
          Qui: ["07:00", "10:00", "14:00"],
          Sex: ["09:00", "12:00", "16:00"],
          Sáb: ["08:00", "11:00", "14:00"],
          Dom: ["10:00", "13:00", "15:00"],
        },
        donationTimeCreated: "10:00",
        donationDate: "Agosto 15",
        donationDescription: "Distribuímos roupas usadas em bom estado para famílias necessitadas. As peças são selecionadas e higienizadas antes da entrega, garantindo qualidade e conforto para os beneficiados.",
        donationAddress: "Rua dos Pioneiros, 250, São Paulo, SP",
        donationStatus: 1, // concluída
      },
      {
        donationId: 6,
        donationTitle: "Oficina de Reparo de Bicicletas",
        donationBanner: "../../src/Assets/banner-service-14.jpg",
        donationTags: ["Serviço", "Gratuito", "Transporte"],
        donationQuantityAvailability: 20,
        donationAvailability: {
          Seg: ["09:00", "12:00", "15:00"],
          Ter: ["10:00", "13:00", "16:00"],
          Qua: ["11:00", "14:00", "17:00"],
          Qui: ["08:00", "12:00", "18:00"],
          Sex: ["07:00", "13:00", "19:00"],
          Sáb: ["06:00", "14:00", "20:00"],
          Dom: ["09:00", "12:00", "15:00"],
        },
        donationTimeCreated: "15:00",
        donationDate: "Setembro 10",
        donationDescription: "Realizamos oficinas de reparo de bicicletas para a comunidade, ajudando a manter as bicicletas em bom estado e promovendo o uso de transporte sustentável.",
        donationAddress: "Rua da Liberdade, 200, Porto Alegre, RS",
        donationStatus: 1, // concluída
      },
      {
        donationId: 7,
        donationTitle: "Mutirão de Limpeza de Praças",
        donationBanner: "../../src/Assets/banner-service-15.jpeg",
        donationTags: ["Serviço", "Gratuito", "Meio Ambiente"],
        donationQuantityAvailability: 30,
        donationAvailability: {
          Seg: ["08:00", "10:00", "14:00"],
          Ter: ["09:00", "11:00", "15:00"],
          Qua: ["10:00", "12:00", "16:00"],
          Qui: ["08:00", "11:00", "13:00"],
          Sex: ["07:00", "09:00", "12:00"],
          Sáb: ["06:00", "10:00", "14:00"],
          Dom: ["08:00", "10:00", "12:00"],
        },
        donationTimeCreated: "09:00",
        donationDate: "Outubro 8",
        donationDescription: "Organizamos mutirões de limpeza de praças e parques públicos, visando a melhoria do ambiente comunitário e incentivando a participação cidadã.",
        donationAddress: "Praça das Palmeiras, 50, Recife, PE",
        donationStatus: 1, // concluída
      },
      // Doações canceladas
      {
        donationId: 3,
        donationTitle: "Distribuição de Kits de Higiene",
        donationBanner: "../../src/Assets/banner-service-16.jpg",
        donationTags: ["Higiene", "Gratuito", "Necessidades Básicas"],
        donationQuantityAvailability: 40,
        donationAvailability: {
          Seg: ["09:00", "11:00", "14:00"],
          Ter: ["10:00", "12:00", "16:00"],
          Qua: ["08:00", "11:00", "13:00"],
          Qui: ["07:00", "10:00", "14:00"],
          Sex: ["09:00", "12:00", "16:00"],
          Sáb: ["08:00", "11:00", "14:00"],
          Dom: ["10:00", "13:00", "15:00"],
        },
        donationTimeCreated: "10:00",
        donationDate: "Abril 20",
        donationDescription: "Distribuímos kits de higiene pessoal contendo itens como sabonete, pasta de dente, escova de dente, e álcool em gel para famílias em situação de vulnerabilidade.",
        donationAddress: "Rua da Paz, 100, Fortaleza, CE",
        donationStatus: 2, // cancelada
      },
      {
        donationId: 8,
        donationTitle: "Feira de Troca de Livros",
        donationBanner: "../../src/Assets/banner-service-17.jpg",
        donationTags: ["Educação", "Cultura", "Gratuito"],
        donationQuantityAvailability: 200,
        donationAvailability: {
          Seg: ["10:00", "14:00", "16:00"],
          Ter: ["09:00", "12:00", "18:00"],
          Qua: ["11:00", "13:00", "17:00"],
          Qui: ["08:00", "15:00", "19:00"],
          Sex: ["07:00", "10:00", "20:00"],
          Sáb: ["06:00", "14:00", "16:00"],
          Dom: ["09:00", "13:00", "15:00"],
        },
        donationTimeCreated: "14:00",
        donationDate: "Maio 25",
        donationDescription: "Promovemos uma feira de troca de livros onde os participantes podem trazer livros que já leram e trocar por outros, incentivando a leitura e a troca de conhecimento.",
        donationAddress: "Rua das Letras, 400, Belo Horizonte, MG",
        donationStatus: 2, // cancelada
      },
    ],
  };

  // Filtrar doações pelo nome de usuário
  const filteredDonations = member.donations.filter(donation => member.memberUsername === username);

  return {
    member,
    donations: filteredDonations,
  };
};
