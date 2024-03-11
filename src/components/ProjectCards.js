import { useEffect, useState } from "react"
import { useNavigate } from "react-router"

const ProjectCards = ({ restBase, id }) => {
    const restPath = restBase + 'posts?_embed'
    const restPathMedia = restBase + 'media'

    const navigate = useNavigate()

    const [restData, setData] = useState([])
    const [media, setMedia] = useState([]);
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
        <section>
            <h3>See more projects...</h3>

            {restData.map(project => (
                id !== project.id && (
                    <div
                        key={project.id}
                        className="product-card"
                        onClick={() => {
                            navigate(`/projects/${project.id}`)
                        }}>

                        <span className="project-card-title" key={project.id}>{project.title.rendered}</span>
                        <img src={getMedia(project.acf.project_card_image)} alt={getMediaAlt(project.acf.project_card_image)} />
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
                    </div>
                )
            ))}

        </section>
    )
}

export default ProjectCards;