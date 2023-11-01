import { format } from "date-fns";
import { useAtom } from "jotai";
import _ from "lodash";
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
import Loading from "../../common/Loading/Loading";

const CourseStats = ({ selectedCourse }) => {
  const [user] = useAtom(userAtom);
  const isTrainee = user.role === "trainee";
  const today = new Date();
  const formattedDate = format(today, "dd MMM yyyy (EEE)");

  if (_.isEmpty(selectedCourse)) {
    return <Loading />;
  }

  return (
    <div>
      <div className="px-[32px] p-4 text-3xl flex lg:justify-between lg:items-center text-white flex-col lg:flex-row">
        {isTrainee ? (
          <span>{selectedCourse.course}</span>
        ) : (
          <span>Trainees</span>
        )}
        <span className="text-xl text-stone-500">{formattedDate}</span>
      </div>
      <div className="p-4 grid grid-cols-1 md:grid-cols-3 font-roboto font-light">
        <div className="stat">
          <div className="stat-figure text-primary">
            <BsChevronCompactRight className="text-4xl sm:text-5xl" />
          </div>
          <div className="stat-title sm:text-base text-sm">Total Trainees</div>
          <div className="stat-value text-3xl sm:text-4xl font-medium">
            {selectedCourse?.trainees.length}
          </div>
        </div>

        <div className="stat">
          <div className="stat-figure text-info">
            <BsPeopleFill className="text-3xl sm:text-4xl" />
          </div>
          <div className="stat-title sm:text-base text-sm">Present</div>
          <div className="stat-value  text-3xl sm:text-4xl font-medium text-[#456a5f]">
            {selectedCourse?.totalPresent?.length}
          </div>
        </div>

        <div className="stat">
          <div className="stat-figure text-warning">
            <BsPinMapFill className="text-2xl sm:text-3xl" />
          </div>
          <div className="stat-title sm:text-base text-sm">Location</div>
          <div className="stat-value  text-lg sm:text-3xl font-medium">
            {selectedCourse?.totalPresent.length > 0
              ? selectedCourse?.commonLocation
              : "-"}
          </div>
        </div>

        <div className="stat">
          <div className="stat-figure text-success">
            <FaPersonMilitaryPointing className="text-3xl sm:text-4xl" />
          </div>
          <div className="stat-title sm:text-base text-sm">Course IC</div>
          <div className="stat-value  text-base sm:text-xl font-normal">
            {selectedCourse?.courseIC?.rank}{" "}
            {selectedCourse?.courseIC?.formattedFullName}
          </div>
        </div>

        <div className="stat">
          <div className="stat-figure text-error">
            <FaPersonMilitaryRifle className="text-3xl sm:text-4xl" />
          </div>
          <div className="stat-title sm:text-base text-sm">Weapon Store IC</div>
          <div className="stat-value  text-base sm:text-xl font-normal">
            {selectedCourse?.weaponStoreIC?.rank}{" "}
            {selectedCourse?.weaponStoreIC?.formattedFullName}
          </div>
        </div>
        <div className="stat">
          <div className="stat-figure text-indigo-500">
            <GiCaptainHatProfile className="text-3xl sm:text-4xl" />
          </div>
          <div className="stat-title sm:text-base text-sm">Instructor(s)</div>
          {selectedCourse?.instructors?.map((instr) => (
            <div
              key={instr._id}
              className="stat-value  text-base sm:text-xl font-normal"
            >
              {instr.rank} {instr.fullName}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseStats;
