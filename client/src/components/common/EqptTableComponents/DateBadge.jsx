import { format } from "date-fns";
import { BsDash } from "react-icons/bs";

const DateBadge = ({ unit }) => {
  return (
    <div className="flex flex-wrap items-center">
      <span className="text-xs md:text-sm font-roboto font-normal px-1 py-0.5 rounded bg-stone-700 text-gray-200 border border-gray-500">
        {format(new Date(unit.loanStartDate), "dd MMM yy")}
      </span>
      <span className="m-1 text-xl hidden md:inline">
        <BsDash />
      </span>
      <span className="m-1 text-sm md:hidden block">
        <BsDash />
      </span>
      <span className="text-xs md:text-sm font-roboto font-normal px-1 py-0.5 rounded bg-stone-700 text-gray-200 border border-gray-500">
        {format(new Date(unit.loanEndDate), "dd MMM yy")}
      </span>
    </div>
  );
};

export default DateBadge;
