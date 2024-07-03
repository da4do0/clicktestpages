import React, { useState, useEffect } from "react";
import { useOperationDb } from "../../hooks/operationDb.hook";

const Leaderboard = ({mobile, openLeaderboard}) => {
  const { dataLeaderboard } = useOperationDb();

  useEffect(() => {
  }, [dataLeaderboard]);

  return (
    <section
      className={`col-end-5 row-span-4 h-[100%] bg-[#2c2e30] rounded-[10px] px-2 pb-4 ${
        mobile ? "hidden mobile:absolute mobile:w-[65vw] mobile:h-[100vh] mobile:rounded-none mobile:block" : "mobile:hidden"
      } ${ openLeaderboard ? "mobile:right-0":"mobile:right-[-100%]"} `}
    >
      <div className=" w-[100%] text-center py-2 h-[10%] text-[24px]">
        <span>Leaderboard</span>
      </div>
      <div className="flex flex-col py-3 px-1 gap-3 overflow-y-scroll h-[100%] no-scrollbar ">
        {dataLeaderboard.length > 0
          ? dataLeaderboard.map(({ nickname, cps }, index) => {
              return (
                <div
                  className=" flex flex-row justify-between rounded-lg py-2 px-5 bg-[#323437]"
                  key={nickname}
                  style={{
                    background:
                      index + 1 === 1
                        ? "#a9a92c"
                        : index + 1 === 2
                        ? "#727066"
                        : index + 1 === 3
                        ? "#604621"
                        : "",
                  }}
                >
                  <div className="flex gap-2">
                    <span>#{index + 1}</span>
                    <span>{nickname}</span>
                  </div>
                  <span>{cps}</span>
                </div>
              );
            })
          : "You didn't select mode or nobody tried test in this mode"}
      </div>
    </section>
  );
};

export default Leaderboard;
