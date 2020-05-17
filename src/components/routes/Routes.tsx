import React, { FunctionComponent } from "react";

import { Redirect, Route, Switch } from "react-router-dom";

import AddTrack from "../Tracks/AddTrack/AddTrack";
import TrackList from "../Tracks/TrackList/TrackList";

export const Routes: FunctionComponent = () => {
  return (
    <Switch>
      <Route path="/" exact component={TrackList} />
      <Route path="/add-track" component={AddTrack} />
      <Redirect to="/" />
    </Switch>
  );
};
