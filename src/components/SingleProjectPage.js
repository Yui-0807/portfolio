import { useEffect, useState } from "react"
import { HashLink } from 'react-router-hash-link';
import { useNavigate, useParams } from "react-router"
import ProjectCards from "./ProjectCards"
import loading from "../images/cat-pet-hover.gif"
import Skeleton from '@mui/material/Skeleton';
// import Loading from "./Loading";
import Toolkits from "./singleProjectSection/Toolkits";
import Overview from "./singleProjectSection/Overview";
import Insights from "./singleProjectSection/Insights";
import Highlights from "./singleProjectSection/Highlights";


const SingleProjectPage = ({ restBase }) => {
    const { id } = useParams()
    const restPathPost = restBase + `posts/${id}`
    const restPathPostACF = restBase + `posts/${id}?embed&acf_format=standard`
    const restPathMedia = restBase + `media?parent=${id}`

    const [restData, setData] = useState([])
    const [restDataACF, setDataACF] = useState([])
    const [media, setMedia] = useState([]);
    const [isLoaded, setLoadStatus] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(restPathPost)
            if (response.ok) {
                const data = await response.json()
                setData(data)
                setLoadStatus(true)
            } else {
                setLoadStatus(false)
            }
        }
        fetchData()
    }, [restPathPost])

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(restPathPostACF)
            if (response.ok) {
                const data = await response.json()
                setDataACF(data)
                setLoadStatus(true)
            } else {
                setLoadStatus(false)
            }
        }
        fetchData()
    }, [restPathPost])

    useEffect(() => {
        const fetchMedia = async () => {
            const response = await fetch(restPathMedia);
            if (response.ok) {
                const data = await response.json();
                setMedia(data);
            } else {
                setLoadStatus(false)
            }
        };

        fetchMedia();
    }, [restPathMedia]);

    const getMedia = (mediaId) => {
        const image = media.find(image => image.id === mediaId);
        return image ? image.guid.rendered : "";
    };

    const getMediaAlt = (mediaId) => {
        const image = media.find(image => image.id === mediaId);
        return image ? image.alt_text : "";
    };

    const scrollToTop = () => {
            window.scrollTo({
                top: 0
            });
        };
        scrollToTop();

    return (
        <>
            {isLoaded && Object.keys(restData).length > 0 && Object.keys(restDataACF).length > 0 &&
                <main className="single-project">
                    <h1 id="title">{restData.title.rendered}</h1>
                    <div className="single-project-banner">
                        {restDataACF.acf.banner_image ? <img
                            key={restData.acf.banner_image}
                            src={restDataACF.acf.banner_image}
                            alt="banner"
                        /> : <Skeleton variant="rectangular" height={480} />
                        }
                        <div className="overlay"></div>
                        
                    </div>

                    <div className="single-project-buttons">
                            <a href={restData.acf.live_site} target="_blank">Live Site</a>
                            <a href={restData.acf.github} target="_blank">GitHub</a>
                        </div>

                    <Toolkits restBase={restBase} id={restData.id} />

                    <div className="single-project-container">
                        <nav className="single-project-nav">
                            <ul>
                                <li>
                                    <HashLink
                                        to={`/projects/${id}#overview`}
                                    >
                                        <div className="single-project-nav-item">
                                            <span>Overview</span>
                                        </div>
                                    </HashLink>
                                </li>
                                <li>
                                    <HashLink
                                        to={`/projects/${id}#highlights`}
                                    >
                                        <div className="single-project-nav-item">
                                            <span>Highlights</span>
                                        </div>
                                    </HashLink>
                                </li>
                                <li>
                                    <HashLink
                                        to={`/projects/${id}#insights`}
                                    >
                                        <div className="single-project-nav-item">
                                            <span>Insights</span>
                                        </div>
                                    </HashLink>
                                </li>
                            </ul>
                        </nav>
                        <div className="single-project-content">
                            
                            <Overview restBase={restBase} id={restData.id} />
                            <Highlights restBase={restBase} id={restData.id} />
                            <Insights restBase={restBase} id={restData.id} />
                        </div>
                    </div>
                </main>
            }
            <ProjectCards restBase={restBase} id={restData.id} />
        </>
    )
}

export default SingleProjectPage;