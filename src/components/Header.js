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
                    <li><HashLink to="/#"><HomeIcon />Home</HashLink></li>
                    <li><HashLink to="/#about" scroll={(el) => el.scrollIntoView({ behavior: 'smooth', block: 'start' })}><AboutIcon />About</HashLink></li>
                    <li><HashLink to="/#projects" scroll={(el) => el.scrollIntoView({ behavior: 'auto', block: 'start' })}><ProjectIcon />Projects</HashLink></li>
                    <li><div className='nav-pet-btn'><PetManager /><span>Pet</span></div></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;