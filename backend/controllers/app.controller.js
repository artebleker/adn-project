import Publicacion from "../model/schema.js";

const handleError = (res, err) => {
  console.error(`Error: ${err}`);
  res.status(500).json({ error: "Error interno del servidor" });
};

const handleNotFound = (res, resource) => {
  if (!resource) {
    res.status(404).json({ error: "Recurso no encontrado" });
  }
};

export const getAllPublicaciones = async (req, res) => {
  try {
    const publicaciones = await Publicacion.find();
    res.json(publicaciones);
  } catch (err) {
    handleError(res, err);
  }
};

export const createPublicacion = async (req, res) => {
  try {
    const { titulo, descripcion, imagen, comentarios = [{}] } = req.body;
    const nuevaPublicacion = new Publicacion({
      titulo,
      descripcion,
      imagen,
      comentarios,
      fechaCreacion: new Date(),
    });
    await nuevaPublicacion.save();
    res.json(nuevaPublicacion);
  } catch (err) {
    handleError(res, err);
  }
};

export const getPublicacionById = async (req, res) => {
  try {
    const publicacion = await Publicacion.findById(req.params.id);
    handleNotFound(res, publicacion);
    res.json(publicacion);
  } catch (err) {
    handleError(res, err);
  }
};

export const updatePublicacion = async (req, res) => {
  try {
    const publicacion = await Publicacion.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    handleNotFound(res, publicacion);
    res.json(publicacion);
  } catch (err) {
    handleError(res, err);
  }
};

export const deletePublicacion = async (req, res) => {
  try {
    const deletedPublicacion = await Publicacion.findByIdAndDelete(
      req.params.id
    );
    handleNotFound(res, deletedPublicacion);
    res.json({ mensaje: "Publicación eliminada exitosamente" });
  } catch (err) {
    handleError(res, err);
  }
};
