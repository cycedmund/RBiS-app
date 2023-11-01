import { Link } from "react-router-dom";
import { GiMissileLauncher, GiRadarSweep, GiPocketRadio } from "react-icons/gi";
import { LiaToolsSolid } from "react-icons/lia";

const EquipmentCard = ({ category }) => {
  return (
    <div className="bg-[#6f8ae9] rounded-2xl shadow-sm shadow-[#7299f2] outline outline-slate-700 -outline-offset-8">
      <Link to={`/dashboard/equipment/${category}`}>
        <div className="group overflow-hidden relative after:duration-500 before:duration-500 duration-500 hover:after:duration-500 hover:after:translate-x-24 hover:before:translate-y-12 hover:before:-translate-x-32 hover:duration-500 after:absolute after:w-24 after:h-24 after:bg-[#7882A4] after:rounded-full  after:blur-xl after:bottom-32 after:right-16  before:absolute before:w-20 before:h-20 before:bg-[#65647C] before:rounded-full  before:blur-xl before:top-20 before:right-16  hover:rotate-[10deg] flex justify-center items-center h-56 w-96 md:w-[450px] bg-[#282833] rounded-2xl outline outline-slate-600 -outline-offset-8">
          <div className="z-10 flex flex-row items-center gap-5 mr-8">
            <div className="flex flex-col items-center w-3/4">
              <span className="text-slate-400 text-3xl md:text-5xl font-bold">
                {category}
              </span>
              <p className="text-gray-50 text-sm sm:text-base">
                Click for more details
              </p>
            </div>
            <figure className="w-1/4 mr-4 sm:mr-0">
              {category === "RBS 70" ? (
                <GiMissileLauncher className="text-9xl" />
              ) : category === "PSTAR" ? (
                <GiRadarSweep className="text-9xl" />
              ) : category === "Signal" ? (
                <GiPocketRadio className="text-9xl" />
              ) : (
                <LiaToolsSolid className="text-9xl" />
              )}
            </figure>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default EquipmentCard;
