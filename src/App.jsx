import { useEffect, useState } from "react";
import Header from "./Components/Header";
import SearchBar from "./Components/SearchBar";
import Movies from "./Components/Movies";
import Filters from "./Components/Filters";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMmNhYWMxM2QzM2FiNGY2NTczZWZhZjc3MmMyNmJjMyIsInN1YiI6IjY1MDA2NjUxMWJmMjY2MDExYzc4MjU4NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mfZLaDd8VJTN9sSVGADmpLH44Ph3Wy-n7U3eAI1y108",
  },
};

function App() {
  const [movies, setMovies] = useState([]); // Array of movies from API
  const [shows, setShows] = useState([]); // Array of shows from API
  const [filters, setFilters] = useState([]); // Array of filters from API, either movies or shows
  const [selectedFilters, setSelectedFilters] = useState([]); // Array of selected filters
  const [search, setSearch] = useState(""); // String of search input
  const [currentPage, setCurrentPage] = useState(1); // Number of current page
  const [pages, setPages] = useState({}); // Array of pages
  const [isLoading, setIsloading] = useState(false); // Boolean of loading state]

  let encodedFilter = encodeURIComponent(selectedFilters); // Encoded string of selected filters
  console.log(shows);
  const getShows = async () => {
    if (movies.length > 0) {
      setCurrentPage(1);
    }
    setIsloading(true);
    const data = await fetch(
      `https://api.themoviedb.org/3/discover/tv?page=${currentPage}`,
      options
    );
    const shows = await data.json();
    const showResults = shows.results;
    setMovies([]);
    setShows((prev) => [...prev, ...showResults]);
    setPages(shows);
    setIsloading(false);
  };

  const getFilters = async () => {
    if (movies.length > 0) {
      const data = await fetch(
        "https://api.themoviedb.org/3/genre/movie/list?language=en",
        options
      );
      const filters = await data.json();
      setFilters(filters.genres);
    }
    if (shows.length > 0) {
      const data = await fetch(
        "https://api.themoviedb.org/3/genre/tv/list?language=en",
        options
      );
      const filters = await data.json();
      setFilters(filters.genres);
    }
  };

  useEffect(() => {
    getFilters();
  }, [movies, shows]);

  const getMovies = async () => {
    if (shows.length > 0) {
      setCurrentPage(1);
    }
    setIsloading(true);
    const data = await fetch(
      `https://api.themoviedb.org/3/discover/movie?page=${currentPage}`,
      options
    );
    const movies = await data.json();
    const movieResults = movies.results;
    setShows([]);
    setPages(movies);
    setMovies((prev) => [...prev, ...movieResults]);
    setIsloading(false);
  };

  const filterMovies = async () => {
    if (movies.length > 0) {
      const data = await fetch(
        `https://api.themoviedb.org/3/discover/movie?with_genres=${encodedFilter}`,
        options
      );
      const movies = await data.json();
      setMovies(movies.results);
    }
    if (shows.length > 0) {
      const data = await fetch(
        `https://api.themoviedb.org/3/discover/tv?with_genres=${encodedFilter}`,
        options
      );
      const shows = await data.json();
      setShows(shows.results);
    }
  };

  useEffect(() => {
    filterMovies();
  }, [selectedFilters]);

  const getSearchMovies = async () => {
    if (search !== "") {
      if (movies) {
        const data = await fetch(
          `https://api.themoviedb.org/3/search/movie?query=${search}`,
          options
        );
        const movies = await data.json();
        setMovies(movies.results);
      }
      if (shows) {
        const data = await fetch(
          `https://api.themoviedb.org/3/search/tv?query=${search}`,
          options
        );
        const shows = await data.json();
        setShows(shows.results);
      } else {
        return;
      }
    }
  };

  useEffect(() => {
    getSearchMovies();
  }, [search]);

  useEffect(() => {
    if (movies.length > 0) {
      getMovies();
    }
    if (shows.length > 0) {
      getShows();
    }
  }, [currentPage]);

  return (
    <>
      <Header
        getShows={getShows}
        getMovies={getMovies}
        movies={movies}
        shows={shows}
      />
      <div className="">
        <SearchBar
          setSearch={setSearch}
          setSelectedFilters={setSelectedFilters}
          movies={movies}
          shows={shows}
          getShows={getShows}
          getMovies={getMovies}
        />
        {!!filters && (
          <Filters
            filters={filters}
            setSelectedFilters={setSelectedFilters}
            selectedFilters={selectedFilters}
            setSearch={setSearch}
          />
        )}
        <Movies
          loading={isLoading}
          movies={movies}
          shows={shows}
          getMovies={getMovies}
          getShows={getShows}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </>
  );
}

export default App;
