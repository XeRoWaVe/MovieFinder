const Filters = ({filters, setFilter}) => {

 

  return (
    <div className="flex justify-center">
        {filters.map((filter) => (
            <button key={filter.id} onClick={() => setFilter(filter.id)} className="border-2 rounded-lg p-2 m-2 bg-blue-400 hover:bg-blue-300 hover:shadow-black hover:shadow-sm active:translate-y-[2px] active:outline-offset-4 active:shadow-none active:border active:border-black">
                <h3>{filter.name}</h3>
            </button>
        ))}
    </div>
  );
}

export default Filters;