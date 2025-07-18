import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../state/cartSlice";
import { toast } from "react-toastify";
import axios from "axios";
import { CardContainer, CardBody, CardItem } from "../components/ui/3d-card";
import "../styles/Movie.css";
import search from "../img/search.png";
import miImagen from "../img/mateasado.png";
import cartbuy from "../img/checkout.png";

function Movies({ films }) {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isHovering, setIsHovering] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const apikey = "1f6c05af9a052262cc5f79b5bbfe674b";

  useEffect(() => {
    if (searchInput === "") {
      setSearchResults([]);
      return;
    }

    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=${apikey}&query=${searchInput}`
      )
      .then((response) => {
        setSearchResults(response.data.results);
      });
  }, [searchInput]);

  const moviesToDisplay = searchInput ? searchResults : films;

  const handleAddToCart = (film) => {
    const userId = user ? user.id : "guest";

    toast.success(`"${film.title}" agregada al carrito!`);

    dispatch(
      addToCart({
        userId: userId,
        movie: {
          id: film.id,
          title: film.title,
          price: Number((film.vote_average * 10).toFixed(0)),
          img: `https://image.tmdb.org/t/p/w300${film.poster_path}`,
        },
      })
    );
  };

  return (
    <>
      <div className="imagen-fondo-container">
        <img src={miImagen} className="imagen-fondo" alt="Fondo"></img>
      </div>

      <div className="movies-container">
        <div className="search">
          <img src={search} alt="imagen de una lupa" />
          <input
            type="text"
            placeholder="Qué te gustaría ver?"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>

        <div className={`movies ${isHovering ? "has-hover" : ""}`}>
          {moviesToDisplay.length === 0 ? (
            <h2>No se encontraron películas con este nombre.</h2>
          ) : (
            moviesToDisplay.map((film) => (
              <CardContainer key={film.id} className="movie-container">
                <CardBody className="movie-card">
                  <Link to={`/moviedetail/${film.id}`}>
                    <CardItem 
                      translateZ="80" 
                      className="movie"
                      onMouseEnter={() => setIsHovering(true)}
                      onMouseLeave={() => setIsHovering(false)}
                    >
                      {film.poster_path ? (
                        <>
                          <img
                            src={`https://image.tmdb.org/t/p/w300${film.poster_path}`}
                            alt={film.title}
                            className="movie-poster"
                          />
                          <div
                            className="container-cartbuy"
                            onClick={(event) => {
                              event.preventDefault();
                              event.stopPropagation();
                              handleAddToCart(film);
                            }}
                          >
                            <img
                              className="cartbuy"
                              src={cartbuy}
                              alt="supermarcket car"
                            />
                          </div>
                        </>
                      ) : (
                        <div className="no-image">
                          <span>No se encontro imagen</span>
                          <span className="no-image-title">{film.title}</span>
                        </div>
                      )}
                    </CardItem>
                  </Link>
                </CardBody>
              </CardContainer>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default Movies;
