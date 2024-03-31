import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import SingleProjectPage from "./SingleProjectPage"
import Spinner from 'react-bootstrap/Spinner';


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
                    <h2 id="projects">Projects</h2>
                    {restDataPost.map(post => (
                        <section key={post.id} className="project" onClick={() => {
                            navigate(`/projects/${post.id}`)
                        }}>
                            <div class="image-container">
                                {post.featured_media && post._embedded['wp:featuredmedia'][0] && (
                                    <img
                                        src={post._embedded['wp:featuredmedia'][0].source_url}
                                        alt={post.title.rendered}
                                        className="featured-image"
                                    />
                                )}
                                <div class="overlay"></div>
                                <div class="content-details fadeIn-top">
                                    <h3>This is a title</h3>
                                    <p>This is a short description</p>
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
                : <Spinner animation="border" />}
        </>
    )
}

export default Projects;