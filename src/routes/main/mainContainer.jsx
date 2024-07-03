import React, { useState, useEffect, useRef } from "react";
import InfoTest from "./infoTest";
import TimeTest from "./timeTest";
import Leaderboard from "./leaderboard";
import ClickArea from "./clickArea";
import PopUp from "./popUp";
import { useOperationDb } from "../../hooks/operationDb.hook";

const Main = () => {
  const [click, click_set] = useState(0);
  const [clickPerSec, clickPerSec_set] = useState(0);
  const [goalSeconds, goalSeconds_set] = useState(0);
  const [seconds, seconds_set] = useState(0);
  const [secondsStep, secondsStep_set] = useState(0);
  const [show, show_set] = useState(false);
  const [data, data_set] = useState([]);
  const [openLeaderboard, openLeaderboard_set] = useState(false);
  const [openModes, openModes_set] = useState(false);
  const { newRowClick, dataLeaderboardQuery } = useOperationDb();

  const addData = (sec, clickPerSec) => {
    data_set([...data, { date: sec.toString(), click: clickPerSec }]);
  };

  const leadOnclick = () => {
    openModes_set(false);
    openLeaderboard_set((t) => !t);
  };

  const modeOnclick = () => {
    openLeaderboard_set(false);
    openModes_set((t) => !t);
  };

  const timer = useRef(null);

  const startTimer = () => {
    if (timer.current) {
      clearInterval(timer.current);
    }
    timer.current = setInterval(() => {
      seconds_set((v) => v + 1 / 60);
    }, 1000 / 60);
  };

  const stopTimer = () => {
    if (timer.current) {
      clearInterval(timer.current);
      timer.current = null;
      newRowClick(goalSeconds, (click / seconds).toFixed(1), returnDate());
      dataLeaderboardQuery(goalSeconds);
    }
  };

  const returnDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `{${year}-${month}-${day}}`;
  };

  const mouseClick = () => {
    if (goalSeconds !== 0 && goalSeconds !== Math.trunc(seconds)) {
      if (seconds !== goalSeconds) {
        click_set((v) => v + 1);
        clickPerSec_set((v) => v + 1);
      }
      if (!timer.current) {
        startTimer();
      }
    }
  };

  const uploadGoalSeconds = (newSeconds) => {
    dataLeaderboardQuery(newSeconds);
    goalSeconds_set(newSeconds);
    seconds_set(0);
    click_set(0);
    secondsStep_set(0);
    data_set([]);
    if (timer.current) {
      stopTimer();
    }
  };

  useEffect(() => {
    if (Math.trunc(seconds) === secondsStep + 1) {
      secondsStep_set((v) => v + 1);
      addData(Math.trunc(seconds), clickPerSec);
      clickPerSec_set(0);
    }
    if (seconds >= goalSeconds && goalSeconds !== 0) {
      stopTimer();
      show_set(true);
    }
  }, [seconds, goalSeconds, clickPerSec]);

  const hiddenPopUp = () => {
    show_set(false);
  };

  return (
    <>
      <PopUp
        show={show}
        data={data}
        setShow={hiddenPopUp}
        seconds={seconds}
        clicks={click}
      />
      <main className=" py-[50px] sm-mobile:w-[100vw] mobile:py-[0px]">
        <section className="hidden mobile:h-[80px] mobile:relative mobile:w-[100%] mobile:block">
          <div>
            <TimeTest
              uploadGoalSeconds={uploadGoalSeconds}
              goalSeconds={goalSeconds}
              openModes={openModes}
              mobile={true}
            />
            <div
              className={` mobile: bg-[#2c2e30] w-[50px] h-[50px] absolute top-[15px] grid place-items-center rounded-r-lg ${
                openModes ? "right-[23%]" : ""
              }`}
              onClick={modeOnclick}
            >
              <svg
                width="24"
                height="16"
                viewBox="0 0 24 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 16V13.3333H8V16H0ZM0 9.33333V6.66667H16V9.33333H0ZM0 2.66667V0H24V2.66667H0Z"
                  fill="#969696"
                />
              </svg>
            </div>
          </div>
          <div>
            <div
              className={` mobile: bg-[#2c2e30] w-[50px] h-[50px] absolute top-[15px] grid place-items-center rounded-l-lg ${
                openLeaderboard ? "left-[23%]" : "right-0"
              }`}
              onClick={leadOnclick}
            >
              <svg
                width="26"
                height="26"
                viewBox="0 0 26 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13 15.6667V19.6667M13 15.6667C9.77472 15.6667 7.08439 13.3763 6.46669 10.3333M13 15.6667C16.2253 15.6667 18.9156 13.3763 19.5333 10.3333M13 19.6667C14.24 19.6667 14.86 19.6667 15.3687 19.8029C16.7489 20.1728 17.8272 21.2511 18.1971 22.6313C18.3333 23.14 18.3333 23.76 18.3333 25H7.66667C7.66667 23.76 7.66667 23.14 7.80296 22.6313C8.17283 21.2511 9.25103 20.1728 10.6313 19.8029C11.14 19.6667 11.76 19.6667 13 19.6667ZM6.46669 10.3333H6.33333H6C5.07069 10.3333 4.60604 10.3333 4.21964 10.2565C2.63288 9.94085 1.39248 8.70045 1.07685 7.11369C1 6.72729 1 6.26264 1 5.33333C1 5.02356 1 4.86868 1.02561 4.73988C1.13083 4.21096 1.54429 3.79749 2.07321 3.69228C2.20201 3.66667 2.35689 3.66667 2.66667 3.66667H6.33333M6.46669 10.3333C6.37924 9.90252 6.33333 9.45663 6.33333 9V3.09524C6.33333 2.38441 6.33333 2.02901 6.46537 1.75483C6.59643 1.48268 6.81601 1.26309 7.08816 1.13204C7.36235 1 7.71775 1 8.42857 1H17.5715C18.2823 1 18.6376 1 18.9119 1.13204C19.184 1.26309 19.4036 1.48268 19.5347 1.75483C19.6667 2.02901 19.6667 2.38441 19.6667 3.09524V9C19.6667 9.45663 19.6208 9.90252 19.5333 10.3333M19.5333 10.3333H19.6667H20C20.9293 10.3333 21.394 10.3333 21.7804 10.2565C23.3671 9.94085 24.6075 8.70045 24.9232 7.11369C25 6.72729 25 6.26264 25 5.33333C25 5.02356 25 4.86868 24.9744 4.73988C24.8692 4.21096 24.4557 3.79749 23.9268 3.69228C23.798 3.66667 23.6431 3.66667 23.3333 3.66667H19.6667"
                  stroke="#969696"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <Leaderboard mobile={true} openLeaderboard={openLeaderboard} />
          </div>
        </section>

        <section className="grid grid-cols-4 grid-rows-4 gap-4 w-[70%] h-[450px] mx-auto my-0 mobile:w-[90%] mobile:py-[10px]">
          <InfoTest
            seconds={seconds}
            clicks={click}
            goalSeconds={goalSeconds}
          />

          <TimeTest
            uploadGoalSeconds={uploadGoalSeconds}
            goalSeconds={goalSeconds}
            mobile={false}
          />

          <Leaderboard />
          <ClickArea mouseClick={mouseClick} />
        </section>
      </main>
    </>
  );
};

export default Main;

//avviare servizio tramite cron avvia richieste paginate con lavori ad intermittenza
//salvare dati utenti sulla macchina dell'utente
