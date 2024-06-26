import { React, useEffect, useState } from "react"
import Skeleton from '@mui/material/Skeleton';
import Loading from "./Loading";
import Link from '@mui/material/Link';

const fetchProjectImage = async (imageId) => {
    try {
        const response = await fetch(
            `https://mariehuang.com/portfolio/wp-json/wp/v2/media/${imageId}`
        );
        if (!response.ok) {
            throw new Error('Failed to fetch project image');
        }
        const imageData = await response.json();
        return imageData;
    } catch (error) {
        console.error(error);
        return null;
    }
};

const ProjectCards = ({ restBase, id }) => {
    const restPath = restBase + 'posts?_embed'

    const [restData, setData] = useState([])
    const [isLoaded, setLoadStatus] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(restPath)
            if (response.ok) {
                const data = await response.json()
                setData(data)
                setLoadStatus(true)
            } else {
                setLoadStatus(false)
            }
        }
        fetchData()
    }, [restPath])

    const [projectImages, setProjectImages] = useState({}); // Store project images by ID

    useEffect(() => {
        const fetchImages = async () => {
            const images = {};
            await Promise.all(
                restData.map(async (project) => {
                    if (project.acf.project_card_image !== "") {
                        const imageData = await fetchProjectImage(project.acf.project_card_image);
                        images[project.id] = imageData;
                    }
                })
            );
            setProjectImages(images);
        };
        fetchImages();
    }, [restData]);

    return (
        <>
            {isLoaded ?
                <section className="other-projects">
                    <div>
                        <h3>See more projects...</h3>
                        <div className="project-cards">

                            {restData.map(project => (
                                id !== project.id && (
                                    project.acf.project_card_image !== "" && (

                                        <Link
                                        key={project.id}
                                        className="project-card"
                                        href={`/projects/${project.id}`}
                                        underline="none"
                                        >
                                            {projectImages[project.id] ?
                                                <img
                                                    src={projectImages[project.id].source_url}
                                                    alt={projectImages[project.id].alt_text}
                                                    loading="lazy"
                                                /> :
                                                <Skeleton variant="rectangular" height={160} />
                                            }
                                            <span className="project-card-title" key={project.id}>{project.title.rendered}</span>
                                            <div className="project-card-toolkit">
                                                <ul>
                                                    {project._embedded['wp:term'] && project._embedded['wp:term'].map(termArray => (
                                                        termArray
                                                            .filter(term => term.taxonomy === 'category')
                                                            .map(category => (
                                                                <li key={category.id}>{category.name}</li>
                                                            ))
                                                    ))}
                                                </ul>
                                            </div>
                                        </Link>
                                    )
                                )
                            ))}

                        </div>
                    </div>
                </section>
                :
                <Loading section={'project-card'} />
            }
        </>
    )
}

export default ProjectCards;

