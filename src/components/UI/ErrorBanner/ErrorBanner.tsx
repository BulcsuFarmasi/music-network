import React, { FunctionComponent, PropsWithChildren } from "react";

import styles from "./ErrorBanner.module.scss";

interface ErrorBannerProps {
  closed: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
}

export const ErrorBanner: FunctionComponent<ErrorBannerProps> = (
  props: PropsWithChildren<ErrorBannerProps>
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
