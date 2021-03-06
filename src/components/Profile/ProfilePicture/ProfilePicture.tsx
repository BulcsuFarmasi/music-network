import React, { useState, ChangeEvent, FunctionComponent } from "react";

import { connect } from "react-redux";
import { Dispatch } from "redux";

import { updateProfilePicture } from "../../../store/actions/creators/auth";
import { User } from "../../../models/user";
import { AppState } from "../../../models/state/app-state";

import styles from "./ProfilePicture.module.scss";
import { getExtensionForMimeType } from "../../../utils/file";
import { Profile } from "../../../models/profile";

interface ProfilePictureProps {
  loggedInUser: User | undefined;
  profile:Profile
  updateProfilePicture: (
    user: User | undefined,
    file: File,
    fileName: string
  ) => void;
}

const ProfilePicture: FunctionComponent<ProfilePictureProps> = (
  props: ProfilePictureProps
) => {
  const { loggedInUser, updateProfilePicture, profile } = props;

  const [showUpload, setShowUpload] = useState(false);

  const canUpload = profile.id === loggedInUser?.id;

  const toggleUpload = () => {
    setShowUpload(!showUpload);
  };

  const updateFile = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setShowUpload(false);
      const profilePicture: File = event.target.files[0];
      const now = Date.now();
      const extension = getExtensionForMimeType(profilePicture.type);
      const fileName = `profile-pictures/${loggedInUser?.id}/${now}.${extension}`;
      updateProfilePicture(loggedInUser, profilePicture, fileName);
    }
  };

  let source = profile?.profilePicture?.downloadUrl
    ? profile.profilePicture.downloadUrl
    : "images/default-profile.png";
  return (
    <div className={styles.profilePictureContainer}>
      <img
        src={source}
        alt="Profile Pic"
        onClick={toggleUpload}
        className={styles.profilePicture}
      />
      {showUpload && canUpload && <input type="file" onChange={updateFile} />}
    </div>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    loggedInUser: state.auth.loggedInUser,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    updateProfilePicture: (
      user: User | undefined,
      file: File,
      fileName: string
    ) => dispatch(updateProfilePicture(user, file, fileName)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePicture);
