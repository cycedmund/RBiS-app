import React, { useState } from "react";
import { format } from "date-fns";
import { useAtom } from "jotai";
import { equipmentAtom, userAtom } from "../../../utilities/atom-jotai/atom";
import { editEquipmentHelper } from "../../../helpers/equipmentHelpers/editEquipmentHelper";
import { editLocationHelper } from "../../../helpers/equipmentHelpers/editLocationHelper";
import { editDescriptionHelper } from "../../../helpers/equipmentHelpers/editDescriptionHelper";

const EquipmentTable = () => {
  const [collapse, setCollapse] = useState(null);
  const [equipment, setEquipment] = useAtom(equipmentAtom);
  const [user] = useAtom(userAtom);
  const isTrainee = user.role === "trainee";

  const toggleCollapse = (index) => {
    setCollapse(collapse === index ? null : index);
  };

  const handleEditEquipment = (unit) => {
    editEquipmentHelper(unit, equipment, setEquipment);
  };

  const handleEditLocation = (unit) => {
    editLocationHelper(unit, equipment, setEquipment);
  };

  const handleEditDescription = async (unit) => {
    editDescriptionHelper(unit, equipment, setEquipment);
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Category</th>
              <th>Equipment</th>
              <th>Quantity</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {equipment.equipment.map((item, index) => (
              <React.Fragment key={item._id}>
                <tr>
                  <td>{item.category}</td>
                  <td>{item.equipment}</td>
                  <td>{item.units.length}</td>
                  <td
                    onClick={() => toggleCollapse(index)}
                    className="cursor-pointer"
                  >
                    <button className="btn btn-ghost btn-xs">details</button>
                  </td>
                </tr>
                {collapse === index && (
                  <tr>
                    <td colSpan="4">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>
                              <label>
                                <input type="checkbox" className="checkbox" />
                              </label>
                            </th>
                            <th>Serial Number</th>
                            <th>Loan Start Date</th>
                            <th>Loan End Date</th>
                            <th>Location</th>
                            <th>Description</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {item.units.map((unit) => (
                            <tr key={unit._id}>
                              <th>
                                <label>
                                  <input type="checkbox" className="checkbox" />
                                </label>
                              </th>
                              <td>{unit.serialNumber}</td>
                              <td>
                                {format(
                                  new Date(unit.loanStartDate),
                                  "dd MMM yyyy"
                                )}
                              </td>
                              <td>
                                {format(
                                  new Date(unit.loanEndDate),
                                  "dd MMM yyyy"
                                )}
                              </td>
                              <td>
                                {unit.status}
                                <button
                                  onClick={() => handleEditLocation(unit)}
                                  className="btn btn-ghost btn-xs ml-2"
                                >
                                  Edit
                                </button>
                              </td>
                              <td>
                                {unit.description}
                                <button
                                  onClick={() => handleEditDescription(unit)}
                                  className="btn btn-ghost btn-xs ml-2"
                                >
                                  Edit
                                </button>
                              </td>
                              <td
                                onClick={() => handleEditEquipment(unit)}
                                className="cursor-pointer"
                              >
                                <button className="btn btn-ghost btn-xs">
                                  Edit
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EquipmentTable;
