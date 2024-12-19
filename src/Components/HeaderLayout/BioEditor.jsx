const BioEditor = ({ bio, onChange, inputName, idValue }) => {
  const maxBioAboutLength = 250;

  return (
    <div className="add-bio-about">
      <label htmlFor="comunityDescription">Adicionar Bio/Sobre</label>
      <div className="textarea-wrapper">
        <textarea
          id={idValue}
          name={inputName }
          value={bio || ""}
          onChange={onChange}
          maxLength={maxBioAboutLength}
          placeholder="Escrever sobre..."
        />
        <span className="char-counter"> 
          {bio.length || 0}/{maxBioAboutLength}
        </span>
      </div>
    </div>
  );
};

export default BioEditor;
