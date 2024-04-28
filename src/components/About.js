import { useEffect, useState } from "react"
import Loading from "./Loading";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { useMediaQuery } from '@mui/material';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';

const About = ({ restBase }) => {

    const restPath = restBase + 'pages/25?embed&acf_format=standard'

    const [restData, setData] = useState([])
    const [filteredCategories, setFilteredCategories] = useState([]);
    const [isLoaded, setLoadStatus] = useState(false)
    const [value, setValue] = useState(0);
    
        const handleChange = (event, newValue) => {
            setValue(newValue);
            switch (newValue) {
                case 0:
                    filterCategories("Programming");
                    break;
                case 1:
                    filterCategories("Design");
                    break;
                case 2:
                    filterCategories("CMS/E-commerce");
                    break;
                default:
                    break;
            }
        };

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
            } else {
                console.error("Failed to fetch categories data");
            }
        };
        fetchCategories();
    }

    const isSmallScreen = useMediaQuery('(max-width: 575px)');
    const isMediumScreen = useMediaQuery('(min-width: 576px) and (max-width: 767px)');
    const isLargeScreen = useMediaQuery('(min-width: 768px)');

    let cols = 1;
    
    if (isSmallScreen) {
        cols = 1;
    } else if (isMediumScreen) {
        cols = 2;
    } else if (isLargeScreen) {
        cols = 3;
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
                        <Tabs
                        className="skill-btn-container"
                            aria-label='Basic tabs'
                            sx={{ minWidth: 280, height: 160 }}
                            value={value}
                            onChange={handleChange}
                        >
                            <TabList>
                                <Tab>Programming</Tab>
                                <Tab>Design</Tab>
                                <Tab>CMS/E-commerce</Tab>
                            </TabList>

                            <TabPanel className='skill-list' value={value}>
                                {filteredCategories.map(skills => (
                                    <li key={skills.id}>{skills.name}</li>
                                ))}
                            </TabPanel>
                        </Tabs>
                    </section>

                    <section className="other-gallery">
                        <h2>Other things I enjoy...</h2>
                        <ImageList className="gallery-image" variant="masonry" cols={cols} gap={8}>
                            {restData.acf.other_things_i_enjoy.map((item) => (
                                <ImageListItem key={item.gallery_image.id}>
                                    <img
                                        srcSet={`${item.gallery_image.sizes.large}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                        src={`${item.gallery_image.sizes.large}?w=248&fit=crop&auto=format`}
                                        alt={item.gallery_image.alt}
                                        loading="lazy"
                                    />
                                    <ImageListItemBar
                                        sx={{
                                            background:'rgba(0,0,0,0.3) 70%'
                                        }}
                                        position="bottom"
                                        title={item.image_description}
                                    />
                                </ImageListItem>
                            ))}
                        </ImageList>
                    </section>
                </article >
                :
                <Loading section={'about'} />
            }
        </>
    )
}

export default About;