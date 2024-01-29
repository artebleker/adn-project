import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: usuario,
          password: contrasena,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        localStorage.setItem("author", usuario);
        navigate("/");
      } else {
        setError("Credenciales incorrectas");
      }
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
      setError("Error en el servidor");
    }
  };

  const handleSignup = async () => {
    if (usuario === "" || contrasena === "") return;
    try {
      const response = await fetch("http://localhost:5000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: usuario,
          password: contrasena,
        }),
      });

      if (response.ok) {
        console.log("Usuario creado exitosamente");
      } else {
        const data = await response.json();
        setError(data.error || "Error en el servidor");
      }
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
      setError("Error en el servidor");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="container">
      <div className="row justify-content-center mt-5 text-center">
        <div className="col-md-6">
          <h1>ADN - FinalProject</h1>
          <form onSubmit={handleSubmit}>
            <h2 className="mb-4">Inicio de Sesión</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="mb-3">
              <label htmlFor="usuario" className="form-label">
                Usuario:
              </label>
              <input
                type="text"
                className="form-control"
                id="usuario"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="contrasena" className="form-label">
                Contraseña:
              </label>
              <input
                type="password"
                className="form-control"
                id="contrasena"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Iniciar Sesión
            </button>
          </form>
          <div className="mt-3">
            <h2 className="mb-4">Registro de Usuario</h2>
            <button onClick={handleSignup} className="btn btn-success btn-lg">
              Registrarse
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
