import React, { FunctionComponent, PropsWithChildren } from "react";

import styles from "./ErrorBanner.module.scss";

interface Props {
  closed: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
}

export const ErrorBanner: FunctionComponent<Props> = (
  props: PropsWithChildren<Props>
) => {
  const { children, closed } = props;
  return (
    <p className={styles.errorBanner}>
      {children}
      <span className={styles.close} onClick={closed}>
        X
      </span>
    </p>
  );
};
