import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import ReactPaginate from "react-paginate";
import Heart from "../img/heart.png";
import { AuthContext } from "../context/authContext";

const Recepies = () => {
  const [posts, setPosts] = useState([]);
  const [pageNumber, setPageNumber] = useState(0); // Estado para el número de página actual
  const { currentUser } = useContext(AuthContext); // Usuario actual
  const postsPerPage = 5; // Cantidad de posts por página

  const limitText = (text, limit) => {
    if (text.length <= limit) {
      return text;
    } else {
      return text.slice(0, limit) + "...";
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Recepie
        const res = await axios.get(`/recipes`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const pageCount = Math.ceil(posts.length / postsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  const [isButtonActivated, setIsButtonActivated] = useState(false);
  // Filtrar los productos que coinciden con el término de búsqueda
  const [searchTerm, setSearchTerm] = useState("");
  let filteredPosts = posts.filter((post) =>
    post.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isButtonActivated) {
    // Si el botón está activado, agregar filtro adicional
    filteredPosts = filteredPosts.filter((post) =>
      currentUser && post.iduser === currentUser.id
    );
  }

  const displayFilteredPosts = filteredPosts
    .slice(pageNumber * postsPerPage, (pageNumber + 1) * postsPerPage)
    .map((post) => (
      <div className="post" key={post.id}>
        <div className="img">
          <img src={`../upload/${post.image}`} alt="" />
        </div>
        <div className="content">
          <Link className="link" to={`/recipes/${post.id}`}>
            <h1>{post.description}</h1>
          </Link>
          <p>{limitText(getText(post.description), 210)}</p>
          <div className="comment-likes">
            <img src={Heart} alt="Heart Icon" className="heart-icon" />
            <span className="likes-count">{post.likes}</span>
          </div>
          <Link to={`/recipes/${post.id}`}>
            <button>Read More</button>
          </Link>
        </div>
      </div>
    ));

  const filterOptions = ["All", "Allergens", "Category", "Brand", "Supermarket"];
  const [filterOption, setFilterOption] = useState("All"); // Estado para la opción de filtro


  return (
    <div className="home">
      <h1>Recipes 🥧</h1>

      {/* Search by product name */}
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

        {/* Filter */}
        <div className="boxes">
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
        </div>

        {/* My products button */}
        <button onClick={() => setIsButtonActivated(!isButtonActivated)}>
          {isButtonActivated ? "Show all recipes" : "Show my recipes"}
        </button>
      </div>

      {/* Unfiltered posts */}
      {/* <div className="posts">{displayPosts}</div> */}

      {/* Filtered posts */}
      {filteredPosts.length === 0 ? (
        <h3>Sorry, there are no recipes matching your search 😕</h3>
      ) : (
        <div className="posts">{displayFilteredPosts}</div>
      )}

      {/* Pagination */}
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



export default Recepies;