import React, { useEffect, useState } from "react";
import MovieList from '../../components/MovieList/MovieList.js';
import './Home.css';

function Home() {
  const [getMovies, setGetMovies] = useState([]);

  const trendingMovie = async () => {
    const serverURL = `https://api.themoviedb.org/3/trending/all/week?api_key=3d68f12e6463621d8849a7938fc2af01&language=en-US`;
    const res = await fetch(serverURL);
    const jsonRes = await res.json();
    setGetMovies(jsonRes.results);
  }

  useEffect(() => {
    trendingMovie();
  }, []);

  return (
    <div className="home-container">
      <MovieList getMovies={getMovies} />
    </div>
  );
}

export default Home;