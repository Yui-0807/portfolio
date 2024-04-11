import { useEffect, useRef, useState } from "react"
import About from "./About"
import Projects from "./Projects"

import homeBannerRightStairs from "../images/home-banner-right-stairs.svg";
import homeBannerLeftStairs from "../images/home-banner-left-stairs.svg";
import homeBannerwall from "../images/home-banner-wall.svg";
import Spinner from 'react-bootstrap/Spinner';
import { motion, useScroll, useTransform } from "framer-motion";
import Loading from "./Loading";



const HomePage = ({ restBase }) => {

    const restPathPage = restBase + 'pages/'
    const [restDataPage, setDataPage] = useState([])
    const [isLoaded, setLoadStatus] = useState(false)
    const ref = useRef()

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

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", " end start"],
        layoutEffect: false // Add this option
    })

    const lBg = useTransform(
        scrollYProgress, [0, 1], ["0", "-20%"]
    )
    const rBg = useTransform(
        scrollYProgress, [0, 0.5], ["0", "100%"]
    )
    const xText = useTransform(
        scrollYProgress, [0, 1], ["2%", "-50%"]
    )
    const bannerScale = useTransform(
        scrollYProgress, [0, 0.12], [1, 10]
    );

    return (
        <>
            {isLoaded ?
                <>
                    <section className="home-banner"
                        ref={ref}
                    >
                        <div className="home-banner-mask">

                            <motion.img
                                style={{ scale: bannerScale }}
                                src={homeBannerwall} alt="home banner wall" className="home-banner-wall" />
                            <motion.img style={{ x: lBg }}
                                src={homeBannerLeftStairs} alt="home banner left stairs" className="home-banner-left-stairs" />
                            <motion.img style={{ x: rBg }}
                                src={homeBannerRightStairs} alt="home banner right stairs" className="home-banner-right-stairs" />
                            <motion.div
                                style={{ x: xText }}
                                className="banner-content">
                                {restDataPage.map(item => (
                                    <h1 key={item.id} className="entry-title" dangerouslySetInnerHTML={{ __html: item.title.rendered }}>
                                    </h1>
                                ))}
                                {restDataPage.map(item => (
                                    <p key={item.id} className="entry-content" dangerouslySetInnerHTML={{ __html: item.content.rendered }}>
                                    </p>
                                ))}
                            </motion.div>
                        </div>

                    </section>

                    <Projects restBase={restBase} />
                    <About restBase={restBase} restDataPage={restDataPage} />
                </> : <Loading />}
           
        </>
    )
}

export default HomePage;