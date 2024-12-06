import {
  Container,
  Suggest,
  SuggestContainer,
  UserPhoto,
  NameUser,
  SuggestTitle,
} from "../AsideSuggest/AsideSuggest.js";
import SearchInput from "../SearchInput/SearchInput.jsx";

const suggestions = [
  {
    id: 1,
    name: "Courtney Henry",
    username: "@courtneyhenry",
    backgroundImage:
      "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?auto=format&fit=crop&w=600&q=60",
    userPhoto: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 3,
    name: "Jessica Wilson",
    username: "@jessicawilson",
    backgroundImage:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=60",
    userPhoto: "https://randomuser.me/api/portraits/women/50.jpg",
  },
  {
    id: 2,
    name: "Jane Doe",
    username: "@janedoe",
    backgroundImage:
      "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=600&q=60",
    userPhoto: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    id: 4,
    name: "Emily Davis",
    username: "@emilydavis",
    backgroundImage:
      "https://images.unsplash.com/photo-1521747116042-5a810fda9664?auto=format&fit=crop&w=600&q=60",
    userPhoto: "https://randomuser.me/api/portraits/women/81.jpg",
  },
  {
    id: 5,
    name: "Michael Brown",
    username: "@michaelbrown",
    backgroundImage:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=600&q=60",
    userPhoto: "https://randomuser.me/api/portraits/men/76.jpg",
  },
  // {
  //     id: 6,
  //     name: "Jessica Wilson",
  //     username: "@jessicawilson",
  //     backgroundImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=60",
  //     userPhoto: "https://randomuser.me/api/portraits/women/50.jpg"
  // },
  // {
  //     id: 7,
  //     name: "Daniel Martinez",
  //     username: "@danielmartinez",
  //     backgroundImage: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=600&q=60",
  //     userPhoto: "https://randomuser.me/api/portraits/men/85.jpg"
  // },
  // {
  //     id: 8,
  //     name: "Sarah Lee",
  //     username: "@sarahlee",
  //     backgroundImage: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?auto=format&fit=crop&w=600&q=60",
  //     userPhoto: "https://randomuser.me/api/portraits/women/32.jpg"
  // },
  // {
  //     id: 9,
  //     name: "David Clark",
  //     username: "@davidclark",
  //     backgroundImage: "https://images.unsplash.com/photo-1534142499731-e992d7c1f1a6?auto=format&fit=crop&w=600&q=60",
  //     userPhoto: "https://randomuser.me/api/portraits/men/33.jpg"
  // },
  // {
  //     id: 10,
  //     name: "Laura Lewis",
  //     username: "@lauralewis",
  //     backgroundImage: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=600&q=60",
  //     userPhoto: "https://randomuser.me/api/portraits/women/66.jpg"
  // },
  // {
  //     id: 11,
  //     name: "Robert Young",
  //     username: "@robertyoung",
  //     backgroundImage: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=600&q=60",
  //     userPhoto: "https://randomuser.me/api/portraits/men/55.jpg"
  // },
  // {
  //     id: 12,
  //     name: "Linda Hernandez",
  //     username: "@lindahernandez",
  //     backgroundImage: "https://images.unsplash.com/photo-1521747116042-5a810fda9664?auto=format&fit=crop&w=600&q=60",
  //     userPhoto: "https://randomuser.me/api/portraits/women/56.jpg"
  // },
  // {
  //     id: 13,
  //     name: "Kevin King",
  //     username: "@kevinking",
  //     backgroundImage: "https://images.unsplash.com/photo-1534142499731-e992d7c1f1a6?auto=format&fit=crop&w=600&q=60",
  //     userPhoto: "https://randomuser.me/api/portraits/men/56.jpg"
  // },
  // {
  //     id: 14,
  //     name: "Susan Scott",
  //     username: "@susanscott",
  //     backgroundImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=60",
  //     userPhoto: "https://randomuser.me/api/portraits/women/57.jpg"
  // },
  // {
  //     id: 15,
  //     name: "Karen Green",
  //     username: "@karengreen",
  //     backgroundImage: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=600&q=60",
  //     userPhoto: "https://randomuser.me/api/portraits/women/58.jpg"
  // }
];

function AsideSuggest() {
  return (
    <Container>
      <SearchInput />
      <SuggestTitle>
        <span>Suggestions</span>
        <button>See All</button>
      </SuggestTitle>

      <Suggest>
        {suggestions.map((suggestion) => (
          <SuggestContainer key={suggestion.id}>
            <img src={suggestion.backgroundImage} alt="" loading="lazy" />
            <UserPhoto>
              <img src={suggestion.userPhoto} alt="" loading="lazy" />
            </UserPhoto>
            <NameUser>
              <span>{suggestion.name}</span>
              <span>{suggestion.username}</span>
            </NameUser>
          </SuggestContainer>
        ))}
      </Suggest>
    </Container>
  );
}

export default AsideSuggest;
