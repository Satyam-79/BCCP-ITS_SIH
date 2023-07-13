import { useState } from "react";

import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./Pages/Signup";
import SignIn from "./Pages/SignIn";
import { Supplier } from "./components/Supplier";
import Customer from "./components/Customer";
import { Lab } from "./components/Lab";

function App() {

  return (
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<Signup />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/supplier" element={<Supplier />} />
          <Route path="/customer" element={<Customer />} />
          <Route path="/lab" element={<Lab />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
