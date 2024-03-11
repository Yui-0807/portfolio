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
            {restDataPage.map(item => (
                <div key={item.id} className="entry-content" dangerouslySetInnerHTML={{ __html: item.content.rendered }}>
                </div>
            ))}
                {/* <div key={restDataPage.id} className="entry-content" dangerouslySetInnerHTML={{ __html: restDataPage.content.rendered }}>
                </div> */}
          
            
            <Projects restBase={restBase}/>
            <About restBase={restBase} restDataPage={restDataPage} />
        </>
    )
}

export default HomePage;