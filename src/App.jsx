import { useEffect, useState, useRef } from "react";
import Header from "./Components/Header";
import SearchBar from "./Components/SearchBar";
import Movies from "./Components/Movies";
import Filters from "./Components/Filters";
import { createPortal } from "react-dom";
import { options } from "./util";

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
  const [details, setDetails] = useState(null);
  const [blur, setBlur] = useState("");
  const searchRef = useRef(null)

  const encodedFilter = encodeURIComponent(selectedFilters); // Encoded string of selected filters
  useEffect(() => {
    // blur effect when viewing details via portal
    if (details === null) {
      setBlur("");
      document.body.style.overflow = "unset";
    } else {
      setBlur("blur-md");
      document.body.style.overflow = "hidden";
    }
  }, [details]);

  const getShows = async () => {
    // async function to fetch shows from tmbd api
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
    console.log(shows);
  };

  const getFilters = async () => {
    // async function to fetch filters associated to either shows or movies
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
    // function to call filters anytime movies or shows is selected
    getFilters();
  }, [movies, shows]);

  const getMovies = async () => {
    // async function to fetch movies
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
    // async function to use selected filters to fetch a sorted list of movies or shows
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

  // useEffect(() => {
  //   getMovies()
  //   movies.push(getShows())
  // }, [])

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
            <div
              key={details.id}
              style={{
                backgroundImage: `url("https://image.tmdb.org/t/p/w500${details.backdrop}")`,
              }}
              className={`fixed bg-blue-500 bg-blend-multiply inset-1/4  rounded-2xl bg-cover transition-opacity  text-white`}
            >
              <button
                className="relative"
                type="button"
                onClick={() => setDetails(null)}
              >
                <img
                  className=""
                  src={`https://image.tmdb.org/t/p/w185/${details.poster}`}
                />
                <h1 className="font-bold">{details.title}</h1>
                <p className="">{details.overview}</p>
                <h3 className="">{details.date}</h3>
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
            searchRef={searchRef}
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
            setDetails={setDetails}
          />
        </div>
      </button>
    );
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
          searchRef={searchRef}
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
          setDetails={setDetails}
        />
      </div>
    </div>
  );
}
