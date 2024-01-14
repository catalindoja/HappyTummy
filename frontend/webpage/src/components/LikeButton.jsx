import React, { useState } from 'react';
import axios from 'axios';
import Heart from "../img/heart.png"; // Replace with the correct path to your heart icon
import '../pages/SingleProduct.css';

const CommentLikeButton = ({ commentId, initialLikes }) => {
  const [likes, setLikes] = useState(initialLikes);

  const handleCommentLikeClick = async () => {
    try {
      const commentResponse = await axios.patch(`/comments/${commentId}`, {
        likes: likes + 1,
      });

      setLikes(likes + 1);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <button className="comment-likes-component" onClick={handleCommentLikeClick}>
      <img src={Heart} alt="Heart Icon" className="heart-icon" />
      <div className="likes-count-component">{likes}</div>
    </button>
  );
};

export default CommentLikeButton;
