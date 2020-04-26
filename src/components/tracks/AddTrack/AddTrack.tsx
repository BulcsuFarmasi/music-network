import React, { FunctionComponent, useState, ChangeEvent } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { History } from "history";

import Button, { ButtonState } from "../../button/Button";
import { Track } from "../../../models/track";
import { addTrack, TrackAction } from "../../../store/actions/creators/track";

interface Props {
  addTrack: (track: Track) => void;
  history: History;
}

const AddTrack: FunctionComponent<Props> = (props: Props) => {
  const [track, setTrack] = useState<Track>({ id: 0, name: "" });

  const { addTrack, history } = props;

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
    const updatedTrack: Track = { ...track };
    updatedTrack.id = Date.now();
    addTrack(updatedTrack);
    history.push("/");
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

const mapDispatchToProps = (dispatch: Dispatch<TrackAction>) => {
  return {
    addTrack: (track: Track) => {
      dispatch(addTrack(track));
    },
  };
};

export default connect(null, mapDispatchToProps)(AddTrack);
