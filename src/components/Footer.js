import { HashLink } from 'react-router-hash-link';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';

const Footer = () => {
    return (
        <footer className="footer">
            <nav>
                <div className='left'>
                    <li className="logo"><HashLink to="/#" >Marie Huang</HashLink></li>
                    <p className='copyright'>&copy;2023 Marie Huang</p>
                </div>
                <div className='right'>
                    <li>
                        <a href="https://linkedin.com/in/mariehuangdev" target="_blank" ><LinkedInIcon />
                            <span className="icon-label">linkedin.com/in/mariehuangdev</span>
                        </a>
                    </li>
                    <li>
                        <a href="https://github.com/Yui-0807" target="_blank"><GitHubIcon />
                            <span className="icon-label">github.com/Yui-0807</span>
                        </a>
                    </li>
                    <li>
                        <a href="mailto:marieutee@gmail.com" ><EmailIcon />
                            <span className="icon-label">marieutee@gmail.com</span>
                        </a>
                    </li>
                </div>

            </nav >

        </footer >
    )
}

export default Footer;