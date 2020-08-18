import React, { Fragment, FunctionComponent } from "react";

import { connect } from "react-redux";

import ProfilePicture from "../ProfilePicture/ProfilePicture";
import TrackList from "../../Tracks/TrackList/TrackList";
import { User } from "../../../models/user";
import { AppState } from "../../../models/state/app-state";

import styles from "./Profile.module.scss";

interface ProfileProps {
  loggedInUser?: User;
}

const Profile: FunctionComponent<ProfileProps> = (props: ProfileProps) => {
  const { loggedInUser } = props;
  return (
    <Fragment>
      <div className={styles.profileHeader}>
        <ProfilePicture></ProfilePicture>
        <h2>{loggedInUser?.username}</h2>
      </div>
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
