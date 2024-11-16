// Function to simulate API call
export const fetchGroupData = async () => {
  return [
    {
      comunityId: 1,
      comunityTitle: "Solidarity in Network",
      comunityUsername: "solidarityinnetwork",
      comunityDonationsPerDay: 15,
      comunityDescription:
        "In this group, we donate what we can and take what we need. Services and goods will always be welcome. Let's improve our community and provide any kind of support to those in need in the Registro-SP area. Join us to make a difference!",
      comunityAddress: "Rua do Moinho, 232, Registro-SP",
      comunityImage: "../../src/Assets/comunity-image.jpg",
      comunityBanner: "../../src/Assets/comunity-banner-01.png",
      comunitySolicited: false,
      comunityAccepted: true,
      members: [
        {
          memberId: 1,
          memberName: "Cameron Williamson",
          memberUsername: "cameronwilliamson",
          memberImage: "../../src/Assets/photo-people.jpg",
          donations: [
            {
              donationId: 1,
              donationSolicited: false,
              donationTitle: "General Computer Maintenance",
              donationBanner: "../../src/Assets/banner-service-03.png",
              donationTags: ["Service", "Free", "Tools"],
              donationQuantityAvailability: 12,
              donationAvailability: {
                Mon: ["01:00", "04:00", "23:00", "19:00"],
                Tue: ["02:00", "08:00", "14:00", "20:00"],
                Wed: ["03:00", "09:00", "15:00", "21:00"],
                Thu: ["04:00", "10:00", "16:00", "22:00"],
                Fri: ["05:00", "11:00", "17:00", "23:00"],
                Sat: ["06:00", "12:00", "18:00", "00:00"],
                Sun: ["01:00", "07:00", "13:00", "19:00"],
              },
              donationTimeCreated: "19:30",
              donationDate: "June 24",
              donationDescription:
                "We offer free computer maintenance and repair services. If your computer is slow or having issues, we're here to help restore it to its best performance. Our specialists are dedicated and experienced volunteers.",
              donationAddress: "Rua do Marechal, Centro, 222 Registro, SP",
            },
          ],
        },
        {
          memberId: 2,
          memberName: "Courtney Henry",
          memberUsername: "courtneyhenry",
          memberImage: "../../src/Assets/photo-people-04.png",
          donations: [
            {
              donationId: 2,
              donationSolicited: false,
              donationTitle:
                "Donating Traditional Coffee Beans and Ground Coffee",
              donationBanner: "../../src/Assets/banner-service-06.jpg",
              donationTags: ["Beans", "Coffee"],
              donationQuantityAvailability: "15kg",
              donationAvailability: {
                Mon: ["04:00", "10:00", "16:00"],
                Tue: ["03:00", "09:00", "15:00"],
                Wed: ["02:00", "08:00", "14:00"],
                Thu: ["01:00", "07:00", "13:00"],
                Fri: ["00:00", "06:00", "12:00"],
                Sat: ["05:00", "11:00", "17:00"],
                Sun: ["04:00", "10:00", "16:00"],
              },
              donationTimeCreated: "12:30",
              donationDate: "May 06",
              donationDescription:
                "We are donating 15kg of coffee beans and ground coffee, perfect for those who love a good cup of coffee. This high-quality coffee is ideal for home use or small businesses.",
              donationAddress:
                "Praça da Liberdade, Liberdade, 100 Belo Horizonte, MG",
            },
          ],
        },
        {
          memberId: 3,
          memberName: "Jerome Bell",
          memberUsername: "jeromebell",
          memberImage: "../../src/Assets/photo-people-03.jpg",
          donations: [
            {
              donationId: 3,
              donationSolicited: false,
              donationTitle: "Diagnostic Service",
              donationBanner: "../../src/Assets/banner-service-04.png",
              donationTags: ["Health", "Medications"],
              donationQuantityAvailability: 115,
              donationAvailability: {
                Mon: ["09:00", "15:00", "21:00"],
                Tue: ["08:00", "14:00", "20:00"],
                Wed: ["07:00", "13:00", "19:00"],
                Thu: ["06:00", "12:00", "18:00"],
                Fri: ["05:00", "11:00", "17:00"],
                Sat: ["04:00", "10:00", "16:00"],
                Sun: ["03:00", "09:00", "15:00"],
              },
              donationTimeCreated: "15:24",
              donationDate: "August 22",
              donationDescription:
                "We offer free medical diagnostic services to detect potential health issues. Our healthcare professionals are ready to assist the community with exams and advice.",
              donationAddress:
                "Avenida das Américas, Barra da Tijuca, 3050 Rio de Janeiro, RJ",
            },
          ],
        },
        {
          memberId: 4,
          memberName: "Jada Jackson",
          memberUsername: "jadajackson",
          memberImage: "../../src/Assets/photo-people-02.jpg",
          donations: [
            {
              donationId: 4,
              donationSolicited: false,
              donationTitle: "Station Berries",
              donationBanner: "../../src/Assets/banner-service-05.png",
              donationTags: ["Health", "Nutrition"],
              donationQuantityAvailability: 72,
              donationAvailability: {
                Mon: ["12:00", "18:00", "00:00"],
                Tue: ["11:00", "17:00", "23:00"],
                Wed: ["10:00", "16:00", "22:00"],
                Thu: ["09:00", "15:00", "21:00"],
                Fri: ["08:00", "14:00", "20:00"],
                Sat: ["07:00", "13:00", "19:00"],
                Sun: ["06:00", "12:00", "18:00"],
              },
              donationTimeCreated: "09:14",
              donationDate: "March 12",
              donationDescription:
                "We are donating fresh and delicious seasonal berries, locally harvested. These fruits are rich in vitamins and perfect for healthy snacks.",
              donationAddress:
                "Travessa dos Pioneiros, Centro, 870 Curitiba, PR",
            },
          ],
        },
        {
          memberId: 5,
          memberName: "Jacob Jones",
          memberUsername: "jacobjones",
          memberImage: "../../src/Assets/photo-people-05.jpeg",
          donations: [
            {
              donationId: 5,
              donationSolicited: false,
              donationTitle: "Donating Various Fruits",
              donationBanner: "../../src/Assets/banner-service-07.jpg",
              donationTags: ["Fruits", "Promotion"],
              donationQuantityAvailability: 31,
              donationAvailability: {
                Mon: ["18:00", "00:00"],
                Tue: ["17:00", "23:00"],
                Wed: ["16:00", "22:00"],
                Thu: ["15:00", "21:00"],
                Fri: ["14:00", "20:00"],
                Sat: ["13:00", "19:00"],
                Sun: ["12:00", "18:00"],
              },
              donationTimeCreated: "18:52",
              donationDate: "November 17",
              donationDescription:
                "We are donating a variety of fresh fruits, including apples, oranges, and bananas. Great for a healthy and balanced diet.",
              donationAddress:
                "Rua das Palmeiras, Bela Vista, 450 Porto Alegre, RS",
            },
          ],
        },
        {
          memberId: 6,
          memberName: "Leslie Alexander",
          memberUsername: "lesliealexander",
          memberImage: "../../src/Assets/photo-people-06.jpg",
          donations: [
            {
              donationId: 6,
              donationSolicited: false,
              donationTitle: "Donating Cereal Packs",
              donationBanner: "../../src/Assets/banner-service-08.jpg",
              donationTags: ["Cereal", "Grains"],
              donationQuantityAvailability: 42,
              donationAvailability: {
                Mon: ["06:00", "12:00"],
                Tue: ["05:00", "11:00"],
                Wed: ["04:00", "10:00"],
                Thu: ["03:00", "09:00"],
                Fri: ["02:00", "08:00"],
                Sat: ["01:00", "07:00"],
                Sun: ["00:00", "06:00"],
              },
              donationTimeCreated: "20:13",
              donationDate: "January 02",
              donationDescription:
                "We are donating packs of cereals and grains. These foods are perfect for breakfast or as a nutritious snack during the day.",
              donationAddress:
                "Rua das Flores, Jardim das Acácias, 198 São Paulo, SP",
            },
          ],
        },
      ],
    },
    {
      comunityId: 2,
      comunityTitle: "Educational Support",
      comunityUsername: "educationsupport",
      comunityDonationsPerDay: 10,
      comunityDescription:
        "Our goal is to provide school supplies and educational support for underprivileged children in the São Paulo region.",
      comunityAddress: "Avenida Central, 123, São Paulo-SP",
      comunityImage: "../../src/Assets/comunity-image-02.png",
      comunityBanner: "../../src/Assets/comunity-banner-02.jpg",
      comunitySolicited: false,
      comunityAccepted: false,
      members: [
        {
          memberId: 1,
          memberName: "Helena Brigs",
          memberUsername: "helenabrigs",
          memberImage: "../../src/Assets/photo-people-07.jpg",
          donations: [
            {
              donationId: 1,
              donationTitle: "General Computer Maintenance",
              donationBanner: "../../src/Assets/banner-service-03.png",
              donationTags: ["Service", "Free", "Tools"],
              donationQuantityAvailability: 12,
              donationAvailability: {
                Mon: ["01:00", "04:00", "23:00", "19:00"],
                Tue: ["02:00", "08:00", "14:00", "20:00"],
                Wed: ["03:00", "09:00", "15:00", "21:00"],
                Thu: ["04:00", "10:00", "16:00", "22:00"],
                Fri: ["05:00", "11:00", "17:00", "23:00"],
                Sat: ["06:00", "12:00", "18:00", "00:00"],
                Sun: ["01:00", "07:00", "13:00", "19:00"],
              },
              donationTimeCreated: "19:30",
              donationDate: "June 24",
              donationDescription:
                "We offer free computer maintenance and repair services. If your computer is slow or having issues, we're here to help restore it to its best performance. Our specialists are dedicated and experienced volunteers.",
              donationAddress: "Rua do Marechal, Centro, 222 Registro, SP",
            },
          ],
        },
        {
          memberId: 2,
          memberName: "Jéssica Afton",
          memberUsername: "jessyafton",
          memberImage: "../../src/Assets/photo-people-08.jpg",
          donations: [
            {
              donationId: 2,
              donationTitle: "Traditional Coffee",
              donationBanner: "../../src/Assets/banner-service-06.jpg",
              donationTags: ["Beans", "Coffee"],
              donationQuantityAvailability: "15kg",
              donationAvailability: {
                Mon: ["04:00", "10:00", "16:00"],
                Tue: ["03:00", "09:00", "15:00"],
                Wed: ["02:00", "08:00", "14:00"],
                Thu: ["01:00", "07:00", "13:00"],
                Fri: ["00:00", "06:00", "12:00"],
                Sat: ["05:00", "11:00", "17:00"],
                Sun: ["04:00", "10:00", "16:00"],
              },
              donationTimeCreated: "12:30",
              donationDate: "May 24",
              donationDescription:
                "Donating 15kg of traditional coffee, perfect for starting the day with energy. This coffee is of high quality and provides an authentic and full-bodied flavor.",
              donationAddress:
                "Praça da Liberdade, Liberdade, 100 Belo Horizonte, MG",
            },
          ],
        },
      ],
    },
  ];
};
