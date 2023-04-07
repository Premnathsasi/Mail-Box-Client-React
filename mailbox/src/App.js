import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import AuthForm from "./components/Authentication/AuthForm";
import Header from "./components/Pages/Header";
import { useSelector } from "react-redux";
import SideBar from "./components/Pages/Sidebar";
import "./App.css";


function App() {

  const auth = useSelector(state => state.auth.isAuthenticated);

  return (
    <React.Fragment>
      <Header />
      <Routes>
        {!auth && <Route path='/' element={<AuthForm />} />}
        {auth && <Route path="/sidebar" element={<SideBar />} />}
        {!auth ? <Route path="*" element={<Navigate to="/" />} /> : <Route path="*" element={<Navigate to='/sidebar' />} /> }
      </Routes>
      
    </React.Fragment>
  );
}

export default App;
