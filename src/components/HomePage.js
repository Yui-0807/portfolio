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
            <h1>Home page</h1>
            {restDataPage.map(page => (
                <div key={page.id} className="entry-content" dangerouslySetInnerHTML={{ __html: page.content.rendered }}>
                </div>
            ))}
            <h2 id="projects">Projects</h2>
            <Projects restBase={restBase}/>
            <About />
        </>
    )
}

export default HomePage;