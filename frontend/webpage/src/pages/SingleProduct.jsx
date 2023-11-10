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

const SingleProduct = () => {
  const [post, setPost] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  const postId = location.pathname.split("/")[2];

  const { currentUser } = useContext(AuthContext);

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

  const handleDelete = async () => {
    try {
      await axios.delete(`/products/${postId}`);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleImageUpload = async () => {
    if (selectedImage) {
      const reader = new FileReader();
      reader.readAsDataURL(selectedImage);

      reader.onload = async () => {
        const imageData = reader.result.split(",")[1]; // Obtén los datos binarios de la imagen
        try {
          // Envía los datos binarios al servidor para almacenarlos en la base de datos
          const response = await axios.post(`/upload-image/${postId}`, {
            image: imageData,
          });

          console.log("Imagen subida exitosamente");
          // Puedes manejar la respuesta del servidor, como obtener la URL de la imagen guardada y mostrarla.
        } catch (error) {
          console.error("Error al subir la imagen:", error);
        }
      };
    }
  };

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  return (
    <div className="single">
      <div className="content">
        <img src={`../upload/${post?.image}`} alt="" />
        {currentUser.username === post.username && (
          <div>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            <button onClick={handleImageUpload}>Subir imagen</button>
          </div>
        )}
        <div className="user">
          {post.userImg && <img src={post.userImg} alt="" />}
          <div className="info">
            <span>{post.username}</span>
            <p>Posted {moment(post.date).fromNow()}</p>
          </div>
          {currentUser.username === post.username && (
            <div className="edit">
              <Link to={`/write?edit=${postId}`} state={post}>
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
      </div>
      {<Menu cat={post.cat} />}
    </div>
  );
};

export default SingleProduct;
