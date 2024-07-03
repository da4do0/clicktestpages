import React, {useState, useEffect, createContext, useContext} from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://olntpareikffpwormsze.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9sbnRwYXJlaWtmZnB3b3Jtc3plIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc2NTgzNzMsImV4cCI6MjAzMzIzNDM3M30.20JwG2r_fOCoXAZsW1gxvVi5LDf8n_z6bCT_FpXOga0';
const supabase = createClient(supabaseUrl, supabaseKey);

const SupabaseContext = createContext();

export const SupabaseProvider = ({ children }) => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <SupabaseContext.Provider value={{ supabase, session }}>
      {children}
    </SupabaseContext.Provider>
  );
};

export const useSupabase = () => useContext(SupabaseContext);

