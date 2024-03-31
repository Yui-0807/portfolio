import { useEffect, useState } from "react"
import { HashLink } from 'react-router-hash-link';
import { useNavigate, useParams } from "react-router"
import ProjectCards from "./ProjectCards"
import Spinner from 'react-bootstrap/Spinner';


const SingleProjectPage = ({ restBase }) => {
    const { id } = useParams()

    const restPathPost = restBase + `posts/${id}?_embed`
    const restPathMedia = restBase + `media?parent=${id}`

    const [restData, setData] = useState([])
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

    return (
        <>
            {isLoaded ?
                <>
                    {Object.keys(restData).length > 0 &&
                        <main className="single-project">
                            <h1>{restData.title.rendered}</h1>
                            <div className="single-project-banner">
                                <img
                                    key={restData.acf.banner_image}
                                    src={getMedia(restData.acf.banner_image)}
                                    alt={getMediaAlt(restData.acf.banner_image)}
                                />
                                {/* <Skeleton variant="rounded" animation="wave" width={514} height={240}/> */}
                                <div className="single-project-buttons">
                                    <div><a href={restData.acf.live_site}>Live Site</a></div>
                                    <div><a href={restData.acf.github}>GitHub</a></div>
                                </div>
                            </div>

                            <div className="single-project-toolkit">
                                <span>Toolkit</span>
                                <ul>
                                    {restData._embedded['wp:term'] && restData._embedded['wp:term'].map(termArray => (
                                        termArray
                                            .filter(term => term.taxonomy === 'category')
                                            .map(category => (
                                                <li key={category.id}>{category.name}</li>
                                            ))
                                    ))}
                                </ul>
                            </div>
                            <div className="single-project-container">
                                <nav className="single-project-nav">
                                    <ul>
                                        <li>
                                            <HashLink
                                                to={`/projects/${id}#overview`}
                                                scroll={(el) => el.scrollIntoView({ behavior: 'smooth', block: 'start' })}>
                                                <div className="single-project-nav-item">
                                                <span>Overview</span>
                                                </div>
                                            </HashLink>
                                        </li>
                                        <li>
                                            <HashLink
                                                to={`/projects/${id}#highlights`}
                                                scroll={(el) => el.scrollIntoView({ behavior: 'smooth', block: 'start' })}>
                                                <div className="single-project-nav-item">
                                                <span>Highlights</span>
                                                </div>
                                            </HashLink>
                                        </li>
                                        <li>
                                            <HashLink
                                                to={`/projects/${id}#insights`}
                                                scroll={(el) => el.scrollIntoView({ behavior: 'smooth', block: 'start' })}>
                                                <div className="single-project-nav-item">
                                                <span>Insights</span>
                                                </div>
                                            </HashLink>
                                        </li>
                                    </ul>
                                </nav>
                                <div className="single-project-content">
                                    <section id="overview" className="single-project-overview">
                                        <h2 >Overview</h2>
                                        <p>{restData.acf.overview}</p>
                                    </section>
                                    <section id="highlights" className="single-project-highlights">
                                        <h2 >Highlights</h2>
                                        {restData.acf.highlights.map(highlight => (
                                            <div className="highlight-item">
                                                <img key={highlight.highlight_image}
                                                    src={getMedia(highlight.highlight_image)}
                                                    alt={getMediaAlt(highlight.highlight_image)} />
                                                <p>{highlight.highlight_content}</p>
                                            </div>
                                        ))}
                                    </section>
                                    <section id="insights" className="single-project-insights">
                                        <h2 >Insights</h2>
                                        <p>{restData.acf.insights}</p>
                                    </section>
                                </div>
                            </div>
                        </main>}
                    <ProjectCards restBase={restBase} id={restData.id} />
                </> : <Spinner animation="border" />}
        </>
    )
}

export default SingleProjectPage;