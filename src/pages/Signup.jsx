import { useState } from "react";
import { Navigate } from "react-router-dom";

function Signup() {
  const [user, setUser] = useState();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:4000/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    //errores Hacerlos aquí sin realizar el submit con extension yup o joi
    const data = await res.json();
    if (!res.ok) {
      setError(data?.error || "Error de registro");
    } else {
      setUser(data);
      localStorage.setItem("Usuario", JSON.stringify(data.username));
      console.log(data);
    }
  };

  if (user) return <Navigate to={"/login"} />;
  return (
    <>
      <header>
        <h1>INSTABLACK</h1>
      </header>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input
            type="text"
            placeholder="Bartolo23"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="text"
            placeholder="blackio34@instaBlack.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div>
          <label>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <button>Registrarse</button>
        {error && <p className="error">{error}</p>}
      </form>
    </>
  );
}

export default Signup;
