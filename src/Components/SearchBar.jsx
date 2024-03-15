import { useState } from "react";

const SearchBar = ({setSearch, setSelectedFilters}) => {
  const [input, setInput] = useState("");

  const handleClick = () => {
    setSearch(input);
    setSelectedFilters('')
    setTimeout(() => {
      setInput('')
      setSearch('')
    }, 1000)
  }

  return (
    <>
    <div className="flex justify-center">
      <div className="relative">
        <input
          type="text"
          placeholder="Search..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border-2 shadow-lg rounded-2xl w-[50vw] h-[5vh] p-3 hover:shadow-black hover:shadow-md hover:opacity-25 focus:opacity-100 focus:shadow-xl hover:transition-transform "
        />
        <button onClick={handleClick} className="bg-blue-400 rounded-2xl p-3 h-[5vh] left-[890px] absolute active:translate-y-[2px] hover:shadow-sm active:bg-blue-700">Search</button>
      </div>
    </div>

    </>
  );
};

export default SearchBar;
