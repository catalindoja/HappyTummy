import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Menu = ({cat}) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/products/?cat=${cat}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);

  // Función para obtener un conjunto aleatorio de índices
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

  // Limita el número de publicaciones a mostrar y cambia el orden
  const limitAndShufflePosts = (allPosts) => {
    const numberOfPostsToShow = 3;
    const randomIndices = getRandomIndices(allPosts.length, numberOfPostsToShow);
    const shuffledPosts = randomIndices.map((index) => allPosts[index]);
    return shuffledPosts;
  };

  const limitedAndShuffledPosts = limitAndShufflePosts(posts);

  return (
    <div className="menu">
      <h1>Other posts you may like</h1>
      {limitedAndShuffledPosts.map((post) => (
        <div className="post" key={post.id}>
          <img src={`../products/${post?.img}`} alt="" />
          <h2>{post.product_name}</h2>
          <Link to={`/products/${post.id}`}>
            <button>Read More</button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Menu;
