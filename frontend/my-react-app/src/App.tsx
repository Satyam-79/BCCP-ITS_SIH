import { useState } from "react";

import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./Pages/Signup";
import SignIn from "./Pages/SignIn";
import { Supplier } from "./components/Supplier";

function App() {

let isLoggedIn = localStorage.getItem("token")

  return (
      <BrowserRouter>
        <Routes>
        <Route
          // path="/*"
          element={isLoggedIn ? <Supplier /> : <Navigate to="/signin" />}
        />
          <Route index path="/" element={<Signup />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/supplier" element={<Supplier />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
