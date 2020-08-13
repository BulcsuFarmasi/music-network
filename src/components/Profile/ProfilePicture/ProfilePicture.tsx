import React, { useState, ChangeEvent, FunctionComponent } from "react";

import { connect } from "react-redux";

import { User } from "../../../models/user";
import { AppState } from "../../../models/state/app-state";

import styles from "./ProfilePicture.module.scss";

interface Props {
  loggedInUser: User;
}

const ProfilePicture: FunctionComponent<Props> = (props: Props) => {
  const { loggedInUser } = props;

  const [showUpload, setShowUpload] = useState(false);

  const toggleUpload = () => {
    setShowUpload(!showUpload);
  };

  const updateProfilePicture = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const profilePicture: File = event.target.files[0];
      console.log(profilePicture);
      setShowUpload(false);
    }
  };

  let source = loggedInUser.profilePicture?.downloadUrl
    ? loggedInUser.profilePicture.downloadUrl
    : "images/default-profile.png";
  return (
    <div className={styles.profilePictureContainer}>
      <img
        src={source}
        alt="Profile Pic"
        onClick={toggleUpload}
        className={styles.profilePicture}
      />
      {showUpload && <input type="file" onChange={updateProfilePicture} />}
    </div>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    loggedInUser: state.auth.loggedInUser,
  };
};

export default connect(mapStateToProps)(ProfilePicture);
