import { useState } from 'react';
import PropTypes from 'prop-types';
import './CustomSlider.css';

const CustomSlider = ({ images, height = '130px', width = '100%' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startX, setStartX] = useState(0);
  const [endX, setEndX] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    const diffX = startX - endX;

    if (Math.abs(diffX) >= 50) { // Threshold for swipe
      if (diffX > 0) {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
      } else {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
      }
    }

    // Reset start and end X positions.
    setStartX(0);
    setEndX(null);
  };

  const handleTouchMove = (e) => {
    setEndX(e.touches[0].clientX);
  };

  const handleDotClick = (index, e) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentIndex(index);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div
      className="custom-slider"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="slider-content">
        <div
          className="slides"
          style={{ transform: `translateX(-${currentIndex * 100}%)`, transition: 'transform 0.5s ease-out' }}
        >
          {images.map((img, index) => (
            <img
              src={img}
              key={index}
              alt={`Slide ${index + 1}`}
              className={`slide-image ${imageLoaded ? 'is-loaded' : ''}`}
              onLoad={handleImageLoad}
              style={{ height, width }}
            />
          ))}
        </div>
      </div>
      <div className="dots">
        {images.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={(e) => handleDotClick(index, e)}
          />
        ))}
      </div>
    </div>
  );
};

CustomSlider.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  height: PropTypes.string,
  width: PropTypes.string,
};

export default CustomSlider;
