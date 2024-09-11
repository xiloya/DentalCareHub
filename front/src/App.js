import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from "./components/Authentification/signin";
import Register from "./components/Authentification/register";
import "bootstrap/dist/css/bootstrap.min.css";
import Calendar from "./components/calendarapp/calendar";
import Home from "./components/Home/Home/Home";

import "./App.css";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/calendar" element={<Calendar />} />
      </Routes>
    </Router>
  );
};

export default App;
