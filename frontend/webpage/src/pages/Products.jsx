/*import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const Products = () => {
  const [posts, setPosts] = useState([]);

  const cat = useLocation().search

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/products${cat}`);
        console.log(res.data)
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);

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
  const [inputs, setInputs] = useState({
    idsupermarket: ""
  });

  // Para los supermercados!!
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

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [idbrand, setidbrand] = useState(null);
  const [idcategory, setidcategory] = useState(null);
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

  return (
    <div className="home">
      <div className="posts">
        <div className="box">
          <div className="boxes">
            <fieldset>
              <legend>Search by Product</legend>
              <input
                type="text"
                className="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </fieldset>
          </div>

          <div className="boxes">
            <fieldset>
              <legend>Search by Brand</legend>
              {brands.map((brand) => (
                <div key={brand.id}>
                  <input
                    type="radio"
                    id={brand.name}
                    name="idbrand"
                    value={brand.id}
                    onChange={() => setidbrand(brand.id)}
                  />
                  <label htmlFor={brand.name}>{brand.name}</label>
                </div>
              ))}
            </fieldset>
          </div>

          <div className="boxes">
            <fieldset>
              <legend>Search by Category</legend>
              {categories.map((category) => (
                <div key={category.id}>
                  <input
                    type="radio"
                    id={category.category_name}
                    name="idcategory"
                    value={category.id}
                    onChange={() => setidcategory(category.id)}
                  />
                  <label htmlFor={category.category_name}>
                    {category.category_name}
                  </label>
                </div>
              ))}
            </fieldset>
          </div>

          <div className="boxes">
            <fieldset>
              <legend>Supermarket</legend>
              {markets.map((market) => (
                <div key={market.id}>
                  <input
                    type="radio"
                    id={market.name}
                    name="idsupermarket"
                    value={market.id}
                    onChange={handleChange}
                  />
                  <label for={market.name}>{market.name}</label>
                </div>
              ))}
            </fieldset>
          </div>
        </div>
        {filteredPosts.length === 0 ? (
          <p>Sorry, There is not any product!</p>
        ) : (
          filteredPosts.map((post) => (
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
          ))
        )}
      </div>
    </div>
  );
};

export default Products;

