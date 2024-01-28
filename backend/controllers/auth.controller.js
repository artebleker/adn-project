import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../model/userSchema.js";
import { env } from "../src/config.js";

export const signup = async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ error: "El usuario ya existe" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "Usuario registrado exitosamente" });
  } catch (error) {
    console.error(`Error en signup: ${error}`);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (isPasswordMatch) {
      const token = jwt.sign(
        { userId: user._id, username: user.username },
        env.SECRET,
        {
          expiresIn: "1h",
        }
      );
      console.log("user._id", user._id);
      console.log("user.username", user.username);
      console.log("env.SECRET", env.SECRET);
      console.log("Token codificado:", token);
      res.status(200).json({ token });
    } else {
      res.status(401).json({ error: "Credenciales inválidas" });
    }
  } catch (error) {
    console.error(`Error en login: ${error}`);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

export const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res
      .status(403)
      .json({ error: "Acceso denegado. Token no proporcionado." });
  }

  jwt.verify(token, env.SECRET, (err, decoded) => {
    if (err) {
      console.error(`Error al verificar el token: ${err.message}`);
      return res.status(401).json({ error: "Token inválido" });
    }

    console.log("Token decodificado:", decoded);
    req.user = decoded;
    next();
  });
};
