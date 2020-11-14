import React, { FunctionComponent, useState } from "react";

import { Profile } from "../../../models/profile";
import { MiniProfile } from "../../Profile/MiniProfile/MiniProfile";

import styles from "./Likers.module.scss";

interface LikersProps {
  likers: Profile[];
}

const Likers: FunctionComponent<LikersProps> = (props: LikersProps) => {
  const { likers } = props;

  const [likersVisible, setLikersVisible] = useState<boolean>(false);

  const toggleLikersVisible = () => {
    setLikersVisible(!likersVisible);
  };

  const likerList = likers.map((liker: Profile) => (
    <MiniProfile profile={liker} key={liker.id}></MiniProfile>
  ));

  const likerListContainer = likersVisible ? (
    <div className={styles.likerList}>{likerList}</div>
  ) : null;

  return (
    <div className={styles.likers}>
      <p onClick={toggleLikersVisible}>Likers</p>
      {likerListContainer}
    </div>
  );
};

export default Likers;
