import React, { useEffect, FunctionComponent } from "react";

import { connect } from "react-redux";
import { Dispatch } from "redux";

import SingleTrack from "../SingleTrack/SingleTrack";
import { ErrorBanner } from "../../UI/ErrorBanner/ErrorBanner";
import { Track } from "../../../models/track";
import { TrackError, TrackErrorType } from "../../../models/error/track-error";
import { User } from "../../../models/user";
import { AppState } from "../../../models/state/app-state";
import {
  clearTrackError,
  deleteTrack,
  fetchTrack,
  TrackAction,
} from "../../../store/actions/creators/track";

interface TrackListProps {
  clearTrackError: () => void;
  error?: TrackError;
  deleteTrack: (track: Track, token: string) => void;
  fetchTrack: (token: string, userId?: string) => void;
  loggedInUser?: User;
  tracks: Track[];
}

const TrackList: FunctionComponent<TrackListProps> = (
  props: TrackListProps
) => {
  const {
    clearTrackError,
    error,
    tracks,
    deleteTrack,
    fetchTrack,
    loggedInUser,
  } = props;

  useEffect(() => {
    fetchTrack(loggedInUser?.token?.body ?? "", loggedInUser?.id);
  }, [fetchTrack, loggedInUser]);

  const clearError = () => {
    clearTrackError();
  };

  const removeTrack = (track: Track) => {
    deleteTrack(track, loggedInUser?.token?.body ?? "");
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
    deleteTrack: (track: Track, token: string) =>
      dispatch(deleteTrack(track, token)),
    fetchTrack: (token: string, userId?: string) =>
      dispatch(fetchTrack(token, userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackList);
