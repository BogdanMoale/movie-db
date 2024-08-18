import React from "react";
import Image from "next/image";

const API_KEY = process.env.API_KEY;

export async function generateMetadata({ params }) {
  const movieId = params.id;

  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`
  );
  const movie = await res.json();
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return {
    title: movie.title || movie.name,
    description: movie.overview,
    openGraph: {
      type: "article",
      title: movie.title || movie.name,
      description: movie.overview,
      url: movie.homepage,
      images: [
        {
          url: `https://image.tmdb.org/t/p/original/${
            movie.backdrop_path || movie.poster_path
          }`,
          width: 800,
          height: 600,
          alt: movie.original_title,
        },
      ],
    },
  };
}

export default async function MoviePage({ params }) {
  const movieId = params.id;
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`
  );
  const movie = await res.json();
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return (
    <div className="w-full">
      <div className="p-4 md:pt-8 flex flex-col md:flex-row content-center max-w-6xl mx-auto md:space-x-6">
        <Image
          src={`https://image.tmdb.org/t/p/original/${
            movie.backdrop_path || movie.poster_path
          }`}
          width={500}
          height={300}
          className="rounded-lg"
          style={{ maxWidth: "100%", height: "100%" }}
          alt={movie.original_title}
        />
        <div className="p-2">
          <h2 className="text-lg mb-3 font-bold">
            {movie.title || movie.name}
          </h2>
          <p className="text-lg mb-3">{movie.overview}</p>
          <p className="mb-3">
            <span className="font-semibold mr-1">Date Released:</span>
            {movie.release_date || movie.first_air_date}
          </p>
          <p className="mb-3">
            <span className="font-semibold mr-1">Rating Count:</span>
            {movie.vote_count}
          </p>

          <p className="mb-3">
            <span className="font-semibold mr-1">Note:</span>
            {movie.vote_average} / 10
          </p>

          <p className="mb-3">
            <span className="font-semibold mr-1">Genres:</span>
            {movie.genres && movie.genres.length > 0 ? (
              movie.genres.map((genre, index) => (
                <span key={genre.id}>
                  {genre.name}
                  {index < movie.genres.length - 1 ? ", " : ""}
                </span>
              ))
            ) : (
              <span>No genres available</span>
            )}
          </p>

          <p className="mb-3">
            <span className="font-semibold mr-1">HomePage:</span>
            <a href={movie.homepage}>Click Here</a>
          </p>
        </div>
      </div>
    </div>
  );
}
