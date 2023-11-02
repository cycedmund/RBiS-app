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
  const formattedDate = format(today, "dd MMM yyyy (EEEE)");

  if (_.isEmpty(selectedCourse)) {
    return <Loading />;
  }

  return (
    <div>
      <div className="px-[32px] p-4 text-3xl flex lg:justify-between lg:items-center text-[#e9e9ea] flex-col lg:flex-row">
        {isTrainee ? (
          <span>{selectedCourse.course}</span>
        ) : (
          <span>Courses</span>
        )}
        <span className="md:text-xl text-lg text-[#96B6C5] mt-2 md:mt-0">
          {formattedDate}
        </span>
      </div>
      <div className="p-4 grid grid-cols-1 md:grid-cols-3 font-roboto font-light text-[#F1EFEF]">
        <div className="stat">
          <div className="stat-figure text-primary sm:mr-10">
            <BsChevronCompactRight className="text-4xl sm:text-5xl" />
          </div>
          <div className="stat-title sm:text-base text-sm text-[#A9A9A9]">
            Total Trainees
          </div>
          <div className="stat-value text-3xl sm:text-4xl font-medium">
            {selectedCourse?.trainees.length}
          </div>
        </div>

        <div className="stat">
          <div className="stat-figure text-info sm:mr-10">
            <BsPeopleFill className="text-3xl sm:text-4xl" />
          </div>
          <div className="stat-title sm:text-base text-sm text-[#A9A9A9]">
            Present
          </div>
          <div className="stat-value  text-3xl sm:text-4xl font-medium text-[#456a5f]">
            {selectedCourse?.totalPresent?.length}
          </div>
        </div>

        <div className="stat">
          <div className="stat-figure text-warning sm:mr-10">
            <BsPinMapFill className="text-2xl sm:text-3xl" />
          </div>
          <div className="stat-title sm:text-base text-sm text-[#A9A9A9]">
            Location
          </div>
          <div className="stat-value  text-lg sm:text-3xl font-medium">
            {selectedCourse?.commonLocation}
          </div>
        </div>

        <div className="stat">
          <div className="stat-figure text-success sm:mr-10">
            <FaPersonMilitaryPointing className="text-3xl sm:text-4xl" />
          </div>
          <div className="stat-title sm:text-base text-sm text-[#A9A9A9]">
            Course IC
          </div>
          {selectedCourse.courseIC ? (
            <div className="stat-value  text-base sm:text-xl font-normal">
              {selectedCourse?.courseIC?.rank}{" "}
              {selectedCourse?.courseIC?.formattedFullName}
            </div>
          ) : (
            <div className="stat-value  text-base sm:text-xl font-normal">
              Not Appointed
            </div>
          )}
        </div>

        <div className="stat">
          <div className="stat-figure text-error sm:mr-10">
            <FaPersonMilitaryRifle className="text-3xl sm:text-4xl" />
          </div>
          <div className="stat-title sm:text-base text-sm text-[#A9A9A9]">
            Weapon Store IC
          </div>
          {selectedCourse.weaponStoreIC ? (
            <div className="stat-value  text-base sm:text-xl font-normal">
              {selectedCourse?.weaponStoreIC?.rank}{" "}
              {selectedCourse?.weaponStoreIC?.formattedFullName}
            </div>
          ) : (
            <div className="stat-value  text-base sm:text-xl font-normal">
              Not Appointed
            </div>
          )}
        </div>
        <div className="stat">
          <div className="stat-figure text-indigo-500 sm:mr-10">
            <GiCaptainHatProfile className="text-3xl sm:text-4xl" />
          </div>
          <div className="stat-title sm:text-base text-sm text-[#A9A9A9]">
            Instructor(s)
          </div>
          {selectedCourse.instructors.length > 0 ? (
            selectedCourse?.instructors?.map((instr) => (
              <div
                key={instr._id}
                className="stat-value  text-base sm:text-xl font-normal"
              >
                {instr.rank} {instr.fullName}
              </div>
            ))
          ) : (
            <div className="stat-value  text-base sm:text-xl font-normal">
              -
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseStats;
