import { useEffect, useState } from "react"
import { HashLink } from 'react-router-hash-link';
import { useNavigate, useParams } from "react-router"
import ProjectCards from "./ProjectCards"

import Skeleton from '@mui/material/Skeleton';

import Toolkits from "./singleProjectSection/Toolkits";
import Overview from "./singleProjectSection/Overview";
import Insights from "./singleProjectSection/Insights";
import Highlights from "./singleProjectSection/Highlights";
import Loading from "./Loading";


const SingleProjectPage = ({ restBase }) => {
    const { id } = useParams()
    // const restPathPost = restBase + `posts/${id}`
    const restPathPostACF = restBase + `posts/${id}?embed&acf_format=standard`
    const restPathMedia = restBase + `media?parent=${id}`

    const [restDataACF, setDataACF] = useState([])
    const [media, setMedia] = useState([]);
    const [isLoaded, setLoadStatus] = useState(false)
    const [initialLoad, setInitialLoad] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(restPathPostACF)
            if (response.ok) {
                const data = await response.json()
                setDataACF(data)
                setLoadStatus(true)
                setInitialLoad(true); // Set initial load to true
            } else {
                setLoadStatus(false)
            }
        }
        fetchData()
    }, [restPathPostACF])

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

    const scrollToTop = () => {
        window.scrollTo({
            top: 0
        });
    };
    scrollToTop();

    return (
        <>
            {initialLoad ? (
                <>
                <main className="single-project">
                    <h1 id="title">{restDataACF.title.rendered}</h1>
                    <div className="single-project-banner">

                        {restDataACF.acf.banner_image ? <img
                            key={restDataACF.acf.banner_image}
                            src={restDataACF.acf.banner_image}
                            alt="banner"
                        /> : <Skeleton variant="rectangular" height={480} animation="wave"/>
                        }
                    </div>

                    <div className="single-project-buttons">
                        <a href={restDataACF.acf.live_site} target="_blank">Live Site</a>
                        <a href={restDataACF.acf.github} target="_blank">GitHub</a>
                    </div>

                    <Toolkits restBase={restBase} id={restDataACF.id} />

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

                            <Overview restBase={restBase} id={restDataACF.id} />
                            <Highlights restBase={restBase} id={restDataACF.id} />
                            <Insights restBase={restBase} id={restDataACF.id} />
                        </div>
                    </div>
                </main>
                <ProjectCards restBase={restBase} id={restDataACF.id} />
                </>
                ):(
                <Loading section={'single'} />
                )
            }
            
        </>
    )
}

export default SingleProjectPage;