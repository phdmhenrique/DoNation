const BasicInfoForm = ({ fields, onChange }) => (
  <div className="groupname-address">
    {fields.map((field) => (
      <div key={field.name} className="register-group-address">
        <label htmlFor={field.htmlFor}>{field.label}</label>
        <input
          type={field.type || "text"}
          name={field.name}
          value={field.value || ""}
          onChange={onChange}
          placeholder={field.placeholder || ""}
        />
      </div>
    ))}
  </div>
);

export default BasicInfoForm;

// const GroupBasicInfoForm = ({ data, onChange, textLabel, nameInput }) => (
//   <div className="groupname-address">
//     <div className="register-group-address">
//       <label htmlFor="comunityTitle">Nome do Grupo</label>
//       <input
//         type="text"
//         name="comunityTitle"
//         value={data?.comunityTitle || ""}
//         onChange={onChange}
//         placeholder="Nome Da Comunidade"
//       />
//     </div>

//     <div className="register-group-address">
//       <label htmlFor="comunityAddress">Localidade</label>
//       <input
//         type="text"
//         name="comunityAddress"
//         value={data?.comunityAddress || ""}
//         onChange={onChange}
//         placeholder="Registro, São Paulo"
//       />
//     </div>
//   </div>
// );

// export default GroupBasicInfoForm;
