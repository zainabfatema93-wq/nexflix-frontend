import React, { useState, useEffect } from "react";
import { options } from "../Api";

import { Link } from "react-router-dom";

const RecommendedMovies = ({ movieTitles }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMovie = async (title) => {
    const encodedTitle = encodeURIComponent(title);
    const url = `https://api.themoviedb.org/3/search/movie?query=${encodedTitle}&include_adult=false&language=en-US&page=1`;
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      return data.results?.[0] || null;
    } catch (error) {
      console.error("Error fetching movie:", error);
      return null;
    }
  };

  useEffect(() => {
    if (!movieTitles?.length) {
      setLoading(false);
      return;
    }

    const loadRecommendedMovies = async () => {
      setLoading(true);

      const results = await Promise.all(
        movieTitles.map((title) => fetchMovie(title)),
      );

      setMovies(results.filter(Boolean));
      setLoading(false);
    };

    loadRecommendedMovies();
  }, [movieTitles]);

  if (loading) {
    return <p>Loading...</p>;
  }

  console.log("Recommended Movies:", movies);

  return (
    <div className="mt-8">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {movies.map((movie) => (
          <Link
            key={movie.id}
            to={`/movie/${movie.id}`}
            className="bg-[#181818] rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="p-2">
              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-auto rounded"
                />
              ) : (
                <div className="w-full h-64 bg-gray-700 rounded flex items-center justify-center text-white">
                  No Image
                </div>
              )}
            </div>

            <div className="p-2">
              <h3 className="text-sm font-semibold text-white truncate">
                {movie.title}
              </h3>

              <p className="text-xs text-gray-400">
                {movie.release_date ? movie.release_date.slice(0, 4) : "N/A"}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecommendedMovies;
