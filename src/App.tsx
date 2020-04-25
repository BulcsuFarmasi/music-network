import React, { FunctionComponent } from "react";
import styles from "./App.module.css";

import AddTrack from "./components/tracks/AddTrack/AddTrack";
import TrackList from "./components/tracks/TrackList/TrackList";

const App: FunctionComponent = () => {
  return (
    <div className={styles.app}>
      <p>First Own React App!</p>
      <AddTrack />
      <TrackList />
    </div>
  );
};

export default App;
