const GroupBioEditor = ({ bio, onChange }) => {
  const maxBioAboutLength = 250;

  return (
    <div className="add-bio-about">
      <label htmlFor="comunityDescription">Adicionar Bio/Sobre</label>
      <div className="textarea-wrapper">
        <textarea
          id="comunityDescription"
          name="comunityDescription"
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

export default GroupBioEditor;
