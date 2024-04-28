import { Box, Skeleton } from '@mui/material';

const Loading = ({ section }) => {
    switch (section) {
        case "home":
            return (
                <div className="loading">
                    <Box className="home-banner">
                        <Skeleton variant="rectangular" width='100%' height='100vh' animation="wave" />
                    </Box>
                    <Box className="projects">
                        <Skeleton variant="rectangular" height={300} animation="wave" />
                        <Skeleton animation="wave" />
                        <Skeleton animation="wave" />
                    </Box>
                    <Box className='about'>
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
            );
        case "projects":
            return (
                <Box className="projects">
                    <h2><Skeleton variant="text" animation="wave"  height={80} /></h2>
                    <Box className="project">
                        <Skeleton variant="text" animation="wave"  height={50} />
                        <Skeleton variant="rectangular" height={380} animation="wave" />
                        
                    </Box>
                    <Box className="project">
                        <Skeleton variant="text" animation="wave"  height={50} />
                        <Skeleton variant="rectangular"  height={380} animation="wave" />
                       
                    </Box>
                    <Box className="project">
                        <Skeleton variant="text" animation="wave"  height={50} />
                        <Skeleton variant="rectangular" height={380} animation="wave" />
                        
                    </Box>
                    <Box className="project">
                        <Skeleton variant="text" animation="wave"  height={50} />
                        <Skeleton  variant="rectangular"  height={380} animation="wave" />
                        
                    </Box>
                </Box>
            );
        case "about":
            return (
                <Box className='about'>
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
