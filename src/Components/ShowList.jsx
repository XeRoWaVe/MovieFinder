import React from 'react'

const ShowList = ({setShowList}) => {

  return (
    <div className="flex flex-col absolute top-[8rem] bg-white rounded-2xl p-2 text-blue-800  font-bold">
    <button className='hover:bg-gray-400 relative' value="popular" onClick={(e) => setShowList(e.target.value)}>
        Popular
    </button>
    <button className='hover:bg-gray-400 relative' value="top_rated" onClick={(e) => setShowList(e.target.value)}>
        Top Rated
    </button>
    <button className='hover:bg-gray-400 relative ' value="airing_today" onClick={(e) => setShowList(e.target.value)}>
        Airing Today
    </button>
    <button className='hover:bg-gray-400 relative' value="on_the_air" onClick={(e) => setShowList(e.target.value)}>
        On the Air
    </button>
  </div>
  )
}

export default ShowList