import './App.css';
import { Routes, Route, useParams } from 'react-router-dom';
import Hero from './Components/Hero';
import Navbar from './Components/Navbar';
import TopAlbums from './Components/TopAlbums';
import NewAlbums from './Components/NewAlbums';
import SongsSection from './Components/SongsSection';
import Footer from './Components/Footer';

function AlbumDetailsPage() {
  const { slug } = useParams();

  return (
    <div style={{ backgroundColor: '#121212', color: '#fff', minHeight: '60vh', padding: '40px 24px' }}>
      <h2>Album Details</h2>
      <p>Album slug: {slug}</p>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={
          <>
            <Hero />
            <TopAlbums />
            <NewAlbums />
            <SongsSection />
            <Footer />
          </>
        } />
        <Route path="/album/:slug" element={
          <>
            <AlbumDetailsPage />
            <Footer />
          </>
        } />
      </Routes>
    </div>
  );
}

export default App;