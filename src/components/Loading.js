import loading from "../images/cat-pet-hover.gif";
import { Box, Skeleton } from '@mui/material';

const Loading = ({ section }) => {
    switch (section) {
        case "single":
            return (
                <div className="loading">
                    <Box className="single-project-banner">
                        <Skeleton variant="rectangular" width='100%' height={480} animation="wave" />
                    </Box>

                    <Box className="single-project-container">
                        <Box className="single-project-content">
                            <Skeleton variant="text" animation="wave" width={300} height={50} />
                            <Skeleton variant="rectangular" width='100%' height={320} animation="wave" />
                            <Skeleton variant="text" animation="wave" width='100%' />
                            <Skeleton variant="text" animation="wave" width='100%' />
                            <Skeleton variant="rectangular" width='100%' height={320} animation="wave" />
                            <Skeleton variant="text" animation="wave" width='100%' />
                            <Skeleton variant="text" animation="wave" width='100%' />
                            <Skeleton variant="rectangular" width='100%' height={320} animation="wave" />
                            <Skeleton variant="text" animation="wave" width='100%' />
                            <Skeleton variant="text" animation="wave" width='100%' />
                        </Box>

                        <Box className="project-cards">
                            <Box className="project-card">
                                <Skeleton variant="rectangular" width={230} height={160} />
                                <Skeleton variant="text" animation="wave" width={100} height={50} />
                                <Skeleton variant="text" animation="wave" width={230} />
                            </Box>
                            <Box className="project-card">
                                <Skeleton variant="rectangular" width={230} height={160} />
                                <Skeleton variant="text" animation="wave" width={100} height={50} />
                                <Skeleton variant="text" animation="wave" width={230} />
                            </Box>
                        </Box >
                    </Box >
                </div>
            );
        case "project-card":
            return (
                <div className="loading">
                    <Box className="single-project-container">
                        <Box className="project-cards">
                            <Box className="project-card">
                                <Skeleton variant="rectangular" width={230} height={160} />
                                <Skeleton variant="text" animation="wave" width={100} height={50} />
                                <Skeleton variant="text" animation="wave" width={230} />
                            </Box>
                            <Box className="project-card">
                                <Skeleton variant="rectangular" width={230} height={160} />
                                <Skeleton variant="text" animation="wave" width={100} height={50} />
                                <Skeleton variant="text" animation="wave" width={230} />
                            </Box>
                        </Box >
                    </Box>
                </div>
            );
        case "projects":
            return (
                <div className="loading">

                    <img src={loading} alt="Loading" />
                </div>
            );
        case "about":
            return (
                <div className="loading">
                    <Box >
                        <Skeleton variant="text" animation="wave" width={200} />
                        <Skeleton animation="wave" />
                        <Skeleton animation="wave" />
                        <Skeleton animation="wave" />
                        <Skeleton variant="text" animation="wave" width={200} />
                        <Skeleton animation="wave" />
                        <Skeleton variant="rectangular" height={300} />
                        <Skeleton animation="wave" />
                        <Skeleton variant="rectangular" height={300} />
                        <Skeleton animation="wave" />
                        <Skeleton variant="rectangular" height={300} />
                        <Skeleton animation="wave" />
                    </Box>
                </div>
            );
        default:
            return (
                <div className="loading default">
                    <Skeleton variant="text" animation="wave" width='100%' height={50} />
                    <Skeleton variant="rectangular" width='100%' height={320} animation="wave" />
                    <Skeleton variant="text" animation="wave" width='100%' />
                    <Skeleton variant="text" animation="wave" width='100%' />
                </div>
            );
    }
};

export default Loading;
