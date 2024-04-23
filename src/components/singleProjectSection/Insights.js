import { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Loading from "../Loading";

const Insights = ({ restBase, id }) => {
    const restPathPost = restBase + `posts/${id}`;

    const [restData, setData] = useState([]);
    const [isLoaded, setLoadStatus] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(restPathPost);
            if (response.ok) {
                const data = await response.json();
                setData(data);
                setLoadStatus(true);
            } else {
                setLoadStatus(false);
            }
        };
        fetchData();
    }, [restPathPost]);

    return (
        <>
            {Object.keys(restData).length > 0 && isLoaded ? (
                <section id="insights" className="single-project-insights">
                <h2 >Insights</h2>
                <p>{restData.acf.insights}</p>
            </section>
            ) : (
                <section id="insights" className="single-project-insights">
                 <Loading />
                <p>loading-insights</p>
                </section>
                
            )}
        </>
    );
};

export default Insights;
