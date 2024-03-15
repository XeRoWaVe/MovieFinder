import React, { useEffect, useRef, useState } from "react";
import { useDraggable } from "react-use-draggable-scroll";

function Movies({ movies, shows, setCurrentPage, loading }) {
  const [stickyClass, setStickyClass] = useState("opacity-0");
  // const ref = useRef(null)
  // const {events} = useDraggable(ref)
  const moviesCoded = encodeURIComponent(movies.title);
  const showsCoded = encodeURIComponent(shows.name);

  useEffect(() => {
    window.addEventListener("scroll", stickNavigation);
    return () => {
      window.removeEventListener("scroll", stickNavigation);
    };
  }, [setCurrentPage]);

  const stickNavigation = () => {
    if (window !== undefined) {
      let windowHeight = window.scrollY;
      console.log(windowHeight);
      windowHeight > 80
        ? setStickyClass("opacity-100")
        : setStickyClass("opacity-0");
    }
  };

  const handleClick = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const goToTop = () => {
    window.scrollTo(0, 0);
  };
  // bg-[url(``)]

  return (
    <div className="flex justify-center w-full">
      <div className="">
        <div className="grid grid-cols-10 m-4">
          {movies.length > 0
            ? movies.map((movie) => (
                <div className={`m-3`} key={movie.id}>
                  <a
                    href={`https://themoviedb.org/movie/${movie.id}-${moviesCoded}`}
                    target="_blank"
                  >
                    <img
                      className="rounded-2xl mb-6 shadow-lg hover:shadow-2xl transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                      src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                      alt={movie.title}
                    />
                  </a>
                  <span className="flex justify-center line-clamp-2 text-md font-[Montserrat] font-bold tracking-wide">
                    {movie.title}
                  </span>
                  <span className="flex justify-start m-2 font-[Montserrat]">
                    {movie.release_date}
                  </span>
                </div>
              ))
            : shows.length > 0
            ? shows.map((show) => (
                <div className={`m-3`} key={show.id}>
                  <a
                    href={`https://themoviedb.org/tv/${show.id}-${showsCoded}`}
                    target="_blank"
                  >
                    <img
                      className="rounded-2xl mb-6 shadow-lg hover:shadow-2xl transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                      src={`https://image.tmdb.org/t/p/w500/${show.poster_path}`}
                      alt={show.name}
                    />
                  </a>
                  <span className="flex justify-center line-clamp-2 text-md font-[Montserrat] font-bold tracking-wide">
                    {show.name}
                  </span>
                  <span className="flex justify-start m-2 font-[Montserrat]">
                    {show.first_air_date}
                  </span>
                </div>
              ))
            : ""}
        </div>
        {movies.length > 0 || shows.length > 0 ? (
          <div className="">
            <div className="flex justify-center">
              {!loading ? <button
                className={`bg-blue-500 p-3 transition-opacity ease-in-out duration-700 ${stickyClass} fixed bottom-[10px] rounded-lg hover:shadow-md hover:shadow-black active:shadow-none`}
                onClick={handleClick}
              >
                Load More
              </button> : <button
                className={`bg-blue-500 p-3 fixed transition-opacity ease-in-out duration-700 ${stickyClass} bottom-[10px] rounded-lg hover:shadow-md hover:shadow-black active:shadow-none`}
                onClick={handleClick}
              >
                Loading...
              </button>}
            </div>
            <button
              className={`transition-opacity ease-in-out duration-700 ${stickyClass} bg-blue-400 bottom-[20px] right-[30px] fixed text-[3vh] rounded-lg hover:shadow-md hover:shadow-black active:shadow-none`}
              onClick={goToTop}
            >
              ⩓
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Movies;
