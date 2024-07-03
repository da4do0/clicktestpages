import React from "react";
import logo from "../assets/logo.png";
import userSvg from "../assets/user.svg";
import { Link, Outlet } from "react-router-dom";

export default function Header() {
  return (
    <>
      <header className=" h-[100px] border-b-[1px] z-50 relative bg-[#323437] border-[#ffffff34] flex justify-around items-center">
        <Link to="/">
          <div className="w-[100px]">
            <img src={logo} alt="logo" />
          </div>
        </Link>
        {/* <nav className="">
          <ul className=" inline-flex gap-[25px] items-center">
            <Link to="/">
              <li className=" text-xl w-[150px] text-center">Click test</li>
            </Link>
            <li className=" text-xl w-[150px] text-center">Space test</li>
          </ul>
        </nav> */}
        <div className=" w-[100px]">
          <Link to="/user">
            <img src={userSvg} alt="user icon" />
          </Link>
        </div>
      </header>
      <Outlet />
    </>
  );
}
