import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import SingleProjectPage from "./SingleProjectPage"

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

        <div className="projects">
            <h2 id="projects">Projects</h2>
            {restDataPost.map(post => (
                <section key={post.id} className="project" onClick={() => {
                    navigate(`/projects/${post.id}`)
                }}>

                    {post.featured_media && post._embedded['wp:featuredmedia'][0] && (
                        <img
                            src={post._embedded['wp:featuredmedia'][0].source_url}
                            alt={post.title.rendered}
                            className="featured-image"
                        />
                    )}
                    <h3 className="project-title">{post.title.rendered}</h3>
                    <div className='read-more-button' onClick={() => {
                        navigate(`/projects/${post.id}`)
                    }}>Read More</div>
                </section>
            ))}
        </div>

    )
}

export default Projects;