import { useAtom } from "jotai";
import { userAtom } from "../../../utilities/atom-jotai/atom";

const DashboardTable = ({ course, handleAssignIC }) => {
  const [user] = useAtom(userAtom);
  const weaponStoreIC = course.weaponStoreIC;
  const isTrainee = user.role === "trainee";

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>S/No.</th>
            <th>Name</th>
            {!isTrainee && <th>Weapon Store IC</th>}
            <th>Status</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {course?.trainees.map((trainee, index) => (
            <tr key={trainee._id}>
              <th>{index + 1}</th>
              <td>{trainee.formattedFullName}</td>
              {!isTrainee && (
                <td>
                  {trainee._id === weaponStoreIC ? (
                    "IC"
                  ) : (
                    <button
                      onClick={() => handleAssignIC(trainee._id, course._id)}
                      disabled={trainee._id === course.weaponStoreIC}
                    >
                      Appoint
                    </button>
                  )}
                </td>
              )}
              {/* <td>
                {isTrainee ? (
                  trainee._id === weaponStoreIC?._id ? (
                    "IC"
                  ) : (
                    ""
                  )
                ) : trainee._id === weaponStoreIC?._id ? (
                  "IC"
                ) : (
                  <button
                    onClick={() => handleAssignIC(trainee._id, course._id)}
                    disabled={trainee._id === course.weaponStoreIC}
                  >
                    Modify
                  </button>
                )}
              </td> */}
              <td>{trainee.status[0].status}</td>
              <td>{trainee.status[0].location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardTable;
