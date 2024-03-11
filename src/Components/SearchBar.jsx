import { useState } from "react";

const SearchBar = ({setSearch, setFilter}) => {
  const [input, setInput] = useState("");

  const handleClick = () => {
    setSearch(input);
    setFilter('')
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
        <button onClick={handleClick} className="bg-blue-300 rounded-2xl p-3 h-[5vh] left-[890px] absolute hover:bg-red-400 hover:shadow-inner">Search</button>
      </div>
    </div>

    </>
  );
};

export default SearchBar;
