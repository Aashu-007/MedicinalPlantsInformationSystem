import React from "react";
import "./App.css";
import Drawer from "./components/Drawer";
import Home from "./components/Fetch";
import AddSpecies from "./pages/AddSpecies";
import Contact from "./pages/Contact";
import About from "./pages/About";
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
