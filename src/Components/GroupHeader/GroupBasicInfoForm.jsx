const GroupBasicInfoForm = ({ data, onChange }) => (
  <div className="groupname-address">
    <div className="register-group-address">
      <label htmlFor="comunityTitle">Nome do Grupo</label>
      <input
        type="text"
        name="comunityTitle"
        value={data.comunityTitle || ""}
        onChange={onChange}
        placeholder="Nome Da Comunidade"
      />
    </div>

    <div className="register-group-address">
      <label htmlFor="comunityAddress">Localidade</label>
      <input
        type="text"
        name="comunityAddress"
        value={data.comunityAddress || ""}
        onChange={onChange}
        placeholder="Registro, São Paulo"
      />
    </div>
  </div>
);

export default GroupBasicInfoForm;
