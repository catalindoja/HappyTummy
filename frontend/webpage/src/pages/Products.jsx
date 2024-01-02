import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import ReactPaginate from "react-paginate";
import Heart from "../img/heart.png";
import axios from "axios";

// Create the Products component
const Products = () => {
  const [posts, setPosts] = useState([]);
  const [markets, setMarkets] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/markets`);
        setMarkets(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }

  // TODO: Paginación

  return (
    <div className="home">
      <div className="posts">
        {posts.map((post) => (
          <div className="post" key={post.id}>
            <div className="img">
              <img src={`../upload/${post.image}`} alt="" />
            </div>
            <div className="content">
              <Link className="link" to={`/products/${post.id}`}>
                <h1>{post.product_name}</h1>
              </Link>
              <p>{getText(post.product_description)}</p>
              <Link to={`/products/${post.id}`}>
                <button>Read More</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;

/////////////////////////////////////////////////
/*

import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import "./Products.css";

const Products = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const cat = useLocation().search;

  // Obtaining the users
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/users`);
        console.log(res.data)
        setUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  // Limit the text
  const limitText = (text, limit) => {
    if (text.length <= limit) {
      return text;
    } else {
      return text.slice(0, limit) + "...";
    }
  };
 
  // Obtaining the products
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/products`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    console.log(e.target.value);
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  // Filter
  const [isButtonActivated, setIsButtonActivated] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  let filteredPosts = posts.filter((post) =>
    post.product_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isButtonActivated) {
    filteredPosts = filteredPosts.filter((post) =>
      currentUser && post.iduser === currentUser.id
    );
  }

  // Display filtered posts
  const displayFilteredPosts = filteredPosts
    .slice(pageNumber * postsPerPage, (pageNumber + 1) * postsPerPage)
    .map((post) => (
      <div className="post" key={post.id}>
        <div className="img">
          <img src={post.image_url} alt="" />
        </div>
        <div className="content">
          <Link className="link" to={`/products/${post.id}`}>
            <h1>{post.product_name}</h1>
          </Link>
          <p>{limitText(getText(post.product_description), 210)}</p>
          <div className="comment-likes">
            <img src={Heart} alt="Heart Icon" className="heart-icon" />
            <span className="likes-count">{post.likes}</span>
          </div>
          <Link to={`/products/${post.id}`}>
            <button>Read More</button>
          </Link>
        </div>
      </div>
    ));

  const filterOptions = ["All", "Allergens", "Category", "Brand", "Supermarket"];
  const [filterOption, setFilterOption] = useState("All");

  // Display posts
  return (
    <div className="home">
      <div className="posts">
        <input
          type="text"
          placeholder="Search for the product"
          className="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {filteredPosts.length === 0 ? (
          <p>Sorry, There is not any product!</p>
        ) : (
          filteredPosts.map((post) => (
            <div className="post" key={post.id}>
              <div className="img">
                <img src={`../upload/${post.product_image}`} alt="" /> 
              </div>
              <div className="content">
                <Link className="link" to={`/products/${post.id}`}>
                  <h1>{post.product_name}</h1>
                </Link>
                <p>{getText(post.product_description)}</p>
                <Link to={`/products/${post.id}`}>
                  <button>Read More</button>
                </Link>
              </div>
            </div>
          ))
        )}
      </div>

      {filteredPosts.length === 0 ? (
        <h3>Sorry, there are no products matching your search 😕</h3>
      ) : (
        <div className="posts">{displayFilteredPosts}</div>
      )}

      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"pagination"}
        previousLinkClassName={"previous"}
        nextLinkClassName={"next"}
        disabledClassName={"disabled"}
        activeClassName={"active"}
      />
    </div>
  );
};

// Export the Products component
export default Products;
*/