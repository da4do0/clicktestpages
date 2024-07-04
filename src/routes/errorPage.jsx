import React, {useEffect} from "react";
import ErrorGif from "../assets/dario-moccia.gif";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
    const navigate = useNavigate();

  return (
    <>
      <div className=" absolute top-0 w-[100%] h-[100%] flex flex-col justify-center items-center">
        <h1 className=" text-[80px]">Error 404</h1>
        <h2 className=" text-[30px]">Come ci sei arrivato su questa pagina?</h2>
        <h2 className=" text-[30px]">Scusa ma github pages fanno schifo con react router</h2>
        <button onClick={navigate('/')}className=" bg-blue-400 px-3 py-1">Clicca qui o sul logo per tornare in home</button>
        <div className=" overflow-hidden aspect-video w-[40%]">
          <img src={ErrorGif} alt="" srcset="" className="h-[100%] w-[100%]" />
        </div>
      </div>
    </>
  );
};

export default ErrorPage;
