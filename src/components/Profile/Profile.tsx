import React, { FunctionComponent, Fragment } from "react";

import { connect } from "react-redux";

import TrackList from "../Tracks/TrackList/TrackList";
import { User } from "../../models/user";
import { AppState } from "../../models/state/app-state";

interface Props {
  loggedInUser?: User;
}

const Profile: FunctionComponent<Props> = (props: Props) => {
  const { loggedInUser } = props;
  return (
    <Fragment>
      <h2>{loggedInUser?.username}</h2>
      <TrackList></TrackList>
    </Fragment>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    loggedInUser: state.auth.loggedInUser,
  };
};

export default connect(mapStateToProps)(Profile);
