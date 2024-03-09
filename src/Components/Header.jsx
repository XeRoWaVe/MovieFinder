import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import DeleteIcon from '@mui/icons-material/Delete';

const Header = () => {
    return (
        <span className='w-full cursor-pointer fixed flex justify-center uppercase bg-[#39445a] text-[5vw] pb-[15px] text-white z-100 lg:pt-2 lg:text-[6.4vw] shadow-[0_1px_5px_black] font-[Montserrat]   '><InsertEmoticonIcon fontSize={'large'} />Dopa Dump<DeleteIcon fontSize={'large'} /></span>
    )
}

export default Header