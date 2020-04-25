import React, { FunctionComponent } from "react";

import Navigation from "../navigation/Navgiation";
import Routes from "../routes/Routes";

import styles from "./Layout.module.scss";

const Layout: FunctionComponent = () => {
  return (
    <div className={styles.layout}>
      <Navigation />
      <Routes />
    </div>
  );
};

export default Layout;
