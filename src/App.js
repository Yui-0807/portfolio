import logo from './logo.svg';
import './styles/styles.css';
import { BrowserRouter as Router, Routes, Route, NavLink, Link, BrowserRouter } from 'react-router-dom';
import HomePage from './components/HomePage.js';
import SingleProjectPage from './components/SingleProjectPage.js';
import Header from './components/Header';
import About from './components/About';
import Projects from './components/Projects';
import ScrollToHashElement from './components/ScrollToHashElement';

function App() {

  const restBase = 'https://mariehuang.com/portfolio/wp-json/wp/v2/'

  const featuredImage = (featuredImageObject) => {
    let imgWidth = featuredImageObject.media_details.sizes.full.width;
    let imgHeight = featuredImageObject.media_details.sizes.full.height;
    let imgURL = featuredImageObject.source_url;
    let img = `<img src="${imgURL}" 
        width="${imgWidth}"
        height="${imgHeight}"
        alt="${featuredImageObject.alt_text}"
        srcset="${imgURL} ${imgWidth}w,
        ${featuredImageObject.media_details.sizes.large ? featuredImageObject.media_details.sizes.large.source_url + ' 1024w,' : ''}
        ${featuredImageObject.media_details.sizes.medium_large ? featuredImageObject.media_details.sizes.medium_large.source_url + ' 768w,' : ''}
        ${featuredImageObject.media_details.sizes.medium ? featuredImageObject.media_details.sizes.medium.source_url + ' 300w' : ''}"
        sizes="(max-width: ${imgWidth}) 100vw, ${imgWidth}px">`;
    return { __html: img }
  }

  return (
    <BrowserRouter>
      <Header />
      <main>
          <Routes>
            <Route path="/" element={<HomePage restBase={restBase} />} />
            <Route path="/projects" element={<Projects restBase={restBase} />} />
            <Route path="/projects/:id" element={<SingleProjectPage restBase={restBase} />} />
          </Routes>
      </main>

    </BrowserRouter>

  )
}

export default App;
