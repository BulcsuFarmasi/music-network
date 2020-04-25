import { Reducer } from "redux";

interface Track {
  id: number;
  name: String;
}

interface TrackState {
  tracks: Track[];
}

const initialState: TrackState = {
  tracks: [],
};

const trackReducer: Reducer = (state: TrackState = initialState, action) => {
  return state;
};

export default trackReducer;
