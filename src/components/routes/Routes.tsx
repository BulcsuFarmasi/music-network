import React, { FunctionComponent } from "react";

import { Redirect, Route, Switch } from "react-router-dom";

import TrackList from "../tracks/TrackList/TrackList";
import AddTrack from "../tracks/AddTrack/AddTrack";

const Routes: FunctionComponent = () => {
  return (
    <Switch>
      <Route path="/" exact component={TrackList} />
      <Route path="/add-track" component={AddTrack} />
      <Redirect to="/" />
    </Switch>
  );
};

export default Routes;
