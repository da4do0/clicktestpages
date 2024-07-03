import React from "react";
import ErrorGif from "../assets/dario-moccia.gif";
import Header from "./header";

const ErrorPage = ()=>{
    return(<>
    <div className=" absolute top-0 w-[100%] h-[100%] flex flex-col justify-center items-center">
        <h1 className=" text-[80px]">Error 404</h1>
        <h2 className=" text-[30px]">Come ci sei arrivato su questa pagina?</h2>
        <div className=" overflow-hidden aspect-video w-[40%]">
            <img src={ErrorGif} alt="" srcset="" className="h-[100%] w-[100%]"/>
        </div>
    </div>
    </>);
}

export default ErrorPage;