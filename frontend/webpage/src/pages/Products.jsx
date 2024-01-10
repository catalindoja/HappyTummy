import React, { useState, useEffect, useContext } from "react";
import { useLocation, Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import ReactPaginate from "react-paginate";
import Heart from "../img/heart.png";
import axios from "axios";
import Profile from "../img/profile.png";

// Create the Products component
const Products = () => {

  // Obtaining the products
  const [posts, setPosts] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const cat = useLocation().search;

  const handleNavigation = () => {
    window.location.href = "/postproduct";
  };

  // Obtaining the users
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/users`);
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

  // Pagination
  const [pageNumber, setPageNumber] = useState(0);
  const postsPerPage = 5;
  const pageCount = Math.ceil(posts.length / postsPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  // Obtaining the text
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
    .map((post) => {
      
      // Obtain the username
      const userForPost = users.find(user => user.id === post.iduser);
      const usernameToShow = userForPost ? userForPost.username : "Unknown";

      return (
        <div className="post-general" key={post.id}>

          <div className="post" key={post.id}>

            <div className="post-img">
              <img src={post.image_url} alt="" />
            </div>

            <div className="content">

              <h1 className="card-title">{post.product_name}</h1>

              <div className="post-username-general">
                <img src={Profile} alt="" className="post-user-icon" />
                <h3 className="post-username">{usernameToShow}</h3>
              </div>

              <p className="post-description">{limitText(getText(post.product_description), 210)}</p>
              <div className="comment-likes">
                <img src={Heart} alt="Heart Icon" className="heart-icon" />
                <span className="likes-count">{post.likes}</span>
              </div>

              <Link to={`/products/${post.id}`}>
                <button>Read More</button>
              </Link>

            </div>
          </div>

        </div>
      );
    });

  const filterOptions = ["All", "Allergens", "Category", "Brand", "Supermarket"];
  const [filterOption, setFilterOption] = useState("All");

  // Display posts
  return (
    <div className="home">
      <h1 className="supertitle">Products 🛒</h1>
      <button style={{ "margin-left": "1em" }} onClick={handleNavigation}>New product</button>
      <div className="box">
        <div className="boxes">
          <fieldset>
            <legend>What are you looking for?</legend>
            <input
              type="text"
              className="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </fieldset>
        </div>

        {/* <div className="boxes">
          <fieldset>
            <legend>Filter</legend>
            <select
              value={filterOption}
              onChange={(e) => setFilterOption(e.target.value)}
            >
              {filterOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </fieldset>
        </div> */}

        <button onClick={() => setIsButtonActivated(!isButtonActivated)}>
          {isButtonActivated ? "Show all products" : "Show my products"}
        </button>
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
