import { Container, GroupButton } from "./InterestGroup.js";

const groups = [
  "Doação",
  "Caridade",
  "Solidariedade",
  "Beneficência",
  "Contribuição",
  "Ajuda",
  "Generosidade",
  "Auxílio",
  "Alimentos",
  "Filantropia",
  "Voluntariado",
  "Social",
  "Humanitário",
  "Livros",
  "Tecnologia",
  "Ambiental",
  "Escolar",
  "Brinquedos",
  "Construção",
  "Cultural",
  "Instrumento",
  "Participação",
  "Recursos",
  "Comunidade",
  "Altruísmo",
  "Acolhimento",
  "Empatia",
  "Colaboração",
];

const InterestGroup = ({ onGroupSelectionChange, selectedGroups }) => {
  const toggleGroup = (group) => {
    const updatedGroups = selectedGroups.includes(group)
      ? selectedGroups.filter((g) => g !== group)
      : [...selectedGroups, group];

    onGroupSelectionChange(updatedGroups);
  };

  return (
    <Container>
      <span>Quais são os seus grupos de interesse?</span>

      <div>
        {groups.map((group) => (
          <GroupButton
            key={group}
            selected={selectedGroups.includes(group)}
            onClick={() => toggleGroup(group)}
          >
            {group}
          </GroupButton>
        ))}
      </div>
    </Container>
  );
};

export default InterestGroup;
