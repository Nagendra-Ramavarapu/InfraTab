import React from "react";
import SideNav from "./Components/SideNav";
import Header from "./Components/Header";
import AppRoute from "./Components/AppRoute";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
      <Header />
      <div style={{ display: "flex" }}>
        <SideNav />
        <AppRoute />
      </div>
    </Router>
  );
}

export default App;
