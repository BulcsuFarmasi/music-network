import React, { FunctionComponent } from "react";
import { BrowserRouter } from "react-router-dom";
import styles from "./App.module.css";

import Navigation from "./components/navigation/Navgiation";
import Routes from "./components/routes/Routes";

const App: FunctionComponent = () => {
  return (
    <BrowserRouter>
      <div className={styles.app}>
        <Navigation />
        <Routes />
      </div>
    </BrowserRouter>
  );
};

export default App;
