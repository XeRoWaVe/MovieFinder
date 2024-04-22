import { useState, useRef, useEffect } from "react";
import MovieList from "./MovieList";
import { Movie } from "@mui/icons-material";
import ShowList from "./ShowList";

const SearchBar = ({
  setSearch,
  setSelectedFilters,
  movies,
  shows,
  getMovies,
  getShows,
  searchRef,
  setMovieList,
  movieList,
  setShowList,
  showList
}) => {
  const [input, setInput] = useState("");
  const [listVisible, setListVisible] = useState(false);
  const [showListVisible, setShowListVisible] = useState(false)

  const handleMoviesEnter = () => { // mouse event for movies
    setListVisible(true); 
  };

  const handleMoviesLeave = () => {
    setListVisible(false);
  };

  const handleShowsEnter = () => { // mouse event for shows
    setShowListVisible(true)
  }

  const handleShowsLeave = () => {
    setShowListVisible(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(input);
    setSelectedFilters("");
    setInput("");
  };

  useEffect(() => {
    searchRef.current.focus();
  }, []);
  return (
    <>
      <div className="flex">
        <div
          className="mx-auto flex flex-col"
          onMouseEnter={handleMoviesEnter}
          onMouseLeave={handleMoviesLeave}
        >
          <button
            className="mx-auto float-left  rounded-lg bg-indigo-500 text-white font-bold p-2"
            onClick={getMovies}
          >
            Movies
          </button>
          {listVisible && <MovieList setMovieList={setMovieList} />}
        </div>
          <div className="mx-auto flex flex-col"
            onMouseEnter={handleShowsEnter}
            onMouseLeave={handleShowsLeave}>
              <button
          className="mx-auto float-left bg-indigo-500 text-white font-bold p-2 rounded-lg"
          onClick={getShows}
        >
          Shows
        </button>
        {showListVisible && <ShowList setShowList={setShowList} />}
          </div>

        
      </div>
      {!!movieList ? (
        <div className="flex justify-center">
          <h1 className="bg-indigo-500 cursor-default text-white font-bold p-2">Movie List: {movieList}</h1>
        </div>
      ) : !!showList ? (
        <div className="flex justify-center">
          <h1 className="bg-indigo-500 cursor-default text-white font-bold p-2">Show List: {showList}</h1>
        </div>
      ) : (
        ""
      )}
      <form
        onSubmit={handleSubmit}
        className=" flex items-center justify-center"
      >
        <input
          ref={searchRef}
          type="text"
          placeholder="Search..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border-2 shadow-lg rounded-2xl w-[50vw] h-[5vh] p-3 m-4 bg-stone-50	  hover:shadow-black hover:shadow-md hover:opacity-25 focus:opacity-100 focus:shadow-xl hover:transition-transform "
        />
        {/* <button
          onClick={handleClick}
          className=" border-black rounded-2xl h-[7vh] p-2 bg-stone-50 hover:shadow-sm hover:border-2"
        >
          Search
        </button> */}
      </form>
    </>
  );
};

export default SearchBar;
