import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/layout/Layout";

const dataTest = {
  id: 1,
  titulo: "Titulo 1",
  descripcion: "Descripcion",
  imagen:
    "https://cloudfront-us-east-1.images.arcpublishing.com/copesa/EKX6EPEW35BDPGRE7GKHMRY6K4.png",
  comentarios: [{ contenido: "Comentario 1" }, { contenido: "Comentario 2" }],
};

const Post = () => {
  const token = localStorage.getItem("login");
  const [post, setPost] = useState({});
  const [comment, setComment] = useState("");

  const { id } = useParams();
  const fetchPost = async () => {
    try {
      const response = await fetch(`http://localhost:5000/publicaciones/${id}`);
      if (response.ok) {
        const data = await response.json();
        setPost(data);
      } else {
        console.error("Error al obtener datos desde la base de datos");
      }
    } catch (error) {
      setPost(dataTest);
      console.error("Error en la solicitud:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/publicaciones", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comentario: comment }),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Respuesta del servidor:", responseData);
        setComment("");
      } else {
        console.error("Error al enviar el comentario al servidor");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  useEffect(() => {
    if (token === "TRUE") {
      fetchPost();
    } else {
      localStorage.clear();
      window.location.href = "/login";
    }
  }, []);

  return (
    <Layout>
      <div className="m-5">
        {post.imagen ? (
          <>
            <img src={post.imagen} className="card-img-top" alt={post.titulo} />
            <div className="card-body">
              <h5 className="card-title">{post.titulo}</h5>
              <p className="card-text">{post.descripcion}</p>
              <ul className="list-group">
                {post.comentarios.map((comentario, index) => (
                  <li key={index} className="list-group-item">
                    {comentario.contenido}
                  </li>
                ))}
              </ul>
            </div>
            <div className="container mt-4">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="commentInput"
                    placeholder="Agregar Comentario:"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Enviar Comentario
                </button>
              </form>
            </div>
          </>
        ) : (
          <p>Loading . . . </p>
        )}
      </div>
    </Layout>
  );
};
export default Post;
