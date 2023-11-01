const ToggleDetails = ({ index, toggleCollapse, collapse }) => {
  const isChecked = index === collapse;

  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        className="sr-only peer"
        type="checkbox"
        checked={isChecked}
        onClick={() => toggleCollapse(index)}
      />
      <div className="group peer ring-0 bg-gradient-to-bl from-[#2B2B2B] via-[#2B2B2B] to-[#2B2B2B] rounded-full outline-none duration-1000 after:duration-300 w-12 h-6 shadow-md peer-focus:outline-none after:content-[''] after:rounded-full after:absolute peer-checked:after:rotate-180 after:[background:conic-gradient(from_135deg,_#c4a17f,_#b0a090,_#d2c3a7,_#cab99b_,_#dcd2c1,_#c7b899)] after:outline-none after:h-4 after:w-4 after:top-1 after:left-1 peer-checked:after:translate-x-6 peer-hover:after:scale-95 peer-checked:bg-gradient-to-r peer-checked:from-[#557571] peer-checked:to-[#557571]"></div>
    </label>
  );
};

export default ToggleDetails;
