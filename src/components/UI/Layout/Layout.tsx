import React, { FunctionComponent } from "react";

import { Navigation } from "../Navigation/Navgiation";
import { Routes } from "../../Routes/Routes";

import styles from "./Layout.module.scss";

const Layout: FunctionComponent = () => {
  return (
    <div className={styles.layout}>
      <Navigation />
      <h1>Music Network</h1>
      <Routes />
    </div>
  );
};

export default Layout;
