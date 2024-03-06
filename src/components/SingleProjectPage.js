import { useEffect, useState } from "react"
import { useNavigate } from "react-router"

const SingleProjectPage = ({ restBase }) => {

    // const restPath = restBase + 'pages/30/'
   
    const [restData, setData] = useState([])
    const [isLoaded, setLoadStatus] = useState(false)

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const response = await fetch(restPath)
    //         if (response.ok) {
    //             const data = await response.json()
    //             setData(data)
    //             setLoadStatus(true)
    //         } else {
    //             setLoadStatus(false)
    //         }
    //     }
    //     fetchData()
    // }, [restPath])

    return (
        <>
            
            <h1>SingleProjectPage</h1>
        </>
    )
}

export default SingleProjectPage;