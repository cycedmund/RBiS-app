const SerialNumberKBD = ({ unit }) => {
  return (
    <div className="flex flex-nowrap">
      {unit.serialNumber.split("").map((num, index) => (
        <kbd
          key={index}
          className="kbd kbd-xs text-sm font-roboto font-thin bg-sky-950 rounded-sm md:mx-[2px]"
        >
          {num}
        </kbd>
      ))}
    </div>
  );
};

export default SerialNumberKBD;
