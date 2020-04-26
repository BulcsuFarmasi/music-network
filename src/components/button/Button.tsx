import React, { FunctionComponent, PropsWithChildren } from "react";

import styles from "./Button.module.scss";

interface ButtonProps {
  clicked: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  state: ButtonState;
}

export enum ButtonState {
  confirm,
  danger,
}

const Button: FunctionComponent<ButtonProps> = (
  props: PropsWithChildren<ButtonProps>
) => {
  const { children, clicked, state } = props;

  const classes: string[] = [styles.button];

  switch (state) {
    case ButtonState.confirm:
      classes.push(styles.confirm);
      break;
    case ButtonState.danger:
      classes.push(styles.danger);
      break;
  }

  const className: string = classes.join(" ");

  return (
    <button onClick={clicked} className={className}>
      {children}
    </button>
  );
};

export default Button;
