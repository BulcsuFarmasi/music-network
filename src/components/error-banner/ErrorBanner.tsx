import React, { FunctionComponent, PropsWithChildren } from "react";

import styles from "./ErrorBanner.module.scss";

interface Props {}

export const ErrorBanner: FunctionComponent<Props> = (
  props: PropsWithChildren<Props>
) => {
  const { children } = props;
  return <p className={styles.errorBanner}>{children}</p>;
};
