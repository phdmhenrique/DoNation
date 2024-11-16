import { Container, GroupButton } from "./InterestGroup.js";

const InterestGroup = ({
  onGroupSelectionChange,
  selectedGroups,
  title,
}) => {
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

  const toggleGroup = (group) => {
    const updatedGroups = selectedGroups.includes(group)
      ? selectedGroups.filter((g) => g !== group)
      : [...selectedGroups, group];

    onGroupSelectionChange(updatedGroups);
  };

  return (
    <Container>
      {title ? <span>{title}</span> : ""}

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
