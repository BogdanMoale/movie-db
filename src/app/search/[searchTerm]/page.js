import React from "react";
const API_KEY = process.env.API_KEY;
import Results from "@/components/Results";

export async function generateMetadata({ params }) {
  const searchTerm = params.searchTerm;

  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchTerm}&language=en-US&page=1&include_adult=false`
  );
  const data = await res.json();
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const results = data.results;

  return {
    title: results.length
      ? `Results for "${searchTerm}"`
      : `No results for "${searchTerm}"`,
    description: results.length
      ? `Search results for "${searchTerm}" in our movie database.`
      : `No movies found for the search term "${searchTerm}".`,
  };
}

export default async function SearchPage({ params }) {
  const searchTerm = params.searchTerm;
  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchTerm}&language=en-US&page=1&include_adult=false`
  );
  const data = await res.json();
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const results = data.results;

  return (
    <div>
      {results && results.length === 0 && (
        <h1 className="text-center pt-6">No results found</h1>
      )}
      {results && results.length > 0 && <Results results={results} />}
    </div>
  );
}
