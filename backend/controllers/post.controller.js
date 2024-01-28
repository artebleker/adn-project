import Post from "../model/postSchema.js";

const handleError = (res, err) => {
  console.error(`Error: ${err}`);
  res.status(500).json({ error: "Error interno del servidor" });
};

const handleNotFound = (res, resource) => {
  if (!resource) {
    res.status(404).json({ error: "Recurso no encontrado" });
  }
};

export const getAllPost = async (req, res) => {
  try {
    const publicaciones = await Post.find();
    res.json(publicaciones);
  } catch (err) {
    handleError(res, err);
  }
};

export const createPost = async (req, res) => {
  try {
    const { title, description, image, author = [{}] } = req.body;
    const nuevaPublicacion = new Post({
      title,
      description,
      image,
      author,
    });
    await nuevaPublicacion.save();
    res.json(nuevaPublicacion);
  } catch (err) {
    handleError(res, err);
  }
};

export const getPostById = async (req, res) => {
  try {
    const publicacion = await Post.findById(req.params.id);
    handleNotFound(res, publicacion);
    res.json(publicacion);
  } catch (err) {
    handleError(res, err);
  }
};

export const updatePost = async (req, res) => {
  try {
    const publicacion = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    handleNotFound(res, publicacion);
    res.json(publicacion);
  } catch (err) {
    handleError(res, err);
  }
};

export const deletePost = async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (!deletedPost) {
      return res.status(404).json({ mensaje: "Publicación no encontrada" });
    }

    return res.json({ mensaje: "Publicación eliminada exitosamente" });
  } catch (err) {
    handleError(res, err);
  }
};
