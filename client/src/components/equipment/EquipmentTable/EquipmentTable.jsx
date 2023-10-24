import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { useAtom } from "jotai";
import { equipmentAtom, userAtom } from "../../../utilities/atom-jotai/atom";
import { editEquipmentHelper } from "../../../helpers/equipmentHelpers/editEquipmentHelper";
import { editLocationHelper } from "../../../helpers/equipmentHelpers/editLocationHelper";
import { editDescriptionHelper } from "../../../helpers/equipmentHelpers/editDescriptionHelper";
import { deleteEquipmentHelper } from "../../../helpers/equipmentHelpers/deleteEquipmentHelper";
import { addEquipmentHelper } from "../../../helpers/equipmentHelpers/addEquipmentHelper";

const EquipmentTable = () => {
  const [equipment, setEquipment] = useAtom(equipmentAtom);
  const [collapse, setCollapse] = useState(null);
  const [selectedUnits, setSelectedUnits] = useState([]);
  const [user] = useAtom(userAtom);
  const isTrainee = user.role === "trainee";

  useEffect(() => {
    if (collapse !== null && equipment.equipment[collapse].units.length === 0) {
      setCollapse(null);
    }
  }, [equipment, collapse]);

  const toggleCollapse = (index) => {
    setCollapse(collapse === index ? null : index);
    setSelectedUnits([]);
  };

  const handleCheckboxChange = (unitID) => {
    setSelectedUnits((prevSelectedUnits) => {
      if (prevSelectedUnits.includes(unitID)) {
        return prevSelectedUnits.filter((id) => id !== unitID);
      } else {
        return [...prevSelectedUnits, unitID];
      }
    });
  };

  const handleAddEquipment = async () => {
    addEquipmentHelper(setEquipment);
  };

  const handleDeleteEquipment = () => {
    deleteEquipmentHelper(selectedUnits, setSelectedUnits, setEquipment);
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
              {!isTrainee && <th></th>}
            </tr>
          </thead>
          <tbody>
            {equipment.equipment.map((item, index) => (
              <React.Fragment key={item._id}>
                <tr>
                  <td>{item.category}</td>
                  <td>{item.equipment}</td>
                  <td>{item.units.length}</td>
                  {item.units.length > 0 && (
                    <td
                      onClick={() => toggleCollapse(index)}
                      className="cursor-pointer"
                    >
                      <button className="btn btn-ghost btn-xs">details</button>
                    </td>
                  )}
                </tr>
                {collapse === index && (
                  <tr>
                    <td colSpan="4">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>
                              <label>
                                <input
                                  type="checkbox"
                                  className="checkbox"
                                  onChange={() => {
                                    setSelectedUnits(
                                      selectedUnits.length === item.units.length
                                        ? []
                                        : item.units.map((unit) => unit._id)
                                    );
                                  }}
                                  checked={
                                    selectedUnits.length ===
                                      item.units.length &&
                                    item.units.length !== 0
                                  }
                                />
                              </label>
                            </th>
                            <th>Serial Number</th>
                            <th>Loan Start Date</th>
                            <th>Loan End Date</th>
                            <th>Location</th>
                            <th>Description</th>
                            {selectedUnits.length > 0 && (
                              <th>
                                <button
                                  onClick={() => handleDeleteEquipment()}
                                  className="btn btn-ghost btn-xs"
                                >
                                  Delete
                                </button>
                              </th>
                            )}
                          </tr>
                        </thead>
                        <tbody>
                          {item.units.map((unit) => (
                            <tr key={unit._id}>
                              <th>
                                <label>
                                  <input
                                    type="checkbox"
                                    className="checkbox"
                                    onChange={() =>
                                      handleCheckboxChange(unit._id)
                                    }
                                    checked={selectedUnits.includes(unit._id)}
                                  />
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
                              {!isTrainee && (
                                <td className="cursor-pointer">
                                  <button
                                    onClick={() => handleEditEquipment(unit)}
                                    className="btn btn-ghost btn-xs"
                                  >
                                    Edit
                                  </button>
                                  <button
                                    onClick={() => handleAddEquipment()}
                                    className="btn btn-ghost btn-xs"
                                  >
                                    Add
                                  </button>
                                </td>
                              )}
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
