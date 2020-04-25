import React, { FunctionComponent } from "react";

const AddTrack: FunctionComponent = () => {
  return (
    <form>
      <p>
        <label htmlFor="track-name">Name of track</label>
        <br />
        <input type="text" name="track-name" />
      </p>
      <p>
        <button>Add Track</button>
      </p>
    </form>
  );
};

export default AddTrack;
