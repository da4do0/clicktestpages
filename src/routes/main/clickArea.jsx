import React from "react";

const ClickArea = ({ mouseClick }) => {
  return (
    <>
      <section className=" rounded-[10px] bg-[#2c2e30] col-span-2 row-span-3
                          mobile:w-[90%] mobile:col-span-full mobile:mx-auto">
        <div className=" h-[100%]" onClick={mouseClick} />
      </section>
    </>
  );
};

export default ClickArea;
