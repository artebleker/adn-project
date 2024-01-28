import React, { useState } from "react";

const NewPost = () => {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const author = localStorage.getItem("author");

    const newPostData = {
      title,
      description,
      image,
      author,
    };

    try {
      const response = await fetch("http://127.0.0.1:5000/publicaciones/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newPostData),
      });

      if (response.ok) {
        console.log("Post creado exitosamente");
        window.location.reload();
      } else {
        console.error("Error al crear el post");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }

    handleCloseModal();
  };

  return (
    <div>
      <button className="btn btn-primary" onClick={handleShowModal}>
        Nuevo post
      </button>

      <div
        className={`modal ${showModal ? "show" : ""}`}
        style={{ display: showModal ? "block" : "none" }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Nuevo Post</h4>
              <button
                type="button"
                className="btn-close"
                onClick={handleCloseModal}
              ></button>
            </div>

            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Título:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Descripción (máx. 144 caracteres):
                  </label>
                  <textarea
                    className="form-control"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    maxLength="144"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="image" className="form-label">
                    URL de la imagen:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="image"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Crear Post
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div
          className="modal-backdrop show"
          style={{ zIndex: "1050", display: "block" }}
        ></div>
      )}
    </div>
  );
};

export default NewPost;
