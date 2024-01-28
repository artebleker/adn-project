import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/layout/Layout.jsx";
import EditPost from "../components/EditPost.jsx";
const Post = () => {
  const [post, setPost] = useState({});
  const [postComments, setPostComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [isAuthor, setIsAuthor] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const { id } = useParams();

  const fetchComments = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/comentarios/publicacion/${id}`
      );
      if (response.ok) {
        const data = await response.json();
        setPostComments(data.reverse());
      } else {
        console.error("Error al obtener datos desde la base de datos");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  const fetchPost = async () => {
    const author = localStorage.getItem("author");
    try {
      const response = await fetch(`http://localhost:5000/publicaciones/${id}`);
      if (response.ok) {
        const data = await response.json();

        setPost(data);
        setIsAuthor(data.author === author);
        fetchComments();
        setLoading(false);
      } else {
        console.error("Error al obtener datos desde la base de datos");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  const handleSubmit = async (e) => {
    const author = localStorage.getItem("author");
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/comentarios/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: newComment, author: author, post: id }),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Respuesta del servidor:", responseData);
        setNewComment("");

        fetchComments();
      } else {
        console.error("Error al enviar el comentario al servidor");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  const handleEditClick = () => {
    setShowEditModal((prev) => !prev);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      return (window.location.href = "/login");
    }
    fetchPost();
  }, []);

  return (
    <Layout>
      <div className="container mt-5">
        {loading ? (
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : post.image ? (
          <div className="card shadow-sm rounded">
            <img
              src={post.image}
              className="card-img-top img-fluid rounded-top mx-auto"
              alt={post.title}
              style={{ maxWidth: "75%" }}
            />
            <div className="card-body p-3">
              <h5 className="card-title">{post.title}</h5>
              <p className="card-text">{post.description}</p>
              <ul className="list-group">
                {isAuthor && (
                  <button onClick={handleEditClick} className="btn btn-warning">
                    Editar este Post
                  </button>
                )}
                {showEditModal && (
                  <EditPost
                    post={post && post}
                    handleClose={() => setShowEditModal((prev) => !prev)}
                  />
                )}
                {postComments.map((comentario, index) => (
                  <li key={index} className="list-group-item shadow-sm rounded">
                    <h6 className="text-muted" style={{ fontSize: "0.8rem" }}>
                      {comentario.author} -{" "}
                      {new Date(comentario.createdAt).toLocaleDateString()}
                    </h6>
                    <strong style={{ fontSize: "1rem" }}>
                      {comentario.text}
                    </strong>
                  </li>
                ))}
              </ul>
            </div>
            <div className="card-footer bg-transparent">
              <form onSubmit={handleSubmit} className="mb-3">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control rounded"
                    id="commentInput"
                    placeholder="Agregar Comentario:"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    required
                  />
                  <button type="submit" className="btn btn-primary rounded">
                    Enviar Comentario
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          <p>No se encontró el post.</p>
        )}
      </div>
    </Layout>
  );
};

export default Post;
