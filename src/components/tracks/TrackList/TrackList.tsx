import React, { useEffect, FunctionComponent, useState } from "react";

import { connect } from "react-redux";
import { Dispatch } from "redux";

import SingleTrack from "../SingleTrack/SingleTrack";
import { ErrorBanner } from "../../error-banner/ErrorBanner";
import { Track } from "../../../models/track";
import { TrackError, TrackErrorType } from "../../../models/track-error";
import { AppState } from "../../../models/state/app-state";
import {
  deleteTrack,
  TrackAction,
  fetchTrack,
} from "../../../store/actions/creators/track";

interface Props {
  error?: TrackError;
  deleteTrack: (track: Track) => void;
  fetchTrack: () => void;
  tracks: Track[];
}

const TrackList: FunctionComponent<Props> = (props: Props) => {
  const { error, tracks, deleteTrack, fetchTrack } = props;

  useEffect(() => {
    fetchTrack();
  }, [fetchTrack]);

  const clearError = () => {
    // setError(false);
  };

  const removeTrack = (track: Track) => {
    deleteTrack(track);
  };

  const trackList = tracks.map((track: Track) => (
    <SingleTrack track={track} key={track.id} removeTrack={removeTrack} />
  ));

  return (
    <div>
      <h2>Track List</h2>
      {error?.type === TrackErrorType.fetch ? (
        <ErrorBanner closed={clearError}>{error.message}</ErrorBanner>
      ) : null}
      {trackList}
    </div>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    error: state.track.error,
    tracks: state.track.tracks,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<TrackAction>) => {
  return {
    deleteTrack: (track: Track) => dispatch(deleteTrack(track)),
    fetchTrack: () => dispatch(fetchTrack()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackList);
