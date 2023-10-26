const SerialNumberKBD = ({ unit }) => {
  return unit.serialNumber.split("").map((num, index) => (
    <kbd
      key={index}
      className="kbd kbd-xs text-base font-roboto bg-sky-950 rounded-none"
    >
      {num}
    </kbd>
  ));
};

export default SerialNumberKBD;
