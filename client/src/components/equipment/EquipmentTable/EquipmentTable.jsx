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
import { BiSolidEdit } from "react-icons/bi";
import { FaRegTrashCan } from "react-icons/fa6";
import ToggleDetails from "../../common/EqptTableComponents/ToggleDetails";

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
    <div className="px-6 mx-auto items-center justify-center">
      {/* <div className="px-6 md:w-[85%] mx-auto items-center justify-center"> */}
      <div className="overflow-x-auto min-w-full font-roboto font-medium text-white">
        <table className="table min-w-full table-sm lg:table-md md:table-md sm:table-sm table-auto">
          <thead>
            <tr className="text-left border-none text-gray-400 text-xs">
              <th className="font-semibold w-[30%]">CATEGORY</th>
              <th className="font-semibold w-[30%]">EQUIPMENT</th>
              <th className="font-semibold w-[15%]">QTY</th>
              <th className="font-semibold w-[25%] md:w-[10%]">SHOW</th>
            </tr>
          </thead>
          <tbody>
            {filteredEquipment?.map((item, index) => (
              <Fragment key={item._id}>
                <tr className="border-b-[1px] border-gray-600">
                  <td className="font-normal text-xs sm:text-base text-[#B2B2B2]">
                    {item.category}
                  </td>
                  <td className="font-normal text-xs sm:text-base text-[#B2B2B2]">
                    {item.equipment}
                  </td>
                  <td className="font-normal text-xs sm:text-base text-[#B2B2B2]">
                    {item.units.length}
                  </td>
                  {item.units.length > 0 && (
                    <td className="flex items-center">
                      <ToggleDetails
                        collapse={collapse}
                        toggleCollapse={toggleCollapse}
                        index={index}
                      />
                    </td>
                  )}
                </tr>
                {collapse === index && (
                  <tr className="border-[1px] border-gray-600 bg-[#1c1c24]">
                    <td colSpan="4">
                      <div className="overflow-x-auto min-w-full font-roboto">
                        <table className="table min-w-full table-lg lg:table-lg md:table-md sm:table-sm table-auto">
                          <thead>
                            <tr className="border-none text-gray-400">
                              {!isTrainee && (
                                <th className="w-[0%]">
                                  <label className="flex items-center">
                                    <input
                                      type="checkbox"
                                      className="checkbox checkbox-sm p-0"
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
                              <th className="font-normal text-xs w-[15%]">
                                S/N
                              </th>
                              <th className="font-normal text-xs w-[20%]">
                                LOAN PERIOD
                              </th>
                              <th className="font-normal text-xs w-[15%]">
                                LOCATION
                              </th>
                              <th className="p-0 font-normal text-xs md:w-[25%] w-[30%]">
                                DESCRIPTION
                              </th>
                              {!isTrainee && (
                                <th className="w-[10%]">
                                  {selectedUnits.length > 1 ? (
                                    <span
                                      onClick={() => handleDeleteEquipment()}
                                      className="font-semibold text-xs text-[#CE7777] cursor-pointer"
                                    >
                                      DELETE ALL
                                    </span>
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
                                <td className="p-0">
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
                                      <FaRegTrashCan
                                        onClick={() => handleDeleteEquipment()}
                                        className="md:text-xl text-lg mx-auto md:mx-0 fill-[#FA877F]"
                                      />
                                    ) : (
                                      <BiSolidEdit
                                        className="md:text-2xl text-xl mx-auto md:mx-0 fill-[#C1A3A3]"
                                        onClick={() =>
                                          handleEditEquipment(unit)
                                        }
                                      />
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
