import React, { useEffect, useRef } from 'react'
import { useDraggable } from 'react-use-draggable-scroll'


function Movies({movies}) {
  // const ref = useRef(null)
  // const {events} = useDraggable(ref)
  const uriCoded = encodeURIComponent(movies.title)



  return (
    <div className='grid grid-cols-10 mt-[20px]'>
        {movies.map((movie) => (
            <div className='m-2' key={movie.id}>
                <a href={`https://themoviedb.org/movie/${movie.id}-${uriCoded}`} target="_blank"><img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} /></a>
                <span className='flex justify-center line-clamp-1 text-md font-[Montserrat] font-bold tracking-wide'>{movie.title}</span>
            </div>
        ))}
    </div>
  )
}

export default Movies