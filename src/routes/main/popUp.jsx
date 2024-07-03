import React from "react";
import { AreaChart } from "@mantine/charts";

import "@mantine/core/styles.css";

const PopUp = ({ show, data, setShow, userName = "USER", seconds, clicks}) => {
  const display = show ? "block" : "hidden";
  return (
    
      <section
        className={`w-[100vw] h-[100dvh] z-10 ${display} bg-[#ffffff00] absolute top-0`}
      >
        <div
          className={` bg-[#bfbcbcc2] absolute w-[50%] h-[40%] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-[10px]`}
        >
          <div className="w-[100%] h-[15%]">
            <span className="text-[30px] text-center block w-[100%]">
              {userName}
            </span>
            <button onClick={setShow} className=" absolute right-5 top-2 border border-black px-[20px] py-[5px] rounded-[5px]">
              <span>X</span>
            </button>
          </div>
          <div className=" flex flex-row justify-stretch absolute w-[100%] h-[85%]">
            <section className="w-[65%] h-[100%]">
              <div className="w-[100%] h-[30%] text-center text-[20px] grid place-items-center">
                <span>PERFOMANCE CHART</span>
              </div>
              <div className=" w-[100%] h-[70%]">
                <AreaChart
                  data={data}
                  dataKey="date"
                  series={[{ name: "click", color: "indigo.6" }]}
                  curveType="natural"
                  tickLine="none"
                  withYAxis={false}
                  withDots={false}
                  className="h-[100%] border-none outline-none p-4 text-[10px]"
                />
              </div>
            </section>
            <section className=" w-[35%] flex flex-col place-content-center items-center gap-10">
              <div className="text-[58px]"><span>SCORE</span></div>
              <div className="text-[58px]"><span>{(clicks/seconds).toFixed(1)}</span></div>
            </section>
          </div>
        </div>
      </section>
  );
};

export default PopUp;
