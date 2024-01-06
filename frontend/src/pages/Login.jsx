import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (usuario === "admin" && contrasena === "1234") {
      localStorage.setItem("login", "TRUE");
      navigate("/");
    } else {
      setError("Credenciales incorrectas");
    }
  };
  const token = localStorage.getItem("login");
  useEffect(() => {
    if (token === "TRUE") {
      window.location.href = "/";
    }
  }, []);

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
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
        </div>
        <div className="text-center mt-2 p-2">
          <p>Usuario: admin</p>
          <p>Pass: 1234</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
