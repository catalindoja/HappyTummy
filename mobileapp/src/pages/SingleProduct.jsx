import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import Edit from "../img/edit.png";
import Delete from "../img/delete.png";
import ProfilePicture from "../img/profile.png";
import Arrow from "../img/arrow.png";
import Heart from "../img/heart.png";
import axios from "axios";
import moment from "moment";
import DOMPurify from "dompurify";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "./SingleProduct.css";
import { BACKEND_API_URL } from '../config/proxy.js';

// Create the SingleProduct component
const SingleProduct = () => {
  // Set up state variables
  // - location: an object that contains the details of the current URL
  // - navigate: a function that redirects the user to another page
  // - postId: a string that represents the ID of the post
  const location = useLocation();
  const navigate = useNavigate();
  const postId = location.pathname.split("/")[3];

    
  // - post: an object that contains the details of the post
  const [post, setPost] = useState({});

  // - currentUser: an object that contains the details of the current user
  // - idCurrent: a string that represents the ID of the current user
  // - usernameCurrent: a string that represents the username of the current user
//   const { currentUser } = useContext(AuthContext);
//   const idCurrent = currentUser.id;
//   const usernameCurrent = currentUser.username;

  // - likes: a number that represents the number of likes of the post
  const likes = 0;

  // - comments: an array that contains the details of the comments of the post
  // - userComments: an object that contains the details of the users who wrote the comments
  const [comments, setComments] = useState([]);
  const [userComments, setUserComments] = useState({});

  // - stock: an array that contains the details of the stock of the post
  // - markets: an object that contains the details of the markets of the post
  const [stock, setStock] = useState([]);
  const [markets, setMarkets] = useState([]);

  // - productallergies: an array that contains the details of the productallergies of the post
  // - allergies: an array that contains the details of the allergies of the post
  const [productallergies, setProductallergies] = useState([]);
  const [allergies, setAllergies] = useState([]);

  // - idOwner: a string that represents the ID of the owner of the post
  // - userOwner: an object that contains the details of the owner of the post
  const idOwner = post.iduser;
  const [userOwner, setOwner] = useState("");

  // - idBrand: a string that represents the ID of the brand of the post
  // - brandProduct: an object that contains the details of the brand of the post
  const idBrand = post.idbrand;
  const [brandProduct, setBrand] = useState("");

  // - idCategory: a string that represents the ID of the category of the post
  // - categoryProduct: an object that contains the details of the category of the post
  const idCategory = post.idcategory;
  const [categoryProduct, setCategory] = useState("");

  // fetchData: a function that fetches 
  // - data of the post
  // - owner of the post
  // - brand of the post
  // - category of the post
  // - comments of the post
  // - users who wrote the comments
  // - stock of the post
  // - supermarkets of the post
  // - productallergies of the post
  // - allergies of the post
  useEffect(() => {
    const fetchData = async () => {

      try {
        // Obtain comments
        const res = await axios.get(`${BACKEND_API_URL}/comments/`);
        console.log(res)
        const filteredComments = res.data.filter((comment) => comment.idproduct == postId);
        setComments(filteredComments);

        // Obtain users who wrote the comments
        const userPromises = filteredComments.map((comment) => axios.get(`${BACKEND_API_URL}/users/${comment.iduser}`));
        const userResponses = await Promise.all(userPromises);

        // Create an object that contains the details of the users who wrote the comments
        const userCommentsData = {};
        userResponses.forEach((response, index) => {
          const comment = filteredComments[index];
          userCommentsData[comment.id] = response.data;
        });

        // Set the state variable 'userComments' to the object that contains the details of the users who wrote the comments
        setUserComments(userCommentsData);

        // Obtain stock and supermarkets
        try {
          // Get stock
          const res1 = await axios.get(`${BACKEND_API_URL}/stock/`);
          console.log(res1)
          const filteredStock = res1.data.filter((stock) => stock.idproduct == postId);
          setStock(filteredStock);

          // Get supermarkets
          const myid = stock[0].idsupermarket
          const res2 = await axios.get(`${BACKEND_API_URL}/markets/`);
          console.log(res2)
          const filteredMarkets = res2.data.filter((markets) => markets.id == myid);
          setMarkets(filteredMarkets[0]);
        } catch (err) {
          console.log(err);
        }

        // Obtain productallergies and allergies
        const res3 = await axios.get(`${BACKEND_API_URL}/productallergies/`);
        console.log(res3)
        const filteredProductallergies = res3.data.filter((productallergies) => productallergies.idproduct == postId);

        // Obtain the IDs of the allergies
        const allergyIds = filteredProductallergies.map((productallergy) => productallergy.idallergies);
        const res4 = await axios.get(`${BACKEND_API_URL}/allergies/`);
        console.log(res4)
        const filteredAllergies = res4.data.filter((allergy) => allergyIds.includes(allergy.id));
        setAllergies(filteredAllergies);

        const res5 = await axios.get(`${BACKEND_API_URL}/products/${postId}`);
        setPost(res5.data);

        // Obtain owner of the post
        const response = await axios.get(`${BACKEND_API_URL}/users/${idOwner}`);
        setOwner(response.data);

        // Obtain brand of the post
        const res6 = await axios.get(`${BACKEND_API_URL}/brands/${idBrand}`);
        setBrand(res6.data);

        // Obtain category of the post
        const res7 = await axios.get(`${BACKEND_API_URL}/categories/${idCategory}`);
        setCategory(res7.data);

      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [postId, idOwner, idBrand, idCategory]);

  // Obtener texto
  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }

  // Delete post
  const handleDelete = async () => {
    try {
      const productResponse = await axios.delete(`${BACKEND_API_URL}/products/${post.id}`);
      navigate("/app/home")
    } catch (err) {
      if (err.response) {
        console.log("Respuesta del servidor con estado de error:", err.response.status);
      } else if (err.request) {
        console.log("La solicitud se realizó, pero no se recibió respuesta del servidor.");
      } else {
        console.log("Error al configurar la solicitud:", err.message);
      }
    }
  }

  // Write new comment
  const state = useLocation().state;
  const [value, setValue] = useState(state?.newComment || "");
  
  // Post comment
//   const handleClick = async (e) => {
//     e.preventDefault();
//     try {
//       const productResponse = await axios.post(`/comments/`, {
//         iduser: idCurrent,
//         idproduct: postId,
//         content: value,
//         likes,
//         date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
//       });

//       window.location.reload();

//     } catch (err) {
//       console.log(err);
//     }
//   }

  // Like button
  const handleLikeClick = async (commentId) => {
    console.log("Like button clicked");
    try {
    } catch (err) {
      console.error(err);
    }
  };

  // Return the JSX that renders the SingleProduct page
  return (
    <div className="single">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous"></link>
      <div className="content">
        <Link to="#" onClick={() => window.history.back()}>
          <img className="arrow-img" src={Arrow} alt="" />
        </Link>
        <img className="super-image" src={post.image_url} alt="" />
        <div className="user">
          <img src={ProfilePicture} />
          <div className="info">
            <span className="username">{userOwner.username}</span>
          </div>
          {/* {currentUser.username === userOwner.username ? (
            <><div className="edit">
              <Link to={`/editpost`} state={post}>
                <img className="editimg" src={Edit} alt="" />
              </Link>
              <img className="delete" onClick={handleDelete} src={Delete} alt="" />
            </div> </>
          ) : (
            <div className="like">
              <button onClick={handleLikeClick}>
                <img src={Heart} alt="Heart Icon" className="heart-icon" />
                <span className="likes-count">{post.likes}</span>
              </button>
            </div>
          )} */}
        </div>

        <h1 className="product-name my-3">{post.product_name}</h1>

        <div className="contains">
          <h3 className="contains-heading">Contains</h3>
          {allergies.length === 0 ? (
            <p>This product is safe for all allergies and intolerances ❤</p>
          ) : (
            allergies.map((allergy, index) => (
              <span className="fancy-allergy" key={index}>{allergy.allergy_name}</span>
            )))}
        </div>

        <h3 className="description-heading">Description</h3>
        <p className="description"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.product_description),
          }}
        ></p>

        <h3 className="more-data-heading">More details</h3>
        <div className="more-data-container">
          <div className="more-data-item">
            <span className="more-data-label">Supermarket:</span>
            <span className="more-data-value">{markets.name}</span>
          </div>
          <div className="more-data-item">
            <span className="more-data-label">Brand:</span>
            <span className="more-data-value">{brandProduct.name}</span>
          </div>
          <div className="more-data-item">
            <span className="more-data-label">Category:</span>
            <span className="more-data-value">{categoryProduct.category_name}</span>
          </div>
          <div className="more-data-item">
            <span className="more-data-label">Quantity per unit:</span>
            <span className="more-data-value">{post.quantity} {post.measurement}</span>
          </div>
          <div className="more-data-item">
            <span className="more-data-label">Barcode:</span>
            <span className="more-data-value">{post.barcode}</span>
          </div>
        </div>
        <h3 className="comments-heading">Comments</h3>
        <ul className="comments-list">
          {comments.length === 0 ? (
            <p>No comments yet!</p>
          ) : (
            comments.map(comment => (
              <li key={comment.id} className="comment">
                <div className="comment-content">
                  <div className="user-info">
                    <img src={ProfilePicture} alt="Profile Picture" className="user-image" />
                    <span className="username">
                      {userComments[comment.id] ? userComments[comment.id].username : "Unknown"}
                    </span>
                  </div>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(comment.content)
                    }}
                  ></p>
                </div>
                <div className="comment-likes">
                  <button className="comment-likes-button" onClick={handleLikeClick}>
                    <img src={Heart} alt="Heart Icon" className="heart-icon" />
                  </button>
                  <span className="likes-count">{comment.likes}</span>
                </div>
              </li>
            )
            ))}
        </ul>

        <h3 className="write-comment-heading">Write a new comment!</h3>
        <div className="editorContainer">
          <ReactQuill
            placeholder="New comment"
            className="editor"
            theme="snow"
            value={value}
            onChange={setValue}
          />
        </div>

        {/* <div className="buttons">
          <button onClick={handleClick}> Publish</button>
        </div> */}
      </div>

      {/* MENU HERE */}
    </div>
  );
};

// Export the component to be used on other pages
export default SingleProduct;