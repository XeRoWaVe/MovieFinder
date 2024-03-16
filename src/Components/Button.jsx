import React from "react";

function Button({ selected, idx, filter, handleFilterButtonClick }) {
  return (
    <>
      {selected?.includes(filter.id) ? (
        <button
          key={idx}
          onClick={() => handleFilterButtonClick(filter.id)}
          className={` border-2 rounded-lg p-2 m-2 bg-blue-400 hover:bg-blue-400 shadow-black active:bg-blue-100 shadow-sm active:translate-y-[4px] translate-y-[2px] active:outline-offset-4 hover:shadow-black active:border active:shadow-none `}
        >
          <h3>{filter.name}</h3>
        </button>
      ) : (
        <button
          key={idx}
          onClick={() => handleFilterButtonClick(filter.id)}
          className={`border-2 rounded-lg p-2 m-2 bg-blue-100  hover:shadow-black hover:shadow-sm active:translate-y-[2px] outline-offset-4 active:shadow-none active:border active:border-black `}
        >
          <h3>{filter.name}</h3>
        </button>
      )}
    </>
  );
}

export default Button;
