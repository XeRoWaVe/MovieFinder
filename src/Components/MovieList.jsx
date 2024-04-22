import React from 'react'

const MovieList = ({setMovieList}) => {

  return (
    <div className="flex flex-col absolute top-[8rem] bg-white rounded-2xl p-2 text-blue-800  font-bold">
    <button className='hover:bg-gray-400 relative' value="popular" onClick={(e) => setMovieList(e.target.value)}>
        Popular
    </button>
    <button className='hover:bg-gray-400 relative' value="top_rated" onClick={(e) => setMovieList(e.target.value)}>
        Top Rated
    </button>
    <button className='hover:bg-gray-400 relative ' value="now_playing" onClick={(e) => setMovieList(e.target.value)}>
        Now Playing
    </button>
    <button className='hover:bg-gray-400 relative' value="upcoming" onClick={(e) => setMovieList(e.target.value)}>
        Upcoming
    </button>
  </div>
  )
}

export default MovieList