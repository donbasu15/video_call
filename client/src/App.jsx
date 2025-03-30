import { useRef, useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import LandingPage from "./pages/landing";
import Authentication from "./pages/authentication";
import { AuthProvider } from "./contexts/authContext";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* <Route path="/home" element=""/> */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth" element={<Authentication />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
