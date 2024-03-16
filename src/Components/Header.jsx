import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import DeleteIcon from '@mui/icons-material/Delete';

const Header = ({getMovies, getShows, movies, shows}) => {

    return (
        <div className='flex w-full text-[4vh] bg-blue-950 py-2 mb-4 font-bold text-white shadow-lg font-[Montserrat]'>
            {/* <img src="./src/assets/dopamine.png" alt="Dopamine Dumpster Logo" className="h-20 w-" /> */}
        <span className='mx-auto'>Dopamine Dumpster</span>
        {/* {(movies.length > 0) ? <button className='mx-auto text-red-600 ' onClick={getMovies} >Movies</button> : <button className='mx-auto hover:text-red-600' onClick={getMovies} >Movies</button>}
        {(shows.length > 0) ? <button className='mx-auto text-green-500' onClick={getShows} >Shows</button> : <button className='mx-auto hover:text-green-500' onClick={getShows} >Shows</button>} */}
        </div>
    )
}

export default Header