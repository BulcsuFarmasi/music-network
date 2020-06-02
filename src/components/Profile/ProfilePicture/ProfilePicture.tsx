import React, { useState, FunctionComponent } from "react";

import { connect } from "react-redux";

import { AppState } from "../../../models/state/app-state";

import styles from "./ProfilePicture.module.scss";

interface Props {
  profilePictureUrl?: string;
}

const ProfilePicture: FunctionComponent<Props> = (props: Props) => {
  const { profilePictureUrl } = props;

  const [showUpload, setShowUpload] = useState(false);

  const toggleUpload = () => {
    setShowUpload(!showUpload);
  };

  let source = profilePictureUrl
    ? profilePictureUrl
    : "images/default-profile.png";
  return (
    <div className={styles.profilePictureContainer}>
      <img
        src={source}
        alt="Profile Pic"
        onClick={toggleUpload}
        className={styles.profilePicture}
      />
      {showUpload && <input type="file" />}
    </div>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    profilePictureUrl: state.auth.loggedInUser?.profilePicture?.downloadUrl,
  };
};

export default connect(mapStateToProps)(ProfilePicture);
