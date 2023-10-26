const SerialNumberKBD = ({ unit }) => {
  return (
    <div className="flex flex-nowrap">
      {unit.serialNumber.split("").map((num, index) => (
        <kbd
          key={index}
          className="kbd kbd-xs text-base font-roboto bg-sky-950 rounded-none"
        >
          {num}
        </kbd>
      ))}
    </div>
  );
};

export default SerialNumberKBD;
