import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import EmailVerify from "./pages/EmailVerify";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
import AppContainer from "./components/AppContainer";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<AppContainer />}>
        <Route index element={<h1>Welcome to the App</h1>} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/email/verify/:code" element={<EmailVerify />} />
      <Route path="/forgot-password" element={<ForgetPassword />} />
      <Route path="/password/reset" element={<ResetPassword />} />
    </Routes>
  );
};

export default App;
