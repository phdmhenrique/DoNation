export const fetchMemberDonationsData = (username) => {
  const member = {
    memberName: 'Alex Johnson',
    memberUsername: 'alexjohnson',
    memberImage: '../../src/Assets/photo-people-00.jpg',
    donations: [
      {
        donationId: 1,
        donationTitle: "Tutoring Classes",
        donationBanner: "../../src/Assets/banner-service-11.jpg",
        donationTags: ["Education", "Free", "Children"],
        donationQuantityAvailability: 20,
        donationAvailability: {
          Mon: ["2:00 PM", "4:00 PM", "6:00 PM"],
          Tue: ["3:00 PM", "5:00 PM", "7:00 PM"],
          Wed: ["2:00 PM", "4:00 PM", "6:00 PM"],
          Thu: ["3:00 PM", "5:00 PM", "7:00 PM"],
          Fri: ["2:00 PM", "4:00 PM", "6:00 PM"],
          Sat: ["9:00 AM", "11:00 AM", "1:00 PM"],
          Sun: ["10:00 AM", "12:00 PM", "2:00 PM"],
        },
        donationTimeCreated: "9:00 AM",
        donationDate: "June 15",
        donationDescription: "We offer tutoring classes for elementary school children, focusing on math and language skills to support their studies and improve academic performance.",
        donationAddress: "Hope Street, 150, New Hope District, SP",
        donationStatus: 0, // ongoing
      },
      {
        donationId: 4,
        donationTitle: "English Classes for Children",
        donationBanner: "../../src/Assets/banner-service-12.jpg",
        donationTags: ["Education", "Children", "Free"],
        donationQuantityAvailability: 15,
        donationAvailability: {
          Mon: ["10:00 AM", "2:00 PM", "4:00 PM"],
          Tue: ["9:00 AM", "12:00 PM", "6:00 PM"],
          Wed: ["11:00 AM", "1:00 PM", "5:00 PM"],
          Thu: ["8:00 AM", "3:00 PM", "7:00 PM"],
          Fri: ["7:00 AM", "10:00 AM", "8:00 PM"],
          Sat: ["6:00 AM", "2:00 PM", "4:00 PM"],
          Sun: ["9:00 AM", "1:00 PM", "3:00 PM"],
        },
        donationTimeCreated: "2:00 PM",
        donationDate: "July 12",
        donationDescription: "We offer free English classes for children in the community. The classes are interactive and aim to improve communication skills in a fun and engaging way.",
        donationAddress: "Central Avenue, 300, São Paulo, SP",
        donationStatus: 0, // ongoing
      },
      {
        donationId: 5,
        donationTitle: "Basic Food Basket Distribution",
        donationBanner: "../../src/Assets/banner-service-13.jpg",
        donationTags: ["Food", "Free", "Basic Needs"],
        donationQuantityAvailability: 50,
        donationAvailability: {
          Mon: ["9:00 AM", "11:00 AM", "2:00 PM"],
          Tue: ["8:00 AM", "12:00 PM", "4:00 PM"],
          Wed: ["10:00 AM", "1:00 PM", "5:00 PM"],
          Thu: ["7:00 AM", "3:00 PM", "7:00 PM"],
          Fri: ["6:00 AM", "2:00 PM", "6:00 PM"],
          Sat: ["5:00 AM", "12:00 PM", "8:00 PM"],
          Sun: ["8:00 AM", "11:00 AM", "1:00 PM"],
        },
        donationTimeCreated: "11:00 AM",
        donationDate: "June 30",
        donationDescription: "We distribute basic food baskets containing essential items like rice, beans, oil, sugar, among others, to families in need.",
        donationAddress: "Flower Street, 500, Rio de Janeiro, RJ",
        donationStatus: 0, // ongoing
      },
      // Completed donations
      {
        donationId: 2,
        donationTitle: "Used Clothing Distribution",
        donationBanner: "../../src/Assets/banner-service-09.png",
        donationTags: ["Clothing", "Free", "Basic Needs"],
        donationQuantityAvailability: 100,
        donationAvailability: {
          Mon: ["9:00 AM", "11:00 AM", "2:00 PM"],
          Tue: ["10:00 AM", "12:00 PM", "3:00 PM"],
          Wed: ["8:00 AM", "11:00 AM", "1:00 PM"],
          Thu: ["7:00 AM", "10:00 AM", "2:00 PM"],
          Fri: ["9:00 AM", "12:00 PM", "4:00 PM"],
          Sat: ["8:00 AM", "11:00 AM", "2:00 PM"],
          Sun: ["10:00 AM", "1:00 PM", "3:00 PM"],
        },
        donationTimeCreated: "10:00 AM",
        donationDate: "August 15",
        donationDescription: "We distribute used clothing in good condition to families in need. The items are selected and cleaned before delivery, ensuring quality and comfort for recipients.",
        donationAddress: "Pioneer Street, 250, São Paulo, SP",
        donationStatus: 1, // completed
      },
      {
        donationId: 6,
        donationTitle: "Bicycle Repair Workshop",
        donationBanner: "../../src/Assets/banner-service-14.jpg",
        donationTags: ["Service", "Free", "Transportation"],
        donationQuantityAvailability: 20,
        donationAvailability: {
          Mon: ["9:00 AM", "12:00 PM", "3:00 PM"],
          Tue: ["10:00 AM", "1:00 PM", "4:00 PM"],
          Wed: ["11:00 AM", "2:00 PM", "5:00 PM"],
          Thu: ["8:00 AM", "12:00 PM", "6:00 PM"],
          Fri: ["7:00 AM", "1:00 PM", "7:00 PM"],
          Sat: ["6:00 AM", "2:00 PM", "8:00 PM"],
          Sun: ["9:00 AM", "12:00 PM", "3:00 PM"],
        },
        donationTimeCreated: "3:00 PM",
        donationDate: "September 10",
        donationDescription: "We hold bicycle repair workshops for the community, helping maintain bicycles in good condition and promoting sustainable transportation.",
        donationAddress: "Freedom Street, 200, Porto Alegre, RS",
        donationStatus: 1, // completed
      },
      {
        donationId: 7,
        donationTitle: "Park Cleaning Initiative",
        donationBanner: "../../src/Assets/banner-service-15.jpeg",
        donationTags: ["Service", "Free", "Environment"],
        donationQuantityAvailability: 30,
        donationAvailability: {
          Mon: ["8:00 AM", "10:00 AM", "2:00 PM"],
          Tue: ["9:00 AM", "11:00 AM", "3:00 PM"],
          Wed: ["10:00 AM", "12:00 PM", "4:00 PM"],
          Thu: ["8:00 AM", "11:00 AM", "1:00 PM"],
          Fri: ["7:00 AM", "9:00 AM", "12:00 PM"],
          Sat: ["6:00 AM", "10:00 AM", "2:00 PM"],
          Sun: ["8:00 AM", "10:00 AM", "12:00 PM"],
        },
        donationTimeCreated: "9:00 AM",
        donationDate: "October 8",
        donationDescription: "We organize park and public square cleaning initiatives, aiming to improve community spaces and encourage civic participation.",
        donationAddress: "Palm Square, 50, Recife, PE",
        donationStatus: 1, // completed
      },
      // Canceled donations
      {
        donationId: 3,
        donationTitle: "Hygiene Kits Distribution",
        donationBanner: "../../src/Assets/banner-service-16.jpg",
        donationTags: ["Hygiene", "Free", "Basic Needs"],
        donationQuantityAvailability: 40,
        donationAvailability: {
          Mon: ["9:00 AM", "11:00 AM", "2:00 PM"],
          Tue: ["10:00 AM", "12:00 PM", "4:00 PM"],
          Wed: ["8:00 AM", "11:00 AM", "1:00 PM"],
          Thu: ["7:00 AM", "10:00 AM", "2:00 PM"],
          Fri: ["9:00 AM", "12:00 PM", "4:00 PM"],
          Sat: ["8:00 AM", "11:00 AM", "2:00 PM"],
          Sun: ["10:00 AM", "1:00 PM", "3:00 PM"],
        },
        donationTimeCreated: "10:00 AM",
        donationDate: "April 20",
        donationDescription: "We distribute personal hygiene kits containing items like soap, toothpaste, toothbrush, and hand sanitizer to people in need.",
        donationAddress: "Sunset Boulevard, 180, Curitiba, PR",
        donationStatus: 2, // canceled
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
