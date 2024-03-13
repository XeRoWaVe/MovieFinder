import React, { useEffect, useRef } from "react";
import { useDraggable } from "react-use-draggable-scroll";

function Movies({ movies, shows }) {
  // const ref = useRef(null)
  // const {events} = useDraggable(ref)
  const uriCoded = encodeURIComponent(movies.title);
  console.log(movies)

  // bg-[url(`https://images.nightcafe.studio/jobs/T1v50zgUbqSNHKaukWxn/T1v50zgUbqSNHKaukWxn--1--e7w59.jpg?tr=w-1600,c-at_max`)]

  return (
    <div className="flex justify-center w-full">
      <div className="">
        <div className="grid grid-cols-10">

            {movies.length > 0
            ? movies.map((movie) => (
                <div className="m-2" key={movie.id}>
                  <a
                    href={`https://themoviedb.org/movie/${movie.id}-${uriCoded}`}
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
                  <span className="flex justify-start m-2 font-[Montserrat]">{movie.release_date}</span>
                </div>
              ))
            : shows.length > 0
            ? shows.map((show) => (
                <div className="m-2" key={show.id}>
                  <a
                    href={`https://themoviedb.org/tv/${show.id}-${uriCoded}`}
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
      </div>
    </div>
  );
}

export default Movies;
