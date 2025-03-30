import { useRef, useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import LandingPage from "./pages/landing";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/home" element=""/> */}
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
