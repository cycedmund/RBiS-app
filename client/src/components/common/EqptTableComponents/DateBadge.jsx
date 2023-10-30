import { format } from "date-fns";
import { BsDash } from "react-icons/bs";

const DateBadge = ({ unit }) => {
  return (
    <div className="flex flex-wrap items-center">
      <span className="bg-gray-100 text-gray-800 text-sm font-roboto font-light px-1 py-0.5 rounded dark:bg-stone-700 dark:text-gray-200 border border-gray-500">
        {format(new Date(unit.loanStartDate), "dd MMM yy")}
      </span>
      <span className="m-1 text-xl hidden md:inline">
        <BsDash />
      </span>
      <span className="m-1 text-xl md:hidden block">
        <BsDash />
      </span>
      <span className="bg-gray-100 text-gray-800 text-sm font-roboto font-light px-1 py-0.5 rounded dark:bg-stone-700 dark:text-gray-200 border border-gray-500">
        {format(new Date(unit.loanEndDate), "dd MMM yy")}
      </span>
    </div>
  );
};

export default DateBadge;
