import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import AlbumCard from './Card';

const API_URL = 'https://qtify-backend.labs.crio.do/albums/new';

function NewAlbums() {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewAlbums = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        const albumsData = Array.isArray(data) ? data : data?.albums || data?.data || [];
        setAlbums(albumsData);
      } catch (error) {
        console.error('Error fetching new albums:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNewAlbums();
  }, []);

  if (loading) {
    return <div style={{ color: '#fff', padding: '24px' }}>Loading new albums...</div>;
  }

  return (
    <div style={{ backgroundColor: '#121212', padding: '0 24px 40px' }}>
      <h2 style={{ color: '#fff', margin: '0 0 20px' }}>New Albums</h2>

      <div style={{ position: 'relative' }}>
        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={5}
          navigation={{
            nextEl: '.new-next-arrow',
            prevEl: '.new-prev-arrow',
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
          {albums.map((album) => (
            <SwiperSlide key={album.id}>
              <AlbumCard image={album.image} title={album.title} follows={album.follows} />
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          className="new-prev-arrow"
          type="button"
          aria-label="Previous new albums"
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
          className="new-next-arrow"
          type="button"
          aria-label="Next new albums"
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

      <div
        style={{
          width: '100%',
          height: '1px',
          backgroundColor: '#34C94B',
          marginTop: '32px',
        }}
      />
    </div>
  );
}

export default NewAlbums;
