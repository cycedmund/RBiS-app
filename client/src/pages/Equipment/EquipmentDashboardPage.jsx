import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import EquipmentTable from "../../components/equipment/EquipmentTable/EquipmentTable";
import { equipmentAtom } from "../../utilities/atom-jotai/atom";
import { getAllEquipmentService } from "../../utilities/equipment/equipment-service";

const EquipmentDashboardPage = () => {
  // const [equipment, setEquipment] = useState([]);
  const [equipment, setEquipment] = useAtom(equipmentAtom);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchAllEquipment = async () => {
      const allEquipment = await getAllEquipmentService();
      console.log(allEquipment);
      setEquipment(allEquipment);

      if (allEquipment.categories.length > 0) {
        setSelectedCategory(allEquipment.categories[0]);
      }
    };
    fetchAllEquipment();
  }, [setEquipment]);

  const handleClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div>
      <div className="tabs">
        {equipment?.categories?.length > 0 &&
          equipment.categories.map((category) => (
            <div
              key={category}
              className={`tab tab-bordered ${
                category === selectedCategory ? "tab-active" : ""
              }`}
              onClick={() => handleClick(category)}
            >
              {category}
            </div>
          ))}
      </div>
      {selectedCategory && <EquipmentTable />}
    </div>
  );
};

export default EquipmentDashboardPage;
