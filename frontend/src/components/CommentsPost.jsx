import React, { useState } from "react";

const CommentsPost = ({ postComments, isAuthor }) => {
  const [editingComment, setEditingComment] = useState(null);
  const [editedCommentText, setEditedCommentText] = useState("");

  const handleEditClick = (commentId, currentText) => {
    setEditingComment(commentId);
    setEditedCommentText(currentText);
  };

  const handleSaveClick = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/comentarios/${editingComment}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ text: editedCommentText }),
        }
      );

      if (response.ok) {
        window.location.reload();
      } else {
        console.error("Error al editar el comentario");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    } finally {
      setEditingComment(null);
    }
  };

  const handleCancelClick = () => {
    setEditingComment(null);
  };

  return (
    <div>
      <ul className="list-group">
        {postComments.map((comentario, index) => (
          <li
            key={index}
            className="list-group-item shadow-sm rounded comment-section d-flex justify-content-between"
          >
            <div>
              <h6 className="text-muted" style={{ fontSize: "0.8rem" }}>
                {comentario.author} -{" "}
                {new Date(comentario.createdAt).toLocaleDateString()}
              </h6>
              {editingComment === comentario._id ? (
                <input
                  type="text"
                  value={editedCommentText}
                  onChange={(e) => setEditedCommentText(e.target.value)}
                />
              ) : (
                <strong style={{ fontSize: "1rem" }}>{comentario.text}</strong>
              )}
            </div>
            {isAuthor && (
              <div>
                {editingComment === comentario._id ? (
                  <>
                    <button
                      onClick={handleSaveClick}
                      className="btn btn-success btn-sm me-2"
                    >
                      Guardar
                    </button>
                    <button
                      onClick={handleCancelClick}
                      className="btn btn-secondary btn-sm"
                    >
                      Cancelar
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() =>
                      handleEditClick(comentario._id, comentario.text)
                    }
                    className="btn btn-secondary btn-sm"
                  >
                    Editar
                  </button>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentsPost;
