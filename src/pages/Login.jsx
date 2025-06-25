import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { login } from "../state/authSlice";
import { toast } from 'react-toastify';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "https://ha-videoclub-api-g1.vercel.app/tokens",
        {
          email: formData.email,
          password: formData.password,
        }
      );

      const { token, userId } = response.data;

      const userResponse = await axios.get(
        `https://ha-videoclub-api-g1.vercel.app/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const user = userResponse.data;

      dispatch(login({ token, user }));

      toast.success("¡Sesión iniciada. ¡Disfruta tu experiencia!");
      
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container-login" id="loginContainer">
      <div className="form-section">
        <h1>Iniciar Sesión</h1>

        <form id="loginForm" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="loginEmail">Email</label>
            <input
              type="email"
              id="loginEmail"
              name="email"
              placeholder="tu@email.com"
              value={formData.email}
              onInput={(event) =>
                setFormData((prev) => ({ ...prev, email: event.target.value }))
              }
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="loginPassword">Contraseña</label>
            <input
              type="password"
              id="loginPassword"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onInput={(event) =>
                setFormData((prev) => ({
                  ...prev, password: event.target.value,
                }))
              }
              required
            />
          </div>

          <button type="submit" className="btn" id="loginBtn">
            <span id="loginBtnText">Iniciar Sesión</span>
          </button>
        </form>

        <div className="switch-form">
          <p>
            ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
