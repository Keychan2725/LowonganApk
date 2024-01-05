import React from "react";
import "./App.css";
import "../src/assets/styles/index.css";
import "../src/assets/styles/tailwind.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./Pages/Landing";
import Profile from "./Pages/Profile";
import Settings from "./Pages/Settings";
 
import IndexDropdown from "./components/Sidebar/Sidebar"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/card" element={<IndexDropdown />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
