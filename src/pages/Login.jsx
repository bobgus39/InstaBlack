import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { Footer } from "../components/Footer";

import "../App.css";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import { image, main, form, register, err } from "./Login.module.css";

//hacerlo con una pagina aparte y la home sera la primera pagina

function Login() {
  const [user, setUser] = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:4000/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    console.log("data", data.data);
    if (!res.ok) {
      setError(data?.message || "Error al iniciar sesión");
    } else {
      setUser(data.data.token);
      localStorage.setItem("userId", JSON.stringify(data.data.tokenInfo.id));
      localStorage.setItem(
        "Usuario",
        JSON.stringify(data.data.tokenInfo.username)
      );
      window.location.href = "/";
    }
  };

  //if (user) return <Navigate to="/" />;

  return (
    <main className={main}>
      <form className={form} onSubmit={handleSubmit}>
        <div>
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="blackio34@instaBlack.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div>
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>

        {
          <Button variant="primary" type="submit">
            Entrar
          </Button>
        }
      </form>

      {error ? (
        <p className={err}>{error}</p>
      ) : (
        <div className={register}>
          <h3>¿No tienes cuenta?</h3>
          <span>
            <NavLink to="/signup">Registrarse</NavLink>
          </span>
          <Outlet></Outlet>
        </div>
      )}

      <img
        className={image}
        src="../../public/foto_login.png"
        alt="foto login"
      />
      <Footer></Footer>
    </main>
  );
}

export default Login;
