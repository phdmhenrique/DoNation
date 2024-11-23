export default function Login({
  pageTitle,
  formButtons,
  rightsideInputs,
  onSubmit,
  showTabs,
  activeTab,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(e);
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
      <h1 className="text-primary text-[26px] font-bold break-words">
        {pageTitle}
      </h1>

      {showTabs && (
        <div className="w-full flex justify-center gap-10">
          <div className={`w-16 h-[3px] rounded ${activeTab === 1 ? 'bg-primary' : 'bg-gray-200'}`}></div>
          <div className={`w-16 h-[3px] rounded ${activeTab === 2 ? 'bg-primary' : 'bg-gray-200'}`}></div>
        </div>
      )}

      {Array.isArray(rightsideInputs)
        ? rightsideInputs.map((input, index) => (
            <div key={index}>{input}</div>
          ))
        : rightsideInputs}

      <div className="flex flex-wrap gap-3">
        {formButtons.map((button, index) => (
          <div key={index}>{button}</div>
        ))}
      </div>
    </form>
  );
}
