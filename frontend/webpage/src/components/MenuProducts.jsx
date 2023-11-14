import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Create the Menu component
const Menu = () => {

  // Obtaining the posts
  const [posts, setPosts] = useState([]);
  const [shuffledPosts, setShuffledPosts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/products/`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  // Shuffle the posts
  useEffect(() => {
    const getRandomIndices = (max, count) => {
      const indices = [];
      const availableIndices = Array.from({ length: max }, (_, i) => i);

      while (indices.length < count && availableIndices.length > 0) {
        const randomIndex = Math.floor(Math.random() * availableIndices.length);
        indices.push(availableIndices[randomIndex]);
        availableIndices.splice(randomIndex, 1);
      }
      return indices;
    };

    const limitAndShufflePosts = (allPosts) => {
      const numberOfPostsToShow = 3;
      const randomIndices = getRandomIndices(allPosts.length, numberOfPostsToShow);
      const shuffledPosts = randomIndices.map((index) => allPosts[index]);
      setShuffledPosts(shuffledPosts);
    };

    limitAndShufflePosts(posts);
  }, [posts]);

  // Render the Menu component
  return (
    <div className="menu">
      <h1>Other posts you may like</h1>
      {shuffledPosts.map((post) => (
        <div className="post" key={post.id}>
          <img src={post.image_url} alt="" />
          <h2>{post.product_name}</h2>
          <Link to={`/products/${post.id}`}>
            <button>Read More</button>
          </Link>
        </div>
      ))}
    </div>
  );
};

// Export the Menu component
export default Menu;
