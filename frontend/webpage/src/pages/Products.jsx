import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import ReactPaginate from "react-paginate";

const Products = () => {
  const [posts, setPosts] = useState([]);
  const [pageNumber, setPageNumber] = useState(0); // Estado para el número de página actual

  const cat = useLocation().search;

  const postsPerPage = 5; // Cantidad de posts por página

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/products${cat}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);

  const pageCount = Math.ceil(posts.length / postsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  const displayPosts = posts
    .slice(pageNumber * postsPerPage, (pageNumber + 1) * postsPerPage)
    .map((post) => (
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
    ));

  return (
    <div className="home">
      <div className="posts">{displayPosts}</div>
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

export default Products;
