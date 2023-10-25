import { format } from "date-fns";

const DateBadge = ({ unit }) => {
  return (
    <span className="bg-gray-100 text-gray-800 text-md font-roboto font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-400 border border-gray-500">
      {format(new Date(unit.loanStartDate), "dd MMM yyyy")}{" "}
      <span className="m-1 text-xl">-</span>{" "}
      {format(new Date(unit.loanEndDate), "dd MMM yyyy")}
    </span>
  );
};

export default DateBadge;
