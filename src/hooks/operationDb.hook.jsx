import React, { useState, createContext, useContext } from "react";
import { useSupabase } from "./supabaseSession.hook";

const OperationDb = createContext();

export const OperationProvider = ({ children }) => {
  const { supabase } = useSupabase();
  const [id, id_set] = useState(15);
  const [nickname, nickname_set] = useState("");
  const [dataDayliTests, dataDayliTests_set] = useState([]);
  const [registerDone, registerDone_set] = useState(null);
  const [chartTestData, chartTestData_set] = useState([]);
  const [dataLeaderboard, dataLeaderboard_set] = useState([]);

  const newRowClick = async (tempoTest, punteggioTest, date) => {
    if (nickname) {
      await supabase
        .from("tests")
        .insert([
          { id_utente: id, tempo: tempoTest, cps: punteggioTest, data: date },
        ])
        .select();
    }
  };

  const uploadNickname = (username) => {
    nickname_set(username);
  };

  const uploadIDUser = async (username) => {
    let { data, error } = await supabase
      .from("Utenti")
      .select("id")
      .like("nickname", username);
    id_set(data?.[0]?.id);
  };

  const newUserRow = async (username, password) => {
    const checkRowUser = await checkUsername(username);
    if (checkRowUser.length === 0) {
      const { data } = await supabase
        .from("Utenti")
        .insert([{ nickname: username, password: password }])
        .select();
      if (data.length > 0) {
        uploadNickname(username);
        uploadIDUser(username);
        registerDone_set(true);
      }
    }
  };

  const login = async (username, password) => {
    let { data, error } = await supabase
      .from("Utenti")
      .select("id")
      .like("nickname", username)
      .like("password", password);


    if (data.length > 0) {
      uploadNickname(username);
      uploadIDUser(username);
    }
  };

  const checkUsername = async (username) => {
    let { data, error } = await supabase
      .from("Utenti")
      .select("id")
      .like("nickname", username);
    return data;
  };

  const dataDailyTest = async () => {
    const { data } = await supabase
      .from("tests")
      .select("cps, data")
      .eq("id_utente", id);
    dataDayliTests_set(data);
  };

  const reloadChartsFilter = async (time) => {
    const { data } = await supabase
      .from("tests")
      .select("cps, data")
      .eq("tempo", time)
      .eq("id_utente", id);
    chartTestData_set(data);
  };

  const dataLeaderboardQuery = async (time) => {
    const { data: tabellaRisultati } = await supabase
      .from("tests")
      .select("cps, id_utente")
      .eq("tempo", time);


    const { data: listaNickname } = await supabase
      .from("Utenti")
      .select("id, nickname");

    const cpsMap = new Map();

    tabellaRisultati.forEach((item) => {
      const currentCps = cpsMap.get(item.id_utente);
      if (currentCps === undefined || item.cps > currentCps) {
        cpsMap.set(item.id_utente, item.cps);
      }
    });

    const result = Array.from(cpsMap, ([id_utente, max_cps]) => ({
      id_utente,
      cps: max_cps,
    }));

    const usersMap = new Map(listaNickname.map((user) => [user.id, user]));

    result.forEach((score) => {
      const user = usersMap.get(score.id_utente);
      if (user) {
        result.push({
          id: score.id_utente,
          nickname: user.nickname,
          cps: score.cps,
        });
      }
    });

    const final = result.filter((element)=>{
        if(element.nickname){
          return element;
        }
    })

    final.sort((a, b) => b.cps - a.cps);
    dataLeaderboard_set(final);
  };

  return (
    <>
      <OperationDb.Provider
        value={{
          newUserRow,
          login,
          newRowClick,
          dataDayliTests,
          dataDailyTest,
          nickname,
          registerDone,
          reloadChartsFilter,
          chartTestData,
          dataLeaderboardQuery,
          dataLeaderboard
        }}
      >
        {children}
      </OperationDb.Provider>
    </>
  );
};

export const useOperationDb = () => useContext(OperationDb);
