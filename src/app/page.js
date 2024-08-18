import React from "react";
const API_KEY = process.env.API_KEY;
import Results from "@/components/Results";

export async function generateMetadata({ searchParams }) {
  const genre = searchParams.genre || "fetchTrending";

  const res = await fetch(
    `https://api.themoviedb.org/3${
      genre === "fetchTopRated" ? `/movie/top_rated` : `/trending/all/week`
    }?api_key=${API_KEY}&language=en-US&page=1`
  );
  const data = await res.json();
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const results = data.results;

  return {
    title: `IMDb clone - ${
      genre === "fetchTopRated" ? "Top Rated Movies" : "Trending Movies"
    }`,
    description: `This is a movie database showing ${
      genre === "fetchTopRated" ? "top rated movies" : "trending movies"
    } including ${results[0]?.title || results[0]?.name}.`,
  };
}

async function HomePage({ searchParams }) {
  const genre = searchParams.genre || "fetchTrending";

  const res = await fetch(
    `https://api.themoviedb.org/3${
      genre === "fetchTopRated" ? `/movie/top_rated` : `/trending/all/week`
    }?api_key=${API_KEY}&language=en-US&page=1`,
    { next: { revalidate: 10000 } }
  );
  const data = await res.json();
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const results = data.results;

  return (
    <div>
      <Results results={results} />
    </div>
  );
}

export default HomePage;
