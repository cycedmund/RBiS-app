const DescriptionField = ({ unit, handleEditDescription }) => {
  return (
    <div className="cursor-text" onClick={() => handleEditDescription(unit)}>
      <div className="max-w-[200px] h-[80px] overflow-auto border-[2px] border-gray-800 rounded-lg p-2">
        {unit.description.split("\n").map((line, index) => (
          <div key={index} className="whitespace-pre-line">
            {line}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DescriptionField;
