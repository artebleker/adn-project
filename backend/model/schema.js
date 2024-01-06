import mongoose from "mongoose";

const publicacionSchema = new mongoose.Schema({
  titulo: String,
  descripcion: String,
  imagen: String,
  comentarios: [{ contenido: String }],
});

export default mongoose.model("Publicacion", publicacionSchema);
