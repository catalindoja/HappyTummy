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

const SingleMarket = () => {
  const [post, setPost] = useState({});

  const location = useLocation();
  const navigate = useNavigate();

  const likes = 0;
  const postId = location.pathname.split("/")[2];


  // Obtener información del market
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/markets/${postId}`);
        setPost(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [postId]);

  // Eliminar market
  const handleDelete = async () => {
    try {
      await axios.delete(`/markets/${post.id}`);
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

  // Lo que se muestra en pantalla
  return (
    <div className="single">
      <div className="content">
        <h1>{post.name}</h1>
        <p><small>{post.address}, {post.city}, ({post.zipcode})</small></p>
        <p>{post.description}</p>
      </div>


      {<Menu cat={post} />}
    </div>
  );

};

export default SingleMarket;
