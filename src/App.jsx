import { useEffect, useState, useMemo, useReducer } from "react";
import Header from "./Components/Header";
import SearchBar from "./Components/SearchBar";
import Movies from "./Components/Movies";
import Filters from "./Components/Filters";
import { createPortal } from "react-dom";
import { options } from "./util";
import Details from "./Components/Details";

export default function App() {
  // const [state, dispatch] = useReducer(reducer)
  const [init, setInit] = useState(false);
  const [movies, setMovies] = useState([]); // Array of movies from API
  const [shows, setShows] = useState([]); // Array of shows from API
  const [filters, setFilters] = useState([]); // Array of filters from API, either movies or shows
  const [selectedFilters, setSelectedFilters] = useState([]); // Array of selected filters
  const [search, setSearch] = useState(""); // String of search input
  const [currentPage, setCurrentPage] = useState(1); // Number of current page
  const [pages, setPages] = useState({}); // Array of pages
  const [isLoading, setIsloading] = useState(false); // Boolean of loading state]
  const [display, setDisplay] = useState(false);
  const [details, setDetails] = useState(null);
  const [blur, setBlur] = useState('')

  let encodedFilter = encodeURIComponent(selectedFilters); // Encoded string of selected filters

 useEffect(() => {
    if (details === null) {
      setBlur('')
      document.body.style.overflow = 'unset'
    } else {
      setBlur('blur-md')
      document.body.style.overflow = 'hidden'
    }
 }, [details])

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
    console.log(movies);
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
  console.log(details);

  if (blur)
  return (
<button className="cursor-pointer" onClick={() => setDetails(null)}>
      <Header
        getShows={getShows}
        getMovies={getMovies}
        movies={movies}
        shows={shows}
      />
      {!!details &&
        createPortal(
          <div className="fixed inset-1/4 text-wrap rounded-2xl  bg-white">
              <button type="button" onClick={() => setDetails(null)}>
              <h1>{details.title}</h1>
              <h2>{details.overview}</h2>
              <h3>{details.date}</h3>
              <img src={`https://image.tmdb.org/t/p/w185/${details.poster}`} />
              </button>
          </div>,

          document.body
        )}
        <div className={`${blur}`}>
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
        display={display}
        setDisplay={setDisplay}
        setDetails={setDetails}
      />
      </div>
    </button>)
  return (
    <div>
      <Header
        getShows={getShows}
        getMovies={getMovies}
        movies={movies}
        shows={shows}
      />
      {!!details &&
        createPortal(
          <div className="absolute top-1/2 w-auto h-auto bg-white">
              <button type="button" onClick={() => setDetails(null)}>
              <h1>{details.title}</h1>
              <h2>{details.overview}</h2>
              <h3>{details.date}</h3>
              <img src={`https://image.tmdb.org/t/p/w185/${details.poster}`} />
              </button>
          </div>,

          document.body
        )}
        <div className={`${blur}`}>
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
        display={display}
        setDisplay={setDisplay}
        setDetails={setDetails}
      />
      </div>
    </div>
  );
}
