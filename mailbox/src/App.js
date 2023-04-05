import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import AuthForm from "./components/Authentication/AuthForm";
import Header from "./components/Pages/Header";
import Welcome from "./components/Pages/Welcome";
import { useSelector } from "react-redux";
import "./App.css";


function App() {

  const auth = useSelector(state => state.auth.isAuthenticated);

  return (
    <React.Fragment>
      <Header />
      <Routes>
        {!auth && <Route path='/' element={<AuthForm />} />}
        {auth && <Route path="/welcome" element={<Welcome />} />}
        {!auth ? <Route path="*" element={<Navigate to="/" />} /> : <Route path="*" element={<Navigate to='/welcome' />} /> }
      </Routes>
      
    </React.Fragment>
  );
}

export default App;
