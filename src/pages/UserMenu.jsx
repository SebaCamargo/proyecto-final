import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import { logout } from "../state/authSlice";
import user from "../img/user.png"; // imagen del usuario
import "./Pages.css";

function UserMenu() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.auth);

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout()); 
    toast.success("Gracias por visitarnos. ¡Has cerrado sesión!");
    navigate("/login");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleUserClick = () => {
    if (!token) {
      navigate("/login");
    } else {
      toggleMenu();
    }
  };

  useEffect(() => {
    setMenuOpen(false);
  }, [token]);

  return (
    <div className="user-menu-wrapper">
      <img
        src={user}
        alt="user"
        className={`user-icon ${token ? "login" : "logout"}`}
        onClick={handleUserClick}
      />

      {token && (
        <span
          className="user-menu-arrow"
          onClick={toggleMenu}
          tabIndex={0}
          role="button"
          aria-label="Abrir menú"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") toggleMenu();
          }}
        >
          ▼
        </span>
      )}

      {token && menuOpen && (
        <div className="dropdown-menu">
          <Link to="/profile" onClick={() => setMenuOpen(false)}>
            Perfil
          </Link>
          <button onClick={handleLogout}>Cerrar sesión</button>
        </div>
      )}
    </div>
  );
}

export default UserMenu;
