import { Fragment, useEffect, useState } from "react";
import { useAtom } from "jotai";
import { equipmentAtom, userAtom } from "../../../utilities/atom-jotai/atom";
import { editEquipmentHelper } from "../../../helpers/equipmentHelpers/editEquipmentHelper";
import { editLocationHelper } from "../../../helpers/equipmentHelpers/editLocationHelper";
import { editDescriptionHelper } from "../../../helpers/equipmentHelpers/editDescriptionHelper";
import { deleteEquipmentHelper } from "../../../helpers/equipmentHelpers/deleteEquipmentHelper";
import { addEquipmentHelper } from "../../../helpers/equipmentHelpers/addEquipmentHelper";
import LocationBadge from "../../common/EqptTableComponents/LocationBadge";
import DateBadge from "../../common/EqptTableComponents/DateBadge";
import DescriptionField from "../../common/EqptTableComponents/DescriptionField";

const EquipmentTable = ({ category }) => {
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

  const filteredEquipment = equipment.equipment?.filter(
    (item) => item.category === category
  );

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
    setCollapse(null);
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
    <div className="px-6">
      <div className="overflow-x-auto min-w-full font-roboto font-medium">
        <table className="table w-full table-lg lg:table-lg md:table-md sm:table-sm">
          {/* head */}
          <thead>
            <tr className="text-left border-none">
              <th className="font-semibold text-lg">Category</th>
              <th className="font-semibold text-lg">Equipment</th>
              <th className="font-semibold text-lg">Quantity</th>
              {!isTrainee && <th className="font-semibold text-lg">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {/* {equipment.equipment?.map((item, index) => ( */}
            {filteredEquipment?.map((item, index) => (
              <Fragment key={item._id}>
                <tr className="border-b-[1px] border-gray-600">
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
                  <tr className="border-none">
                    <td colSpan="4">
                      <div className="overflow-x-auto min-w-full font-roboto font-light">
                        <table className="table w-full table-lg lg:table-lg md:table-md sm:table-sm">
                          <thead>
                            <tr className="border-none">
                              {!isTrainee && (
                                <th>
                                  <label>
                                    <input
                                      type="checkbox"
                                      className="checkbox checkbox-sm"
                                      onChange={() => {
                                        setSelectedUnits(
                                          selectedUnits.length ===
                                            item.units.length
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
                              )}
                              <th>S/N</th>
                              <th>Loan Period</th>
                              <th>Location</th>
                              <th>Description</th>
                              {selectedUnits.length > 0 ? (
                                <th>
                                  <button
                                    onClick={() => handleDeleteEquipment()}
                                    className="btn btn-ghost btn-xs"
                                  >
                                    Delete
                                  </button>
                                </th>
                              ) : (
                                <th>Actions</th>
                              )}
                            </tr>
                          </thead>
                          <tbody>
                            {item.units.map((unit) => (
                              <tr
                                key={unit._id}
                                className="border-b-[1px] border-gray-700"
                              >
                                {!isTrainee && (
                                  <th>
                                    <label>
                                      <input
                                        type="checkbox"
                                        className="checkbox checkbox-sm"
                                        onChange={() =>
                                          handleCheckboxChange(unit._id)
                                        }
                                        checked={selectedUnits.includes(
                                          unit._id
                                        )}
                                      />
                                    </label>
                                  </th>
                                )}
                                <td>{unit.serialNumber}</td>
                                <td>
                                  <DateBadge unit={unit} />
                                </td>
                                <td>
                                  <LocationBadge
                                    unit={unit}
                                    handleEditLocation={handleEditLocation}
                                  />
                                </td>
                                <td>
                                  <DescriptionField
                                    handleEditDescription={
                                      handleEditDescription
                                    }
                                    unit={unit}
                                  />
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
                                    {selectedUnits.length > 0 && (
                                      <button
                                        onClick={() => handleDeleteEquipment()}
                                        className="btn btn-ghost btn-xs"
                                      >
                                        Delete
                                      </button>
                                    )}
                                  </td>
                                )}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EquipmentTable;
