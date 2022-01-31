import React from "react";
import "./App.css";
import Drawer from "./components/Drawer";
import Home from "./components/Fetch";
import AddSpecies from "./pages/AddSpecies";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Error from "./pages/ErrorPage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Plants from './pages/Plants';
import forgotPswd from './pages/forgotPswd'
import Search from './components/Search'
import Dashboard from './pages/Dashboard'
import { Switch, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import {AuthProvider} from './components/Authentication/AuthProvider';
import ProtectedRoute from './components/Authentication/ProtectedRoute'

function App() {
  return (
    <>
    
      <ThemeProvider theme={theme}>
        <AuthProvider>
        <Drawer />
        <Switch>
          <Route exact from="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/contact" component={Contact} />
          <ProtectedRoute exact path="/addspecies" component={AddSpecies} />
          <Route exact path="/plant/:id" component={Plants} />
          <Route exaxt path="/search" component={Search}/>
          <Route exaxt path="/signup" component={Signup}/>
          <Route exaxt path="/login" component={Login}/>
          <Route exaxt path="/forgotPswd" component={forgotPswd}/>
          <Route exaxt path="/dashboard" component={Dashboard}/>
          <Route component={Error} />
        </Switch>
        </AuthProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
