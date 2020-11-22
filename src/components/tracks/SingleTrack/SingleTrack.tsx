import React, { FunctionComponent } from "react";

import { CommentList } from "../../Comment/CommentList/CommentList";
import Like from "../../Like/Like/Like";
import Likers from "../../Like/Likers/Likers";
import { MiniProfile } from "../../Profile/MiniProfile/MiniProfile";
import { Button, ButtonState } from "../../UI/Button/Button";
import { ErrorBanner } from "../../UI/ErrorBanner/ErrorBanner";
import { Track } from "../../../models/track";
import { TrackError } from "../../../models/error/track-error";

import styles from "./SingleTrack.module.scss";
import { formatEpochTime } from "../../../utils/date-time";

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

  let creationText:string = formatEpochTime(track.creationTime ?? 0);
  

  return (
    <div className={styles.track}>
      {error ? (
        <ErrorBanner closed={clearError}>{error.message}</ErrorBanner>
      ) : null}
      <MiniProfile profile={track.author ?? {}}></MiniProfile>
      <h3 className={styles.name}>{track.name}</h3>
      <p>{creationText}</p>
      <p>
        <audio src={track?.file?.downloadUrl} controls></audio>
      </p>
      <Button clicked={() => removeTrack(track)} state={ButtonState.danger}>
        Delete
      </Button>
      <div className={styles.userContent}>
        <Like track={track}></Like>
        <Likers likers={track.likerProfiles ?? []}></Likers>
        <CommentList trackId={track?.id ?? ""} comments={track.comments}></CommentList>
      </div>
    </div>
  );
};

export default SingleTrack;
