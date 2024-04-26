import { HashLink } from 'react-router-hash-link';
import PetManager from './PetManager';
import HomeIcon from '@mui/icons-material/Home';
import AboutIcon from '@mui/icons-material/EmojiEmotions';
import ProjectIcon from '@mui/icons-material/FolderCopy';
import Link from '@mui/joy/Link';

const Header = () => {

    return (
        <header className='header'>
            <nav className='header-nav'>
                <ul>
                    <li className="home-link">
                        <Link
                            underline='none'
                            href='/'
                        >
                            <HomeIcon className='icon' />Home
                        </Link>
                    </li>
                    <li className="logo">
                        <Link
                            underline='none'
                            href='/'
                        >
                            Marie Huang
                        </Link>
                    </li>
                    <li><HashLink
                        to="/#about"
                    >
                        <AboutIcon className='icon' />About
                    </HashLink>
                    </li>
                    <li><HashLink
                        to="/#projects"
                    >
                        <ProjectIcon className='icon' />Works
                    </HashLink>
                    </li>
                    <li
                        className="pet-link">
                        <div className='nav-pet-btn mobile'><PetManager /></div>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;