import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { equipmentAtom, userAtom } from "../../../utilities/atom-jotai/atom";
import { editEquipmentHelper } from "../../../helpers/equipmentHelpers/editEquipmentHelper";
import { editLocationHelper } from "../../../helpers/equipmentHelpers/editLocationHelper";
import { editDescriptionHelper } from "../../../helpers/equipmentHelpers/editDescriptionHelper";
import { deleteEquipmentHelper } from "../../../helpers/equipmentHelpers/deleteEquipmentHelper";
import LocationBadge from "../../common/EqptTableComponents/LocationBadge";
import DateBadge from "../../common/EqptTableComponents/DateBadge";
import DescriptionField from "../../common/EqptTableComponents/DescriptionField";
import SerialNumberKBD from "../../common/EqptTableComponents/SerialNumberKBD";

const EquipmentTable = ({ category }) => {
  const [equipment, setEquipment] = useAtom(equipmentAtom);
  const [user] = useAtom(userAtom);
  const [collapse, setCollapse] = useState(null);
  const [selectedUnits, setSelectedUnits] = useState([]);
  const navigate = useNavigate();
  const isTrainee = user.role === "trainee";

  useEffect(() => {
    if (collapse !== null && equipment.equipment[collapse].units.length === 0) {
      setCollapse(null);
    }
  }, [equipment, collapse]);

  console.log(equipment);

  const filteredEquipment = equipment.equipment?.filter(
    (item) => item.category === category
  );

  const navigateToDashboard = () => {
    navigate("/dashboard/equipment");
  };

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

  const handleDeleteEquipment = () => {
    deleteEquipmentHelper(
      selectedUnits,
      setSelectedUnits,
      setEquipment,
      navigateToDashboard
    );
    // if (selectedUnits.length > 1) {
    //   setCollapse(null);
    // }
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
            <tr className="text-left border-none text-gray-400 text-xs">
              <th className="font-normal">CATEGORY</th>
              <th className="font-normal">EQUIPMENT</th>
              <th className="font-normal">QUANTITY</th>
              {!isTrainee && <th className="font-normal">ACTIONS</th>}
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
                                  <label className="flex items-center">
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
                              <th className="font-normal text-xs">S/N</th>
                              <th className="font-normal text-xs">
                                LOAN PERIOD
                              </th>
                              <th className="font-normal text-xs">LOCATION</th>
                              <th className="font-normal text-xs">
                                DESCRIPTION
                              </th>
                              {!isTrainee && (
                                <th>
                                  {selectedUnits.length > 1 ? (
                                    <button
                                      onClick={() => handleDeleteEquipment()}
                                      className="btn btn-ghost btn-xs"
                                    >
                                      DELETE ALL
                                    </button>
                                  ) : (
                                    <span className="text-xs font-normal">
                                      ACTIONS
                                    </span>
                                  )}
                                </th>
                              )}
                            </tr>
                          </thead>
                          <tbody>
                            {item.units.map((unit, index) => (
                              <tr
                                key={unit._id}
                                className={`border-0 border-gray-700 ${
                                  index !== 0 && "border-t-[1px]"
                                }`}
                              >
                                {!isTrainee && (
                                  <th>
                                    <label className="flex items-center">
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
                                    {selectedUnits.length === 1 &&
                                    selectedUnits.includes(unit._id) ? (
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
