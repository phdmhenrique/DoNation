import InterestGroup from "../../Components/InterestGroup/InterestGroup.jsx";

const GroupInterestsSelector = ({ selected, onChange }) => (
  <div className="interest-groups">
    <div className="register-interest-groups">
      <span>Interesses do Grupo</span>
      <InterestGroup
        selectedGroups={selected}
        onGroupSelectionChange={onChange}
      />
    </div>
  </div>
);

export default GroupInterestsSelector;
