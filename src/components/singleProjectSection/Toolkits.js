import { useEffect, useState } from "react"
import Skeleton from '@mui/material/Skeleton';

const Toolkits = ({ restBase, id}) => {
    
    const restPathPost = restBase + `categories?post=${id}`
    
    const [restData, setData] = useState([])
    const [isLoaded, setLoadStatus] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(restPathPost)
            if (response.ok) {
                const data = await response.json()
                setData(data)
                setLoadStatus(true)
            } else {
                setLoadStatus(false)
            }
        }
        fetchData()
    }, [restPathPost])

    return (
        <>
            {isLoaded && Object.keys(restData).length > 0 ?
                <div className="single-project-toolkit">
                    <span>Toolkit</span>
                    <ul>
                        {restData.map(category => (
                                    <li key={category.id}>{category.name}</li>
                                ))
                        }
                    </ul>
                </div> : <Skeleton variant="rectangular" height={480} />
            }
        </>
    )
}

export default Toolkits;
