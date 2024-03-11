import React, { useEffect } from 'react'

function Movies({movies}) {

  return (
    <div className='grid grid-cols-5 mt-[20px]'>
        {movies.map((movie) => (
            <div className='m-2' key={movie.id}>
                <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
                <h3>{movie.title}</h3>
                <p className='line-clamp-3 text-[1vh]'>{movie.overview}</p>
            </div>
        ))}
    </div>
  )
}

export default Movies