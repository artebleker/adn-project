import Comment from "../model/commentSchema.js";

const handleError = (res, err) => {
  console.error(`Error: ${err}`);
  res.status(500).json({ error: "Error interno del servidor" });
};

const handleNotFound = (res, resource) => {
  if (!resource) {
    res.status(404).json({ error: "Recurso no encontrado" });
  }
};

export const getAllComment = async (req, res) => {
  try {
    const comentarios = await Comment.find();
    res.json(comentarios);
  } catch (err) {
    handleError(res, err);
  }
};

export const createComment = async (req, res) => {
  try {
    const { text, author, post } = req.body;
    const nuevoComentario = new Comment({
      text,
      author,
      post,
    });
    await nuevoComentario.save();
    res.json(nuevoComentario);
  } catch (err) {
    handleError(res, err);
  }
};

export const getCommentById = async (req, res) => {
  try {
    const comentario = await Comment.findById(req.params.id);
    handleNotFound(res, comentario);
    res.json(comentario);
  } catch (err) {
    handleError(res, err);
  }
};
export const getCommentsByPostId = async (req, res) => {
  try {
    const postId = req.params.id;
    const comentarios = await Comment.find({ post: postId });

    res.json(comentarios);
  } catch (err) {
    handleError(res, err);
  }
};

export const updateComment = async (req, res) => {
  try {
    const comentario = await Comment.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    handleNotFound(res, comentario);
    res.json(comentario);
  } catch (err) {
    handleError(res, err);
  }
};

export const deleteComment = async (req, res) => {
  try {
    const deletedComment = await Comment.findByIdAndDelete(req.params.id);
    handleNotFound(res, deletedComment);
    res.json({ mensaje: "Comentario eliminado exitosamente" });
  } catch (err) {
    handleError(res, err);
  }
};
