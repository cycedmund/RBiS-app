import { GiMissileLauncher, GiRadarSweep, GiPocketRadio } from "react-icons/gi";
import { LiaToolsSolid } from "react-icons/lia";

const CategoryIcon = ({ category }) => {
  return (
    <>
      {category.category === "RBS 70" ? (
        <img
          src={"/assets/RBS70.png"}
          width={45}
          alt={
            <GiMissileLauncher className="text-4xl sm:text-5xl text-[#6D8B74]" />
          }
        />
      ) : category.category === "PSTAR" ? (
        <img
          src={"/assets/radar.png"}
          width={50}
          alt={<GiRadarSweep className="text-4xl sm:text-5xl text-[#5AA469]" />}
        />
      ) : category.category === "Signal" ? (
        <img
          src={"/assets/signalset.png"}
          width={50}
          alt={
            <GiPocketRadio className="text-4xl sm:text-5xl text-[#C7BEA2]" />
          }
        />
      ) : (
        <img
          src={"/assets/misc.png"}
          width={55}
          alt={
            <LiaToolsSolid className="text-4xl sm:text-5xl text-[#9F8772]" />
          }
        />
      )}
    </>
  );
};

export default CategoryIcon;
