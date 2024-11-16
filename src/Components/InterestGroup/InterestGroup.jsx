import { Container, GroupButton } from "./InterestGroup.js";

const groups = [
"Donation",
  "Charity",
  "Solidarity",
  "Beneficence",
  "Contribution",
  "Help",
  "Generosity",
  "Aid",
  "Food",
  "Philanthropy",
  "Volunteering",
  "Social",
  "Humanitarian",
  "Books",
  "Technology",
  "Environmental",
  "School",
  "Toys",
  "Construction",
  "Cultural",
  "Instrument",
  "Participation",
  "Resources",
  "Community",
  "Altruism",
  "Welcome",
  "Empathy",
  "Collaboration",
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
      <span>What are your interest groups?</span>

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
