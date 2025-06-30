import { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route, Link } from "react-router";
import { useLocation } from "react-router";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { logout } from "./state/authSlice";
import { clearAllUserData as clearCartData } from "./state/cartSlice";
import { clearAllUserData as clearOrdersData } from "./state/ordersSlice";
import { useRef } from "react";
import Movies from "./pages/Movie";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserMenu from "./pages/UserMenu";
import Profile from "./pages/Profile";
import MovieDetails from "./pages/MovieDetails";
import Checkout from "./pages/Checkout";
import NotFoud from "./pages/NotFound";
import Cart from "./pages/Cart";
import cart from "./img/cart.png";
import github from "./img/github.png";
import linkedin from "./img/linkedin.png";
import insta from "./img/insta.png";
import "./App.css";

function App() {
  const [films, setFilms] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart[user?.id] || []);
  const menuToggleRef = useRef();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const apikey = "1f6c05af9a052262cc5f79b5bbfe674b";

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${apikey}&sort_by=popularity.desc&region=US&with_original_language=en&page=1`
      )
      .then((response) => {
        setFilms(response.data.results);
      });
  }, []);

  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [location.pathname]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLinkClick = () => {
    if (menuToggleRef.current) {
      menuToggleRef.current.checked = false;
    }
  };

  const handleLogout = () => {
    if (menuToggleRef.current) {
      menuToggleRef.current.checked = false;
    }

    dispatch(clearCartData());
    dispatch(clearOrdersData());
    dispatch(logout());

    toast.success("Gracias por visitarnos. ¡Has cerrado sesión!");
    navigate("/login");
  };

  return (
    <>
      <header>
        <ToastContainer
          toastClassName="mi-toast"
          bodyClassName="mi-toast-body"
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          theme="light"
        />
        <nav className="navbar">
          <div className="hero">
            <ul>
              <div className="logo">
                <li>
                  <Link to="/"> <span>UruFlix</span> </Link>
                </li>
              </div>

              {isMobile && (
                <>
                  <input
                    type="checkbox"
                    id="menu-toggle"
                    className="menu-toggle"
                    ref={menuToggleRef}
                  />
                  <label htmlFor="menu-toggle" className="hamburger">
                    <span></span>
                    <span></span>
                    <span></span>
                  </label>
                </>
              )}

              <div className="nav-links">
                <li>
                  <Link to="/" onClick={handleLinkClick}> Home </Link>
                </li>
                <li>
                  <Link to="/about" onClick={handleLinkClick}> About </Link>
                </li>

                <li className="user-menu-inline">
                  {isMobile ? (
                    token ? (
                      <>
                        <a href="/profile" onClick={handleLinkClick}> Perfil </a>
                        <button
                          onClick={() => {
                            handleLogout();
                            handleLinkClick();
                          }}
                        >
                          Cerrar sesión
                        </button>
                      </>
                    ) : (
                      <a href="/login" onClick={handleLinkClick}> Login </a>
                    )
                  ) : (
                    <UserMenu />
                  )}
                </li>
                <li>
                  <div
                    className="cart-icon-wrapper"
                    onClick={() => {
                      handleLinkClick();
                      if (token) {
                        navigate("/cart");
                      } else {
                        navigate("/login");
                      }
                    }}
                  >
                    <img src={cart} alt="cart" className="carrito" />
                    {token && totalQuantity > 0 && (
                      <div className="cart-badge">{totalQuantity}</div>
                    )}
                  </div>
                </li>

                <li>
                  <Link to="/register" onClick={handleLinkClick}> Register </Link>
                </li>
              </div>
            </ul>
          </div>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Movies films={films} />} />

          <Route path="/moviedetail/:idMovie" element={<MovieDetails />} />

          <Route path="/about" element={<About />} />

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

          <Route path="/profile" element={<Profile />} />

          <Route path="/cart" element={<Cart />} />

          <Route path="/checkout" element={<Checkout />} />

          <Route path="*" element={<NotFoud />} />
        </Routes>
      </main>

      <footer className="footer">
        <div className="container-footer">
          <h1>UruFlix</h1>
          <div className="container-personal-information">
            <h2> Creado por : <span>Sebastian Camargo</span></h2>
            <a href="https://github.com/SebaCamargo" target="_blank">
              <img src={github} alt="icon github" />
            </a>
            <a href="https://www.linkedin.com/in/seba-camargo/" target="_blank">
              <img src={linkedin} alt="icon linkedin" />
            </a>
            <a href="https://www.instagram.com/sebacamargo360/" target="_blank">
              <img src={insta} alt="icon instagram" />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
