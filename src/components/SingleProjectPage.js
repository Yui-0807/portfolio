import { useEffect, useState } from "react"
import { HashLink } from 'react-router-hash-link';
import { useParams } from "react-router"
import ProjectCards from "./ProjectCards"

import Skeleton from '@mui/material/Skeleton';

import Toolkits from "./singleProjectSection/Toolkits";
import Overview from "./singleProjectSection/Overview";
import Insights from "./singleProjectSection/Insights";
import Highlights from "./singleProjectSection/Highlights";
import Loading from "./Loading";


const SingleProjectPage = ({ restBase }) => {
    const { id } = useParams()

    const restPathPostACF = restBase + `posts/${id}?embed&acf_format=standard`

    const [restDataACF, setDataACF] = useState([])
    const [isLoaded, setLoadStatus] = useState(false)

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
    }, [restPathPostACF])

    const scrollToTop = () => {
        window.scrollTo({
            top: 0
        });
    };
    scrollToTop();

    return (
        <>
            {isLoaded ? (
                <>
                    <main className="single-project">
                        <div className="single-project-banner">
                        <h1 id="title">{restDataACF.title.rendered}</h1>
                            {restDataACF.acf.banner_image ? <img
                                key={restDataACF.acf.banner_image}
                                src={restDataACF.acf.banner_image}
                                alt="banner"
                            /> : <Skeleton variant="rectangular" height={480} animation="wave" />
                            }
                        </div>
                        <div className="single-project-buttons-toolkits">
                            <div className="single-project-buttons">
                                <a href={restDataACF.acf.live_site} target="_blank">Live Site</a>
                                <a href={restDataACF.acf.github} target="_blank">GitHub</a>
                            </div>
                            <Toolkits restBase={restBase} id={restDataACF.id} />
                        </div>

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
            ) : (
                <Loading section={'single'} />
            )
            }

        </>
    )
}

export default SingleProjectPage;