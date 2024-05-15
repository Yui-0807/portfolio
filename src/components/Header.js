import { HashLink } from 'react-router-hash-link';
import PetManager from './PetManager';
import HomeIcon from '@mui/icons-material/Home';
import AboutIcon from '@mui/icons-material/EmojiEmotions';
import ProjectIcon from '@mui/icons-material/FolderCopy';
import Link from '@mui/material/Link';
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from 'react';

const Header = () => {

    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(false);

    useMotionValueEvent(scrollY, "change", (lastest) => {
        const prev = scrollY.getPrevious();
        if (lastest > prev && lastest > 150) {
            setHidden(true)
        } else {
            setHidden(false)
        }
    })

    return (
        <motion.header
            variants={{
                visible: { y: 0 },
                hidden: { y: "-100%" },
                transition: {
                    duration: 0.35,
                    ease: "easeInOut"
                }

            }}
            animate={hidden ? "hidden" : "visible"}
            // transition={{ duration: 0.35, ease: "easeInOut" }}
            className='header'>
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
        </motion.header>
    )
}

export default Header;