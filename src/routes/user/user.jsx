import React, { useEffect, useState } from "react";
import { useOperationDb } from "../../hooks/operationDb.hook";

import USER from "../../assets/6zgjtx.webp";
import ChartTest from "./ChartTest";

const User = () => {
  const [usernameI, usernameI_set] = useState("");
  const [userInput, userInput_set] = useState("");
  const [passInput, passInput_set] = useState("");
  const [showLogin, showLogin_set] = useState(true);

  const {
    newUserRow,
    login,
    dataDailyTest,
    registerDone,
    nickname,
    dataDayliTests,
  } = useOperationDb();

  useEffect(() => {
    usernameI_set(nickname);
  }, [nickname]);

  useEffect(() => {
    usernameI_set(nickname);
    if (nickname !== "") {
      dataDailyTest();
    }
  }, []);

  const newUser = async (e) => {
    e.preventDefault();
    newUserRow(userInput, passInput);
    //TODO: else{messaggio errore user gia' esistente}
  };

  useEffect(() => {
    usernameI_set(nickname);
  }, [registerDone]);

  const loginUser = (e) => {
    e.preventDefault();
    login(userInput, passInput);
    //TODO: else{user o password errati}
  };

  const newUserInput = (e) => {
    userInput_set(e.target.value);
  };

  const newPassInput = (e) => {
    passInput_set(e.target.value);
  };

  const switchView = () => {
    return showLogin ? (
      <>
        <Login
          newUserInput={newUserInput}
          newPassInput={newPassInput}
          loginUser={loginUser}
          showLogin_set={showLogin_set}
          showLogin={showLogin}
        />
      </>
    ) : (
      <>
        <SignUp
          newUser={newUser}
          newUserInput={newUserInput}
          newPassInput={newPassInput}
          showLogin_set={showLogin_set}
          showLogin={showLogin}
        />
      </>
    );
  };

  return (
    <>
      <main className=" absolute top-0 h-[100vh] w-[100%] flex justify-center items-center flex-col">
        {usernameI ? (
          <>
            <section className=" border border-red-950 w-[70%] h-[50%] flex">
              <div className="  w-[60%] h-[100%] bg-[#8a8a8a6b] p-3">
                <div className=" overflow-hidden rounded-[10px] grid place-items-center border border-green w-[150px] aspect-square">
                  <img
                    src={USER}
                    alt=""
                    className=" object-cover w-[100%] h-[100%]"
                  />
                </div>
              </div>
              <ChartTest />
            </section>
          </>
        ) : (
          switchView()
        )}
      </main>
    </>
  );
};

const Login = ({ newUserInput, newPassInput, loginUser, showLogin_set, showLogin}) => {
  return (
    <>
      <form className="flex flex-col w-[30%] gap-[50px] border-4 border-[#8a8a8a6b] py-[50px] flex flex-col justify-center items-center mobile:w-[80%]">
        <div className=" w-[80%] flex justify-between">
          <span className="text-[20px]">Login</span>
          <button onClick={() => showLogin_set(!showLogin)} className="text-[14px]"> Signup</button>
        </div>
        <div className=" w-[80%] flex flex-col items-center gap-2">
          <input
            type="text"
            placeholder="Username"
            className=" w-[80%] my-0 mx-auto text-black px-4 py-2"
            onChange={(e) => newUserInput(e)}
          />
          <input
            type="password"
            placeholder="Password"
            className=" w-[80%] my-0 mx-auto text-black px-4 py-2"
            onChange={(e) => newPassInput(e)}
          />
          <button
            onClick={(e) => loginUser(e)}
            className=" bg-[#8FC2D3] w-[80%] py-2"
          >
            Login
          </button>
        </div>
      </form>
    </>
  );
};

const SignUp = ({ newUser, newUserInput, newPassInput, showLogin_set, showLogin}) => {
  return (
    <>
    <form className="flex flex-col w-[30%] gap-[50px] border-4 border-[#8a8a8a6b] py-[50px] flex flex-col justify-center items-center mobile:w-[80%]">
        <div className=" w-[80%] flex justify-between">
          <span className="text-[20px]">Signup</span>
          <button onClick={() => showLogin_set(!showLogin)} className="text-[14px]"> Login</button>
        </div>
        <div className=" w-[80%] flex flex-col items-center gap-2">
          <input
            type="text"
            placeholder="Username"
            className=" w-[80%] my-0 mx-auto text-black px-4 py-2"
            onChange={(e) => newUserInput(e)}
          />
          <input
            type="password"
            placeholder="Password"
            className=" w-[80%] my-0 mx-auto text-black px-4 py-2"
            onChange={(e) => newPassInput(e)}
          />
          <button
            onClick={(e) => newUser(e)}
            className=" bg-[#8FC2D3] w-[80%] py-2"
          >
            Signup
          </button>
        </div>
      </form>
    </>
  );
};

export default User;
