import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import ProjectCards from "./ProjectCards"

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
            {Object.keys(restData).length > 0 && 
            <main>
                <h1>{restData.title.rendered}</h1>
                <div dangerouslySetInnerHTML={{ __html: restData.content.rendered }}></div>
                <div className="single-project-toolkit">
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
                <section className="single-project-overview">
                    <h2>Overview</h2>
                    <p>{restData.acf.overview}</p>
                </section>
                <section className="single-project-highlights">
                    <h2>highlights</h2>
                    {restData.acf.highlights.map(highlight => (
                        <div>
                            <img key={highlight.highlight_image} src={getMedia(highlight.highlight_image)} alt={getMediaAlt(highlight.highlight_image)} />
                            <p>{highlight.highlight_content}</p>
                        </div>
                    ))}
                </section>
                <section className="single-project-insights">
                    <h2>Insights</h2>
                    <p>{restData.acf.insights}</p>
                </section>

            </main>}
            <ProjectCards restBase={restBase} id={restData.id}/> 
        </>
    )
}

export default SingleProjectPage;