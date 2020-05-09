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
import { TrackError, TrackErrorType } from "../../../models/track-error";
import { AppState } from "../../../models/state/app-state";
import { LoadingState } from "../../../models/state/loading-state";
import {
  addTrack,
  clearTrackError,
  clearTrackLoading,
  TrackAction,
} from "../../../store/actions/creators/track";
import { ErrorBanner } from "../../error-banner/ErrorBanner";

interface Props {
  addTrack: (track: Track, fileName: string, trackFile?: File) => void;
  clearTrackError: () => void;
  clearTrackLoading: () => void;
  error?: TrackError;
  history: History;
  loading: LoadingState;
}

const AddTrack: FunctionComponent<Props> = (props: Props) => {
  const {
    addTrack,
    clearTrackError,
    clearTrackLoading,
    error,
    history,
    loading,
  } = props;

  const loadingRef: MutableRefObject<LoadingState> = useRef(loading);

  const [track, setTrack] = useState<Track>({ name: "" });
  const [trackFile, setTrackFile] = useState<File>();

  useEffect(() => {
    if (loading === loadingRef.current && loading === LoadingState.completed) {
      clearTrackLoading();
    } else if (
      loading === LoadingState.completed &&
      loadingRef.current === LoadingState.onGoing &&
      !error
    ) {
      history.push("/");
    }
    loadingRef.current = loading;
  }, [error, clearTrackLoading, loading, history]);

  const clearError = () => {
    clearTrackError();
  };

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
      {error?.type === TrackErrorType.add ? (
        <ErrorBanner closed={clearError}>{error.message}</ErrorBanner>
      ) : null}
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
    error: state.track.error,
    loading: state.track.loading,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<TrackAction>) => {
  return {
    addTrack: (track: Track, fileName: string, file?: File) => {
      dispatch(addTrack(track, fileName, file));
    },
    clearTrackError: () => {
      dispatch(clearTrackError());
    },
    clearTrackLoading: () => {
      dispatch(clearTrackLoading());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTrack);
