import React, { FunctionComponent } from "react";
import { connect } from "react-redux";

import { Navigation } from "../Navigation/Navigation";
import Routes from "../../Routes/Routes";
import { AppState } from "../../../models/state/app-state";

import styles from "./Layout.module.scss";

interface LayoutProps {
  authed: boolean;
}

const Layout: FunctionComponent<LayoutProps> = (props: LayoutProps) => {
  const { authed } = props;
  return (
    <div className={styles.layout}>
      {authed ? <Navigation /> : null}
      <h1>Music Network</h1>
      <Routes />
    </div>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    authed: state.auth.authed,
  };
};

export default connect(mapStateToProps)(Layout);
