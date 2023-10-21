import React, { useState } from "react";
import logo from './logo.svg';
import './App.css';
import { Login } from "./Login";
import { Register } from "./Register";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Dashboard } from "./Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
