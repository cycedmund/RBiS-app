import { format } from "date-fns";
import { useAtom } from "jotai";
import {
  BsChevronCompactRight,
  BsPeopleFill,
  BsPinMapFill,
} from "react-icons/bs";
import {
  FaPersonMilitaryRifle,
  FaPersonMilitaryPointing,
} from "react-icons/fa6";
import { GiCaptainHatProfile } from "react-icons/gi";
import { userAtom } from "../../../utilities/atom-jotai/atom";
// import { GiMissileLauncher } from "react-icons/gi";

const DashboardStats = ({ selectedCourse }) => {
  const [user] = useAtom(userAtom);
  const isTrainee = user.role === "trainee";
  const today = new Date();
  const formattedDate = format(today, "EEE, dd MMM yyyy");
  // const formattedTime = format(today, "HHmm'H'");
  console.log(selectedCourse);

  return (
    <div>
      <div className="px-[32px] p-4 text-3xl flex justify-between text-white">
        {isTrainee ? (
          <span>{selectedCourse.course}</span>
        ) : (
          <span>Trainees</span>
        )}
        <span className="text-xl">{formattedDate}</span>
      </div>
      <div className="p-4 grid grid-cols-1 md:grid-cols-3">
        <div className="stat">
          <div className="stat-figure text-primary">
            <BsChevronCompactRight className="text-7xl" />
          </div>
          <div className="stat-title">Total Trainees</div>
          <div className="stat-value">{selectedCourse?.trainees.length}</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-info">
            <BsPeopleFill className="text-5xl" />
          </div>
          <div className="stat-title">Present</div>
          <div className="stat-value">
            {selectedCourse?.totalPresent?.length}
          </div>
          {/* <div className="stat-desc">{formattedDate}</div>
          <div className="stat-desc">Last updated at: {formattedTime}</div> */}
        </div>

        <div className="stat">
          <div className="stat-figure text-warning">
            <BsPinMapFill className="text-4xl" />
          </div>
          <div className="stat-title">Location</div>
          <div className="stat-value">
            {selectedCourse?.totalPresent.length > 0
              ? selectedCourse?.commonLocation
              : "-"}
          </div>
        </div>

        <div className="stat">
          <div className="stat-figure text-success">
            <FaPersonMilitaryPointing className="text-5xl" />
          </div>
          <div className="stat-title">Course IC</div>
          <div className="stat-value text-2xl">
            {selectedCourse?.courseIC?.rank}{" "}
            {selectedCourse?.courseIC?.formattedFullName}
          </div>
        </div>
        <div className="stat">
          <div className="stat-figure text-error">
            <FaPersonMilitaryRifle className="text-5xl" />
          </div>
          <div className="stat-title">Weapon Store IC</div>
          <div className="stat-value text-2xl">
            {selectedCourse?.weaponStoreIC?.rank}{" "}
            {selectedCourse?.weaponStoreIC?.formattedFullName}
          </div>
        </div>
        <div className="stat">
          <div className="stat-figure text-indigo-500">
            <GiCaptainHatProfile className="text-5xl" />
          </div>
          <div className="stat-title">Instructor(s)</div>
          {selectedCourse?.instructors?.map((instr) => (
            <div key={instr._id} className="stat-value text-lg">
              {instr.rank} {instr.fullName}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;
