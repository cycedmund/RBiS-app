const StatusBadge = ({ trainee }) => {
  return (
    <span
      className={` w-3/4 badge ${
        trainee.status[0].status === "Present"
          ? "badge-success bg-emerald-700 text-gray-900 p-4"
          : trainee.status[0].status === "Light Duty"
          ? "badge-warning bg-amber-600 text-gray-900 p-4"
          : "badge-error bg-red-500 text-gray-900 p-4"
      } text-center py-5`}
      style={{
        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)",
        color: "white",
      }}
    >
      {trainee.status[0].status.toUpperCase()}
    </span>
  );
};

export default StatusBadge;
