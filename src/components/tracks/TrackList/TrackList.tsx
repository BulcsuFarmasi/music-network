import React, { FunctionComponent } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import { AppState } from "../../../models/state/app-state";
import { Track } from "../../../models/track";
import SingleTrack from "../SingleTrack/SingleTrack";
import {
  deleteTrack,
  TrackAction,
} from "../../../store/actions/creators/track";

interface Props {
  tracks: Track[];
  deleteTrack: (id: number) => void;
}

const TrackList: FunctionComponent<Props> = (props: Props) => {
  const { tracks, deleteTrack } = props;

  const removeTrack = (id: number) => {
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
    deleteTrack: (id: number) => dispatch(deleteTrack(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackList);
