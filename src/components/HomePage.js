import { useEffect, useState } from "react"
import About from "./About"
import Projects from "./Projects"

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
            <section className="home-banner">
            {restDataPage.map(item => (
                <h1 key={item.id} className="entry-title" dangerouslySetInnerHTML={{ __html: item.title.rendered }}>
                </h1>
            ))}
            {restDataPage.map(item => (
                <p key={item.id} className="entry-content" dangerouslySetInnerHTML={{ __html: item.content.rendered }}>
                </p>
            ))}
            </section>
              
            
            <Projects restBase={restBase}/>
            <About restBase={restBase} restDataPage={restDataPage} />
        </>
    )
}

export default HomePage;