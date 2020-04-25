import React, { FunctionComponent } from "react";

import { Track } from "../../../store/reducers/track";

interface Props {
  track: Track;
  removeTrack: any;
}

const SingleTrack: FunctionComponent<Props> = (props: Props) => {
  const { track, removeTrack } = props;
  return (
    <div>
      <p>{track.name}</p>
      <p>
        <button onClick={() => removeTrack(track.id)}>Delete</button>
      </p>
    </div>
  );
};

export default SingleTrack;
