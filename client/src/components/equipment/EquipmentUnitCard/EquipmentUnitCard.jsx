import "./equipmentUnit.css";

const EquipmentUnitCard = ({ item }) => {
  return (
    <div className="card mx-auto">
      <div className="card-inner">
        <div className="card-front flex items-center justify-between">
          <div className="stat-value text-2xl sm:text-3xl font-normal text-[#e9e9ea] whitespace-normal">
            {item.equipment}
          </div>
          <div className="stat-value text-3xl sm:text-4xl font-medium text-[#D49A89]">
            {
              item.units.filter((unit) => unit.status === "Outside Store")
                .length
            }
          </div>
        </div>
        <div className="card-back relative">
          <ul className="flex flex-wrap items-center justify-center">
            {item.units
              .filter((unit) => unit.status === "Outside Store")
              .map((unit, index, arr) => {
                console.log(`index: ${index}, length: ${item.units.length}`);
                return (
                  <li
                    key={unit._id}
                    className="stat-value text-sm sm:text-sm font-medium text-[#D49A89] mr-1"
                  >
                    {unit.serialNumber}
                    {index !== arr.length - 1 && <span>,</span>}
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EquipmentUnitCard;
