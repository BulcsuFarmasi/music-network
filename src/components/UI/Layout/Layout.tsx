import React, { FunctionComponent } from "react";
import { connect } from "react-redux";

import { Navigation } from "../Navigation/Navgiation";
import Routes from "../../Routes/Routes";
import { AppState } from "../../../models/state/app-state";

import styles from "./Layout.module.scss";

interface Props {
  authed: boolean;
}

const Layout: FunctionComponent<Props> = (props: Props) => {
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
