import { useEffect, useState } from "react"
import Skeleton from '@mui/material/Skeleton';
import Loading from "./Loading";


const Projects = ({ restBase }) => {

    const restPathPosts = restBase + 'posts?embed&acf_format=standard'
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
                        
                        <a
                            key={post.id}
                            href={`/projects/${post.id}`}
                            className={`project ${index % 2 === 0 ? '' : 'reverse-columns'}`}
                        >
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
                                <div className='read-more-button'
                                    href={`/projects/${post.id}`}
                                >Read More</div>
                            </div>
                        </a>
                    ))}
                </div>
                :
                <Loading section={'projects'} />
            }
        </>
    )
}

export default Projects;