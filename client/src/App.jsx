import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Activites from "./pages/Activites";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Navbar from "./components/home/Navbar";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./context/ProtectedRoute";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter future={{ v7_startTransition: true , v7_relativeSplatPath: true, }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/activities" element={<Activites />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
