import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./Fonts/fonts.css";
import GlobalStyles from "./Styles/GlobalStyles.js";
import { AuthProvider } from "./Contexts/AuthContext.jsx";
import PrivateRoute from "./Contexts/PrivateRoute.jsx";
import LoadingScreen from "./Components/LoadingScreen/LoadingScreen.jsx";
import SkeletonCardGroup from "./Components/Skeletons/SkeletonCardGroup/SkeletonCardGroup.jsx";

const App = lazy(() => import("./App.jsx"));
const CreateAccount = lazy(() => import("./Components/CreateAccount/CreateAccount.jsx"));
const Stages = lazy(() => import("./Components/CreateAccount/Stages/Stages.jsx"));
const Layout = lazy(() => import("./Components/Layout/Layout.jsx"))
const Home = lazy(() => import("./Pages/Home/Home.jsx"));
const GroupDetails = lazy(() => import("./Pages/GroupDetails/GroupDetails.jsx"));
const CreateGroup = lazy(() => import("./Pages/CreateGroup/CreateGroup.jsx"));

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <GlobalStyles />
        <Suspense fallback={<LoadingScreen />}>
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
              <Route path="create-group" element={<CreateGroup />} />
            </Route>
            <Route path="/teste" element={<SkeletonCardGroup />} />
          </Routes>
        </Suspense>
      </AuthProvider>
    </Router>
  </React.StrictMode>
);
