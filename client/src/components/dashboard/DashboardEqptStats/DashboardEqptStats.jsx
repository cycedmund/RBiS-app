import { useAtom } from "jotai";
import _ from "lodash";
import { getCategoriesWithEqpt } from "../../../helpers/dashboardHelpers/getCategoriesWithEqpt";
import { equipmentAtom } from "../../../utilities/atom-jotai/atom";
import DashboardCardDivider from "../../common/Divider/DashboardCardDivider";
import Loading from "../../common/Loading/Loading";
import InStoreStatCard from "./InStoreStatCard";
import OutsideStoreStatCard from "./OutsideStoreStatCard";

const DashboardEqptStats = () => {
  const [equipment] = useAtom(equipmentAtom);

  if (_.isEmpty(equipment)) {
    return <Loading />;
  }

  const unitsWithCategory = equipment.equipment.flatMap((equipment) =>
    equipment.units.map((unit) => ({
      ...unit,
      category: equipment.category,
      equipment: equipment.equipment,
    }))
  );

  const categoriesWithEquipment = getCategoriesWithEqpt(
    equipment.categories,
    unitsWithCategory
  );

  return (
    <div className="flex flex-col flex-grow gap-2">
      {categoriesWithEquipment.map(
        ({ category, inStoreUnits, outsideStoreUnits }) => (
          <div key={category} className="flex flex-col">
            <div className="rounded-lg bg-[#282833] stat mb-2 p-4 text-center">
              <div className="stat-title font-roboto font-medium text-[#e9e9ea] text-xl">
                {category}
              </div>
              <DashboardCardDivider text={"Total Count"} />
              <div className="stat-value text-4xl font-roboto font-bold text-[#e9e9ea]">
                {inStoreUnits.length + outsideStoreUnits.length}
              </div>
            </div>
            <div className="flex gap-2 flex-col sm:flex-row">
              <div className="flex-1 flex flex-col">
                <InStoreStatCard inStoreUnits={inStoreUnits} />
              </div>
              <div className="flex-1 flex flex-col">
                <OutsideStoreStatCard outsideStoreUnits={outsideStoreUnits} />
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default DashboardEqptStats;
