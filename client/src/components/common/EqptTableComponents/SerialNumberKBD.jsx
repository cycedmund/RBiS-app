const SerialNumberKBD = ({ unit }) => {
  return (
    <div className="flex flex-nowrap">
      {unit.serialNumber.split("").map((num, index) => (
        <kbd
          key={index}
          className="kbd kbd-xs text-xs md:text-sm font-roboto font-normal text-[#F5EDDC] bg-[#424874] rounded-sm md:mx-[1px]"
        >
          {num}
        </kbd>
      ))}
    </div>
  );
};

export default SerialNumberKBD;
