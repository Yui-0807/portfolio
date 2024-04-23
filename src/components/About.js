import { useEffect, useState } from "react"
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Loading from "./Loading";

const About = ({ restBase }) => {

    const restPath = restBase + 'pages/25?embed&acf_format=standard'

    const [restData, setData] = useState([])
    const [filteredCategories, setFilteredCategories] = useState([]);
    const [filterCriterion, setFilterCriterion] = useState("Programming");
    const [isLoaded, setLoadStatus] = useState(false)

    useEffect(() => {
        const fetchMedia = async () => {
            const response = await fetch(restPath);
            if (response.ok) {
                const data = await response.json();
                setData(data)
                setLoadStatus(true)
            } else {
                setLoadStatus(false)
            }
        };
        fetchMedia();
        // Call filterCategories with "Programming" as default
        filterCategories("Programming");
    }, [restPath]);

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
        <>
            {isLoaded ?
                <article className='about' id="about">
                    <section className="about-content">
                        <h2>Hi there! I'm Marie </h2>
                        <p >{restData.acf.who_i_am}</p>
                    </section>

                    <section className="skill-container">
                        <h2>Skills</h2>
                        <div className="skill-btn-container">
                            <button
                                onClick={() => filterCategories("Programming")} className={filterCriterion === "Programming" ? "active" : ""} >Programming</button>
                            <button
                                onClick={() => filterCategories("Design")} className={filterCriterion === "Design" ? "active" : ""}>Design</button>
                            <button
                                onClick={() => filterCategories("CMS/E-commerce")} className={filterCriterion === "CMS/E-commerce" ? "active" : ""}>CMS/E-commerce</button>
                        </div>
                        <ul
                            className='skill-list '>
                            {filteredCategories.map(skills => (
                                <li key={skills.id}>{skills.name}</li>
                            ))}
                        </ul>
                    </section>

                    <section className="other-gallery">
                        <h2>Other things I enjoy...</h2>
                        <div className="gallery-images">{restData.acf.other_things_i_enjoy.map(item => (
                            <article className="gallery-item">
                                <p key={item.image_description}>{item.image_description}</p>
                                <img
                                    key={item.gallery_image.id}
                                    src={item.gallery_image.url}
                                    alt={item.gallery_image.alt}
                                    loading="lazy" />
                            </article>
                        ))}
                        </div>
                    </section>
                </article>
                :
                <Loading section={'default'} />
            }
        </>
    )
}

export default About;