import React, { FunctionComponent } from "react";

import { NavLink } from "react-router-dom";

import styles from "./Navigation.module.scss";

export const Navigation: FunctionComponent = () => {
  return (
    <ul className={styles.nav}>
      <li className={styles.navLink}>
        <NavLink to="/track-list" exact>
          List Tracks
        </NavLink>
      </li>
      <li className={styles.navLink}>
        <NavLink to="/add-track" exact>
          Add Track
        </NavLink>
      </li>
    </ul>
  );
};
