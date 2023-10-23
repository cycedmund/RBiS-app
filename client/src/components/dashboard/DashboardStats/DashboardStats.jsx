import { format } from "date-fns";
import {
  BsChevronCompactRight,
  BsPeopleFill,
  BsPinMapFill,
} from "react-icons/bs";
import { FaPersonMilitaryRifle } from "react-icons/fa6";
import { GiMissileLauncher } from "react-icons/gi";
const DashboardStats = ({ selectedCourse }) => {
  const today = new Date();
  const formattedDate = format(today, "dd MMM yyyy, EEEE");
  const formattedTime = format(today, "HHmm'H'");

  return (
    <div>
      <div className="px-[32px] p-4 text-3xl">Trainees&apos; Activity</div>
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
            {selectedCourse?.totalPresent.length}
          </div>
          <div className="stat-desc">{formattedDate}</div>
          <div className="stat-desc">Last updated at: {formattedTime}</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-warning">
            <BsPinMapFill className="text-4xl" />
          </div>
          <div className="stat-title">Location</div>
          <div className="stat-value">{selectedCourse?.commonLocation}</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-success">
            <FaPersonMilitaryRifle className="text-5xl" />
          </div>
          <div className="stat-title">Course IC</div>
          <div className="stat-value">
            {selectedCourse?.courseIC?.formattedFullName}
          </div>
        </div>
        <div className="stat">
          <div className="stat-figure text-error">
            <GiMissileLauncher className="text-5xl" />
          </div>
          <div className="stat-title">Weapon Store IC</div>
          <div className="stat-value">
            {selectedCourse?.weaponStoreIC?.formattedFullName}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;
