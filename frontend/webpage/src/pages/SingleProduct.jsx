import React, { useEffect, useState } from "react";
import Edit from "../img/edit.png";
import Delete from "../img/delete.png";
import ProfilePicture from "../img/profile.png";
import Heart from "../img/heart.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Menu from "../components/MenuProducts";
import axios from "axios";
import moment from "moment";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import DOMPurify from "dompurify";
import ReactQuill from "react-quill";

const SingleProduct = () => {
  const [post, setPost] = useState({});

  const location = useLocation();
  const navigate = useNavigate();

  const likes = 0;
  const postId = location.pathname.split("/")[2];

  // Obtener texto
  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }

  // Obtener usuario actual
  const { currentUser } = useContext(AuthContext);
  const idCurrent = currentUser.id;
  const usernameCurrent = currentUser.username;

  // Comentarios
  const [comments, setComments] = useState([]);
  const [userComments, setUserComments] = useState({});
  // Supermercados
  const [stock, setStock] = useState([]);
  const [markets, setMarkets] = useState([]);
  // Alergias
  const [productallergies, setProductallergies] = useState([]);
  const [allergies, setAllergies] = useState([]);
  // Usuario propietario del post
  const idOwner = post.iduser;
  const [userOwner, setOwner] = useState("");
  // Brand
  const idBrand = post.idbrand;
  const [brandProduct, setBrand] = useState("");
  // Category
  const idCategory = post.idcategory;
  const [categoryProduct, setCategory] = useState("");

  // Todo lo que requiere llamadas a la bdd
  useEffect(() => {
    const fetchData = async () => {

      // Obtener comentarios con detalles de usuarios!!
      try {
        const res = await axios.get(`/comments/`);
        const filteredComments = res.data.filter((comment) => comment.idproduct == postId);
        setComments(filteredComments);

        // Obtener los detalles de los usuarios para cada comentario
        const userPromises = filteredComments.map((comment) => axios.get(`/users/${comment.iduser}`));
        const userResponses = await Promise.all(userPromises);

        // Crear un objeto con detalles de usuario para cada comentario
        const userCommentsData = {};
        userResponses.forEach((response, index) => {
          const comment = filteredComments[index];
          userCommentsData[comment.id] = response.data;
        });

        setUserComments(userCommentsData);
        // } catch (err) {
        //   console.log(err);
        // }

        // Obtener supermercados!!
        try {
          // Get stock
          const res1 = await axios.get(`/stock/`);
          const filteredStock = res1.data.filter((stock) => stock.idproduct == postId);
          setStock(filteredStock);

          // Get supermarkets
          // DANGER! SOLO COJO UNO POR AHORA (PERO SI HAY MÁS, ES FÁCIL CAMBIARLO)
          const myid = stock[0].idsupermarket
          const res2 = await axios.get(`/markets/`);
          const filteredMarkets = res2.data.filter((markets) => markets.id == myid);
          setMarkets(filteredMarkets[0]);
        } catch (err) {
          console.log(err);
        }

        // Obtener alergias!!
        // try {
        // Get productallergies
        const res3 = await axios.get(`/productallergies/`);
        const filteredProductallergies = res3.data.filter((productallergies) => productallergies.idproduct == postId);

        // Obtener todas las IDs de alergias relacionadas
        const allergyIds = filteredProductallergies.map((productallergy) => productallergy.idallergies);

        // Obtener todas las alergias basadas en las IDs
        const res4 = await axios.get(`/allergies/`);
        const filteredAllergies = res4.data.filter((allergy) => allergyIds.includes(allergy.id));

        // Ahora filteredAllergies contiene todas las alergias relacionadas al producto
        console.log(filteredAllergies);
        setAllergies(filteredAllergies);
        // } catch (err) {
        //   console.log(err);
        // }

        // Obtener información del producto!!
        // try {
        const res5 = await axios.get(`/products/${postId}`);
        setPost(res5.data);
        // } catch (err) {
        //   console.log(err);
        // }

        // Obtener usuario propietario del post!!
        // try {
        const response = await axios.get(`/users/${idOwner}`);
        setOwner(response.data);
        // } catch (err) {
        //   console.log(err);
        // }

        // Obtener brand!!
        // try {
        const res6 = await axios.get(`/brands/${idBrand}`);
        setBrand(res6.data);
        // } catch (err) {
        //   console.log(err);
        // }

        // Obtener category!!
        // try {
        const res7 = await axios.get(`/categories/${idCategory}`);
        setCategory(res7.data);


      } catch (err) {
        console.log(err);
      }

    };

    fetchData();
  }, [postId, idOwner, idBrand, idCategory]);

  // Eliminar producto
  const handleDelete = async () => {
    try {
      const productResponse = await axios.delete(`/products/${post.id}`);
      navigate("/")
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

  // Escribir nuevo comentario
  const state = useLocation().state;
  const [value, setValue] = useState(state?.newComment || "");
  // Cuando se hace click al botón de publish
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const productResponse = await axios.post(`/comments/`, {
        iduser: idCurrent,
        idproduct: postId,
        content: value,
        likes,
        date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      });

      window.location.reload();

    } catch (err) {
      console.log(err);
    }
  }

  // Botón de like
  const handleLikeClick = async (commentId) => {
    console.log("Like button clicked");
    try {
      // // Realiza una solicitud para aumentar el contador de "likes" en la base de datos
      // const response = await axios.patch(`/comments/${commentId}`, { likes: comments.find((comment) => comment.id === commentId).likes + 1 });

      // // Comprueba si la solicitud fue exitosa
      // if (response.status === 200) {
      //   // Actualiza el contador de "likes" en la interfaz de usuario
      //   setComments((prevComments) =>
      //     prevComments.map((comment) =>
      //       comment.id === commentId
      //         ? { ...comment, likes: comment.likes + 1 }
      //         : comment
      //     )
      //   );
      // }
    } catch (err) {
      console.error(err);
    }
  };

  // Lo que se muestra en pantalla
  return (
    <div className="single">
      <div className="content">
        <img src={`../upload/${post?.image}`} alt="" />
        <div className="user">
          <img src={ProfilePicture} />
          {/* {userOwner.userImg && <img
            src={userOwner.userImg}
            alt=""
          />} */}
          <div className="info">
            <span className="username">{userOwner.username}</span>
            {/* <p>Posted {moment(post.date).fromNow()}</p> */}
          </div>
          {currentUser.username === userOwner.username ? (
            <><div className="edit">
              <Link to={`/editpost`} state={post}>
                <img className="editimg" src={Edit} alt="" />
              </Link>
              <img className="delete" onClick={handleDelete} src={Delete} alt="" />
            </div> </>
          ) : (
            // Botón "like" para usuarios que no son propietarios del post
            <div className="like">
              <button onClick={handleLikeClick}>
                <img src={Heart} alt="Heart Icon" className="heart-icon" />
                <span className="likes-count">{post.likes}</span>
              </button>
            </div>
          )}
        </div>
        <h1>{post.product_name}</h1>
        <p className="description"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.product_description),
          }}
        ></p>

        <div className="contains">
          <h3 className="contains-heading">Contains</h3>
          {allergies.length === 0 ? (
            <p>This product is safe for all allergies and intolerances ❤</p>
          ) : (
            allergies.map((allergy, index) => (
              <span className="fancy-allergy" key={index}>{allergy.allergy_name}</span>
            )))}
        </div>

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
            <span className="more-data-label">Price:</span>
            <span className="more-data-value">{post.price} €</span>
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
                  <button onClick={handleLikeClick}>
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

        <div className="buttons">
          {/*<button>Save as a draft</button>*/}
          <button onClick={handleClick}> Publish</button>
        </div>

      </div>

      {<Menu/>}
    </div>
  );

};

export default SingleProduct;
