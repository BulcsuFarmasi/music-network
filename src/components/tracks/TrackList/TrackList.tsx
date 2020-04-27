import React, { FunctionComponent, useEffect } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import { AppState } from "../../../models/state/app-state";
import { Track } from "../../../models/track";
import SingleTrack from "../SingleTrack/SingleTrack";
import {
  deleteTrack,
  TrackAction,
  fetchTrack,
} from "../../../store/actions/creators/track";

interface Props {
  tracks: Track[];
  deleteTrack: (id?: string) => void;
  fetchTrack: () => void;
}

const TrackList: FunctionComponent<Props> = (props: Props) => {
  const { tracks, deleteTrack, fetchTrack } = props;

  useEffect(() => {
    fetchTrack();
  }, [fetchTrack]);

  const removeTrack = (id?: string) => {
    deleteTrack(id);
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
    deleteTrack: (id?: string) => dispatch(deleteTrack(id)),
    fetchTrack: () => dispatch(fetchTrack()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackList);
