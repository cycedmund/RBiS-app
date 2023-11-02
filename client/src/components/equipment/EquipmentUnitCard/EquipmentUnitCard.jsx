import "./equipmentUnit.css";

const EquipmentUnitCard = ({ item }) => {
  return (
    <div className="card mx-auto">
      <div className="card-inner">
        {/* <div className="card-front flex items-center justify-between"> */}
        <div className="card-front flex items-center justify-between md:justify-between sm:justify-around">
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
                return (
                  <li
                    key={unit._id}
                    className={`stat-value font-light ml-0.5 text-[#C2B092] ${
                      arr.length > 12
                        ? "text-xs sm:text-sm"
                        : "text-sm sm:text-base"
                    }`}
                  >
                    {unit.serialNumber}
                    {index !== arr.length - 1 && (
                      <span className="mr-1">,</span>
                    )}
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
