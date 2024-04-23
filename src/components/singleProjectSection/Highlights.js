import { useEffect, useState } from "react"
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';


const Highlights = ({ restBase, id }) => {

    const restPathPostACF = restBase + `posts/${id}?embed&acf_format=standard`

    const [restDataACF, setDataACF] = useState([])
    const [isLoaded, setLoadStatus] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(restPathPostACF)
            if (response.ok) {
                const data = await response.json()
                setDataACF(data)
                setLoadStatus(true)
            } else {
                setLoadStatus(false)
            }
        }
        fetchData()
    }, [restPathPostACF])

    return (
        <>
            {isLoaded && Object.keys(restDataACF).length > 0 ? (

                <section id="highlights" className="single-project-highlights">
                    <h2 >Highlights</h2>
                    {restDataACF.acf.highlights.map(highlight => (
                        <div className="highlight-item" key={highlight.highlight_subtitle}>
                            <span>{highlight.highlight_subtitle}</span>
                            {highlight.highlight_image ? (
                                <img
                                    srcSet={`${highlight.highlight_image.sizes?.thumbnail || ''} 150w, ${highlight.highlight_image.sizes?.medium || ''} 300w, ${highlight.highlight_image.sizes?.large || ''} 1024w`}
                                    sizes="(max-width: 600px) 150px, (max-width: 1024px) 300px, 1024px"
                                    src={highlight.highlight_image.sizes?.large || ''}
                                    alt={highlight.highlight_content}
                                />
                            ) : (
                                ""
                            )}

                            <p>{highlight.highlight_content}</p>
                        </div>
                    ))}
                </section>) : (
                <Box sx={{ width: 580 }}>
                    <Skeleton />
                    <Skeleton variant="rectangular" width={580} height={300} />
                    <Skeleton animation="wave" />
                    <Skeleton />
                    <Skeleton />
                </Box>
            )
            }

        </>
    )
}

export default Highlights;