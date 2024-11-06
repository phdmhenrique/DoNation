import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./Fonts/fonts.css";
import GlobalStyles from "./Styles/GlobalStyles.js";
import { AuthProvider } from "./Contexts/AuthContext.jsx";
import PrivateRoute from "./Contexts/PrivateRoute.jsx";

import App from "./App.jsx";
import CreateAccount from "./Components/CreateAccount/CreateAccount.jsx";
import Stages from "./Components/CreateAccount/Stages/Stages.jsx";
import Home from "./Pages/Home/Home.jsx";
import GroupDetails from "./Pages/GroupDetails/GroupDetails.jsx";
import Layout from "./Components/Layout/Layout.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <GlobalStyles />
        <Routes>
          <Route exact path="/" element={<App />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route
            path="/create-account/stages"
            element={
              <PrivateRoute>
                <Stages />
              </PrivateRoute>
            }
          />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Layout />
              </PrivateRoute>
            }
          >
            <Route index element={<Home />} />
            <Route path="group/:groupId" element={<GroupDetails />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
