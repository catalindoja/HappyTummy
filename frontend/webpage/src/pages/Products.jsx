import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import "./Products.css";

const Products = () => {
  const [inputs, setInputs] = useState({
    idsupermarket: ""
  });

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
*/


/////////////////////////////////////////////////
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import "./Products.css";

const Products = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const cat = useLocation().search;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/categories`);
        setCategories(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/brands`);
        setBrands(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

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

  const handleChange = (e) => {
    console.log(e.target.value);
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  // Filtrar los productos que coinciden con el término de búsqueda
  const filteredPosts = posts.filter((post) =>
    post.product_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filtrar los productos por idbrand
  const filteredByBrandPosts = posts.filter((post) =>
    idbrand ? post.brand_id === idbrand : true
  );

  const handleChange = (e) => {
    console.log(e.target.value);
    const selectedBrandId = e.target.value;
    setIdBrand(selectedBrandId);
  };

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
                <img src={`../upload/${post.product_image}`} alt="" /> {/* Ajusta la ruta según sea necesario */}
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
    </div>
  );
};

export default Products;
