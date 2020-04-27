import React, { FunctionComponent } from "react";

import { Track } from "../../../models/track";
import Button, { ButtonState } from "../../button/Button";

import styles from "./SingleTrack.module.scss";

interface Props {
  track: Track;
  removeTrack: (id?: string) => void;
}

const SingleTrack: FunctionComponent<Props> = (props: Props) => {
  const { track, removeTrack } = props;
  return (
    <div className={styles.track}>
      <h3 className={styles.name}>{track.name}</h3>
      <Button clicked={() => removeTrack(track.id)} state={ButtonState.danger}>
        Delete
      </Button>
    </div>
  );
};

export default SingleTrack;
