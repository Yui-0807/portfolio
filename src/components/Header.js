
import { HashLink } from 'react-router-hash-link';

const Header = () => {

    return (
        <header>
            <nav>
                <ul>
                    <li><HashLink to="/#">Home</HashLink></li>
                    <li><HashLink to="/#about" scroll={(el) => el.scrollIntoView({ behavior: 'smooth', block: 'start' })}>About</HashLink></li>
                    <li><HashLink to="/#projects" scroll={(el) => el.scrollIntoView({ behavior: 'auto', block: 'end' })}>Projects</HashLink></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;