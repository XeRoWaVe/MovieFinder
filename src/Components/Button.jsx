import React from 'react'

function Button({selected, idx, filter, handleFilterButtonClick}) {
    
  return (
    <>
   {selected?.includes(filter.id) ? <button key={idx} onClick={() => handleFilterButtonClick(filter.id)} className={` border-2 rounded-lg p-2 m-2 bg-red-300 hover:bg-blue-300 hover:shadow-black hover:bg-red-700 hover:shadow-sm active:translate-y-[2px] active:outline-offset-4 active:shadow-none active:border active:border-black`}>
    <h3>{filter.name}</h3>
</button> : <button key={idx} onClick={() => handleFilterButtonClick(filter.id)} className={`border-2 rounded-lg p-2 m-2 bg-blue-400 hover:bg-red-300 hover:shadow-black hover:shadow-sm active:translate-y-[2px] active:outline-offset-4 active:shadow-none active:border active:border-black `}>
    <h3>{filter.name}</h3>
</button>}
    </>
  )
}

export default Button