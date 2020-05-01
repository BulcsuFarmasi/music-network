import React, {
  FunctionComponent,
  useState,
  ChangeEvent,
  MutableRefObject,
  useEffect,
  useRef,
} from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { History } from "history";

import Button, { ButtonState } from "../../button/Button";
import { Track } from "../../../models/track";
import {
  addTrack,
  TrackAction,
  clearTrackLoading,
} from "../../../store/actions/creators/track";
import { AppState } from "../../../models/state/app-state";
import { LoadingState } from "../../../models/state/loading-state";

interface Props {
  addTrack: (track: Track) => void;
  clearTrackLoading: () => void;
  history: History;
  loading: LoadingState;
}

const AddTrack: FunctionComponent<Props> = (props: Props) => {
  const { addTrack, clearTrackLoading, history, loading } = props;

  const [track, setTrack] = useState<Track>({ name: "" });

  const loadingRef: MutableRefObject<LoadingState> = useRef(loading);

  useEffect(() => {
    console.log(loading, loadingRef);

    if (loading === loadingRef.current && loading === LoadingState.completed) {
      clearTrackLoading();
    } else if (
      loading === LoadingState.completed &&
      loadingRef.current === LoadingState.onGoing
    ) {
      history.push("/");
    }
    loadingRef.current = loading;
  }, [clearTrackLoading, loading, history]);

  const updateTrack = (
    event: ChangeEvent<HTMLInputElement>,
    propertyName: string
  ) => {
    const updatedTrack: Track = { ...track };
    updatedTrack[propertyName] = event.target.value;
    setTrack(updatedTrack);
  };

  const saveTrack = (
    event?: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event?.preventDefault();
    track.creationTime = Date.now();
    addTrack(track);
  };

  return (
    <form>
      <h2>Add Track</h2>
      <p>
        <label htmlFor="track-name">Name of track</label>
        <br />
        <input
          type="text"
          name="track-name"
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            updateTrack(event, "name")
          }
          value={track.name}
        />
      </p>
      <p>
        <Button clicked={saveTrack} state={ButtonState.confirm}>
          Add Track
        </Button>
      </p>
    </form>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    loading: state.track.loading,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<TrackAction>) => {
  return {
    addTrack: (track: Track) => {
      dispatch(addTrack(track));
    },
    clearTrackLoading: () => {
      dispatch(clearTrackLoading());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTrack);
