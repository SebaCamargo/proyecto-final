import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../state/cartSlice";
import { toast } from "react-toastify";
import buy from "../img/checkout.png";
import axios from "axios";
import "../styles/MovieDetails.css";

function MovieDetail() {
  const params = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);

  const apikey = "1f6c05af9a052262cc5f79b5bbfe674b";

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${params.idMovie}?api_key=${apikey}&language=es-ES`
      )
      .then((response) => {
        setMovie(response.data);
      });

    axios
      .get(
        `https://api.themoviedb.org/3/movie/${params.idMovie}/videos?api_key=${apikey}`
      )
      .then((response) => {
        const trailer = response.data.results.find(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );
        console.log(response.data.results);
        if (trailer) {
          setTrailer(trailer.key);
        }
      });
  }, [params.idMovie]);

  const handleAddToCart = () => {
    const userId = user ? user.id : "guest";

    toast.success(`"${movie.title}" agregada al carrito!`);
    dispatch(
      addToCart({
        userId: userId,
        movie: {
          id: movie.id,
          title: movie.title,
          price: Number((movie.vote_average * 10).toFixed(0)),
          img: `https://image.tmdb.org/t/p/w300${movie.poster_path}`,
        },
      })
    );
  };

  if (!movie) {
    return <h1 className="no-movies">Cargando...</h1>;
  }

  return (
    <>
      <div
        className="container-movie-detail"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.789)), url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})`,
        }}
      >
        <div className="movie-detail">
          <div className="container-image">
            <img
              src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`}
              alt={movie.title}
            />
          </div>

          <div className="movie-detail-text">
            <h1>Título : {movie.title}</h1>
            <h2>
              Descripción : <span>{movie.overview}</span>
            </h2>
            <ul>
              <li> Año de estreno : {movie.release_date} |</li>
              <li> País de origen: {movie.origin_country} |</li>
              <li>
                {" "}
                Puntuación:{" "}
                <span>{movie?.vote_average?.toFixed(1) ?? "N/A"}</span> / 10{" "}
              </li>
            </ul>
            <div className="buy" onClick={handleAddToCart}>
              <img src={buy} alt="cart buy" />
              <p>
                USD{" "}
                {movie?.vote_average
                  ? (movie.vote_average * 10).toFixed(0)
                  : "Aún no tiene un precio establecido"}
              </p>
            </div>
          </div>
        </div>

        {trailer && (
          <div className="trailer">
            <iframe
              src={`https://www.youtube.com/embed/${trailer}`}
              title="Tráiler"
              className="video"
            ></iframe>
          </div>
        )}
      </div>
    </>
  );
}

export default MovieDetail;
