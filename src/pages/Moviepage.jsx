import React, { useEffect } from "react";
import { options } from "../Api";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { LightbulbIcon, Play } from "lucide-react";

const Moviepage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [trailerKey, setTrailerKey] = useState([null]);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options)
      .then((res) => res.json())
      .then((res) => setMovie(res))
      .catch((err) => console.error(err));

    fetch(
      `https://api.themoviedb.org/3/movie/${id}/recommendations?language=en-US&page=1`,
      options,
    )
      .then((res) => res.json())
      .then((res) => setRecommendations(res.results || []))
      .catch((err) => console.error(err));

    fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
      options,
    )
      .then((res) => res.json())
      .then((data) => {
        const videos = data.results;

        const trailer = videos.find((video) => {
          return video.site === "YouTube" && video.type === "Trailer";
        });

        if (trailer) {
          setTrailerKey(trailer.key);
        } else {
          setTrailerKey(null);
        }
      });
  }, [id]);
  if (!movie) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="text-xl text-red-500">Loading....</span>
      </div>
    );
  }
  console.log("Movie:", movie);
  return (
    <div className="min-h-screen bg-[#181818] text-white">
      <div
        className="relative h-[70vh] flex items-end"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-transparent"></div>

        <div className="relative z-10 flex items-end p-5 gap-10">
          <img
            className="rounded-lg shadow-lg h-48 w-48 hidden md:block"
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.title}
          />
          <div>
            <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>

            <div className="flex items-center gap-4 mb-4">
              <span>⭐ {movie.vote_average?.toFixed(1)}</span>
              <span>{movie.release_date}</span>
              <span>{movie.runtime} min</span>
            </div>
            <div>
              {movie.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="bg-gray-800 px-3 py-1 rounded-full text-sm "
                >
                  {genre.name}
                </span>
              ))}
            </div>
            <p className="max-w-2xl text-gray-200 pt-4">{movie.overview}</p>
            <a
              href={`http://www.youtube.com/watch?v=${trailerKey}`}
              target="_blank"
            >
              <button className="flex justify-center items-center bg-[#e50914] text-white py-3 px-4 rounded-full cursor-pointer text-sm md:text-base mt-2 md:mt-4">
                <Play className="mr-2 w-4 h-5 md:h-5" />
                Watch Now
              </button>
            </a>
          </div>
        </div>
      </div>
      <div className="p-8">
        <h2 className="text-2xl font-semibold mb-4">Details</h2>
        <div className="bg-[#232323] rounded-lg shadow-lg p-6 flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <ul className="text-gray-300 space-y-3">
              <li>
                <span className="font-semibold text-white">Status:</span>
                <span className="ml-2">{movie.status}</span>
              </li>
              <li>
                <span className="font-semibold text-white">Released Date:</span>
                <span className="ml-2">{movie.release_date}</span>
              </li>
              <li>
                <span className="font-semibold text-white">
                  Original Language:
                </span>
                {""}
                <span className="ml-2">
                  {movie.original_language?.toUpperCase()}
                </span>
              </li>
              <li>
                <span className="font-semibold text-white">Budget:</span>
                <span className="ml-2">
                  {movie.budget ? `$${movie.budget.toLocaleString()}` : "N/A"}
                </span>
              </li>
              <li>
                <span className="font-semibold text-white">Revenue:</span>
                <span className="ml-2">
                  {movie.revenue ? `$${movie.revenue.toLocaleString()}` : "N/A"}
                </span>
              </li>
              <li>
                <span className="font-semibold text-white">
                  Production Companies:
                </span>
                <span className="ml-2">
                  {movie.production_companies &&
                  movie.production_companies.length > 0
                    ? movie.production_companies.map((c) => c.name).join(",")
                    : "N/A"}
                </span>
              </li>
              <li>
                <span className="font-semibold text-white">Countries:</span>
                <span className="ml-2">
                  {movie.production_countries?.length > 0
                    ? movie.production_countries
                        .map((country) => country.name)
                        .join(", ")
                    : "N/A"}
                </span>
              </li>
              <li>
                <span className="font-semibold text-white">
                  Spoken Languages:
                </span>
                <span className="ml-2">
                  {movie.spoken_languages?.length > 0
                    ? movie.spoken_languages
                        .map((language) => language.english_name)
                        .join(", ")
                    : "N/A"}
                </span>
              </li>
            </ul>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-white mb-2">Tagline</h3>
            <p className="italic text-gray-400 mb-6">
              {movie.tagline || "No tagline available"}
            </p>
            <h3 className="font-semibold text-white mb-2">Overview</h3>
            <p className="italic text-gray-200 mb-6">{movie.overview}</p>
          </div>
        </div>
      </div>
      {recommendations.length > 0 && (
        <div className=" p-8">
          <h2 className="text-2xl font-semibold mb-4">
            You might also like....
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {recommendations.slice(0, 10).map((rec) => (
              <div
                key={rec.id}
                className="bg-[#232323] rounded-lg overflow-hidden hover:scale-105 transition" // important mean its touchinf the photo its high lighted
              >
                <Link to={`/movie/${rec.id}`}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${rec.poster_path}`}
                    alt={rec.title}
                    className="rounded-lg w-full h-48 object-cover"
                  />
                </Link>

                <p className="p-2 text-sm font-semibold">{rec.title}</p>
                <span className="text-xs text-gray-400">
                  {rec.release_date?.slice(0, 4)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Moviepage;
