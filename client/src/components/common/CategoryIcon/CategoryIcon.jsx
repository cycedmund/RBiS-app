import { GiMissileLauncher, GiRadarSweep, GiPocketRadio } from "react-icons/gi";
import { LiaToolsSolid } from "react-icons/lia";

const CategoryIcon = ({ category }) => {
  return (
    <>
      {category.category === "RBS 70" ? (
        <GiMissileLauncher className="text-4xl sm:text-5xl text-[#6D8B74]" />
      ) : category.category === "PSTAR" ? (
        <GiRadarSweep className="text-4xl sm:text-5xl text-[#5AA469]" />
      ) : category.category === "Signal" ? (
        <GiPocketRadio className="text-4xl sm:text-5xl text-[#C7BEA2]" />
      ) : (
        <LiaToolsSolid className="text-4xl sm:text-5xl text-[#9F8772]" />
      )}
    </>
  );
};

export default CategoryIcon;
