import React from "react";
import "./App.css";
import AuthForm from "./components/Authentication/AuthForm";
import Header from "./components/Pages/Header";

function App() {
  return (
    <React.Fragment>
      <Header />
      <AuthForm />
    </React.Fragment>
  );
}

export default App;
