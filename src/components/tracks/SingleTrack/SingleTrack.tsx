import React, { FunctionComponent } from "react";

import { Button, ButtonState } from "../../UI/Button/Button";
import Like from "../../Like/Like/Like";
import Likers from "../../Like/Likers/Likers";
import { ErrorBanner } from "../../UI/ErrorBanner/ErrorBanner";
import { Track } from "../../../models/track";
import { TrackError } from "../../../models/error/track-error";

import styles from "./SingleTrack.module.scss";

interface SingleTrackProps {
  clearError: () => void;
  error?: TrackError;
  track: Track;
  removeTrack: (track: Track) => void;
}

const SingleTrack: FunctionComponent<SingleTrackProps> = (
  props: SingleTrackProps
) => {
  const { clearError, error, track, removeTrack } = props;

  let creationText: string = "";

  if (track.creationTime) {
    const creationDate = new Date(track.creationTime);
    creationText = `${creationDate.getFullYear()}. ${
      creationDate.getMonth() + 1
    }. ${creationDate.getDate()}. ${creationDate.getHours()}:${creationDate.getMinutes()}`;
  }

  return (
    <div className={styles.track}>
      {error ? (
        <ErrorBanner closed={clearError}>{error.message}</ErrorBanner>
      ) : null}
      <h3 className={styles.name}>{track.name}</h3>
      <p>{creationText}</p>
      <p>
        <audio src={track?.file?.downloadUrl} controls></audio>
      </p>
      <Button clicked={() => removeTrack(track)} state={ButtonState.danger}>
        Delete
      </Button>
      <Like track={track}></Like>
      <Likers></Likers>
    </div>
  );
};

export default SingleTrack;
