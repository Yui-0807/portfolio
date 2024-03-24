import { HashLink } from 'react-router-hash-link';
import PetManager from './PetManager';
import HomeIcon from '@mui/icons-material/Home';
import AboutIcon from '@mui/icons-material/EmojiEmotions';
import ProjectIcon from '@mui/icons-material/FolderCopy';

const Header = () => {

    return (
        <header className='header'>
            <nav className='header-nav'>
                <ul>
                    <li className="home-link"><HashLink to="/#" ><HomeIcon className='icon'/>Home</HashLink></li>
                    <li className="logo"><HashLink to="/#" >Marie Huang</HashLink></li>
                    <li><HashLink to="/#about" scroll={(el) => el.scrollIntoView({ behavior: 'smooth', block: 'start' })}><AboutIcon className='icon'/>About</HashLink></li>
                    <li><HashLink to="/#projects" scroll={(el) => el.scrollIntoView({ behavior: 'auto', block: 'start' })}><ProjectIcon className='icon'/>Projects</HashLink></li>
                    <li className="pet-link"><div className='nav-pet-btn mobile'><PetManager /><span>Pet</span></div></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;