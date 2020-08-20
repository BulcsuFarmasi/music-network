import React, { FunctionComponent } from "react";

import { connect } from "react-redux";
import { Dispatch } from "redux";

import { Button, ButtonState } from "../../UI/Button/Button";
import { authLogout, AuthAction } from "../../../store/actions/creators/auth";

interface LogoutProps {
  authLogout: () => void;
}

const Logout: FunctionComponent<LogoutProps> = (props: LogoutProps) => {
  const { authLogout } = props;
  const logout = () => {
    authLogout();
  };
  return (
    <Button state={ButtonState.danger} clicked={logout}>
      Logout
    </Button>
  );
};

const mapDispatchToProps = (dispatch: Dispatch<AuthAction>) => {
  return {
    authLogout: () => {
      dispatch(authLogout());
    },
  };
};

export default connect(null, mapDispatchToProps)(Logout);
