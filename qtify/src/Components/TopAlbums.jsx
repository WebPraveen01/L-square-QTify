import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import AlbumCard from './Card';

const API_URL = 'https://qtify-backend.labs.crio.do/albums/top';

function TopAlbums() {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopAlbums = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();

        const albumsData = Array.isArray(data)
          ? data
          : data?.albums || data?.data || [];

        setAlbums(albumsData);
      } catch (error) {
        console.error('Error fetching top albums:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopAlbums();
  }, []);

  if (loading) {
    return <div style={{ color: '#fff', padding: '24px' }}>Loading top albums...</div>;
  }

  return (
    <div style={{ backgroundColor: '#121212', padding: '24px 24px 40px' }}>
      <h2 style={{ color: '#fff', margin: '0 0 20px' }}>Top Albums</h2>

      <div style={{ position: 'relative' }}>
        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={5}
          navigation={{
            nextEl: '.custom-next-arrow',
            prevEl: '.custom-prev-arrow',
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
              <AlbumCard
                image={album.image}
                title={album.title}
                follows={album.follows}
                // description={album.description}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          className="custom-prev-arrow"
          type="button"
          aria-label="Previous"
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
            boxShadow: 'none',
          }}
        >
          ‹
        </button>

        <button
          className="custom-next-arrow"
          type="button"
          aria-label="Next"
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
            boxShadow: 'none',
          }}
        >
          ›
        </button>
      </div>
    </div>
  );
}

export default TopAlbums;
