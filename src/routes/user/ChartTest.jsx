import React, { useEffect, useState } from "react";
import { AreaChart } from "@mantine/charts";
import { useOperationDb } from "../../hooks/operationDb.hook";

const ChartTest = () => {
  const { reloadChartsFilter, chartTestData } = useOperationDb();
  const timeTable = [1, 2, 3, 4, 5, 10, 11, 13, 14];

  const setDataChart = (time) => {
    reloadChartsFilter(time);
  };

  return (
    <>
      <section className=" w-[40%] flex flex-col justify-around bg-[#8a8a8a6b] p-3">
        <div className=" flex justify-end ">
          <div className=" w-[90%] flex gap-1 overflow-x-scroll ">
            {timeTable.map((time) => (
              <button
                key={time}
                className="border border-blue-400 py-1 px-6 rounded-[10px] hover:bg-blue-400 active:bg-blue-400"
                onClick={() => setDataChart(time)}
              >
                <span className=" ">{time}</span>
              </button>
            ))}
          </div>
        </div>
        <div className=" h-[80%] w-[100%] grid place-items-center">
          {chartTestData.length > 0 ? (
            <AreaChart
              data={chartTestData || []}
              dataKey="data"
              type="split"
              strokeWidth={1}
              /*  dotProps={{ r: 2, strokeWidth: 1 }} */
              /* activeDotProps={{ r: 3, strokeWidth: 1 }} */
              series={[{ name: "cps", color: "green" }]}
              className=" w-[100%] h-[100%]"
            />
          ) : (
            "you didnt do test in this mode"
          )}
        </div>
      </section>
    </>
  );
};

export default ChartTest;
