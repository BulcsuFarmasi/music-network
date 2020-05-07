import React, { FunctionComponent } from "react";

import { Button, ButtonState } from "../../button/Button";
import { Track } from "../../../models/track";

import styles from "./SingleTrack.module.scss";

interface Props {
  track: Track;
  removeTrack: (track: Track) => void;
}

const SingleTrack: FunctionComponent<Props> = (props: Props) => {
  const { track, removeTrack } = props;

  let creationText: string = "";

  if (track.creationTime) {
    const creationDate = new Date(track.creationTime);
    creationText = `${creationDate.getFullYear()}. ${creationDate.getMonth()}. ${creationDate.getDate()}. ${creationDate.getHours()}:${creationDate.getMinutes()}`;
  }

  return (
    <div className={styles.track}>
      <h3 className={styles.name}>{track.name}</h3>
      <p>{creationText}</p>
      <p>
        <audio src={track.downloadUrl} controls></audio>
      </p>
      <Button clicked={() => removeTrack(track)} state={ButtonState.danger}>
        Delete
      </Button>
    </div>
  );
};

export default SingleTrack;
