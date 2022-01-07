import React from "react";
import "./App.css";
import Drawer from "./Drawer";
import Home from "./Fetch";
import AddSpecies from "./AddSpecies";
import Contact from "./Contact";
import About from "./About";
import { Switch, Route } from "react-router-dom";

// import {BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
    <>
      <Drawer />
      <Switch>
        <Route exact from="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/addspecies" component={AddSpecies} />
      </Switch>
    </>
  );
}

export default App;
