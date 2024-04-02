import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router"
import SingleProjectPage from "./SingleProjectPage"
import { motion, useScroll, useTransform } from "framer-motion";
import Spinner from 'react-bootstrap/Spinner';


const Projects = ({ restBase }) => {


    const restPathPosts = restBase + 'posts?_embed'
    const navigate = useNavigate()
    const [restDataPost, setDataPost] = useState([])
    const [isLoaded, setLoadStatus] = useState(false)
    const refs = useRef([null, null, null, null])

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

    const { scrollYProgress } = useScroll({
        // target: refs,
        // offset: ["0 1", " 1.33 1"],
        // layoutEffect: false // Add this option
    })

    const lBg = useTransform(
        scrollYProgress, [0, 1], ["0", "-20%"]
    )
    const rBg = useTransform(
        scrollYProgress, [0, 0.25], ["100%", "0%"]
    )

    return (
        <>
            {isLoaded ?
                <div className="projects">
                    <h2 id="projects">Projects</h2>
                    {restDataPost.map((post, index) => (
                        <motion.section
                            ref={el => refs.current[index] = el}
                            key={post.id}
                            animate={{ opacity: 1 }} // Animate opacity to 1 for fade-in effect
                            initial={{ opacity: 0 }} // Set initial opacity to 0
                            transition={{ duration: 0.5 }} // Set transition duration
                            className={`project ${index % 2 === 0 ? '' : 'reverse-columns'}`}
                            onClick={() => {
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
                        </motion.section>
                    ))}
                </div>
                : <Spinner animation="border" />}
        </>
    )
}

export default Projects;