import Header from "./Header"
import SearchBar from "./SearchBar"
import SimpleBottomNavigation from "./Nav"

const MovieFinder = () => {
    return (
        <>
        <div className='min-h-screen bg-[#39445a] text-white'>
            <Header />
            <div className="pb-[70px] pt-[130px]">Test</div>
        </div>
        <SimpleBottomNavigation />
        </>
    )
}

export default MovieFinder