import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import Skeleton from '@mui/material/Skeleton';
import Loading from "./Loading";


const Projects = ({ restBase }) => {

    const restPathPosts = restBase + 'posts?embed&acf_format=standard'
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

                                {post.acf.screen_video ?
                                    <video
                                        src={post.acf.screen_video}
                                        title={post.title.rendered}
                                        autoPlay
                                        muted
                                        loop
                                        loading="lazy"
                                    /> : <Skeleton variant="rectangular" width='100%' height={390} />
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
                :
                <Loading section={'projects'}/>
            }
        </>
    )
}

export default Projects;