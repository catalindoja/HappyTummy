import React, { useEffect, useState } from "react";
import Edit from "../img/edit.png";
import Delete from "../img/delete.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
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

  // Obtener tabla de comentarios SOLO de este producto
  const [comments, setComments] = useState([]);
  const [userComments, setUserComments] = useState({});

  // Obtener comentarios con detalles de usuarios
  useEffect(() => {
    const fetchData = async () => {
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

        console.log(userCommentsData)

        setUserComments(userCommentsData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [postId]);

  // Obtener información del producto
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/products/${postId}`);
        setPost(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [postId]);

  // Eliminar producto
  const handleDelete = async () => {
    try {
      await axios.delete(`/products/${post.id}`);
      navigate("/")
    } catch (err) {
      console.log(err);
    }
  }

  // Obtener texto
  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }

  // Obtener usuario actual
  const { currentUser } = useContext(AuthContext);
  const idCurrent = currentUser.id;
  const usernameCurrent = currentUser.username;

  // Obtener usuario propietario del post
  const idOwner = post.iduser;
  const [userOwner, setOwner] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/users/${idOwner}`);
        setOwner(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [idOwner]);

  // Obtener brand
  const idBrand = post.idbrand;
  const [brandProduct, setBrand] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/brands/${idBrand}`);
        setBrand(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [idBrand]);

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

  // Lo que se muestra en pantalla
  return (
    <div className="single">
      <div className="content">
        <img src={`../upload/${post?.image}`} alt="" />
        <div className="user">
          {userOwner.userImg && <img
            src={userOwner.userImg}
            alt=""
          />}
          <div className="info">
            <span>{userOwner.username}</span>
            <p>Posted {moment(post.date).fromNow()}</p>
          </div>
          {currentUser.username === userOwner.username && (
            <div className="edit">
              <Link to={`/write?edit=2`} state={post}>
                <img src={Edit} alt="" />
              </Link>
              <img onClick={handleDelete} src={Delete} alt="" />
            </div>
          )}
        </div>
        <h1>{post.product_name}</h1>
        <p
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.product_description),
          }}
        ></p>

        <h3 className="more-data-heading">More data</h3>
        <div className="more-data-container">
          <div className="more-data-item">
            <span className="more-data-label">Quantity per unit:</span>
            <span className="more-data-value">{post.quantity} {post.measurement}</span>
          </div>
          <div className="more-data-item">
            <span className="more-data-label">Brand:</span>
            <span className="more-data-value">{brandProduct.name}</span>
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
        {/* category */}
        {/* allergies */}

        <h3>Comments</h3>
        <ul className="comments-list">
          {comments.map(comment => (
            <li key={comment.id} className="comment">
              <div className="comment-content">
                <span>User: {userComments[comment.id] ? userComments[comment.id].username : "Unknown"}</span>  {/* <span>User: {comment.iduser}</span> */}
                <p
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(comment.content)
                  }}
                ></p>
              </div>
              <div className="comment-likes">
                <span>Likes: {comment.likes}</span>
              </div>
            </li>
          ))}
        </ul>

        <h3>Write a new comment!</h3>
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


      {<Menu cat={post} />}
    </div>
  );

};

export default SingleProduct;
