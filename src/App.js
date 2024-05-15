import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage.js';
import SingleProjectPage from './components/SingleProjectPage.js';
import Header from './components/Header';
import Footer from './components/Footer';
import SidebarRight from './components/SidebarRight';


function App() {

  const restBase = 'https://mariehuang.com/portfolio/wp-json/wp/v2/'

  return (
    <Router>
      <main className='container'>
        <Header />
        <section className='main-content'>
          <Routes>
            <Route path="/" element={<HomePage restBase={restBase}  />} />
            <Route path="/projects/:id" element={<SingleProjectPage restBase={restBase}/>} />
          </Routes>
        </section>
        <SidebarRight />
        <Footer />
      </main>
    </Router>

  )
}

export default App;
