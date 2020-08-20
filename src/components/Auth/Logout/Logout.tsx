import React, { FunctionComponent } from "react";

import { Button, ButtonState } from "../../UI/Button/Button";

const Logout: FunctionComponent = () => {
  const logout = () => {
    console.log("logging out");
  };
  return (
    <Button state={ButtonState.danger} clicked={logout}>
      Logout
    </Button>
  );
};

export default Logout;
