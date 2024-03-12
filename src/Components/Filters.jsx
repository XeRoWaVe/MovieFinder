import Select from "react-select";
import { useState } from "react";
import Button from "./Button";

const Filters = ({ filters, setSelectedFilters, selectedFilters }) => {
    const [selected, setSelected] = useState(false);
    const [style, setStyle] = useState({});
  // const [selected, setSelected] = useState([]);
  // const [options, setOptions] = useState(
  //   filters.map((filter) => ({
  //     value: filter.id,
  //     label: filter.name,
  //   }))
  // );

  //  const handleClick = (filter) => {
  //     setFilter((prev) => ([...prev, filter.id])
  //     )}

  const handleClear = () => {
    setSelectedFilters([]);
  };

  // const options = filters.map((filter) => ({
  //     value: filter.id,
  //     label: filter.name
  // }))
  const handleFilterButtonClick = (selectedFilter) => {
    if (selectedFilters.includes(selectedFilter)) {
      let filters = selectedFilters.filter((filter) => filter !== selectedFilter);
      setSelectedFilters(filters);
    } else {
      setSelectedFilters((prev) => [...prev, selectedFilter]);
    }
 
  }

  return (

    <>
    <div className="flex justify-center">
      
      {/* <Select isMulti options={options} isClearable onChange={handleClick}/> */}
      {filters.map((filter, idx) => (
            // <button key={idx} onClick={() => handleFilterButtonClick(filter.id)} className={`${selectedFilters?.includes(filter) ? 'required:bg-red-600' : ''}border-2 rounded-lg p-2 m-2 bg-blue-400 hover:bg-blue-300 hover:shadow-black hover:shadow-sm active:translate-y-[2px] active:outline-offset-4 active:shadow-none active:border active:border-black`}>
            //     <h3>{filter.name}</h3>
            // </button>
            <Button key={idx} selected={selectedFilters} idx={idx} filter={filter} handleFilterButtonClick={handleFilterButtonClick}/>
        ))}
            
    </div>
    <div className="flex justify-center">
      <button className="border-2 p-2 px-10 m-2 rounded-2xl hover:translate-y-[2px] hover:shadow-sm hover:shadow-black active:translate-y-[4px] active:shadow-none" onClick={handleClear}>Clear All Selections</button>
      </div>
    </>
  );
};

export default Filters;
