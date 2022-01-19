import React from "react";
import "./App.css";
import Drawer from "./components/Drawer";
import Home from "./components/Fetch";
import AddSpecies from "./pages/AddSpecies";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Error from "./pages/ErrorPage";
import Plants from './pages/Plants'
import { Switch, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";

// import {BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Drawer />
        <Switch>
          <Route exact from="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/addspecies" component={AddSpecies} />
          <Route exact path="/plant/:id" component={Plants} />
          <Route component={Error} />
        </Switch>
      </ThemeProvider>
    </>
  );
}

export default App;
