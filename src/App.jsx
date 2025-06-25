import { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route, Link} from "react-router";
import { useLocation } from "react-router";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { ToastContainer } from 'react-toastify';
import Movies from "./pages/Movie";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserMenu from "./pages/UserMenu";
import Profile from "./pages/Profile";
import MovieDetails from "./pages/MovieDetails";
import NotFoud from "./pages/NotFound";
import Cart from "./pages/Cart"; 
import cart from "./img/cart.png";
import github from "./img/github.png"
import linkedin from "./img/linkedin.png"
import insta from "./img/insta.png"
import "./App.css";

function App() {
  const [films, setFilms] = useState([]);
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

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

  return (
    <>
      <header> 
      <ToastContainer />
        <div className= "hero">
          <ul>
            <li>
              <Link to="/"><span>UruFlix</span></Link>
            </li>

            <div className="nav-links">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">Sobre este proyecto</Link>
              </li>
              <li>
                <UserMenu />
              </li>
              <li>
              <img src={cart} alt="cart" className="carrito"
                 onClick={() => {
                  if (token) {
                    navigate("/cart");
                  } else {
                    navigate("/login");
                  }
                }}
              />
              </li>

              <li>
                <Link to='/register'>Register</Link>
              </li>
            </div>
          </ul>
        </div>

      </header>

      <main>
        <Routes>
          <Route path="/" element={<Movies films={films} />} />

          <Route path="/moviedetail/:idMovie" element={<MovieDetails />} />
          
          <Route path="/about" element={<About />} />

          <Route path='/login' element={<Login />} />

          <Route path='/register' element={<Register />} />

          <Route path="/profile" element={<Profile />} />

          <Route path="/cart" element={<Cart />} />

          <Route path="*" element={<NotFoud />} />
        </Routes>
      </main>

      <footer className="footer">
        <div className="container-footer">
          <h1>UruFlix</h1>
          <div className="container-personal-information">
            <h2>Creado por : <span>Sebastian Camargo</span></h2>
            <a href="https://github.com/SebaCamargo" target="_blank"> <img src={github} alt="icon github" /> </a>
            <a href="https://www.linkedin.com/in/seba-camargo/" target="_blank"> <img src={linkedin} alt="icon linkedin" /> </a>
            <a href="https://www.instagram.com/sebacamargo360/" target="_blank"> <img src={insta} alt="icon instagram" /> </a>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
