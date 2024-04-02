import { useEffect, useState } from "react"
import About from "./About"
import Projects from "./Projects"
import homeBannerCat from "../images/home-banner-bg-900.svg";
import homeBannerGrids from "../images/home-banner-grids.svg";
import homeBannerRightStairs from "../images/home-banner-right-stairs.svg";
import homeBannerLeftStairs from "../images/home-banner-left-stairs.svg";
import homeBannerwall from "../images/home-banner-wall.svg";
import Spinner from 'react-bootstrap/Spinner';

// Diamond component
const Diamond = () => {
    return (
        <div className="diamond">
            <div className="circle"></div>
        </div>
    );
};

const HomePage = ({ restBase }) => {

    const restPathPage = restBase + 'pages/'
    const [restDataPage, setDataPage] = useState([])
    const [isLoaded, setLoadStatus] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(restPathPage)
            if (response.ok) {
                const data = await response.json()
                setDataPage(data)
                setLoadStatus(true)
            } else {
                setLoadStatus(false)
            }
        }
        fetchData()
    }, [restPathPage])

    return (
        <>
            {isLoaded ?
                <>
                    <section className="home-banner">
                        <div class="home-banner-mask">
                            {/* <img src={homeBannerCat} alt="home banner cat" className="home-banner-cat"/> */}
                            <img src={homeBannerwall} alt="home banner wall" className="home-banner-wall"/>
                            <img src={homeBannerLeftStairs} alt="home banner left stairs" className="home-banner-left-stairs"/>
                            <img src={homeBannerRightStairs} alt="home banner right stairs" className="home-banner-right-stairs"/>
                            <img src={homeBannerGrids} alt="home banner grids" className="home-banner-grids"/>
                        </div>
                        <div className="banner-content">
                            {restDataPage.map(item => (
                                <h1 key={item.id} className="entry-title" dangerouslySetInnerHTML={{ __html: item.title.rendered }}>
                                </h1>
                            ))}
                            {restDataPage.map(item => (
                                <p key={item.id} className="entry-content" dangerouslySetInnerHTML={{ __html: item.content.rendered }}>
                                </p>
                            ))}
                        </div>
                        {/* <img src={scrollDownGif} alt="scroll-down" className="scroll-down"/> */}
                    </section>

                    <Projects restBase={restBase} />
                    <About restBase={restBase} restDataPage={restDataPage} />
                </> : <Spinner animation="border" />}
        </>
    )
}

export default HomePage;