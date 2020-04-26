import React, { FunctionComponent } from "react";

import { Track } from "../../../store/reducers/track";

import styles from "./SingleTrack.module.scss";

interface Props {
  track: Track;
  removeTrack: any;
}

const SingleTrack: FunctionComponent<Props> = (props: Props) => {
  const { track, removeTrack } = props;
  return (
    <div className={styles.track}>
      <h3 className={styles.name}>{track.name}</h3>
      <button onClick={() => removeTrack(track.id)}>Delete</button>
    </div>
  );
};

export default SingleTrack;
