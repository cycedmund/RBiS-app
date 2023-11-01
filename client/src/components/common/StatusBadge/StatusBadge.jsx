const StatusBadge = ({ trainee }) => {
  return (
    <span
      className={` w-3/4 font-normal badge ${
        trainee.status[0]?.status === "Present"
          ? "bg-[#445D48] text-gray-900 p-4 rounded-md text-xs md:text-base"
          : trainee.status[0]?.status === "Light Duty"
          ? "badge-warning bg-[#C9753D] text-gray-900 p-4 rounded-md text-xs md:text-base"
          : "badge-error bg-[#BD574E] text-gray-900 p-4 rounded-md text-xs md:text-base"
      } text-center py-5`}
      style={{
        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
        color: "white",
      }}
    >
      {trainee.status[0]?.status}
    </span>
  );
};

export default StatusBadge;
