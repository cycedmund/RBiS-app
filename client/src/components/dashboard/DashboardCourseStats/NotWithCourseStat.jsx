const NotWithCourseStat = ({ traineesNotWithCourse }) => {
  return traineesNotWithCourse.map((trainee) => (
    <ul key={trainee.id} className="my-0.5 flex justify-center items-center">
      <li className="flex w-full sm:w-5/6 items-center justify-between text-[10px] sm:text-xs leading-tight p-1 px-2 font-normal text-[#e9e9ea] rounded-sm bg-[#5D5B6A]">
        {trainee.rank} {trainee.formattedFullName}
        <span className="badge bg-[#CC9B6D] text-[#282833] badge-sm text-[9px] gap-2 justify-end">
          {trainee.status[0].location}
        </span>
      </li>
    </ul>
  ));
};

export default NotWithCourseStat;
