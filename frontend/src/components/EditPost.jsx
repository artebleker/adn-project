import React, { useState } from "react";
// import PropTypes from "prop-types";

const EditPost = ({ post, handleClose }) => {
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newImage, setNewImage] = useState("");

  const handleModifyPost = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return (window.location.href = "/login");
      }

      const response = await fetch(
        `http://localhost:5000/publicaciones/${post._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: newTitle || post.title,
            description: newDescription || post.description,
            image: newImage || post.image,
            author: post.author,
          }),
        }
      );

      if (response.ok) {
        console.log("Post modificado exitosamente");
        handleClose();
        window.location.reload();
      } else {
        console.error("Error al modificar el post");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  const handleDeletePost = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return (window.location.href = "/login");
      }

      const response = await fetch(
        `http://localhost:5000/publicaciones/${post._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        console.log("Post eliminado exitosamente");
        window.location.href = "/";
      } else {
        const responseData = await response.json();
        console.error("Error al eliminar el post:", responseData);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  return (
    <div>
      <form>
        <div className="mb-3">
          <label htmlFor="newTitle" className="form-label">
            Nuevo Título:
          </label>
          <input
            type="text"
            id="newTitle"
            className="form-control"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="newDescription" className="form-label">
            Nueva Descripción:
          </label>
          <input
            type="text"
            id="newDescription"
            className="form-control"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="newImage" className="form-label">
            Nueva Imagen URL:
          </label>
          <input
            type="text"
            id="newImage"
            className="form-control"
            value={newImage}
            onChange={(e) => setNewImage(e.target.value)}
          />
        </div>

        <button onClick={handleModifyPost} className="btn btn-success me-2">
          Guardar Cambios
        </button>
        <button onClick={handleDeletePost} className="btn btn-danger">
          Eliminar Post
        </button>
      </form>
    </div>
  );
};

// EditPost.propTypes = {
//   post: PropTypes.object.isRequired,
//   handleClose: PropTypes.func.isRequired,
// };

export default EditPost;
