import React from "react";
import "./App.css";
import Fetch from "./Fetch";
import { Offline, Online } from "react-detect-offline";
import Scroll from "./Scroll";
import AppBar from "./Appbar";

function App() {
  return (
    <div>
      <Offline>Make sure you have an active internet connection.</Offline>

       <Online>
      {/*<Drawer />*/}
      <AppBar />
      <Fetch />
      <Scroll showBelow={140} />
      </Online>
    </div>
  );
}

export default App;
