import React, {
  useEffect,
  useRef,
  useState,
  ChangeEvent,
  FunctionComponent,
  MutableRefObject,
} from "react";

import { History } from "history";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import { Button, ButtonState } from "../../button/Button";
import { Track } from "../../../models/track";
import { AppState } from "../../../models/state/app-state";
import { LoadingState } from "../../../models/state/loading-state";
import {
  addTrack,
  clearTrackLoading,
  TrackAction,
} from "../../../store/actions/creators/track";

interface Props {
  addTrack: (track: Track, fileName: string, trackFile?: File) => void;
  clearTrackLoading: () => void;
  history: History;
  loading: LoadingState;
}

const AddTrack: FunctionComponent<Props> = (props: Props) => {
  const { addTrack, clearTrackLoading, history, loading } = props;

  const loadingRef: MutableRefObject<LoadingState> = useRef(loading);

  const [track, setTrack] = useState<Track>({ name: "" });
  const [trackFile, setTrackFile] = useState<File>();

  useEffect(() => {
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

  const saveTrack = (
    event?: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event?.preventDefault();
    track.creationTime = Date.now();
    const fileName: string = `tracks/${Date.now()}.mp3`;
    addTrack(track, fileName, trackFile);
  };

  const updateTrack = (
    event: ChangeEvent<HTMLInputElement>,
    propertyName: string
  ) => {
    const updatedTrack: Track = { ...track };
    updatedTrack[propertyName] = event.target.value;
    setTrack(updatedTrack);
  };

  const updateTrackFile = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setTrackFile(event.target.files[0]);
    }
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
        <label htmlFor="track-file">Track File</label>
        <br />
        <input
          type="file"
          name="track-file"
          accept="audio/mpeg"
          onChange={updateTrackFile}
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
    addTrack: (track: Track, fileName: string, file?: File) => {
      dispatch(addTrack(track, fileName, file));
    },
    clearTrackLoading: () => {
      dispatch(clearTrackLoading());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTrack);
