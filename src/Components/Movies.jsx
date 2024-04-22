import React, { useEffect, useState } from "react";

function Movies({ movies, shows, setCurrentPage, loading, setDetails }) {
  const [stickyClass, setStickyClass] = useState("opacity-0");
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
                <div
                  key={movie.id}
                  className="relative rounded-2xl flex justify-center items-center p-2 m-2"
                >
                  <div className="bg-gray-300 rounded-2xl shadow-inner shadow-black">
                    <button
                      onClick={() =>
                        setDetails({
                          id: movie.id,
                          title: movie.title,
                          date: movie.release_date,
                          overview: movie.overview,
                          poster: movie.poster_path,
                          backdrop: movie.backdrop_path,
                        })
                      }
                      // href={`https://themoviedb.org/movie/${movie.id}-${moviesCoded}`}
                      target="_blank"
                    >
                      <img
                        className="rounded-2xl z-10 shadow-lg hover:shadow-2xl transition duration-500 ease-in-out transform hover:scale-100
                      active:translate-y-[4.7rem]"
                        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                        alt={movie.title}
                      />
                    </button>
                    <span className="flex justify-center z-10 p-1 line-clamp-1 text-wrap text-lg text-md font-bold ">
                      {movie.title}
                    </span>
                    <span className="flex justify-center z-10 p-1 font-bold font-[Montserrat]">
                      {movie.release_date}
                    </span>
                  </div>
                </div>
              ))
            : shows.length > 0
            ? shows.map((show) => (
                <div className="relative rounded-2xl flex justify-center items-center p-2 m-2">
                  <div className={``} key={show.id}>
                    <button
                      onClick={() =>
                        setDetails({
                          id: show.id,
                          title: show.name,
                          date: show.first_air_date,
                          overview: show.overview,
                          poster: show.poster_path,
                          backdrop: show.backdrop_path,
                        })
                      }
                      target="_blank"
                    >
                      <img
                        className="rounded-2xl mb-6 shadow-lg hover:shadow-2xl transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 active:translate-y-[5.2rem] active:scale-130"
                        src={`https://image.tmdb.org/t/p/w500/${show.poster_path}`}
                        alt={show.name}
                      />
                    </button>
                    <span className="flex justify-center z-10 p-1 line-clamp-1 text-lg text-md font-bold ">
                      {show.name}
                    </span>
                    <span className="flex justify-center z-10 p-1 font-bold font-[Montserrat]">
                      {show.first_air_date}
                    </span>
                  </div>
                </div>
              ))
            : ""}
        </div>
        {movies.length > 0 || shows.length > 0 ? (
          <div className="">
            <div className="flex justify-center">
              {!loading ? (
                <button
                  className={` p-3 transition-opacity ease-in-out duration-700 ${stickyClass} fixed bottom-[10px] hover:shadow-md hover:shadow-black active:shadow-none text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900`}
                  onClick={handleClick}
                >
                  Load More
                </button>
              ) : (
                <button
                  disabled
                  type="button"
                  class="fixed bottom-[10px] hover:shadow-md hover:shadow-black active:shadow-none text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                >
                  <svg
                    aria-hidden="true"
                    role="status"
                    class="inline h-4 me-3 text-gray-200 animate-spin dark:text-gray-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="#1C64F2"
                    />
                  </svg>
                  Loading...
                </button>
              )}
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
