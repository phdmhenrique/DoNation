import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./Fonts/fonts.css";
import GlobalStyles from "./Styles/GlobalStyles";
import { AuthProvider } from "./Contexts/AuthContext";
import PrivateRoute from "./Contexts/PrivateRoute";

import App from "./App.jsx";
// import CreateAccount from "./Components/CreateAccount/CreateAccount";
// import Stages from "./Components/CreateAccount/Stages/Stages";
// import Home from "./Pages/Home/Home";
// import GroupDetails from "./Pages/GroupDetails/GroupDetails";
// import Layout from "./Components/Layout/Layout";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <GlobalStyles />
        <Routes>
          <Route path="/" element={<App />} />
          {/* <Route path="/create-account" element={<CreateAccount />} /> */}
          <Route
            path="/create-account/stages"
            // element={<PrivateRoute element={<Stages />} />}
          />
          <Route
            path="/home"
            // element={<PrivateRoute element={<Layout />} />}
          >
            {/* <Route index element={<Home />} /> */}
            {/* <Route path="group/:groupId" element={<GroupDetails />} /> */}
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
