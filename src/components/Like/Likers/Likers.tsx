import React, { FunctionComponent, useState } from "react";

import { Profile } from "../../../models/profile";
import { MiniProfile } from "../../Profile/MiniProfile/MiniProfile";

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
    <MiniProfile profile={liker}></MiniProfile>
  ));

  const likerListContainer = likersVisible ? (
    <div className="likers-list">{likerList}</div>
  ) : null;

  return (
    <div className="likers">
      <p onClick={toggleLikersVisible}>Likers</p>
      {likerListContainer}
    </div>
  );
};

export default Likers;
