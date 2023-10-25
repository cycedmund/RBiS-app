import { useAtom } from "jotai";
import { useParams } from "react-router-dom";
import Divider from "../../components/common/Divider/Divider";
import EquipmentTable from "../../components/equipment/EquipmentTable/EquipmentTable";
import EquipmentUnitStats from "../../components/equipment/EquipmentUnitStats/EquipmentUnitStats";
import { equipmentAtom } from "../../utilities/atom-jotai/atom";

const EquipmentUnitDashboard = () => {
  const { category } = useParams();
  const [equipment] = useAtom(equipmentAtom);

  // const filteredEquipment = equipment.equipment?.filter(
  //   (item) => item.category === category
  // );
  // console.log("equipment", equipment);
  // console.log(filteredEquipment);

  return (
    <div>
      <EquipmentUnitStats equipment={equipment} />
      <Divider />
      <EquipmentTable category={category} />
    </div>
  );
};

export default EquipmentUnitDashboard;
