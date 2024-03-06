import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"

const SingleProjectPage = ({ restBase }) => {
    const { slug } = useParams()
    

    const restPath = restBase + `posts?slug=${slug}&_embed`
   
    const [restData, setData] = useState([])
    const [isLoaded, setLoadStatus] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(restPath)
            if (response.ok) {
                const data = await response.json()
                setData(data)
                setLoadStatus(true)
            } else {
                setLoadStatus(false)
            }
        }
        fetchData()
    }, [restPath])

    return (
        <>
            
            {restData.map(project => (
               
                <h1>{project.title.rendered}</h1>
            ))}
        </>
    )
}

export default SingleProjectPage;