import { useEffect, useState } from "react"

const About = ({ restBase, restDataPage }) => {

    const restPathMedia = restBase + 'media'

    const [filteredCategories, setFilteredCategories] = useState([]);
    const [media, setMedia] = useState([]);
    const [filterCriterion, setFilterCriterion] = useState("Programming");
    const [isLoaded, setLoadStatus] = useState(false)

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

    const filterCategories = (criterion) => {

        const restPathCategories = `${restBase}categories?parent=${criterion === "Programming" ? 13 : (criterion === "Design" ? 14 : (criterion === "CMS/E-commerce" ? 15 : ''))}`;

        const fetchCategories = async () => {
            const response = await fetch(restPathCategories);
            if (response.ok) {
                const data = await response.json();

                setFilteredCategories(data);
                setFilterCriterion(criterion);
            } else {
                console.error("Failed to fetch categories data");
            }
        };
        fetchCategories();
    }

    return (
        <article className='about' id="about">
            <section className="about-content">
                <h2>About me</h2>
                {restDataPage.map(data => (
                    <p >{data.acf.who_i_am}</p>
                ))}
            </section>

            <section className="skill-container">
                <h2>Skills</h2>
                <div className="skill-btn-container">
                    <button onClick={() => filterCategories("Programming")} className={filterCriterion === "Programming" ? "active" : ""}>Programming</button>
                    <button onClick={() => filterCategories("Design")} className={filterCriterion === "Design" ? "active" : ""}>Design</button>
                    <button onClick={() => filterCategories("CMS/E-commerce")} className={filterCriterion === "CMS/E-commerce" ? "active" : ""}>CMS/E-commerce</button>
                </div>
                <ul className="skill-list">
                    {filteredCategories.map(skills => (
                        <li key={skills.id}>{skills.name}</li>
                    ))}
                </ul>
            </section>

            <section className="other-gallery">
                <h2>Other things I enjoy...</h2>
                {restDataPage.map(data => (
                    <div className="gallery-images">{data.acf.other_things_i_enjoy.map(image => (
                        <img key={image} src={getMedia(image)} alt={getMediaAlt(image)} />
                    ))}</div>
                ))}
            </section>
        </article>
    )
}

export default About;