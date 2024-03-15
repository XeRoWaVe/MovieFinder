import React, { useEffect, useRef } from "react";
import { useDraggable } from "react-use-draggable-scroll";

function Movies({ movies, shows, getMovies, getShows, setCurrentPage}) {
  // const ref = useRef(null)
  // const {events} = useDraggable(ref)
  const moviesCoded = encodeURIComponent(movies.title);
  const showsCoded = encodeURIComponent(shows.name);

  const handleClick = () => {
    setCurrentPage((prev) => prev + 1);
  }

  const goToTop = () => {
    window.scrollTo(0, 0)
  }
  // bg-[url(`https://images.nightcafe.studio/jobs/T1v50zgUbqSNHKaukWxn/T1v50zgUbqSNHKaukWxn--1--e7w59.jpg?tr=w-1600,c-at_max`)]

  return (
    <div className="flex justify-center w-full">
      <div className="">
        <div className="grid grid-cols-10">
          {movies.length > 0
            ? movies.map((movie) => (
                <div className={`m-2`} key={movie.id}>
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
                <div className={`m-2`} key={show.id}>
                  <a
                    href={`https://themoviedb.org/tv/${show.id}-${showsCoded}`}
                    target="_blank"
                  >
                    <img
                      className="rounded-2xl shadow-lg hover:shadow-2xl transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                      src={`https://image.tmdb.org/t/p/w500/${show.poster_path}`}
                      alt={show.name}
                    />
                  </a>
                  <span className="flex justify-center line-clamp-2 text-md font-[Montserrat] font-bold tracking-wide">
                    {show.name}
                  </span>
                </div>
              ))
            : ""}
        </div>
        {(movies.length > 0 || shows.length > 0) ? <div className="flex justify-between">
          <button className="bg-red-500 p-3 rounded-lg hover:shadow-md hover:shadow-black mx-auto active:shadow-none" onClick={handleClick}>Load More</button>
          <button className="bg-blue-400 p-4 rounded-lg hover:shadow-md hover:shadow-black active:shadow-none" onClick={goToTop}>Top</button>
        </div> : ''}
      </div>
    </div>
  );
}

export default Movies;
