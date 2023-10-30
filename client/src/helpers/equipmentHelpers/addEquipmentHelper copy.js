import { format } from "date-fns";
import Pikaday from "pikaday";
import "pikaday/css/pikaday.css";
import Swal from "sweetalert2";
import { addEquipmentService } from "../../utilities/equipment/equipment-service";
import { addEquipmentSchema } from "../../utilities/yup/yup-schema";
import { calculateCounts } from "../setStateHelpers/calculateCounts";

export const addEquipmentHelper = async (setEquipment) => {
  let datepicker;

  const steps = ["1", "2", "3", "4", "5", "6", "7"];
  const Queue = Swal.mixin({
    progressSteps: steps,
    confirmButtonText: "Next >",
    showCancelButton: true,
    cancelButtonText: "Cancel",
    reverseButtons: true,
  });

  try {
    const categoryResult = await Queue.fire({
      title: "Category",
      input: "select",
      currentProgressStep: 0,
      allowOutsideClick: false,
      inputOptions: {
        "RBS 70": "RBS 70",
        PSTAR: "PSTAR",
        Signal: "Signal",
      },
      inputValidator: (value) => {
        if (!value) {
          return "You need to select a category!";
        }
      },
    });

    if (categoryResult.dismiss === Swal.DismissReason.cancel) {
      Swal.fire("Cancelled", "Equipment addition cancelled", "info");
      return;
    }

    const equipmentResult = await Queue.fire({
      title: "Equipment",
      input: "select",
      currentProgressStep: 1,
      allowOutsideClick: false,
      inputOptions: {
        Sight: "Sight",
        Stand: "Stand",
        Missile: "Missile",
      },
      inputValidator: (value) => {
        if (!value) {
          return "You need to select an equipment!";
        }
      },
    });

    if (equipmentResult.dismiss === Swal.DismissReason.cancel) {
      Swal.fire("Cancelled", "Equipment addition cancelled", "info");
      return;
    }

    const serialNumberResult = await Queue.fire({
      title: "Serial Number",
      input: "text",
      currentProgressStep: 2,
      allowOutsideClick: false,
      inputValidator: (value) => {
        if (!value) {
          return "Serial Number is required!";
        }
      },
    });

    if (serialNumberResult.dismiss === Swal.DismissReason.cancel) {
      Swal.fire("Cancelled", "Equipment addition cancelled", "info");
      return;
    }

    if (serialNumberResult.dismiss === Swal.DismissReason.cancel) {
      Swal.fire("Cancelled", "Equipment addition cancelled", "info");
      return;
    }

    const loanStartDateResult = await Queue.fire({
      title: "Loan Start Date",
      input: "text",
      currentProgressStep: 3,
      allowOutsideClick: false,
      inputValidator: (value) => {
        if (!value) {
          return "Loan Start Date is required!";
        }
      },
      didOpen: () => {
        datepicker = new Pikaday({
          field: Swal.getInput(),
          format: "dd-MMM-yyyy",
          onSelect: (date) => {
            const formattedDate = format(date, "dd-MMM-yyyy");
            Swal.getInput().value = formattedDate;
          },
        });
        setTimeout(() => datepicker.show(), 400);
      },
      didClose: () => {
        datepicker.destroy();
      },
    });

    if (loanStartDateResult.dismiss === Swal.DismissReason.cancel) {
      Swal.fire("Cancelled", "Equipment addition cancelled", "info");
      return;
    }

    const loanEndDateResult = await Queue.fire({
      title: "Loan End Date",
      input: "text",
      currentProgressStep: 4,
      allowOutsideClick: false,
      inputValidator: (value) => {
        if (!value) {
          return "Loan End Date is required!";
        }
      },
      didOpen: () => {
        datepicker = new Pikaday({
          field: Swal.getInput(),
          format: "yyyy-MM-dd",
          onSelect: (date) => {
            const formattedDate = format(date, "dd-MMM-yyyy");
            Swal.getInput().value = formattedDate;
          },
        });
        setTimeout(() => datepicker.show(), 400);
      },
      didClose: () => {
        datepicker.destroy();
      },
    });

    if (loanEndDateResult.dismiss === Swal.DismissReason.cancel) {
      Swal.fire("Cancelled", "Equipment addition cancelled", "info");
      return;
    }

    const lastServicingDateResult = await Queue.fire({
      title: "Last Servicing Date",
      input: "text",
      currentProgressStep: 5,
      allowOutsideClick: false,
      inputValidator: (value) => {
        if (!value) {
          return "Last Servicing Date is required!";
        }
      },
      didOpen: () => {
        datepicker = new Pikaday({ field: Swal.getInput() });
        setTimeout(() => datepicker.show(), 400);
      },
      didClose: () => {
        datepicker.destroy();
      },
    });

    if (lastServicingDateResult.dismiss === Swal.DismissReason.cancel) {
      Swal.fire("Cancelled", "Equipment addition cancelled", "info");
      return;
    }

    const inputOptions = {
      1: "Monthly",
      3: "3-Monthly",
      6: "6-Monthly",
      12: "Yearly",
    };

    const servicingFrequencyResult = await Queue.fire({
      title: "Select Servicing Frequency",
      input: "radio",
      inputOptions: inputOptions,
      currentProgressStep: 6,
      allowOutsideClick: false,
      inputValidator: (value) => {
        if (!value) {
          return "Last Servicing Date is required!";
        }
      },
    });

    if (servicingFrequencyResult.dismiss === Swal.DismissReason.cancel) {
      Swal.fire("Cancelled", "Equipment addition cancelled", "info");
      return;
    }

    const [
      category,
      equipment,
      serialNumber,
      loanStartDate,
      loanEndDate,
      lastServicingDate,
      servicingFrequency,
    ] = [
      categoryResult.value,
      equipmentResult.value,
      serialNumberResult.value,
      loanStartDateResult.value,
      loanEndDateResult.value,
      lastServicingDateResult.value,
      servicingFrequencyResult.value,
    ];

    await addEquipmentSchema.validate(
      {
        category,
        equipment,
        serialNumber,
        loanStartDate,
        loanEndDate,
        lastServicingDate,
        servicingFrequency,
      },
      { abortEarly: false }
    );

    const newEquipment = await addEquipmentService({
      category,
      equipment,
      serialNumber,
      loanStartDate,
      loanEndDate,
      lastServicingDate,
      servicingFrequency,
    });

    console.log("new", newEquipment);

    const totalEquipmentCount = newEquipment.data.totalEquipmentCount;

    setEquipment((prevEquipment) => {
      const updatedIndex = prevEquipment.equipment.findIndex(
        (item) => item._id === newEquipment.data.updatedEquipment._id
      );

      if (updatedIndex !== -1) {
        const updatedEquipmentList = [...prevEquipment.equipment];
        updatedEquipmentList[updatedIndex] = newEquipment.data.updatedEquipment;
        const updatedCounts = calculateCounts(updatedEquipmentList);
        return {
          ...prevEquipment,
          equipment: updatedEquipmentList,
          totalEquipmentCount: totalEquipmentCount,
          counts: updatedCounts,
        };
      }

      return prevEquipment;
    });

    Swal.fire("Success", "Equipment added successfully", "success");
  } catch (err) {
    if (err.inner) {
      const yupErrors = err.inner.map((err) => err.message);
      console.log(yupErrors);
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        html: yupErrors.join("<br/>"),
      });
    } else {
      console.error(err);
      Swal.fire("Error", "An error occurred while adding equipment.", "error");
    }
  }
};
