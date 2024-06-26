import { useEffect, useState } from "react";
import Loading from "../Loading";

const Overview = ({ restBase, id }) => {
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
                <section id="overview" className="single-project-overview">
                    <h2>Overview</h2>
                    <p>{restData.acf.overview}</p>
                </section>
            ) : (
                <section id="overview" className="single-project-overview">
                <Loading />
                </section>  
            )}
        </>
    );
};

export default Overview;
