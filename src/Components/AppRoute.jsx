import React from "react";
import Home from "./Home";
import Table from "./Table";
import { Route } from "react-router-dom";

const AppRoute = () => {
  return (
    <div id="AppRoute" style={{ background: "#e0e6ea54" }}>
      <Route exact path="/" component={Home}></Route>
      <Route path="/Table" component={Table}></Route>
    </div>
  );
};

export default AppRoute;
