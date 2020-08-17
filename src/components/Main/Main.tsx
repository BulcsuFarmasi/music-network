import React, { FunctionComponent, useEffect } from "react";

import { connect } from "react-redux";
import { Dispatch } from "redux";

import Layout from "../UI/Layout/Layout";
import { checkAuth } from "../../store/actions/creators/auth";

interface MainProps {
  checkAuth: () => void;
}

const Main: FunctionComponent<MainProps> = (props: MainProps) => {
  const { checkAuth } = props;
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  return <Layout />;
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    checkAuth: () => dispatch(checkAuth()),
  };
};

export default connect(null, mapDispatchToProps)(Main);
