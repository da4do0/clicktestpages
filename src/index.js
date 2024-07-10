import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SupabaseProvider } from "./hooks/supabaseSession.hook";
import { DataUserLogin } from "./hooks/dataUserLogin.hook";
import { MantineProvider } from "@mantine/core";

import Header from "./routes/header";
import Main from "./routes/main/mainContainer";
import User from "./routes/user/user";
import ErrorPage from "./routes/errorPage";
import { OperationProvider } from "./hooks/operationDb.hook";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Header />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Main />,
        },
        {
          path: "/user",
          element: <User />,
        },
        {
          path: "*",
          element: <ErrorPage />,
        },
      ],
    },
  ],
  { basename: "/clicktestpages" }
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MantineProvider>
      <SupabaseProvider>
        <OperationProvider>
          <DataUserLogin>
            <RouterProvider router={router} />
          </DataUserLogin>
        </OperationProvider>
      </SupabaseProvider>
    </MantineProvider>
  </React.StrictMode>
);
