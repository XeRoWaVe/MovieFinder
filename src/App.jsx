import { useEffect, useState, useRef } from 'react';
import Header from './Components/Header';
import SearchBar from './Components/SearchBar';
import Movies from './Components/Movies';
import Filters from './Components/Filters';
import Pagination from './Components/Pagination';
import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMmNhYWMxM2QzM2FiNGY2NTczZWZhZjc3MmMyNmJjMyIsInN1YiI6IjY1MDA2NjUxMWJmMjY2MDExYzc4MjU4NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mfZLaDd8VJTN9sSVGADmpLH44Ph3Wy-n7U3eAI1y108'
  }
};


function App() {
  const [movies, setMovies] = useState([])
  const [filters, setFilters] = useState([])
  const [selectedFilters, setSelectedFilters] = useState([])
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [recordsPerPage, setRecordsPerPage] = useState(10)
  const [data, setData] = useState([])



  const encodedFilter = selectedFilters.map((f) => encodeURIComponent(f)).join(',')

  // console.log(encodedFilter)
  console.log(filters)
  // console.log(data)

  // const indexOfLastRecord = currentPage * recordsPerPage
  // const indexOfFirstRecord = indexOfLastRecord - recordsPerPage
  // const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord)
  // const nPages = Math.ceil(data.total_pages / recordsPerPage)

  const getFilters = async () => {
      const data = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options)
      const filters = await data.json()
      setFilters(filters.genres)
  }

  useEffect(() => {
      getFilters()
  }, []) 

  const getMovies = async () => {
    const data = await fetch(`https://api.themoviedb.org/3/discover/movie?page=${currentPage}`, options)
    const movies = await data.json()
    setData(movies)
    setMovies(movies.results)}
  
  useEffect(() => {
    getMovies()
  }, [currentPage])

  const filterMovies = async () => {
    const data = await fetch(`https://api.themoviedb.org/3/discover/movie?with_genres=${encodedFilter}`, options)
    const movies = await data.json()
    setMovies(movies.results)
  }


  useEffect(() => {
    filterMovies()
  }, [selectedFilters])

const getSearchMovies = async () => {
  const data = await fetch(`https://api.themoviedb.org/3/search/movie?query=${search}`, options)
  const movies = await data.json()
  setMovies(movies.results)
}

useEffect(() => {
  getSearchMovies()
}, [search])



  // const getFilteredMovies = async () => {
  //   const data = await fetch(`https://api.themoviedb.org/3/discover/movie?with_genres=${filter}`, options)
  //   const movies = await data.json()
  //   setMovies(movies.results)
  //   console.log(movies)
  // }

  // useEffect(() => {
  //   getFilteredMovies()
  // }, [filter])

  return (
    <>
      <Header />
      <SearchBar setSearch={setSearch} setSelectedFilters={setSelectedFilters} />
      {!!filters &&<Filters filters={filters} setSelectedFilters={setSelectedFilters} selectedFilters={selectedFilters}/>}
      <Movies movies={movies} />
      {/* <Pagination currentPage={currentPage} nPages={nPages} setCurrentPage={setCurrentPage} /> */}

    </>
  );
}

export default App;
