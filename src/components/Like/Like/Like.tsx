import React, { useState, FunctionComponent } from "react";

import styles from "./Like.module.scss";

const Like: FunctionComponent = () => {
  const [like, setLike] = useState<boolean>(false);
  const [heartImage, setHeartImage] = useState<string>(
    "images/heart-black.png"
  );
  const [heartImageAlt, setHeartImageAlt] = useState<string>("Don't like");
  const [likeNumber, setLikeNumber] = useState<number>(0);

  const toggleLike = () => {
    setLike(!like);
    setHeartImage(
      !like === true ? "images/heart-red.png" : "images/heart-black.png"
    );
    setHeartImageAlt(!like === true ? "Like" : "Don't like");
    setLikeNumber(!like === true ? likeNumber + 1 : likeNumber - 1);
  };

  return (
    <div className={styles.like}>
      <img
        src={heartImage}
        alt={heartImageAlt}
        onClick={toggleLike}
        className={styles.likeImage}
      />
      {likeNumber}
    </div>
  );
};

export default Like;
