import { useEffect, useState } from "react"
import About from "./About"
import Projects from "./Projects"
import scrollDownGif from "../images/scroll-down.gif";
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

      // Number of diamonds to generate
      const wDiamonds = Math.ceil(window.innerWidth / 72);
      const hDiamonds = Math.ceil(window.innerHeight / 72);

      // Function to generate diamonds
  const generateDiamonds = () => {
    const diamonds = [];
    for (let i = 0; i < wDiamonds; i++) {
        for (let j = 0; j<hDiamonds; j++){
            const key = `${i}_${j}`;
            diamonds.push(<Diamond key={key} />);
        }
    }
    return diamonds;
  };
    return (
        <>
            {isLoaded ?
                <>
                    <section className="home-banner">
                        {/* <div className="test-container"> */}
                            {/* <div className="diamonds"> */}
                            {/* {generateDiamonds()} */}
                            {/* </div> */}
                        {/* </div> */}
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