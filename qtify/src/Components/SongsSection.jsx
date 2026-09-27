import React, { useEffect, useMemo, useState } from 'react';
import { Tabs, Tab } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import Section from './Section';

const SONGS_API_URL = 'https://qtify-backend.labs.crio.do/songs';
const GENRES_API_URL = 'https://qtify-backend.labs.crio.do/genres';

function SongsSection() {
  const [songs, setSongs] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSongsAndGenres = async () => {
      try {
        const [songsResponse, genresResponse] = await Promise.all([
          fetch(SONGS_API_URL),
          fetch(GENRES_API_URL),
        ]);

        const songsData = await songsResponse.json();
        const genresData = await genresResponse.json();

        const parsedSongs = Array.isArray(songsData) ? songsData : songsData?.songs || songsData?.data || [];
        const parsedGenres = Array.isArray(genresData?.data)
          ? genresData.data
          : Array.isArray(genresData)
            ? genresData
            : [];

        setSongs(parsedSongs);
        setGenres(parsedGenres);
      } catch (error) {
        console.error('Error fetching songs or genres:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSongsAndGenres();
  }, []);

  const tabOptions = useMemo(() => {
    const visibleGenres = genres.slice(0, 4);
    return [{ key: 'All', label: 'All' }, ...visibleGenres];
  }, [genres]);

  const filteredSongs = useMemo(() => {
    if (selectedGenre === 'All') return songs;
    return songs.filter((song) => song?.genre?.key === selectedGenre);
  }, [selectedGenre, songs]);

  if (loading) {
    return <Section title="Songs"><div style={{ color: '#fff', padding: '8px 0' }}>Loading songs...</div></Section>;
  }

  return (
    <Section title="Songs">
      <Tabs
        value={selectedGenre}
        onChange={(_, newValue) => setSelectedGenre(newValue)}
        variant="scrollable"
        scrollButtons="auto"
        sx={{
          minHeight: 42,
          marginBottom: '20px',
          '& .MuiTabs-indicator': {
            backgroundColor: '#34C94B',
            height: 3,
          },
          '& .MuiTabs-flexContainer': {
            gap: '12px',
          },
        }}
      >
        {tabOptions.map((genre) => (
          <Tab
            key={genre.key}
            label={genre.label}
            value={genre.key}
            sx={{
              minHeight: 42,
              textTransform: 'capitalize',
              color: '#bdbdbd',
              fontWeight: 600,
              fontSize: '14px',
              padding: '0 12px',
              borderRadius: '999px',
              border: '1px solid transparent',
              minWidth: 'auto',
              '&.Mui-selected': {
                color: '#34C94B',
                backgroundColor: 'rgba(52, 201, 75, 0.08)',
                borderColor: '#34C94B',
              },
              '&:hover': {
                color: '#34C94B',
              },
            }}
          />
        ))}
      </Tabs>

      <div style={{ position: 'relative' }}>
        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={5}
          navigation={{
            nextEl: '.songs-next-arrow',
            prevEl: '.songs-prev-arrow',
          }}
          breakpoints={{
            0: { slidesPerView: 1 },
            480: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
            1280: { slidesPerView: 5 },
          }}
          style={{ padding: '0 20px' }}
        >
          {filteredSongs.map((song) => (
            <SwiperSlide key={song.id}>
              <div
                style={{
                  backgroundColor: '#1d1d1d',
                  borderRadius: '12px',
                  padding: '12px',
                  color: '#fff',
                }}
              >
                <img
                  src={song.image}
                  alt={song.title}
                  style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '8px' }}
                />
                <div style={{ marginTop: '10px', fontWeight: 700 }}>{song.title}</div>
                <div style={{ color: '#bdbdbd', fontSize: '12px', marginTop: '4px' }}>
                  {song.genre?.label || song.genre?.key}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          className="songs-prev-arrow"
          type="button"
          aria-label="Previous songs"
          style={{
            position: 'absolute',
            left: '0',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 2,
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            border: 'none',
            backgroundColor: '#34C94B',
            color: '#000',
            fontFamily: 'Font Awesome 6 Pro',
            fontWeight: 900,
            fontStyle: 'solid',
            fontSize: '32px',
            lineHeight: '100%',
            letterSpacing: '0px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          ‹
        </button>

        <button
          className="songs-next-arrow"
          type="button"
          aria-label="Next songs"
          style={{
            position: 'absolute',
            right: '0',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 2,
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            border: 'none',
            backgroundColor: '#34C94B',
            color: '#000',
            fontFamily: 'Font Awesome 6 Pro',
            fontWeight: 900,
            fontStyle: 'solid',
            fontSize: '32px',
            lineHeight: '100%',
            letterSpacing: '0px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          ›
        </button>
      </div>

      <div style={{ height: '0.5px', width: '100%', backgroundColor: '#34C94B', borderRadius: '999px', marginTop: '24px' }} />
    </Section>
    
    
  );
}

export default SongsSection;
