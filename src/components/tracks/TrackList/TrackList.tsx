import React, { useEffect, FunctionComponent } from "react";

import { connect } from "react-redux";
import { Dispatch } from "redux";

import SingleTrack from "../SingleTrack/SingleTrack";
import { ErrorBanner } from "../../UI/ErrorBanner/ErrorBanner";
import { Track } from "../../../models/track";
import { User } from "../../../models/user";
import { TrackError, TrackErrorType } from "../../../models/track-error";
import { AppState } from "../../../models/state/app-state";
import {
  clearTrackError,
  deleteTrack,
  TrackAction,
  fetchTrack,
} from "../../../store/actions/creators/track";

interface Props {
  clearTrackError: () => void;
  error?: TrackError;
  deleteTrack: (track: Track) => void;
  fetchTrack: (userId?: string) => void;
  loggedInUser?: User;
  tracks: Track[];
}

const TrackList: FunctionComponent<Props> = (props: Props) => {
  const {
    clearTrackError,
    error,
    tracks,
    deleteTrack,
    fetchTrack,
    loggedInUser,
  } = props;

  useEffect(() => {
    fetchTrack(loggedInUser?.id);
  }, [fetchTrack, loggedInUser]);

  const clearError = () => {
    clearTrackError();
  };

  const removeTrack = (track: Track) => {
    deleteTrack(track);
  };

  const trackList = tracks.map((track: Track) => {
    let trackError: TrackError | undefined =
      error &&
      error.type === TrackErrorType.delete &&
      error.trackId === track.id
        ? error
        : undefined;
    return (
      <SingleTrack
        track={track}
        key={track.id}
        removeTrack={removeTrack}
        error={trackError}
        clearError={clearError}
      />
    );
  });

  let errorBanner;

  if (error && TrackErrorType.fetch === error.type) {
    errorBanner = (
      <ErrorBanner closed={clearError}>{error?.message}</ErrorBanner>
    );
  }

  return (
    <div>
      <h2>My Tracks</h2>
      {errorBanner}
      {trackList}
    </div>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    error: state.track.error,
    loggedInUser: state.auth.loggedInUser,
    tracks: state.track.tracks,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<TrackAction>) => {
  return {
    clearTrackError: () => dispatch(clearTrackError()),
    deleteTrack: (track: Track) => dispatch(deleteTrack(track)),
    fetchTrack: (userId?: string) => dispatch(fetchTrack(userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackList);
