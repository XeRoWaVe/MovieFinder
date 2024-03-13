import { useState } from "react";

const SearchBar = ({setSearch, setSelectedFilters}) => {
  const [input, setInput] = useState("");

  const handleClick = () => {
    setSearch(input);
    setSelectedFilters('')
    setTimeout(() => {
      setInput('')
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
          className="border-2 shadow-lg rounded-2xl w-[50vw] h-[5vh] p-3"
        />
        <button onClick={handleClick} className="bg-blue-400 rounded-2xl p-3 h-[5vh] left-[890px] absolute active:translate-y-[2px] hover:shadow-sm hover:shadow-black active:bg-blue-700">Search</button>
      </div>
    </div>

    </>
  );
};

export default SearchBar;
