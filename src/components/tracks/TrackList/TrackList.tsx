import React, { useEffect, FunctionComponent } from "react";

import { connect } from "react-redux";
import { Dispatch } from "redux";

import SingleTrack from "../SingleTrack/SingleTrack";

import { Track } from "../../../models/track";
import { AppState } from "../../../models/state/app-state";
import {
  deleteTrack,
  TrackAction,
  fetchTrack,
} from "../../../store/actions/creators/track";

interface Props {
  deleteTrack: (track: Track) => void;
  fetchTrack: () => void;
  tracks: Track[];
}

const TrackList: FunctionComponent<Props> = (props: Props) => {
  const { tracks, deleteTrack, fetchTrack } = props;

  useEffect(() => {
    fetchTrack();
  }, [fetchTrack]);

  const removeTrack = (track: Track) => {
    deleteTrack(track);
  };

  const trackList = tracks.map((track: Track) => (
    <SingleTrack track={track} key={track.id} removeTrack={removeTrack} />
  ));

  return (
    <div>
      <h2>Track List</h2>
      {trackList}
    </div>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
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
