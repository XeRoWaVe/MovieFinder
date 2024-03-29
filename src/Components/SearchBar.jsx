import { useState } from "react";

const SearchBar = ({
  setSearch,
  setSelectedFilters,
  movies,
  shows,
  getMovies,
  getShows,
}) => {
  const [input, setInput] = useState("");

  const handleClick = () => {
    setSearch(input);
    setSelectedFilters("");
    setInput("");
  };

  return (
    <>
      <div className="flex">
        {movies.length > 0 ? (
          <button
            className="mx-auto float-left  rounded-lg bg-green-400 p-2"
            onClick={getMovies}
          >
            Movies
          </button>
        ) : (
          <button
            className="mx-auto p-2 active:shadow-none active:bg-green-400 rounded-lg bg-blue-400  hover:shadow-black hover:shadow-sm"
            onClick={getMovies}
          >
            Movies
          </button>
        )}
        {shows.length > 0 ? (
          <button
            className="mx-auto float-left bg-green-400 p-2 rounded-lg"
            onClick={getShows}
          >
            Shows
          </button>
        ) : (
          <button
            className="mx-auto hover:shadow-black hover:shadow-sm p-2 rounded-lg bg-blue-400 active:bg-green-400 active:shadow-none"
            onClick={getShows}
          >
            Shows
          </button>
        )}
      </div>
      <div className=" flex items-center justify-center">
        <input
          type="text"
          placeholder="Search..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border-2 shadow-lg rounded-2xl w-[50vw] h-[5vh] p-3 m-4 bg-stone-50	  hover:shadow-black hover:shadow-md hover:opacity-25 focus:opacity-100 focus:shadow-xl hover:transition-transform "
        />
        <button
          onClick={handleClick}
          className=" border-black rounded-2xl h-[7vh] p-2 bg-stone-50 hover:shadow-sm hover:border-2"
        >
          Search
        </button>
      </div>
    </>
  );
};

export default SearchBar;
