import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const VerticalAdSlider = ({ ads }) => {
  if (!ads || ads.length === 0) return null;

  const settings = {
    dots: false,
    infinite: true,
    vertical: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    pauseOnHover: false,
    rtl: true,
  };
  return (
    <div
      style={{
        position: 'sticky',
        top: '10px',
        width: '150px',
        margin: '0 auto',
        overflow: 'hidden',
        objectFit: 'cover',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',

      }}
    >
      <Slider {...settings}>
        {ads.map((ad) => (
          <div key={ad._id} style={{ height: '100%' }}>
            <a href={ad.link} target="_blank" rel="noopener noreferrer">
              <img
                src={ad.imageUrl}
                alt="Ad"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '8px',
                }}
              />
            </a>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default VerticalAdSlider;
