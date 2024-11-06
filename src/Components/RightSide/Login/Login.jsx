/* eslint-disable react/prop-types */ 
// Importando os estilos dos componentes
import {
  RightsideLogin,
  RightsideLogin__Title,
  RightSideButtons,
  TabHeader,
  TabHeaderItem,
} from "./Login.js";

export default function Login({
  pageTitle,
  formButtons,
  rightsideInputs,
  onSubmit,
  showTabs,
  activeTab,
  // setActiveTab, // Adicione a propriedade setActiveTab
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(e);
    }
  };

  return (
    <RightsideLogin className="rightside-login" onSubmit={handleSubmit}>
      <RightsideLogin__Title className="rightside-login__title">
        {pageTitle}
      </RightsideLogin__Title>

      {showTabs && (
        <TabHeader>
          <TabHeaderItem className={activeTab === 1 ? "active" : ""} />
          <TabHeaderItem className={activeTab === 2 ? "active" : ""} />
        </TabHeader>
      )}

      {/* Verifica se rightsideInputs é um array e mapeia, caso contrário renderiza diretamente */}
      {Array.isArray(rightsideInputs)
        ? rightsideInputs.map((input, index) => (
            <div key={index}>{input}</div>
          ))
        : rightsideInputs}

      <RightSideButtons className="rightside-buttons">
        {/* Adicionando a propriedade 'key' nos elementos */}
        {formButtons.map((button, index) => (
          <div key={index}>{button}</div>
        ))}
      </RightSideButtons>
    </RightsideLogin>
  );
}
