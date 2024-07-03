import React from "react";
import { useOperationDb } from "../../hooks/operationDb.hook";

const TimeTest = ({ uploadGoalSeconds, goalSeconds, mobile, openModes}) => {
  const timeTable = [1, 2, 3, 4, 5, 10, 11, 13, 14];
  return (
    <section
      className={`col-span-1 row-start-1 row-span-4 h-[100%] overflow-hidden bg-[#2c2e30] rounded-[10px] px-2 pb-4 ${
        mobile ? "absolute w-[65vw] h-[90vh] rounded-none" : "mobile:hidden"
      } ${ openModes ? "":"left-[-100%]"}`}
    >
      <div className=" w-[100%] text-center py-2 h-[10%] text-[24px]">
        <span>Test Mode</span>
      </div>
      <div className="flex flex-col py-3 px-1 gap-3 overflow-y-scroll h-[90%] no-scrollbar rounded-[5px]">
        {timeTable.map((time) => {
          return (
            <div
              className=" text-center rounded-lg py-2 px-3 bg-[#323437] hover:bg-[#4d6a74] focus:bg-[#8FC2D3]"
              onClick={() => uploadGoalSeconds(time)}
              key={time}
            >
              <span>{time} Seconds</span>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default TimeTest;
