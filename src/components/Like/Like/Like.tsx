import React, { useState, FunctionComponent } from "react";

const Like: FunctionComponent = () => {
  const [like, setLike] = useState<boolean>(false);
  const [heartImage, setHeartImage] = useState<string>("heart-black.png");
  const [heartImageAlt, setHeartImageAlt] = useState<string>("Don't like");
  const [likeNumber, setLikeNumber] = useState<number>(0);

  const toggleLike = () => {
    setLike(!like);
    setHeartImage(!like == true ? "heart-red.png" : "heart-black.png");
    setHeartImageAlt(!like == true ? "Like" : "Don't like");
    setLikeNumber(!like == true ? likeNumber + 1 : likeNumber - 1);
  };

  return (
    <div>
      <img src={heartImage} alt={heartImageAlt} onClick={toggleLike} />
      {likeNumber}
    </div>
  );
};

export default Like;
