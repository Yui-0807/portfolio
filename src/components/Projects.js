import { useEffect, useState } from "react"
import { useNavigate } from "react-router"

const Projects = ({ restBase,featuredImage }) => {


    const restPathPost = restBase + 'posts?_embed'
    const navigate = useNavigate()
    const [restDataPost, setDataPost] = useState([])
    const [isLoaded, setLoadStatus] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(restPathPost)
            if (response.ok) {
                const data = await response.json()
                setDataPost(data)
                setLoadStatus(true)
            } else {
                setLoadStatus(false)
            }
        }
        fetchData()
    }, [restPathPost])

    return (

        <section>

            {restDataPost.map(post => (
                <section key={post.id}>
                    <h2>{post.title.rendered}</h2>
                    
                        {/* {post._embedded['wp:featuredmedia'][0]} */}
                        {post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0] && (
                            <img
                                src={post._embedded['wp:featuredmedia'][0].source_url}
                                alt={post.title.rendered}
                                
                            />
                        )}
                    <div className='read-more-button' onClick={() => {
                        navigate(`/projects/${post.slug}`)
                    }}>Read More</div>
                </section>
            ))}
        </section>

    )
}

export default Projects;