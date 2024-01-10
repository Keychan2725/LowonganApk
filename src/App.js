import React, { useEffect } from "react";
import "./App.css";
import "../src/assets/styles/index.css";
import "../src/assets/styles/tailwind.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./Pages/Landing";
import Profile from "./Pages/Profile";
import Settings from "./Pages/Settings";
import Register from "./Auth/register";
import Login from "./Auth/login";
import PrivateHome from "./Router/PrivateHome";
import PrivateReg from "./Router/PrivateReg";
import PrivateRoute from "./Router/PrivateRoute";
import Dashboard from "./Pages/dashboard";
import Sidebar from "./components/Sidebar/Sidebar";
import { initFlowbite } from "flowbite";

function App() {

  useEffect(() => {
    initFlowbite();
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateHome>
                <Landing />
              </PrivateHome>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/sidebar" element={<Sidebar />} />
          <Route path="/register" element={<Register />} />
          
            <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <PrivateHome>
                  <Dashboard />
                </PrivateHome>
              </PrivateRoute>
            }
          />
            <Route
            path="/akun"
            element={
              <PrivateRoute>
                <PrivateHome>
                  <Settings />
                </PrivateHome>
              </PrivateRoute>
            }
          />

          {/* <Route
            path="/dash"
            element={
              <PrivateRoute>
                <PrivateHome>
                  <IndexDash />
                </PrivateHome>
              </PrivateRoute>
            }
          /> */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
