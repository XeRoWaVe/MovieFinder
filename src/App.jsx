import { useEffect, useState, useRef } from "react";
import Header from "./Components/Header";
import SearchBar from "./Components/SearchBar";
import Movies from "./Components/Movies";
import Filters from "./Components/Filters";
import Pagination from "./Components/Pagination";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

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
  const [searchShows, setSearchShows] = useState(false); // Boolean to determine if shows are being searched
  const [searchMovies, setSearchMovies] = useState(false); // Boolean to determine if movies are being searched
  const [filters, setFilters] = useState([]); // Array of filters from API, either movies or shows
  const [selectedFilters, setSelectedFilters] = useState([]); // Array of selected filters
  const [search, setSearch] = useState(""); // String of search input
  const [currentPage, setCurrentPage] = useState(1); // Number of current page
  const [recordsPerPage, setRecordsPerPage] = useState(10) // Number of records per page
  const [data, setData] = useState([]); // Array of data from API
  const [pages, setPages] = useState(); // Array of pages


  // if (selectedFilters.length > 0){
  // const encodedFilter = selectedFilters
  //   .map((f) => encodeURIComponent(f))
  //   .join(",");}



  // console.log(encodedFilter)
  // console.log(filters);
  // console.log(data)



  
  // console.log(data)
  // const indexOfLastRecord = currentPage * recordsPerPage
  // const indexOfFirstRecord = indexOfLastRecord - recordsPerPage
  // const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord)
  // const nPages = Math.ceil(pages / recordsPerPage)

  const getShows = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/discover/tv",
      options
    );
    const shows = await data.json();
    setShows(shows.results);
    setSearchShows(true)
    setSearchMovies(false)
    setMovies([])
    setPages(shows.total_pages)
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
    const data = await fetch(
      `https://api.themoviedb.org/3/discover/movie?page=${currentPage}`,
      options
    );
    const movies = await data.json();
    setShows([]);
    setSearchMovies(true)
    setSearchShows(false)
    setPages(movies.total_pages)
    setMovies(movies.results);
  };

  // useEffect(() => {
  //   getMovies()
  // }, [currentPage])

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
    if (searchMovies) {
      const data = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${search}`,
        options
      );
      const movies = await data.json();
      setMovies(movies.results);
    } if (searchShows)  {
      const data = await fetch(
        `https://api.themoviedb.org/3/search/tv?query=${search}`,
        options
      );
      const shows = await data.json();
      setShows(shows.results);
    }}
  

  useEffect(() => {
    getSearchMovies();
  }, [search]);

  // const getFilteredMovies = async () => {
  //   const data = await fetch(`https://api.themoviedb.org/3/discover/movie?with_genres=${filter}`, options)
  //   const movies = await data.json()
  //   setMovies(movies.results)
  //   console.log(movies)
  // }

  // useEffect(() => {
  //   getFilteredMovies()
  // }, [filter])

  // const router = createBrowserRouter(createRoutesFromElements(
  //   <Route exact path="/" element={<App />}>
  //     <Route path=":filter" element={<Filters />} />
  //     <Route path=":search" element={<SearchBar />} />
  //     <Route path="movies" element={<Movies />} />
  //   </Route>,
  // ))

  return (
    <>
      <Header
        getShows={getShows}
        getMovies={getMovies}
        movies={movies}
        shows={shows}
      />
      <SearchBar
        setSearch={setSearch}
        setSelectedFilters={setSelectedFilters}
      />
      {!!filters && (
        <Filters
          filters={filters}
          setSelectedFilters={setSelectedFilters}
          selectedFilters={selectedFilters}
          setSearch={setSearch}
        />
      )}
      {/* <RouterProvider router={router} />  */}
      <Movies movies={movies} shows={shows} />
      {/* <Pagination currentPage={currentPage} nPages={nPages} setCurrentPage={setCurrentPage} /> */}
    </>
  );
}

export default App;
