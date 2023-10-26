import { Fragment, useEffect, useState } from "react";
import { useAtom } from "jotai";
import { equipmentAtom, userAtom } from "../../../utilities/atom-jotai/atom";
import { editEquipmentHelper } from "../../../helpers/equipmentHelpers/editEquipmentHelper";
import { editLocationHelper } from "../../../helpers/equipmentHelpers/editLocationHelper";
import { editDescriptionHelper } from "../../../helpers/equipmentHelpers/editDescriptionHelper";
import { deleteEquipmentHelper } from "../../../helpers/equipmentHelpers/deleteEquipmentHelper";
// import { addEquipmentHelper } from "../../../helpers/equipmentHelpers/addEquipmentHelper";
import LocationBadge from "../../common/EqptTableComponents/LocationBadge";
import DateBadge from "../../common/EqptTableComponents/DateBadge";
import DescriptionField from "../../common/EqptTableComponents/DescriptionField";
import SerialNumberKBD from "../../common/EqptTableComponents/serialNumberKBD";

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

  // const handleAddEquipment = async () => {
  //   addEquipmentHelper(setEquipment);
  // };

  const handleDeleteEquipment = () => {
    if (selectedUnits.length > 1) {
      setCollapse(null);
    }
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
    <div className="px-6">
      <div className="overflow-x-auto min-w-full font-roboto font-light text-white">
        <table className="table w-full table-lg lg:table-lg md:table-md sm:table-sm">
          <thead>
            <tr className="text-left border-none text-gray-400 text-base">
              <th className="font-normal">Category</th>
              <th className="font-normal">Equipment</th>
              <th className="font-normal">Quantity</th>
              {!isTrainee && <th className="font-normal">Actions</th>}
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
                  <tr className="border-[1px] border-gray-600 bg-[#1c1c24]">
                    <td colSpan="4">
                      <div className="overflow-x-auto min-w-full font-roboto font-light">
                        <table className="table w-full table-lg lg:table-lg md:table-md sm:table-sm">
                          <thead>
                            <tr className="border-none text-gray-400">
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
                              <th className="font-normal text-sm">S/N</th>
                              <th className="font-normal text-sm">
                                Loan Period
                              </th>
                              <th className="font-normal text-sm">Location</th>
                              <th className="font-normal text-sm">
                                Description
                              </th>
                              {!isTrainee && (
                                <th>
                                  {selectedUnits.length > 1 ? (
                                    <button
                                      onClick={() => handleDeleteEquipment()}
                                      className="btn btn-ghost btn-xs"
                                    >
                                      Delete
                                    </button>
                                  ) : (
                                    "Actions"
                                  )}
                                </th>
                              )}
                            </tr>
                          </thead>
                          <tbody>
                            {item.units.map((unit) => (
                              <tr
                                key={unit._id}
                                className="border-gray-700 border-t-[1px] border-b-0"
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
                                <td>
                                  <SerialNumberKBD unit={unit} />
                                </td>
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
                                    {selectedUnits.length === 1 ? (
                                      <button
                                        onClick={() => handleDeleteEquipment()}
                                        className="btn btn-ghost btn-xs"
                                      >
                                        Delete
                                      </button>
                                    ) : (
                                      <button
                                        onClick={() =>
                                          handleEditEquipment(unit)
                                        }
                                        className="btn btn-ghost btn-xs"
                                      >
                                        Edit
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
