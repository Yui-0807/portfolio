import { Link, NavLink } from "react-router-dom";

const Header = () => {
    const scrollToSection = (id) => {
        const article = document.getElementById(id)
        if (article) {
            article.scrollIntoView({ behavior: "smooth" })
        }
    }
    return (
        
        <nav>
            <ul>
                <li><a href="/">Home</a></li>
                <li onClick={() => scrollToSection('about')}>About</li>
                <li onClick={() => scrollToSection('projects')}>Projects</li>
            </ul>
        </nav>
    )
}

export default Header;