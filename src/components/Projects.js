import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router"
import Spinner from 'react-bootstrap/Spinner';
import Skeleton from '@mui/material/Skeleton';
import Loading from "./Loading";

const Projects = ({ restBase }) => {

    const restPathPosts = restBase + 'posts?_embed'
    const navigate = useNavigate()
    const [restDataPost, setDataPost] = useState([])
    const [isLoaded, setLoadStatus] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(restPathPosts)
            if (response.ok) {
                const data = await response.json()
                setDataPost(data)
                setLoadStatus(true)
            } else {
                setLoadStatus(false)
            }
        }
        fetchData()
    }, [restPathPosts])

    
    return (
        <>
            {isLoaded ?
                <div className="projects">
                    <h2 id="projects">Works</h2>
                    {restDataPost.map((post, index) => (
                        <section
                            key={post.id}
                            className={`project ${index % 2 === 0 ? '' : 'reverse-columns'}`}
                            onClick={() => {
                                navigate(`/projects/${post.id}`)
                            }}>
                            <div class="image-container">
                                {post.featured_media && post._embedded['wp:featuredmedia'][0] ?
                                    <img
                                        src={post._embedded['wp:featuredmedia'][0].source_url}
                                        alt={post.title.rendered}
                                        className="featured-image"
                                    /> : <Skeleton variant="rectangular" height={480}/>
                                }
                                <div class="overlay"></div>
                                <div class="content-details fadeIn-top">
                                    <h3>{post.title.rendered}</h3>
                                </div>
                            </div>
                            <div className="project-info">
                                <h3 className="project-title">{post.title.rendered}</h3>
                                <div className='read-more-button' onClick={() => {
                                    navigate(`/projects/${post.id}`)
                                }}>Read More</div>
                            </div>
                        </section>
                    ))}
                </div>
                : <Loading />}
        </>
    )
}

export default Projects;