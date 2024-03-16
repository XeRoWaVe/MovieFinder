import Select from "react-select";
import { useState } from "react";
import Button from "./Button";

const Filters = ({
  filters,
  setSelectedFilters,
  selectedFilters,
  setSearch,
}) => {
  const handleClear = () => {
    setSelectedFilters([]);
  };

  const handleFilterButtonClick = (selectedFilter) => {
    if (selectedFilters.includes(selectedFilter)) {
      let filters = selectedFilters.filter(
        (filter) => filter !== selectedFilter
      );
      setSelectedFilters(filters);
    } else {
      setSelectedFilters((prev) => [...prev, selectedFilter]);
    }
  };

  return (
    <>
      <div className="flex justify-center">
        {filters.map((filter, idx) => (
          <Button
            key={idx}
            selected={selectedFilters}
            idx={idx}
            filter={filter}
            handleFilterButtonClick={handleFilterButtonClick}
          />
        ))}
      </div>
      <div className="flex justify-center">
        <button
          className="border-2 p-2 px-10 m-2 rounded-2xl hover:translate-y-[2px] hover:shadow-sm hover:shadow-black active:translate-y-[4px] active:shadow-none"
          onClick={handleClear}
        >
          Clear All Selections
        </button>
      </div>
    </>
  );
};

export default Filters;
