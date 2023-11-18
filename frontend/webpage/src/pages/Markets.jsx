import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

// Create the Markets component
const Markets = () => {

  // Set up the state variable 'posts'
  // - posts: an array that represenSts the list of posts fetched from the backend
  //          (default value is an empty array)
  // - currentUser: an object that represents the current user
  const [posts, setPosts] = useState([]);
  const { currentUser } = useContext(AuthContext);

  // Set up the function that fetches the list of posts from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/markets`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  // Set up the function that parses the HTML content
  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }

  // Set up the function that limits the text length
  const limitText = (text, limit) => {
    if (text.length <= limit) {
      return text;
    } else {
      return text.slice(0, limit) + "...";
    }
  };

  // Return the JSX elements
  return (
    <div className="home">
      <h1 className="supertitle">Markets info 🏪</h1>
      {currentUser.role === 1 && (
        <Link to="/postmarket">
          <button className="rolebutton">Create New Market</button>
        </Link>
      )}
      <p className="description">These are our main affiliated markets. They are all committed to preserving Happy Tummy's purpose and providing verified information, ensuring that consumers can make informed choices about the products they purchase. Our partners share our dedication to promoting transparency and supporting individuals with dietary preferences, restrictions, and allergies. Together, we strive to create a more inclusive and healthy food community.</p>
      <div className="posts">
        {posts.map((post) => (
          <div className="post" key={post.id}>
            <div className="img">
              <img src={post.image_url} alt="" />
            </div>
            <div className="content">
              <Link className="link" to={`/markets/${post.id}`}>
                <h1>{post.name}</h1>
              </Link>
              <p>{limitText(getText(post.description), 210)}</p>
              <Link to={`/markets/${post.id}`}>
                <button>Read More</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Export the Markets component so that it can be used in other files.
export default Markets;
